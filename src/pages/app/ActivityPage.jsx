import { useState } from 'react'
import { ScrollText, Search, Download } from 'lucide-react'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { activityLog } from '../../lib/mock'

const CATEGORY = {
  Fees: { color: '#10b981', soft: '#d1fae5' },
  Attendance: { color: '#6366f1', soft: '#e0e7ff' },
  Tests: { color: '#8b5cf6', soft: '#ede9fe' },
  Homework: { color: '#d97706', soft: '#fef3c7' },
  Auth: { color: '#0ea5e9', soft: '#e0f2fe' },
  Doubts: { color: '#3b82f6', soft: '#dbeafe' },
}

export default function ActivityPage() {
  const toast = useToast()
  const [q, setQ] = useState('')
  const list = activityLog.filter((a) => a.action.toLowerCase().includes(q.toLowerCase()) || a.category.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <PageHeader
        title="Activity Log"
        sub="Full audit trail — every action, user, IP and timestamp. Searchable and exportable."
        actions={
          <>
            <div className="login-input" style={{ minWidth: 220 }}>
              <Search size={15} />
              <input placeholder="Search log…" value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: '9px 0' }} />
            </div>
            <button className="btn btn-soft btn-sm" onClick={() => toast('Audit trail exported as CSV (6 entries).', 'success')}><Download size={14} /> Export</button>
          </>
        }
      />

      <Panel title={`Audit Trail (${list.length})`} icon={ScrollText}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Action</th><th>User</th><th>IP</th><th>Category</th><th>Timestamp</th></tr></thead>
            <tbody>
              {list.map((a, i) => (
                <tr key={i}>
                  <td className="strong">{a.action}</td>
                  <td>{a.user}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12.5 }}>{a.ip}</td>
                  <td>
                    <span className="badge" style={{ background: CATEGORY[a.category].soft, color: CATEGORY[a.category].color }}>{a.category}</span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}