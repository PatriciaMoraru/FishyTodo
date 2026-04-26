import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TankView from './components/TankView'
import SettingsView from './components/SettingsView'
import { TaskProvider } from './context/TaskContext'
import './App.css'
import './style.css'

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter basename="/fishytodo">
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<TankView />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TaskProvider>
  )
}