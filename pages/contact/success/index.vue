<template>
  <div class="success-content">
    <div class="container">
      <h2>Thank you for your submission</h2>
      <h5>We will respond as quickly as possible.</h5>
    </div>

    <NuxtLink to="/" ><button class="return-home-button">Return Home</button></NuxtLink>
  </div>
</template>

<script>
export default {
  head() {
      return {
        title: this.title,
        meta: [
          { name: 'robots', content: 'noindex, nofollow' }, // Set the value to "noindex, nofollow" to prevent indexing and following
          { name: 'author', content: this.author },
        ]
      }
    },
    data() {
      return {
        // page data
        title: 'Thank You for Your Submission | AttracDev',
        author: 'AttracDev',
      }
    }

}
</script>

<style scoped>
h2,
h5 {
  text-align: center;
  margin: 1rem;
}

.container {
  padding: 2rem;
}

.success-content {
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 5px;
  margin-top: -50px; /* Adjust the margin-top value as needed */
}

.return-home-button {
  background-color: var(--brand-indigo);
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
  max-width: 200px;
  display: block;
  margin: 0 auto;
}

.return-home-button:active, .return-home-button:hover {
  background-color: var(--brand-blue);
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}
</style>
