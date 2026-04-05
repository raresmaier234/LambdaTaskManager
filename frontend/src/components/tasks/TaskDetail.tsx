import { Task } from '../../types/task'
import { X, Paperclip } from 'lucide-react'
import TaskStatusBadge from './TaskStatusBadge'
import TaskPriorityBadge from './TaskPriorityBadge'
import FilePreview from '../files/FilePreview'
import { formatDate } from '../../utils/formatters'
import Button from '../ui/Button'

interface TaskDetailProps {
  task: Task
  onClose: () => void
  onEdit: (task: Task) => void
}

export default function TaskDetail({ task, onClose, onEdit }: TaskDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h2>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>Creat: {formatDate(task.createdAt)}</span>
            <span>Actualizat: {formatDate(task.updatedAt)}</span>
          </div>

          {task.description && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Descriere</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
            </div>
          )}

          {task.files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                Fișiere atașate ({task.files.length})
              </h3>
              <div className="space-y-2">
                {task.files.map(file => (
                  <FilePreview key={file.key} file={file} />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button onClick={() => onEdit(task)}>
              Editează
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

