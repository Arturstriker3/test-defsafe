/** @type {import('tailwindcss').Config} */

export default {
  theme: {
    extend: {
      colors: {
        main: '#4E2096',
        textPrimary: '#26203B',
        textSecundary: '#4D4E4E',
        stroke: '#DFE4E8',
        placeholder: '#B2B2B2',
        danger: '#E03131',
        success: '#08D58B',
      },
    },
  },
  plugins: [],
  content: [
    `/components/**/*.{vue,js,ts}`,
    `/layouts/**/*.vue`,
    `/pages/**/*.vue`,
    `/composables/**/*.{js,ts}`,
    `/plugins/**/*.{js,ts}`,
    `/utils/**/*.{js,ts}`,
    `/App.{js,ts,vue}`,
    `/app.{js,ts,vue}`,
    `/Error.{js,ts,vue}`,
    `/error.{js,ts,vue}`,
    `/app.config.{js,ts}`
  ]
}
