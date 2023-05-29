<!-- <template>
<div class="body-container">
      <Navigation />
      <Nuxt/>
      <Footer />
</div>
</template> -->\

<template>
      <div class="body-container">
        <Navigation />
        <div class="content-container">
          <Nuxt/>
        </div>
        <Footer />
      </div>
</template>
    
<script>
export default {
  data() {
    return {
      gAnalyticsId: process.env.G_ANALYTICS_ID
    };
  },
  head() {
    const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${this.gAnalyticsId}`;

    return {
      script: [
        {
          src: scriptSrc,
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(...args) { dataLayer.push(args); }
            gtag('js', new Date());
            gtag('config', '${this.gAnalyticsId}');
          `
        }
      ]
    };
  },
  mounted() {
    this.initializeGoogleAnalytics();
    this.updateGoogleAnalytics();
  },
  methods: {
    initializeGoogleAnalytics() {
      if (process.env.ENVIRONMENT === 'development') {
        console.log('Initializing Google Analytics. . .')
      }
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args) => { window.dataLayer.push(args); };
      window.gtag('js', new Date());
      window.gtag('config', this.gAnalyticsId);
    },
    updateGoogleAnalytics() {
      if (typeof window.gtag !== 'undefined') {
        if (process.env.ENVIRONMENT === 'development') {
          console.log('Updating Google Analytics. . .')
        }
        window.gtag('event', 'page_view', {
          page_path: this.$route.fullPath
        });
      }
    }
  },
  watch: {
    $route(to, from) {
      this.updateGoogleAnalytics();
    }
  }
};
</script>
    
