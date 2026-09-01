import { Link } from 'react-router-dom'
import { PlayCircle, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const planBadge = {
  basic: { label: 'Basic', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  standard: { label: 'Standard', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  premium: { label: 'Premium', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
}

export default function DemoUserBanner() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="demo-user-banner">
        <span className="demo-user-banner-icon"><PlayCircle size={15} /></span>
        <span style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 13 }}>
          You're exploring this prototype as a guest.
        </span>
        <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>
          Continue as Demo
        </Link>
      </div>
    )
  }

  const badge = planBadge[user.plan] || planBadge.standard

  return (
    <div className="demo-user-banner">
      <span className="demo-user-banner-icon"><ShieldCheck size={15} /></span>
      <span style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 13 }}>
        Signed in as{' '}
        <strong style={{ color: user.color }}>{user.icon} {user.name}</strong>
        {' '}· {user.role}
        {user.isDemo ? ' (Demo)' : ''} · {user.email}
        <span
          className="plan-tier-badge"
          style={{ backgroundColor: badge.bg, color: badge.color, borderColor: `${badge.color}55` }}
        >
          {badge.label} plan
        </span>
      </span>
      <Link to="/login" className="nav-icon-btn" title="Switch role">
        <PlayCircle size={15} />
      </Link>
    </div>
  )
}
