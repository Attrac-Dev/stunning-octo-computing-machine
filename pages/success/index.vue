<template>
  <div class="content-container">
      <!-- Access formSubmitted state from Vuex store in template -->
      <h1 v-if="formSubmitted">Success Page</h1>
      <h1 v-else>Error Page</h1>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['formSubmitted']) // Map formSubmitted state from Vuex store to computed property
    }
  };
  </script>
  