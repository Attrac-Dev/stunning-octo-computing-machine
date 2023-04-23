<template>
  <div>
    <!-- Show form or confirmation message based on formSubmitted state -->
    <form v-if="!formSubmitted" @submit.prevent="submitForm">
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
import { createNewsletterContact } from "../functions/sendInBlue"
import { setCookie, getCookie } from '../functions/cookies'

export default {
  data() {
    return {
      formSubmitted: false, // Track form submission state
      email: "" // Other data properties for form fields, e.g. email
    };
  },
  mounted() {
    const cookie = getCookie('contact')
      if (cookie) {
        console.log(cookie)
        this.formSubmitted = true
      }
  },
  methods: {
    isValidEmail() {
      // This is a simple validation that checks for a basic email format
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    async submitForm() {
      console.log('submitForm called')

      if (this.isValidEmail() && !this.formSubmitted) {
        try {
          // Success: Email is valid, implement your subscribe logic here
          const contact = await createNewsletterContact(this.email)
          if (contact) {
            console.log("Subscribed with email:", this.email)
              this.formSubmitted = true
              setCookie("contact", this.email, 1)
          } else {
            console.error(`New contact not created with ${this.email}`)
            this.formSubmitted = false
          }
        } catch(error) {
          // No need to pass on the error to the user. It is just a repeat of the main error
          this.formSubmitted = false
        }
      } else {
        // Error: Invalid email, show error message
        console.error("Invalid email:", this.email);
        this.formSubmitted = false; // Set formSubmitted to false to show the error message
      }
    },
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
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
</style>
