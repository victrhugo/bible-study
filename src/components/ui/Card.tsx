import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
  glass?: boolean
}

export function Card({ children, className = '', onClick, hoverable = false, glass = false }: CardProps) {
  const base  = glass
    ? 'glass-strong rounded-3xl shadow-card'
    : 'bg-white rounded-3xl shadow-card border border-white/80'
  const hover = hoverable
    ? 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300'
    : ''

  return (
    <div className={`${base} ${hover} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-b border-lavender-100/60 ${className}`}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}
