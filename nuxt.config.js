import dotenv from "dotenv" 
dotenv.config()

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'AttracDev | Design & Development',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },

    ],
    link: [
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.1/css/all.css'},
      { rel: 'icon', type: 'image/png', href: '~/static/favicon-32x32.png?v2' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '~/static/apple-touch-icon.png?v2'},
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '~/static/favicon-32x32.ico?v2' },
      { rel: 'icon', type: 'image/x-png', sizes: '16x16', href: '~/static/favicon-16x16.ico?v2' },
      // { rel: 'manifest', href: '/site.manifest'},
      { rel: 'mask-icon', href: '~/static/safari-pinned-tab.svg?v2', color: '#5bbad5' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/styles/vars.css',
    '~/styles/normalize.css',
    '~/styles/hamburgers.css',
    '~/styles/misc.css',
    '~/styles/transitions.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/contentful"
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

  // environment variables
  env: {
    CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
    CONTENTFUL_ACCESSTOKEN: process.env.CONTENTFUL_ACCESSTOKEN,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
