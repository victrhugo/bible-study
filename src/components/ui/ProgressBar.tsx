interface ProgressBarProps {
  value: number
  label?: string
  showPercent?: boolean
  size?: 'xs' | 'sm' | 'md'
  variant?: 'lavender' | 'sage' | 'blush' | 'warm'
}

const gradients = {
  lavender: 'from-lavender-500 to-lavender-400',
  sage:     'from-sage-500 to-sage-400',
  blush:    'from-blush-500 to-blush-400',
  warm:     'from-lavender-600 to-gold-400',
}

const heights = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2.5',
}

export function ProgressBar({
  value,
  label,
  showPercent = true,
  size = 'md',
  variant = 'lavender',
}: ProgressBarProps) {
  const pct  = Math.min(100, Math.max(0, Math.round(value)))
  const h    = heights[size]
  const grad = gradients[variant]

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label       && <span className="text-xs font-medium text-slate-500">{label}</span>}
          {showPercent && <span className="text-xs font-semibold text-lavender-600">{pct}%</span>}
        </div>
      )}
      <div className={`w-full bg-lavender-100 rounded-full ${h} overflow-hidden`}>
        <div
          className={`bg-gradient-to-r ${grad} ${h} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function CircularProgress({ value, size = 48 }: { value: number; size?: number }) {
  const pct    = Math.min(100, Math.max(0, Math.round(value)))
  const r      = (size - 6) / 2
  const circ   = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#D6E2EF" strokeWidth="5" />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="url(#navyGold)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="navyGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#2A64A0" />
            <stop offset="100%" stopColor="#C09020" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-xs font-bold text-lavender-700">{pct}%</span>
    </div>
  )
}
