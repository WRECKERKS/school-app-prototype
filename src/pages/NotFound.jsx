import { Link } from 'react-router-dom'
import { ArrowLeft, Star, GraduationCap } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="notfound">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist or has moved. Let's get you back on track.</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary"><ArrowLeft size={16} /> Back to home</Link>
        <Link to="/start" className="btn btn-soft"><Star size={16} /> Start a demo</Link>
        <Link to="/app" className="btn btn-ghost"><GraduationCap size={16} /> Open the app</Link>
      </div>
    </main>
  )
}