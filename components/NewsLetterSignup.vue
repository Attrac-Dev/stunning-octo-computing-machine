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
      
    </form>
    <div v-if="!isValidEmail() && formTried>0">
        <p >
          Please enter a valid email address.
        </p>
      </div>
      <div v-if="errorMessage" class="error-message">
        <p>
          {{ errorMessage }}
        </p>
      </div>
  </div>
</template>

<script>
import { createNewsletterContact } from "../functions/sendInBlue"
import { setCookie, getCookie, hasCookie, getCookies } from '../functions/cookies'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      formSubmitted: false, // Track form submission state
      formTried: 0,
      validEmail: false,
      subscriberEmail: null,
      email: "", // Other data properties for form fields, e.g. email
      errorMessage: ""
    
    };
  },
  mounted() {
    const cookieData = getCookie('subscriber')
    const contactData = cookieData ? JSON.parse(cookieData) : null
    if (contactData) {
      if (contactData.newsletter) {
        console.log(contactData)
        this.setHasSubscribed(getCookie('subscriber'))
        // Skip setting the component data and just pass the cookie to state
        //    which will handle the conditional rendering, instead of trying to do it here.
        // this.formSubmitted = true
        // this.subscriberEmail = contactData.email
      } else {
        console.log('"subscriber" cookie found, but newsletter value set to false')
        this.formSubmitted = false
      }
    } else {
      const hasAnyCookie = hasCookie()
      if (hasAnyCookie != 0) {
        const cookieList = getCookies()
        cookieList.forEach((cookie) => {
          console.log(`Cookie Found: ${cookie.name}:${cookie.value}`);
        });

      } else {
        console.log('No cookies were found')
      }
    }
  },
  methods: {
    ...mapMutations(['setHasSubscribed']),
    isValidEmail() {
      // This is a simple validation that checks for a basic email format
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    async submitForm() {
      console.log('trying to submit form')
      this.formTried += 1
      if (this.isValidEmail() && !this.formSubmitted) {
        try {
          // Success: Email is valid, implement your subscribe logic here
          const contact = await createNewsletterContact(this.email)
          if (contact) {
            console.log("Subscribed with email:", this.email)
              this.formSubmitted = true
              const contactData = {email:this.email, newsletter: true, date: Date.now()}
              const cookieData = JSON.stringify(contactData)
              setCookie("subscriber", cookieData, 7, {sameSite:'Strict'}) // sets the subscriber cookie with JSON as its value with a 7 day expiration
              this.setHasSubscribed(getCookie('subscriber'))
          } else {
            console.error(`New contact not created with ${this.email}`)
            this.validEmail = true
            this.formSubmitted = false

            // Display the error message to user
            this.errorMessage = "Email already subscribed"
          }
        } catch(error) {
          // No need to pass on the error to the user. It is just a repeat of the main error
          console.log({formError: error})
          this.errorMessage = error.message
          this.formSubmitted = false

          if (error.message === "Email already subscribed") {
            this.validEmail = true
            this.formSubmitted = false
          }
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
}

.email-message {
  color: var(--brand-indigo);
}
</style>
