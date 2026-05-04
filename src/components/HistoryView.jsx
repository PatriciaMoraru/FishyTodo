import { Link } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'
import './HistoryView.css'

export default function HistoryView() {
    const { tasks } = useTaskContext()
    const completedTasks = tasks.filter(task => task.completed === true)

    return (
        <div className="list-view screen">
            <div className="list-inner">
                <div className="history-header">
                <h2 className="history-title">Completed Tasks</h2>
                <Link to="/tank" className="history-back">← back to tank</Link>
                </div>
                <ul className="history-list">
                    {completedTasks.map(task => (
                        <li key={task.id} className="history-item">
                            <span className="history-task-title">{task.title}</span>
                            <span className="history-date">{new Date(task.completedAt).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}