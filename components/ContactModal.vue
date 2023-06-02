<template>
    <div class="modal-overlay" v-if="showModal">
      <div class="modal-container">
        <h1>Contact Us</h1>
        <div class="contact-form">
        <form 
          name="contact" 
          ref="contactForm"
        >
          <!-- Conditionally display checkbox in development mode -->
          <div v-if="isDevelopment" class="form-group">
            <label>
              <input type="checkbox" v-model="bypass" />
              Activate Developer Mode (bypass form)
            </label>
          </div>

            <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" required />
            <div v-if="validation.name" class="error">{{ validation.name }}</div>
            </div>
            <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
            <div v-if="validation.email" class="error">{{ validation.email }}</div>
            </div>
            <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" v-model="phone" required />
            <div v-if="validation.phone" class="error">{{ validation.phone }}</div>
            </div>
            <div class="form-group">
            <label for="service">Service</label>
            <select id="service" v-model="service" required>
              <option disabled value="" class="option-list">Please select a service</option>
              <option v-for="option in services" :key="option" :value="option" class="option-list">{{ option }}</option>
            </select>
            <div v-if="validation.service" class="error">{{ validation.service }}</div>
            </div>
            <div class="form-group">
            <label for="description">Brief Description</label>
            <textarea id="description" maxlength="150" v-model="description" required></textarea>
            <div><span :class="{
              'description-error': remainingCharacters < 50,
              'bold': remainingCharacters < 25
              }">{{ remainingCharacters }}</span> characters remaining</div>
            <div v-if="validation.description" class="error">{{ validation.description }}</div>
            </div>
             <!-- Honeypot field (zipcode) -->
            <input type="text" id="zipcode" v-model="zipcode" style="display: none;" />
        </form>
        </div>
        <div class="button-container">
        <button class="modal-submit-button" type="submit" @click.prevent="submitForm">Submit</button>
        <button class="modal-close-button" @click="closeModal">Close</button>
      </div>
      <!-- Show submission error to user -->
      <div v-show="submissionError" class="error submission-error">{{ submissionError }}</div>

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
        zipcode: '',
        validation: {
          name: '',
          email: '',
          phone: '',
          service: '',
          description: ''
        },
        // nameError: '',
        // emailError: '',
        // phoneError: '',
        // serviceError: '',
        // descriptionError: '',
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
        service: '', // used to auto-fill form from a query param
        query: '',
        actionUrl: '/contact/success', // allows for dynamic redirect after successful form submission
        submissionError: '', // to show the user if the form was not successfully submitted
        environment: '',
        bypass: false,
      };
    },
    methods: {
      async checkUserExists(email, phone) {
        const payload = {
          p_email: email,
          p_phone: phone,
          p_table: 'contact_form',
        };
        try {
          const { data, error } = await this.$supabase.rpc('validate_contact', payload);

          if (error) {
            // Handle the error
            console.error(error);
            return { success: false, error: error.message };
          } else {
            return { success: true, result: data };
          }
        } catch (error) {
          // Handle any other error that occurred
          console.error(error);
          return { success: false, error: 'An error occurred during user validation' };
        }
  },
    async submitForm() {
        // bypass form requirements in development mode
        // start wrap here
        if (!this.bypass){
        // Name validation
        if (!this.name) {
        this.validation.name = 'Name is required';
        return;
        }

        // Email validation
        if (!this.email) {
        this.validation.email = 'Email is required';
        return;
        }
        if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.validation.email = 'Invalid email format';
        return;
        }

        // Phone number validation
        if (!this.phone) {
            this.validation.phone = 'Phone number is required';
            return;
          }
        
        if (!this.phoneLength(this.phone)) {
          this.validation.phone = 'Phone number incorrect length'
          return;
        } else {
          this.validation.phone = ''
        }

        // Service validation
        if (!this.service) {
          this.validation.service = 'Please select a service';
          return;
        }

        // Description validation
        if (!this.description) {
        this.validation.description = 'Description is required';
        return;
        }

        // clear the validation messages
        this.validation.name = '';
        this.validation.email = '';
        this.validation.phone = '';
        this.validation.service = '';
        this.validation.description = '';


        const formData = {
          name: this.name,
          email: this.email,
          phone: this.formatPhone(this.phone),
          service: this.service,
          description: this.description,
          zipcode: this.zipcode,
        }
        try {
          const uniqueUser = await this.checkUserExists(this.email, this.phone)
          console.log({existingUser: uniqueUser})
          if (!uniqueUser.success){
            this.submissionError = `Error submitting form, userCheck=${uniqueUser}`
            throw new Error(`User: ${uniqueUser}`)
          } else {
              if (!uniqueUser.result) {
              this.validation.email = 'Email may already be associated with a user'
              this.validation.phone = 'Phone may already be associated with a user'
              this.submissionError = "User already exists."
              return
            } else {
              console.log('User was unique')
            }
          }
        } catch(error) {
          console.error(error)
          return //prevent submission
        }

        const tableName = 'contact_form'

        try {
          const { data, error } = await this.$supabase
          .from(tableName)
          .insert([formData])
          .single();

          if (error) {
            // handle the error
            console.log('Form submission error', error)
            this.submissionError = error
            return
          } else {
            // clear the fields
            this.name = '';
            this.email = '';
            this.phone = '';
            this.service = '';
            this.description = '';
            if (data) {
              console.log({supabaseData: data})
              console.log('Form submitted successfully')
              // navigate to success page via this.actionURL    
            }
          }
          alert(`redirect: ${this.actionUrl}`)
          this.$router.push({path:`${this.actionUrl}`})
        } catch (error) {
          console.error(error);
          // Handle error case, e.g., show error message to the user
        }
        // end wrap here
      } else {
        // in development mode, act like form is submitted, without sending to database
        alert(`Dev redirect to: ${this.actionUrl}`)
        this.$router.push(`${this.actionUrl}`)
      }
    },
    isDevelopment() {
      return process.env.ENVIRONMENT === 'development'
    },
    formatPhone(phoneNumber) {
        const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');
        const formattedPhoneNumber = sanitizedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
        return formattedPhoneNumber;
      },
      phoneLength(phoneNumber) {
      const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
      return numericPhoneNumber.length === 10;
    },
    openModal() {
        this.showModal = true;
        this.disableScroll();
      },
    closeModal() {
        this.showModal = false;
        this.enableScroll();
        // Clear form on close
        this.name = '';
        this.email = '';
        this.phone = '';
        this.selectedService = '';
        this.description = '';
      },
      disableScroll() {
        // Disable scroll on larger screens
        if (window.innerWidth > 600) { // Adjust the screen width threshold as needed
            // Get the current scroll position
            const scrollY = window.scrollY;

            // Add styles to disable scroll
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
        }
      },
      enableScroll() {
        // Enable scroll on larger screens
        if (window.innerWidth > 600) { // Adjust the screen width threshold as needed
            // Get the previous scroll position
            const scrollY = parseInt(document.body.style.top || '0', 10);

            // Remove styles to enable scroll
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';

            // Scroll to the previous position
            window.scrollTo(0, Math.abs(scrollY));
        }
      },
      getRedirect() {
        // save the query parameter value, to redirect the user back to the page they where viewing before submitting the form
        this.query = this.$route.query.page
        if (!this.query) {
          console.log('no page query found')
          const redirect = encodeURIComponent('/')
          this.actionUrl = `/contact/success?page=${redirect}`;
        } else {
          // The query needs to be encoded
          console.log('encoding page query now...')
          const redirect = encodeURIComponent(this.query)
          this.actionUrl = `/contact/success?page=${redirect}`;
        }
      }
    },
    computed: {
      remainingCharacters() {
        const maxlength = 150
        return maxlength - this.description.length
      }
    },
    created() {
      const serviceParam = this.$route.query.service;

      if (serviceParam) {
        // Convert the query parameter and available services to lowercase
        const lowercaseServiceParam = serviceParam.toLowerCase();
        const lowercaseServices = this.services.map(service => service.toLowerCase());

        // Check if the lowercase service parameter is one of the available services
        if (lowercaseServices.includes(lowercaseServiceParam)) {
          // Find the corresponding original service value
          const selectedService = this.services.find(service => service.toLowerCase() === lowercaseServiceParam);
          this.service = selectedService; // Set the selected service to the original value
          this.showModal = true // automatically open modal on page load, if there is a query param in the route
        } else {
          // Handle case where the query parameter value is not a valid service
          console.warn(`Invalid service: ${serviceParam}`);
        }
      }
      this.getRedirect()
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
  border-radius: 3px;
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

.modal-submit-button:hover, .modal-submit-button:active {
    background-color: var(--brand-blue);
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

select#service {
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
    border: 1px solid var(--brand-indigo);
    border-radius: 5px;
    padding: 0.5rem;
    width: 100%;
    resize: vertical;
    background-color: var(--brand-white);
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
  