import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  GraduationCap, LogIn, Sparkles, ChevronRight,
  ShieldCheck, Zap, Users2, ArrowRight, X, KeyRound
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PLANS, rolesForPlan } from '../lib/registry'
import { SceneDesk } from '../components/Scenes'

const warmApp = () => {
  const preload = () => {
    import('../components/DashboardLayout').catch(() => {})
    import('./app/HomePage').catch(() => {})
    import('./app/DashboardPage').catch(() => {})
  }
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(preload, { timeout: 1200 })
  } else {
    setTimeout(preload, 200)
  }
}

export default function Login() {
  const { user, loginAsDemo } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(() => { warmApp() }, [])

  const selectedPlan = user?.plan && PLANS[user.plan]
    ? user.plan
    : (PLANS[params.get('plan')] ? params.get('plan') : PLANS.basic.id)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [planChoice, setPlanChoice] = useState(selectedPlan)
  const [error, setError] = useState('')

  const roles = useMemo(() => rolesForPlan(planChoice), [planChoice])
  const activePlan = PLANS[planChoice]

  const enter = (roleId) => {
    loginAsDemo(roleId, planChoice)
    navigate('/app/home')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const pw = password.trim()
    if (pw && pw !== 'demo123') {
      setError('That password is wrong — the demo password is demo123.')
      return
    }
    if (!email.trim()) {
      setError('Please enter an email address.')
      return
    }
    enter(roles[0].id)
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        {/* Brand panel — desktop only */}
        <div className="login-brand">
          <Link to="/" className="logo">
            <span className="logo-icon">
              <GraduationCap size={18} />
            </span>
            EduSuite Pro
          </Link>

          <h2 className="login-brand-title">The complete School OS</h2>
          <p className="login-brand-desc">
            Attendance, fees, grades, homework and AI — across every plan tier, in one platform.
          </p>

          <div className="login-points">
            <div className="login-point">
              <span className="p-ico">
                <ShieldCheck size={15} />
              </span>
              Multi-role secure access
            </div>
            <div className="login-point">
              <span className="p-ico">
                <Zap size={15} />
              </span>
              Real-time updates and parent alerts
            </div>
            <div className="login-point">
              <span className="p-ico">
                <Users2 size={15} />
              </span>
              Teacher, student and parent portals
            </div>
          </div>

          <SceneDesk className="scene login-scene" />
        </div>

        {/* Sign-in card */}
        <div className="login-card">
          <div className="login-card-head">
            <span className="login-app-icon">
              <GraduationCap size={22} />
            </span>
            <h2 className="login-title">Sign in to the {activePlan.name} demo</h2>
            <p className="login-sub">Pick a role, or use any email below.</p>
          </div>

          {/* Plan picker */}
          <div className="field-label">Plan</div>
          <div className="seg-control" role="group" aria-label="Demo plan">
            {Object.values(PLANS).map((p) => (
              <button
                key={p.id}
                type="button"
                className={planChoice === p.id ? 'active' : ''}
                aria-pressed={planChoice === p.id}
                onClick={() => setPlanChoice(p.id)}
              >
                {p.name}
              </button>
            ))}
          </div>

          <p className="login-plan-summary">
            {activePlan.tagline} &middot; {roles.length} roles included
          </p>

          {/* Role list */}
          <div className="field-label">Sign in as</div>
          <div className="login-role-list">
            {roles.map((r) => {
              const Icon = r.icon
              return (
                <button key={r.id} type="button" className="login-role-row" onClick={() => enter(r.id)}>
                  <span className="app-row-ico">
                    {Icon ? <Icon size={17} /> : null}
                  </span>
                  <div className="app-row-text">
                    <b>{r.name}</b>
                    <span>{r.blurb}</span>
                  </div>
                  <ChevronRight size={17} className="app-row-chevron" />
                </button>
              )
            })}
          </div>

          <div className="login-divider">
            <span>or use an email</span>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label className="field-label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="you@school.edu"
              autoComplete="username"
            />

            <label className="field-label" htmlFor="login-password">
              Password
            </label>
            <div className="login-input">
              <input
                id="login-password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="demo123"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-suffix-btn"
                title="Fill the demo password"
                aria-label="Fill the demo password"
                onClick={() => setPassword('demo123')}
              >
                <KeyRound size={15} />
              </button>
            </div>

            {error && (
              <div className="login-error" role="alert">
                <X size={13} /> {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block">
              <LogIn size={16} /> Sign in
            </button>
          </form>

          <div className="login-hint">
            <Sparkles size={13} />
            <span>
              Any email works. The password is <b>demo123</b>. You will enter the{' '}
              {activePlan.name} app as {roles[0].name}.
            </span>
          </div>

          <div className="login-back">
            <Link to="/start">
              <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Change plan
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
