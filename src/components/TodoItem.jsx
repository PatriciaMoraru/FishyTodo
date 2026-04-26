export function TodoItem({ completed, id, title, priority, completeTask, removeTask }) {
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => completeTask(id)}
                />
                {title}
            </label>
            <span className={`priority-badge priority-${priority}`}>{priority}</span>
            <button
                onClick={() => removeTask(id)}
                className="btn btn-danger"
            >
                Delete
            </button>
        </li>
    )
}
