import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-title">FishyTodo</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Tank
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Settings
        </NavLink>
        <button className="icon-btn theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === 'light' ? '☾' : '☀'}
        </button>
      </div>
    </nav>
  )
}