import { useEffect, useRef } from 'react'
import './Fish.css'
import { getFishImage } from '../utils/fishImages'

const FISH_WIDTH = 120
const FISH_HEIGHT = 80
const SPEED = 2

export default function Fish({ task, paused, completing, onClick }) {
  const fishRef = useRef(null)
  const pos = useRef(null)
  const vel = useRef(null)
  const rafId = useRef(null)
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    pos.current = {
      x: Math.random() * (window.innerWidth - FISH_WIDTH),
      y: Math.random() * (window.innerHeight - FISH_HEIGHT),
    }
    vel.current = {
      dx: (Math.random() < 0.5 ? 1 : -1) * SPEED,
      dy: (Math.random() < 0.5 ? 1 : -1) * SPEED,
    }

    function animate() {
      if (!pausedRef.current && fishRef.current) {
        pos.current.x += vel.current.dx
        pos.current.y += vel.current.dy

        const maxX = window.innerWidth - FISH_WIDTH
        const maxY = window.innerHeight - FISH_HEIGHT

        if (pos.current.x <= 0)    { pos.current.x = 0;    vel.current.dx =  Math.abs(vel.current.dx) }
        if (pos.current.x >= maxX) { pos.current.x = maxX; vel.current.dx = -Math.abs(vel.current.dx) }
        if (pos.current.y <= 0)    { pos.current.y = 0;    vel.current.dy =  Math.abs(vel.current.dy) }
        if (pos.current.y >= maxY) { pos.current.y = maxY; vel.current.dy = -Math.abs(vel.current.dy) }

        fishRef.current.style.left      = pos.current.x + 'px'
        fishRef.current.style.top       = pos.current.y + 'px'
        fishRef.current.style.transform = `scaleX(${vel.current.dx > 0 ? 1 : -1})`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  const classes = [
    'fish-roam',
    paused     ? 'selected'   : '',
    completing ? 'completing' : '',
  ].filter(Boolean).join(' ')

  return (
    <div ref={fishRef} className={classes} onClick={onClick}>
      <img src={getFishImage(task.id)} alt={task.title} style={{ width: '100%', display: 'block' }} />
      <span className="fish-label">{task.title}</span>
    </div>
  )
}
