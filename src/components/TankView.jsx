import './TankView.css'
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'

export default function TankView() {
  return (
    <div className="tank-view">
      <NewTodoForm />
      <h1 className="header">Todo List</h1>
      <TodoList />
    </div>
  )
}