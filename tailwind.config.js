const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-sans)', ...fontFamily.sans],
      },
      animation: {
        'fadein': 'fade-in 300ms ease-out backwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { 'opacity': '0' }
        }
      }
    },
  },
  plugins: [],
}
