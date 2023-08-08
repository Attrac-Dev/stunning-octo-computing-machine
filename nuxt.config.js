import dotenv from "dotenv" 
dotenv.config()

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    fallback: true
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-QKWQ9ZYTWN",
        async: true,
      },
      {
        src: "js/ga.js",
      }
    ],
    // title: 'AttracDev | Design & Development',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-webb-app-capable', content: 'yes'},
      { name: 'theme-color', content: '#18314F'} // uses the brand-indigo color for the theme

    ],
    link: [
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.1/css/all.css'},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      if (process.env.ENVIRONMENT === 'development') {
        console.log('Page transitioned')
      }
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/styles/vars.css',
    '~/styles/normalize.css',
    '~/styles/hamburgers.css',
    // '~/styles/misc.css',
    '~/styles/transitions.css',
    '~/styles/typography.css',
    '~styles/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/contentful",
    { src: "~/plugins/aos", mode: "client" },
    { src: "~/plugins/supabase.js"}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxtjs/google-fonts',

  ],

  fontawesome: {
    icons: {
      solid: true,
      regular: true,
      brands: true,
    }
  },

  googleFonts: {
    families: {
      'Assistant': true, 
      'Karla': true,
    }
  },

  // environment variables
  env: {
    CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
    CONTENTFUL_ACCESSTOKEN: process.env.CONTENTFUL_ACCESSTOKEN,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    EMAIL_KEY: process.env.EMAIL_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SIGN_UP: process.env.SIGN_UP, // used to determine if users are allowed to use the signup form or not ('active' or 'inactive')
    ENVIRONMENT: process.env.ENVIRONMENT
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
