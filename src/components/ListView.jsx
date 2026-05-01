import { useTaskContext } from '../context/TaskContext'
import { getFishImage } from '../utils/fishImages'
import './ListView.css'

const PRIORITY_ORDER = ['whale', 'big', 'medium', 'small', 'tiny']
const PRIORITY_LABELS = {
  whale: 'Whale',
  big: 'Big',
  medium: 'Medium',
  small: 'Small',
  tiny: 'Tiny',
}

export default function ListView() {
  const { tasks, completeTask, removeTask } = useTaskContext()
  const active = [...tasks.filter(t => !t.completed)].sort(
    (a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)
  )

  if (active.length === 0) {
    return (
      <div className="list-view">
        <p className="list-empty">no tasks yet — release some fish! 🐠</p>
      </div>
    )
  }

  return (
    <div className="list-view screen">
      <ul className="task-list" aria-label="Task list">
        {active.map(task => (
          <li key={task.id} className="task-item">
            <img
              src={getFishImage(task.priority)}
              alt={task.priority}
              className="task-fish-img"
            />
            <span className="task-title">{task.title}</span>
            <span className={`task-badge priority-${task.priority}`}>
              {PRIORITY_LABELS[task.priority]}
            </span>
            <div className="task-actions">
              <button
                className="task-btn done"
                onClick={() => completeTask(task.id)}
                aria-label={`Mark "${task.title}" as done`}
              >
                ✓ done
              </button>
              <button
                className="task-btn remove"
                onClick={() => removeTask(task.id)}
                aria-label={`Remove "${task.title}"`}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
