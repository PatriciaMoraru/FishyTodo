import { Link } from 'react-router-dom'
import './MoodReefView.css'

export default function MoodReefView() {
  return (
    <div className="mood-reef screen">
      <div className="mood-reef-inner">

        <header className="mood-reef-header">
          <h1 className="mood-reef-title">mood reef</h1>
          <Link to="/tank" className="mood-reef-back" aria-label="Back to tank">
            ← back to tank
          </Link>
        </header>

      </div>
    </div>
  )
}
