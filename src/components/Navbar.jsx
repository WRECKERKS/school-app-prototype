import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GraduationCap, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/compare', label: 'Plans' },
  { path: '/demo/basic', label: 'Basic' },
  { path: '/demo/standard', label: 'Standard' },
  { path: '/demo/premium', label: 'Premium' },
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
            <GraduationCap size={20} color="white" />
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

          <span className="nav-divider" />

          {user ? (
            <>
              <span className="user-chip" style={{ borderColor: user.color }}>
                <span className="user-chip-avatar" style={{ background: user.color }}>{user.icon}</span>
                <span className="user-chip-info">
                  <span className="user-chip-name">{user.name}</span>
                  <span className="user-chip-role">{user.role}{user.isDemo ? ' • Demo' : ''}</span>
                </span>
              </span>
              <button onClick={handleLogout} className="nav-icon-btn" title="Logout">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-login-btn">
              <LogIn size={15} /> Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}