import { useEffect, useRef } from 'react'
import './Fish.css'

import fish1 from '../assets/fish1.png'
import fish2 from '../assets/fish2.png'
import fish3 from '../assets/fish3.png'
import fish4 from '../assets/fish4.png'
import fish5 from '../assets/fish5.png'
import fish6 from '../assets/fish6.png'
import fish7 from '../assets/fish7.png'

const FISH_IMAGES = [fish1, fish2, fish3, fish4, fish5, fish6, fish7]
const FISH_WIDTH = 120
const FISH_HEIGHT = 80
const SPEED = 2

function getFishImage(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i)) % FISH_IMAGES.length
  }
  return FISH_IMAGES[hash]
}

export default function Fish({ task, paused, onClick }) {
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

  return (
    <img
      ref={fishRef}
      className="fish"
      src={getFishImage(task.id)}
      alt={task.title}
      onClick={onClick}
    />
  )
}
