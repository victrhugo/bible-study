import logoSrc from '../../assets/logo.png'

type LogoColor = 'lavender' | 'white' | 'natural'

interface SDALogoProps {
  size?:      number
  color?:     LogoColor
  className?: string
}

// CSS filter values per color variant
const filters: Record<LogoColor, string> = {
  // Converts any colored image → lavender-600 (#8070D0)
  lavender: 'brightness(0) saturate(100%) invert(47%) sepia(18%) saturate(1100%) hue-rotate(220deg) brightness(100%)',
  // Converts to pure white (for dark backgrounds)
  white:    'brightness(0) invert(1)',
  // Keeps the original navy blue — no filter applied
  natural:  'none',
}

export function SDALogo({ size = 32, color = 'lavender', className = '' }: SDALogoProps) {
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
