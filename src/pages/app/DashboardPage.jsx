import { Link } from 'react-router-dom'
import {
  Users, CalendarCheck, Wallet, FileBarChart2, ListTodo, Megaphone,
  ArrowRight, TrendingUp, School
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { StatCard, Panel, Progress, pctColor } from '../../components/ui'
import { classes, schedule, subjectPerformance, recentTasks, activityLog } from '../../lib/mock'

export default function DashboardPage() {
  const { user } = useAuth()
  const role = user.roleId

  if (role === 'parent') return <ParentDash />
  if (role === 'student') return <StudentDash />
  if (role === 'accounts') return <AccountsDash />
  if (role === 'teacher') return <TeacherDash />
  return <LeadershipDash />
}

function TodaySchedule() {
  return (
    <Panel title="Today's Schedule" icon={CalendarCheck}>
      {schedule.map((s) => (
        <div key={s.title} className="schedule-item">
          <div className="time-chip"><b>{s.time}</b><span>{s.ampm}</span></div>
          <div className="si-main">
            <b>{s.title}</b> <span>• {s.cls} • {s.type}</span>
          </div>
          <div className="si-side">
            {s.live ? (
              <><span className="live-tag"><span className="pulse-dot" style={{ width: 8, height: 8 }} /> Live now</span>
                <Link to="/app/attendance"><button className="btn btn-primary btn-sm">Join</button></Link></>
            ) : (
              <span className="badge status-info">{s.type}</span>
            )}
          </div>
        </div>
      ))}
    </Panel>
  )
}

function QuickActions({ actions }) {
  return (
    <Panel title="Quick Actions" icon={ArrowRight}>
      <div className="grid-cards">
        {actions.map((a) => {
          const Icon = a.icon
          return (
            <Link key={a.label} to={a.to} className="fcard">
              <div className="fcard-top"><span className="stat-icon" style={{ background: a.color }}><Icon size={18} /></span></div>
              <h4>{a.label}</h4>
              <p style={{ minHeight: 0, marginBottom: 0 }}>{a.desc}</p>
            </Link>
          )
        })}
      </div>
    </Panel>
  )
}

function RecentActivity({ limit = 4 }) {
  return (
    <Panel title="Recent Activity" icon={TrendingUp}>
      <div className="activity-feed">
        {activityLog.slice(0, limit).map((a, i) => (
          <div key={i} className="activity-item">
            <span className="activity-ico" style={{ background: a.tone === 'success' ? 'var(--good-soft)' : a.tone === 'warn' ? 'var(--warn-soft)' : 'var(--info-soft)', color: a.tone === 'success' ? 'var(--good-dark)' : a.tone === 'warn' ? 'var(--warn-dark)' : 'var(--info-dark)' }}>
              {a.tone === 'success' ? <CalendarCheck size={16} /> : <FileBarChart2 size={16} />}
            </span>
            <div>
              <b>{a.action}</b>
              <span>{a.user} • {a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function LeadershipDash() {
  return (
    <>
      <StatRow />
      <div className="grid-2">
        <TodaySchedule />
        <QuickActions actions={[
          { label: 'Mark attendance', desc: 'QR, GPS or manual for any class', to: '/app/attendance', icon: CalendarCheck, color: '#6366f1' },
          { label: 'Record a fee', desc: 'UPI, Card or Wallet payment', to: '/app/fees', icon: Wallet, color: '#10b981' },
          { label: 'Assign homework', desc: 'Any batch, any subject', to: '/app/homework', icon: ListTodo, color: '#d97706' },
          { label: 'Post announcement', desc: 'With High / Medium / Low priority', to: '/app/announcements', icon: Megaphone, color: '#8b5cf6' },
        ]} />
      </div>
      <Panel title="Class Attendance This Week" icon={Users}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {classes.map((c) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 78, fontWeight: 800, fontSize: 13.5, color: 'var(--ink)' }}>{c.name}</span>
              <div style={{ flex: 1 }}><Progress value={c.pct} color={pctColor(c.pct, { hi: 95, mid: 92 })} /></div>
              <span style={{ width: 44, textAlign: 'right', fontWeight: 800, fontSize: 13.5 }}>{c.pct}%</span>
            </div>
          ))}
        </div>
      </Panel>
      <RecentActivity />
    </>
  )
}

function StatRow() {
  const stats = [
    { icon: Users, color: '#6366f1', value: '245', label: 'Students', change: '+12 this term', changeTone: 'positive' },
    { icon: School, color: '#8b5cf6', value: '18', label: 'Teachers', change: '+2 this year' },
    { icon: CalendarCheck, color: '#10b981', value: '87%', label: 'Attendance', change: '+3% vs last' },
    { icon: Wallet, color: '#d97706', value: '₹4.85L', label: 'Fees collected', change: '92% collected' },
  ]
  return (
    <div className="stat-row">
      {stats.map((s) => (
        <StatCard key={s.label} icon={s.icon} color={s.color} value={s.value} label={s.label} change={s.change} changeTone={s.changeTone || 'positive'} />
      ))}
    </div>
  )
}

function TeacherDash() {
  return (
    <>
      <div className="stat-row">
        <StatCard icon={Users} color="#6366f1" value="85" label="My students" change="3 classes" />
        <StatCard icon={CalendarCheck} color="#10b981" value="3" label="Classes today" change="9A, 10A, 10B" />
        <StatCard icon={ListTodo} color="#d97706" value="12" label="Reviews pending" change="2 overdue" changeTone="negative" />
        <StatCard icon={FileBarChart2} color="#8b5cf6" value="5" label="Doubts to answer" change="2 new today" />
      </div>
      <div className="grid-2">
        <TodaySchedule />
        <QuickActions actions={[
          { label: 'Mark attendance', desc: 'For today’s classes', to: '/app/attendance', icon: CalendarCheck, color: '#6366f1' },
          { label: 'Review homework', desc: '12 submissions to grade', to: '/app/homework', icon: ListTodo, color: '#d97706' },
          { label: 'Set a test', desc: 'From saved question sets', to: '/app/tests', icon: FileBarChart2, color: '#10b981' },
          { label: 'Upload notes', desc: 'Share with any batch', to: '/app/notes', icon: FileBarChart2, color: '#8b5cf6' },
        ]} />
      </div>
      <Panel title="Class Performance" icon={TrendingUp}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {subjectPerformance.map((s) => (
            <div key={s.subject} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 110, fontWeight: 800, fontSize: 13.5, color: 'var(--ink)' }}>{s.subject}</span>
              <div style={{ flex: 1 }}><Progress value={s.score} color={s.color} /></div>
              <span style={{ width: 44, textAlign: 'right', fontWeight: 800, fontSize: 13.5 }}>{s.score}%</span>
            </div>
          ))}
        </div>
      </Panel>
      <RecentActivity limit={3} />
    </>
  )
}

function StudentDash() {
  return (
    <>
      <Panel>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: 20, marginBottom: 4 }}>Welcome back, {user.name.split(' ')[0]}! 👋</h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Class 10A • Roll 1 • You&apos;re ranked #5 this term.</p>
          </div>
          <span className="live-tag"><span className="pulse-dot" style={{ width: 8, height: 8 }} /> Maths class is live now</span>
        </div>
      </Panel>
      <div className="stat-row">
        <StatCard icon={CalendarCheck} color="#10b981" value="92%" label="Attendance" change="+4% this month" />
        <StatCard icon={FileBarChart2} color="#6366f1" value="88" label="Avg score" change="Top 5%" />
        <StatCard icon={ListTodo} color="#d97706" value="3" label="Pending tasks" change="1 overdue" changeTone="negative" />
        <StatCard icon={TrendingUp} color="#8b5cf6" value="#5" label="Class rank" change="up from #8" />
      </div>
      <div className="grid-2">
        <Panel title="My Subject Performance" icon={TrendingUp}>
          {subjectPerformance.map((s) => (
            <div key={s.subject} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <span style={{ width: 110, fontWeight: 800, fontSize: 13.5, color: 'var(--ink)' }}>{s.subject}</span>
              <div style={{ flex: 1 }}><Progress value={s.score} color={s.color} /></div>
              <span style={{ width: 44, textAlign: 'right', fontWeight: 800 }}>{s.score}</span>
            </div>
          ))}
        </Panel>
        <Panel title="My Tasks" icon={ListTodo}>
          <div className="activity-feed">
            {recentTasks.map((t, i) => (
              <div key={i} className="activity-item">
                <span className="activity-ico" style={{ background: t.done ? 'var(--good-soft)' : 'var(--warn-soft)', color: t.done ? 'var(--good-dark)' : 'var(--warn-dark)' }}>
                  <ListTodo size={16} />
                </span>
                <div>
                  <b>{t.title}</b>
                  <span>{t.when}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/app/homework" className="btn btn-soft btn-sm" style={{ marginTop: 10 }}>Go to homework <ArrowRight size={14} /></Link>
        </Panel>
      </div>
      <TodaySchedule />
    </>
  )
}

function ParentDash() {
  return (
    <>
      <Panel>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: 20, marginBottom: 4 }}>Hello, {user.name.split(' ')[0]}!</h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Here&apos;s how your wards are doing this week.</p>
          </div>
          <span className="badge status-paid"><Users size={12} /> 2 wards</span>
        </div>
      </Panel>
      <div className="grid-cards">
        {[
          { name: 'Arjun Patel', cls: 'Class 10A', att: 92, score: 88, color: '#6366f1' },
          { name: 'Meera Patel', cls: 'Class 7B', att: 96, score: 91, color: '#10b981' },
        ].map((w) => (
          <div className="fcard" key={w.name}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span className="avatar" style={{ width: 42, height: 42, fontSize: 15, background: w.color }}>{w.name.split(' ').map((x) => x[0]).join('')}</span>
              <div>
                <h4 style={{ margin: 0 }}>{w.name}</h4>
                <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{w.cls}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div><div className="stat-label">Attendance</div><div className="stat-value" style={{ fontSize: 20 }}>{w.att}%</div></div>
              <div><div className="stat-label">Avg score</div><div className="stat-value" style={{ fontSize: 20 }}>{w.score}</div></div>
              <div><div className="stat-label">Fees</div><div className="stat-value" style={{ fontSize: 20 }}>Paid</div></div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <TodaySchedule />
        <Panel title="Notifications" icon={Megaphone}>
          <div className="activity-feed">
            {[
              { t: 'Fee receipt issued — ₹8,500 (UPI)', w: 'Today, 09:02' },
              { t: 'Arjun scored 92% in Physics test', w: 'Yesterday' },
              { t: 'PTM invite — Sat 20 Sep', w: '01 Sep' },
            ].map((n, i) => (
              <div key={i} className="activity-item">
                <span className="activity-ico" style={{ background: 'var(--info-soft)', color: 'var(--info-dark)' }}><FileBarChart2 size={16} /></span>
                <div><b>{n.t}</b><span>{n.w}</span></div>
              </div>
            ))}
          </div>
          <Link to="/app/notifications" className="btn btn-soft btn-sm" style={{ marginTop: 10 }}>View all alerts <ArrowRight size={14} /></Link>
        </Panel>
      </div>
    </>
  )
}

function AccountsDash() {
  return (
    <>
      <div className="stat-row">
        <StatCard icon={Wallet} color="#10b981" value="₹4.85L" label="Collected (Sep)" change="+8% vs Aug" />
        <StatCard icon={Wallet} color="#d97706" value="₹1.2L" label="Pending" change="38 invoices" />
        <StatCard icon={Wallet} color="#ef4444" value="₹32K" label="Overdue" change="7 invoices" changeTone="negative" />
        <StatCard icon={TrendingUp} color="#6366f1" value="92%" label="Collection rate" change="target 90%" />
      </div>
      <Panel title="Outstanding Summary" icon={Wallet}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Student</th><th>Class</th><th>Invoice</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {[
                { name: 'Priya Nair', cls: '10A', inv: 'F-342', amt: '₹8,500', st: 'Due', tone: 'pending' },
                { name: 'Dev Malhotra', cls: '10B', inv: 'F-345', amt: '₹4,200', st: 'Overdue', tone: 'absent' },
                { name: 'Kabir Singh', cls: '12A', inv: 'F-348', amt: '₹9,500', st: 'Due', tone: 'pending' },
              ].map((r) => (
                <tr key={r.inv}>
                  <td className="strong">{r.name}</td><td>{r.cls}</td><td>{r.inv}</td>
                  <td className="strong">{r.amt}</td>
                  <td><span className={`status-badge status-${r.tone}`}>{r.st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/app/fees" className="btn btn-primary btn-sm" style={{ marginTop: 14 }}>Open fee management <ArrowRight size={14} /></Link>
      </Panel>
      <RecentActivity limit={3} />
    </>
  )
}