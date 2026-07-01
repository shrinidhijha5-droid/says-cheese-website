import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'saycheese'

let cachedClient = null
async function getDb() {
  if (cachedClient) return cachedClient.db(dbName)
  const client = new MongoClient(uri)
  await client.connect()
  cachedClient = client
  return client.db(dbName)
}

const json = (data, status = 200) =>
  NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })

export async function OPTIONS() {
  return json({}, 200)
}

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/')
  try {
    if (path === '' || path === 'health') {
      return json({ status: 'ok', service: 'says-cheese-api' })
    }
    if (path === 'leads') {
      const db = await getDb()
      const items = await db
        .collection('leads')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(200)
        .toArray()
      return json({ leads: items })
    }
    return json({ error: 'Not found', path }, 404)
  } catch (err) {
    console.error('GET error:', err)
    return json({ error: 'Server error', detail: String(err?.message || err) }, 500)
  }
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/')
  try {
    const body = await request.json().catch(() => ({}))

    if (path === 'leads' || path === 'contact' || path === 'franchise' || path === 'demo') {
      const type =
        body.type ||
        (path === 'franchise'
          ? 'franchise'
          : path === 'demo'
          ? 'demo'
          : 'contact')

      if (!body.name || !body.contact) {
        return json({ error: 'name and contact are required' }, 400)
      }

      const doc = {
        id: uuidv4(),
        type,
        name: String(body.name).slice(0, 200),
        contact: String(body.contact).slice(0, 200),
        email: body.email ? String(body.email).slice(0, 200) : '',
        venue: body.venue ? String(body.venue).slice(0, 200) : '',
        city: body.city ? String(body.city).slice(0, 100) : '',
        message: body.message ? String(body.message).slice(0, 2000) : '',
        createdAt: new Date().toISOString(),
      }

      const db = await getDb()
      await db.collection('leads').insertOne(doc)
      return json({ ok: true, lead: doc }, 201)
    }

    return json({ error: 'Not found', path }, 404)
  } catch (err) {
    console.error('POST error:', err)
    return json({ error: 'Server error', detail: String(err?.message || err) }, 500)
  }
}
