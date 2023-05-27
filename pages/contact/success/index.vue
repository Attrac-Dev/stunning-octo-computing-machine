<template>
  <div class="success-content">
    <div class="container">
      <h2>Thank you for your submission</h2>
      <h5>We will respond as quickly as possible.</h5>
    </div>

    <NuxtLink to="/" ><button class="return-home-button">Return Home</button></NuxtLink>
  </div>
</template>

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
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 200px;
  display: block;
  margin: 0 auto;
}
</style>
