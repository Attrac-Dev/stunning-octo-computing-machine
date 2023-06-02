<template>
  <div v-if="signupActive" class="content-container">
    <h1>Sign Up</h1>
    <div class="signup-form">
      <form>
        <div class="form-group">
          <label for="Fname">First Name</label>
          <input type="Fname" id="Fname" v-model="name.Fname" required />
          <div v-if="FnameError" class="error">{{ FnameError }}</div>
        </div>
        <div class="form-group">
          <label for="Lname">Last Name</label>
          <input type="Lname" id="Lname" v-model="name.Lname" required />
          <div v-if="LnameError" class="error">{{ LnameError }}</div>
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="phone" id="phone" v-model="phone" required />
          <div v-if="phoneError" class="error">{{ phoneError }}</div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
          <div v-if="emailError" class="error">{{ emailError }}</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
          
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
          <div v-if="passwordMatchError" class="error">{{ passwordMatchError }}</div>
        </div>
        <button type="submit" @click.prevent="signup">Sign Up</button>
      </form>
    </div>
  </div>

  <div v-else class="signup-content">
    <div class="container">
      <h2>Sign Up</h2>
      <h5>Only Available to current clients.</h5>
      <p class="centered-text">Redirecting you back to the Home page in <strong class=count>{{ countdown }}</strong></p>
    </div>
      <button class="request-account-button" @click="requestLogin">Request Account</button>
      <button class="return-home-button" @click="returnHome">Return Home</button>
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
      email: '',
      name: {Fname:'', Lname: ''},
      phone: '',
      password: '',
      confirmPassword: '',
      emailError: '',
      FnameError: '',
      LnameError: '',
      phoneError: '',
      passwordMatchError: '',
      signupActive: '',
      countdown: 15,
      interval: null,
      // page data
      title: 'User Sign Up | AttracDev',
      author: 'AttracDev',
    }
  },
  methods: {
    returnHome() {
        clearInterval(this.interval);
        try {
          this.$router.push('/');
        } catch (error) {
          console.error('Error navigating to "/"" :', error);
        }
      },
      requestLogin() {
        clearInterval(this.interval);
        try {
          this.$router.push('/contact');
        } catch (error) {
          console.error('Error navigating to "/contact" :', error);
        }
      },
    countDownInterval() {
      this.interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.interval)
          try {
          this.$router.push('/');
          } catch (error) {
            console.error('Error navigating to home:', error);
          }
        }
      }, 1000) // 1 second intervals
    },
    isActive() {
      if (process.env.SIGN_UP === "active") {
        console.log('Signup Form is available')
        this.signupActive = true
      } else {
        console.log('Signup Form is not available')
        this.signupActive = false
        // start a 10 second timer to then redirect the user to the home page
        this.countDownInterval()
      }
    },
    clearInputs() {

    },
    redirectToLoginPage() {
      this.$router.push('/auth/login')
    },
    async signup() {
      this.emailError = '';
      this.nameError = '';
      this.phoneError = '';
      this.passwordMatchError = '';

      // Email validation
      if (!this.email) {
        this.emailError = 'Email is required';
        return;
      }
      if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.emailError = 'Invalid email format';
        return;
      }

      // First Name validation
      if (!this.name.Fname) {
        this.FnameError = 'First Name is required';
        return;
      }

      // Last Name validation
      if (!this.name.Lname) {
        this.LnameError = 'You are not Madonna... Last name is required';
        return;
      }

      // Phone validation
      if (!this.phone) {
        this.phoneError = 'Phone is required';
        return;
      }
      if (!/^\d{10}$/.test(this.phone)) {
        this.phoneError = 'Invalid phone number format';
        return;
      }

      // Password validation
      if (!this.password) {
        this.passwordMatchError = 'Password is required';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.passwordMatchError = 'Passwords do not match';
        return;
      }

      const { data, error } = await this.$supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          redirectTo: '/',
          phone: this.phone,
          data: {
            name: this.name,
          },
        },
      })

      if (error) {
        console.error('SignUp Error:', error.message)
      } else {
        // Clear form on successful submit
        this.name = {Fname:'', Lname: ''}
        this.phone = ''
        this.email = ''
        this.password = ''
        this.confirmPassword = ''

        // Show success message to user
        // redirect users to login page
        this.redirectToLoginPage()

      }
    }
  },
  mounted() {
    this.isActive()
  }
}
</script>

  
<style scoped>
.signup-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: grid;
  grid-template-columns: 3fr;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  width: 30vw;
}

#email {
  width: 100%;
}

#password {
  background: white;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.request-account-button {
  padding: 1rem 2rem;
  border: 1px solid var(--brand-indigo);
  border-radius: 3px;
  background-color: var(--brand-indigo);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

button.request-account-button:hover {
  background-color: var(--brand-blue);
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}


.return-home-button {
  padding: 1rem 2rem;
  border: 1px solid var(--brand-indigo);
  border-radius: 3px;
  background-color: transparent;
  color: var(--brand-indigo);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

button.return-home-button:hover {
  background-color: var(--accent-color);
  color: white;
  border: 1px solid var(--brand-white);
  outline: 2px solid var(--brand-indigo);
  outline-offset: -2px;
}


.error-message {
  color: var(--brand-indigo);
}

.signup-content {
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 5px;
  margin-top: -50px; /* Adjust the margin-top value as needed */
}

.container {
  padding: 2rem;
}

.centered-text {
  text-align: center;
  margin: 0.5rem 0;
}

h2, h5, p {
    text-align: center;
    margin: 1rem;
}

.count {
  font-weight: 600;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
}

.cta-button {
      margin: 1rem 0;
      transition: background-color 0.3s ease;
    }

</style>

  