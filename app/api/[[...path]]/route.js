import { NextResponse } from 'next/server'

// The site is fully static + client-side. No form submissions hit the backend
// anymore — all enquiries go directly to WhatsApp via wa.me deep link.
// This handler exists only to answer the health check.

const json = (data, status = 200) =>
  NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

export async function OPTIONS() {
  return json({}, 200)
}

export async function GET(_request, context) {
  const params = await context.params
  const path = (params?.path || []).join('/')
  if (path === '' || path === 'health') {
    return json({ status: 'ok', service: 'says-cheese', mode: 'static' })
  }
  return json({ error: 'Not found' }, 404)
}
