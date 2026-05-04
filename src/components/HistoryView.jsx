import { useTaskContext } from '../context/TaskContext'

export default function HistoryView() {
    const { tasks } = useTaskContext()
    const completedTasks = tasks.filter(task => task.completed === true)

    return (
        <div>
            <h2>Completed Tasks</h2>
            <ul>
                {completedTasks.map(task => (
                    <li key={task.id}>
                        {task.title} — {new Date(task.completedAt).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    )
}