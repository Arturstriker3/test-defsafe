import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
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
    },
  })
  app.vueApp.use(vuetify)
})