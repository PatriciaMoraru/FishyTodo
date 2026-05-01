import { Link } from 'react-router-dom'
import { Fish, List } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { PALETTES, PALETTE_META } from '../utils/palettes'
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
  const { theme, toggleTheme, focusMode, toggleFocusMode, sound, toggleSound, listView, toggleListView, palette, setPalette } = useTheme()

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

        <div className="settings-section">
          <span className="row-name">tank colour</span>
          <div className="swatch-group" role="group" aria-label="Tank colour palette">
            {PALETTE_META.map(({ key, label }) => {
              const p = PALETTES[key]
              return (
                <div key={key} className="swatch-item">
                  <button
                    className={`swatch ${palette === key ? 'active' : ''}`}
                    onClick={() => setPalette(key)}
                    aria-label={label}
                    aria-pressed={palette === key}
                  style={{
                    background: `conic-gradient(from -45deg, ${p.accent} 0deg 120deg, ${p.sec} 120deg 240deg, ${p.tert} 240deg 360deg)`,
                  }}
                  />
                  <span className="swatch-label">{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="settings-section">
          <span className="row-name">view as</span>
          <div className="view-as-btns" role="group" aria-label="View mode">
            <button
              className={`view-btn ${!listView ? 'active' : ''}`}
              onClick={() => listView && toggleListView()}
              aria-pressed={!listView}
            >
              <Fish size={16} strokeWidth={1.8} /> tank
            </button>
            <button
              className={`view-btn ${listView ? 'active' : ''}`}
              onClick={() => !listView && toggleListView()}
              aria-pressed={listView}
            >
              <List size={16} strokeWidth={1.8} /> list
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
