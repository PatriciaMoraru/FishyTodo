import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TankView from './components/TankView'
import ListView from './components/ListView'
import SettingsView from './components/SettingsView'
import { TaskProvider } from './context/TaskContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import './App.css'
import './style.css'

function HomeView() {
  const { listView } = useTheme()
  return listView ? <ListView /> : <TankView />
}

export default function App() {
  return (
    <ThemeProvider>
    <TaskProvider>
      <BrowserRouter basename={import.meta.env.PROD ? '/FishyTodo' : '/'}>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TaskProvider>
    </ThemeProvider>
  )
}