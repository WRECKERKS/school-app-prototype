import { useState } from 'react'
import { Users, Search, Filter } from 'lucide-react'
import { Panel, PageHeader, personCell, Progress, pctColor, useToast } from '../../components/ui'
import { students } from '../../lib/mock'

export default function StudentsPage() {
  const [q, setQ] = useState('')
  const toast = useToast()
  const list = students.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <PageHeader
        title="Students & Staff"
        sub="Full student directory with attendance, performance and fee status."
        actions={
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="login-input" style={{ minWidth: 220 }}>
              <Search size={15} />
              <input placeholder="Search students…" value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: '9px 0' }} />
            </div>
            <button className="btn btn-ghost btn-sm"><Filter size={15} /> Filter</button>
          </div>
        }
      />

      <Panel title={`Students (${students.length})`} icon={Users} actions={<button className="btn btn-primary btn-sm" onClick={() => toast('Invite link copied — 45 parents notified.', 'success')}>Invite parent</button>}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Student</th><th>Class</th><th>Roll</th><th>Attendance</th><th>Score</th><th>Fees</th><th>Parent</th></tr></thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.name}>
                  <td>{personCell(s.name, `${s.cls} • Roll ${s.roll}`)}</td>
                  <td className="strong">{s.cls}</td>
                  <td>{s.roll}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 110 }}>
                      <div style={{ flex: 1 }}><Progress value={s.attendance} color={pctColor(s.attendance, { hi: 95, mid: 88 })} /></div>
                      <span style={{ fontWeight: 800, fontSize: 12.5 }}>{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="strong">{s.score}</td>
                  <td>
                    <span className={`status-badge ${s.fees === 'Paid' ? 'status-paid' : s.fees === 'Overdue' ? 'status-overdue' : 'status-pending'}`}>{s.fees}</span>
                  </td>
                  <td>{s.parent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}