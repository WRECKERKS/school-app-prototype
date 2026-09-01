import { Clock, Plus, CalendarHeart } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, useToast } from '../../components/ui'
import { schedule, upcomingEvents } from '../../lib/mock'

export default function SchedulePage() {
  const { user } = useAuth()
  const toast = useToast()
  const isManagement = ['principal', 'admin', 'teacher'].includes(user.roleId)

  return (
    <>
      <PageHeader
        title="Schedule"
        sub={isManagement ? 'Create and manage classes, tests, PTMs and special events.' : 'Your upcoming sessions, tests and events.'}
        actions={isManagement ? <button className="btn btn-primary" onClick={() => toast('Event "Class — Linear Inequalities" added to Sat 6 Sep, 09:00 AM.', 'success')}><Plus size={15} /> New event</button> : undefined}
      />

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
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Event</th><th>Type</th><th>Batch</th><th>When</th>{isManagement && <th></th>}</tr></thead>
            <tbody>
              {upcomingEvents.map((e) => (
                <tr key={e.title}>
                  <td className="strong">{e.title}</td>
                  <td><span className="badge status-info">{e.type}</span></td>
                  <td>{e.batch}</td>
                  <td>{e.date}</td>
                  {isManagement && <td><button className="btn btn-ghost btn-sm" onClick={() => toast('Reminder sent to parents for this event.', 'info')}>Notify</button></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}