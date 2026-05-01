import { createContext, useContext, useState, useEffect } from 'react'
import { PALETTES } from '../utils/palettes'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') ?? 'light'
  )
  const [focusMode, setFocusMode] = useState(() =>
    localStorage.getItem('focusMode') === 'true'
  )
  const [sound, setSound] = useState(() =>
    localStorage.getItem('sound') !== 'false'
  )
  const [listView, setListView] = useState(() =>
    localStorage.getItem('listView') === 'true'
  )
  const [palette, setPalette] = useState(() =>
    localStorage.getItem('palette') ?? 'sunset'
  )

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('focusMode', focusMode)
  }, [focusMode])

  useEffect(() => {
    localStorage.setItem('sound', sound)
  }, [sound])

  useEffect(() => {
    localStorage.setItem('listView', listView)
  }, [listView])

  useEffect(() => {
    const p = PALETTES[palette] ?? PALETTES.sunset
    document.body.style.setProperty('--accent', p.accent)
    document.body.style.setProperty('--sec', p.sec)
    document.body.style.setProperty('--tert', p.tert)
    localStorage.setItem('palette', palette)
  }, [palette])

  function toggleTheme() {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  function toggleFocusMode() {
    setFocusMode(f => !f)
  }

  function toggleSound() {
    setSound(s => !s)
  }

  function toggleListView() {
    setListView(l => !l)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, focusMode, toggleFocusMode, sound, toggleSound, listView, toggleListView, palette, setPalette }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
