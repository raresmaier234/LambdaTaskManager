import type { TaskStatus } from '../../types/task'
import { statusLabels } from '../../utils/formatters'

const statusStyles: Record<TaskStatus, string> = {
  'todo': 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  'done': 'bg-green-100 text-green-700',
}

export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  )
}

