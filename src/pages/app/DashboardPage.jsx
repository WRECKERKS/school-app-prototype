import { Link } from 'react-router-dom'
import {
  Users, CalendarCheck, Wallet, FileBarChart2, ListTodo, Megaphone,
  ArrowRight, TrendingUp, School, Receipt, BookOpen, GraduationCap, ChevronRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { StatCard, Panel, Progress, pctTone } from '../../components/ui'
import { classes, schedule, subjectPerformance, recentTasks, activityLog } from '../../lib/mock'

export default function DashboardPage() {
  const { user } = useAuth()
  const role = user.roleId

  if (role === 'parent') return <ParentDash user={user} />
  if (role === 'student') return <StudentDash user={user} />
  if (role === 'accounts') return <AccountsDash />
  if (role === 'teacher') return <TeacherDash />
  return <LeadershipDash />
}

/* ---- Shared blocks ------------------------------------------------------ */

function TodaySchedule() {
  return (
    <Panel title="Today&rsquo;s Schedule" icon={CalendarCheck}>
      {schedule.map((s) => (
        <div key={s.title} className="schedule-item">
          <div className="time-chip">
            <b>{s.time}</b>
            <span>{s.ampm}</span>
          </div>
          <div className="si-main">
            <b>{s.title}</b> <span>&middot; {s.cls} &middot; {s.type}</span>
          </div>
          <div className="si-side">
            {s.live ? (
              <>
                <span className="live-tag">
                  <span className="pulse-dot" /> Live now
                </span>
                <Link to="/app/attendance" className="btn btn-primary btn-sm">
                  Join
                </Link>
              </>
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
      {actions.map((a) => {
        const Icon = a.icon
        return (
          <Link key={a.label} to={a.to} className="app-list-row">
            <span className="app-row-ico">
              <Icon size={16} />
            </span>
            <div className="app-row-text">
              <b>{a.label}</b>
              <span>{a.desc}</span>
            </div>
            <ChevronRight size={16} className="app-row-chevron" />
          </Link>
        )
      })}
    </Panel>
  )
}

function RecentActivity({ limit = 4 }) {
  return (
    <Panel title="Recent Activity" icon={TrendingUp}>
      {activityLog.slice(0, limit).map((a, i) => {
        const Icon = a.tone === 'success' ? CalendarCheck : FileBarChart2
        return (
          <div key={i} className="app-list-row static">
            <span className={`app-row-ico ${a.tone === 'success' ? 'good' : a.tone === 'warn' ? 'warn' : 'info'}`}>
              <Icon size={16} />
            </span>
            <div className="app-row-text">
              <b>{a.action}</b>
              <span>
                {a.user} &middot; {a.time}
              </span>
            </div>
          </div>
        )
      })}
    </Panel>
  )
}

/* A labelled bar row — used by several role dashboards */
function ScoreRow({ label, value, suffix = '%' }) {
  return (
    <div className="score-row">
      <span className="score-label">{label}</span>
      <div className="score-bar">
        <Progress value={value} tone={pctTone(value, { hi: 90, mid: 75 })} />
      </div>
      <span className="score-value">
        {value}
        {suffix}
      </span>
    </div>
  )
}

/* ---- Role dashboards ---------------------------------------------------- */

function LeadershipDash() {
  return (
    <>
      <div className="stat-row">
        <StatCard icon={Users} value="245" label="Students" change="+12 this term" />
        <StatCard icon={School} value="18" label="Teachers" change="+2 this year" />
        <StatCard icon={CalendarCheck} value="87%" label="Attendance" change="+3% vs last" />
        <StatCard icon={Wallet} value="₹4.85L" label="Fees collected" change="92% collected" />
      </div>

      <div className="grid-2">
        <TodaySchedule />
        <QuickActions
          actions={[
            { label: 'Mark attendance', desc: 'QR, GPS or manual for any class', to: '/app/attendance', icon: CalendarCheck },
            { label: 'Record a fee', desc: 'UPI, card or wallet payment', to: '/app/fees', icon: Wallet },
            { label: 'Assign homework', desc: 'Any batch, any subject', to: '/app/homework', icon: ListTodo },
            { label: 'Post announcement', desc: 'With high, medium or low priority', to: '/app/announcements', icon: Megaphone },
          ]}
        />
      </div>

      <Panel title="Class Attendance This Week" icon={Users}>
        <div className="score-list">
          {classes.map((c) => (
            <ScoreRow key={c.name} label={c.name} value={c.pct} />
          ))}
        </div>
      </Panel>

      <RecentActivity />
    </>
  )
}

function TeacherDash() {
  return (
    <>
      <div className="stat-row">
        <StatCard icon={Users} value="85" label="My students" change="3 classes" changeTone="neutral" />
        <StatCard icon={CalendarCheck} value="3" label="Classes today" change="9A, 10A, 10B" changeTone="neutral" />
        <StatCard icon={ListTodo} value="12" label="Reviews pending" change="2 overdue" changeTone="negative" />
        <StatCard icon={FileBarChart2} value="5" label="Doubts to answer" change="2 new today" changeTone="neutral" />
      </div>

      <div className="grid-2">
        <TodaySchedule />
        <QuickActions
          actions={[
            { label: 'Mark attendance', desc: 'For today&rsquo;s classes', to: '/app/attendance', icon: CalendarCheck },
            { label: 'Review homework', desc: '12 submissions to grade', to: '/app/homework', icon: ListTodo },
            { label: 'Set a test', desc: 'From saved question sets', to: '/app/tests', icon: FileBarChart2 },
            { label: 'Upload notes', desc: 'Share with any batch', to: '/app/notes', icon: BookOpen },
          ]}
        />
      </div>

      <Panel title="Class Performance" icon={TrendingUp}>
        <div className="score-list">
          {subjectPerformance.map((s) => (
            <ScoreRow key={s.subject} label={s.subject} value={s.score} />
          ))}
        </div>
      </Panel>

      <RecentActivity limit={3} />
    </>
  )
}

function StudentDash({ user }) {
  return (
    <>
      <header className="app-greet">
        <span className="app-greet-avatar">
          <GraduationCap size={20} />
        </span>
        <div className="app-greet-text">
          <h1>Welcome back, {user.name.split(' ')[0]}</h1>
          <p>Class 10A &middot; Roll 1 &middot; Ranked #5 this term</p>
        </div>
        <span className="live-tag">
          <span className="pulse-dot" />
        </span>
      </header>

      <div className="stat-row">
        <StatCard icon={CalendarCheck} value="92%" label="Attendance" change="+4% this month" />
        <StatCard icon={FileBarChart2} value="88" label="Average score" change="Top 5%" />
        <StatCard icon={ListTodo} value="3" label="Pending tasks" change="1 overdue" changeTone="negative" />
        <StatCard icon={TrendingUp} value="#5" label="Class rank" change="up from #8" />
      </div>

      <div className="grid-2">
        <Panel title="My Subject Performance" icon={TrendingUp}>
          <div className="score-list">
            {subjectPerformance.map((s) => (
              <ScoreRow key={s.subject} label={s.subject} value={s.score} suffix="" />
            ))}
          </div>
        </Panel>

        <Panel title="My Tasks" icon={ListTodo}>
          {recentTasks.map((t, i) => (
            <div key={i} className="app-list-row static">
              <span className={`app-row-ico ${t.done ? 'good' : 'warn'}`}>
                <ListTodo size={16} />
              </span>
              <div className="app-row-text">
                <b>{t.title}</b>
                <span>{t.when}</span>
              </div>
            </div>
          ))}
          <div className="panel-footer-action">
            <Link to="/app/homework" className="btn btn-soft btn-sm">
              Go to homework <ArrowRight size={14} />
            </Link>
          </div>
        </Panel>
      </div>

      <TodaySchedule />
    </>
  )
}

function ParentDash({ user }) {
  const wards = [
    { name: 'Arjun Patel', cls: 'Class 10A', att: 92, score: 88, tone: 'accent' },
    { name: 'Meera Patel', cls: 'Class 7B', att: 96, score: 91, tone: 'good' },
  ]

  return (
    <>
      <header className="app-greet">
        <span className="app-greet-avatar">
          <Users size={20} />
        </span>
        <div className="app-greet-text">
          <h1>Hello, {user.name.split(' ')[0]}</h1>
          <p>How both wards are doing this week</p>
        </div>
        <span className="status-badge status-info">2 wards</span>
      </header>

      <div className="grid-cards" style={{ marginBottom: 'var(--s-5)' }}>
        {wards.map((w) => (
          <div className="fcard" key={w.name}>
            <div className="person-cell" style={{ marginBottom: 14 }}>
              <span className="avatar" style={{ width: 40, height: 40 }}>
                {w.name.split(' ').map((x) => x[0]).join('')}
              </span>
              <div>
                <b>{w.name}</b>
                <span>{w.cls}</span>
              </div>
            </div>
            <div className="ward-stats">
              <div>
                <div className="stat-label">Attendance</div>
                <div className="ward-value">{w.att}%</div>
              </div>
              <div>
                <div className="stat-label">Avg score</div>
                <div className="ward-value">{w.score}</div>
              </div>
              <div>
                <div className="stat-label">Fees</div>
                <div className="ward-value">Paid</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <TodaySchedule />
        <Panel
          title="Notifications"
          icon={Megaphone}
          actions={
            <Link to="/app/notifications" className="btn btn-ghost btn-sm">
              All <ArrowRight size={13} />
            </Link>
          }
        >
          {[
            { t: 'Fee receipt issued — ₹8,500 (UPI)', w: 'Today, 09:02' },
            { t: 'Arjun scored 92% in Physics test', w: 'Yesterday' },
            { t: 'PTM invite — Sat 20 Sep', w: '01 Sep' },
          ].map((n, i) => (
            <div key={i} className="app-list-row static">
              <span className="app-row-ico info">
                <Receipt size={16} />
              </span>
              <div className="app-row-text">
                <b>{n.t}</b>
                <span>{n.w}</span>
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </>
  )
}

function AccountsDash() {
  return (
    <>
      <div className="stat-row">
        <StatCard icon={Wallet} value="₹4.85L" label="Collected (Sep)" change="+8% vs Aug" />
        <StatCard icon={Receipt} value="₹1.2L" label="Pending" change="38 invoices" changeTone="neutral" />
        <StatCard icon={Wallet} tone="accent" value="₹32K" label="Overdue" change="7 invoices" changeTone="negative" />
        <StatCard icon={TrendingUp} value="92%" label="Collection rate" change="target 90%" />
      </div>

      <Panel
        title="Outstanding Summary"
        icon={Wallet}
        actions={
          <Link to="/app/fees" className="btn btn-soft btn-sm">
            Open fee management <ArrowRight size={13} />
          </Link>
        }
      >
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Invoice</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Priya Nair', cls: '10A', inv: 'F-342', amt: '₹8,500', st: 'Due', tone: 'status-pending' },
                { name: 'Dev Malhotra', cls: '10B', inv: 'F-345', amt: '₹4,200', st: 'Overdue', tone: 'status-overdue' },
                { name: 'Kabir Singh', cls: '12A', inv: 'F-348', amt: '₹9,500', st: 'Due', tone: 'status-pending' },
              ].map((r) => (
                <tr key={r.inv}>
                  <td className="strong">{r.name}</td>
                  <td>{r.cls}</td>
                  <td>{r.inv}</td>
                  <td className="strong">{r.amt}</td>
                  <td>
                    <span className={`status-badge ${r.tone}`}>{r.st}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <RecentActivity limit={3} />
    </>
  )
}
