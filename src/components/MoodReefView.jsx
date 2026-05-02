import { useState } from 'react'
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
  const { todayKey, getMood, setMood, getCurrentWeek } = useMood()
  const [activeDay, setActiveDay] = useState(todayKey)

  const activeMoodIndex = getMood(activeDay)
  const alreadyLogged   = activeMoodIndex !== null
  const isToday         = activeDay === todayKey
  const week            = getCurrentWeek()

  function dateLabel() {
    if (isToday) return `today · how's the water?`
    return `${getDayName(activeDay)} · updating past mood`
  }

  function promptLabel() {
    if (alreadyLogged) return isToday ? "change today's mood?" : 'change this day\'s mood?'
    return isToday ? 'tell your fish how you feel' : 'log a mood for this day'
  }

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
          <p className="checkin-date">{dateLabel()}</p>
          <h2 className="checkin-prompt">{promptLabel()}</h2>

          <div className="checkin-options" role="group" aria-label="Mood options">
            {MOODS.map((mood, i) => {
              const Icon = MOOD_ICONS[i]
              const isSelected = activeMoodIndex === i
              return (
                <button
                  key={mood.key}
                  className={`mood-btn ${isSelected ? 'mood-btn--selected' : ''}`}
                  style={{ '--mood-color': mood.color }}
                  onClick={() => setMood(activeDay, i)}
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

        {/* weekly reef strip */}
        <section className="week-strip" aria-label="This week's moods">
          <div className="week-strip-header">
            <h2 className="week-strip-title">this week</h2>
            <span className="week-strip-hint">tap any day to revisit</span>
          </div>

          <div className="week-days">
            {week.map(({ dateKey, label, moodIndex }) => {
              const isActive  = dateKey === activeDay
              const isWeekToday = dateKey === todayKey
              const mood      = moodIndex !== null ? MOODS[moodIndex] : null
              const Icon      = mood ? MOOD_ICONS[moodIndex] : null

              return (
                <button
                  key={dateKey}
                  className={`day-btn ${isActive ? 'day-btn--active' : ''} ${isWeekToday ? 'day-btn--today' : ''}`}
                  style={mood ? { '--mood-color': mood.color } : {}}
                  onClick={() => setActiveDay(dateKey)}
                  aria-label={`${label}${mood ? `, mood: ${mood.label}` : ', no mood logged'}`}
                  aria-pressed={isActive}
                >
                  <div className="day-marker">
                    {Icon
                      ? <Icon size={20} strokeWidth={1.6} className="day-marker-icon" />
                      : <span className="day-marker-empty">?</span>
                    }
                  </div>
                  <span className="day-label">{label}</span>
                  {isWeekToday && <span className="day-today-dot" aria-hidden="true" />}
                </button>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}
