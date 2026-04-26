import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'

export function NewTodoForm() {
    const { addTask } = useTaskContext()
    const [newItem, setNewItem] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (newItem === "") return

        addTask(newItem)

        setNewItem('')
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
            <button className="btn">Add</button>
        </form>
    )
}