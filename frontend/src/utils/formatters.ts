export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('ro-RO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export const statusLabels: Record<string, string> = {
  'todo': 'De făcut',
  'in-progress': 'În progres',
  'done': 'Finalizat',
}

export const priorityLabels: Record<string, string> = {
  'low': 'Scăzută',
  'medium': 'Medie',
  'high': 'Ridicată',
}

