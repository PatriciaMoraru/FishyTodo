import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'
import './TankBar.css'

export default function TankBar() {
    const { addTask } = useTaskContext()
    const [input, setInput] = useState('')
    const [priority, setPriority] = useState('medium')

    function handleRelease() {
        if (input.trim() === '') return
        addTask(input.trim(), priority)
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
            <div className={`tank-priority-wrapper priority-${priority}`}>
                <select
                    className={`tank-priority priority-${priority}`}
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button className="tank-btn" onClick={handleRelease}>
                Release fish
            </button>
        </div>
    )
}