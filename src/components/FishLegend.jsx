import { useState } from 'react'
import { fishByPriority, speedByPriority } from '../utils/fishImages'
import './FishLegend.css'

const LEGEND = [
  { value: 'tiny',   label: 'Tiny',   time: '5 min',   mood: 'chill'    },
  { value: 'small',  label: 'Small',  time: '15 min',  mood: 'easy'     },
  { value: 'medium', label: 'Medium', time: '30 min',  mood: 'steady'   },
  { value: 'big',    label: 'Big',    time: '1 hour',  mood: 'urgent'   },
  { value: 'whale',  label: 'Whale',  time: 'all day', mood: 'critical' },
]

const MAX_SPEED = Math.max(...Object.values(speedByPriority))

export default function FishLegend() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fish-legend">
      {open && (
        <div className="legend-card">
          <div className="legend-title">Fish guide</div>
          <div className="legend-subtitle">Swim speed = urgency</div>
          {LEGEND.map(item => {
            const speedPct = (speedByPriority[item.value] / MAX_SPEED) * 100
            return (
              <div key={item.value} className="legend-row">
                <img src={fishByPriority[item.value]} alt={item.label} className="legend-fish" />
                <div className="legend-info">
                  <div className="legend-top">
                    <span className="legend-name">{item.label}</span>
                    <span className="legend-mood">{item.mood}</span>
                    <span className="legend-time">{item.time}</span>
                  </div>
                  <div className="speed-track">
                    <div className="speed-fill" style={{ width: `${speedPct}%` }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <button
        className="legend-btn"
        onClick={() => setOpen(o => !o)}
        title="Fish guide"
      >
        ?
      </button>
    </div>
  )
}
