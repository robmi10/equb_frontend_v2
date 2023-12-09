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
        flipBottom: {
          '100%': { transform: 'rotateX(90deg)' },
        },
        flipTop: {
          '100%': { transform: 'rotateX(0deg)' },
        },
      },
      animation: {
        'flip-bottom': 'flipBottom 2s ease-in',
        'flip-top': 'flipTop 2s ease-in',
      },
    },
  },
  plugins: [],
}
