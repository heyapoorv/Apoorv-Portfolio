/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        space: {
          DEFAULT: '#000000', // pure black
          surface: '#111111',
          light: '#222222',
          border: '#333333',
        },
        accent: {
          cyan: '#ff2a2a', // repurpose 'cyan' as the primary red for less refactoring, but I should rename it. Let's rename to red
          red: '#ff2a2a',
          purple: '#8a2be2',
          pink: '#ff007f',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
