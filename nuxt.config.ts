import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo%20aplikasi%20transparant.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' },
      ],
    },
  },
  modules: ['nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true },
    '/i/**': { redirect: '/instansi/**' },
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