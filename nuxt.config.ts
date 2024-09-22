import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },

  runtimeConfig: {
    app: {
      databaseUrl: process.env.DATABASE_URL,
      directUrl: process.env.DIRECT_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    'nuxt-icon-tw',
    ['@nuxtjs/google-fonts', {
      families: {
        Inter: true,
      },
    }],
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins = config.plugins || [];
        
        config.plugins.push(
          vuetify({
            autoImport: true,
          })
        )
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/'],
      cookieRedirect: true,
    },
  }
})