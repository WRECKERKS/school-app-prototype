import { useMemo, useState } from 'react'
import { UserCog, Phone, Search } from 'lucide-react'
import { Panel, PageHeader, personCell, Modal } from '../../components/ui'
import { staff } from '../../lib/mock'

const ROLES = [...new Set(staff.map((s) => s.role))]

export default function StaffPage() {
  const [q, setQ] = useState('')
  const [role, setRole] = useState('all')
  const [selected, setSelected] = useState(null)

  const list = useMemo(() =>
    staff.filter((s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) &&
      (role === 'all' || s.role === role)
    ), [q, role])

  const open = (s) => setSelected(s)

  return (
    <>
      <PageHeader
        title="Staff Directory"
        sub="Every staff member, phone and department in one place — part of the Basic plan."
        actions={
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="login-input" style={{ minWidth: 200 }}>
              <Search size={15} />
              <input placeholder="Search staff…" value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: '9px 0' }} />
            </div>
            <select className="select-ghost" value={role} onChange={(e) => setRole(e.target.value)} aria-label="Filter by role">
              <option value="all">All roles</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        }
      />
      <Panel title={`Staff (${list.length})`} icon={UserCog}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Member</th><th>Role</th><th>Department</th><th>Subject</th><th>Phone</th><th>Years</th></tr></thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.name} className="clickable-row" onClick={() => open(s)}>
                  <td>{personCell(s.name, s.dept)}</td>
                  <td>{s.role}</td>
                  <td>{s.dept}</td>
                  <td>{s.subject}</td>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Phone size={12} style={{ color: 'var(--ink-muted)' }} />{s.phone}</span></td>
                  <td>{s.years} yrs</td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24, color: 'var(--ink-muted)' }}>No staff match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name} icon={selected && UserCog}>
        {selected && (
          <div className="staff-detail">
            {personCell(selected.name, `${selected.role}`)}
            <dl className="detail-grid">
              <div><dt>Role</dt><dd>{selected.role}</dd></div>
              <div><dt>Department</dt><dd>{selected.dept}</dd></div>
              <div><dt>Subject</dt><dd>{selected.subject}</dd></div>
              <div><dt>Phone</dt><dd>{selected.phone}</dd></div>
              <div><dt>Experience</dt><dd>{selected.years} years</dd></div>
            </dl>
          </div>
        )}
      </Modal>
    </>
  )
}
