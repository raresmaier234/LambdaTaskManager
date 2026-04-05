import { useState, useCallback } from 'react'
import { fileService } from '../services/fileService'
import type { TaskFile } from '../types/task'

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(async (file: File): Promise<TaskFile> => {
    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      const svc = await fileService()
      const { uploadUrl, key } = await svc.getUploadUrl(file.name, file.type)
      await svc.uploadFile(uploadUrl, file, setProgress)

      return {
        key,
        name: file.name,
        size: file.size,
        type: file.type,
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed')
      throw err
    } finally {
      setUploading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setUploading(false)
    setProgress(0)
    setError(null)
  }, [])

  return { upload, uploading, progress, error, reset }
}

