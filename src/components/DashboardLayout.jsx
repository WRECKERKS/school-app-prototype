import { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import {
  GraduationCap, LogOut, Menu, X, ChevronDown, Check,
  Lock, Sun, Moon, Layers, PanelLeftClose, PanelLeft
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import {
  PLANS, moduleById, modulesFor, groupModules, roleById, appName
} from '../lib/registry'
import { useTheme } from '../lib/useTheme'

const NAV_KEY = 'edusuite.nav'

/** Sidebar starts hidden, so the first screen after signing in is the home
 *  screen full-width rather than a dashboard split in two. */
function initialNavState() {
  try {
    return localStorage.getItem(NAV_KEY) === 'open'
  } catch {
    return false
  }
}

export default function DashboardLayout() {
  const { user, switchRole, switchPlan, logout, rolesForPlan: rolesFn } = useAuth()
  const { theme, toggle: toggleTheme } = useTheme()
  const location = useLocation()
  const [swRoleOpen, setSwRoleOpen] = useState(false)
  const [swPlanOpen, setSwPlanOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [navOpen, setNavOpen] = useState(initialNavState)

  useEffect(() => {
    try {
      localStorage.setItem(NAV_KEY, navOpen ? 'open' : 'closed')
    } catch {
      /* private mode — the choice just does not persist */
    }
  }, [navOpen])

  const plan = user ? PLANS[user.plan] || PLANS.basic : null
  const modules = user ? modulesFor(plan.id, user.roleId) : []
  const roles = user ? rolesFn(plan.id) : []
  const current = moduleById(location.pathname.split('/').pop()) || (location.pathname === '/app' ? moduleById('home') : null)
  const allowedHere = modules.some((m) => m.path === location.pathname)

  /* Close the mobile drawer and any open dropdown on navigation */
  const [navPath, setNavPath] = useState(location.pathname)
  if (navPath !== location.pathname) {
    setNavPath(location.pathname)
    setMobileNav(false)
    setSwRoleOpen(false)
    setSwPlanOpen(false)
  }

  if (!user) return <Navigate to={`/login?plan=${PLANS.basic.id}`} replace />

  const groups = groupModules(modules)
  const RoleIcon = (roleById(user.roleId) || {}).icon

  return (
    <div className={`app-shell ${navOpen ? 'nav-open' : ''}`}>
      {/* Drawer scrim (phones only) */}
      {mobileNav && (
        <button
          type="button"
          className="app-nav-scrim"
          aria-label="Close navigation"
          onClick={() => setMobileNav(false)}
        />
      )}

      {/* Sidebar / drawer */}
      <aside className={`app-sidebar ${mobileNav ? 'mobile-open' : ''}`}>
        <div className="app-sidebar-user">
          <span className="role-avatar">{RoleIcon ? <RoleIcon size={18} /> : null}</span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <b>{user.name}</b>
            <span>{user.role}</span>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm nav-hamburger drawer-close"
            onClick={() => setMobileNav(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm sidebar-collapse"
            onClick={() => setNavOpen(false)}
            aria-label="Hide navigation"
            title="Hide navigation"
          >
            <PanelLeftClose size={16} />
          </button>
        </div>

        <nav className="app-nav" aria-label="Modules">
          {groups.map((g) => (
            <div key={g.name}>
              <div className="app-nav-group-title">{g.name}</div>
              {g.items.map((m) => {
                const Icon = m.icon
                const active = m.path === location.pathname
                return (
                  <Link
                    key={m.id}
                    to={m.path}
                    className={`app-nav-item ${active ? 'active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="nav-ico">
                      <Icon size={17} />
                    </span>
                    {m.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="app-sidebar-foot">
          <span className={`tier-badge badge`}>{plan.name} plan</span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={logout}>
            <LogOut size={15} /> Log out of demo
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="app-main">
        <div className="app-topbar">
          <div className="tb-title">
            <b>{current ? current.label : appName}</b>
            <div>
              {user.role} view &middot; {plan.name} plan
            </div>
          </div>

          <div className="tb-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm nav-hamburger"
              onClick={() => setMobileNav((v) => !v)}
              aria-label={mobileNav ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileNav}
            >
              {mobileNav ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Desktop: show or hide the sidebar. Hidden by default, so the app
                opens on the home screen rather than a two-column dashboard. */}
            <button
              type="button"
              className="btn btn-ghost btn-sm sidebar-toggle"
              onClick={() => setNavOpen((v) => !v)}
              aria-label={navOpen ? 'Hide navigation' : 'Show navigation'}
              aria-expanded={navOpen}
              title={navOpen ? 'Hide navigation' : 'Show navigation'}
            >
              {navOpen ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
            </button>

            <button
              type="button"
              className="btn btn-ghost btn-sm theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Plan switcher */}
            <div className="role-switcher">
              <button
                type="button"
                className="role-switcher-btn"
                onClick={() => { setSwPlanOpen((v) => !v); setSwRoleOpen(false) }}
                aria-expanded={swPlanOpen}
              >
                <Layers size={14} /> {plan.name}
                <ChevronDown size={14} />
              </button>
              {swPlanOpen && (
                <div className="role-switcher-menu" role="menu">
                  <div className="rs-label">Switch plan tier</div>
                  {Object.values(PLANS).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      role="menuitem"
                      className={p.id === plan.id ? 'active' : ''}
                      onClick={() => { switchPlan(p.id); setSwPlanOpen(false) }}
                    >
                      {p.name}
                      <span style={{ marginLeft: 'auto', fontSize: 'var(--t-2xs)', color: 'var(--ink-muted)' }}>
                        {p.price}
                      </span>
                      {p.id === plan.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role switcher */}
            {roles.length > 1 && (
              <div className="role-switcher">
                <button
                  type="button"
                  className="role-switcher-btn"
                  onClick={() => { setSwRoleOpen((v) => !v); setSwPlanOpen(false) }}
                  aria-expanded={swRoleOpen}
                >
                  {RoleIcon ? <RoleIcon size={14} /> : null} {user.role}
                  <ChevronDown size={14} />
                </button>
                {swRoleOpen && (
                  <div className="role-switcher-menu" role="menu">
                    <div className="rs-label">Switch role (no logout)</div>
                    {roles.map((r) => {
                      const Icon = r.icon
                      return (
                        <button
                          key={r.id}
                          type="button"
                          role="menuitem"
                          className={r.id === user.roleId ? 'active' : ''}
                          onClick={() => { switchRole(r.id); setSwRoleOpen(false) }}
                        >
                          {Icon ? <Icon size={14} /> : null} {r.name}
                          {r.id === user.roleId && <Check size={14} style={{ marginLeft: 'auto' }} />}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            <Link to="/" className="btn btn-soft btn-sm tb-brand">
              <GraduationCap size={15} /> {appName}
            </Link>
          </div>
        </div>

        <div className="app-content">
          {allowedHere ? <Outlet /> : <AccessLocked plan={plan} currentLabel={current?.label} />}
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="app-bottomnav" aria-label="Primary">
        {modules.slice(0, 5).map((m) => {
          const Icon = m.icon
          const active = m.path === location.pathname
          return (
            <Link
              key={m.id}
              to={m.path}
              className={`tab-item ${active ? 'active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={21} />
              <span>{m.short || m.label.split(' ')[0]}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function AccessLocked({ plan, currentLabel }) {
  return (
    <div className="panel" style={{ textAlign: 'center', padding: '56px 24px' }}>
      <span className="eb-icon" style={{ margin: '0 auto 16px' }}>
        <Lock size={20} />
      </span>
      <h2 style={{ fontSize: 22, marginBottom: 10 }}>This module needs the {plan.name} plan</h2>
      <p style={{ color: 'var(--ink-muted)', fontSize: 14.5, maxWidth: 460, margin: '0 auto 22px' }}>
        <strong>{currentLabel || 'The requested'}</strong> feature is available on a higher tier.
        Use the plan switcher above, or pick another role that includes it.
      </p>
      <Link to="/start" className="btn btn-primary">
        Compare plans
      </Link>
    </div>
  )
}
