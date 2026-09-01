import { CalendarDays, Download } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { timetable } from '../../lib/mock'

export default function TimetablePage() {
  const { user } = useAuth()
  const toast = useToast()
  const isStudent = user.roleId === 'student'
  const myClass = isStudent ? 'Class 10A' : 'Class 9A'

  return (
    <>
      <PageHeader
        title="Timetable"
        sub={isStudent ? `Your weekly timetable — ${myClass}` : `Teaching timetable — ${myClass} (switch class per period)`}
        actions={<button className="btn btn-soft btn-sm" onClick={() => toast('Timetable exported as PDF.', 'success')}><Download size={14} /> Export PDF</button>}
      />

      <Panel title={`${myClass} — Weekly Timetable`} icon={CalendarDays}>
        <div className="table-wrap">
          <table className="timetable">
            <thead>
              <tr>
                <th style={{ width: 120, textAlign: 'left' }}>Period</th>
                {timetable.days.map((d) => <th key={d}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {timetable.periods.map((p, i) => (
                <tr key={i}>
                  <td style={{ textAlign: 'left', fontWeight: 800, color: 'var(--ink-muted)' }}>{p.time}</td>
                  {p.subjects.map((s, j) => (
                    <td key={j} className={s === 'BREAK' ? 'break' : ''}>{s}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
          {['Break', 'Live period'].map((k) => (
            <span key={k} className="badge" style={{ background: 'var(--bg-soft)', color: 'var(--ink-muted)' }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: k === 'Break' ? '#fef3c7' : 'var(--primary)', display: 'inline-block' }} /> {k}
            </span>
          ))}
        </div>
      </Panel>
    </>
  )
}