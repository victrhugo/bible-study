/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Azul profundo (cor primária — navy) ─────────────────────────────
        lavender: {
          50:  '#F0F4F9',
          100: '#D6E2EF',
          200: '#ADC5DF',
          300: '#7AA3CA',
          400: '#4D82B5',
          500: '#2A64A0',
          600: '#1E3A5F',
          700: '#162C47',
          800: '#0E1D2F',
          900: '#071018',
        },
        // ── Pergaminho / pedra quente (neutro elegante) ──────────────────────
        blush: {
          50:  '#FAF9F6',
          100: '#F2EFE8',
          200: '#E3DDD1',
          300: '#CBBFA8',
          400: '#B3A17F',
          500: '#9B835A',
          600: '#7D663E',
          700: '#5F4C2B',
          800: '#41331C',
          900: '#231B0E',
        },
        // ── Sálvia / verde suave (serenidade) ───────────────────────────────
        sage: {
          50:  '#F2F6F3',
          100: '#E1EBE5',
          200: '#C3D7CA',
          300: '#97BCA4',
          400: '#6BA07E',
          500: '#4A8460',
          600: '#38694C',
          700: '#2B5039',
          800: '#1D3626',
          900: '#0F1D14',
        },
        // ── Creme / off-white (backgrounds) ─────────────────────────────────
        cream: {
          50:  '#FDFCF9',
          100: '#F8F5EE',
          200: '#F0E9D9',
          300: '#E6D9C2',
          400: '#D4C29B',
          500: '#C0A873',
        },
        // ── Ouro refinado (destaques) ────────────────────────────────────────
        gold: {
          300: '#E8CC80',
          400: '#D4A83A',
          500: '#C09020',
          600: '#9A7218',
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
        'soft':       '0 2px 20px 0 rgba(30, 58, 95, 0.06)',
        'medium':     '0 4px 32px 0 rgba(30, 58, 95, 0.10)',
        'glow':       '0 0 0 3px rgba(30, 58, 95, 0.18)',
        'card':       '0 1px 4px 0 rgba(30,58,95,0.05), 0 4px 24px 0 rgba(30,58,95,0.07)',
        'card-hover': '0 4px 12px 0 rgba(30,58,95,0.09), 0 12px 40px 0 rgba(30,58,95,0.13)',
        'glass':      '0 8px 32px 0 rgba(30, 58, 95, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-spirit':   'linear-gradient(150deg, #F6F4F0 0%, #F2F0EB 60%, #EEF2EE 100%)',
        'gradient-lavender': 'linear-gradient(135deg, #2A64A0 0%, #1E3A5F 100%)',
        'gradient-blush':    'linear-gradient(135deg, #9B835A 0%, #7D663E 100%)',
        'gradient-sage':     'linear-gradient(135deg, #4A8460 0%, #38694C 100%)',
        'gradient-warm':     'linear-gradient(135deg, #1E3A5F 0%, #C09020 100%)',
        'gradient-card':     'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.70) 100%)',
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
