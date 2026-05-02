import { Link } from 'react-router-dom'
import { Sparkles, Sun, Cloud, CloudDrizzle, CloudLightning } from 'lucide-react'
import { useMood, MOODS } from '../context/MoodContext'
import './MoodReefView.css'

const MOOD_ICONS = [Sparkles, Sun, Cloud, CloudDrizzle, CloudLightning]

function getDayName(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
}

export default function MoodReefView() {
  const { todayKey, getMood, setMood } = useMood()
  const todayMoodIndex = getMood(todayKey)
  const alreadyLogged = todayMoodIndex !== null

  return (
    <div className="mood-reef screen">
      <div className="mood-reef-inner">

        <header className="mood-reef-header">
          <h1 className="mood-reef-title">mood reef</h1>
          <Link to="/tank" className="mood-reef-back" aria-label="Back to tank">
            ← back to tank
          </Link>
        </header>

        {/* daily check-in card */}
        <section className="checkin-card" aria-label="Daily mood check-in">
          <p className="checkin-date">
            {getDayName(todayKey)} · how&apos;s the water today?
          </p>
          <h2 className="checkin-prompt">
            {alreadyLogged ? 'change today\'s mood?' : 'tell your fish how you feel'}
          </h2>

          <div className="checkin-options" role="group" aria-label="Mood options">
            {MOODS.map((mood, i) => {
              const Icon = MOOD_ICONS[i]
              const isSelected = todayMoodIndex === i
              return (
                <button
                  key={mood.key}
                  className={`mood-btn ${isSelected ? 'mood-btn--selected' : ''}`}
                  style={{ '--mood-color': mood.color }}
                  onClick={() => setMood(todayKey, i)}
                  aria-label={mood.label}
                  aria-pressed={isSelected}
                >
                  <Icon size={28} strokeWidth={1.6} className="mood-btn-icon" />
                  <span className="mood-btn-label">{mood.label}</span>
                </button>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}
