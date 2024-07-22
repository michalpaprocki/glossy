/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.pug"],
  theme: {
    extend: {
      gridTemplateColumns: {
        repeat: "repeat(auto-fill, minmax(100px, 1fr)) ;"
      }
    },
  },
  plugins: [],
}

