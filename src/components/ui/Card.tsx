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
    : 'surface'
  const hover = hoverable
    ? 'cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover'
    : ''

  return (
    <div className={`${base} ${hover} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border-b border-blush-200/70 px-6 py-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}
