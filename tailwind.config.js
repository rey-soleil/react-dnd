const { fontFamily } = require('tailwindcss/defaultTheme')
const themes = require('daisyui/src/theming/themes')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,astro,vue,svelte}'],
  darkMode: ['class', '[data-theme="light"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('daisyui'), require('tailwindcss-animate')],
  daisyui: {
    themes: [
      {
        light: {
          ...themes['[data-theme=light]'],
          primary: '#10aebd',
          secondary: '#42DEE1',
          accent: '#6DECB9',
        },
      },
    ],
  },
}
