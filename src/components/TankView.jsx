import { useTaskContext } from '../context/TaskContext'
import TankBar from './TankBar'
import Fish from './Fish'
import './TankView.css'

export default function TankView() {
  const { tasks } = useTaskContext()
  const activeTasks = tasks.filter(t => !t.completed)

  return (
    <div className="tank">
      <TankBar />
      {activeTasks.map(task => (
        <Fish key={task.id} task={task} />
      ))}
    </div>
  )
}