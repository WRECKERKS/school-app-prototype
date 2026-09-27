import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GraduationCap, LogOut, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PLANS, roleById } from '../lib/registry'
import { useTheme } from '../lib/useTheme'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/start', label: 'Live Demo' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggle: toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const RoleIcon = user ? (roleById(user.roleId) || {}).icon : null
  const planName = user ? (PLANS[user.plan] || PLANS.basic).name : ''

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <GraduationCap size={17} />
          </span>
          EduSuite Pro
        </Link>

        <div className="nav-links">
          <button
            type="button"
            className="btn btn-ghost btn-sm theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

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
                <Link to="/app/home" className="user-chip">
                  <span className="nav-ico">
                    {RoleIcon ? <RoleIcon size={14} /> : null}
                  </span>
                  <span className="user-chip-name">{user.name}</span>
                  <span className="tier-badge badge">{planName}</span>
                </Link>
                <button type="button" onClick={handleLogout} className="btn btn-ghost btn-sm" title="Logout">
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