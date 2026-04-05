import { useState, FormEvent } from 'react'
import { Task, CreateTaskDTO, TaskStatus, TaskPriority } from '../../types/task'
import Button from '../ui/Button'
import FileUpload from '../files/FileUpload'
import FilePreview from '../files/FilePreview'
import { useFileUpload } from '../../hooks/useFileUpload'
import type { TaskFile } from '../../types/task'

interface TaskFormProps {
  task?: Task
  onSubmit: (data: CreateTaskDTO, files?: TaskFile[]) => Promise<void>
  onCancel: () => void
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo')
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'medium')
  const [files, setFiles] = useState<TaskFile[]>(task?.files || [])
  const [submitting, setSubmitting] = useState(false)

  const { upload, uploading, progress } = useFileUpload()

  const handleFileSelect = async (selectedFiles: File[]) => {
    for (const file of selectedFiles) {
      try {
        const taskFile = await upload(file)
        setFiles(prev => [...prev, taskFile])
      } catch {
        // error handled in hook
      }
    }
  }

  const handleRemoveFile = (key: string) => {
    setFiles(prev => prev.filter(f => f.key !== key))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)
    try {
      await onSubmit({ title: title.trim() })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Titlu <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Numele task-ului..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Descriere</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrie task-ul..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="todo">De făcut</option>
            <option value="in-progress">În progres</option>
            <option value="done">Finalizat</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Prioritate</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="low">Scăzută</option>
            <option value="medium">Medie</option>
            <option value="high">Ridicată</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Fișiere</label>
        <FileUpload onFilesSelected={handleFileSelect} uploading={uploading} progress={progress} />
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map(file => (
              <FilePreview key={file.key} file={file} onRemove={handleRemoveFile} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Anulează
        </Button>
        <Button type="submit" disabled={submitting || !title.trim()}>
          {submitting ? 'Se salvează...' : task ? 'Salvează' : 'Creează task'}
        </Button>
      </div>
    </form>
  )
}

