interface SDALogoProps {
  className?: string
  size?: number
  variant?: 'full' | 'icon'
}

export function SDALogo({ className = '', size = 32, variant = 'icon' }: SDALogoProps) {
  if (variant === 'icon') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Igreja Adventista do Sétimo Dia"
      >
        {/* Chama central — Espírito Santo */}
        <path
          d="M16 3C16 3 12.5 9 12.5 13.5C12.5 15.9 14 17.8 16 17.8C18 17.8 19.5 15.9 19.5 13.5C19.5 9 16 3 16 3Z"
          fill="currentColor"
          opacity="0.95"
        />
        {/* Asa esquerda */}
        <path
          d="M16 17.8C16 17.8 9 20.5 7 25.5C6 28 7.5 30 10 30.5C10 30.5 11.5 26.5 16 24.5"
          fill="currentColor"
          opacity="0.75"
        />
        {/* Asa direita */}
        <path
          d="M16 17.8C16 17.8 23 20.5 25 25.5C26 28 24.5 30 22 30.5C22 30.5 20.5 26.5 16 24.5"
          fill="currentColor"
          opacity="0.75"
        />
        {/* Base / terra */}
        <ellipse cx="16" cy="29" rx="6" ry="1.5" fill="currentColor" opacity="0.25" />
      </svg>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SDALogo size={size} variant="icon" />
      <div className="flex flex-col leading-tight">
        <span className="font-serif font-semibold text-sm leading-none">Estudo Bíblico</span>
        <span className="text-xs opacity-60 leading-none mt-0.5">Igreja Adventista · IASD</span>
      </div>
    </div>
  )
}
