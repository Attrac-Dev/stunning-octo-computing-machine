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
      <!-- <transition name="fade">
      <div v-if="!isValidEmail() && formTried > 0">
        <p class="error-message">
          Please enter a valid email address.
        </p>
      </div>
    </transition> -->

    <transition name="fade">
      <div v-if="errorMessage">
        <p class="error-message">
          {{ errorMessage }}
        </p>
      </div>
    </transition>

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
      errorMessage: "",
      interval: null,
      countdown: 15,
      fadeError: false
    
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
    clearErrors() {
      // clear the input first
      // set fadeError to true
      this.interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.interval)
          // check if formTried != 0
          if (this.formTried !== 0) {
            this.errorMessage = ''
            this.validEmail = false
            this.formTried = 0

            // clear input field
            this.email = ''

          }
        }
      }, 1000) // 1 second intervals
    },
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
              this.interval = null // stop any previous error interval
              this.errorMessage = "" // get rid of the previous error message
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
          this.clearErrors()
          // start a 25 second timer to clear error and input field


          if (error.message === "Email already subscribed") {
            this.validEmail = true
            this.formSubmitted = false
            this.clearErrors()
          }
        }
      } else {
        // Error: Invalid email, show error message
        console.error("Invalid email:", this.email);
        this.formSubmitted = false; // Set formSubmitted to false to show the error message
        this.errorMessage = "Please enter a valid email address"
        this.clearErrors()
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

input:focus-visible {
  outline: 3px solid var(--accent-color);
  outline-offset: -3px;
}

input[type="submit"] {
  background-color: var(--accent-color);
  color: var(--brand-white);
  cursor: pointer;
  border: 0;
  padding: 0.625rem 0.9375rem;
  margin-top: 0.3125rem;
}

input[type="submit"]:hover {
  background-color: var(--brand-blue);
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}

.error-message {
  color: var(--accent-color);
  opacity: 1;
  transition: opacity 1s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
