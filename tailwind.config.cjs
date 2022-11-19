/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  darkMode: 'media',

  plugins: [require('flowbite/plugin')],
}
