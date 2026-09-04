import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap, Star, ListChecks, Check, ArrowRight, Users,
  CalendarCheck, Wallet, FileBarChart2, MessageSquareWarning, ScanLine, Download
} from 'lucide-react'
import { PLANS } from '../lib/registry'
import { img, StockImg, useToast } from '../components/ui'
import CountUp from '../components/CountUp'
import LazySection from '../components/LazySection'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

function HeroStat({ value, suffix, label }) {
  return (
    <div className="hero-stat">
      <b><CountUp value={value} />{suffix}</b>
      <span>{label}</span>
    </div>
  )
}

const LANDFEATURES = [
  { icon: Users, color: '#6366f1', title: 'Multi-role portals', desc: 'Principal, admin, teacher, student, parent and accounts — each with their own view.' },
  { icon: CalendarCheck, color: '#10b981', title: 'Live attendance', desc: 'QR, GPS-secured or manual marking with instant parent SMS alerts.' },
  { icon: Wallet, color: '#d97706', title: 'Fees & finance', desc: 'UPI, Card or Wallet payments with automatic receipts and reminders.' },
  { icon: FileBarChart2, color: '#8b5cf6', title: 'Tests & results', desc: 'Question bank of 40,000+ items, AI difficulty balancing and deep analytics.' },
  { icon: MessageSquareWarning, color: '#3b82f6', title: 'Parent alerts', desc: 'Broadcast notices over SMS, WhatsApp, Email and voice calls.' },
  { icon: ScanLine, color: '#0ea5e9', title: 'Board-ready audit', desc: 'Every action logged with user, IP and timestamp for full accountability.' },
]

const TESTIMONIALS = [
  { name: 'Mrs. Kavita Verma', role: 'Principal, Sunrise Public School', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80', quote: 'We replaced three apps with EduSuite. Attendance and fees alone save our office staff 15 hours a week.' },
  { name: 'Rajesh Kumar', role: 'Science Teacher, Class 10', photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=120&q=80', quote: 'The question bank and homework grading are brilliant. Reviewing submissions takes minutes now.' },
  { name: 'Anita Sharma', role: 'Parent of two students', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80', quote: 'I know attendance, fees and homework on my phone before my kids even reach home. Very reassuring.' },
]

export default function Landing() {
  const reducedMotion = usePrefersReducedMotion()
  const toast = useToast()
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const installApp = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    setInstallPrompt(null)
    if (outcome === 'accepted') { setInstalled(true); toast('Installed — EduSuite Pro is now on your device.', 'success') }
  }

  const scrollToPlans = (e) => {
    e.preventDefault()
    const el = document.getElementById('plans')
    if (!el) return
    if (reducedMotion) {
      el.scrollIntoView()
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="landing">
      {/* Hero */}
      <header className="hero">
        <div>
          <span className="hero-eyebrow"><Star size={14} /> Trusted by 200+ schools • Starts at ₹25,000/yr</span>
          <h1 className="hero-title">
            The complete <span className="grad">School OS</span> — attendance, fees and results in one place
          </h1>
          <p className="hero-sub">
            Every daily school task — attendance, fee collection, homework, tests and parent updates —
            on one friendly platform. Start on Basic, grow to Premium.
          </p>
          <div className="hero-cta">
            <Link to="/start" className="btn btn-primary btn-lg"><Star size={18} /> Start Demo</Link>
            <Link to="/" className="btn btn-soft btn-lg" onClick={scrollToPlans}>
              See plans <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-trust">
            <span><Check size={14} /> No credit card needed</span>
            <span className="trust-sep" />
            <span><Check size={14} /> 60-second setup</span>
            <span className="trust-sep" />
            <span><Check size={14} /> Free upgrades between plans</span>
          </div>
          <div className="hero-stats">
            <HeroStat value={40247} suffix="" label="Question bank items" />
            <HeroStat value={12} suffix="K" label="Parent alerts sent this month" />
            <HeroStat value={92} suffix="%" label="Fee collection rate" />
          </div>
        </div>

        <div className="hero-visual">
          <StockImg
            src={img('hero')}
            alt="Students in a classroom"
            className="hero-img"
            priority
            width={1200}
            height={900}
            style={{ width: '100%' }}
          />
          <div className="hero-img-badge top">
            <span className="h-ico"><Users size={16} /></span>
            245 students • 18 staff
          </div>
          <div className="hero-img-badge bottom">
            <span className="h-ico" style={{ background: '#10b981' }}><Check size={16} /></span>
            Attendance 87% • Fees 92%
          </div>
          <div className="hero-img-badge mid">
            <span className="h-ico" style={{ background: '#8b5cf6' }}><ScanLine size={16} /></span>
            QR attendance live
          </div>
        </div>
      </header>

      {/* Features */}
      <LazySection as="section" className="section" id="features">
        <div className="section-head">
          <span className="section-kicker">Built for daily school life</span>
          <h2>Everything your staff and parents touch, in one app</h2>
          <p>Six core modules — each one available up to your plan tier.</p>
        </div>
        <div className="features-grid">
          {LANDFEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div className="feature-card" key={f.title} style={{ '--i': i }}>
                <span className="feature-icon" style={{ background: f.color }}><Icon size={22} /></span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            )
          })}
        </div>
      </LazySection>

      {/* Plans */}
      <LazySection as="section" className="section" id="plans">
        <div className="section-head">
          <span className="section-kicker">Simple pricing</span>
          <h2>Three plans. One platform. Grow as you go.</h2>
          <p>Basic covers essentials. Standard adds daily operations. Premium brings analytics and AI.</p>
        </div>
        <div className="plan-grid">
          {[
            {
              id: 'basic',
              name: 'Basic',
              price: '₹25,000',
              desc: 'For small schools that need essentials, done right.',
              feats: ['Overview dashboard', 'Attendance register', 'Class timetable', 'Staff directory', 'Announcements'],
              cta: 'Start Basic demo',
            },
            {
              id: 'standard',
              name: 'Standard',
              price: '₹50,000',
              desc: 'Complete daily operations with parent engagement.',
              feats: ['Everything in Basic', 'Fee management + receipts', 'Homework & grading', 'Tests & results', 'Notes library', 'Parent alerts (SMS/WhatsApp)'],
              cta: 'Start Standard demo',
              featured: true,
            },
            {
              id: 'premium',
              name: 'Premium',
              price: '₹96,000',
              desc: 'Everything, supercharged with analytics and AI.',
              feats: ['Everything in Standard', 'Advanced analytics (4 views)', '40K+ question bank + AI builder', 'QR / GPS attendance', 'Doubts & full activity log'],
              cta: 'Start Premium demo',
            },
          ].map((p, i) => (
            <div key={p.id} className={`plan-card ${p.id} ${p.featured ? 'featured' : ''}`} style={{ '--i': i }}>
              <span className={`plan-icon ${p.id}`}>
                {p.id === 'basic' ? <ListChecks size={26} /> : p.id === 'standard' ? <Users size={26} /> : <Star size={26} />}
              </span>
              <h3 className="plan-name">{p.name}</h3>
              <p className="plan-desc">{p.desc}</p>
              <div className="plan-price"><b>{p.price}</b><span>/year, rolling</span></div>
              <ul className="plan-feats">
                {p.feats.map((f) => (
                  <li key={f}>
                    <span className="f-ico" style={{ background: PLANS[p.id].soft, color: PLANS[p.id].color }}><Check size={13} /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/start" className="btn btn-primary" style={{ justifyContent: 'center' }}>{p.cta} <ArrowRight size={15} /></Link>
            </div>
          ))}
        </div>
      </LazySection>

      {/* Testimonials */}
      <LazySection as="section" className="section">
        <div className="section-head">
          <span className="section-kicker">What schools say</span>
          <h2>Trusted by principals, teachers and parents</h2>
        </div>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="tcard" key={t.name} style={{ '--i': i }}>
              <div className="tcard-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
              <p>“{t.quote}”</p>
              <div className="tcard-person">
                <StockImg src={t.photo} alt={t.name} />
                <div><b>{t.name}</b><span>{t.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </LazySection>

      {/* CTA band */}
      <LazySection className="cta-band" as="div">
        <div className="cta-band-inner">
          <div>
            <h2>Take EduSuite everywhere</h2>
            <p>Get the native Android app for staff and parents. Open a fresh demo — pick a plan, choose a role, and explore the full app in under 30 seconds.</p>
            <div className="store-badges">
              <a className="store-badge" href="https://github.com/WRECKERKS/school-app-prototype/releases/download/v1.0.0/app-debug.apk">
                <span className="store-ico">▶</span>
                <span><small>Get it on</small><b>Google Play</b></span>
              </a>
              <button className="store-badge" onClick={() => toast('Android APK (debug build) is ready — v1.0.0. The iOS build is in private beta.', 'info')}>
                <span className="store-ico">🍎</span>
                <span><small>Download on the</small><b>App Store</b></span>
              </button>
              {installPrompt && !installed && (
                <button className="store-badge store-install" onClick={installApp}>
                  <span className="store-ico"><Download size={15} /></span>
                  <span><small>Or add to your device</small><b>Install the app</b></span>
                </button>
              )}
              {installed && (
                <span className="badge status-success installed-pill">Installed on this device</span>
              )}
            </div>
          </div>
          <div className="phone-mock">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="pm-appbar"><span>EduSuite Pro</span></div>
              <div className="pm-hello">
                <b>Good morning, Arjun 👋</b>
                <small>Class 10A • 87% attendance</small>
              </div>
              <div className="pm-cards">
                <div className="pm-card p1"><b>Fees</b><small>₹8,500 due</small></div>
                <div className="pm-card p2"><b>Homework</b><small>3 pending</small></div>
                <div className="pm-card p3"><b>Results</b><small>Avg 88%</small></div>
              </div>
              <div className="pm-row">
                <div className="pm-chip c1">Attendance 87%</div>
                <div className="pm-chip c2">Fees 92%</div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      <footer className="footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="logo" style={{ fontSize: 16 }}><span className="logo-icon" style={{ width: 30, height: 30 }}><GraduationCap size={16} color="#fff" /></span>EduSuite Pro</span>
        </div>
        <div>Interactive prototype for school demos • Built with React + Vite</div>
      </footer>
    </div>
  )
}