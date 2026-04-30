import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  getAllProgress,
  markStudyComplete,
  markStudyIncomplete,
  saveStudyNotes,
  getUserStats,
} from '../services/progress'
import type { StudyProgress, UserStats } from '../types'
import { TOTAL_STUDIES } from '../data/curriculum'

export function useProgress() {
  const { user } = useAuth()
  const [progress, setProgress]   = useState<Record<string, StudyProgress>>({})
  const [stats, setStats]         = useState<UserStats | null>(null)
  const [loading, setLoading]     = useState(true)

  const refresh = useCallback(async () => {
    if (!user) { setLoading(false); return }
    setLoading(true)
    const all = await getAllProgress(user.uid)
    const map: Record<string, StudyProgress> = {}
    for (const p of all) map[p.studyId] = p
    setProgress(map)
    const s = await getUserStats(user.uid, TOTAL_STUDIES)
    setStats(s)
    setLoading(false)
  }, [user])

  useEffect(() => { refresh() }, [refresh])

  const isCompleted = (studyId: string) => progress[studyId]?.completed ?? false

  const toggleComplete = async (studyId: string, moduleId: string, blockId: string) => {
    if (!user) return
    if (isCompleted(studyId)) {
      await markStudyIncomplete(user.uid, studyId)
    } else {
      await markStudyComplete(user.uid, studyId, moduleId, blockId)
    }
    await refresh()
  }

  const updateNotes = async (studyId: string, moduleId: string, blockId: string, notes: string) => {
    if (!user) return
    await saveStudyNotes(user.uid, studyId, moduleId, blockId, notes)
    await refresh()
  }

  const moduleCompletionRate = (moduleId: string, total: number) => {
    const done = Object.values(progress).filter(
      p => p.moduleId === moduleId && p.completed,
    ).length
    return total > 0 ? (done / total) * 100 : 0
  }

  const blockCompletionRate = (blockId: string, total: number) => {
    const done = stats?.completedByBlock[blockId] ?? 0
    return total > 0 ? (done / total) * 100 : 0
  }

  return {
    progress,
    stats,
    loading,
    isCompleted,
    toggleComplete,
    updateNotes,
    moduleCompletionRate,
    blockCompletionRate,
    refresh,
  }
}
