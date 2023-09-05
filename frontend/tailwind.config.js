/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      "btn" : "#6366f1",
      "white" : "#ffffff",
      "black" : "#000000",
      "blue" : "#18a9ea",
      "red" : "#FF6969",
      "green" : "#5B9A8B",
      "yellow" : "#FFC436",
      "gray" : "#AEC3AE",
      "dark" : "#0f172a",
      "dark-card" : "#1e293b",
      "light" : "#f8fafc",
      "light-card" : "#ffffff",
      "transparent" : "transparent"
    }
  },
  plugins: [],
  darkMode: 'class',
}

