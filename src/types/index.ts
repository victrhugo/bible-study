// ─── Domain Models ────────────────────────────────────────────────────────────

export type BlockLevel = 'iniciante' | 'intermediário' | 'avançado'

export interface BibleReference {
  book: string
  passage: string
  full: string // e.g. "João 3:16"
}

export interface Block {
  id: string              // e.g. "A", "B", "C"
  name: string
  description: string
  level: BlockLevel
  order: number
  color: string           // tailwind color class stem, e.g. "blue"
  icon: string            // lucide icon name
  moduleCount: number
  studyCount: number
}

export interface Module {
  id: string              // e.g. "A1", "B3"
  blockId: string
  name: string
  objective: string
  order: number
  studyCount: number
}

export interface Study {
  id: string              // e.g. "A1.1", "B3.4"
  moduleId: string
  blockId: string
  title: string
  description: string
  references: BibleReference[]
  order: number
  content?: StudyContent  // loaded lazily
}

export interface StudyContent {
  context: string
  narrative: string
  keyVerses: KeyVerse[]
  explanation: string
  connections: string[]
  application: string
  reflection: string[]
  spiritOfProphecy?: string
}

export interface KeyVerse {
  reference: string
  text: string
}

// ─── User & Progress ──────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string
  displayName: string
  email: string
  photoURL: string | null
  createdAt: Date
}

export interface StudyProgress {
  studyId: string
  moduleId: string
  blockId: string
  completed: boolean
  completedAt: Date | null
  notes: string
  startedAt: Date
}

export interface UserStats {
  totalCompleted: number
  totalStudies: number
  currentStreak: number
  lastStudyDate: Date | null
  completedByBlock: Record<string, number>
}
