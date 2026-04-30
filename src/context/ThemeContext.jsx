import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') ?? 'light'
  )
  const [focusMode, setFocusMode] = useState(() =>
    localStorage.getItem('focusMode') === 'true'
  )

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('focusMode', focusMode)
  }, [focusMode])

  function toggleTheme() {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  function toggleFocusMode() {
    setFocusMode(f => !f)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, focusMode, toggleFocusMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
