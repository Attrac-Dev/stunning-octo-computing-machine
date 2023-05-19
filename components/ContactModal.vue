<template>
    <div class="modal-overlay" v-if="showModal">
      <div class="modal-container">
        <h1>Contact Us</h1>
        <div class="contact-form">
        <form>
            <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" required />
            <div v-if="nameError" class="error">{{ nameError }}</div>
            </div>
            <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
            <div v-if="emailError" class="error">{{ emailError }}</div>
            </div>
            <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" v-model="phone" required />
            <div v-if="phoneError" class="error">{{ phoneError }}</div>
            </div>
            <div class="form-group">
            <label for="description">Brief Description</label>
            <textarea id="description" v-model="description" required></textarea>
            <div v-if="descriptionError" class="error">{{ descriptionError }}</div>
            </div>
        </form>
        </div>
        <div class="button-container">
        <button class="modal-submit-button" type="submit" @click.prevent="submitForm">Submit</button>
        <button class="modal-close-button" @click="closeModal">Close</button>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        description: '',
        nameError: '',
        emailError: '',
        phoneError: '',
        descriptionError: '',
        showModal: false,
      };
    },
    methods: {
    async submitForm() {
        this.nameError = '';
        this.emailError = '';
        this.phoneError = '';
        this.descriptionError = '';

        // Name validation
        if (!this.name) {
        this.nameError = 'Name is required';
        return;
        }

        // Email validation
        if (!this.email) {
        this.emailError = 'Email is required';
        return;
        }
        if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.emailError = 'Invalid email format';
        return;
        }

        // Phone number validation
        if (!this.phone) {
        this.phoneError = 'Phone number is required';
        return;
        }

        // Description validation
        if (!this.description) {
        this.descriptionError = 'Description is required';
        return;
        }

        // Perform form submission logic here
        // You can use the form data for further processing or API calls

        // Clear form on successful submit
        this.name = '';
        this.email = '';
        this.phone = '';
        this.description = '';

        // Show success message to user
        // You can display a success message or redirect the user to another page
    },
      openModal() {
        this.showModal = true;
        this.disableScroll();
      },
      closeModal() {
        this.showModal = false;
        this.enableScroll();
      },
      disableScroll() {
        // Get the current scroll position
        const scrollY = window.scrollY;
  
        // Add styles to disable scroll
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
      },
      enableScroll() {
        // Get the previous scroll position
        const scrollY = parseInt(document.body.style.top || '0', 10);
  
        // Remove styles to enable scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
  
        // Scroll to the previous position
        window.scrollTo(0, Math.abs(scrollY));
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles for the modal overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Adjust the z-index as needed */
  }
  
  /* Styles for the modal container */
  .modal-container {
    background-color: #fff;
    border-radius: 5px;
    padding: 2rem;
    width: 90%; /* Adjust the width as needed */
    max-width: 400px; /* Set a maximum width for larger screens */
  }
  
  h1 {
    text-align: center;
    margin: 0 0 2rem; /* Remove bottom margin */
  }
  
  .modal-close-button,
.modal-submit-button {
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  width: 100%;
  margin: 10px 0px;
}

.modal-close-button {
    background-color: transparent;
    color: var(--brand-indigo);
    border: 1px solid var(--brand-indigo);
}
  
.modal-submit-button {
    background-color: var(--brand-indigo);
}
    .contact-form {
    display: flex;
    justify-content: center;
    align-items: center;
    }
  /* Additional styles for the contact form */
  form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 2rem;
    border-radius: 5px;
    background-color: #fff;
    width:100%;
    max-width: 400px;
    margin: 0 auto;
  }

  label {
  color: var(--brand-dark-grey);
}

input[type="email"], input[type="tel"], input[type="text"] {
  border: 1px solid var(--brand-indigo);
  border-radius: 5px;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

textarea {
    border: 1px solid var(--brand-indigo);
    border-radius: 5px;
    padding: 0.5rem;
    width: 100%;
    resize: vertical;
}

    .button-container {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }

    .modal-submit-button,
    .modal-close-button {
        flex-grow: 1;
        margin-right: 0.5rem;
    }
    .error {
        color: red;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
  </style>
  