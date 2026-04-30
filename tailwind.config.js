/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Lavanda espiritual (cor primária) ──────────────────────────────
        lavender: {
          50:  '#F8F7FE',
          100: '#F0EEFB',
          200: '#E1DCF8',
          300: '#C9C1F1',
          400: '#B1A6E9',
          500: '#998BE2',
          600: '#8070D0',
          700: '#6657B9',
          800: '#4E3E9E',
          900: '#362882',
        },
        // ── Rosé acolhedor (accent quente) ────────────────────────────────
        blush: {
          50:  '#FEF7F8',
          100: '#FCF0F1',
          200: '#F9DEE0',
          300: '#F4C5CA',
          400: '#EDABB2',
          500: '#E5919B',
          600: '#D47784',
          700: '#BA5E6E',
          800: '#9D4659',
          900: '#7D2F43',
        },
        // ── Sálvia / verde suave (serenidade) ────────────────────────────
        sage: {
          50:  '#F3F8F5',
          100: '#E7F1EB',
          200: '#CFE3D7',
          300: '#AECFBC',
          400: '#8DBBA1',
          500: '#6EA688',
          600: '#538A6C',
          700: '#3D6E53',
          800: '#29523C',
          900: '#163627',
        },
        // ── Creme / off-white (backgrounds) ──────────────────────────────
        cream: {
          50:  '#FFFEFB',
          100: '#FEFCF7',
          200: '#FDF8EE',
          300: '#FAF3E3',
          400: '#F5EBD0',
          500: '#EFE2BC',
        },
        // ── Ouro suave (destaques especiais) ─────────────────────────────
        gold: {
          300: '#F0D080',
          400: '#E8C060',
          500: '#D4A830',
          600: '#B88C14',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero':    ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        'soft':    '0 2px 20px 0 rgba(102, 87, 185, 0.08)',
        'medium':  '0 4px 32px 0 rgba(102, 87, 185, 0.12)',
        'glow':    '0 0 0 3px rgba(153, 139, 226, 0.25)',
        'card':    '0 1px 4px 0 rgba(54,40,130,0.06), 0 4px 24px 0 rgba(54,40,130,0.08)',
        'card-hover': '0 4px 12px 0 rgba(54,40,130,0.10), 0 12px 40px 0 rgba(54,40,130,0.14)',
        'glass':   '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-spirit':  'linear-gradient(135deg, #F8F7FE 0%, #FEF7F8 50%, #F3F8F5 100%)',
        'gradient-lavender': 'linear-gradient(135deg, #998BE2 0%, #B1A6E9 100%)',
        'gradient-blush':   'linear-gradient(135deg, #E5919B 0%, #EDABB2 100%)',
        'gradient-sage':    'linear-gradient(135deg, #6EA688 0%, #8DBBA1 100%)',
        'gradient-warm':    'linear-gradient(135deg, #998BE2 0%, #E5919B 100%)',
        'gradient-card':    'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'slide-in':   'slideIn 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.85', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
