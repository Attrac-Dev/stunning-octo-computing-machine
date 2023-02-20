<template>
    <section class="card">
        <img class="main-page-image grid-item fade-in" v-if="imgPath" :src="imgPath" v-bind:alt="alt">
        <h3 class="card-header">{{ header }}</h3>
        <p class="card-sub-header">{{ subheader }}</p>
        <NuxtLink :to="`/services/${nuxtlinkPath}`"><button class="cta-text">{{ ctaText }}</button></NuxtLink>
    </section>
</template>

<script>
/// import here

export default {
    data: () => ({
     
    }),
// Directive has a set of lifecycle hooks:
  // called before bound element's attributes or event listeners are applied
  async created() {

  },
  created() {},
  // called before bound element's parent component is mounted
  beforeMount() {},
  // called when bound element's parent component is mounted
  mounted() {
     
  },
  // called before the containing component's VNode is updated
  beforeUpdate() {},
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated() {},
  // called before the bound element's parent component is unmounted
  beforeUnmount() {},
  // called when the bound element's parent component is unmounted
  unmounted() {},
  methods: {
      // component specific methods here
  },
  props: {
    // examples of props object:
    header: {
      type: String,
      default: "some string"
    },
    subheader: {
      type: String,
      default: "some string"
    },
    imgPath: {
      type: String,
      default: "some string"
    },
    alt: {
      type: String,
      default: "some string"
    },
    nuxtlinkPath: {
      type: String,
      default: "some string"
    },
    ctaText: {
      type: String,
      default: "Learn More"
    },

  }
}
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: white;
  }
  img {
    height: 175px;
    margin-bottom: 1rem;
  }
  h3 {
    margin: 0.5rem 0 1rem 0;
  }
  p {
    margin: 1rem 0 2rem 0;
    padding: 0 2rem 0 2rem;
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  .cta-text {
    background: none;
    border: none;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    outline: inherit;
    font-size: 1.5rem;
    background-color: transparent;
    padding: 1rem;
    /* no shadow */
  }
</style>