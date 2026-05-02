import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/tank" className="navbar-title">FishyTodo</NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/tank" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
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