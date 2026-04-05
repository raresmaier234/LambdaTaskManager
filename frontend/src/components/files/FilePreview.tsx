import { FileText, Image, File as FileIcon, X } from 'lucide-react'
import type { TaskFile } from '../../types/task'
import { formatFileSize } from '../../utils/formatters'

interface FilePreviewProps {
  file: TaskFile
  onRemove?: (key: string) => void
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image
  if (type.includes('pdf') || type.includes('document')) return FileText
  return FileIcon
}

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  const Icon = getFileIcon(file.type)

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 group">
      <div className="shrink-0 p-2 bg-white rounded-lg border border-gray-200">
        <Icon className="w-5 h-5 text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
        <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(file.key)}
          className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          title="Elimină fișierul"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

