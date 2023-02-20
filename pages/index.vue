<template>
  <div class="content-container">
    <HomeGrid :id=id />
  </div>
</template>

<script>
// import here
// import here
import ContentfulPage from '~/components/ContentfulPage.vue'
import { createClient } from '~/plugins/contentful'
const contentfulClient = createClient();
export default {
    data: () => ({
        page: 'Home',
        pageType: 'landing',
        id: '6fVWWN65k4vv6WSI3SD88s'
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
    // title: String,
    // likes: Number,
    // isPublished: Boolean,
    // commentIds: Array,
    // author: Object,
    // callback: Function,
    // contactsPromise: Promise // or any other constructor
  }
}
</script>

<style scoped>
  .content-container {
    margin: 2rem;
  }
</style>
