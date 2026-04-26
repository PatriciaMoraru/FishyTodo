import { TodoItem } from './TodoItem'
import { useTaskContext } from '../context/TaskContext'

export function TodoList() {
    const { tasks, completeTask, removeTask } = useTaskContext()
    const activeTasks = tasks.filter(task => !task.completed)

    return (
        <ul className="list">
        {activeTasks.length === 0 && "No Todos"}
        {activeTasks.map(task => (
            <TodoItem
                key={task.id}
                {...task}
                completeTask={completeTask}
                removeTask={removeTask}
            />
        ))}
      </ul>
    )
}