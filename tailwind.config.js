/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        ...fontFamily,
        sans: ['Afacad-Regular', 'system-ui', 'sans-serif'],
        'sans-italic': ['Afacad-Italic'],
        'afacad-bold': ['Afacad-Bold'],
      },

      colors: {
        primary: {
          DEFAULT: '#2C666E', // Teal/green from header
        },
        secondary: {
          DEFAULT: '#8B6F47', // Brown from "Tinda"
        },
        accent: {
          DEFAULT: '#F5A962', // Orange from profile
        },
        'brand-red': '#EB5555',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        Afacad: ['Afacad', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
