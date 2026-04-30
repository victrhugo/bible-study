import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'sage' | 'blush'
type Size    = 'sm' | 'md' | 'lg' | 'xl'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-lavender text-white shadow-soft hover:shadow-medium hover:brightness-105 focus:ring-lavender-400',
  secondary:
    'bg-white text-lavender-700 border border-lavender-200 hover:bg-lavender-50 hover:border-lavender-300 shadow-soft focus:ring-lavender-400',
  ghost:
    'text-slate-500 hover:bg-lavender-50 hover:text-lavender-700 focus:ring-lavender-300',
  danger:
    'bg-blush-500 text-white hover:bg-blush-600 shadow-soft focus:ring-blush-400',
  sage:
    'bg-gradient-sage text-white shadow-soft hover:shadow-medium hover:brightness-105 focus:ring-sage-400',
  blush:
    'bg-gradient-blush text-white shadow-soft hover:shadow-medium hover:brightness-105 focus:ring-blush-400',
}

const sizes: Record<Size, string> = {
  sm:  'px-3.5 py-1.5 text-xs rounded-xl',
  md:  'px-5 py-2.5 text-sm rounded-xl',
  lg:  'px-7 py-3 text-sm rounded-2xl',
  xl:  'px-8 py-4 text-base rounded-2xl',
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
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.97]
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
