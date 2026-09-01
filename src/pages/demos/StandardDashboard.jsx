import { Link } from 'react-router-dom'
import {
  Users, ArrowLeft, PenLine, BarChart3, Banknote, MessageSquare,
  Library, Plane, Check, Send,
  Home, GraduationCap, User, Wallet, TrendingUp, AlertCircle, Download
} from 'lucide-react'
import DemoUserBanner from '../../components/DemoUserBanner'
import DemoPlanSwitcher from '../../components/DemoPlanSwitcher'

const homework = [
  { subject: 'Mathematics', teacher: 'Rajesh Kumar', title: 'Chapter 3: Linear Equations', desc: 'Solve Q1-15 from exercise 3.2. Submit by tomorrow 9 AM.', cls: '10A', due: 'Tomorrow, 9 AM', color: '#6d5cff', submissions: 38, total: 42 },
  { subject: 'Science', teacher: 'Dr. Sunita Patel', title: 'Photosynthesis Lab Report', desc: 'Complete lab report with observations from today\u2019s experiment.', cls: '10A', due: 'Wed, 9 AM', color: '#22c55e', submissions: 25, total: 42 },
  { subject: 'English', teacher: 'Anil Sharma', title: 'Essay: My Favourite Book', desc: 'Write a 500-word essay. Attachments with guidelines provided.', cls: '10A', due: 'Fri, 4 PM', color: '#3b82f6', submissions: 12, total: 42 },
  { subject: 'Hindi', teacher: 'Priya Verma', title: 'Chapter 4: कविता का सारांश', desc: 'Write a summary of the poem in your own words.', cls: '10A', due: 'Thu, 10 AM', color: '#f59e0b', submissions: 30, total: 42 },
]

const grades = [
  { subject: 'Mathematics', test: 'Unit Test 2', score: 87, max: 100, grade: 'A', color: '#6d5cff' },
  { subject: 'Science', test: 'Unit Test 2', score: 92, max: 100, grade: 'A+', color: '#22c55e' },
  { subject: 'English', test: 'Mid Term', score: 78, max: 100, grade: 'B+', color: '#3b82f6' },
  { subject: 'Hindi', test: 'Unit Test 1', score: 81, max: 100, grade: 'A', color: '#f59e0b' },
  { subject: 'Social Studies', test: 'Mid Term', score: 74, max: 100, grade: 'B', color: '#ec4899' },
]

const feeStatus = [
  { item: 'Tuition Fee (Term 3)', amount: '₹8,500', status: 'Paid', date: '12 Aug 2026', color: 'status-paid' },
  { item: 'Transport Fee (Q3)', amount: '₹4,200', status: 'Pending', date: 'Due 15 Sep', color: 'status-pending' },
  { item: 'Examination Fee', amount: '₹1,500', status: 'Paid', date: '30 Aug 2026', color: 'status-paid' },
  { item: 'Activity Fee (Annual)', amount: '₹2,000', status: 'Pending', date: 'Due 30 Sep', color: 'status-pending' },
]

const messages = [
  { from: 'School Admin', title: 'Field Trip Permission', body: 'Grade 10 field trip to Science Centre on 15 Sep. Please sign the permission form.', time: '2h ago', read: false },
  { from: 'Dr. Sunita Patel', title: 'Science Homework Reminder', body: 'The lab report submission is due tomorrow. Please ensure your child submits it.', time: '5h ago', read: false },
  { from: 'School Office', title: 'Fee Due Notice', body: 'Reminder: Transport fee for Q3 is due by 15 Sep. Pay online to avoid late fee.', time: '1d ago', read: true },
  { from: 'Examination Cell', title: 'PTM Schedule', body: 'Parent-Teacher Meeting for Grade 10 on Saturday, 20 Sep from 9 AM.', time: '2d ago', read: true },
]

const libraryBooks = [
  { title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', bookId: 'B-1042', status: 'Issued', due: '12 Sep', color: '#6d5cff' },
  { title: 'The Discovery of India', author: 'Jawaharlal Nehru', bookId: 'B-0871', status: 'Issued', due: '08 Sep', color: '#22c55e' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', bookId: 'B-1123', status: 'Available', color: '#3b82f6' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', bookId: 'B-1204', status: 'Issued', due: '18 Sep', color: '#ec4899' },
]

const leaveRequests = [
  { teacher: 'Vikram Singh', subject: 'Social Studies', leaveDate: '03-04 Sep', type: 'Casual Leave', status: 'Approved', reason: 'Personal work', color: 'status-present' },
  { teacher: 'Priya Verma', subject: 'Hindi', leaveDate: '05 Sep', type: 'Medical Leave', status: 'Pending', reason: 'Doctor\u2019s appointment', color: 'status-pending' },
  { teacher: 'Anil Sharma', subject: 'English', leaveDate: '07-08 Sep', type: 'Casual Leave', status: 'Under Review', reason: '-', color: 'status-late' },
]

export default function StandardDashboard() {
  return (
    <main className="demo-page">
      <header className="demo-header">
        <div className="demo-header-inner">
          <div className="demo-header-text">
            <h1>
              <span className="gradient-text blue">Standard Plan</span> — Full School Suite
            </h1>
            <p>₹50,000 / year • Parent, student & accounts portals included</p>
          </div>
          <div className="demo-actions">
            <DemoPlanSwitcher active="standard" />
            <Link to="/compare" className="btn btn-secondary">
              <ArrowLeft size={16} /> Back to Plans
            </Link>
          </div>
        </div>
      </header>

      <div className="demo-content">
        <DemoUserBanner />

        {/* Role portals */}
        <div className="stat-row">
          <div className="stat-card" style={{ gridColumn: '1 / -1', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <h4 style={{ width: '100%', fontSize: 15, color: 'var(--text-muted)' }}>
              <Users size={15} style={{ verticalAlign: -2, marginRight: 8 }} /> Expanded Multi-Role Portals
            </h4>
            {[
              { icon: <GraduationCap size={20} />, name: 'Parent Portal', desc: 'Track child activities', color: '#6d5cff' },
              { icon: <User size={20} />, name: 'Student Portal', desc: 'View assignments & grades', color: '#3b82f6' },
              { icon: <Wallet size={20} />, name: 'Accounts Portal', desc: 'Manage fees & receipts', color: '#22c55e' },
              { icon: <Home size={20} />, name: 'Staff Portal', desc: 'Admin & teacher tools', color: '#f59e0b' },
            ].map((p) => (
              <div key={p.name} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: '10px 14px', flex: 1, minWidth: 160
              }}>
                <span style={{ color: p.color }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-label"><TrendingUp size={14} /> Term Average</div>
            <div className="stat-value" style={{ color: '#60a5fa' }}>82.4%</div>
            <span className="stat-change positive">↑ 3.2% this term</span>
          </div>
          <div className="stat-card">
            <div className="stat-label"><PenLine size={14} /> Pending Homework</div>
            <div className="stat-value">3 of 4 done</div>
            <span className="stat-change positive" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)' }}>75% complete</span>
          </div>
          <div className="stat-card">
            <div className="stat-label"><Banknote size={14} /> Fees Outstanding</div>
            <div className="stat-value" style={{ color: '#fbbf24' }}>₹6,200</div>
            <span className="stat-change negative">2 payments due</span>
          </div>
          <div className="stat-card">
            <div className="stat-label"><MessageSquare size={14} /> New Messages</div>
            <div className="stat-value">2</div>
            <span className="stat-change positive">Unread alerts</span>
          </div>
        </div>

        {/* Homework & Gradebook section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <div className="data-table-wrap">
              <div className="table-header">
                <h3><PenLine size={16} style={{ verticalAlign: -2, marginRight: 8, color: '#6d5cff' }} />Homework & Assignments</h3>
                <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 12 }}>+ New</button>
              </div>
              <div style={{ padding: '0 16px', maxHeight: 320, overflowY: 'auto' }}>
                {homework.map((h, i) => (
                  <div key={i} style={{ padding: '14px 8px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{
                        width: 10, height: 10, borderRadius: 3, background: h.color, marginTop: 5, flexShrink: 0
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                          <h4 style={{ fontSize: 13, margin: 0 }}>{h.title}</h4>
                          <span className="status-badge status-late" style={{ fontSize: 11, flexShrink: 0 }}>
                            <Check size={11} /> {h.submissions}/{h.total} done
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{h.desc}</p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-elevated)', padding: '3px 8px', borderRadius: 6 }}>
                            {h.subject} • {h.teacher}
                          </span>
                          <span style={{ fontSize: 11, color: h.due.includes('Tomorrow') ? '#f87171' : 'var(--text-muted)', padding: '3px 8px', borderRadius: 6 }}>
                            Due: {h.due}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Send size={16} style={{ color: '#22c55e' }} /> Submit Assignment
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>Upload file, images, or notes</span>
              </h3>
              <div style={{
                border: '2px dashed var(--border-light)', borderRadius: 'var(--radius-md)',
                padding: 24, textAlign: 'center', color: 'var(--text-muted)',
                fontSize: 13, cursor: 'pointer'
              }}>
                <UploadIcon />
                <div style={{ marginTop: 8 }}>Drag & drop your assignment here</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>or <span style={{ color: 'var(--primary-light)' }}>browse files</span></div>
              </div>
            </div>
          </div>

          {/* Gradebook */}
          <div>
            <div className="data-table-wrap">
              <div className="table-header">
                <h3><BarChart3 size={16} style={{ verticalAlign: -2, marginRight: 8, color: '#3b82f6' }} />Live Gradebook</h3>
                <button className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: 12 }}>
                  <Download size={13} /> PDF Report Card
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Test</th>
                      <th>Score</th>
                      <th>Grade</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{g.subject}</td>
                        <td style={{ fontSize: 12 }}>{g.test}</td>
                        <td style={{ color: g.score >= 90 ? '#4ade80' : g.score >= 80 ? '#60a5fa' : '#fbbf24', fontWeight: 600 }}>
                          {g.score}/{g.max}
                        </td>
                        <td>
                          <span style={{
                            padding: '3px 8px', borderRadius: 6, fontSize: 12,
                            background: g.grade.includes('+') ? 'rgba(34,197,94,0.12)' : 'rgba(59,130,246,0.12)',
                            color: g.grade.includes('+') ? '#4ade80' : '#60a5fa', fontWeight: 700
                          }}>
                            {g.grade}
                          </span>
                        </td>
                        <td style={{ minWidth: 100 }}>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${g.score}%`, background: g.color }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fee payments */}
            <div className="data-table-wrap">
              <div className="table-header">
                <h3><Banknote size={16} style={{ verticalAlign: -2, marginRight: 8, color: '#fbbf24' }} />Fee Payments</h3>
                <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 12 }}>Pay Now</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Fee Item</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStatus.map((f, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{f.item}</td>
                        <td style={{ fontWeight: 600 }}>{f.amount}</td>
                        <td>
                          <span className={`status-badge ${f.color}`}>
                            {f.status === 'Paid' ? <Check size={12} /> : <AlertCircle size={12} />}
                            {f.status}
                          </span>
                        </td>
                        <td style={{ fontSize: 12 }}>{f.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Messages & other modules */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
          <div className="demo-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MessageSquare size={16} style={{ color: '#6d5cff' }} /> Parent Communications
              <span className="status-badge status-late" style={{ marginLeft: 'auto', fontSize: 11 }}>2 unread</span>
            </h3>
            {messages.map((m, i) => (
              <div key={i} className="announcement-item" style={{
                background: !m.read ? 'rgba(109,92,255,0.06)' : 'transparent',
                borderRadius: 'var(--radius-sm)', padding: '10px 12px'
              }}>
                <span className="announcement-avatar" style={{ background: '#6d5cff' }}>
                  <MessageSquare size={15} />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <h4 style={{ fontSize: 13 }}>{m.title}</h4>
                    {!m.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6d5cff', flexShrink: 0 }} />}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{m.body}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: 11, marginTop: 4 }}>
                    <span>{m.from}</span>
                    <span>{m.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="demo-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Library size={16} style={{ color: '#22c55e' }} /> Library & Resource Management
              </h3>
              {libraryBooks.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 8, background: b.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0
                  }}>
                    📚
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.author} • {b.bookId}</div>
                  </div>
                  {b.status === 'Available' ? (
                    <span className="status-badge status-present" style={{ fontSize: 11 }}>Available</span>
                  ) : (
                    <span className="status-badge status-pending" style={{ fontSize: 11 }}>Due {b.due}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="demo-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Plane size={16} style={{ color: '#f59e0b' }} /> Staff Leave & Substitutions
              </h3>
              {leaveRequests.map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{l.teacher}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{l.subject} • {l.leaveDate} • {l.type}</div>
                  </div>
                  <span className="status-badge {l.color}" style={{ fontSize: 11 }}>{l.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Link to="/demo/premium" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            Upgrade to Premium for AI Features →
          </Link>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <p>EduSuite Pro • Standard Plan Prototype</p>
        </div>
      </footer>
    </main>
  )
}

function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}
