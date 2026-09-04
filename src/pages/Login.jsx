import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  GraduationCap, Mail, Lock, LogIn, Sparkles, ChevronRight,
  ShieldCheck, Zap, Users2, ArrowRight, PlayCircle, X, RefreshCw
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PLANS, rolesForPlan } from '../lib/registry'

const warmApp = () => {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(() => {
      import('../components/DashboardLayout').catch(() => {})
      import('./app/DashboardPage').catch(() => {})
    }, { timeout: 1200 })
  } else {
    setTimeout(() => {
      import('../components/DashboardLayout').catch(() => {})
      import('./app/DashboardPage').catch(() => {})
    }, 200)
  }
}

export default function Login() {
  const { user, loginAsDemo } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(() => { warmApp() }, [])

  const planHint = user?.plan
  const selectedPlan = PLANS[planHint] ? planHint : (params.get('plan') || PLANS.basic.id)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [planChoice, setPlanChoice] = useState(selectedPlan)
  const [error, setError] = useState('')

  const roles = useMemo(() => rolesForPlan(planChoice), [planChoice])
  const activePlan = PLANS[planChoice]

  const instantDemo = () => {
    loginAsDemo(roles[0].id, planChoice)
    navigate('/app')
  }

  const demoAsRole = (roleId) => {
    loginAsDemo(roleId, planChoice)
    navigate('/app')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please enter an email address.')
      return
    }
    demoAsRole(roles[0].id)
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        {/* Brand panel */}
        <div className="login-brand">
          <Link to="/" className="logo" style={{ color: '#fff' }}>
            <span className="logo-icon">
              <GraduationCap size={20} color="#fff" />
            </span>
            EduSuite Pro
          </Link>

          <h2 className="login-brand-title">
            The complete <br /> School OS
          </h2>
          <p className="login-brand-desc">
            Attendance, fees, grades, homework and AI — across every plan tier, in one platform.
          </p>

          <div className="login-points">
            <div className="login-point"><span className="p-ico"><ShieldCheck size={16} /></span> Multi-role secure access</div>
            <div className="login-point"><span className="p-ico"><Zap size={16} /></span> Real-time updates & parent alerts</div>
            <div className="login-point"><span className="p-ico"><Users2 size={16} /></span> Teacher, student & parent portals</div>
          </div>
        </div>

        {/* Form panel */}
        <div className="login-form-panel">
          <h2 className="login-title">Start the {activePlan.name} demo</h2>
          <p className="login-sub">Fresh session — pick the plan, then a role. No credentials needed.</p>

          {/* Plan selector */}
          <div className="login-step-label">Step 1 — Demo plan</div>
          <div className="chip-row" style={{ marginBottom: 10 }}>
            {Object.values(PLANS).map((p) => (
              <button
                key={p.id}
                type="button"
                className={`chip ${planChoice === p.id ? 'active' : ''}`}
                style={planChoice === p.id ? { background: p.color, borderColor: p.color } : undefined}
                onClick={() => setPlanChoice(p.id)}
              >
                {p.name} • {p.price}
              </button>
            ))}
          </div>
          <div className="login-plan-summary">
            <span className="lps-dot" style={{ background: activePlan.color }} />
            <span className="lps-name">{activePlan.name}</span>
            <span className="lps-tag">{activePlan.tagline}</span>
            <span className="lps-roles">{roles.length} roles</span>
          </div>

          {/* Role selector */}
          <div className="login-step-label">Step 2 — Role (roles for {activePlan.name})</div>
          <div className="login-role-grid">
            {roles.map((r) => (
              <button key={r.id} type="button" className="login-role-chip" onClick={() => demoAsRole(r.id)}>
                <span className="chip-emoji">{r.icon}</span>
                {r.name}
                <span
                  className="plan-pill"
                  style={{ borderColor: `${r.color}55`, color: r.color, fontSize: 10.5 }}
                >
                  {r.desc.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          <button type="button" className="btn btn-primary login-demo-btn" onClick={instantDemo}>
            <PlayCircle size={20} /> Instant demo as {roles[0].name}
            <ChevronRight size={18} />
          </button>

          <div className="login-demo-meta">
            Logs you in instantly • opens the <strong>{activePlan.name}</strong> app
          </div>

          <div className="login-divider"><span>or sign in with any email</span></div>

          <form className="login-form" onSubmit={handleLogin}>
            <label className="login-field">
              <span>Email address</span>
              <div className="login-input">
                <Mail size={16} />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} placeholder="you@school.edu" />
              </div>
            </label>
            <label className="login-field">
              <span>Password</span>
              <div className="login-input">
                <Lock size={16} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
            </label>
            {error && <div className="login-error"><X size={13} /> {error}</div>}
            <button type="submit" className="btn btn-secondary login-submit">
              <LogIn size={17} /> {password !== 'demo123' && password ? 'Sign In (demo accepts demo123)' : 'Sign In as demo'}
            </button>
          </form>

          <div className="login-hint">
            <Sparkles size={13} /> Accepts any email — password <b>demo123</b>. You&apos;ll enter the {activePlan.name} app as {roles[0].name}.
            <span style={{ display: 'inline-flex' }}><RefreshCw size={12} /></span>
          </div>

          <div className="login-back">
            <Link to="/start">
              <ArrowRight size={15} style={{ transform: 'rotate(180deg)' }} /> Choose another plan
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}