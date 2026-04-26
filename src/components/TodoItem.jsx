export function TodoItem({ completed, id, title, completeTask, removeTask }) {
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
            <button
                onClick={() => removeTask(id)}
                className="btn btn-danger"
            >
                Delete
            </button>
        </li>
    )
}
