import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'

export function NewTodoForm() {
    const { addTask } = useTaskContext()
    const [newItem, setNewItem] = useState('')
    const [priority, setPriority] = useState('medium')

    function handleSubmit(event) {
        event.preventDefault()

        if (newItem === "") return

        addTask(newItem, priority)

        setNewItem('')
        setPriority('medium')
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New Item</label>
                <input
                    value={newItem}
                    onChange={event => setNewItem(event.target.value)}
                    type="text"
                    id="item"
                />
            </div>
            <div className="form-row">
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={event => setPriority(event.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button className="btn">Add</button>
        </form>
    )
}