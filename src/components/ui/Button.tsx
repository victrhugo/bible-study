import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'sage' | 'gold'
type Size    = 'sm' | 'md' | 'lg' | 'xl'

const variants: Record<Variant, string> = {
  primary:
    'bg-lavender-700 text-paper-50 border border-lavender-700 hover:bg-lavender-800 focus:ring-lavender-300 shadow-soft',
  secondary:
    'bg-white text-lavender-700 border border-blush-200 hover:bg-paper-50 hover:border-lavender-200 focus:ring-lavender-200 shadow-soft',
  ghost:
    'text-ink-500 hover:bg-paper-50 hover:text-lavender-700 focus:ring-lavender-200',
  danger:
    'bg-blush-700 text-paper-50 border border-blush-700 hover:bg-blush-800 shadow-soft focus:ring-blush-300',
  sage:
    'bg-sage-600 text-paper-50 border border-sage-700 hover:bg-sage-700 shadow-soft focus:ring-sage-300',
  gold:
    'bg-gold-500 text-lavender-900 border border-gold-500 hover:bg-gold-400 shadow-soft focus:ring-gold-300',
}

const sizes: Record<Size, string> = {
  sm:  'px-3.5 py-2 text-xs rounded-xl',
  md:  'px-5 py-2.5 text-sm rounded-xl',
  lg:  'px-6 py-3 text-sm rounded-2xl',
  xl:  'px-7 py-3.5 text-base rounded-2xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold tracking-[0.01em]
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        active:translate-y-px
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
