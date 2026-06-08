import type { BlockLevel } from '../../types'

const levelStyles: Record<BlockLevel, string> = {
  'iniciante': 'border border-sage-200 bg-sage-50 text-sage-700',
  'intermediário': 'border border-gold-300/70 bg-cream-50 text-gold-600',
  'avançado': 'border border-lavender-200 bg-lavender-50 text-lavender-700',
}

export function LevelBadge({ level }: { level: BlockLevel }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${levelStyles[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  )
}

export function CompletedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-sage-200 bg-sage-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sage-700">
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Concluído
    </span>
  )
}

export function NewBadge() {
  return (
    <span className="inline-flex items-center rounded-full border border-gold-300 bg-cream-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-600">
      Novo
    </span>
  )
}
