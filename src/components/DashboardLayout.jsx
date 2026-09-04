import { useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import {
  GraduationCap, LogOut, Menu, X, ChevronDown, Check, RefreshCw, Lock, Sun, Moon
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PLANS, moduleById, modulesFor } from '../lib/registry'
import { appName } from '../lib/registry'
import { useTheme } from '../lib/useTheme'

export default function DashboardLayout() {
  const { user, switchRole, switchPlan, logout, rolesForPlan: rolesFn } = useAuth()
  const { theme, toggle: toggleTheme } = useTheme()
  const location = useLocation()
  const [swRoleOpen, setSwRoleOpen] = useState(false)
  const [swPlanOpen, setSwPlanOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  if (!user) return <Navigate to={`/login?plan=${PLANS.basic.id}`} replace />

  const plan = PLANS[user.plan] || PLANS.basic
  const modules = modulesFor(plan.id, user.roleId)
  const roles = rolesFn(plan.id)
  const currentModuleId = location.pathname === '/app' ? 'dashboard' : location.pathname.split('/').pop()
  const current = moduleById(currentModuleId)
  const allowedHere = modules.some((m) => m.path === location.pathname)

  const groups = []
  for (const m of modules) {
    const g = groups.find((x) => x.name === m.group)
    if (g) g.items.push(m)
    else groups.push({ name: m.group, items: [m] })
  }

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className={`app-sidebar ${mobileNav ? 'mobile-open' : ''}`}>
        <div className="app-sidebar-user">
          <span className="role-avatar" style={{ background: user.color }}>{user.icon}</span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <b style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</b>
            <span>{user.role}</span>
          </div>
          <span className={`tier-badge badge ${plan.id}`}>{plan.name}</span>
        </div>

        <nav className="app-nav">
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
                    onClick={() => setMobileNav(false)}
                  >
                    <span className="nav-ico"><Icon size={16} /></span>
                    {m.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="app-sidebar-foot">
          <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }} onClick={logout}>
            <LogOut size={15} /> Log out of demo
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="app-main">
        <div className="app-topbar">
          <div className="tb-title">
            <b>{current ? current.label : 'EduSuite Pro'}</b>
            <div>
              {plan.name} plan • {user.role} view
            </div>
          </div>

          <div className="tb-actions">
            <button className="btn btn-ghost btn-sm nav-hamburger" onClick={() => setMobileNav((v) => !v)}>
              {mobileNav ? <X size={18} /> : <Menu size={18} />}
            </button>

            <button className="btn btn-ghost btn-sm theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Plan switcher */}
            <div className="role-switcher" style={{ position: 'relative' }}>
              <button
                className="role-switcher-btn"
                onClick={() => { setSwPlanOpen((v) => !v); setSwRoleOpen(false) }}
              >
                <RefreshCw size={14} /> Show {plan.name} plan
                <ChevronDown size={14} />
              </button>
              {swPlanOpen && (
                <div className="role-switcher-menu">
                  <div className="rs-label">Switch plan tier</div>
                  {Object.values(PLANS).map((p) => (
                    <button
                      key={p.id}
                      className={p.id === plan.id ? 'active' : ''}
                      onClick={() => { switchPlan(p.id); setSwPlanOpen(false); setSwRoleOpen(false) }}
                    >
                      <span className="tier-badge badge" style={{ background: p.soft, borderColor: p.color, color: p.color }}>
                        {p.name}
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
                  className="role-switcher-btn"
                  onClick={() => { setSwRoleOpen((v) => !v); setSwPlanOpen(false) }}
                >
                  {user.icon} {user.role} <ChevronDown size={14} />
                </button>
                {swRoleOpen && (
                  <div className="role-switcher-menu">
                    <div className="rs-label">Switch role (no logout)</div>
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        className={r.id === user.roleId ? 'active' : ''}
                        onClick={() => { switchRole(r.id); setSwRoleOpen(false) }}
                      >
                        <span>{r.icon}</span> {r.name}
                        {r.id === user.roleId && <Check size={14} style={{ marginLeft: 'auto' }} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Link to="/" className="btn btn-soft btn-sm">
              <GraduationCap size={15} /> {appName}
            </Link>
          </div>
        </div>

        <div className="app-content">
          {allowedHere ? <Outlet /> : <AccessLocked plan={plan} currentLabel={current?.label} />}
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="app-bottomnav" aria-label="Primary navigation">
        {modules.slice(0, 5).map((m) => {
          const Icon = m.icon
          const active = m.path === location.pathname
          return (
            <Link key={m.id} to={m.path} className={`bn-item ${active ? 'active' : ''}`} onClick={() => setMobileNav(false)}>
              <Icon size={20} />
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
    <div className="panel" style={{ textAlign: 'center', padding: '60px 24px' }}>
      <h2 style={{ fontSize: 22, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
        <Lock size={20} style={{ color: 'var(--primary)' }} /> This module needs the {plan.name} plan
      </h2>
      <p style={{ color: 'var(--ink-muted)', fontSize: 14.5, maxWidth: 460, margin: '0 auto 22px' }}>
        The <strong>{currentLabel || 'requested'}</strong> feature is available on a higher tier.
        Use the <em>Show plan</em> switcher above or pick another role that includes it.
      </p>
      <Link to="/start" className="btn btn-primary">
        Compare plans
      </Link>
    </div>
  )
}