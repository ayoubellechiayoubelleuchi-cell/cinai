import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0F',
        void: '#050507',
        aurora: '#7B61FF',
        nebula: '#FF61DC',
        stellar: '#61E8FF',
        gold: '#FFD700',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #7B61FF, #FF61DC)',
        'cinematic-glow':
          'radial-gradient(ellipse at 50% 0%, rgba(123, 97, 255, 0.15) 0%, transparent 70%)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
