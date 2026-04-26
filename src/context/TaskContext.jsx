import { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('ITEMS')
    if (stored == null) return []
    return JSON.parse(stored)
  })

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(tasks))
  }, [tasks])

  function addTask(title) {
    setTasks(current => [
      ...current,
      { id: crypto.randomUUID(), title, completed: false },
    ])
  }

  function completeTask(id) {
    setTasks(current =>
      current.map(task =>
        task.id === id ? { ...task, completed: true } : task
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
