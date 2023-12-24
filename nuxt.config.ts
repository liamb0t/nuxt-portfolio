// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  content: {
    highlight: {
      theme: 'github-light'
    }
  },
  css: ['~/assets/css/main.css', '~/assets/css/base.css']
})
