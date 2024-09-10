/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,tsx,jsx}", "./components/**/*.{js,ts,tsx,jsx}"],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
}

