export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
    return (
        <li>
              <label>
                <input 
                  type="checkbox" 
                  checked={completed} 
                  onChange={event => toggleTodo(id, event.target.checled)}
                />
                {title}
              </label>
              <button 
                onClick={() => deleteTodo(id)} 
                className="btn btn-danger"
                >
                    Delete
                </button>
            </li>
    )
}