import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task'

export interface ITaskService {
  list(): Promise<Task[]>
  getById(id: string): Promise<Task>
  create(dto: CreateTaskDTO): Promise<Task>
  update(id: string, dto: UpdateTaskDTO): Promise<Task>
  remove(id: string): Promise<void>
}

// Lazy-loaded singleton
let _service: ITaskService | null = null

export async function taskService(): Promise<ITaskService> {
  if (_service) return _service

  const mod = await import('./taskService.api')
  _service = new mod.ApiTaskService()

  return _service
}

