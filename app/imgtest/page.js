// Diagnostic page. Zero animations, zero CSS effects, zero lazy loading.
// Renders one image from /public and (optionally) one from the CDN so you can
// compare which delivery mechanism works in *your* browser.
//
// Visit: /imgtest

export const metadata = { title: 'Image Diagnostic — Says Cheese' }

const LOCAL = [
  '/images/hero-booth.jpeg',
  '/images/studioxo-midnight.png',
  '/images/booth-wide.jpeg',
  '/images/strip-1-dietcoke.jpg',
  '/images/strip-5-seezen-beach.jpg',
]

const CDN = [
  'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/sa0odd86_WhatsApp%20Image%202026-06-01%20at%2014.02.06%20%281%29.jpeg',
  'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/5qaqwcwk_Untitled%20design%20%2823%29.png',
]

export default function ImgTest() {
  return (
    <div style={{ background: '#0a0a0a', color: 'white', minHeight: '100vh', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Image Diagnostic</h1>
      <p style={{ opacity: 0.7, marginBottom: 32, maxWidth: 720 }}>
        No CSS effects, no framer-motion, no lazy loading, no transforms. Only
        raw &lt;img&gt; tags with <code>loading="eager"</code> and{' '}
        <code>decoding="sync"</code>. If the LOCAL group renders and the CDN
        group does not, then the network/proxy/ad-blocker on your side is
        blocking <code>customer-assets.emergentagent.com</code>.
      </p>

      <h2 style={{ fontSize: 20, marginBottom: 12 }}>1. LOCAL images (served from /public)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
        {LOCAL.map((src) => (
          <figure key={src} style={{ margin: 0, background: '#111', padding: 8, borderRadius: 8 }}>
            <img
              src={src}
              alt={src}
              loading="eager"
              decoding="sync"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <figcaption style={{ fontSize: 11, marginTop: 6, wordBreak: 'break-all', opacity: 0.7 }}>{src}</figcaption>
          </figure>
        ))}
      </div>

      <h2 style={{ fontSize: 20, marginBottom: 12 }}>2. CDN images (customer-assets.emergentagent.com)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
        {CDN.map((src) => (
          <figure key={src} style={{ margin: 0, background: '#111', padding: 8, borderRadius: 8 }}>
            <img
              src={src}
              alt={src}
              loading="eager"
              decoding="sync"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <figcaption style={{ fontSize: 11, marginTop: 6, wordBreak: 'break-all', opacity: 0.7 }}>{src}</figcaption>
          </figure>
        ))}
      </div>

      <p style={{ opacity: 0.5, fontSize: 12 }}>
        Open DevTools → Network → filter by "Img". Each row shows a status code.
        Share those status codes if any image is missing.
      </p>
    </div>
  )
}
