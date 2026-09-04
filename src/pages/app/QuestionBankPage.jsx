import { useState } from 'react'
import { Database, Sparkles, FilePlus2, CheckCircle2 } from 'lucide-react'
import { Panel, PageHeader, StatCard, useToast } from '../../components/ui'
import { questionBank } from '../../lib/mock'

const DIFF = {
  Easy: { color: 'var(--good)', soft: 'var(--good-soft)' },
  Medium: { color: 'var(--warn)', soft: 'var(--warn-soft)' },
  Hard: { color: 'var(--danger)', soft: 'var(--danger-soft)' },
}

const SUBJECTS = [...new Set(questionBank.map((q) => q.subject))]
const DIFFS = ['Easy', 'Medium', 'Hard']

export default function QuestionBankPage() {
  const toast = useToast()
  const [selected, setSelected] = useState([])
  const [subject, setSubject] = useState('all')
  const [diff, setDiff] = useState('all')

  const visible = questionBank.filter((q) =>
    (subject === 'all' || q.subject === subject) &&
    (diff === 'all' || q.difficulty === diff)
  )

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
        <StatCard icon={Database} color="#4f46e5" value="11" label="Subjects" change="all grades" />
        <StatCard icon={Database} color="#7c3aed" value="6,210" label="Hard questions" change="AI tagged" />
        <StatCard icon={FilePlus2} color="#8b5cf6" value="23" label="Tests built" change="this term" />
      </div>

      <Panel title={`Selected (${selected.length}) — build a test now`} icon={FilePlus2} actions={
        <>
          <select className="select-ghost" value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Filter by subject">
            <option value="all">All subjects</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select-ghost" value={diff} onChange={(e) => setDiff(e.target.value)} aria-label="Filter by difficulty">
            <option value="all">All difficulties</option>
            {DIFFS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <button className="btn btn-primary" onClick={buildTest}><CheckCircle2 size={15} /> Build test ({selected.length})</button>
        </>
      }>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visible.map((q) => {
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
          {visible.length === 0 && (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--ink-muted)' }}>No questions match your filters.</div>
          )}
        </div>
      </Panel>
    </>
  )
}