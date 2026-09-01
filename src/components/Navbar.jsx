import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GraduationCap, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/start', label: 'Live Demo' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <GraduationCap size={20} color="#fff" />
          </span>
          EduSuite Pro
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="nav-user">
            {user ? (
              <>
                <Link to="/app" className="user-chip" style={{ borderColor: user.color }}>
                  <span style={{ fontSize: 15 }}>{user.icon}</span>
                  <span style={{ maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
                  <span className="tier-badge badge" style={{ background: 'var(--bg-soft)' }}>{user.plan}</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm" title="Logout">
                  <LogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <Link to="/start" className="btn btn-primary btn-sm">
                <GraduationCap size={15} /> Start Demo
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}