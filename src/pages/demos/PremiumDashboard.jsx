import { Link } from 'react-router-dom'
import {
  ArrowLeft, Brain, BookMarked, BarChart3, Bus,
  Shield, Palette, Sparkles, Check, Bot, Send, FileText,
  Building, Clock
} from 'lucide-react'
import DemoUserBanner from '../../components/DemoUserBanner'
import DemoPlanSwitcher from '../../components/DemoPlanSwitcher'

const lessonPlan = {
  subject: 'Mathematics',
  topic: 'Quadratic Equations',
  grade: 'Class 10',
  duration: '5 Days',
  objectives: [
    'Identify and standardize quadratic equations',
    'Solve equations using factorization method',
    'Apply the quadratic formula with accuracy',
    'Relate roots to real-world parabolic motion',
  ],
  weeklyUnits: [
    { day: 'Day 1', activity: 'Introduction to quadratic forms, standard equation identification', focus: 'Concept building' },
    { day: 'Day 2', activity: 'Factorization method — guided practice with 15 problems', focus: 'Skill practice' },
    { day: 'Day 3', activity: 'Quadratic formula derivation and application', focus: 'Core formula' },
    { day: 'Day 4', activity: 'Word problems, projectile motion real-life applications', focus: 'Application' },
    { day: 'Day 5', activity: 'Revision quiz with auto-graded MCQs + answer key', focus: 'Assessment' },
  ],
}

const reportCardRemarks = [
  { student: 'Aarav Sharma', trend: '88 → 92', remark: 'Excellent improvement! Aarav has shown strong consistency in problem-solving and has become more confident in class participation.', color: '#22c55e' },
  { student: 'Diya Patel', trend: '75 → 70', remark: 'Diya continues to work hard, but recent performance suggests she may need additional support with algebra topics.', color: '#f59e0b' },
  { student: 'Rohan Gupta', trend: '91 → 96', remark: 'Outstanding performance! Rohan demonstrates exceptional analytical skills and consistently submits high-quality work.', color: '#22c55e' },
  { student: 'Sneha Reddy', trend: '62 → 68', remark: 'Sneha is showing steady progress. Encouraging her to participate more in class discussions would help.', color: '#3b82f6' },
]

const routes = [
  { route: 'Route A — Green Line', driver: 'Mr. Shankar', stops: 8, status: 'On Time', eta: 'Arriving in 7 min', progress: 68, color: '#22c55e' },
  { route: 'Route B — Blue Line', driver: 'Mr. Prakash', stops: 6, status: 'On Time', eta: 'Departed', progress: 92, color: '#3b82f6' },
  { route: 'Route C — Orange Line', driver: 'Mr. Venkatesh', stops: 10, status: 'Delayed 5 min', eta: 'Traffic ahead', progress: 45, color: '#f59e0b' },
  { route: 'Route D — Yellow Line', driver: 'Ms. Lakshmi', stops: 5, status: 'On Time', eta: 'Arriving in 15 min', progress: 30, color: '#6d5cff' },
]

export default function PremiumDashboard() {
  return (
    <main className="demo-page">
      <header className="demo-header">
        <div className="demo-header-inner">
          <div className="demo-header-text">
            <h1>
              <span className="gradient-text gold">Premium Plan</span> — AI-Powered Experience
            </h1>
            <p>₹96,000 / year • Full AI automation + school branding</p>
          </div>
          <div className="demo-actions">
            <DemoPlanSwitcher active="premium" />
            <Link to="/compare" className="btn btn-secondary">
              <ArrowLeft size={16} /> Compare Plans
            </Link>
          </div>
        </div>
      </header>

      <div className="demo-content">
        <DemoUserBanner />

        {/* Enterprise badges */}
        <div className="stat-row">
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { icon: <Shield size={18} />, label: 'Custom Permissions', color: '#6d5cff' },
              { icon: <Building size={18} />, label: 'Multi-Branch', color: '#3b82f6' },
              { icon: <Palette size={18} />, label: 'White-Label', color: '#f59e0b' },
              { icon: <Bot size={18} />, label: 'AI Enabled', color: '#22c55e' },
            ].map((b) => (
              <span key={b.label} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 100,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                fontSize: 13, fontWeight: 600, color: b.color
              }}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* AI Lesson Plan Generator */}
        <div className="demo-card" style={{
          borderColor: 'rgba(245,158,11,0.4)',
          background: 'linear-gradient(160deg, rgba(245,158,11,0.08), var(--bg-card) 50%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
            <div className="module-icon orange-icon"><Brain size={24} /></div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 17 }}>AI Lesson Plan Generator</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Generate detailed weekly unit plans and learning objectives in seconds</p>
            </div>
            <button className="btn btn-primary" style={{ padding: '10px 18px' }}>
              <Sparkles size={15} /> Generate New
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                {[
                  { label: 'Subject', value: 'Mathematics' },
                  { label: 'Topic', value: 'Quadratic Equations' },
                  { label: 'Grade', value: 'Class 10' },
                  { label: 'Duration', value: '5 Days' },
                ].map((f) => (
                  <div key={f.label} style={{
                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: 13
                  }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontWeight: 600 }}>{f.value}</div>
                  </div>
                ))}
              </div>

              <h4 style={{ fontSize: 13, marginBottom: 10 }}>Learning Objectives</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {lessonPlan.objectives.map((o, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                    <Check size={15} style={{ color: '#4ade80', flexShrink: 0, marginTop: 2 }} /> {o}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 13, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={14} /> Weekly Unit Plan
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {lessonPlan.weeklyUnits.map((u, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', padding: '10px 14px'
                  }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                      background: 'rgba(245,158,11,0.15)', color: '#fbbf24', flexShrink: 0
                    }}>{u.day}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>{u.activity}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.focus}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Quiz Builder */}
        <div className="demo-card" style={{ borderColor: 'rgba(109,92,255,0.4)', background: 'linear-gradient(160deg, rgba(109,92,255,0.08), var(--bg-card) 50%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div className="module-icon purple-icon"><BookMarked size={24} /></div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 17 }}>AI Quiz & Exam Builder</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Automatic question paper setup with adjustable difficulty and answer keys</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Questions', value: 20, color: '#6d5cff' },
                { label: 'Difficulty', value: 'Medium', color: '#f59e0b' },
                { label: 'Multiple Choice', value: 12, color: '#3b82f6' },
                { label: 'Descriptive', value: 6, color: '#22c55e' },
                { label: 'Numerical', value: 2, color: '#ec4899' },
              ].map((q, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', padding: '12px 16px'
                }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{q.label}</span>
                  <span style={{
                    fontSize: 13, fontWeight: 700, background: 'rgba(109,92,255,0.15)',
                    color: q.color, padding: '3px 10px', borderRadius: 6
                  }}>{q.value}</span>
                </div>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: 13, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileText size={14} /> Sample Generated Question
              </h4>
              <div style={{
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: 16
              }}>
                <div style={{ fontSize: 13, marginBottom: 12 }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Q3.</span>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Solve the quadratic equation: x² - 7x + 12 = 0
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['A) x = 3, 4 ✓', 'B) x = 4, 5', 'C) x = 2, 6', 'D) x = 1, 12'].map((opt, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 8, fontSize: 13,
                      color: opt.includes('✓') ? '#4ade80' : 'var(--text-secondary)',
                      padding: '8px 12px', borderRadius: 8,
                      background: opt.includes('✓') ? 'rgba(34,197,94,0.1)' : 'var(--bg)',
                      border: opt.includes('✓') ? '1px solid rgba(34,197,94,0.3)' : '1px solid var(--border)'
                    }}>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                  <span style={{ color: '#4ade80', fontWeight: 600 }}>Answer Key:</span> Option A — x = 3, 4
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Report Card Remarks */}
        <div className="data-table-wrap">
          <div className="table-header">
            <h3><BarChart3 size={16} style={{ verticalAlign: -2, marginRight: 8, color: '#22c55e' }} />AI Report Card Remarks</h3>
            <button className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: 12 }}>
              <Sparkles size={13} /> Generate for All Students
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Trend</th>
                  <th>AI-Generated Remark</th>
                  <th>Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {reportCardRemarks.map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.student}</td>
                    <td style={{ fontSize: 13, color: r.trend.includes('→') && parseInt(r.trend.split('→')[1]) > parseInt(r.trend.split('→')[0]) ? '#4ade80' : '#fbbf24', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {r.trend.split('→')[0]} <span style={{ color: 'var(--text-muted)' }}>→</span> {r.trend.split('→')[1]}
                    </td>
                    <td style={{ fontSize: 13, minWidth: 350, whiteSpace: 'normal' }}>{r.remark}</td>
                    <td>
                      <span className="status-badge" style={{
                        background: r.color === '#22c55e' ? 'rgba(34,197,94,0.12)' : r.color === '#f59e0b' ? 'rgba(245,158,11,0.12)' : 'rgba(59,130,246,0.12)',
                        color: r.color
                      }}>
                        {r.color === '#22c55e' ? 'Positive' : r.color === '#f59e0b' ? 'Improving' : 'Steady'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Chatbot */}
        <div className="demo-card" style={{ borderColor: 'rgba(109,92,255,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div className="module-icon purple-icon"><Bot size={24} /></div>
            <div>
              <h3 style={{ fontSize: 17 }}>24/7 AI Parent Support Chatbot</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                Automated assistant handling repetitive parent queries about fees, events, and schedules
              </p>
            </div>
          </div>

          <div className="chat-container">
            <div className="chat-header">
              <div className="chat-avatar"><Bot size={22} /></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>EduAssistant AI</div>
                <div style={{ fontSize: 12, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  Online • Always available
                </div>
              </div>
            </div>
            <div className="chat-messages">
              <div className="chat-message bot">
                Hello! I'm your school's AI assistant. I can help with <strong>fees</strong>, <strong>events</strong>, <strong>homework</strong>, and <strong>schedules</strong>. How can I help today? 😊
              </div>
              <div className="chat-message user">When is the Term 3 exam fee due?</div>
              <div className="chat-message bot">
                The Term 3 exam fee is <strong>₹1,500</strong>, due by <strong>30 September 2026</strong>. You can pay online through the parent portal or at the school office.
              </div>
              <div className="chat-message user">What time does the school bus arrive at Lakeview stop?</div>
              <div className="chat-message bot">
                🚌 The bus for <strong>Route A (Green Line)</strong> arrives at the <strong>Lakeview stop</strong> at approximately <strong>7:35 AM</strong>. It's currently on time with an ETA of 7 minutes.
              </div>
            </div>
            <div className="chat-input">
              <input placeholder="Type your question here..." />
              <button className="send-btn"><Send size={18} /></button>
            </div>
          </div>
        </div>

        {/* Bus Tracking */}
        <div className="demo-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div className="module-icon teal-icon"><Bus size={24} /></div>
            <div>
              <h3 style={{ fontSize: 17 }}>Bus & Transport Tracking</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Live driver routes, stop assignments, and real-time vehicle status for parents</p>
            </div>
          </div>

          {routes.map((r, i) => (
            <div key={i} className="route-row">
              <div className="route-bus"><Bus size={22} style={{ color: r.color }} /></div>
              <div className="route-info">
                <h4 style={{ fontSize: 14 }}>{r.route}</h4>
                <p>Driver: {r.driver} • {r.stops} stops</p>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="progress-bar" style={{ flex: 1, maxWidth: 400 }}>
                    <div className="progress-fill" style={{ width: `${r.progress}%`, background: r.color }} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.progress}% complete</span>
                </div>
              </div>
              <div className="route-status">
                <span className="live-indicator"><span className="live-dot" /> LIVE</span>
                <span className="status-badge" style={{
                  background: r.color === '#22c55e' || r.color === '#3b82f6' || r.color === '#6d5cff' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)',
                  color: r.color,
                  fontSize: 11,
                }}>{r.status}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.eta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* White Label */}
        <div className="demo-card" style={{ borderColor: 'rgba(245,158,11,0.5)', background: 'linear-gradient(160deg, rgba(245,158,11,0.08), var(--bg-card) 50%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="module-icon orange-icon"><Palette size={24} /></div>
            <div>
              <h3 style={{ fontSize: 17 }}>White-Label Branding</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Custom mobile app launch and web domain with your school's official logo and color scheme</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: 20, textAlign: 'center'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 22
              }}>
                🏫
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Custom App</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Your school's app on Play Store & App Store</div>
            </div>
            <div style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: 20, textAlign: 'center'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #6d5cff, #8f82ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 22
              }}>
                🌐
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Custom Domain</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>yourSchool.com portal</div>
            </div>
            <div style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: 20, textAlign: 'center'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 22
              }}>
                🎨
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Branded UI</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Your logo, colors & theme throughout</div>
            </div>
          </div>

          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Theme preview:</span>
            {[
              { name: 'Royal Blue', bg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' },
              { name: 'Emerald', bg: 'linear-gradient(135deg, #065f46, #10b981)' },
              { name: 'Crimson', bg: 'linear-gradient(135deg, #7f1d1d, #ef4444)' },
              { name: 'Deep Purple', bg: 'linear-gradient(135deg, #4c1d95, #8b5cf6)' },
              { name: 'Ocean Teal', bg: 'linear-gradient(135deg, #134e4a, #2dd4bf)' },
            ].map((t) => (
              <span key={t.name} style={{
                minWidth: 80, padding: '10px 14px', borderRadius: 8,
                background: t.bg, fontSize: 12, fontWeight: 600, color: 'white',
                textAlign: 'center', cursor: 'pointer'
              }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Link to="/compare" className="btn btn-secondary" style={{ padding: '12px 24px' }}>
            <ArrowLeft size={16} /> Back to Compare Plans
          </Link>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <p>EduSuite Pro • Premium Plan Prototype</p>
        </div>
      </footer>
    </main>
  )
}
