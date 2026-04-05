import { apiClient } from './apiClient'
import type { PreSignedUrlResponse } from '../types/api'
import type { ApiResponse } from '../types/api'
import type { IFileService } from './fileService'

export class ApiFileService implements IFileService {
  async getUploadUrl(fileName: string, fileType: string): Promise<PreSignedUrlResponse> {
    const res = await apiClient<ApiResponse<PreSignedUrlResponse>>('/files/upload-url', {
      method: 'POST',
      body: { fileName, fileType },
    })
    return res.data
  }

  async uploadFile(uploadUrl: string, file: File, onProgress?: (percent: number) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', uploadUrl)
      xhr.setRequestHeader('Content-Type', file.type)

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100))
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve()
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`))
        }
      })

      xhr.addEventListener('error', () => reject(new Error('Upload failed')))
      xhr.send(file)
    })
  }

  async deleteFile(key: string): Promise<void> {
    await apiClient<ApiResponse<null>>(`/files/${encodeURIComponent(key)}`, {
      method: 'DELETE',
    })
  }
}

