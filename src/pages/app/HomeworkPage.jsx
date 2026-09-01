import { useState } from 'react'
import { ListTodo, Plus, CheckCircle2, Clock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { homework } from '../../lib/mock'

export default function HomeworkPage() {
  const { user } = useAuth()
  const role = user.roleId
  const isStudent = role === 'student'
  const toast = useToast()
  const [reviewing, setReviewing] = useState(null)
  const [marks, setMarks] = useState('')
  const [remark, setRemark] = useState('')

  if (isStudent) return <StudentHomework />

  const submitReview = () => {
    toast(`Review saved — ${marks}/10 for Arjun with remark "${remark || 'Great work!'}".`)
    setReviewing(null)
    setMarks('')
    setRemark('')
  }

  return (
    <>
      <PageHeader
        title="Homework"
        sub={role === 'teacher' ? 'Assign to any batch, review submissions and grade in one flow.' : 'Create, track and grade homework across all classes.'}
        actions={<button className="btn btn-primary" onClick={() => toast('Homework HW-242 created for Class 10A — parents notified.', 'success')}><Plus size={16} /> New homework</button>}
      />

      {homework.map((h) => (
        <Panel key={h.id} title={`${h.subject} • ${h.cls}`} icon={ListTodo} actions={<span className="badge status-info">{h.status}</span>}>
          <div style={{ marginBottom: 14 }}>
            <h4 style={{ fontSize: 15.5, marginBottom: 4 }}>{h.title}</h4>
            <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{h.id} • Assigned {h.assigned} • Due {h.deadline}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: 'var(--bg-soft)', color: 'var(--ink)' }}>Submissions {h.submissions}/{h.total}</span>
            <div style={{ flex: 1, minWidth: 140 }}><div className="progress-bar"><div className="progress-fill" style={{ width: `${(h.submissions / h.total) * 100}%`, background: '#6366f1' }} /></div></div>
            <button className="btn btn-soft btn-sm" onClick={() => { setReviewing(h); setMarks('') }}>
              <Clock size={14} /> Review submissions
            </button>
          </div>
        </Panel>
      ))}

      {reviewing && (
        <div className="dialog-overlay" onClick={() => setReviewing(null)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Review — Arjun Patel</h3>
            <p className="dialog-sub">{reviewing.subject} • {reviewing.cls} • Submitted today, 07:42 AM</p>
            <div style={{ background: 'var(--card-soft)', border: '2.5px solid var(--line)', borderRadius: 'var(--radius-xs)', padding: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>Student answer</div>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
                The solution set of the equation is x = 3 and x = -2, obtained by factorising the quadratic into (x-3)(x+2) = 0.
              </p>
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                {['hw-a.png', 'hw-b.png'].map((f) => (
                  <span key={f} className="file-type" style={{ background: '#fef3c7', color: '#b45309' }}>{f}</span>
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
      {homework.slice(0, 3).map((h) => {
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