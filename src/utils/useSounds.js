import { useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export function useSounds() {
  const { sound } = useTheme()
  const ctxRef = useRef(null)

  function getCtx() {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }

  function playSplash() {
    if (!sound) return
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(700, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.18)
    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.22)
  }

  function playPop() {
    if (!sound) return
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(500, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.05)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  }

  function playComplete() {
    if (!sound) return
    const ctx = getCtx()
    const notes = [523, 659, 784]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      const t = ctx.currentTime + i * 0.11
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.2, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18)
      osc.start(t)
      osc.stop(t + 0.2)
    })
  }

  return { playSplash, playPop, playComplete }
}
