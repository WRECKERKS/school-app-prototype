import { useState } from 'react'
import { CalendarDays, Download } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { timetable } from '../../lib/mock'

const CLASSES = ['9A', '9B', '10A', '10B', '11A', '12A']
const TODAY = 'Wed'

function timetableFor(cls) {
  const idx = CLASSES.indexOf(cls)
  const rotate = (arr, n) => arr.map((_, i) => arr[(i + n * 2) % arr.length])
  const subjects = {
    '9A': ['Math', 'English', 'Science', 'Hindi', 'Social'],
    '9B': ['Science', 'Math', 'English', 'Social', 'Hindi'],
    '10A': ['Math', 'English', 'Science', 'Hindi', 'Social'],
    '10B': ['English', 'Math', 'Hindi', 'Science', 'Social'],
    '11A': ['Physics', 'Math', 'Chemistry', 'Biology', 'English'],
    '12A': ['Chemistry', 'Physics', 'Math', 'English', 'Biology'],
  }[cls]
  return timetable.periods.map((p) => ({
    time: p.time,
    subjects: p.subjects.map((s, day) =>
      s === 'BREAK' ? 'BREAK' : rotate(subjects, day + idx)[p.subjects.slice(0, day).filter((x) => x !== 'BREAK').length]
    ),
  }))
}

export default function TimetablePage() {
  const { user } = useAuth()
  const toast = useToast()
  const isStudent = user.roleId === 'student'
  const defaultClass = isStudent ? '10A' : '9A'
  const [cls, setCls] = useState(defaultClass)
  const [day, setDay] = useState(TODAY)
  const schedules = timetableFor(cls)

  return (
    <>
      <PageHeader
        title="Timetable"
        sub={isStudent ? `Your weekly timetable — Class ${cls}` : `Teaching timetable — Class ${cls} (switch class per period)`}
        actions={
          <>
            <select className="select-ghost" value={cls} onChange={(e) => setCls(e.target.value)} aria-label="Select class">
              {CLASSES.map((c) => <option key={c} value={c}>Class {c}</option>)}
            </select>
            <button className="btn btn-soft btn-sm" onClick={() => toast('Timetable exported as PDF.', 'success')}><Download size={14} /> Export PDF</button>
          </>
        }
      />

      <Panel title={`Class ${cls} — Weekly Timetable`} icon={CalendarDays}>
        <div className="day-tabs">
          {timetable.days.map((d) => (
            <button
              key={d}
              className={`day-tab ${day === d ? 'active' : ''}`}
              onClick={() => setDay(d)}
            >{d}</button>
          ))}
        </div>
        <div className="table-wrap">
          <table className="timetable">
            <thead>
              <tr>
                <th style={{ width: 130, textAlign: 'left' }}>Period</th>
                {timetable.days.map((d) => <th key={d} className={d === day ? 'tb-today' : ''}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {schedules.map((p, i) => (
                <tr key={i}>
                  <td style={{ textAlign: 'left', fontWeight: 800, color: 'var(--ink-muted)' }}>{p.time}</td>
                  {p.subjects.map((s, j) => (
                    <td
                      key={j}
                      className={`${s === 'BREAK' ? 'break' : ''} ${timetable.days[j] === day ? 'tb-active' : ''}`}
                    >{s}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
          {['Break', 'Selected day'].map((k) => (
            <span key={k} className="badge" style={{ background: 'var(--bg-soft)', color: 'var(--ink-muted)' }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: k === 'Break' ? '#fef3c7' : 'var(--primary)', display: 'inline-block' }} /> {k}
            </span>
          ))}
        </div>
      </Panel>
    </>
  )
}