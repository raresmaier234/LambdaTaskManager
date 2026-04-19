import { useState, useEffect, useCallback } from 'react'
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task'
import { taskService, ITaskService } from '../services/taskService'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [service, setService] = useState<ITaskService | null>(null)

  useEffect(() => {
    console.log(taskService())
    taskService().then(setService)
  }, [])

  const fetchTasks = useCallback(async () => {
    if (!service) return
    setLoading(true)
    setError(null)
    try {
      const data = await service.list()
      setTasks(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [service])

  useEffect(() => {
    fetchTasks()
    console.log(tasks)
  }, [fetchTasks])

  const addTask = useCallback(async (dto: CreateTaskDTO) => {
    if (!service) return
    try {
      const task = await service.create(dto)
      setTasks(prev => [task, ...prev])
      return task
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }, [service])

  const updateTask = useCallback(async (id: string, dto: UpdateTaskDTO) => {
    if (!service) return
    try {
      const updated = await service.update(id, dto)
      setTasks(prev => prev.map(t => t.id === id ? updated : t))
      return updated
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }, [service])

  const removeTask = useCallback(async (id: string) => {
    if (!service) return
    try {
      await service.remove(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }, [service])

  return { tasks, loading, error, addTask, updateTask, removeTask, refetch: fetchTasks }
}

