// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  css: ['~/assets/main.css', 
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.css',
        '@vuepic/vue-datepicker/dist/main.css'],
  build: {
    transpile: ['vuetify', 'chart.js', '@vuepic/vue-datepicker'],
  },
})
