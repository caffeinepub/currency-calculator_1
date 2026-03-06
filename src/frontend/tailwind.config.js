import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))'
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))'
        },
        // Sport category palette
        sport: {
          soccer: 'oklch(0.78 0.18 142)',
          basketball: 'oklch(0.75 0.20 55)',
          tennis: 'oklch(0.80 0.18 115)',
          cricket: 'oklch(0.75 0.16 80)',
          football: 'oklch(0.68 0.20 30)',
          baseball: 'oklch(0.70 0.16 200)',
          rugby: 'oklch(0.72 0.18 340)',
        },
        // Dark slate base tones
        slate: {
          950: 'oklch(0.11 0.012 260)',
          900: 'oklch(0.13 0.014 260)',
          800: 'oklch(0.16 0.016 260)',
          700: 'oklch(0.20 0.018 260)',
          600: 'oklch(0.28 0.018 260)',
          500: 'oklch(0.40 0.015 260)',
          400: 'oklch(0.55 0.012 260)',
          300: 'oklch(0.70 0.010 260)',
          200: 'oklch(0.82 0.007 260)',
          100: 'oklch(0.93 0.004 260)',
        },
        // Electric green accent
        electric: {
          DEFAULT: 'oklch(0.82 0.18 142)',
          dim: 'oklch(0.65 0.14 142)',
          bright: 'oklch(0.90 0.15 142)',
          glow: 'oklch(0.82 0.18 142 / 0.2)',
        },
        live: {
          DEFAULT: 'oklch(0.62 0.22 25)',
          bg: 'oklch(0.62 0.22 25 / 0.15)',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 16px)',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
        card: '0 4px 24px 0 rgba(0,0,0,0.4), 0 1px 4px 0 rgba(0,0,0,0.3)',
        electric: '0 0 20px oklch(0.82 0.18 142 / 0.3), 0 0 60px oklch(0.82 0.18 142 / 0.1)',
        live: '0 0 12px oklch(0.62 0.22 25 / 0.5)',
        glow: '0 0 40px oklch(0.82 0.18 142 / 0.15)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' }
        },
        'fade-up': {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'fade-up': 'fade-up 0.4s ease-out',
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};
