export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface TaskFile {
  key: string
  name: string
  size: number
  type: string
  url?: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  files: TaskFile[]
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDTO {
  title: string
  // description: string
  // status: TaskStatus
  // priority: TaskPriority
}

export interface UpdateTaskDTO {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
}
