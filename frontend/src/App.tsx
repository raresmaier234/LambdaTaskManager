import { useState } from 'react'
import Header from './components/layout/Header'
import TaskBoard from './components/tasks/TaskBoard'
import TaskForm from './components/tasks/TaskForm'
import TaskDetail from './components/tasks/TaskDetail'
import Modal from './components/ui/Modal'
import ConfirmDialog from './components/ui/ConfirmDialog'
import Spinner from './components/ui/Spinner'
import { useTasks } from './hooks/useTasks'
import type { Task, CreateTaskDTO, TaskFile } from './types/task'

export default function App() {
  const { tasks, loading, error, addTask, updateTask, removeTask } = useTasks()

  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [viewingTask, setViewingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  const handleNewTask = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const handleEdit = (task: Task) => {
    setViewingTask(null)
    setEditingTask(task)
    setShowForm(true)
  }

  const handleSubmit = async (dto: CreateTaskDTO, _files?: TaskFile[]) => {
    if (editingTask) {
      await updateTask(editingTask.id, dto)
    } else {
      await addTask(dto)
    }
    setShowForm(false)
    setEditingTask(null)
  }

  const handleDelete = async () => {
    if (!deletingTask) return
    setDeleteLoading(true)
    try {
      await removeTask(deletingTask.id)
      setDeletingTask(null)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleStatusChange = async (taskId: string, status: Task['status']) => {
    await updateTask(taskId, { status })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNewTask={handleNewTask} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Caută task-uri..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toate prioritățile</option>
            <option value="high">Ridicată</option>
            <option value="medium">Medie</option>
            <option value="low">Scăzută</option>
          </select>

          <div className="text-sm text-gray-500">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? '-uri' : ''}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Spinner className="py-20" />
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-2">{error}</p>
            <button onClick={() => window.location.reload()} className="text-blue-600 underline text-sm">
              Reîncearcă
            </button>
          </div>
        ) : filteredTasks.length === 0 && !searchQuery && filterPriority === 'all' ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Niciun task</h3>
            <p className="text-gray-500 mb-4">Creează primul tău task pentru a începe.</p>
            <button onClick={handleNewTask} className="text-blue-600 font-medium hover:underline">
              + Creează un task
            </button>
          </div>
        ) : (
          <TaskBoard
            tasks={filteredTasks}
            onEdit={handleEdit}
            onDelete={(task) => setDeletingTask(task)}
            onTaskClick={(task) => setViewingTask(task)}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditingTask(null) }}
        title={editingTask ? 'Editează task' : 'Task nou'}
      >
        <TaskForm
          task={editingTask || undefined}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingTask(null) }}
        />
      </Modal>

      {/* Task Detail */}
      {viewingTask && (
        <TaskDetail
          task={viewingTask}
          onClose={() => setViewingTask(null)}
          onEdit={handleEdit}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingTask}
        title="Șterge task"
        message={`Ești sigur că vrei să ștergi "${deletingTask?.title}"? Acțiunea nu poate fi anulată.`}
        onConfirm={handleDelete}
        onCancel={() => setDeletingTask(null)}
        loading={deleteLoading}
      />
    </div>
  )
}

