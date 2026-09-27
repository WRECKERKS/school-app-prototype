import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, GraduationCap, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PLANS, rolesForPlan } from '../lib/registry'

const FEATURES = {
  basic: ['Overview dashboard', 'Attendance register', 'Class timetable', 'Staff directory', 'Announcements'],
  standard: ['Everything in Basic', 'Fee management', 'Homework + grading', 'Tests & results', 'Notes library', 'Parent alerts'],
  premium: ['Everything in Standard', 'Advanced analytics', 'Question bank + AI builder', 'QR/GPS attendance', 'Doubts + activity log'],
}

export default function StartDemo() {
  const navigate = useNavigate()
  const { startDemo, loginAsDemo } = useAuth()

  const pick = (planId) => {
    startDemo(planId)
    navigate('/login?plan=' + planId)
  }

  const jumpIn = (roleId, planId) => {
    loginAsDemo(roleId, planId)
    navigate('/app/home')
  }

  return (
    <main className="start-page">
      <div className="start-head">
        <span className="start-app-icon">
          <GraduationCap size={22} />
        </span>
        <h1>Pick a plan to explore</h1>
        <p>Everything opens fresh on the plan you choose.</p>
      </div>

      <div className="start-grid">
        {Object.values(PLANS).map((plan) => (
          <div key={plan.id} className={`start-card ${plan.id === 'standard' ? 'featured' : ''}`}>
            <div className="start-card-body">
              <div className="start-card-title">
                <h3>{plan.name}</h3>
                {plan.id === 'standard' && <span className="tier-badge badge">Popular</span>}
              </div>
              <div className="price">
                {plan.price}
                <span>/year</span>
              </div>
              <p className="start-card-tag">{plan.tagline}</p>

              <ul className="plan-feats">
                {FEATURES[plan.id].map((f) => (
                  <li key={f}>
                    <span className="f-ico">
                      <Check size={13} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => pick(plan.id)}
              >
                Start {plan.name} demo <ArrowRight size={15} />
              </button>

              <div className="qd-label">or jump straight in</div>
              <div className="qd-chips">
                {rolesForPlan(plan.id).map((r) => {
                  const Icon = r.icon
                  return (
                    <button
                      key={r.id}
                      type="button"
                      className="qd-chip"
                      onClick={() => jumpIn(r.id, plan.id)}
                      title={`Open the app as ${r.name}`}
                    >
                      {Icon ? <Icon size={13} /> : null} {r.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="start-foot">
        <Link to="/" className="btn btn-ghost">
          <GraduationCap size={16} /> Back to homepage
        </Link>
      </div>
    </main>
  )
}
