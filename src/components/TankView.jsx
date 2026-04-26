import './TankView.css'
import { useState } from 'react'
import { NewTodoForm } from './NewTodoForm'

export default function TankView() {
  const [todos, setTodos] = useState([])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
          ...currentTodos,
          { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

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

      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList />
    </div>
  )
}