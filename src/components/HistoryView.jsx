import { useTaskContext } from '../context/TaskContext'
import './HistoryView.css'

export default function HistoryView() {
    const { tasks } = useTaskContext()
    const completedTasks = tasks.filter(task => task.completed === true)

    return (
        <div className="list-view screen">
            <div className="list-inner">
                <h2 className="history-title">Completed Tasks</h2>
                <ul className="history-list">
                    {completedTasks.map(task => (
                        <li key={task.id} className="history-item">
                            <span className="history-task-title">{task.title}</span>
                            <span className="history-date">{new Date(task.completedAt).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}