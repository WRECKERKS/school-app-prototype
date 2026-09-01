import { useState } from 'react'
import { HelpCircle, Plus, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { doubts } from '../../lib/mock'

export default function DoubtsPage() {
  const { user } = useAuth()
  const toast = useToast()
  const [list, setList] = useState(doubts)
  const [resolving, setResolving] = useState(null)
  const [solution, setSolution] = useState('')
  const canResolve = user.plan === 'premium' && ['principal', 'admin'].includes(user.roleId)
  const isStudent = user.roleId === 'student'

  const resolveDoubt = () => {
    setList((l) => l.map((d) => (d.id === resolving.id ? { ...d, status: 'Resolved', solution } : d)))
    toast(`Solution sent to ${resolving.student} via SMS & email.`)
    setResolving(null)
    setSolution('')
  }

  const askDoubt = () => {
    toast('Doubt submitted to your Maths teacher — you\'ll get an update shortly.', 'success')
  }

  return (
    <>
      <PageHeader
        title="Doubts"
        sub={isStudent ? 'Ask any subject doubt and track the solution once your teacher answers.'
          : canResolve ? 'Resolve pending doubts and send solutions straight to students.'
            : 'Track student doubts across subjects (resolution needs the Premium plan).'}
        actions={isStudent ? (
          <button className="btn btn-primary" onClick={askDoubt}><Plus size={15} /> Ask a doubt</button>
        ) : undefined}
      />

      {list.map((d) => (
        <Panel
          key={d.id}
          title={`${d.subject} • ${d.student}`}
          icon={HelpCircle}
          actions={d.status === 'Pending'
            ? <span className="badge status-pending">Pending</span>
            : <span className="badge status-paid">Resolved</span>}
        >
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 10 }}>{d.question}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{d.id} • Raised {d.raised}</span>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {d.status === 'Resolved' && d.solution && (
                <span style={{ fontSize: 12.5, color: '#15803d', fontWeight: 700, maxWidth: 360 }}>✓ {d.solution}</span>
              )}
              {d.status === 'Pending' && canResolve && (
                <button className="btn btn-primary btn-sm" onClick={() => { setResolving(d); setSolution('') }}>Resolve</button>
              )}
            </div>
          </div>
        </Panel>
      ))}

      {resolving && (
        <div className="dialog-overlay" onClick={() => setResolving(null)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Resolve doubt — {resolving.student}</h3>
            <p className="dialog-sub">{resolving.subject} • {resolving.id}</p>
            <div style={{ background: 'var(--card-soft)', border: '2.5px dashed var(--line-dark)', borderRadius: 'var(--radius-xs)', padding: 12, marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{resolving.question}</p>
            </div>
            <label className="form-field"><span>Your solution</span>
              <textarea className="textarea" value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="Step-by-step explanation…" />
            </label>
            <div className="dialog-actions">
              <button className="btn btn-ghost" onClick={() => setResolving(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={resolveDoubt}><CheckCircle2 size={15} /> Send solution</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}