<template>
  <div>
    <!-- Show form or confirmation message based on formSubmitted state -->
    <form 
      name="newsletter-signup"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
      v-if="!formSubmitted"   
      @submit.prevent="submitForm"
    >
      <input name="bot-field" class="hidden">
      <input
        type="email"
        name="email"
        placeholder="Enter email address"
        v-model="email"
      />
      <input
        type="submit"
        value="Subscribe"
      />
      <p v-if="formSubmitted && !isValidEmail()" class="error-message">
        Please enter a valid email address.
      </p>
    </form>
    <div v-else>
      <!-- Confirmation message markup here -->
      <p>Thank you for subscribing!</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formSubmitted: false, // Track form submission state
      email: "", // Other data properties for form fields, e.g. email
    };
  },
  methods: {
    isValidEmail() {
      // You can add your own validation logic here
      // This is a simple example that checks for a basic email format
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    submitForm() {
      if (this.isValidEmail()) {
        // Success: Email is valid, implement your subscribe logic here
        console.log("Subscribed with email:", this.email);
        this.formSubmitted = true;
      } else {
        // Error: Invalid email, show error message
        console.error("Invalid email:", this.email);
        this.formSubmitted = false; // Set formSubmitted to false to show the error message
      }
    },
  },
};
</script>
  
  <style scoped>
  form {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  
  input[type="email"] {
    border: 0;
    padding: 0.625rem;
    margin-top: 0.3125rem;
    width: 13rem;
    background-color: var(--brand-white);
  }
  
  input[type="submit"] {
    background-color: var(--brand-indigo);
    color: var(--brand-white);
    cursor: pointer;
    border: 0;
    padding: 0.625rem 0.9375rem;
    margin-top: 0.3125rem;
  }
  
  input[type="submit"]:hover {
    background-color: var(--highlight-color);
  }
  
  .error-message {
    color: red;
    margin-top: 0.3125rem;
  }

  .hidden {
    visibility: hidden;
    position: absolute; /* Add absolute positioning to the honeypot input field */
    top: 0; /* Position the honeypot input field at the top */
    left: 0; /* Position the honeypot input field at the left */
    width: 100%; /* Make the honeypot input field span the full width of the form */
    z-index: 1; /* Set z-index to make sure the honeypot input field appears above other elements */
}
  </style>
  