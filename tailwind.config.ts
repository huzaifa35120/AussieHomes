import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C0392B',
          dark: '#922B21',
          light: '#E74C3C',
          50: '#FDF3F2',
          100: '#FBE4E1',
          200: '#F6C8C2',
          300: '#EE9F95',
          400: '#E2705F',
          500: '#C0392B',
          600: '#A82F23',
          700: '#8C271D',
          800: '#7B1818',
          900: '#5C1212',
        },
        brand: {
          red: '#C0392B',
          darkred: '#7B1818',
          orange: '#E05A2B',
          ink: '#14100F',
          paper: '#FBF8F7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,16,15,0.04), 0 1px 3px rgba(20,16,15,0.06)',
        lift: '0 18px 40px -12px rgba(20,16,15,0.16), 0 6px 14px -6px rgba(20,16,15,0.08)',
        deep: '0 32px 64px -18px rgba(20,16,15,0.24), 0 10px 24px -12px rgba(20,16,15,0.10)',
        red: '0 16px 36px -12px rgba(192,57,43,0.45)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionDuration: {
        400: '400ms',
        900: '900ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      maxWidth: {
        content: '80rem',
      },
    },
  },
  plugins: [],
}
export default config
