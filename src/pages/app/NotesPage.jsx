import { BookOpen, Upload, Download, FileText } from 'lucide-react'
import { PageHeader, useToast } from '../../components/ui'
import { notes } from '../../lib/mock'

export default function NotesPage() {
  const toast = useToast()

  return (
    <>
      <PageHeader
        title="Notes Library"
        sub="Subject-wise notes shared by faculty. Students get them instantly in their portal."
        actions={<button className="btn btn-primary" onClick={() => toast('Note uploaded to Class 10A Physics — students notified.', 'success')}><Upload size={15} /> Upload note</button>}
      />

      <div className="grid-cards">
        {notes.map((n, i) => (
          <div className="fcard" key={i}>
            <div className="fcard-top">
              <span className="stat-icon" style={{ background: ['#6366f1', '#8b5cf6', '#10b981', '#d97706'][i % 4] }}><BookOpen size={18} /></span>
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
      </div>
    </>
  )
}