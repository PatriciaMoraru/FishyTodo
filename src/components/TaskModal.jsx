import { Check, X, Fish } from 'lucide-react'
import './TaskModal.css'

const PRIORITY_LABEL = {
  tiny:   { text: 'Tiny · 5 min',    className: 'badge-low'    },
  small:  { text: 'Small · 15 min',  className: 'badge-low'    },
  medium: { text: 'Medium · 30 min', className: 'badge-medium' },
  big:    { text: 'Big · 1 hour',    className: 'badge-high'   },
  whale:  { text: 'Whale · all day', className: 'badge-high'   },
}

export default function TaskModal({ task, fishImage, onComplete, onRelease }) {
  const badge = PRIORITY_LABEL[task.priority] ?? PRIORITY_LABEL.medium

  return (
    <>
      <div className="scrim" onClick={onRelease} />
      <div className="action-card">
        <button className="ac-close" onClick={onRelease} aria-label="Close"><X size={18} strokeWidth={2} /></button>

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
            <span className="em"><Check size={22} strokeWidth={2.5} /></span>
            <span>
              Mark as done
              <span className="sub">Remove this fish from the tank</span>
            </span>
          </button>
          <button className="ac-btn lav" onClick={onRelease}>
            <span className="em"><Fish size={22} strokeWidth={1.8} /></span>
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
