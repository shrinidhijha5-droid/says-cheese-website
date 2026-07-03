'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Camera,
  Check,
  ChevronDown,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  QrCode,
  Share2,
  Sparkles,
  Star,
  Trophy,
  X,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { toast } from 'sonner'

/* ---------- CONTENT / DATA ---------- */

const PHOTOSTRIPS = [
  'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/bvsncbst_20260528_171350_231_1x.jpg',
  'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/fjszz590_20260525_195958_672_1x.jpg',
  'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/4837adtj_20260525_172934_564_1x.jpg',
  'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/aoiz5j8q_20260524_190021_478_1x%20%281%29.jpg',
  'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/gbbky7bg_20260628_224556_308_1x.jpg',
]

const IMG = {
  hero: 'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/sa0odd86_WhatsApp%20Image%202026-06-01%20at%2014.02.06%20%281%29.jpeg',
  boothWide: 'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/x63ssdjo_WhatsApp%20Image%202026-06-01%20at%2014.01.49.jpeg',
  boothStraight: 'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/ghqaceov_WhatsApp%20Image%202026-06-01%20at%2014.01.33.jpeg',
  boothAngle: 'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/1covls13_WhatsApp%20Image%202026-06-01%20at%2014.01.32.jpeg',
  boothCurtain: 'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/jx75ji2o_WhatsApp%20Image%202026-06-01%20at%2014.01.32%20%281%29.jpeg',
  booth: 'https://images.pexels.com/photos/14152627/pexels-photo-14152627.png',
  cafeNeon: 'https://images.pexels.com/photos/27623551/pexels-photo-27623551.jpeg',
  cafeInterior: 'https://images.unsplash.com/photo-1566304092989-5b82e58ff842',
  mall: 'https://images.unsplash.com/photo-1691421123450-7f79538902ae',
  arena: 'https://images.unsplash.com/photo-1696208732970-5744331c9fdf',
  selfie: 'https://images.unsplash.com/photo-1600209142000-aa256622e64a',
  friends: 'https://images.unsplash.com/photo-1559026432-016825fa59df',
  qrPhone: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf',
  qrScan: 'https://images.pexels.com/photos/16345589/pexels-photo-16345589.jpeg',
  coffee: 'https://images.unsplash.com/photo-1510972527921-ce03766a1cf1',
  laughing: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59',
}

const NAV_LINKS = [
  { label: 'The Problem', href: '#problem' },
  { label: 'Why It Works', href: '#why' },
  { label: 'How', href: '#how' },
  { label: 'Experience', href: '#experience' },
  { label: 'Locations', href: '#locations' },
  { label: 'Exclusivity', href: '#exclusivity' },
  { label: 'FAQ', href: '#faq' },
]

const CONTACTS = {
  business: '9984849989',
  franchise: '7311133888',
}

const STATS = [
  { value: 1000, suffix: '+', label: 'Sessions per month', sub: 'at our first location' },
  { value: 35, suffix: '+', label: 'Paid sessions daily', sub: 'consistent average' },
  { value: 100, suffix: '%', label: 'Fully operated', sub: 'by Says Cheese' },
  { value: 0, label: 'Investment required', sub: 'from venue partners' },
  { value: 100, suffix: '%', label: 'Organic brand exposure', sub: 'every printed strip' },
]

const WHY_ITEMS = [
  { icon: Zap, title: 'Zero Investment', body: 'We install the booth. You pay nothing upfront. Ever.' },
  { icon: Sparkles, title: 'Zero Maintenance', body: 'Consumables, repairs, uptime — all handled by us.' },
  { icon: Trophy, title: 'Zero Staffing', body: 'The booth runs itself. Your team focuses on service.' },
  { icon: Camera, title: 'Instagrammable', body: 'A magnet for stories, reels and word-of-mouth reach.' },
  { icon: Star, title: 'Premium Aesthetic', body: 'Designed like a luxury installation, not vending.' },
  { icon: QrCode, title: 'Instant Commerce', body: 'QR-based payment. UPI. Zero friction, zero queues.' },
]

const HOW_STEPS = [
  { n: '01', title: 'We install.', body: 'A premium booth is delivered, installed and calibrated at your venue.' },
  { n: '02', title: 'Customers scan QR.', body: 'A photostrip session begins with a single scan — no app needed.' },
  { n: '03', title: 'Payment happens instantly.', body: 'A frictionless UPI experience. Fully self-serve. Fully automated.' },
  { n: '04', title: 'Customers enjoy the session.', body: 'Aesthetic lighting, curated themes, four premium shots.' },
  { n: '05', title: 'Photostrips print instantly.', body: 'Thermal-printed keepsakes with your branding, in seconds.' },
  { n: '06', title: 'They leave carrying your brand.', body: 'Fridges. Wallets. Instagram feeds. Your logo goes with them.' },
]

const LOCATIONS = [
  { name: 'Seezen Café', city: 'Kanpur', status: 'Operational', img: IMG.boothStraight },
  {
    name: 'Studio XO',
    city: 'Kanpur',
    status: 'Operational',
    img: 'https://customer-assets.emergentagent.com/job_luxury-booth-network/artifacts/5qaqwcwk_Untitled%20design%20%2823%29.png',
  },
]

const GALLERY = [
  { src: IMG.selfie, h: 'h-[420px]' },
  { src: IMG.laughing, h: 'h-[280px]' },
  { src: IMG.booth, h: 'h-[520px]' },
  { src: IMG.friends, h: 'h-[340px]' },
  { src: IMG.qrScan, h: 'h-[380px]' },
  { src: IMG.coffee, h: 'h-[300px]' },
  { src: IMG.cafeInterior, h: 'h-[440px]' },
  { src: IMG.mall, h: 'h-[320px]' },
  { src: IMG.arena, h: 'h-[380px]' },
]

const BOOTHS = [
  {
    name: 'La La Land',
    tagline: 'Cinematic. Warm. Iconic.',
    body: 'A tribute to golden-hour cinema. Soft amber lights, marquee framing, a mood that turns every strip into a poster.',
    img: IMG.cafeNeon,
    accent: '#D4AF37',
  },
  {
    name: 'Zootopia',
    tagline: 'Playful. Wild. Unforgettable.',
    body: 'Bold graphics, vibrant palettes and a joyful energy that pulls in every age group in a mall or arena.',
    img: IMG.arena,
    accent: '#F5D5D0',
  },
  {
    name: 'Future Themes',
    tagline: 'Coming soon.',
    body: 'Rotating collaborations with fashion, cinema and lifestyle brands — always fresh, always premium.',
    img: IMG.mall,
    accent: '#E8B4B8',
  },
]

const COMPARISON = [
  { feature: 'Upfront cost', trad: 'Expensive', sc: 'Zero' },
  { feature: 'Duration of impact', trad: 'Temporary', sc: 'Permanent installation' },
  { feature: 'Emotional value', trad: 'Low', sc: 'High — memory-linked' },
  { feature: 'Keepsake for customer', trad: 'None', sc: 'Branded photostrip' },
  { feature: 'Retention', trad: 'Low', sc: 'Repeat visits' },
  { feature: 'Organic reach', trad: 'Paid ads only', sc: 'Instagram-native' },
  { feature: 'Physical brand recall', trad: 'None', sc: 'Every strip is a billboard' },
]

const FAQS = [
  { q: 'What does a session include?', a: 'Four premium photostrip shots printed instantly — a curated experience your guests keep forever, carrying your venue’s branding wherever they go.' },
  { q: 'Do cafés or venues have to pay anything?', a: 'No. Traditional experiential marketing campaigns cost businesses thousands of rupees every month. Says Cheese creates long-term organic brand visibility at absolutely zero cost to our venue partners.' },
  { q: 'What is the venue responsible for?', a: 'Nothing operational. Our installation requires zero investment, zero maintenance, and zero operational effort from the venue.' },
  { q: 'Who manages maintenance & servicing?', a: 'Says Cheese, end-to-end. Uptime, cleaning, servicing — all on us.' },
  { q: 'Who replaces the paper and consumables?', a: 'Says Cheese. You never lift a finger.' },
  { q: 'How much floor space is required?', a: 'A footprint of 5 ft × 6 ft. The installation is designed to blend beautifully with your venue’s ambience while occupying minimal space.' },
  { q: 'How is Says Cheese different from a regular photobooth?', a: 'Unlike paid advertisements that disappear in seconds, printed memories stay with customers for years. Every strip is a physical reminder of your venue.' },
]

const CHART_DATA_REMOVED = []
const DAILY_REMOVED = []

const EXPERIENCE_PILLARS = [
  { icon: Sparkles, title: 'Aesthetic Interior Element', body: 'An installation designed to complement your ambience — never to intrude on it.' },
  { icon: Heart, title: 'Customer Retention', body: 'Guests leave with a keepsake carrying your venue’s branding, quietly bringing them back.' },
  { icon: Share2, title: 'Organic Brand Visibility', body: 'Every shared photograph naturally promotes your location across social feeds.' },
  { icon: Instagram, title: 'Instagram Destination', body: 'Encourages visitors to create, tag and share content that reaches new audiences.' },
  { icon: Award, title: 'Premium Guest Experience', body: 'Transforms an ordinary visit into a moment worth remembering — and returning for.' },
  { icon: Zap, title: 'Zero Operational Effort', body: 'We manage installation, maintenance, consumables and support. You focus on hospitality.' },
]

/* ---------- HELPERS ---------- */

function Counter({ to, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, {
      duration: 2.2,
      ease: 'easeOut',
      onUpdate: (v) => {
        const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN')
        setDisplay(n)
      },
    })
    return () => controls.stop()
  }, [inView, to, decimals, mv])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

function MouseSpotlight() {
  const [pos, setPos] = useState({ x: -500, y: -500 })
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(245,213,208,0.08), transparent 60%)`,
      }}
    />
  )
}

function PhotoStrip({ src, rotate = 0, width = 200, className = '' }) {
  return (
    <div
      className={`relative bg-white p-1.5 rounded-md photostrip-shadow overflow-hidden ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, '--r': `${rotate}deg`, width: `${width}px` }}
    >
      <img
        src={src}
        alt="Says Cheese photostrip"
        loading="lazy"
        className="w-full h-auto block"
      />
    </div>
  )
}

function CyclingPhotoStrip({
  srcs,
  rotate = 0,
  width = 200,
  interval = 3600,
  startIndex = 0,
  className = '',
}) {
  const [i, setI] = useState(startIndex % srcs.length)
  useEffect(() => {
    const t = setInterval(
      () => setI((v) => (v + 1) % srcs.length),
      interval,
    )
    return () => clearInterval(t)
  }, [srcs.length, interval])

  return (
    <div
      className={`relative bg-white p-1.5 rounded-md photostrip-shadow overflow-hidden ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, '--r': `${rotate}deg`, width: `${width}px` }}
    >
      {/* Preload the whole set so transitions are instant */}
      <div className="hidden">
        {srcs.map((s) => (
          <img key={s} src={s} alt="" />
        ))}
      </div>
      {/* Sizer keeps card height stable while the image cross-fades */}
      <img
        src={srcs[0]}
        alt=""
        aria-hidden="true"
        className="w-full h-auto block invisible"
      />
      <AnimatePresence mode="sync">
        <motion.img
          key={i}
          src={srcs[i]}
          alt="Says Cheese photostrip"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="w-full h-auto block absolute inset-1.5"
          style={{ width: 'calc(100% - 0.75rem)' }}
        />
      </AnimatePresence>
    </div>
  )
}

/* ---------- NAVBAR ---------- */

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      {
        // Trigger when a section is around the upper third of the viewport
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

function Nav({ onCta }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''))
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between transition-all ${
          scrolled ? 'glass rounded-full py-2.5 px-4 md:px-6 mx-4 md:mx-8' : ''
        }`}
      >
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-blush flex items-center justify-center">
            <Camera className="w-4 h-4 text-black" />
          </div>
          <span className="font-heading font-bold tracking-tight text-lg">
            Says<span className="text-blush"> Cheese</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            const id = l.href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-sm transition-colors ${
                  isActive ? 'text-blush' : 'text-white/70 hover:text-blush'
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blush"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </nav>
        <div className="hidden lg:block">
          <Button
            onClick={onCta}
            className="bg-blush text-black hover:bg-white rounded-full px-5 font-medium"
          >
            Become a Partner <ArrowRight className="ml-1.5 w-4 h-4" />
          </Button>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-4 mt-3 glass rounded-2xl p-6 flex flex-col gap-4"
          >
            {NAV_LINKS.map((l) => {
              const id = l.href.replace('#', '')
              const isActive = active === id
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 transition-colors ${
                    isActive ? 'text-blush' : 'text-white/80 hover:text-blush'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blush" />}
                  {l.label}
                </a>
              )
            })}
            <Button
              onClick={() => {
                setOpen(false)
                onCta()
              }}
              className="bg-blush text-black hover:bg-white rounded-full"
            >
              Become a Partner
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------- HERO ---------- */

function Hero({ onCta }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100vh] w-full overflow-hidden isolate"
    >
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={IMG.hero}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20" />
      </motion.div>

      {/* Floating real photostrips — cycling. Anchored to edges so they never cross the text column. */}
      <motion.div
        style={{ opacity }}
        className="absolute top-[14%] right-[3%] hidden xl:block animate-float z-10"
      >
        <CyclingPhotoStrip
          srcs={PHOTOSTRIPS}
          rotate={8}
          width={180}
          interval={3800}
          startIndex={0}
        />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute bottom-[10%] right-[12%] hidden xl:block animate-float z-10"
      >
        <CyclingPhotoStrip
          srcs={PHOTOSTRIPS}
          rotate={-12}
          width={170}
          interval={4200}
          startIndex={2}
          className="[animation-delay:1s]"
        />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute top-[62%] right-[26%] hidden 2xl:block animate-float z-10"
      >
        <CyclingPhotoStrip
          srcs={PHOTOSTRIPS}
          rotate={-6}
          width={165}
          interval={4600}
          startIndex={4}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 pt-40 pb-24 md:pt-56 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 glass-blush px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blush mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blush animate-pulse" />
          <span className="whitespace-nowrap">Kanpur-based · Premium Photobooths</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-heading font-black text-[12vw] sm:text-[9vw] md:text-[6.4vw] xl:text-[5.6vw] leading-[0.94] tracking-[-0.03em] max-w-[16ch] xl:max-w-[14ch]"
        >
          Every Customer
          <br />
          Leaves Carrying
          <br />
          <span className="text-gradient-blush italic font-light">Your Brand.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-xl text-white/70 text-lg leading-relaxed"
        >
          Turn every café visit into a memory people keep forever. Says Cheese installs premium
          aesthetic photobooths at <span className="text-blush">zero upfront cost</span> to your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button
            onClick={onCta}
            size="lg"
            className="bg-blush text-black hover:bg-white rounded-full h-14 px-8 text-base font-medium group"
          >
            Become a Partner
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <a href="#locations">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-14 px-8 text-base border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              See Our Locations
            </Button>
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-6 md:left-10 flex items-center gap-3 text-white/50 text-xs uppercase tracking-[0.3em]"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
          Scroll
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- SOCIAL PROOF ---------- */

function SocialProof() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">Proof, not promises</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold">
            One location. <span className="text-gradient-gold">One month.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 md:p-8 hover-glow h-full">
                <div className="font-heading text-4xl md:text-5xl font-bold text-gradient-blush">
                  <Counter
                    to={s.value}
                    prefix={s.prefix || ''}
                    suffix={s.suffix || ''}
                    decimals={s.value > 0 && s.value < 10 ? 2 : 0}
                  />
                </div>
                <div className="mt-4 text-sm text-white/85">{s.label}</div>
                <div className="text-xs text-white/40 mt-1">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- PROBLEM ---------- */

function Problem() {
  const lines = [
    'Modern cafés spend heavily on marketing.',
    'Customers click photos.',
    'Post stories.',
    'Leave.',
    'Then they forget where those memories happened.',
  ]
  return (
    <section id="problem" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <img src={IMG.boothWide} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <p className="text-blush-deep uppercase tracking-[0.3em] text-xs mb-8">The Problem</p>
        <div className="space-y-8 md:space-y-10">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className={`font-heading font-light text-3xl md:text-6xl leading-[1.05] tracking-tight ${
                i === lines.length - 1 ? 'text-white' : 'text-white/40'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {['No physical reminder', 'No repeat trigger', 'No organic branding', 'No emotional recall'].map(
            (t) => (
              <div
                key={t}
                className="glass rounded-xl p-5 text-sm text-white/70 border-white/5"
              >
                <X className="w-4 h-4 text-red-400/70 mb-3" />
                {t}
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- SOLUTION ---------- */

function Solution() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-6">The Solution</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
            Marketing
            <br />
            people
            <br />
            <span className="italic font-light text-gradient-blush">never throw away.</span>
          </h2>
          <div className="mt-10 space-y-4 text-white/70 text-base md:text-lg leading-relaxed max-w-md">
            <p>Traditional experiential marketing costs businesses thousands of rupees every month — and disappears the moment the campaign ends.</p>
            <p>Every printed photostrip becomes a physical reminder of your venue. Every customer leaves carrying your brand.</p>
            <p className="text-blush">Every memory reminds them exactly where it happened.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[600px] hidden lg:block"
        >
          <div className="absolute top-4 left-4 animate-float">
            <PhotoStrip src={PHOTOSTRIPS[0]} rotate={-8} width={210} />
          </div>
          <div className="absolute top-20 right-4 animate-float" style={{ animationDelay: '1.5s' }}>
            <PhotoStrip src={PHOTOSTRIPS[1]} rotate={10} width={200} />
          </div>
          <div className="absolute bottom-14 left-24 animate-float" style={{ animationDelay: '0.7s' }}>
            <PhotoStrip src={PHOTOSTRIPS[2]} rotate={-4} width={210} />
          </div>
          <div className="absolute bottom-4 right-2 animate-float" style={{ animationDelay: '2.2s' }}>
            <PhotoStrip src={PHOTOSTRIPS[4]} rotate={6} width={200} />
          </div>
          <div className="absolute inset-0 -z-10 rounded-full bg-blush/10 blur-[100px]" />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- WHY IT WORKS ---------- */

function WhyItWorks() {
  return (
    <section id="why" className="relative py-32 noise-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">Why It Works</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
            Built for venues that
            <br />
            <span className="text-gradient-gold">already have foot traffic.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_ITEMS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-7 group hover-glow"
            >
              <div className="w-11 h-11 rounded-full bg-blush/10 border border-blush/20 flex items-center justify-center mb-6 group-hover:bg-blush/20 transition-colors">
                <f.icon className="w-5 h-5 text-blush" />
              </div>
              <h3 className="font-heading font-semibold text-2xl mb-2">{f.title}</h3>
              <p className="text-white/60 text-[15px] leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {[
            'Instagrammable attraction',
            'Recurring customer engagement',
            'Word-of-mouth marketing',
            'Physical brand recall',
            'Organic social media reach',
            'Increased footfall',
            'Repeat visits',
          ].map((t) => (
            <span
              key={t}
              className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/70 hover:border-blush hover:text-blush transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- HOW IT WORKS ---------- */

function HowItWorks() {
  return (
    <section id="how" className="relative py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-20">
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">How It Works</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold">Everything automated.</h2>
          <p className="mt-4 text-white/60">Six steps. Zero touch. Fully self-serve.</p>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blush/40 to-transparent -translate-x-1/2" />
          {HOW_STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`relative flex md:grid md:grid-cols-2 gap-6 md:gap-16 mb-12 ${
                i % 2 === 0 ? '' : 'md:[&>*:first-child]:col-start-2'
              }`}
            >
              <div
                className={`hidden md:block ${
                  i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16 md:col-start-2'
                }`}
              />
              <div
                className={`ml-16 md:ml-0 ${
                  i % 2 === 0 ? 'md:pl-16' : 'md:text-right md:pr-16 md:col-start-1 md:row-start-1'
                }`}
              >
                <div
                  className={`glass rounded-2xl p-7 hover-glow inline-block ${
                    i % 2 === 0 ? '' : 'md:text-right'
                  }`}
                >
                  <div className="font-heading text-blush text-sm tracking-widest mb-2">{s.n}</div>
                  <div className="font-heading font-semibold text-2xl mb-2">{s.title}</div>
                  <p className="text-white/60 text-sm leading-relaxed max-w-sm">{s.body}</p>
                </div>
              </div>
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-blush ring-4 ring-blush/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- MORE THAN A PHOTOBOOTH ---------- */

function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-[0.09]">
        <img src={IMG.boothAngle} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">The Experience</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold leading-[1.02]">
            More than
            <br />
            <span className="text-gradient-blush italic">a photobooth.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-xl">
            An installation designed to elevate your venue — not compete with it. Every element is
            considered, every moment is memorable.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERIENCE_PILLARS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-8 hover-glow group relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-blush/5 blur-3xl group-hover:bg-blush/10 transition-colors" />
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush/20 to-transparent border border-blush/30 flex items-center justify-center mb-6">
                  <f.icon className="w-5 h-5 text-blush" />
                </div>
                <h3 className="font-heading font-semibold text-2xl mb-3 leading-tight">{f.title}</h3>
                <p className="text-white/55 text-[15px] leading-relaxed">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quiet pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto text-center"
        >
          <p className="font-heading text-2xl md:text-4xl font-light leading-tight italic text-white/80">
            “Unlike paid advertisements that disappear in seconds,
            <br />
            <span className="text-gradient-gold not-italic font-normal">printed memories stay with customers for years.</span>”
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- NOT EVERY VENUE QUALIFIES ---------- */

function Exclusivity({ onCta }) {
  return (
    <section id="exclusivity" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#120A0B] to-black" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blush/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 glass-blush px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.3em] text-blush mb-8">
            <Award className="w-3 h-3" />
            By invitation
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-bold leading-[0.98] tracking-tight">
            Not every venue
            <br />
            <span className="text-gradient-blush italic font-light">qualifies.</span>
          </h2>
          <div className="mt-10 space-y-5 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            <p>Our installations are intentionally limited.</p>
            <p>
              Every partner venue is carefully selected based on
              <span className="text-blush"> customer experience</span>,
              <span className="text-blush"> ambience</span>,
              <span className="text-blush"> audience quality</span>, and
              <span className="text-blush"> daily footfall</span>.
            </p>
            <p>
              This ensures every Says Cheese location remains premium, desirable, and delivers maximum
              value to both customers and venue partners.
            </p>
          </div>
        </motion.div>

        {/* Qualification pillars */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {['Ambience', 'Audience', 'Footfall', 'Standards'].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl px-5 py-6 text-center"
            >
              <div className="text-blush font-heading text-2xl font-bold mb-1">0{i + 1}</div>
              <div className="text-white/80 text-sm uppercase tracking-widest">{label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <Button
            onClick={onCta}
            size="lg"
            className="bg-blush text-black hover:bg-white rounded-full h-14 px-8 text-base font-medium group"
          >
            Request Eligibility Assessment
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Applications reviewed personally by our founding team
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- LOCATIONS ---------- */

function Locations() {
  return (
    <section id="locations" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">Our Locations</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
              Kanpur first. <span className="text-gradient-blush italic">Then, carefully.</span>
            </h2>
          </div>
          <div className="text-white/50 text-sm">Kanpur-based · Currently by invitation only</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {LOCATIONS.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 h-[420px]"
            >
              <img src={l.img} alt={l.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-blush text-black">
                    {l.status}
                  </div>
                  <MapPin className="w-4 h-4 text-blush" />
                </div>
                <div>
                  <div className="font-heading text-3xl font-semibold">{l.name}</div>
                  <div className="text-white/60 text-sm mt-1">{l.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center gap-3 text-white/50 text-sm"
        >
          <span className="w-8 h-px bg-blush/50" />
          <span className="uppercase tracking-[0.3em] text-xs">More premium locations coming soon</span>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- GALLERY ---------- */

function Gallery() {
  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">The Feeling</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold">
            A moment worth <span className="italic text-gradient-gold">printing.</span>
          </h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {GALLERY.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.05 }}
              className={`mb-5 break-inside-avoid rounded-2xl overflow-hidden border border-white/10 relative group ${g.h}`}
            >
              <img
                src={g.src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- BOOTHS ---------- */

function Booths() {
  const [active, setActive] = useState(0)
  return (
    <section id="booths" className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">Our Booths</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
            Not machines.
            <br />
            <span className="text-gradient-blush italic">Installations.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={BOOTHS[active].img}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div
              className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-black/40 rounded-xl p-4 border"
              style={{ borderColor: BOOTHS[active].accent + '55' }}
            >
              <div className="text-xs uppercase tracking-widest" style={{ color: BOOTHS[active].accent }}>
                Now viewing
              </div>
              <div className="font-heading text-2xl font-semibold">{BOOTHS[active].name}</div>
            </div>
          </div>

          <div className="space-y-3">
            {BOOTHS.map((b, i) => (
              <button
                key={b.name}
                onClick={() => setActive(i)}
                className={`w-full text-left rounded-2xl p-6 border transition-all ${
                  active === i
                    ? 'glass-blush border-blush/40'
                    : 'glass border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-heading text-2xl md:text-3xl font-semibold">{b.name}</div>
                    <div className="text-blush text-xs uppercase tracking-widest mt-1">{b.tagline}</div>
                    <AnimatePresence>
                      {active === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 text-white/60 text-sm leading-relaxed"
                        >
                          {b.body}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <ArrowUpRight
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      active === i ? 'text-blush' : 'text-white/30'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- COMPARISON ---------- */

function WhyPartner() {
  return (
    <section className="relative py-32 md:py-40 noise-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">Why Partner With Us</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold">
            The old way vs. <span className="text-gradient-blush italic">the Says Cheese way.</span>
          </h2>
        </div>
        <div className="glass rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3 items-center px-3 sm:px-6 py-4 sm:py-5 border-b border-white/10">
            <div className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest">Feature</div>
            <div className="text-center text-white/40 text-[10px] sm:text-xs uppercase tracking-widest">
              Traditional
            </div>
            <div className="text-center text-blush text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
              Says Cheese
            </div>
          </div>
          {COMPARISON.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-3 items-center px-3 sm:px-6 py-4 sm:py-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] gap-2"
            >
              <div className="text-white/80 text-xs sm:text-sm md:text-base font-medium">{row.feature}</div>
              <div className="text-center text-white/40 text-xs sm:text-sm">
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline text-red-400/60 sm:mr-1.5" />
                <span className="hidden sm:inline">{row.trad}</span>
              </div>
              <div className="text-center text-blush text-xs sm:text-sm md:text-base">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline text-blush sm:mr-1.5" />
                <span>{row.sc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- FRANCHISE ---------- */

function Franchise({ onSubmitLead }) {
  const [form, setForm] = useState({ name: '', contact: '', city: '', message: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.contact) {
      toast.error('Please share your name and contact')
      return
    }
    setLoading(true)
    const ok = await onSubmitLead({ ...form, type: 'franchise' }, 'franchise')
    setLoading(false)
    if (ok) {
      setForm({ name: '', contact: '', city: '', message: '' })
    }
  }

  return (
    <section id="franchise" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">Franchise</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold leading-[1] tracking-tight">
            Bring Says Cheese
            <br />
            <span className="text-gradient-gold italic">to your city.</span>
          </h2>
          <p className="mt-8 text-white/70 text-lg max-w-lg leading-relaxed">
            We are onboarding a limited number of city partners for 2025. If you have café or venue
            relationships in your city — we would love to talk.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              'Low operational complexity',
              'Growing customer demand',
              'Strong café network access',
              'Central technology platform',
              'Marketing & creative support',
              'Full training & onboarding',
              'Dedicated partner success',
              'Recurring revenue model',
            ].map((b) => (
              <div key={b} className="flex items-center gap-3 text-white/80 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blush" />
                {b}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="glass rounded-3xl p-8 space-y-4">
          <div className="text-xs text-blush uppercase tracking-widest mb-2">Franchise enquiry</div>
          <Input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-blush/40"
          />
          <Input
            placeholder="Phone / WhatsApp"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-blush/40"
          />
          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-blush/40"
          />
          <Textarea
            placeholder="Tell us about your city / network"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            className="bg-white/5 border-white/10 rounded-xl focus-visible:ring-blush/40"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-13 py-6 rounded-xl bg-blush text-black hover:bg-white font-medium text-base"
          >
            {loading ? 'Submitting…' : 'Submit Franchise Enquiry'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <p className="text-xs text-white/40 text-center">We reply within 24 hours.</p>
        </form>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

function FAQ() {
  return (
    <section id="faq" className="relative py-32 md:py-40">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">FAQ</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold">Everything you might ask.</h2>
        </div>
        <Accordion type="single" collapsible className="glass rounded-3xl px-6 md:px-8">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-white/10 last:border-0"
            >
              <AccordionTrigger className="text-left font-heading text-lg md:text-xl py-5 hover:no-underline hover:text-blush">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/60 text-[15px] leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

/* ---------- CONTACT ---------- */

function Contact({ onSubmitLead, contactRef }) {
  const [tab, setTab] = useState('contact')
  const [form, setForm] = useState({ name: '', contact: '', email: '', venue: '', message: '' })
  const [loading, setLoading] = useState(false)

  const TABS = [
    { id: 'contact', label: 'Become a Partner' },
    { id: 'franchise', label: 'Franchise Enquiry' },
  ]

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.contact) {
      toast.error('Please share your name and contact')
      return
    }
    setLoading(true)
    const ok = await onSubmitLead({ ...form, type: tab }, tab)
    setLoading(false)
    if (ok) setForm({ name: '', contact: '', email: '', venue: '', message: '' })
  }

  return (
    <section id="contact" ref={contactRef} className="relative py-32 md:py-40 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="text-blush uppercase tracking-[0.3em] text-xs mb-4">Let's Talk</p>
          <h2 className="font-heading text-5xl md:text-7xl font-bold leading-[1]">
            The next best café
            <br />
            <span className="italic text-gradient-blush">could be yours.</span>
          </h2>
        </div>

        <div className="glass rounded-3xl p-6 md:p-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8 p-1 rounded-full bg-white/[0.03] border border-white/5 w-fit mx-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  tab === t.id ? 'bg-blush text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-blush/40"
            />
            <Input
              placeholder="Phone / WhatsApp"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-blush/40"
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-blush/40"
            />
            <Input
              placeholder={tab === 'franchise' ? 'City you want to franchise in' : 'Venue name & city'}
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-blush/40"
            />
            <Textarea
              placeholder={
                tab === 'franchise'
                  ? 'Your background & why this city.'
                  : 'Tell us about your venue — footfall, timings, audience.'
              }
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="bg-white/5 border-white/10 rounded-xl md:col-span-2 focus-visible:ring-blush/40"
            />
            <Button
              type="submit"
              disabled={loading}
              className="md:col-span-2 h-13 py-6 bg-blush text-black hover:bg-white rounded-xl font-medium text-base"
            >
              {loading ? 'Sending…' : 'Send Enquiry'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-blush flex items-center justify-center">
              <Camera className="w-4 h-4 text-black" />
            </div>
            <span className="font-heading font-bold text-xl">
              Says<span className="text-blush"> Cheese</span>
            </span>
          </div>
          <p className="text-white/50 text-sm max-w-md leading-relaxed">
            Kanpur-based premium experiential photobooth company. Marketing people never throw away.
          </p>
          <a
            href="https://instagram.com/sayscheese.in"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 glass-blush rounded-full px-4 py-2 text-xs text-blush hover:bg-blush hover:text-black transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            Follow @sayscheese.in
          </a>
        </div>
        <div>
          <div className="text-blush uppercase text-xs tracking-widest mb-4">Explore</div>
          <ul className="space-y-2 text-sm text-white/60">
            <li><a href="#booths" className="hover:text-blush">Our Booths</a></li>
            <li><a href="#locations" className="hover:text-blush">Locations</a></li>
            <li><a href="#franchise" className="hover:text-blush">Franchise</a></li>
            <li><a href="#faq" className="hover:text-blush">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="text-blush uppercase text-xs tracking-widest mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Business · +91 {CONTACTS.business}</li>
            <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Franchise · +91 {CONTACTS.franchise}</li>
            <li>
              <a
                href="https://instagram.com/sayscheese.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blush transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" /> @sayscheese.in
              </a>
            </li>
            <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Kanpur, India</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10 pt-8 border-t border-white/5 flex flex-wrap justify-between text-white/40 text-xs">
        <div>© {new Date().getFullYear()} Says Cheese. All rights reserved.</div>
        <div>Made with care in India.</div>
      </div>
    </footer>
  )
}

/* ---------- FLOATING WHATSAPP ---------- */

function StickyWA() {
  return (
    <a
      href={`https://wa.me/91${CONTACTS.business}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-green-500/40 rounded-full blur-xl group-hover:blur-2xl transition-all" />
      <div className="relative w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle className="w-6 h-6 text-white" />
      </div>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap glass px-3 py-1.5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        Chat on WhatsApp · +91 {CONTACTS.business}
      </span>
    </a>
  )
}

/* ---------- MARQUEE ---------- */

function Marquee() {
  const items = [
    '★ Zero investment',
    '★ Zero maintenance',
    '★ Zero operational effort',
    '★ 100% operated by Says Cheese',
    '★ Instagram-native visibility',
    '★ Premium ambience enhancement',
    '★ Physical brand recall',
    '★ Memory-linked marketing',
  ]
  const list = [...items, ...items, ...items]
  return (
    <div className="relative border-y border-white/5 bg-black/60 py-5 overflow-hidden">
      <div className="flex gap-14 whitespace-nowrap animate-marquee font-heading text-2xl md:text-3xl">
        {list.map((i, idx) => (
          <span key={idx} className="text-white/40 hover:text-blush transition-colors">
            {i}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- MAIN APP ---------- */

const App = () => {
  const contactRef = useRef(null)

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const submitLead = async (payload, endpoint = 'leads') => {
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Something went wrong')
        return false
      }
      toast.success('We received your enquiry. We will reply within 24 hours.')
      return true
    } catch {
      toast.error('Network error. Please try again.')
      return false
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <MouseSpotlight />
      <Nav onCta={scrollToContact} />
      <Hero onCta={scrollToContact} />
      <SocialProof />
      <Marquee />
      <Problem />
      <Solution />
      <WhyItWorks />
      <HowItWorks />
      <Experience />
      <Locations />
      <Exclusivity onCta={scrollToContact} />
      <WhyPartner />
      <Franchise onSubmitLead={submitLead} />
      <FAQ />
      <Contact onSubmitLead={submitLead} contactRef={contactRef} />
      <Footer />
      <StickyWA />
    </main>
  )
}

export default App
