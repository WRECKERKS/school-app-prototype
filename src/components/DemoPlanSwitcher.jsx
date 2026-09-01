import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

const tiers = [
  { id: 'basic', label: 'Basic', price: '₹25k', path: '/demo/basic', color: '#22c55e' },
  { id: 'standard', label: 'Standard', price: '₹50k', path: '/demo/standard', color: '#3b82f6' },
  { id: 'premium', label: 'Premium', price: '₹96k', path: '/demo/premium', color: '#f59e0b' },
]

export default function DemoPlanSwitcher({ active }) {
  return (
    <div className="demo-plan-switcher">
      {tiers.map((t) => {
        const isActive = t.id === active
        return (
          <Link
            key={t.id}
            to={t.path}
            className={`demo-plan-tab ${isActive ? 'active' : ''}`}
            style={isActive ? { borderColor: t.color, color: t.color, background: `${t.color}14` } : undefined}
          >
            {isActive && <Check size={13} />}
            <span className="demo-plan-tab-label">{t.label}</span>
            <span className="demo-plan-tab-price">{t.price}/yr</span>
          </Link>
        )
      })}
    </div>
  )
}