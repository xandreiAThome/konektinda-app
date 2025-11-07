/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {

      fontFamily: {
        ...fontFamily,
        'sans': ['Afacad-Regular', 'system-ui', 'sans-serif'], 
        'sans-italic': ['Afacad-Italic'],
        'afacad-bold': ['Afacad-Bold'],
      },

      colors: {
        primary: {
          DEFAULT: "#2C666E",  // Teal/green from header
        },
        secondary: {
          DEFAULT: "#8B6F47",  // Brown from "Tinda"
        },
        accent: {
          DEFAULT: "#F5A962",  // Orange from profile
        },
        'brand-red': '#EB5555',
      }
    },
  },
  plugins: [],
}