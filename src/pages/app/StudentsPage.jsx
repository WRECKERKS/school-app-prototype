import { useMemo, useState } from 'react'
import { Users, Search, ChevronUp, ChevronDown, Plus } from 'lucide-react'
import { Panel, PageHeader, personCell, Progress, pctColor, useToast } from '../../components/ui'
import { students as seed } from '../../lib/mock'

const CLASSES = [...new Set(seed.map((s) => s.cls))]

export default function StudentsPage() {
  const [rows, setRows] = useState(seed)
  const [q, setQ] = useState('')
  const [fee, setFee] = useState('all')
  const [cls, setCls] = useState('all')
  const [sortKey, setSortKey] = useState('roll')
  const [sortDir, setSortDir] = useState(1)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', cls: '10A', parent: '' })
  const toast = useToast()

  const list = useMemo(() => {
    let out = rows.filter((s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) &&
      (fee === 'all' || s.fees === fee) &&
      (cls === 'all' || s.cls === cls)
    )
    out = [...out].sort((a, b) => {
      const av = sortKey === 'score' ? a.score : sortKey === 'attendance' ? a.attendance : a.roll
      const bv = sortKey === 'score' ? b.score : sortKey === 'attendance' ? b.attendance : b.roll
      return (av - bv) * sortDir
    })
    return out
  }, [rows, q, fee, cls, sortKey, sortDir])

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => -d)
    else { setSortKey(key); setSortDir(1) }
  }

  const SortHead = ({ k, children }) => (
    <th onClick={() => toggleSort(k)} className="sortable">
      <span className="sort-inner">{children} {sortKey === k && (sortDir === 1 ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}</span>
    </th>
  )

  const addStudent = () => {
    if (!form.name.trim()) { toast('Enter a student name first.', 'info'); return }
    const nextRoll = Math.max(...rows.map((s) => s.roll)) + 1
    setRows([...rows, { name: form.name.trim(), cls: form.cls, roll: nextRoll, attendance: 100, score: 0, fees: 'Due', parent: form.parent.trim() || '—' }])
    setForm({ name: '', cls: form.cls, parent: '' })
    setAdding(false)
    toast(`${form.name.trim()} added to Class ${form.cls}.`, 'success')
  }

  return (
    <>
      <PageHeader
        title="Students & Staff"
        sub="Full student directory with attendance, performance and fee status."
        actions={
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="login-input" style={{ minWidth: 220 }}>
              <Search size={15} />
              <input placeholder="Search students…" value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: '9px 0' }} />
            </div>
            <select className="select-ghost" value={fee} onChange={(e) => setFee(e.target.value)} aria-label="Filter by fees">
              <option value="all">All fees</option>
              <option value="Paid">Paid</option>
              <option value="Due">Due</option>
              <option value="Overdue">Overdue</option>
            </select>
            <select className="select-ghost" value={cls} onChange={(e) => setCls(e.target.value)} aria-label="Filter by class">
              <option value="all">All classes</option>
              {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        }
      />

      <Panel
        title={`Students (${list.length})`}
        icon={Users}
        actions={
          <>
            {adding && (
              <div className="add-inline" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input className="mini-input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <select className="select-ghost" value={form.cls} onChange={(e) => setForm({ ...form, cls: e.target.value })}>
                  {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input className="mini-input" placeholder="Parent (optional)" value={form.parent} onChange={(e) => setForm({ ...form, parent: e.target.value })} />
                <button className="btn btn-primary btn-sm" onClick={addStudent}>Save</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setAdding(false)}>Cancel</button>
              </div>
            )}
            <button className="btn btn-primary btn-sm" onClick={() => { if (adding) addStudent(); else setAdding(true) }}><Plus size={15} /> {adding ? 'Add' : 'Add student'}</button>
          </>
        }
      >
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Student</th><SortHead k="roll">Class · Roll</SortHead><SortHead k="attendance">Attendance</SortHead><SortHead k="score">Score</SortHead><th>Fees</th><th>Parent</th></tr></thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.name}>
                  <td>{personCell(s.name)}</td>
                  <td className="strong">{s.cls} · {s.roll}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 110 }}>
                      <div style={{ flex: 1 }}><Progress value={s.attendance} color={pctColor(s.attendance, { hi: 95, mid: 88 })} /></div>
                      <span style={{ fontWeight: 800, fontSize: 12.5 }}>{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="strong">{s.score}</td>
                  <td>
                    <span className={`status-badge ${s.fees === 'Paid' ? 'status-paid' : s.fees === 'Overdue' ? 'status-overdue' : 'status-pending'}`}>{s.fees}</span>
                  </td>
                  <td>{s.parent}</td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24, color: 'var(--ink-muted)' }}>No students match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}
