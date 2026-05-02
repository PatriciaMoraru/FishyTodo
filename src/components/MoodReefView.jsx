import { Link } from 'react-router-dom'
import './MoodReefView.css'

export default function MoodReefView() {
  return (
    <div className="mood-reef screen">
      <p>mood reef — coming soon</p>
      <Link to="/tank" className="mood-reef-back">← back to tank</Link>
    </div>
  )
}
