import { Link, useNavigate } from 'react-router-dom'
import { Star, ArrowRight, GraduationCap, ListChecks } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PLANS } from '../lib/registry'
import { img, StockImg } from '../components/ui'

const FEATURES = {
  basic: ['Overview dashboard', 'Attendance register', 'Class timetable', 'Staff directory', 'Announcements'],
  standard: ['Everything in Basic', 'Fee management', 'Homework + grading', 'Tests & results', 'Notes library', 'Parent alerts'],
  premium: ['Everything in Standard', 'Advanced analytics', 'Question bank + AI builder', 'QR/GPS attendance', 'Doubts + activity log'],
}

export default function StartDemo() {
  const navigate = useNavigate()
  const { startDemo } = useAuth()

  const pick = (planId) => {
    startDemo(planId)
    navigate('/login?plan=' + planId)
  }

  return (
    <main className="start-page">
      <div className="start-head">
        <span className="section-kicker">Live demo</span>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 12 }}>
          Start a guided demo for your clients
        </h1>
        <p style={{ fontSize: 15.5, color: 'var(--ink-soft)' }}>
          Pick a plan tier — everything opens fresh: the matching login screen, then that plan&apos;s dashboard.
        </p>
      </div>

      <div className="demo-steps">
        <span className="step-pill"><b>1.</b> Choose a plan</span>
        <span className="step-pill"><b>2.</b> Pick a role</span>
        <span className="step-pill"><b>3.</b> Explore the modules</span>
      </div>

      <div className="start-grid">
        {Object.values(PLANS).map((plan) => (
          <div key={plan.id} className={`start-card ${plan.id === 'standard' ? 'featured' : ''}`}>
            <StockImg src={img(plan.id)} alt={`${plan.name} plan`} className="start-card-image" />
            <div className="start-card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h3>{plan.name} Plan</h3>
                {plan.id === 'standard' && (
                  <span className="badge tier-badge standard">Most popular</span>
                )}
              </div>
              <div className="price">
                {plan.price}/year{plan.perYear ? ' • rolling' : ''}
              </div>
              <p>{plan.tagline}</p>
              <ul className="plan-feats">
                {FEATURES[plan.id].map((f) => (
                  <li key={f}><span className="f-ico" style={{ background: plan.soft, color: plan.color }}><ListChecks size={13} /></span>{f}</li>
                ))}
              </ul>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => pick(plan.id)}>
                <Star size={16} /> Start {plan.name} demo
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link to="/" className="btn btn-ghost">
          <GraduationCap size={16} /> Back to homepage
        </Link>
      </div>
    </main>
  )
}