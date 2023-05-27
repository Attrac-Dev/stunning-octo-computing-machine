<template>
<div class="contact-form">


    <form @submit.prevent="submitForm">
      <h1>Request a Quote</h1>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" v-model="name" required>
      <div v-if="validation.name" class="error">{{ validation.name }}</div>

      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="email" required>
      <div v-if="validation.email" class="error">{{ validation.email }}</div>

      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" name="phone" v-model="phone" required>
      <div v-if="validation.phone" class="error">{{ validation.phone }}</div>

      <label for="service">Service</label>
      <select id="service" name="service" v-model="service" required>
        <option disabled value="" class="option-list">Please select a service</option>
        <option v-for="option in services" :key="option" :value="option" class="option-list">{{ option }}</option>
      </select>
      <div v-if="validation.service" class="error">{{ validation.service }}</div>

      <label for="description">Brief Description</label>
      <textarea id="description" name="description" maxlength="150" v-model="description" required></textarea>
      <div>
        <span :class="{
          'description-error': remainingCharacters < 50,
          'bold': remainingCharacters < 25
        }">{{ remainingCharacters }}</span> characters remaining
      </div>
      <div v-if="validation.description" class="error">{{ validation.description }}</div>

      <label for="current-website">Current Website</label>
      <input type="url" id="current-website" name="current-website" v-model="currentWebsite">

      <label for="budget">Budget Range</label>
      <select id="budget" name="budget" v-model="budget" required>
        <option disabled value="" class="option-list">Please select a budget range</option>
        <option value="Under $500">Under $500</option>
        <option value="$500 to $2000">$500 to $2000</option>
        <option value="Over $2000">Over $2000</option>
      </select>
      <div v-if="validation.budget" class="error">{{ validation.budget }}</div>

      <!-- Honeypot field (zipcode) -->
      <input type="text" id="zipcode" name="zipcode" v-model="zipcode" style="display: none;">

      <input type="hidden" name="_next" value="https://development--attracdev-development.netlify.app/contact/success">

      <button class="modal-submit-button" type="submit">Submit</button>

      <div v-show="submissionError" class="error submission-error">{{ submissionError }}</div>
    </form>
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
      name: '',
      email: '',
      phone: '',
      description: '',
      currentWebsite: '',
      budget: '',
      zipcode: '',
      validation: {
        name: '',
        email: '',
        phone: '',
        service: '',
        description: '',
        budget: '',
      },
      showModal: false,
      services: [
        'Design',
        'Development',
        'Podcasts',
        'Videos',
        'Copywriting',
        'Social Media',
        'Emails',
        'Branding'
      ],
      submissionError: '',
      bypass: false,
      // page data
      title: 'Contact Us | AttracDev',
      author: 'AttracDev',
    };
  },
  methods: {
    submitForm() {
      if (!this.bypass) {
        if (!this.name) {
          this.validation.name = 'Please enter your name.';
          return;
        }
        if (!this.email) {
          this.validation.email = 'Please enter your email.';
          return;
        }
        if (!this.phone) {
          this.validation.phone = 'Please enter your phone number.';
          return;
        }
        if (!this.service) {
          this.validation.service = 'Please select a service.';
          return;
        }
        if (!this.description) {
          this.validation.description = 'Please provide a brief description.';
          return;
        }
        if (!this.budget) {
          this.validation.budget = 'Please select a budget range.';
          return;
        }
      }

      // Reset validation errors
      this.resetValidation();

      // Prepare form data
      const formData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        service: this.service,
        description: this.description,
        currentWebsite: this.currentWebsite,
        budget: this.budget,
      };

      // TODO: Handle form submission logic here
      // You can use Axios, fetch API, or any other library to make a POST request to your server

      // For demonstration purposes, log the form data to the console
      if (this.isDevelopment()) {
        console.log(formData)
      }

      if (!this.zipcode){
        this.$axios
        .post('https://formspree.io/f/mvonnvnq', formData)
        .then(response => {
          // Handle successful form submission
          console.log(response.data);
          alert('Form submitted successfully!');
          this.$router.push('/contact/success');
        })
        .catch(error => {
          // Handle form submission error
          console.error(error);
          this.submissionError = 'Failed to submit the form. Please try again later.';
        });
      } else {
        formData['zipcode'] = this.zipcode
        setTimeout(() => {
          // Handle successful form submission
          console.log('Form submitted:', formData);
          alert('Form submitted successfully!');
          this.$router.push('/contact/success');
        }, 1000);
      }

    },

    resetValidation() {
      this.validation = {
        name: '',
        email: '',
        phone: '',
        service: '',
        description: '',
        budget: '',
      };
      this.submissionError = '';
    },

    isDevelopment() {
      // Determine if the application is running in development mode
      return process.env.NODE_ENV === 'development';
    },
  },
  computed: {
    remainingCharacters() {
      return 150 - this.description.length;
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
      max-height: 93%;
      overflow-y: auto;
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
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
  
    label {
      color: var(--brand-dark-grey);
    }
  
    input[type="email"],
    input[type="tel"],
    input[type="text"],
    input[type='url'],
    select#service,
    select#budget,
    textarea {
      border: 1px solid var(--brand-indigo);
      border-radius: 5px;
      padding: 0.5rem;
      width: 100%;
      box-sizing: border-box;
      background-color: var(--brand-white);
    }
  
    .option-list {
      background-color: var(--brand-white);
    }
  
    textarea {
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
  
    .description-error {
      color: red;
    }
  
    .submission-error {
      font-weight: 100;
      text-align: center;
    }
  
    .bold {
      font-weight: 600;
    }
  </style>
  
  
    