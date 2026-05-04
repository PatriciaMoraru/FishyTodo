import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'
import { getFishImage } from '../utils/fishImages'
import TankBar from './TankBar'
import './ListView.css'

const PRIORITY_ORDER = ['whale', 'big', 'medium', 'small', 'tiny']
const PRIORITY_LABELS = {
  whale: 'Whale',
  big: 'Big',
  medium: 'Medium',
  small: 'Small',
  tiny: 'Tiny',
}
const FILTERS = ['all', ...PRIORITY_ORDER]

export default function ListView() {
  const { tasks, completeTask, removeTask } = useTaskContext()
  const [filter, setFilter] = useState('all')

  const active = [...tasks.filter(t => !t.completed)].sort(
    (a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)
  )

  const visible = filter === 'all' ? active : active.filter(t => t.priority === filter)

  return (
    <div className="list-view screen">
      <div className="list-inner">

        <TankBar />

        <div className="filter-bar" role="group" aria-label="Filter by priority">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'filter-btn--active' : ''} ${f !== 'all' ? `priority-${f}` : ''}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'All' : PRIORITY_LABELS[f]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="list-empty">
            {active.length === 0
              ? 'no tasks yet — release some fish!'
              : `no ${PRIORITY_LABELS[filter].toLowerCase()} tasks`}
          </p>
        ) : (
          <ul className="task-list" aria-label="Task list">
            {visible.map(task => (
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
        )}

      </div>
    </div>
  )
}
