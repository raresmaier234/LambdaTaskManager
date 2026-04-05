import type { TaskPriority } from '../../types/task'
import { priorityLabels } from '../../utils/formatters'
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react'

const priorityStyles: Record<TaskPriority, string> = {
  'low': 'text-blue-600',
  'medium': 'text-amber-600',
  'high': 'text-red-600',
}

const PriorityIcon = ({ priority }: { priority: TaskPriority }) => {
  const cls = `w-3.5 h-3.5 ${priorityStyles[priority]}`
  switch (priority) {
    case 'high': return <ArrowUp className={cls} />
    case 'medium': return <ArrowRight className={cls} />
    case 'low': return <ArrowDown className={cls} />
  }
}

export default function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${priorityStyles[priority]}`}>
      <PriorityIcon priority={priority} />
      {priorityLabels[priority]}
    </span>
  )
}

