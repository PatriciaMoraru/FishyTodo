import { useState, useEffect, useRef } from 'react'
import { fishByPriority } from '../utils/fishImages'
import './PriorityPicker.css'

const OPTIONS = [
  { value: 'low',    label: 'Low',    desc: 'slow swimmer',   emoji: '🐠' },
  { value: 'medium', label: 'Medium', desc: 'regular pace',   emoji: '🐟' },
  { value: 'high',   label: 'High',   desc: 'fast & urgent',  emoji: '⚡' },
]

export default function PriorityPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = OPTIONS.find(o => o.value === value) ?? OPTIONS[1]

  function select(val) {
    onChange(val)
    setOpen(false)
  }

  return (
    <div className="priority-picker" ref={ref}>
      <button
        className={`priority-pill priority-${value}`}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        <img src={fishByPriority[value]} alt={value} className="pill-fish" />
        <span className="pill-label">{current.label}</span>
        <span className="pill-arrow">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className="priority-popover">
          {OPTIONS.map(opt => (
            <div
              key={opt.value}
              className={`priority-opt ${opt.value === value ? 'active' : ''}`}
              onClick={() => select(opt.value)}
            >
              <img src={fishByPriority[opt.value]} alt={opt.label} className="opt-fish" />
              <div className="opt-text">
                <span className="opt-name">{opt.label}</span>
                <span className="opt-desc">{opt.desc}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
