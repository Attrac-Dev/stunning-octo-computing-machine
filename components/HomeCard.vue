<template>
    <section class="card">
        <img :src="imgPath" alt="alt">
        <h3 class="card-header">{{ header }}</h3>
        <p class="card-sub-header">{{ subheader }}</p>
        <NuxtLink :to="`/services/${linkPath}`"><button class="cta-text">{{ ctaText }}</button></NuxtLink>
    </section>
</template>

<script>
// import here
export default {
    data: () => ({

    }),
// Directive has a set of lifecycle hooks:
  // called before bound element's attributes or event listeners are applied
  created() {},
  // called before bound element's parent component is mounted
  beforeMount() {},
  // called when bound element's parent component is mounted
  mounted() {},
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
      required: true
    },
    subheader: {
      type: String,
      required: true
    },
    linkPath: {
      type: String,
      required: true
    },
    imgPath: {
      type: String,
      required: true
    },
    alt: {
      type: String, 
      required: true
    },
    ctaText: {
      type: String,
      default: 'Learn More'
    }
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