<template>
        <div v-if="isDevelopment" class="contact-form">
        <form name="contact" method="POST" data-netlify="true">
            <p>
                <label>Your Name: <input type="text" name="name" required /></label>
            </p>
            <p>
                <label>Your Email: <input type="email" name="email" required /></label>
            </p>
            <p>
                <label>Services: 
                    <select name="services[]" v-model="service" multiple>
                        <option disabled value="" class="option-list">Please select services</option>
                        <option v-for="option in services" :key="option" :value="option" class="option-list">{{ option }}</option>
                    </select>
                </label>
            </p>
            <p>
            <label>Message: <textarea name="message"></textarea></label>
            </p>
            <p>
            <button type="submit">Send</button>
            </p>
        </form>
    </div>


    <div v-else class="contact-form">
        <form name="contact" @submit.prevent="submitForm" netlify>
        <!-- Conditionally display checkbox in development mode -->
        <!-- <div v-if="isDevelopment" class="form-group">
            <label>
            <input type="checkbox" v-model="bypass" />
            Activate Developer Mode (bypass form)
            </label>
        </div> -->

        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" v-model="name" required />
            <div v-if="validation.name" class="error">{{ validation.name }}</div>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="email" required />
            <div v-if="validation.email" class="error">{{ validation.email }}</div>
        </div>
        <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" v-model="phone" required />
            <div v-if="validation.phone" class="error">{{ validation.phone }}</div>
        </div>
        <div class="form-group">
            <label for="service">Service</label>
            <select id="service" name="service" v-model="service" required>
            <option disabled value="" class="option-list">Please select a service</option>
            <option v-for="option in services" :key="option" :value="option" class="option-list">{{ option }}</option>
            </select>
            <div v-if="validation.service" class="error">{{ validation.service }}</div>
        </div>
        <div class="form-group">
            <label for="description">Brief Description</label>
            <textarea id="description" name="description" maxlength="150" v-model="description" required></textarea>
            <div>
            <span :class="{
                'description-error': remainingCharacters < 50,
                'bold': remainingCharacters < 25
            }">{{ remainingCharacters }}</span> characters remaining
            </div>
            <div v-if="validation.description" class="error">{{ validation.description }}</div>
        </div>
        <!-- Honeypot field (zipcode) -->
        <input type="text" id="zipcode" name="zipcode" v-model="zipcode" style="display: none;" />

        <div class="button-container">
            <button class="modal-submit-button" type="submit">Submit</button>
            <button class="modal-close-button" @click="closeModal">Close</button>
        </div>
        <!-- Show submission error to user -->
        <div v-show="submissionError" class="error submission-error">{{ submissionError }}</div>
        </form>
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
        zipcode: '',
        validation: {
          name: '',
          email: '',
          phone: '',
          service: '',
          description: ''
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
        service: [],
        submissionError: '',
        bypass: false,
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
        zipcode: this.zipcode,
      };

      // TODO: Handle form submission logic here
      // You can use Axios, fetch API, or any other library to make a POST request to your server

      // For demonstration purposes, log the form data to the console
      this.$axios
      .post('/contact/form', formData)
      .then(response => {
        // Handle successful form submission
        console.log(response.data);
        this.showModal = false;
        // alert('Form submitted successfully!');
        this.$router.push('/contact/success')
      })
      .catch(error => {
        // Handle form submission error
        console.error(error);
        this.submissionError = 'Failed to submit the form. Please try again later.';
      });

      // Show success message and close modal
      this.showModal = false;
    },
    handleSubmit(event) {
      event.preventDefault();

      const myForm = event.target;
      const formData = new FormData(myForm);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          // Handle successful form submission
          console.log("Form successfully submitted");
          this.showModal = false;
          alert('Form submitted successfully!');
        })
        .catch((error) => {
          // Handle form submission error
          console.error("Form submission error:", error);
          this.submissionError = "An error occurred while submitting the form. Please try again.";
        });
    },
    closeModal() {
      // Reset form data and validation errors when modal is closed
      this.name = '';
      this.email = '';
      this.phone = '';
      this.service = '';
      this.description = '';
      this.zipcode = '';
      this.resetValidation();

      this.showModal = false;
    },
    resetValidation() {
      this.validation = {
        name: '',
        email: '',
        phone: '',
        service: '',
        description: '',
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
  created() {
    this.isDevelopment()
  }
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
  select#service,
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


  