import './TankView.css'
import { useState } from 'react'

export default function TankView() {
  const [todos, setTodos] = useState([])

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <div className="tank-view">
      <div className="tank-placeholder">
        <span className="tank-fish"></span>
        <p className="tank-text">The tasks will swim here.</p>
        <p className="tank-sub">Coming in Issue #2.</p>
      </div>

      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={event => toggleTodo(todo.id, event.target.checled)}
                />
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
            </li>
          )
        }) }
      </ul>
    </div>
  )
}