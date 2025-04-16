/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito-Regular'],
        'sans-semibold': ['Nunito-SemiBold'],
        'sans-bold': ['Nunito-Bold'],
      },
    },
  },
  plugins: [],
} 