export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/fonts',
    'nuxt-auth-utils',
  ],
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      { name: 'Montserrat Alternates', provider: 'google' }
    ]
  },

  image: {
    domains: ['res.cloudinary.com'],
    cloudinary: {
      baseURL: `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/`
    }
  },

  //SEO
  app: {
    head: {
      title: 'Mi tienda de servicios',
      meta: [
        {
          name: 'description',
          content: 'Bienvenido a mi tienda de servicios generales.',
        },
      ],
    },
  },

  //MODE RENDERING
  nitro: {
    prerender: {
      routes: ['/', '/about', '/community'],
      ignore: ['/dashboard', '/dashboard/**', '/products', '/api/**'],
      crawlLinks: true,
    },
  },


})