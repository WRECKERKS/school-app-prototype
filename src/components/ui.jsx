/* oxlint-disable react/only-export-components -- shared UI helpers module */
import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

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

/* ---- Tones -------------------------------------------------------------
   The only colour vocabulary in the app. Components take a tone name and
   resolve it to a CSS class, so no component ever hardcodes a hex value. */
const TONE_CLASS = {
  neutral: '',
  accent: 'accent',
  good: 'good',
  warn: 'warn',
  info: 'info',
  success: 'good',
  danger: 'accent',
  positive: 'positive',
  negative: 'negative',
}

const toneClass = (tone) => TONE_CLASS[tone] ?? ''

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
      {title && (
        <div className="panel-header">
          <h3 className="panel-title">
            {TitleIcon && (
              <span className="p-ico">
                <TitleIcon size={15} />
              </span>
            )}
            {title}
          </h3>
          {actions && <div className="panel-actions">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}

/* ---- Stat card: monochrome by default, tone only for real state ---- */
export function StatCard({ icon: Icon, tone = 'neutral', value, label, change, changeTone = 'positive' }) {
  return (
    <div className="stat-card">
      <div className="sc-top">
        <span className={`stat-icon ${toneClass(tone)}`}>
          <Icon size={17} />
        </span>
        {change && <span className={`stat-change ${toneClass(changeTone)}`}>{change}</span>}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

/* ---- Progress: tone-driven, never a raw colour ---- */
export function Progress({ value, tone = 'neutral' }) {
  return (
    <div className="progress-bar">
      <div className={`progress-fill ${toneClass(tone)}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

/* Semantic tone for a percentage — restrained, not neon */
export function pctTone(value, { hi = 90, mid = 75 } = {}) {
  if (value >= hi) return 'good'
  if (value >= mid) return 'neutral'
  return 'warn'
}

/* Read a CSS variable as a raw string (for recharts props) */
function cssVar(name, fallback) {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

/* Theme-aware chart colours that adapt to light / dark mode */
export function chartTheme() {
  return {
    grid: cssVar('--rule-soft', '#e8e2d7'),
    tick: cssVar('--ink-muted', '#6b655c'),
    tooltipFill: cssVar('--paper-raised', '#fdfbf7'),
    polar: cssVar('--rule', '#ddd6c9'),
    polarTick: cssVar('--ink-soft', '#45403a'),
    primary: cssVar('--ink', '#1a1815'),
    accent: cssVar('--accent', '#8c2f26'),
    good: cssVar('--good', '#2c6550'),
    warn: cssVar('--warn', '#85611c'),
  }
}

/* ---- Avatar: initials on paper. No per-person colour. ---- */
export function Avatar({ name, size }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <span className="avatar" style={size ? { width: size, height: size } : undefined}>
      {initials}
    </span>
  )
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
      <div className="toast-stack" role="status" aria-live="polite">
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
        {sub && <span>{sub}</span>}
      </div>
    </div>
  )
}

export function Modal({ open, onClose, title, icon: Icon, children, footer }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <span className="modal-title">
            {Icon && <Icon size={18} />}
            {title}
          </span>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  )
}

export { toneClass }
