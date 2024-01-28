/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },  // Use opacity instead of transform
          '100%': { opacity: 1 },
        },
        flipBottom: {
          '100%': { transform: 'rotateX(90deg)' },
        },
        flipTop: {
          '100%': { transform: 'rotateX(0deg)' },
        },
      },
      animation: {
        'fadeIn': 'fadeIn 300ms ease-in-out',
        'fadeSmooth': 'fadeIn 100ms ease-in',
        'flip-bottom': 'flipBottom 2s ease-in',
        'flip-top': 'flipTop 2s ease-in',
      },
    },
  },
  plugins: [],
}
