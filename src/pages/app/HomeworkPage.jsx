import { useMemo, useState } from 'react'
import { ListTodo, Plus, CheckCircle2, Clock, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, Progress, useToast } from '../../components/ui'
import { homework as seed } from '../../lib/mock'
import { SceneEmpty } from '../../components/Scenes'

export default function HomeworkPage() {
  const { user } = useAuth()
  const role = user.roleId
  const isStudent = role === 'student'
  const toast = useToast()
  const [items, setItems] = useState(seed)
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const [reviewing, setReviewing] = useState(null)
  const [marks, setMarks] = useState('')
  const [remark, setRemark] = useState('')

  const visible = useMemo(() =>
    items.filter((h) =>
      (filter === 'all' || h.status === filter) &&
      (h.subject + h.title + h.cls).toLowerCase().includes(q.toLowerCase())
    ), [items, filter, q])

  if (isStudent) return <StudentHomework />

  const submitReview = () => {
    toast(`Review saved — ${marks || '8'}/10 for Arjun with remark "${remark || 'Great work!'}".`)
    setItems((list) => list.map((h) =>
      reviewing && h.id === reviewing.id ? { ...h, status: 'Reviewed', submissions: h.total } : h
    ))
    setReviewing(null)
    setMarks('')
    setRemark('')
  }

  return (
    <>
      <PageHeader
        title="Homework"
        sub={role === 'teacher' ? 'Assign to any batch, review submissions and grade in one flow.' : 'Create, track and grade homework across all classes.'}
        actions={
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="login-input" style={{ minWidth: 200 }}>
              <Search size={15} />
              <input placeholder="Search homework…" value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: '9px 0' }} />
            </div>
            <select className="select-ghost" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
              <option value="all">All status</option>
              <option value="Active">Active</option>
              <option value="Reviewed">Reviewed</option>
            </select>
            <button className="btn btn-primary" onClick={() => toast('Homework HW-242 created for Class 10A — parents notified.', 'success')}><Plus size={16} /> New homework</button>
          </div>
        }
      />

      {visible.map((h) => (
        <Panel key={h.id} title={`${h.subject} • ${h.cls}`} icon={ListTodo} actions={<span className={`badge ${h.status === 'Reviewed' ? 'status-paid' : 'status-info'}`}>{h.status}</span>}>
          <div style={{ marginBottom: 14 }}>
            <h4 style={{ fontSize: 15.5, marginBottom: 4 }}>{h.title}</h4>
            <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{h.id} • Assigned {h.assigned} • Due {h.deadline}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span className="badge">Submissions {h.submissions}/{h.total}</span>
            <div className="score-bar" style={{ minWidth: 140 }}><Progress value={(h.submissions / h.total) * 100} tone={h.status === 'Reviewed' ? 'good' : 'neutral'} /></div>
            {h.status === 'Active' ? (
              <button className="btn btn-soft btn-sm" onClick={() => { setReviewing(h); setMarks('') }}>
                <Clock size={14} /> Review submissions
              </button>
            ) : (
              <span className="badge status-paid"><CheckCircle2 size={13} /> Graded</span>
            )}
          </div>
        </Panel>
      ))}

      {visible.length === 0 && (
        <div className="empty-state">
          <SceneEmpty className="scene" />
          <h3>No homework matches</h3>
          <p>
            Nothing here for the current class and status filter. Try widening it, or
            assign something new.
          </p>
        </div>
      )}

      {reviewing && (
        <div className="dialog-overlay" onClick={() => setReviewing(null)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Review — Arjun Patel</h3>
            <p className="dialog-sub">{reviewing.subject} • {reviewing.cls} • Submitted today, 07:42 AM</p>
            <div className="note-box" style={{ marginBottom: 14 }}>
              <div className="note-box-title">Student answer</div>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
                The solution set of the equation is x = 3 and x = -2, obtained by factorising the quadratic into (x-3)(x+2) = 0.
              </p>
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                {['hw-a.png', 'hw-b.png'].map((f) => (
                  <span key={f} className="file-type">{f}</span>
                ))}
              </div>
            </div>
            <div className="form-row">
              <label className="form-field"><span>Marks (out of 10)</span>
                <input className="input" type="number" max={10} min={0} value={marks} onChange={(e) => setMarks(e.target.value)} placeholder="8" />
              </label>
              <label className="form-field"><span>Remark</span>
                <input className="input" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Excellent reasoning!" />
              </label>
            </div>
            <div className="dialog-actions">
              <button className="btn btn-ghost" onClick={() => setReviewing(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitReview}><CheckCircle2 size={15} /> Save review</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function StudentHomework() {
  const toast = useToast()
  return (
    <>
      <PageHeader title="My Homework" sub="3 pending, 1 near deadline. Submit right from this page." />
      {seed.slice(0, 3).map((h) => {
        const overdue = h.deadline.includes('02')
        return (
          <Panel key={h.id} title={`${h.subject} • ${h.cls}`} icon={ListTodo} actions={
            overdue ? <span className="badge status-overdue">Due today</span> : <span className="badge status-paid">Completed</span>
          }>
            <h4 style={{ fontSize: 15, marginBottom: 8 }}>{h.title}</h4>
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-primary btn-sm" onClick={() => toast('Submitted for review — your teacher has been notified.', 'success')}>Submit homework</button>
            </div>
          </Panel>
        )
      })}
    </>
  )
}