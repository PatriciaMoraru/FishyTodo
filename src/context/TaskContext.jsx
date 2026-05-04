import { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext()

const PRIORITY_MIGRATION = { low: 'small', high: 'big' }

function migrateTasks(tasks) {
  return tasks.map(task => ({
    ...task,
    priority: PRIORITY_MIGRATION[task.priority] ?? task.priority,
  }))
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('ITEMS')
    if (!stored) return []
    return migrateTasks(JSON.parse(stored))
  })

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(tasks))
  }, [tasks])

  function addTask(title, priority) {
    setTasks(current => [
      ...current,
      { id: crypto.randomUUID(), title, priority, completed: false },
    ])
  }

  function completeTask(id) {
    setTasks(current =>
      current.map(task =>
        task.id === id ? { ...task, completed: true, completedAt: new Date().toISOString() } : task
      )
    )
  }

  function removeTask(id) {
    setTasks(current => current.filter(task => task.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, completeTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  return useContext(TaskContext)
}
