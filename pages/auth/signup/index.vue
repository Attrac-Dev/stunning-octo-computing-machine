<template>
  <div class="content-container">
    <h1>Sign Up</h1>
    <div class="signup-form">
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required />
          <span class="error-message" v-if="validationErrors.name">{{ validationErrors.name }}</span>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
          <span class="error-message" v-if="validationErrors.email">{{ validationErrors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
          <span class="error-message" v-if="validationErrors.password">{{ validationErrors.password }}</span>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
          <span class="error-message" v-if="validationErrors.confirmPassword">{{ validationErrors.confirmPassword }}</span>
        </div>
        <div class="form-group">
          <label for="company-name">Company Name</label>
          <input type="text" id="company-name" v-model="companyName" required />
          <span class="error-message" v-if="validationErrors.companyName">{{ validationErrors.companyName }}</span>
        </div>
        <div class="form-group">
          <label for="company-street">Street Address</label>
          <input type="text" id="company-street" v-model="companyAddress.street" required />
          <span class="error-message" v-if="validationErrors.companyAddress?.street">{{ validationErrors.companyAddress?.street }}</span>
        </div>
        <div class="form-group">
          <label for="company-street2">Street Address 2</label>
          <input type="text" id="company-street2" v-model="companyAddress.street2" />
        </div>
        <div class="form-group">
          <label for="company-city">City</label>
          <input type="text" id="company-city" v-model="companyAddress.city" required />
          <span class="error-message" v-if="validationErrors.companyAddress?.city">{{ validationErrors.companyAddress?.city }}</span>
        </div>

        <div class="form-group">
          <label for="company-address-state">Company Address: State</label>
          <select id="company-address-state" v-model="companyAddress.state" required>
            <option disabled value="">Select a state</option>
            <option v-for="state in stateOptions" :value="state.value" :key="state.value">{{ state.label }}</option>
          </select>
      </div>
        <div class="form-group">
          <label for="company-zip">Zip Code</label>
          <input type="text" id="company-zip" v-model="companyAddress.zip" required />
          <span class="error-message" v-if="validationErrors.companyAddress?.zip">{{ validationErrors.companyAddress?.zip }}</span>
        </div>
        <div class="form-group">
          <label for="company-phone">Phone Number</label>
          <input type="text" id="company-phone" v-model="companyPhone" required />
          <span class="error-message" v-if="validationErrors.companyPhone">{{ validationErrors.companyPhone }}</span>
        </div>
        <button type="submit" @click.prevent="signup">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import {getStateOptions, validateZipCode} from '../../../functions/signUpValidation'
export default {
  data() {
    return {
      stateOptions: '',
      inviteCode: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      companyAddress: {
        street: '',
        street2: '',
        city: '',
        state: '',
        zip: ''
      },
      companyPhone: '',
      validationErrors: {},
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },
  methods: {
    getStates() {
      this.stateOptions = getStateOptions()
    },
    zipValidation() {
      return validateZipCode(this.companyAddress.zip)
    },
    async validateForm() {
    this.validationErrors = {}

    // Validate name
    if (!this.name) {
      this.$set(this.validationErrors, 'name', 'Name is required.')
    }

    // Validate email
    if (!this.email) {
      this.$set(this.validationErrors, 'email', 'Email is required.')
    } else if (!this.emailRegex.test(this.email)) {
      this.$set(this.validationErrors, 'email', 'Invalid email address.')
    }

    // Validate password
    if (!this.password) {
      this.$set(this.validationErrors, 'password', 'Password is required.')
    } else if (this.password.length < 8) {
      this.$set(this.validationErrors, 'password', 'Password must be at least 8 characters long.')
    }

    // Validate confirm password
    if (this.password !== this.confirmPassword) {
      this.$set(this.validationErrors, 'confirmPassword', 'Passwords do not match.')
    }

    // Validate company name
    if (!this.companyName) {
      this.$set(this.validationErrors, 'companyName', 'Company name is required.')
    }

    // Validate company address
    if (!this.companyAddress.street) {
      this.$set(this.validationErrors, 'companyAddress.street', 'Street address is required.')
    }

    if (!this.companyAddress.city) {
      this.$set(this.validationErrors, 'companyAddress.city', 'City is required.')
    }

    if (!this.companyAddress.state) {
      this.$set(this.validationErrors, 'companyAddress.state', 'State is required.')
    }

    if (!this.companyAddress.zip) {
      this.$set(this.validationErrors, 'companyAddress.zip', 'Zip code is required.')
    } else if (!this.zipRegex.test(this.companyAddress.zip)) {
      this.$set(this.validationErrors, 'companyAddress.zip', 'Invalid zip code.')
    }

    // Validate company phone
    if (!this.companyPhone) {
      this.$set(this.validationErrors, 'companyPhone', 'Phone number is required.')
    } else if (!this.phoneRegex.test(this.companyPhone)) {
      this.$set(this.validationErrors, 'companyPhone', 'Invalid phone number.')
    }

    // Return true if there are no errors
    return Object.keys(this.validationErrors).length === 0
  },
    async signup() {
      const isValid = await this.validateForm()

      if (!isValid) {
        return
      }

      const { data, error } = await this.$supabase.auth.signUp({
        email: this.email,
        password: this.password,
        data: {
          name: this.name,
          company_name: this.companyName,
          company_address: this.companyAddress,
          company_phone: this.companyPhone
        }
      })

      if (error) {
        console.log('Error:', error.message)
      } else {
        console.log('User successfully signed up:', data)
        // Clear form on successful submit
        this.name = ''
        this.email = ''
        this.password = ''
        this.confirmPassword = ''
        this.companyName = ''
        this.companyAddress.street = ''
        this.companyAddress.city = ''
        this.companyAddress.state = ''
        this.companyAddress.zip = ''
        this.companyPhone = ''

        // Show success message to user
        alert('Please check your email to verify your account.')
      }
    }
  },
  mounted() {
    this.getStates()
  }
}
</script>

  
  <style scoped>
  .signup-form {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100vh; */
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

  #company-address-state {
    height: 45px;
    background: var(--brand-blue);
    color: white;
    padding-left: 1rem;
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
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: var(--brand-indigo);
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button:hover {
    background-color: var(--brand-dark-grey);
  }
  </style>
  