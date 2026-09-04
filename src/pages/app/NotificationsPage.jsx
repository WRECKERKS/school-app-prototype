import { BellRing, MessageCircle, Send, Phone } from 'lucide-react'
import { Panel, PageHeader, StatCard, useToast } from '../../components/ui'
import { notifHistory } from '../../lib/mock'

const CHANNEL = {
  SMS: { icon: MessageCircle, color: '#6366f1', soft: '#e0e7ff' },
  WhatsApp: { icon: MessageCircle, color: '#10b981', soft: '#d1fae5' },
  Email: { icon: Send, color: '#d97706', soft: '#fef3c7' },
  Call: { icon: Phone, color: '#8b5cf6', soft: '#ede9fe' },
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
        <StatCard icon={BellRing} color="#6366f1" value="12K" label="Messages sent" change="this month" />
        <StatCard icon={BellRing} color="#10b981" value="11.2K" label="Delivered" change="93%" />
        <StatCard icon={BellRing} color="#d97706" value="9.8K" label="Read" change="87% open" />
        <StatCard icon={BellRing} color="#8b5cf6" value="96%" label="Channel health" change="all OK" />
      </div>

      <div className="grid-3">
        {[{ channel: 'SMS', route: 'All parents' }, { channel: 'WhatsApp', route: 'Class 10A parents' }, { channel: 'Email', route: 'Faculty' }, { channel: 'Call', route: 'Overdue fee list' }].map((combo, i) => {
          const c = CHANNEL[combo.channel]
          const Icon = c.icon
          return (
            <button key={i} className="fcard" style={{ textAlign: 'left' }} onClick={() => send(combo.channel, combo.route)}>
              <div className="fcard-top">
                <span className="stat-icon" style={{ background: c.color }}><Icon size={18} /></span>
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
                  <td><span className="badge" style={{ background: CHANNEL[n.channel].soft, color: CHANNEL[n.channel].color }}>{n.channel}</span></td>
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