import { TodoItem } from './TodoItem'
import { useTaskContext } from '../context/TaskContext'

export function TodoList() {
    const { tasks, completeTask, removeTask } = useTaskContext()

    return (
        <ul className="list">
        {tasks.length === 0 && "No Todos"}
        {tasks.map(task => (
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