import { useState } from 'react'
import { Megaphone, Plus, Send } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { announcements as seed } from '../../lib/mock'

const PRIORITY = { High: 'status-overdue', Medium: 'status-pending', Low: 'status-info' }

export default function AnnouncementsPage() {
  const { user } = useAuth()
  const toast = useToast()
  const [list, setList] = useState(seed)
  const [marks, setMarks] = useState(null)
  const [composing, setComposing] = useState(false)
  const [draft, setDraft] = useState({ title: '', body: '', priority: 'Medium', audience: 'Students & Parents' })
  const isManagement = ['principal', 'admin'].includes(user.roleId)
  const showEntry = isManagement || user.plan !== 'basic'

  const publish = () => {
    if (!draft.title.trim() || !draft.body.trim()) { toast('Add a title and message first.', 'info'); return }
    const id = `A-${seed.length + 1}`
    setList((l) => [{ id, title: draft.title.trim(), body: draft.body.trim(), priority: draft.priority, date: '01 Sep' }, ...l])
    toast(`Announcement "${draft.title.trim()}" published to ${draft.audience} — ${draft.priority} priority.`, 'success')
    setDraft({ title: '', body: '', priority: 'Medium', audience: 'Students & Parents' })
    setComposing(false)
  }

  return (
    <>
      <PageHeader
        title="Announcements"
        sub={isManagement ? 'Broadcast notices with priority levels to students and parents.'
          : 'Latest notices from the school office.'}
        actions={showEntry ? (
          <button className="btn btn-primary" onClick={() => setComposing((v) => !v)}><Plus size={15} /> New announcement</button>
        ) : undefined}
      />

      {composing && (
        <div className="dialog-overlay" onClick={() => setComposing(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <h3>Compose announcement</h3>
            <p className="dialog-sub">Publishes instantly to the selected audience.</p>
            <label className="form-field" style={{ marginBottom: 10 }}><span>Title</span>
              <input className="input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Annual Day Rescheduled" />
            </label>
            <label className="form-field" style={{ marginBottom: 10 }}><span>Message</span>
              <textarea className="input textarea" rows={3} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} placeholder="Write the full notice…" />
            </label>
            <div className="form-row">
              <label className="form-field"><span>Priority</span>
                <select className="input select-input" value={draft.priority} onChange={(e) => setDraft({ ...draft, priority: e.target.value })}>
                  <option>High</option><option>Medium</option><option>Low</option>
                </select>
              </label>
              <label className="form-field"><span>Audience</span>
                <select className="input select-input" value={draft.audience} onChange={(e) => setDraft({ ...draft, audience: e.target.value })}>
                  <option>Students & Parents</option><option>Staff only</option><option>All</option>
                </select>
              </label>
            </div>
            <div className="dialog-actions">
              <button className="btn btn-ghost" onClick={() => setComposing(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={publish}><Send size={15} /> Publish now</button>
            </div>
          </div>
        </div>
      )}

      {list.map((a) => (
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