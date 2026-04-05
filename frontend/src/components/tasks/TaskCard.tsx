import { Task } from '../../types/task'
import { Paperclip, Trash2, Edit3, GripVertical } from 'lucide-react'
import TaskStatusBadge from './TaskStatusBadge'
import TaskPriorityBadge from './TaskPriorityBadge'
import { formatDate } from '../../utils/formatters'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onClick: (task: Task) => void
}

export default function TaskCard({ task, onEdit, onDelete, onClick }: TaskCardProps) {
  return (
    <div
      className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
      onClick={() => onClick(task)}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 text-gray-300 group-hover:text-gray-400 transition-colors">
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(task) }}
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                title="Editează"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(task) }}
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-colors"
                title="Șterge"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{task.description}</p>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />

            {task.files.length > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <Paperclip className="w-3.5 h-3.5" />
                {task.files.length} fișier{task.files.length > 1 ? 'e' : ''}
              </span>
            )}

            <span className="text-xs text-gray-400 ml-auto">{formatDate(task.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

