import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'
import { useSounds } from '../utils/useSounds'
import PriorityPicker from './PriorityPicker'
import './TankBar.css'

export default function TankBar() {
    const { addTask } = useTaskContext()
    const { playSplash } = useSounds()
    const [input, setInput] = useState('')
    const [priority, setPriority] = useState('medium')

    function handleRelease() {
        if (input.trim() === '') return
        addTask(input.trim(), priority)
        playSplash()
        setInput('')
        setPriority('medium')
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') handleRelease()
    }

    return (
        <div className="tank-bar">
            <input
                className="tank-input"
                type="text"
                placeholder="type your task here"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <PriorityPicker value={priority} onChange={setPriority} />
            <button className="tank-btn" onClick={handleRelease}>
                Release fish
            </button>
        </div>
    )
}