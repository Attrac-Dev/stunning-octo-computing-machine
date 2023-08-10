import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: 'G-QKWQ9ZYTWN' },
  // enable for production only
  enabled: process.env.ENVIRONMENT === 'production'
})