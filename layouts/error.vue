<template>
  <div v-bind:class="[{ 'body-container': errorType() }, { 'error-container': !errorType() } ]">
    <div v-if="errorType()">
        <!-- <h1 class="not-found-header">I think we're lost.</h1>
        <h3 class="not-found-header"> Better turn back <NuxtLink class="home-link" to="/">Home</NuxtLink></h3> -->
        <img class="not-found-img" src="~/static/Oops 404 Error with a broken robot-bro.svg" alt="404 robot illustration">
        <h5 class="not-found-header bottom-text">{{ error.message }}</h5>
        <h5 class="not-found-header bottom-text">Return <NuxtLink class="home-link" to="/">Home</NuxtLink></h5>
    </div>
    <div v-else>
        <h1 class="error-header">Error {{ error.statusCode }}</h1>
        <h3 class="error-header">Return <NuxtLink class="error-home-link" to="/">Home</NuxtLink></h3>
        <img class="error-img" src="~/static/404-bro.svg" alt="Question mark illustration">
        <h5 class="error-header">{{ error.message }}</h5>
    </div>
    
    
  </div>
</template>

<script>
  export default {
    data: () => ({
        page: 'Error Page',
        pageType: 'error',
    }),
    props: ['error'],
    methods: {
      // component specific methods here
      errorType: function () {
          return (this.error.statusCode === 404) // either will return true if 404 or false if not
      }

    },
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

<style scoped>
    /* classes for both pages */

    h3 {
        font-weight: 400;
    }
    h5 {
        font-weight: 100;
    }

    /* not found (404) classes */
    .not-found-header {
        color: #263138;
    }
    .body-container {
        min-width: 275px;
        padding: 2rem 0;
        text-align: center;
        background-color: var(--brand-white);
    }
    .home-link {
        text-decoration: underline;
        color: var(--brand-blue);
    }
    .home-link:hover {
        color: var(--highlight-color);
    }
    .not-found-img {
        padding: 0;
        width: 100vw;
        height: auto;
        min-width: 260px;
        margin: auto;


    }

    .bottom-text {
        position: relative;
        top: -2rem;
    }
    
    /* error (non-404) classes */
    .error-header {
        color: var(--brand-white);
    }
    .error-home-link {
        color: var(--brand-light-off-white);
        text-decoration: underline;
    }
    .error-home-link:hover {
        color: var(--brand-blue);
    }
    .error-container {
        min-width: 275px;
        padding: 5rem 0;
        text-align: center;
        background-color: var(--brand-indigo);
    }
    .error-img {
        padding: 1rem 0;
        width: 80vw;
        height: auto;
        min-width: 260px;
        margin: auto;
    }
    /* small break points */
    @media all and (min-width: 576px) {
        /* classes for both pages */

        h3 {
 
            font-weight: 400;
        }
        h5 {
    
            font-weight: 100;
        }
    }
    /* meduim break points */
    @media all and (min-width: 768px) {
        /* classes for both pages */

        h3 {

            font-weight: 400;
        }
        h5 {

            font-weight: 100;
        }
        /* not found classes */
        .not-found-img {
            padding: 0;
            width: 75vw;
            height: auto;
            min-width: 260px;
            margin: auto;

        }
        .bottom-text {
            position: relative;
            top: -5rem;
        }
    }
    /* large break points */
    @media all and (min-width: 992px) {
        /* classes for both pages */

        h3 {

            font-weight: 400;
        }
        h5 {
 
            font-weight: 100;
        }
        /* not found classes */
        .not-found-img {
            padding: 0;
            width: 75vw;
            height: auto;
            min-width: 260px;
            margin: auto;
            max-width: 900px;

        }
        .bottom-text {
            position: relative;
            top: -6rem;
        }
    }
    /* extra large break points */
    @media all and (min-width: 1200px) {
        /* not found classes */
        .not-found-img {
            padding: 0;
            width: 85vw;
            height: auto;
            min-width: 260px;
            margin: auto;
            max-width: 900px;

        }
        .bottom-text {
            position: relative;
            top: -10rem;
        }
    }

</style>
