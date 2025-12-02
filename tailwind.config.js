/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          dark: '#1a4d2e', // Deep Forest Green
          primary: '#2e7d32', // Leaf Green
          light: '#a5d6a7', // Pale Green
          brown: '#5d4037', // Earth Brown
          tan: '#d7ccc8', // Paper Tan
          cream: '#fff8e1', // Old Paper
          accent: '#bf360c', // Rust/Mushroom Red
        }
      },
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'],
        sans: ['"Lato"', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
      }
    },
  },
  plugins: [],
}