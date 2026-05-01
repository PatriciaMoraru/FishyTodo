import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './SettingsView.css'

function Toggle({ on, onToggle, label }) {
  return (
    <button
      className={`toggle ${on ? 'on' : ''}`}
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      aria-label={label}
    >
      <span className="knob" />
    </button>
  )
}

export default function SettingsView() {
  const { theme, toggleTheme, focusMode, toggleFocusMode, sound, toggleSound } = useTheme()

  return (
    <div className="settings-view screen">
      <div className="settings-card">
        <div className="settings-header">
          <h1 className="settings-title">settings</h1>
          <Link to="/" className="settings-back">← back to tank</Link>
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="row-name">dark mode</span>
            <span className="row-desc">cozy night vibes</span>
          </div>
          <Toggle on={theme === 'dark'} onToggle={toggleTheme} label="Toggle dark mode" />
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="row-name">sound</span>
            <span className="row-desc">splashes &amp; bubble pops</span>
          </div>
          <Toggle on={sound} onToggle={toggleSound} label="Toggle sound" />
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="row-name">focus mode</span>
            <span className="row-desc">one fish at a time</span>
          </div>
          <Toggle on={focusMode} onToggle={toggleFocusMode} label="Toggle focus mode" />
        </div>
      </div>
    </div>
  )
}
