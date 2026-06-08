import type { CSSProperties } from 'react'
import logoSrc from '../../assets/logo-iasd.png'

type LogoColor = 'natural' | 'white' | 'navy'

interface SDALogoProps {
  size?: number
  width?: number
  color?: LogoColor
  className?: string
}

// mix-blend-mode eliminates the white background without image editing:
// - multiply: white bg disappears on any light surface, black logo stays sharp
// - screen + invert: black logo becomes white, bg blends away on dark surfaces
const styles: Record<LogoColor, CSSProperties> = {
  natural: { filter: 'none' },
  white:   { filter: 'invert(1)' },
  navy:    {
    filter: 'brightness(0) saturate(100%) invert(15%) sepia(29%) saturate(985%) hue-rotate(173deg) brightness(92%) contrast(93%)',
  },
}

export function SDALogo({ size = 32, width, color = 'natural', className = '' }: SDALogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Logo do Estudo Bíblico"
      width={width}
      height={size}
      draggable={false}
      className={`block h-auto max-w-none select-none flex-shrink-0 ${className}`}
      style={{ ...styles[color], height: size, width: width ?? 'auto' }}
    />
  )
}
