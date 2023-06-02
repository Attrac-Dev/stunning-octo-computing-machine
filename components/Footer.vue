<template>
    <!-- footer -->
<footer>
    <!-- Footer main -->
    <section class="ft-main">
      <div class="ft-main-item">
        <h2 class="ft-title">About</h2>
        <ul>
          <li><NuxtLink to="/services" >Services</NuxtLink></li>
          <li><NuxtLink to="/portfolio" >Portfolio</NuxtLink></li>
          <li><NuxtLink to="/plans" >Pricing</NuxtLink></li>
          <li><NuxtLink to="/customers" >Customers</NuxtLink></li>
          <li><NuxtLink to="/careers" >Careers</NuxtLink></li>
        </ul>
      </div>
      <div class="ft-main-item">
        <h2 class="ft-title">Resources</h2>
        <ul>
          <li><NuxtLink to="/docs">Docs</NuxtLink></li>
          <li><a href="https://attrac.dev">Blog</a></li>
          <li><NuxtLink to="/ebooks">eBooks</NuxtLink></li>
          <li><NuxtLink to="/webinars">Webinars</NuxtLink></li>
          <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
        </ul>
      </div>
      <div class="ft-main-item">
        <h2 class="ft-title">Contact</h2>
        <ul>
          <li><NuxtLink to="/help">Help</NuxtLink></li>
          <li><NuxtLink to="/sales">Sales</NuxtLink></li>
          <li><NuxtLink to="/advertising">Advertising</NuxtLink></li>
        </ul>
      </div>
      <!-- conditional render transition -->
      <transition name="fade">
        <!-- Show Newsletter Form if no cookie exists -->
        <div v-if="!hasSubscribed" key="newsletter-form" class="ft-main-item newsletter-signup">
          <h2 class="ft-title">Stay Updated</h2>
          <p>Subscribe to our newsletter to get our latest news.</p>
          <!-- <form>
            <input type="email" name="email" placeholder="Enter email address">
            <input type="submit" value="Subscribe">
          </form> -->
          <NewsLetterSignup />
        </div>

        <!-- Show Thank You message if cookie exists -->
        <div v-else key="newletter-thanks" class="ft-main-item">
          <h2 class="ft-title">Thank You!</h2>
          <p>You are subscribed to the newsletter.</p>
          <p>Keep an eye out for it monthly.</p>      
        </div>

      </transition>

    </section>
    <FooterSocial />
    <!-- Footer legal -->
    <section class="ft-legal">
      <ul class="ft-legal-list">
        <!-- <li><a href="#">Terms &amp; Conditions</a></li>
        <li><a href="#">Privacy Policy</a></li> -->
        <li class="copyright">&copy; Copyright {{ startYear }}-{{ currentYear }}, AttracDev</li>
      </ul>
    </section>
  </footer>
</template>

<style>
    @import '~/styles/normalize.css';
    @import '~/styles/footer.css';

    .fade-enter-active, 
    .fade-leave-active {
      transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
</style>

<script>
import NewsLetterSignup from './NewsLetterSignup.vue'
import FooterSocial from './FooterSocial.vue'
import { getCookie, hasCookie, getCookies } from '../functions/cookies'
import { mapState } from 'vuex'

export default {
 data() {
      return {
        currentYear: new Date().getFullYear(),
        startYear: 2019
      }
    },
  computed: {
    ...mapState(['hasSubscribed']),
  },
  components: {
    NewsLetterSignup,
    FooterSocial
  }
}
</script>