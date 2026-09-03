/* oxlint-disable react/only-export-components -- shared UI helpers module */
import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react'

/* ---- Stock images (Unsplash, remote) ---- */
const UNSPLASH = {
  hero: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
  campus: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
  class: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
  teacher: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=80',
  library: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
  exam: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  kids: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=80',
  parent: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80',
  tech: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  basic: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
  standard: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  premium: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
}

export function img(key) {
  return UNSPLASH[key] || UNSPLASH.hero
}

export function StockImg({ src, alt, className, style, priority, width, height }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}

/* ---- Page header ---- */
export function PageHeader({ title, sub, actions }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {actions && <div className="panel-actions">{actions}</div>}
    </div>
  )
}

/* ---- Panel ---- */
export function Panel({ title, icon, actions, children, className, style }) {
  const TitleIcon = icon
  return (
    <section className={`panel ${className || ''}`} style={style}>
      <div className="panel-header">
        <h3 className="panel-title">
          {TitleIcon && (
            <span className="p-ico">
              <TitleIcon size={17} />
            </span>
          )}
          {title}
        </h3>
        {actions && <div className="panel-actions">{actions}</div>}
      </div>
      {children}
    </section>
  )
}

/* ---- Stat card ---- */
export function StatCard({ icon: Icon, color, value, label, change, changeTone = 'positive' }) {
  return (
    <div className="stat-card">
      <div className="sc-top">
        <span className="stat-icon" style={{ background: color }}>
          <Icon size={19} />
        </span>
        {change && <span className={`stat-change ${changeTone}`}>{change}</span>}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

/* ---- Progress ---- */
export function Progress({ value, color }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${value}%`, background: color }} />
    </div>
  )
}

/* ---- Avatar initials ---- */
const AVATAR_COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4']

export function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const color = AVATAR_COLORS[(name.charCodeAt(0) || 0) % AVATAR_COLORS.length]
  return <span className="avatar" style={{ background: color }}>{initials}</span>
}

/* ---- Toast system ---- */
const ToastCtx = createContext(() => {})

const TOAST_ICONS = {
  success: <CheckCircle2 size={17} />,
  info: <Info size={17} />,
  warn: <AlertTriangle size={17} />,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [leaving, setLeaving] = useState({})

  const push = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setLeaving((l) => ({ ...l, [id]: true })), 3600)
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
      setLeaving((l) => {
        const copy = { ...l }
        delete copy[id]
        return copy
      })
    }, 4200)
    return id
  }, [])

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type} ${leaving[t.id] ? 'leaving' : ''}`}>
            <span className="toast-ico">{TOAST_ICONS[t.type]}</span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  return useContext(ToastCtx)
}

/* ---- Helpers for tables ---- */
export function personCell(name, sub) {
  return (
    <div className="person-cell">
      <Avatar name={name} />
      <div>
        <b>{name}</b>
        <span>{sub}</span>
      </div>
    </div>
  )
}