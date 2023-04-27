<template>
    <div class="content-container">
        <h1>Sign Up</h1>
        <div class="signup-form">
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <button type="submit" @click.prevent="signup">Sign Up</button>
      </form>
    </div>
    </div>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      signup() {
        // handle form submission here
      }
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
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
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
  