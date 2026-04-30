import type { CSSProperties } from 'react'
import logoSrc from '../../assets/logo.png'

type LogoColor = 'natural' | 'white' | 'navy'

interface SDALogoProps {
  size?:      number
  color?:     LogoColor
  className?: string
}

// mix-blend-mode eliminates the white background without image editing:
// - multiply: white bg disappears on any light surface, black logo stays sharp
// - screen + invert: black logo becomes white, bg blends away on dark surfaces
const styles: Record<LogoColor, CSSProperties> = {
  natural: { filter: 'none',       mixBlendMode: 'multiply' },
  white:   { filter: 'invert(1)',  mixBlendMode: 'screen'   },
  navy:    {
    filter:       'brightness(0) saturate(100%) invert(16%) sepia(55%) saturate(700%) hue-rotate(195deg) brightness(85%)',
    mixBlendMode: 'multiply',
  },
}

export function SDALogo({ size = 32, color = 'natural', className = '' }: SDALogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Igreja Adventista do Sétimo Dia"
      width={size}
      height={size}
      draggable={false}
      className={`object-contain select-none flex-shrink-0 ${className}`}
      style={{ ...styles[color], width: size, height: size, minWidth: size, minHeight: size }}
    />
  )
}
