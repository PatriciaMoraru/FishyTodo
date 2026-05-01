import { createContext, useContext, useState, useEffect } from 'react'

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

  function toggleTheme() {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  function toggleFocusMode() {
    setFocusMode(f => !f)
  }

  function toggleSound() {
    setSound(s => !s)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, focusMode, toggleFocusMode, sound, toggleSound }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
