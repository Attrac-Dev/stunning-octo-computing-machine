<template>
      <div class="success-content">
        <div class="container">
            <h2>Thank you for your submission</h2>
            <h5>We will respond as quickly as possible.</h5>
            <p class="centered-text">Redirecting you back to the <span class="page-name">{{ page }}</span> page in <strong class="count">{{ countdown }}</strong></p>
        </div>

        <button class="return-home-button" @click="returnHome">Return Home</button>

      </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        interval: null,
        countdown: 15, // Set the desired countdown time in seconds
        page: 'Home'
      };
    },
    methods: {
      returnHome() {
        clearInterval(this.interval);
        try {
          this.$router.push('/');
        } catch (error) {
          console.error('Error navigating to home:', error);
        }
      },
      countDownInterval() {
        this.interval = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            clearInterval(this.interval);
            const page = this.$route.query.page
            // return to the previous page
            if (page) {
              try {
                this.$router.push(`/services/${page}`)
              } catch (error) {
                console.error('Error navigation to the previous page')
              }
            } else{
                // return to the home page
                try {
                this.$router.push('/');
              } catch (error) {
                console.error('Error navigating to home:', error);
              }
            }
          }
        }, 1000); // 1 second intervals
      },
    },
    mounted() {
      const page = this.$route.query.page;
      if (page) {
        this.page = page;
      }
      this.countDownInterval();
    },
  };
  </script>
    
  <style scoped>
  .count {
    font-weight: 600;
  }

h2, h5, p {
    text-align: center;
    margin: 1rem;
}

.container {
    padding: 2rem;
}
.success-content {
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 5px;
  margin-top: -50px; /* Adjust the margin-top value as needed */
}
  
.page-name {
  text-transform: capitalize;
}  

  .return-home-button {
    background-color: var(--brand-indigo);
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 200px;
    display: block;
    margin: 0 auto;
  }
  </style>
  