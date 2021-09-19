export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AttracDev | Design & Development',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      // { name: 'msapplication-TileColor', content: '#2d89ef'},
      // { name: 'theme-color', content: '#ffffff'}
    ],
    link: [
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.1/css/all.css'},
      { rel: 'icon', type: 'image/x-icon', href: '~/static/favicon.ico' },
      // { rel: 'apple-touch-icon', sizes: '180x180', href: '~/static/apple-touch-icon.png'},
      // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '~/static/favicon-32x32.ico' },
      // { rel: 'icon', type: 'image/x-png', sizes: '16x16', href: '~/static/favicon-16x16.ico' },
      // { rel: 'manifest', href: '/site.manifest'},
      // { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
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
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxtjs/google-fonts'
  ],

  fontawesome: {
    icons: {
      solid: true,
      regular: true,
      brands: true,
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
