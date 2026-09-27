import { BellRing, MessageCircle, Send, Phone } from 'lucide-react'
import { Panel, PageHeader, StatCard, useToast } from '../../components/ui'
import { notifHistory } from '../../lib/mock'

const CHANNEL = {
  SMS: MessageCircle,
  WhatsApp: MessageCircle,
  Email: Send,
  Call: Phone,
}

export default function NotificationsPage() {
  const toast = useToast()

  const send = (channel, who) => {
    toast(`${channel} broadcast sent to ${who} — delivered to inboxes now.`, 'success')
  }

  return (
    <>
      <PageHeader
        title="Parent Alerts"
        sub="Broadcast fee reminders, event invites and notices over SMS, WhatsApp, Email or voice calls."
      />

      <div className="stat-row">
        <StatCard icon={BellRing} value="12K" label="Messages sent" change="this month" />
        <StatCard icon={BellRing} value="11.2K" label="Delivered" change="93%" />
        <StatCard icon={BellRing} value="9.8K" label="Read" change="87% open" />
        <StatCard icon={BellRing} value="96%" label="Channel health" change="all OK" />
      </div>

      <div className="grid-3">
        {[{ channel: 'SMS', route: 'All parents' }, { channel: 'WhatsApp', route: 'Class 10A parents' }, { channel: 'Email', route: 'Faculty' }, { channel: 'Call', route: 'Overdue fee list' }].map((combo, i) => {
          const Icon = CHANNEL[combo.channel]
          return (
            <button key={i} type="button" className="fcard" style={{ textAlign: 'left' }} onClick={() => send(combo.channel, combo.route)}>
              <div className="fcard-top">
                <span className="stat-icon"><Icon size={17} /></span>
                <span className="badge status-paid">Demo send</span>
              </div>
              <h4>Broadcast via {combo.channel}</h4>
              <p>To {combo.route} — template: <em>{['Fee due reminder', 'PTM invite with slot link', 'Staff meeting notice', 'Payment due follow-up'][i]}</em></p>
            </button>
          )
        })}
      </div>

      <Panel title="Notification History" icon={BellRing}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Channel</th><th>Audience</th><th>Message</th><th>Status</th><th>Delivered</th><th>Read</th></tr></thead>
            <tbody>
              {notifHistory.map((n) => (
                <tr key={n.message}>
                  <td><span className="badge">{n.channel}</span></td>
                  <td className="strong">{n.to}</td>
                  <td>{n.message}</td>
                  <td><span className="status-badge status-paid">Sent</span></td>
                  <td>{n.delivered}</td>
                  <td>{n.read}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}