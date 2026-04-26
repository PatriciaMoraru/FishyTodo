export function NewTodoForm() {
    const [newItem, setNewItem] = useState('')
    
    function handleSubmit(event) {
        event.preventDefault()
    
        setTodos(currentTodos => {
          return [
              ...currentTodos,
              { id: crypto.randomUUID(), title: newItem, completed: false },
          ]
        })
    
        setNewItem('')
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
            <label htmlFor="item">New Item</label>
            <input 
                value={newItem}
                onChange={event => setNewItem(event.target.value)}
                type="text" 
                id="item" 
            />
            </div>
            <button className="btn">Add</button>
        </form>
    )
}