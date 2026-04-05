import { Plus, CheckSquare } from 'lucide-react'
import Button from '../ui/Button'

interface HeaderProps {
  onNewTask: () => void
}

export default function Header({ onNewTask }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
            </div>
          </div>
          <Button onClick={onNewTask}>
            <Plus className="w-4 h-4" />
            Task nou
          </Button>
        </div>
      </div>
    </header>
  )
}

