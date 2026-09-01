import { useState } from 'react'
import { Megaphone, Plus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { announcements } from '../../lib/mock'

const PRIORITY = { High: 'status-overdue', Medium: 'status-pending', Low: 'status-info' }

export default function AnnouncementsPage() {
  const { user } = useAuth()
  const toast = useToast()
  const [marks, setMarks] = useState(null)
  const isManagement = ['principal', 'admin'].includes(user.roleId)
  const showEntry = isManagement || user.plan !== 'basic'

  return (
    <>
      <PageHeader
        title="Announcements"
        sub={isManagement ? 'Broadcast notices with priority levels to students and parents.'
          : 'Latest notices from the school office.'}
        actions={showEntry ? (
          <button className="btn btn-primary" onClick={() => toast('Announcement posted with High priority — SMS + WhatsApp blast sent.', 'success')}><Plus size={15} /> New announcement</button>
        ) : undefined}
      />

      {announcements.map((a) => (
        <Panel key={a.id} title={a.title} icon={Megaphone} actions={<span className={`status-badge ${PRIORITY[a.priority]}`}>{a.priority}</span>}>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 10 }}>{a.body}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{a.id} • Posted {a.date}</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setMarks(a)}>Mark as read</button>
          </div>
        </Panel>
      ))}

      {marks && (
        <div className="dialog-overlay" onClick={() => setMarks(null)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Mark as read?</h3>
            <p className="dialog-sub">{marks.title}</p>
            <div className="dialog-actions">
              <button className="btn btn-ghost" onClick={() => setMarks(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { setMarks(null); toast('Notice marked as read.', 'success') }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}