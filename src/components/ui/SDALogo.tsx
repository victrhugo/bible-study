import logoSrc from '../../assets/logo.png'

type LogoColor = 'natural' | 'white' | 'navy'

interface SDALogoProps {
  size?:      number
  color?:     LogoColor
  className?: string
}

// CSS filter per context
const filters: Record<LogoColor, string> = {
  // Original navy blue — harmonizes naturally with the new palette
  natural: 'none',
  // Pure white for dark/navy backgrounds (login panel)
  white:   'brightness(0) invert(1)',
  // Force to brand navy #1E3A5F (when source image color differs)
  navy:    'brightness(0) saturate(100%) invert(16%) sepia(55%) saturate(700%) hue-rotate(195deg) brightness(85%)',
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
      style={{
        filter:    filters[color],
        width:     size,
        height:    size,
        minWidth:  size,
        minHeight: size,
      }}
    />
  )
}
