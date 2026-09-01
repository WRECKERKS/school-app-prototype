import { UserCog, Phone } from 'lucide-react'
import { Panel, PageHeader, personCell } from '../../components/ui'
import { staff } from '../../lib/mock'

export default function StaffPage() {
  return (
    <>
      <PageHeader
        title="Staff Directory"
        sub="Every staff member, phone and department in one place — part of the Basic plan."
      />
      <Panel title={`Staff (${staff.length})`} icon={UserCog}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Member</th><th>Role</th><th>Department</th><th>Subject</th><th>Phone</th><th>Years</th></tr></thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.name}>
                  <td>{personCell(s.name, s.dept)}</td>
                  <td>{s.role}</td>
                  <td>{s.dept}</td>
                  <td>{s.subject}</td>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Phone size={12} style={{ color: 'var(--ink-muted)' }} />{s.phone}</span></td>
                  <td>{s.years} yrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}