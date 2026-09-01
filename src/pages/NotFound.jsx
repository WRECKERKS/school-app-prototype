import { Link } from 'react-router-dom'
import { Compass, GraduationCap, ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound-card">
        <span className="notfound-icon"><Compass size={34} /></span>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page not found</h2>
        <p className="notfound-desc">
          The page you're looking for doesn't exist or has moved.
          Let's get you back on the right track.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <Link to="/compare" className="btn btn-secondary">
            <GraduationCap size={16} /> View Plans
          </Link>
        </div>
        <div className="notfound-hint">
          <Sparkles size={13} /> EduSuite Pro — Try the live demos from the navigation above.
        </div>
      </div>
    </main>
  )
}
