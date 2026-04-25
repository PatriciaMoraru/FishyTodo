import './SettingsView.css'

export default function SettingsView() {
  return (
    <div className="settings-view">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-sub">Options and controls will live here.</p>
      <div className="settings-grid">
        <div className="settings-card">Theme</div>
        <div className="settings-card">Sound</div>
        <div className="settings-card">List view</div>
        <div className="settings-card">Focus mode</div>
      </div>
    </div>
  )
}