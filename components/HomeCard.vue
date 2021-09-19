<template>
    <section class="card">
        <NuxtLink :to="`/services/${linkPath}`"><img :src="imgPath" alt="alt"></NuxtLink>
        <!-- <img src="https://via.placeholder.com/300x300?text=card+icon+image" alt="temp image"> -->
        <h3 class="card-header">{{ header }}</h3>
        <h5 class="card-sub-header">{{ subheader }}</h5>
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
    header: String,
    subheader: String,
    linkPath: String,
    imgPath: String,
    alt: String
  }
}
</script>

<style scoped>

</style>