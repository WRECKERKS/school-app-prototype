import { Link } from 'react-router-dom'
import {
  ArrowRight, CalendarCheck, Megaphone, Clock, TrendingUp, Sparkles, Inbox, ChevronRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel } from '../../components/ui'
import { workModulesFor, PLANS, roleById } from '../../lib/registry'
import { schedule, announcements, upcomingEvents, activityLog } from '../../lib/mock'

/* ---- Per-role framing for the home screen ------------------------------- */

const HOME_COPY = {
  principal: {
    lede: 'The whole school at a glance — enrolment, attendance and collection, with the few numbers that actually moved overnight.',
    leadTitle: 'Term at a glance',
    leadBody:
      'Attendance is holding above the 92% target across nine of ten classes. Fee collection is 8% ahead of last month, and two invoice clusters in Grades 9 and 11 remain the only soft spot.',
    leadCta: { label: 'Open the overview', to: '/app/overview' },
    stats: [
      { value: '245', label: 'Students on roll', tone: '' },
      { value: '92%', label: 'Fees collected', tone: 'good' },
      { value: '94%', label: 'Attendance', tone: '' },
    ],
  },
  admin: {
    lede: 'Everything that needs a decision today, ordered by how soon it bites.',
    leadTitle: 'Three things need you today',
    leadBody:
      'Twelve fee invoices are past due, the Grade 9 admission forms close on Friday, and three staff records are still missing verification documents.',
    leadCta: { label: 'Open the overview', to: '/app/overview' },
    stats: [
      { value: '12', label: 'Invoices overdue', tone: '' },
      { value: '₹1.2L', label: 'Pending collection', tone: '' },
      { value: '96%', label: 'Records verified', tone: 'good' },
    ],
  },
  teacher: {
    lede: 'Your classes, what is due, and the four things a parent will ask about after class.',
    leadTitle: 'Three classes, twelve reviews',
    leadBody:
      'Maths and Physics are live this morning. Twelve homework submissions are waiting on you, two of them past the deadline, and five student doubts are still open.',
    leadCta: { label: 'Start marking', to: '/app/attendance' },
    stats: [
      { value: '85', label: 'Your students', tone: '' },
      { value: '12', label: 'Reviews pending', tone: '' },
      { value: '5', label: 'Open doubts', tone: '' },
    ],
  },
  parent: {
    lede: 'How both wards are doing this week — fees, attendance and results, before they get home.',
    leadTitle: 'Both wards are settled',
    leadBody:
      'Arjun is ranked fifth in Class 10A with attendance at 92%. Meera has been marked present every single day this term. The next fee instalment of ₹8,500 is due on the 10th.',
    leadCta: { label: 'View fee status', to: '/app/fees' },
    stats: [
      { value: '92%', label: 'Arjun attendance', tone: 'good' },
      { value: '#5', label: 'Class rank', tone: '' },
      { value: '₹8,500', label: 'Due 10 Sep', tone: '' },
    ],
  },
  student: {
    lede: 'What is due today, where you stand, and which class is live right now.',
    leadTitle: 'Ranked fifth this term',
    leadBody:
      'Three tasks are pending and one has slipped past its deadline. Maths is live at the moment, and the Physics test result came through at 92% — your best this year.',
    leadCta: { label: 'See my results', to: '/app/tests' },
    stats: [
      { value: '88', label: 'Average score', tone: '' },
      { value: '#5', label: 'Class rank', tone: '' },
      { value: '3', label: 'Tasks pending', tone: '' },
    ],
  },
  accounts: {
    lede: 'Collections, outstanding balances and the invoices most likely to be paid this week.',
    leadTitle: '₹4.85L collected this month',
    leadBody:
      'Collection is running eight percent ahead of August and the monthly target is nearly met. Thirty-eight invoices remain open; seven of those are now past due and worth ₹32,000.',
    leadCta: { label: 'Record a payment', to: '/app/fees' },
    stats: [
      { value: '92%', label: 'Collection rate', tone: 'good' },
      { value: '₹1.2L', label: 'Still open', tone: '' },
      { value: '38', label: 'Open invoices', tone: '' },
    ],
  },
}

const fallbackCopy = {
  lede: 'Everything waiting on you today, in one place.',
  leadTitle: 'Welcome back',
  leadBody: 'Pick a module below to get started.',
  leadCta: { label: 'Open the overview', to: '/app/overview' },
  stats: [],
}

/* ---- Helpers ------------------------------------------------------------ */

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function longDate() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/* ---- Page --------------------------------------------------------------- */

export default function HomePage() {
  const { user } = useAuth()
  const copy = HOME_COPY[user.roleId] || fallbackCopy
  const plan = PLANS[user.plan] || PLANS.basic
  const modules = workModulesFor(plan.id, user.roleId)
  const firstName = user.name.split(' ')[0].replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/, '')
  const RoleIcon = (roleById(user.roleId) || {}).icon

  const liveNow = schedule.find((s) => s.live)

  return (
    <>
      {/* Greeting header — the app-bar equivalent on a phone */}
      <header className="app-greet">
        <span className="app-greet-avatar">
          {RoleIcon ? <RoleIcon size={20} /> : null}
        </span>
        <div className="app-greet-text">
          <h1>
            {greeting()}, {firstName}
          </h1>
          <p>
            {longDate()} &middot; {plan.name} plan
          </p>
        </div>
        <Link to="/app/overview" className="btn btn-ghost btn-sm" aria-label="Open dashboard">
          <TrendingUp size={16} />
        </Link>
      </header>

      {/* Headline numbers */}
      {copy.stats.length > 0 && (
        <div className="app-stat-row">
          {copy.stats.map((s) => (
            <div key={s.label} className="app-stat">
              <b className={s.tone || undefined}>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Today */}
      <Panel title="Today" icon={Sparkles}>
        <p className="app-lead-title">{copy.leadTitle}</p>
        <p className="app-lead-body">{copy.leadBody}</p>

        {liveNow && (
          <div className="app-list-row static">
            <span className="app-row-ico good">
              <Clock size={16} />
            </span>
            <div className="app-row-text">
              <b>
                {liveNow.title} is live &middot; {liveNow.cls}
              </b>
              <span>
                Started {liveNow.time} {liveNow.ampm} &middot; {liveNow.type}
              </span>
            </div>
            <span className="status-badge status-paid">Live</span>
          </div>
        )}

        <div className="panel-footer-action">
          <Link to={copy.leadCta.to} className="btn btn-primary">
            {copy.leadCta.label} <ArrowRight size={15} />
          </Link>
        </div>
      </Panel>

      {/* Quick actions — horizontal scroll, like a launcher row */}
      <div className="app-section-head">
        <h2>Quick actions</h2>
      </div>
      <div className="app-quick-row">
        {modules.slice(0, 6).map((m) => {
          const Icon = m.icon
          return (
            <Link key={m.id} to={m.path} className="app-quick">
              <span className="app-quick-ico">
                <Icon size={18} />
              </span>
              <span>{m.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Module launcher grid */}
      <div className="app-section-head">
        <h2>All modules</h2>
        <span className="stat-label">{modules.length} on {plan.name}</span>
      </div>
      <div className="app-launcher">
        {modules.map((m) => {
          const Icon = m.icon
          return (
            <Link key={m.id} to={m.path} className="app-launch">
              <span className="app-launch-ico">
                <Icon size={19} />
              </span>
              <b>{m.label}</b>
            </Link>
          )
        })}
      </div>

      {/* Lists */}
      <div className="grid-2">
        <Panel title="Next up" icon={CalendarCheck}>
          {upcomingEvents.slice(0, 4).map((e, i) => (
            <div key={i} className="app-list-row static">
              <span className="app-row-ico">
                <Clock size={16} />
              </span>
              <div className="app-row-text">
                <b>{e.title}</b>
                <span>
                  {e.batch} &middot; {e.date}
                </span>
              </div>
              <span className="status-badge status-info">{e.type}</span>
            </div>
          ))}
        </Panel>

        <Panel
          title="Notices"
          icon={Megaphone}
          actions={
            <Link to="/app/announcements" className="btn btn-ghost btn-sm">
              All
            </Link>
          }
        >
          {announcements.slice(0, 3).map((a) => (
            <Link key={a.id} to="/app/announcements" className="app-list-row">
              <span className="app-row-ico">
                <Megaphone size={16} />
              </span>
              <div className="app-row-text">
                <b>{a.title}</b>
                <span>
                  {a.date} &middot; {a.id}
                </span>
              </div>
              <span
                className={`status-badge ${
                  a.priority === 'High'
                    ? 'status-overdue'
                    : a.priority === 'Medium'
                      ? 'status-pending'
                      : 'status-info'
                }`}
              >
                {a.priority}
              </span>
              <ChevronRight size={16} className="app-row-chevron" />
            </Link>
          ))}
        </Panel>
      </div>

      {/* Activity */}
      <Panel
        title="Recent activity"
        icon={Inbox}
        actions={
          <Link to="/app/activity" className="btn btn-ghost btn-sm">
            Full log
          </Link>
        }
      >
        {activityLog.slice(0, 4).map((a, i) => (
          <div key={i} className="app-list-row static">
            <span className={`app-row-ico ${a.tone === 'success' ? 'good' : a.tone === 'warn' ? 'warn' : 'info'}`}>
              <Inbox size={16} />
            </span>
            <div className="app-row-text">
              <b>{a.action}</b>
              <span>
                {a.user} &middot; {a.time}
              </span>
            </div>
            <span className="status-badge status-info">{a.category}</span>
          </div>
        ))}
      </Panel>
    </>
  )
}
