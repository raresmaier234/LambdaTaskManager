import { useCallback, useState } from 'react'
import { Upload, FileIcon } from 'lucide-react'

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  uploading: boolean
  progress: number
}

export default function FileUpload({ onFilesSelected, uploading, progress }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) onFilesSelected(files)
  }, [onFilesSelected])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) onFilesSelected(files)
    e.target.value = ''
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        dragOver
          ? 'border-blue-400 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={uploading}
      />

      {uploading ? (
        <div className="space-y-2">
          <FileIcon className="w-8 h-8 text-blue-500 mx-auto animate-pulse" />
          <p className="text-sm text-gray-600">Se încarcă... {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Upload className="w-8 h-8 text-gray-400 mx-auto" />
          <p className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">Click pentru upload</span> sau trage fișierele aici
          </p>
          <p className="text-xs text-gray-400">PDF, imagini, documente (max 10MB)</p>
        </div>
      )}
    </div>
  )
}

