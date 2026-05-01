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

export default function TankView() {
  const { tasks, completeTask } = useTaskContext()
  const { focusMode, toggleFocusMode } = useTheme()
  const { playComplete } = useSounds()
  const activeTasks = tasks.filter(t => !t.completed)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [completingTaskId, setCompletingTaskId] = useState(null)

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

      {activeTasks.map(task => (
          <Fish
            key={task.id}
            task={task}
            paused={task.id === selectedTaskId || (focusMode && selectedTaskId !== null && task.id !== selectedTaskId)}
            completing={task.id === completingTaskId}
            dimmed={focusMode && selectedTaskId !== null && task.id !== selectedTaskId}
            onClick={() => handleFishClick(task.id)}
          />
      ))}
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