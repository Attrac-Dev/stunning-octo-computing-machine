<template>
    <div class="content-container">
      <h1>Login</h1>
      <div class="login-form">
        <form>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
            <div v-if="emailError" class="error">{{ emailError }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
            <div v-if="passwordError" class="error">{{ passwordError }}</div>
          </div>
          <button type="submit" @click.prevent="login">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
      }
    },
    methods: {
      redirectToHomePage() {
        this.$router.push('/')
      },
      async login() {
        this.emailError = '';
        this.passwordError = '';
  
        // Email validation
        if (!this.email) {
          this.emailError = 'Email is required';
          return;
        }
        if (!/\S+@\S+\.\S+/.test(this.email)) {
          this.emailError = 'Invalid email format';
          return;
        }
  
        // Password validation
        if (!this.password) {
          this.passwordError = 'Password is required';
          return;
        }
  
        const { error } = await this.$supabase.auth.signIn({
          email: this.email,
          password: this.password,
        })
  
        if (error) {
          console.error('Login Error:', error.message)
        } else {
          // Clear form on successful submit
          this.email = ''
          this.password = ''
  
          // Show success message to user
          // redirect users to home page
          this.redirectToHomePage()
        }
      }
    },
  }
  </script>
  
  <style scoped>
  .login-form {
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
  
  #email,
  #password {
    width: 100%;
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
  
  button[type="submit"] {
    background-color: var(--brand-indigo);
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    padding: 0.5rem;
  }
  </style>
  