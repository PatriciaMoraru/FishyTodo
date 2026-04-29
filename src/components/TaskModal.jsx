import './TaskModal.css'

const PRIORITY_LABEL = {
  low:    { text: 'Low priority',    className: 'badge-low'    },
  medium: { text: 'Medium priority', className: 'badge-medium' },
  high:   { text: 'High priority',   className: 'badge-high'   },
}

export default function TaskModal({ task, fishImage, onComplete, onRelease }) {
  const badge = PRIORITY_LABEL[task.priority] ?? PRIORITY_LABEL.medium

  return (
    <>
      <div className="scrim" onClick={onRelease} />
      <div className="action-card">
        <button className="ac-close" onClick={onRelease}>✕</button>

        <div className="ac-fish">
          <img src={fishImage} alt={task.title} />
          <div>
            <div className="ac-task">{task.title}</div>
            <div className="ac-meta">
              <span className={`priority-badge ${badge.className}`}>{badge.text}</span>
            </div>
          </div>
        </div>

        <div className="ac-actions">
          <button className="ac-btn primary" onClick={onComplete}>
            <span className="em">✓</span>
            <span>
              Mark as done
              <span className="sub">Remove this fish from the tank</span>
            </span>
          </button>
          <button className="ac-btn lav" onClick={onRelease}>
            <span className="em">🐟</span>
            <span>
              Release back
              <span className="sub">Let it keep swimming</span>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
