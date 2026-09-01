import { useState } from 'react'
import { Wallet, Plus, BellRing, Inbox } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Panel, PageHeader, StatCard, useToast } from '../../components/ui'
import { fees } from '../../lib/mock'

export default function FeesPage() {
  const { user } = useAuth()
  const toast = useToast()
  const [list, setList] = useState(fees)
  const [paying, setPaying] = useState(null)
  const [method, setMethod] = useState('UPI')

  const isParent = user.roleId === 'parent'

  const record = () => {
    setList((l) => l.map((f) => (f.id === paying.id ? { ...f, status: 'Paid', method, date: '01 Sep' } : f)))
    toast(`Payment recorded! Receipt for ₹${paying.amount.toLocaleString('en-IN')} sent to parent via SMS & WhatsApp.`)
    setPaying(null)
  }

  const remind = () => toast('Payment reminder sent to 3 parents with pending fees.', 'info')

  return (
    <>
      <PageHeader
        title={isParent ? 'Fees & Payments' : 'Fee Management'}
        sub={isParent ? 'View your child’s invoices and pay online instantly.' : 'Record UPI / Card / Wallet payments, track pending & overdue, and send reminders.'}
        actions={isParent ? undefined : (
          <>
            <button className="btn btn-ghost btn-sm" onClick={remind}><BellRing size={15} /> Send reminders</button>
            <button className="btn btn-primary" onClick={() => toast('New fee record dialog opened for Class 10A.', 'info')}><Plus size={15} /> Add record</button>
          </>
        )}
      />

      {!isParent && (
        <div className="stat-row">
          <StatCard icon={Wallet} color="#10b981" value="₹4.85L" label="Collected" change="+8% this month" />
          <StatCard icon={Inbox} color="#f59e0b" value="₹1.2L" label="Pending" change="38 invoices" />
          <StatCard icon={Wallet} color="#ef4444" value="₹32K" label="Overdue" change="7 invoices" changeTone="negative" />
          <StatCard icon={Wallet} color="#6366f1" value="92%" label="Collection rate" change="target 90%" />
        </div>
      )}

      <Panel title="Fee Register" icon={Wallet} actions={<button className="btn btn-soft btn-sm" onClick={() => toast('CSV exported — fee register Sep 2026.', 'success')}>Export</button>}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Invoice</th><th>Student</th><th>Class</th><th>Fee</th><th>Amount</th><th>Method</th><th>Status</th>{!isParent && <th></th>}</tr></thead>
            <tbody>
              {list.map((f) => (
                <tr key={f.id}>
                  <td className="strong">{f.id}</td>
                  <td className="strong">{f.student}</td>
                  <td>{f.cls}</td>
                  <td>{f.title}</td>
                  <td className="strong">₹{f.amount.toLocaleString('en-IN')}</td>
                  <td>{f.method}</td>
                  <td><span className={`status-badge ${f.status === 'Paid' ? 'status-paid' : f.status === 'Overdue' ? 'status-overdue' : 'status-pending'}`}>{f.status}</span></td>
                  {!isParent && (
                    <td>
                      {f.status !== 'Paid' ? (
                        <button className="btn btn-accent btn-sm" onClick={() => { setPaying(f); setMethod('UPI') }}>Record payment</button>
                      ) : (
                        <button className="btn btn-ghost btn-sm" onClick={() => toast('Downloading payment receipt PDF.', 'info')}>Receipt</button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {paying && (
        <div className="dialog-overlay" onClick={() => setPaying(null)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Record payment — {paying.student}</h3>
            <p className="dialog-sub">{paying.title} • ₹{paying.amount.toLocaleString('en-IN')} • {paying.cls}</p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              {['UPI', 'Card', 'Wallet'].map((m) => (
                <button key={m} className={`chip ${method === m ? 'active' : ''}`} onClick={() => setMethod(m)}>{m}</button>
              ))}
            </div>
            <div style={{ background: 'var(--card-soft)', border: '2.5px dashed var(--line-dark)', borderRadius: 'var(--radius-xs)', padding: 14 }}>
              <div className="login-input" style={{ boxShadow: 'none' }}>
                <Wallet size={16} />
                <input defaultValue={method === 'UPI' ? 'demo@okaxis' : method === 'Card' ? '•••• 4421' : 'Demo wallet'} style={{ padding: '10px 0' }} readOnly />
              </div>
            </div>
            <div className="dialog-actions">
              <button className="btn btn-ghost" onClick={() => setPaying(null)}>Cancel</button>
              <button className="btn btn-accent" onClick={record}>Confirm ₹{paying.amount.toLocaleString('en-IN')}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}