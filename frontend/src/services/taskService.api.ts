import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task'
import { apiClient } from './apiClient'
import type { ITaskService } from './taskService'
import type { ApiResponse } from '../types/api'

export class ApiTaskService implements ITaskService {
  async list(): Promise<Task[]> {
    const res = await apiClient<ApiResponse<Task[]>>('/task')
    return res.data
  }

  async getById(id: string): Promise<Task> {
    const res = await apiClient<ApiResponse<Task>>(`/tasks/${id}`)
    return res.data
  }

  async create(dto: CreateTaskDTO): Promise<Task> {
    const res = await apiClient<ApiResponse<Task>>('/task', {
      method: 'POST',
      body: dto,
    })
    return res.data
  }

  async update(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const res = await apiClient<ApiResponse<Task>>(`/tasks/${id}`, {
      method: 'PUT',
      body: dto,
    })
    return res.data
  }

  async remove(id: string): Promise<void> {
    await apiClient<ApiResponse<null>>(`/tasks/${id}`, {
      method: 'DELETE',
    })
  }
}

