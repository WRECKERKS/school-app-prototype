import { Link } from 'react-router-dom'
import {
  Shield,
  Users,
  CalendarCheck,
  Check,
  X,
  Sparkles,
  GraduationCap,
  TrendingUp,
  MessageSquare,
  Brain,
  Bus,
  Cpu,
  ChevronRight,
  CalendarDays,
  LayoutDashboard,
  Banknote,
  PenLine,
  BookMarked,
  BarChart3,
  Library,
  Headset,
  LogIn
} from 'lucide-react'

const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '25,000',
    period: '/year',
    color: '#22c55e',
    icon: <Shield size={26} />,
    tagline: 'Essential school management',
    features: [
      { text: 'Multi-Role Access Control (Principal, Admin, Teachers)', included: true },
      { text: 'Basic Profile Directory & Emergency Contacts', included: true },
      { text: 'Daily Attendance Register', included: true },
      { text: 'Class Timetable Builder', included: true },
      { text: 'Internal Staff Announcements', included: true },
      { text: 'Data Export to CSV', included: true },
      { text: 'Parent Access Portal', included: false },
      { text: 'Homework Tracking', included: false },
      { text: 'Fee Collection', included: false },
    ],
    demoPath: '/demo/basic',
    featured: false,
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: '50,000',
    period: '/year',
    color: '#3b82f6',
    icon: <TrendingUp size={26} />,
    tagline: 'Complete school solution',
    features: [
      { text: 'All Basic Features Included', included: true },
      { text: 'Parent, Student & Accounts Portals', included: true },
      { text: 'Homework & Assignments Module', included: true },
      { text: 'Live Gradebook & Report Cards', included: true },
      { text: 'Online Fee Payment Gateway', included: true },
      { text: 'Parent Communications Hub', included: true },
      { text: 'Library & Resource Management', included: true },
      { text: 'Staff Leave & Substitutions', included: true },
    ],
    demoPath: '/demo/standard',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '96,000',
    period: '/year',
    color: '#f59e0b',
    icon: <Sparkles size={26} />,
    tagline: 'AI-powered premium experience',
    features: [
      { text: 'All Standard Features Included', included: true },
      { text: 'Custom Permissions & Multi-Branch', included: true },
      { text: 'AI Lesson Plan Generator', included: true },
      { text: 'AI Quiz & Exam Builder', included: true },
      { text: 'AI Report Card Remarks', included: true },
      { text: '24/7 AI Parent Support Chatbot', included: true },
      { text: 'Bus & Transport Tracking', included: true },
      { text: 'White-Label Branding', included: true },
    ],
    demoPath: '/demo/premium',
    featured: false,
  },
]

export default function Landing() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <span className="badge animate-fade-up">
          <Sparkles size={14} />
          Complete School Management
        </span>
        <h1 className="animate-fade-up delay-100">
          The School OS that <br />
          <span className="gradient-text">grows with you</span>
        </h1>
        <p className="hero-desc animate-fade-up delay-200">
          From essential administration to AI-powered automation — choose the plan
          that fits your school's needs today, and scale up whenever you're ready.
        </p>
        <div className="demo-actions" style={{ justifyContent: 'center' }}>
          <Link to="/compare" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>
            Compare All Plans <ChevronRight size={18} />
          </Link>
          <Link to="/demo/standard" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '16px' }}>
            Try Standard Demo
          </Link>
          <Link to="/login" className="btn btn-ghost" style={{ padding: '14px 28px', fontSize: '16px' }}>
            <LogIn size={16} /> Sign In
          </Link>
        </div>
      </section>

      {/* Quick stats */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-label"><TrendingUp size={14} /> School Growth</div>
            <div className="stat-value">3 Plans</div>
            <span className="stat-change positive">Scales with you</span>
          </div>
          <div className="stat-card">
            <div className="stat-label"><Users size={14} /> Role Portals</div>
            <div className="stat-value">6+</div>
            <span className="stat-change positive">Full access matrix</span>
          </div>
          <div className="stat-card">
            <div className="stat-label"><Cpu size={14} /> AI Features</div>
            <div className="stat-value">5</div>
            <span className="stat-change positive">Premium only</span>
          </div>
          <div className="stat-card">
            <div className="stat-label"><LayoutDashboard size={14} /> Demo Dashboards</div>
            <div className="stat-value">3</div>
            <span className="stat-change positive">Try them live</span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="plans-section">
        <div className="section-title">
          <h2>Choose your plan</h2>
          <p>Every plan is packed with the features your school needs — pick the level that's right for you.</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan, idx) => (
            <div
              key={plan.id}
              className={`plan-card animate-fade-up delay-${(idx + 1) * 100} ${plan.featured ? 'featured' : ''}`}
            >
              {plan.featured && <span className="popular-tag">Most Popular</span>}
              <div className={`plan-icon ${plan.id}`}>{plan.icon}</div>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-subtitle">{plan.tagline}</p>
              <div className="plan-price">
                <span className="price-currency">₹</span>
                <span className="price-value">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>

              <ul className="plan-features">
                {plan.features.map((feat, i) => (
                  <li key={i} className={feat.included ? '' : 'dim'}>
                    {feat.included ? (
                      <Check size={16} className="feature-check" />
                    ) : (
                      <X size={16} className="feature-x" />
                    )}
                    {feat.text}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.demoPath}
                className={`plan-btn ${plan.featured ? 'primary' : ''}`}
              >
                See {plan.name} Demo
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Feature modules overview */}
      <section className="plans-section" style={{ paddingTop: 40 }}>
        <div className="section-title">
          <h2>Powerful modules for every need</h2>
          <p>Explore the feature set that powers modern schools</p>
        </div>
        <div className="feature-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {[
            { icon: <LayoutDashboard size={22} />, cls: 'purple-icon', title: 'Role Dashboards', desc: 'Distinct experiences for Principal, Admin, Teachers, Parents, Students & Accounts.' },
            { icon: <CalendarCheck size={22} />, cls: 'green-icon', title: 'Attendance', desc: 'Daily digital register with instant presence tracking.' },
            { icon: <CalendarDays size={22} />, cls: 'blue-icon', title: 'Timetables', desc: 'Build class schedules for periods and subjects in minutes.' },
            { icon: <PenLine size={22} />, cls: 'orange-icon', title: 'Homework & Assignments', desc: 'Upload tasks, share notes, and track submissions digitally.' },
            { icon: <BarChart3 size={22} />, cls: 'teal-icon', title: 'Live Gradebook', desc: 'Real-time grades, test scores, and printable report cards.' },
            { icon: <Banknote size={22} />, cls: 'pink-icon', title: 'Fee Payment', desc: 'Online collection with instant receipts and reminders.' },
            { icon: <MessageSquare size={22} />, cls: 'purple-icon', title: 'Parent Comms', desc: 'Push notifications for attendance, events, and alerts.' },
            { icon: <Library size={22} />, cls: 'blue-icon', title: 'Library Management', desc: 'Track inventory, issue/return dates, and overdue logs.' },
            { icon: <Brain size={22} />, cls: 'purple-icon', title: 'AI Lesson Plans', desc: 'Generate weekly lesson plans and learning objectives instantly.' },
            { icon: <BookMarked size={22} />, cls: 'green-icon', title: 'AI Quiz Builder', desc: 'Auto-create question papers with answer keys.' },
            { icon: <Headset size={22} />, cls: 'orange-icon', title: 'AI Chatbot', desc: '24/7 automated support for parent queries.' },
            { icon: <Bus size={22} />, cls: 'teal-icon', title: 'Transport Tracking', desc: 'Live bus routes, stops, and vehicle status.' },
          ].map((mod, i) => (
            <div key={i} className="feature-module animate-fade-up" style={{ animationDelay: `${(i % 4) * 100}ms` }}>
              <div className={`module-icon ${mod.cls}`}>{mod.icon}</div>
              <h4 style={{ fontSize: 15, marginBottom: 8 }}>{mod.title}</h4>
              <p>{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hero" style={{ paddingTop: 40 }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(109,92,255,0.15), rgba(139,130,255,0.05))',
          border: '1px solid rgba(109,92,255,0.3)',
          borderRadius: '24px',
          padding: '48px 32px',
          boxShadow: '0 0 60px rgba(109,92,255,0.1)',
        }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>
            Ready to see it in action?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto 28px' }}>
            Explore each plan's interactive demo to understand what your school gets.
          </p>
          <div className="demo-actions" style={{ justifyContent: 'center' }}>
            <Link to="/compare" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              View Comparison
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-primary)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <GraduationCap size={18} style={{ color: 'white' }} />
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)' }}>
              EduSuite Pro
            </span>
          </div>
          <p>Complete school management system • Prototype Demo</p>
          <p style={{ marginTop: 8 }}>© 2026 EduSuite Pro</p>
        </div>
      </footer>
    </main>
  )
}
