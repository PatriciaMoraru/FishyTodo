import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import TankView from './components/TankView'
import ListView from './components/ListView'
import SettingsView from './components/SettingsView'
import LandingView from './components/LandingView'
import { TaskProvider } from './context/TaskContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import './App.css'
import './style.css'

function HomeView() {
  const { listView } = useTheme()
  return listView ? <ListView /> : <TankView />
}

function AppLayout() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
    <TaskProvider>
      <BrowserRouter basename={import.meta.env.PROD ? '/FishyTodo' : '/'}>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route element={<AppLayout />}>
            <Route path="/tank" element={<HomeView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
    </ThemeProvider>
  )
}