import type { BlockLevel } from '../../types'

const levelStyles: Record<BlockLevel, string> = {
  'iniciante':     'bg-sage-100 text-sage-700 border border-sage-200',
  'intermediário': 'bg-gold-300/30 text-gold-600 border border-gold-300/50',
  'avançado':      'bg-blush-100 text-blush-700 border border-blush-200',
}

export function LevelBadge({ level }: { level: BlockLevel }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelStyles[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  )
}

export function CompletedBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sage-100 text-sage-700 border border-sage-200">
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Concluído
    </span>
  )
}

export function NewBadge() {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-warm text-white shadow-soft animate-pulse-soft">
      Novo
    </span>
  )
}
