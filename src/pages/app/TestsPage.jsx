import { FileBarChart2, PlayCircle, Eye, Plus, Trophy } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { testSeries } from '../../lib/mock'

export default function TestsPage() {
  const { user } = useAuth()
  const isStudent = user.roleId === 'student'
  const toast = useToast()

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
        actions={<button className="btn btn-primary" onClick={() => toast('Test T-119 "Weekly Test — Science" created for Class 10A.', 'success')}><Plus size={16} /> New test</button>}
      />

      <div className="grid-cards">
        {testSeries.map((t) => (
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
      </div>
    </>
  )
}