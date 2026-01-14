/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        'np-navy': '#002F6C',
        'np-gold': '#F2A900',
        'np-red': {
          500: '#E31837',
          600: '#D1122E', // Official-ish red
          700: '#B00F25',
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'apple': '0 10px 40px -10px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
