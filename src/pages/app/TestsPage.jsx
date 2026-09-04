import { useMemo, useState } from 'react'
import { FileBarChart2, PlayCircle, Eye, Plus, Trophy, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { testSeries } from '../../lib/mock'

export default function TestsPage() {
  const { user } = useAuth()
  const isStudent = user.roleId === 'student'
  const toast = useToast()
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')

  const visible = useMemo(() =>
    testSeries.filter((t) =>
      (filter === 'all' || t.status === filter) &&
      (t.name + t.subject + t.cls).toLowerCase().includes(q.toLowerCase())
    ), [filter, q])

  if (isStudent) {
    return (
      <>
        <PageHeader title="Tests & Results" sub="6 tests this term — take online ones or view details, results auto-sync with your gradebook." />
        {testSeries.map((t) => (
          <Panel key={t.id} title={`${t.name}`} icon={FileBarChart2} actions={
            t.status === 'Upcoming'
              ? <span className="badge status-info">Upcoming • {t.date}</span>
              : <span className="badge status-paid">Scored {t.avg}</span>
          }>
            <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginBottom: 12 }}>
              <b>{t.subject}</b> • {t.cls} • {t.date}
            </div>
            {t.status === 'Upcoming' ? (
              <button className="btn btn-accent btn-sm" onClick={() => toast('Starting test — 25 questions, 30 minutes. Good luck!', 'info')}>
                <PlayCircle size={15} /> Take test (online)
              </button>
            ) : (
              <button className="btn btn-soft btn-sm" onClick={() => toast('Detailed result & answer key opened.', 'info')}>
                <Eye size={15} /> View details
              </button>
            )}
          </Panel>
        ))}
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Tests & Results"
        sub="Create tests, enter marks, and track performance per class and topic."
        actions={
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="login-input" style={{ minWidth: 190 }}>
              <Search size={15} />
              <input placeholder="Search tests…" value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: '9px 0' }} />
            </div>
            <select className="select-ghost" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
              <option value="all">All status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="btn btn-primary" onClick={() => toast('Test T-119 "Weekly Test — Science" created for Class 10A.', 'success')}><Plus size={16} /> New test</button>
          </div>
        }
      />

      <div className="grid-cards">
        {visible.map((t) => (
          <div className="fcard" key={t.id}>
            <div className="fcard-top">
              <span className="stat-icon" style={{ background: t.status === 'Upcoming' ? '#8b5cf6' : '#10b981' }}><FileBarChart2 size={18} /></span>
              {t.status === 'Upcoming' ? <span className="badge status-info">{t.date}</span> : <span className="badge status-paid">Avg {t.avg}</span>}
            </div>
            <h4>{t.name}</h4>
            <p>{t.subject} • {t.cls}</p>
            <div className="fc-meta">
              <span>{t.status}</span>
              {t.status === 'Upcoming'
                ? <button className="btn btn-soft btn-sm" onClick={() => toast(`Test scheduled — ${t.date}. Students notified.`, 'success')}>Schedule</button>
                : <button className="btn btn-soft btn-sm" onClick={() => toast('Result analytics opened.', 'info')}><Trophy size={13} /> Result analysis</button>}
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="fcard" style={{ textAlign: 'center', color: 'var(--ink-muted)' }}>No tests match your filters.</div>
        )}
      </div>
    </>
  )
}