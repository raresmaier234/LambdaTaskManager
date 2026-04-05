import { Task, TaskStatus } from '../../types/task'
import TaskCard from './TaskCard'
import { statusLabels } from '../../utils/formatters'
import { Circle, Clock, CheckCircle2 } from 'lucide-react'

interface TaskBoardProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onTaskClick: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
}

const columns: { status: TaskStatus; icon: typeof Circle; color: string }[] = [
  { status: 'todo', icon: Circle, color: 'border-gray-300' },
  { status: 'in-progress', icon: Clock, color: 'border-amber-400' },
  { status: 'done', icon: CheckCircle2, color: 'border-green-400' },
]

export default function TaskBoard({ tasks, onEdit, onDelete, onTaskClick, onStatusChange }: TaskBoardProps) {
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId)
  }

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('taskId')
    if (taskId) {
      onStatusChange(taskId, status)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(({ status, icon: Icon, color }) => {
        const columnTasks = tasks.filter(t => t.status === status)
        return (
          <div
            key={status}
            className="flex flex-col"
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={handleDragOver}
          >
            <div className={`flex items-center gap-2 mb-4 pb-3 border-b-2 ${color}`}>
              <Icon className="w-5 h-5 text-gray-500" />
              <h2 className="font-semibold text-gray-700">{statusLabels[status]}</h2>
              <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {columnTasks.length}
              </span>
            </div>
            <div className="space-y-3 flex-1 min-h-[200px]">
              {columnTasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                >
                  <TaskCard
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onClick={onTaskClick}
                  />
                </div>
              ))}
              {columnTasks.length === 0 && (
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-400">Trage un task aici</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

