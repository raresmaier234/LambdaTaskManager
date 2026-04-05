import type { PreSignedUrlResponse } from '../types/api'

export interface IFileService {
  getUploadUrl(fileName: string, fileType: string): Promise<PreSignedUrlResponse>
  uploadFile(uploadUrl: string, file: File, onProgress?: (percent: number) => void): Promise<void>
  deleteFile(key: string): Promise<void>
}

let _service: IFileService | null = null

export async function fileService(): Promise<IFileService> {
  if (_service) return _service

  const mod = await import('./fileService.api')
  _service = new mod.ApiFileService()

  return _service
}

