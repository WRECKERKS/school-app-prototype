import { useRef, useState } from 'react'
import { CalendarCheck, MapPin, ScanLine, FileDown, RotateCcw } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, Progress, pctColor, useToast } from '../../components/ui'
import { classes } from '../../lib/mock'

export default function AttendancePage() {
  const { user } = useAuth()
  const pre = user.plan === 'premium'
  const [rows, setRows] = useState(classes)
  const toast = useToast()

  const toggle = (name) => {
    setRows((r) => r.map((row) => {
      if (row.name !== name || row.absent === 0) return row
      const present = row.present + 1
      return { ...row, present, absent: row.absent - 1, pct: Math.round((present / row.total) * 100) }
    }))
    toast(`Marked one student present in ${name} — SMS sent to parent.`)
  }

  return (
    <>
      <PageHeader
        title="Attendance"
        sub={pre
          ? 'QR scan, GPS-secure or manual marking — parents are notified on every update.'
          : 'Quick daily register — click a class to mark a student present, parents get an SMS.'}
        actions={<button className="btn btn-soft btn-sm" onClick={() => { setRows(classes); toast('Register reset to defaults.', 'info') }}><RotateCcw size={14} /> Reset</button>}
      />

      {pre && <AttendanceTools />}

      <Panel
        title="Daily Attendance Register"
        icon={CalendarCheck}
        actions={
          <>
            <button className="btn btn-ghost btn-sm">Yesterday</button>
            <button className="btn btn-primary btn-sm">Today, 1 Sep</button>
            <button className="btn btn-soft btn-sm" onClick={() => toast('CSV exported for Sep 1 register.', 'success')}><FileDown size={14} /> Export CSV</button>
          </>
        }
      >
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Class</th><th>Total</th><th>Present</th><th>Absent</th><th>Attendance %</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="clickable-row" onClick={() => toggle(row.name)}>
                  <td className="strong">{row.name}</td>
                  <td>{row.total}</td>
                  <td style={{ color: '#15803d', fontWeight: 800 }}>{row.present}</td>
                  <td style={{ color: '#b91c1c', fontWeight: 800 }}>{row.absent}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 150 }}>
                      <div style={{ flex: 1 }}><Progress value={row.pct} color={pctColor(row.pct, { hi: 95, mid: 92 })} /></div>
                      <span style={{ fontWeight: 800, fontSize: 13 }}>{row.pct}%</span>
                    </div>
                  </td>
                  <td>
                    {row.pct >= 95 ? <span className="status-badge status-present">Excellent</span>
                      : row.pct >= 92 ? <span className="status-badge status-info">Good</span>
                        : <span className="status-badge status-pending">Needs review</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-hint" style={{ marginTop: 12, fontSize: 12.5, color: 'var(--ink-muted)' }}>💡 Click any row to demo marking one student present.</div>
      </Panel>
    </>
  )
}

function AttendanceTools() {
  const toast = useToast()
  const [scanning, setScanning] = useState(false)
  const [gpsState, setGpsState] = useState('idle')
  const timer = useRef(null)

  const startQr = () => {
    setScanning(true)
    timer.current = setTimeout(() => {
      setScanning(false)
      toast('QR verified — Arjun Patel marked present. Parent notified via SMS & WhatsApp.')
    }, 2200)
  }

  const startGps = () => {
    setGpsState('locating')
    timer.current = setTimeout(() => {
      setGpsState('verified')
      toast('Location verified within 50m of school. Class 10A marked present (GPS method).')
    }, 3000)
  }

  return (
    <div className="attendance-tools">
      <Panel title="QR Attendance" icon={ScanLine}>
        <div className="qr-widget">
          <div className={`qr-box ${scanning ? 'scanning' : ''}`}>
            {scanning && <span className="qr-scan-line" />}
            <span className="qr-corner tl" /><span className="qr-corner tr" />
            <span className="qr-corner bl" /><span className="qr-corner br" />
            <span className="qr-code">{['█▓▒░█▓▒░█▓▒░█▓', '▒░█▓▒░█▓▒░█▓▒', '░█▓▒░█▓▒░█▓▒░'].map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}</span>
          </div>
          <button className="btn btn-primary" onClick={startQr} disabled={scanning}>
            {scanning ? 'Scanning…' : 'Start SCAN'}
          </button>
          <p style={{ fontSize: 12.5, color: 'var(--ink-muted)', textAlign: 'center' }}>Simulated scan — auto-verifies the student card.</p>
        </div>
      </Panel>

      <Panel title="GPS Attendance" icon={MapPin}>
        <div className="qr-widget">
          <div className="qr-box" style={{ flexDirection: 'column', gap: 10, background: 'var(--card-soft)' }}>
            <MapPin size={44} style={{ color: gpsState === 'verified' ? '#22c55e' : '#6366f1' }} />
            <span className={`pulse-dot ${gpsState !== 'verified' ? '' : ''}`} style={{ background: gpsState === 'verified' ? '#22c55e' : '#6366f1' }} />
            {gpsState === 'idle' && <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-muted)' }}>Locate 10A within 50m</span>}
            {gpsState === 'locating' && <span style={{ fontSize: 12.5, fontWeight: 800, color: '#6366f1' }}>Verifying radius…</span>}
            {gpsState === 'verified' && <span style={{ fontSize: 12.5, fontWeight: 800, color: '#15803d' }}>Verified ✓ 48.2m from school gates</span>}
          </div>
          <button className="btn btn-accent" onClick={startGps} disabled={gpsState === 'locating'}>
            {gpsState === 'locating' ? 'Verifying…' : 'Verify location'}
          </button>
          <p style={{ fontSize: 12.5, color: 'var(--ink-muted)', textAlign: 'center' }}>50m radius check — only marks when location is trusted.</p>
        </div>
      </Panel>
    </div>
  )
}