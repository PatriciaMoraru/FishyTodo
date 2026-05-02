import { useState } from 'react'
import { Fish as FishIcon } from 'lucide-react'
import { useTaskContext } from '../context/TaskContext'
import { useTheme } from '../context/ThemeContext'
import { useSounds } from '../utils/useSounds'
import TankBar from './TankBar'
import Fish from './Fish'
import { getFishImage } from '../utils/fishImages'
import TaskModal from './TaskModal'
import FishLegend from './FishLegend'
import './TankView.css'

const PRIORITY_ORDER = ['whale', 'big', 'medium', 'small', 'tiny']
const PRIORITY_LABELS = { whale: 'Whale', big: 'Big', medium: 'Medium', small: 'Small', tiny: 'Tiny' }

export default function TankView() {
  const { tasks, completeTask } = useTaskContext()
  const { focusMode, toggleFocusMode } = useTheme()
  const { playComplete } = useSounds()
  const activeTasks = tasks.filter(t => !t.completed)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [completingTaskId, setCompletingTaskId] = useState(null)
  const [tankFilter, setTankFilter] = useState('all')

  const selectedTask = tasks.find(t => t.id === selectedTaskId) ?? null

  function handleFishClick(id) {
    setSelectedTaskId(id)
  }

  function handleRelease() {
    setSelectedTaskId(null)
  }

  function handleComplete() {
    const idToComplete = selectedTaskId
    playComplete()
    setCompletingTaskId(idToComplete)
    setSelectedTaskId(null)
    setTimeout(() => {
      completeTask(idToComplete)
      setCompletingTaskId(null)
    }, 1600)
  }

  return (
    <div className="tank">
      <TankBar />
      <FishLegend />
      <button
        className={`icon-btn focus-toggle ${focusMode ? 'active' : ''}`}
        onClick={toggleFocusMode}
        title="Focus mode"
      >
        ◎
      </button>

      {activeTasks.map(task => {
        const filterDimmed = tankFilter !== 'all' && task.priority !== tankFilter
        const focusDimmed  = focusMode && selectedTaskId !== null && task.id !== selectedTaskId
        return (
          <Fish
            key={task.id}
            task={task}
            paused={task.id === selectedTaskId || (focusMode && selectedTaskId !== null && task.id !== selectedTaskId)}
            completing={task.id === completingTaskId}
            dimmed={focusDimmed || filterDimmed}
            onClick={() => handleFishClick(task.id)}
          />
        )
      })}

      <div className="tank-filter" role="group" aria-label="Filter fish by priority">
        {['all', ...PRIORITY_ORDER].map(f => (
          <button
            key={f}
            className={`tank-filter-btn ${tankFilter === f ? 'tank-filter-btn--active' : ''}`}
            onClick={() => setTankFilter(f)}
            aria-pressed={tankFilter === f}
          >
            {f === 'all' ? 'all' : PRIORITY_LABELS[f].toLowerCase()}
          </button>
        ))}
      </div>

      <div className="fish-count">
        <FishIcon size={15} strokeWidth={1.8} /> {activeTasks.length} fish in tank
      </div>
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          fishImage={getFishImage(selectedTask.priority)}
          onComplete={handleComplete}
          onRelease={handleRelease}
        />
      )}
    </div>
  )
}