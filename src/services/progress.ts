import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore'
import { db } from './firebase'
import type { StudyProgress, UserStats } from '../types'

// ─── Progress CRUD ────────────────────────────────────────────────────────────

export async function markStudyComplete(
  uid: string,
  studyId: string,
  moduleId: string,
  blockId: string,
): Promise<void> {
  const ref = doc(db, 'users', uid, 'progress', studyId)
  const snap = await getDoc(ref)
  await setDoc(ref, {
    studyId,
    moduleId,
    blockId,
    completed:   true,
    completedAt: serverTimestamp(),
    startedAt:   snap.exists() ? snap.data().startedAt : serverTimestamp(),
    notes:       snap.exists() ? snap.data().notes : '',
  })
}

export async function markStudyIncomplete(uid: string, studyId: string): Promise<void> {
  const ref = doc(db, 'users', uid, 'progress', studyId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  await setDoc(ref, { ...snap.data(), completed: false, completedAt: null })
}

export async function saveStudyNotes(
  uid: string,
  studyId: string,
  moduleId: string,
  blockId: string,
  notes: string,
): Promise<void> {
  const ref = doc(db, 'users', uid, 'progress', studyId)
  const snap = await getDoc(ref)
  await setDoc(ref, {
    studyId,
    moduleId,
    blockId,
    completed:   snap.exists() ? snap.data().completed : false,
    completedAt: snap.exists() ? snap.data().completedAt : null,
    startedAt:   snap.exists() ? snap.data().startedAt : serverTimestamp(),
    notes,
  })
}

export async function getStudyProgress(
  uid: string,
  studyId: string,
): Promise<StudyProgress | null> {
  const snap = await getDoc(doc(db, 'users', uid, 'progress', studyId))
  if (!snap.exists()) return null
  return snap.data() as StudyProgress
}

export async function getAllProgress(uid: string): Promise<StudyProgress[]> {
  const snap = await getDocs(collection(db, 'users', uid, 'progress'))
  return snap.docs.map(d => d.data() as StudyProgress)
}

export async function getBlockProgress(uid: string, blockId: string): Promise<StudyProgress[]> {
  const ref = collection(db, 'users', uid, 'progress')
  const q   = query(ref, where('blockId', '==', blockId))
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as StudyProgress)
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export async function getUserStats(uid: string, totalStudies: number): Promise<UserStats> {
  const all = await getAllProgress(uid)
  const completed = all.filter(p => p.completed)

  const completedByBlock: Record<string, number> = {}
  for (const p of completed) {
    completedByBlock[p.blockId] = (completedByBlock[p.blockId] ?? 0) + 1
  }

  const lastStudyDate =
    completed.length > 0
      ? completed
          .map(p => (p.completedAt as unknown as { toDate: () => Date })?.toDate?.() ?? null)
          .filter(Boolean)
          .sort((a, b) => b!.getTime() - a!.getTime())[0] ?? null
      : null

  return {
    totalCompleted:  completed.length,
    totalStudies,
    currentStreak:   0, // implement streak logic as needed
    lastStudyDate,
    completedByBlock,
  }
}
