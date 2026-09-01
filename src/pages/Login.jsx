import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  GraduationCap, Mail, Lock, LogIn, Sparkles, ChevronRight,
  ShieldCheck, Zap, Users2, ArrowRight, PlayCircle, X
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { demoRoles, loginAsDemo, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('principal')
  const [error, setError] = useState('')

  const selectedPlan = demoRoles.find((r) => r.id === selectedRole)?.plan || 'standard'

  const continueAsDemo = (roleId) => {
    const role = loginAsDemo(roleId)
    const isDemoRoute = from.startsWith('/demo')
    navigate(isDemoRoute ? from : `/demo/${role.plan}`)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please enter an email address.')
      return
    }
    login(email.trim(), selectedRole)
    navigate(from)
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        {/* Brand panel */}
        <div className="login-brand">
          <div className="login-brand-inner">
            <Link to="/" className="logo" style={{ color: 'white' }}>
              <span className="logo-icon">
                <GraduationCap size={20} color="white" />
              </span>
              EduSuite Pro
            </Link>

            <h1 className="login-brand-title">
              The complete <br />
              <span className="gradient-text">School OS</span>
            </h1>
            <p className="login-brand-desc">
              One platform for attendance, grades, fees, parents, and AI-powered
              automation — across every plan tier.
            </p>

            <div className="login-brand-points">
              {[
                { icon: <ShieldCheck size={18} />, label: 'Multi-role secure access' },
                { icon: <Zap size={18} />, label: 'Real-time updates & alerts' },
                { icon: <Users2 size={18} />, label: 'Parent, staff & student portals' },
                { icon: <Sparkles size={18} />, label: 'AI-powered lesson & exam builder' },
              ].map((p, i) => (
                <div key={i} className="login-brand-point">
                  <span className="login-brand-point-icon">{p.icon}</span>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>

            <div className="login-brand-footer">
              <span className="status-badge status-present"><PlayCircle size={12} /> Prototype</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                No credentials required — try any role
              </span>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="login-form-panel">
          <div className="login-form-inner">
            <h2 className="login-form-title">Welcome back</h2>
            <p className="login-form-sub">Sign in to access your school workspace</p>

            {/* Role selector */}
            <div className="login-role-select">
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>
                Step 1 — Choose your role
              </div>
              <div className="login-role-grid">
                {demoRoles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`login-role-chip ${selectedRole === r.id ? 'active' : ''}`}
                    style={selectedRole === r.id ? { borderColor: r.color, background: `${r.color}1f` } : undefined}
                  >
                    <span style={{ fontSize: 18 }}>{r.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: 12 }}>{r.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Demo button */}
            <button
              type="button"
              className="btn btn-primary login-demo-btn"
              onClick={() => continueAsDemo(selectedRole)}
            >
              <PlayCircle size={20} />
              Continue as Demo
              <ChevronRight size={18} />
            </button>

            <div className="login-demo-meta">
              Logs you in as{' '}
              <strong>{demoRoles.find((r) => r.id === selectedRole)?.name}</strong> and opens the{' '}
              <span className="plan-pill" style={{
                color: selectedPlan === 'premium' ? '#f59e0b' : selectedPlan === 'standard' ? '#3b82f6' : '#22c55e',
                borderColor: selectedPlan === 'premium' ? 'rgba(245,158,11,0.4)' : selectedPlan === 'standard' ? 'rgba(59,130,246,0.4)' : 'rgba(34,197,94,0.4)',
              }}>
                {selectedPlan} demo
              </span>
            </div>

            <div className="login-divider">
              <span>or sign in with</span>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <label className="login-field">
                <span>Email address</span>
                <div className="login-input">
                  <Mail size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder="you@school.edu"
                  />
                </div>
              </label>
              <label className="login-field">
                <span>Password</span>
                <div className="login-input">
                  <Lock size={16} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </label>

              {error && <div className="login-error"><X size={13} /> {error}</div>}

              <button type="submit" className="btn btn-secondary login-submit">
                <LogIn size={17} /> Sign In
              </button>
            </form>

            <div className="login-hint">
              <Sparkles size={13} />
              This is a prototype — the demo button instantly logs you in as your chosen role.
            </div>

            <div className="login-back">
              <Link to="/">
                <ArrowRight size={15} style={{ transform: 'rotate(180deg)' }} />
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}