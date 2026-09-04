import { useState } from 'react'
import { Clock, Plus, CalendarHeart, Send, BellRing } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { schedule, upcomingEvents } from '../../lib/mock'

const EVENT_TYPES = ['Class', 'Test', 'Lab', 'PTM', 'Special']
const BATCHES = ['Class 9A', 'Class 9B', 'Class 10A', 'Class 10B', 'Class 11A', 'Class 12A', 'All classes', 'Grades 9–12', 'Staff only']
const TYPE_TONE = { Class: 'status-info', Test: 'status-pending', Lab: 'status-info', PTM: 'status-overdue', Special: 'status-success' }

export default function SchedulePage() {
  const { user } = useAuth()
  const toast = useToast()
  const isManagement = ['principal', 'admin', 'teacher'].includes(user.roleId)
  const [events, setEvents] = useState(upcomingEvents)
  const [notified, setNotified] = useState(() => new Set())
  const [composing, setComposing] = useState(false)
  const [draft, setDraft] = useState({ title: '', type: 'Class', batch: 'Class 10A', when: '' })

  const publish = () => {
    if (!draft.title.trim()) { toast('Give the event a title first.', 'info'); return }
    const when = draft.when.trim() || 'Today, 09:00 AM'
    setEvents((list) => [{ title: draft.title.trim(), type: draft.type, batch: draft.batch, date: when }, ...list])
    toast(`Event "${draft.title.trim()}" scheduled for ${draft.batch} — ${when}.`, 'success')
    setDraft({ title: '', type: 'Class', batch: draft.batch, when: '' })
    setComposing(false)
  }

  const notify = (e) => {
    setNotified((n) => new Set(n).add(e.title))
    toast(`Reminder sent to parents for "${e.title}".`, 'success')
  }

  return (
    <>
      <PageHeader
        title="Schedule"
        sub={isManagement ? 'Create and manage classes, tests, PTMs and special events.' : 'Your upcoming sessions, tests and events.'}
        actions={isManagement ? <button className="btn btn-primary" onClick={() => setComposing((v) => !v)}><Plus size={15} /> New event</button> : undefined}
      />

      {composing && (
        <div className="dialog-overlay" onClick={() => setComposing(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <h3>Schedule a new event</h3>
            <p className="dialog-sub">Appears instantly in the Upcoming Events list.</p>
            <label className="form-field" style={{ marginBottom: 10 }}><span>Event title</span>
              <input className="input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Physics Unit Test 2" />
            </label>
            <div className="form-row">
              <label className="form-field"><span>Type</span>
                <select className="input select-input" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>
                  {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="form-field"><span>Batch</span>
                <select className="input select-input" value={draft.batch} onChange={(e) => setDraft({ ...draft, batch: e.target.value })}>
                  {BATCHES.map((b) => <option key={b}>{b}</option>)}
                </select>
              </label>
            </div>
            <label className="form-field"><span>When</span>
              <input className="input" value={draft.when} onChange={(e) => setDraft({ ...draft, when: e.target.value })} placeholder="e.g. Thu, 04 Sep, 11:00 AM" />
            </label>
            <div className="dialog-actions">
              <button className="btn btn-ghost" onClick={() => setComposing(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={publish}><Send size={15} /> Schedule event</button>
            </div>
          </div>
        </div>
      )}

      <Panel title="Today's Sessions" icon={Clock}>
        {schedule.map((s) => (
          <div className={`schedule-item ${s.live ? 'live' : ''}`} key={s.title}>
            <div className="time-chip"><b>{s.time}</b><span>{s.ampm}</span></div>
            <div className="si-main">
              <b>{s.title}</b> <span>• {s.cls} • {s.type}</span>
            </div>
            <div className="si-side">
              {s.live
                ? <span className="live-tag"><span className="pulse-dot" style={{ width: 8, height: 8 }} /> Live now</span>
                : <span className="badge status-info">{s.type}</span>}
            </div>
          </div>
        ))}
      </Panel>

      <Panel title="Upcoming Events" icon={CalendarHeart}>
        {events.length === 0 && (
          <p className="empty-note">No upcoming events.<br />Use <b>New event</b> to schedule one.</p>
        )}
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Event</th><th>Type</th><th>Batch</th><th>When</th>{isManagement && <th></th>}</tr></thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.title}>
                  <td className="strong">{e.title}</td>
                  <td><span className={`status-badge ${TYPE_TONE[e.type] || 'status-info'}`}>{e.type}</span></td>
                  <td>{e.batch}</td>
                  <td>{e.date}</td>
                  {isManagement && (
                    <td>
                      {notified.has(e.title)
                        ? <button className="btn btn-ghost btn-sm" disabled><BellRing size={14} /> Notified</button>
                        : <button className="btn btn-ghost btn-sm" onClick={() => notify(e)}><BellRing size={14} /> Notify parents</button>}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}