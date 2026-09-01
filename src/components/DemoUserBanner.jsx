import { Link } from 'react-router-dom'
import { PlayCircle, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

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

  return (
    <div className="demo-user-banner">
      <span className="demo-user-banner-icon"><ShieldCheck size={15} /></span>
      <span style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 13 }}>
        Signed in as{' '}
        <strong style={{ color: user.color }}>{user.icon} {user.name}</strong>
        {' '}· {user.role}
        {user.isDemo ? ' (Demo)' : ''} · {user.email}
      </span>
      <Link to="/login" className="nav-icon-btn" title="Switch role">
        <PlayCircle size={15} />
      </Link>
    </div>
  )
}