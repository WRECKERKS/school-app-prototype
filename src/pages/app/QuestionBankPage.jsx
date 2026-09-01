import { useState } from 'react'
import { Database, Sparkles, FilePlus2, CheckCircle2 } from 'lucide-react'
import { Panel, PageHeader, StatCard, useToast } from '../../components/ui'
import { questionBank } from '../../lib/mock'

const DIFF = {
  Easy: { color: '#22c55e', soft: '#dcfce7' },
  Medium: { color: '#f59e0b', soft: '#fef3c7' },
  Hard: { color: '#ef4444', soft: '#fee2e2' },
}

export default function QuestionBankPage() {
  const toast = useToast()
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  const buildTest = () => {
    if (selected.length === 0) {
      toast('Select at least one question to build a test.', 'warn')
      return
    }
    toast(`Test built with ${selected.length} questions — AI-difficulty balanced. Assigned to Class 10A.`, 'success')
  }

  const aiGenerate = () => {
    toast('AI generated 10 fresh questions on "Quadratic Equations" at Medium difficulty.', 'success')
  }

  return (
    <>
      <PageHeader
        title="Question Bank"
        sub="40,247 questions across 11 subjects. Build tests, auto-balance difficulty with AI."
        actions={<button className="btn btn-accent" onClick={aiGenerate}><Sparkles size={16} /> AI-generate questions</button>}
      />

      <div className="stat-row">
        <StatCard icon={Database} color="#6366f1" value="40,247" label="Questions" change="+124 this week" />
        <StatCard icon={Database} color="#10b981" value="11" label="Subjects" change="all grades" />
        <StatCard icon={Database} color="#f59e0b" value="6,210" label="Hard questions" change="AI tagged" />
        <StatCard icon={FilePlus2} color="#ec4899" value="23" label="Tests built" change="this term" />
      </div>

      <Panel title={`Selected (${selected.length}) — build a test now`} icon={FilePlus2} actions={
        <button className="btn btn-primary" onClick={buildTest}><CheckCircle2 size={15} /> Build test ({selected.length})</button>
      }>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {questionBank.map((q) => {
            const on = selected.includes(q.id)
            return (
              <div key={q.id} className={`qb-question ${on ? 'selected' : ''}`} onClick={() => toggle(q.id)} style={{ cursor: 'pointer' }}>
                <span className={`avatar ${on ? '' : ''}`} style={{ background: on ? 'var(--primary)' : 'var(--bg-soft)' }}>
                  {on ? <CheckCircle2 size={16} color="#fff" /> : <span style={{ color: 'var(--primary-deep)', fontWeight: 800 }}>{q.marks}</span>}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--ink)', marginBottom: 3 }}>{q.text}</div>
                  <div style={{ display: 'flex', gap: 8, fontSize: 11.5, color: 'var(--ink-muted)' }}>
                    <span>{q.id}</span><b style={{ color: 'var(--ink-soft)' }}>{q.subject}</b><b style={{ color: 'var(--ink-soft)' }}>{q.topic}</b>
                  </div>
                </div>
                <span className="badge" style={{ background: DIFF[q.difficulty].soft, color: DIFF[q.difficulty].color }}>{q.difficulty}</span>
                <span style={{ fontWeight: 800, color: 'var(--ink-muted)' }}>{q.marks} marks</span>
              </div>
            )
          })}
        </div>
      </Panel>
    </>
  )
}