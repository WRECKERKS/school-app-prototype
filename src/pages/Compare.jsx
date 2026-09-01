import { Link } from 'react-router-dom'
import { Check, X, GraduationCap, LogIn } from 'lucide-react'

const rows = [
  {
    category: 'Basic Features',
    items: [
      { name: 'Multi-Role Access Control', basic: true, standard: true, premium: true },
      { name: 'Basic Profile Directory', basic: true, standard: true, premium: true },
      { name: 'Daily Attendance Register', basic: true, standard: true, premium: true },
      { name: 'Class Timetable Builder', basic: true, standard: true, premium: true },
      { name: 'Internal Staff Announcements', basic: true, standard: true, premium: true },
      { name: 'Data Export (CSV)', basic: true, standard: true, premium: true },
    ],
  },
  {
    category: 'Standard Features',
    items: [
      { name: 'Parent & Student Portals', basic: false, standard: true, premium: true },
      { name: 'Accounts Staff Portal', basic: false, standard: true, premium: true },
      { name: 'Homework & Assignments Module', basic: false, standard: true, premium: true },
      { name: 'Live Gradebook & Report Cards', basic: false, standard: true, premium: true },
      { name: 'Online Fee Payment Gateway', basic: false, standard: true, premium: true },
      { name: 'Parent Communications Hub', basic: false, standard: true, premium: true },
      { name: 'Library & Resource Management', basic: false, standard: true, premium: true },
      { name: 'Staff Leave & Substitutions', basic: false, standard: true, premium: true },
    ],
  },
  {
    category: 'Premium Features',
    items: [
      { name: 'Custom Permissions per Staff', basic: false, standard: false, premium: true },
      { name: 'Multi-Branch Switching', basic: false, standard: false, premium: true },
      { name: 'AI Lesson Plan Generator', basic: false, standard: false, premium: true },
      { name: 'AI Quiz & Exam Builder', basic: false, standard: false, premium: true },
      { name: 'AI Report Card Remarks', basic: false, standard: false, premium: true },
      { name: '24/7 AI Parent Chatbot', basic: false, standard: false, premium: true },
      { name: 'Bus & Transport Tracking', basic: false, standard: false, premium: true },
      { name: 'White-Label Branding', basic: false, standard: false, premium: true },
    ],
  },
]

function Cell({ val }) {
  return val ? (
    <Check size={18} className="check-mark" style={{ margin: '0 auto' }} />
  ) : (
    <X size={18} className="cross-mark" style={{ margin: '0 auto' }} />
  )
}

export default function Compare() {
  return (
    <main>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <span className="badge"><GraduationCap size={14} /> Feature Comparison</span>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>
          Compare the <span className="gradient-text">plans side by side</span>
        </h1>
        <p className="hero-desc">
          Every plan includes everything before it. Upgrade whenever your school is ready.
        </p>
      </section>

      <section className="compare-section">
        <div className="data-table-wrap" style={{ boxShadow: 'var(--shadow-lg)' }}>
          <div className="table-header">
            <h3>Full Feature Matrix</h3>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/demo/basic" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>Basic Demo</Link>
              <Link to="/demo/standard" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>Standard Demo</Link>
              <Link to="/demo/premium" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Premium Demo</Link>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: '36%' }}>Feature</th>
                  <th className="plan-col-basic">
                    <span className="plan-name-cell" style={{ color: '#4ade80' }}>Basic</span>
                    <span className="plan-price-cell" style={{ color: '#4ade80' }}>₹25k<span className="plan-price-suffix"> /yr</span></span>
                  </th>
                  <th className="plan-col-standard" style={{ background: 'rgba(59,130,246,0.08)' }}>
                    <span className="plan-name-cell" style={{ color: '#60a5fa' }}>Standard</span>
                    <span className="plan-price-cell" style={{ color: '#60a5fa' }}>₹50k<span className="plan-price-suffix"> /yr</span></span>
                  </th>
                  <th className="plan-col-premium">
                    <span className="plan-name-cell" style={{ color: '#fbbf24' }}>Premium</span>
                    <span className="plan-price-cell" style={{ color: '#fbbf24' }}>₹96k<span className="plan-price-suffix"> /yr</span></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((group) => (
                  <>
                    <tr>
                      <td colSpan="4" style={{
                        background: 'var(--bg-elevated)',
                        fontWeight: 700,
                        fontFamily: 'var(--font-heading)',
                        fontSize: 13,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--text-secondary)',
                      }}>
                        {group.category}
                      </td>
                    </tr>
                    {group.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td style={{ textAlign: 'center' }}><Cell val={item.basic} /></td>
                        <td style={{ textAlign: 'center' }}><Cell val={item.standard} /></td>
                        <td style={{ textAlign: 'center' }}><Cell val={item.premium} /></td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: 16 }}>
            Explore Live Demos
          </Link>
          <Link to="/login" className="btn btn-secondary" style={{ padding: '14px 32px', fontSize: 16 }}>
            <LogIn size={16} /> Continue as Demo
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <p>EduSuite Pro • Prototype Demo</p>
          <p style={{ marginTop: 8 }}>© 2026 EduSuite Pro</p>
        </div>
      </footer>
    </main>
  )
}
