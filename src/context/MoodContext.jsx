import { createContext, useContext, useState, useEffect } from 'react'

const MoodContext = createContext()

export const MOODS = [
  { key: 'great', label: 'great', emoji: '🌞', color: '#e8a64a' },
  { key: 'good',  label: 'good',  emoji: '🐠', color: '#7fc4a8' },
  { key: 'okay',  label: 'okay',  emoji: '🌊', color: '#a890c4' },
  { key: 'meh',   label: 'meh',   emoji: '☁️', color: '#b89878' },
  { key: 'rough', label: 'rough', emoji: '🌧️', color: '#7d8a98' },
]

const DAY_LABELS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getMondayOf(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

export function MoodProvider({ children }) {
  const [moods, setMoods] = useState(() => {
    const stored = localStorage.getItem('MOODS')
    return stored ? JSON.parse(stored) : {}
  })

  useEffect(() => {
    localStorage.setItem('MOODS', JSON.stringify(moods))
  }, [moods])

  function setMood(dateKey, moodIndex) {
    setMoods(current => ({ ...current, [dateKey]: moodIndex }))
  }

  function getMood(dateKey) {
    const val = moods[dateKey]
    return val !== undefined ? val : null
  }

  function getCurrentWeek() {
    const monday = getMondayOf(new Date())
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday)
      day.setDate(monday.getDate() + i)
      const dateKey = toDateKey(day)
      return {
        dateKey,
        label: DAY_LABELS[i],
        moodIndex: getMood(dateKey),
      }
    })
  }

  const todayKey = toDateKey(new Date())

  return (
    <MoodContext.Provider value={{ moods, setMood, getMood, getCurrentWeek, todayKey }}>
      {children}
    </MoodContext.Provider>
  )
}

export function useMood() {
  return useContext(MoodContext)
}
