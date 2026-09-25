import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true },
    '/kebijakan-privasi': { prerender: true },
    '/kebijakan-token': { prerender: true },
    '/panduan': { prerender: true },
    '/syarat-ketentuan': { prerender: true },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})