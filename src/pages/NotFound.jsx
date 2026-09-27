import { Link } from 'react-router-dom'
import { ArrowLeft, Star, GraduationCap } from 'lucide-react'
import { SceneLost } from '../components/Scenes'

export default function NotFound() {
  return (
    <main className="notfound">
      <SceneLost className="scene" />
      <p className="notfound-code">404</p>
      <h1>That page is not on the timetable</h1>
      <p className="notfound-body">
        The link may be out of date, or the page moved. Everything the app can do is
        one tap from the home screen.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="btn btn-primary"><ArrowLeft size={16} /> Back to home</Link>
        <Link to="/app/home" className="btn btn-soft"><GraduationCap size={16} /> Open the app</Link>
        <Link to="/start" className="btn btn-ghost"><Star size={16} /> Start a demo</Link>
      </div>
    </main>
  )
}
