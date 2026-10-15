// Simple localStorage-based progress store
const STORAGE_KEY = 'dalil_progress'

export function getCompletedSessions(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function markSessionComplete(id: number): void {
  const current = getCompletedSessions()
  if (!current.includes(id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, id]))
  }
}

export function isSessionComplete(id: number): boolean {
  return getCompletedSessions().includes(id)
}
