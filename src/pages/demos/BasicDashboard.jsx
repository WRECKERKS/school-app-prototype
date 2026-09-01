import { Link } from 'react-router-dom'
import {
  Users, CalendarCheck, CalendarDays, Megaphone, FileDown,
  X, School, ArrowLeft, LayoutDashboard, UserCheck,
  Bell, FileSpreadsheet
} from 'lucide-react'
import DemoUserBanner from '../../components/DemoUserBanner'
import DemoPlanSwitcher from '../../components/DemoPlanSwitcher'

const attendanceData = [
  { name: 'Class 8A', total: 42, present: 39, absent: 3, pct: 93 },
  { name: 'Class 8B', total: 38, present: 35, absent: 3, pct: 92 },
  { name: 'Class 9A', total: 45, present: 41, absent: 4, pct: 91 },
  { name: 'Class 9B', total: 40, present: 37, absent: 3, pct: 93 },
  { name: 'Class 10A', total: 44, present: 42, absent: 2, pct: 95 },
  { name: 'Class 10B', total: 41, present: 38, absent: 3, pct: 93 },
]

const timetable = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  periods: [
    { time: '08:00 - 08:45', subjects: ['Math', 'English', 'Science', 'Math', 'Hindi'] },
    { time: '08:45 - 09:30', subjects: ['English', 'Math', 'Hindi', 'Science', 'Math'] },
    { time: '09:30 - 09:45', subjects: ['BREAK', 'BREAK', 'BREAK', 'BREAK', 'BREAK'] },
    { time: '09:45 - 10:30', subjects: ['Science', 'Hindi', 'Math', 'English', 'Science'] },
    { time: '10:30 - 11:15', subjects: ['Hindi', 'Science', 'English', 'Social', 'English'] },
    { time: '11:15 - 12:00', subjects: ['Social', 'Social', 'Science', 'Hindi', 'Social'] },
  ],
}

const teachers = [
  { name: 'Rajesh Kumar', role: 'Mathematics', emp: 'T-001', color: '#6d5cff' },
  { name: 'Dr. Sunita Patel', role: 'Science', emp: 'T-002', color: '#22c55e' },
  { name: 'Anil Sharma', role: 'English', emp: 'T-003', color: '#3b82f6' },
  { name: 'Priya Verma', role: 'Hindi', emp: 'T-004', color: '#f59e0b' },
  { name: 'Vikram Singh', role: 'Social Studies', emp: 'T-005', color: '#ec4899' },
]

const announcements = [
  { author: 'Principal Office', title: 'Staff Meeting — Friday 2 PM', body: 'All staff requested in the conference hall for the monthly review meeting.', time: '2h ago', color: '#6d5cff' },
  { author: 'Admin', title: 'Fee Reminder for Term 2', body: 'Please collect outstanding fee slips from the office before end of week.', time: '5h ago', color: '#3b82f6' },
  { author: 'Examination Cell', title: 'Mid-term Exam Schedule Out', body: 'Mid-term exam timetable is now available on the notice board.', time: '1d ago', color: '#22c55e' },
  { author: 'Staff Coordinator', title: 'Result Compilation Guidelines', body: 'Refer to the new guideline document shared in the staff room.', time: '2d ago', color: '#f59e0b' },
]

const roles = [
  { icon: <School size={20} />, name: 'Principal', color: '#6d5cff', desc: 'Full access to all records' },
  { icon: <UserCheck size={20} />, name: 'Admin', color: '#22c55e', desc: 'Manage staff & students' },
  { icon: <Users size={20} />, name: 'Teacher', color: '#3b82f6', desc: 'Attendance & timetable' },
]

export default function BasicDashboard() {
  return (
    <main className="demo-page">
      {/* Demo header */}
      <header className="demo-header">
        <div className="demo-header-inner">
          <div className="demo-header-text">
            <h1>
              <span className="gradient-text green">Basic Plan</span> — Admin & Staff Portal
            </h1>
            <p>₹25,000 / year • Essential school administration toolkit</p>
          </div>
          <div className="demo-actions">
            <DemoPlanSwitcher active="basic" />
            <Link to="/compare" className="btn btn-secondary">
              <ArrowLeft size={16} /> Back to Plans
            </Link>
          </div>
        </div>
      </header>

      <div className="demo-content">
        <DemoUserBanner />

        {/* Role access banner */}
        <div className="stat-row">
          <div className="stat-card" style={{ gridColumn: '1 / -1', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="module-icon purple-icon"><LayoutDashboard size={22} /></div>
              <div>
                <h4 style={{ fontSize: 15, marginBottom: 4 }}>Multi-Role Access Control</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Fixed roles for Principal, Admin, and Teachers</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {roles.map((r) => (
                <div key={r.name} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', padding: '10px 14px'
                }}>
                  <span style={{ color: r.color }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-label"><Users size={14} /> Total Students</div>
            <div className="stat-value">1,247</div>
            <span className="stat-change positive">+32 this term</span>
          </div>
          <div className="stat-card">
            <div className="stat-label"><UserCheck size={14} /> Staff Members</div>
            <div className="stat-value">86</div>
            <span className="stat-change positive">+4 new joined</span>
          </div>
          <div className="stat-card">
            <div className="stat-label"><CalendarCheck size={14} /> Today's Attendance</div>
            <div className="stat-value" style={{ color: '#4ade80' }}>93.2%</div>
            <span className="stat-change positive">↑ 1.4% vs yesterday</span>
          </div>
          <div className="stat-card">
            <div className="stat-label"><FileSpreadsheet size={14} /> CSV Exports</div>
            <div className="stat-value">12</div>
            <span className="stat-change positive">This month</span>
          </div>
        </div>

        {/* Attendance Register */}
        <div className="data-table-wrap">
          <div className="table-header">
            <h3><CalendarCheck size={16} style={{ verticalAlign: -2, marginRight: 8, color: '#4ade80' }} />Daily Attendance Register</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: 12 }}>
                Yesterday
              </button>
              <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 12 }}>
                Today, Sep 1 2026
              </button>
              <button className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: 12 }}>
                Export CSV <FileDown size={14} />
              </button>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Total</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Attendance %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((row) => (
                  <tr key={row.name}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</td>
                    <td>{row.total}</td>
                    <td style={{ color: '#4ade80' }}>{row.present}</td>
                    <td style={{ color: '#f87171' }}>{row.absent}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 140 }}>
                        <div className="progress-bar" style={{ flex: 1 }}>
                          <div className="progress-fill" style={{ width: `${row.pct}%`, background: row.pct >= 95 ? 'var(--gradient-basic)' : row.pct >= 90 ? 'var(--gradient-standard)' : 'var(--gradient-premium)' }} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{row.pct}%</span>
                      </div>
                    </td>
                    <td>
                      {row.pct >= 95 ? (
                        <span className="status-badge status-present">Excellent</span>
                      ) : row.pct >= 92 ? (
                        <span className="status-badge status-paid">Good</span>
                      ) : (
                        <span className="status-badge status-late">Review</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Timetable */}
          <div className="demo-card">
            <h3><CalendarDays size={16} style={{ verticalAlign: -2, marginRight: 8, color: '#3b82f6' }} />Class Timetable — Class 9A</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="timetable">
                <thead>
                  <tr>
                    <th>Time</th>
                    {timetable.days.map(d => <th key={d}>{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {timetable.periods.map((p, pi) => (
                    <tr key={pi}>
                      <td style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{p.time}</td>
                      {p.subjects.map((s, si) => (
                        <td key={si} className={s === 'BREAK' ? 'break-cell' : ''}>
                          {s === 'BREAK' ? (
                            '☕ Break'
                          ) : (
                            <div className="subject-cell">
                              <span className="subject-code">{s}</span>
                              <span className="subject-teacher">P{si + 1}</span>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Staff directory & announcements */}
          <div>
            <div className="demo-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={16} style={{ color: '#6d5cff' }} /> Staff Directory
              </h3>
              {teachers.map((t) => (
                <div key={t.emp} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 10, background: t.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0
                  }}>
                    {t.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role} • {t.emp}</div>
                  </div>
                  <span className="status-badge status-present" style={{ fontSize: 11 }}>Present</span>
                </div>
              ))}
            </div>

            <div className="demo-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Megaphone size={16} style={{ color: '#f59e0b' }} /> Staff Announcements
                <span className="status-badge status-late" style={{ marginLeft: 'auto', fontSize: 11 }}>4 new</span>
              </h3>
              {announcements.map((a, i) => (
                <div key={i} className="announcement-item">
                  <span className="announcement-avatar" style={{ background: a.color }}>
                    <Bell size={16} />
                  </span>
                  <div className="announcement-content" style={{ flex: 1 }}>
                    <h4>{a.title}</h4>
                    <p>{a.body}</p>
                    <div className="announcement-meta">
                      <span>{a.author}</span>
                      <span>•</span>
                      <span>{a.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="demo-card" style={{ borderColor: 'rgba(107,110,143,0.4)' }}>
          <h4 style={{ fontSize: 14, marginBottom: 16, color: 'var(--text-muted)' }}>
            <X size={14} style={{ verticalAlign: -2, marginRight: 6 }} /> Not included in Basic Plan
          </h4>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['No Parent Access', 'No Homework Tracking', 'No Fee Collection', 'No AI Tools'].map(item => (
              <span key={item} style={{
                padding: '6px 14px', borderRadius: 100, fontSize: 13,
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 6
              }}>
                <X size={13} /> {item}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link to="/demo/standard" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>
              Upgrade to Standard Plan →
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <p>EduSuite Pro • Basic Plan Prototype</p>
        </div>
      </footer>
    </main>
  )
}
