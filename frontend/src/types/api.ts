export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface PreSignedUrlResponse {
  uploadUrl: string
  downloadUrl: string
  key: string
}

