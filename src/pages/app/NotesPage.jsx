import { useMemo, useState } from 'react'
import { BookOpen, Upload, Download, FileText, Search } from 'lucide-react'
import { PageHeader, useToast } from '../../components/ui'
import { notes as seed } from '../../lib/mock'

const ICONS = ['#6366f1', '#8b5cf6', '#10b981', '#d97706']
const SUBJECTS = [...new Set(seed.map((n) => n.subject))]
const TYPES = [...new Set(seed.map((n) => n.type))]

export default function NotesPage() {
  const toast = useToast()
  const [list, setList] = useState(seed)
  const [q, setQ] = useState('')
  const [subject, setSubject] = useState('all')
  const [type, setType] = useState('all')
  const [title, setTitle] = useState('')

  const visible = useMemo(() =>
    list.filter((n) =>
      (n.title + n.subject + n.cls + n.author).toLowerCase().includes(q.toLowerCase()) &&
      (subject === 'all' || n.subject === subject) &&
      (type === 'all' || n.type === type)
    ), [list, q, subject, type])

  const upload = () => {
    if (!title.trim()) { toast('Give the note a title first.', 'info'); return }
    setList((l) => [{ title: title.trim(), subject: subject === 'all' ? 'General' : subject, cls: '10A', type: 'PDF', author: 'Demo faculty', size: '1.1 MB', pages: 12 }, ...l])
    setTitle('')
    toast(`Note "${title.trim()}" uploaded to Class 10A — students notified.`, 'success')
  }

  return (
    <>
      <PageHeader
        title="Notes Library"
        sub="Subject-wise notes shared by faculty. Students get them instantly in their portal."
        actions={
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="login-input" style={{ minWidth: 190 }}>
              <Search size={15} />
              <input placeholder="Search notes…" value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: '9px 0' }} />
            </div>
            <select className="select-ghost" value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Filter by subject">
              <option value="all">All subjects</option>
              {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="select-ghost" value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type">
              <option value="all">All types</option>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <button className="btn btn-primary" onClick={upload}><Upload size={15} /> Upload note</button>
          </div>
        }
      />

      {title && (
        <div className="panel upload-panel" style={{ marginBottom: 16 }}>
          <label className="form-field"><span>New note title</span>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Gravitation — Chapter Summary" />
          </label>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setTitle('')}>Cancel</button>
            <button className="btn btn-primary" onClick={upload}>Publish note</button>
          </div>
        </div>
      )}

      <div className="grid-cards">
        {visible.map((n, i) => (
          <div className="fcard" key={i}>
            <div className="fcard-top">
              <span className="stat-icon" style={{ background: ICONS[i % 4] }}><BookOpen size={18} /></span>
              <span className="file-type">{n.type}</span>
            </div>
            <h4>{n.title}</h4>
            <p>{n.subject} • {n.cls} — by {n.author}</p>
            <div className="fc-meta">
              <span><FileText size={12} /> {n.pages} pages • {n.size}</span>
              <button className="btn btn-ghost btn-sm" onClick={() => toast(`Downloading "${n.title}" (${n.size}).`, 'info')}><Download size={13} /> Open</button>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="fcard" style={{ textAlign: 'center', color: 'var(--ink-muted)' }}>No notes match your filters.</div>
        )}
      </div>
    </>
  )
}
