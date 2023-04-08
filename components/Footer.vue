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
      <div class="ft-main-item">
        <h2 class="ft-title">Stay Updated</h2>
        <p>Subscribe to our newsletter to get our latest news.</p>
        <!-- <form>
          <input type="email" name="email" placeholder="Enter email address">
          <input type="submit" value="Subscribe">
        </form> -->
        <NewsLetterSignup/>
      </div>
    </section>
  
    <!-- Footer social -->
    <!-- <section class="ft-social"> -->
      <!-- <ul class="ft-social-list"> -->
        <!-- <li><a href="https://vm.tiktok.com/ZMRH711rk/" target="_blank"><i class="fab fa-tiktok"></i></a></li> tiktok icon not showing up -->
        <!-- <li><a href="#" target="_blank"><i class="fab fa-facebook"></i></a></li> -->
        <!-- <li><a href="https://twitter.com/attracdev" target="_blank"><i class="fab fa-twitter"></i></a></li> -->
        <!-- <li><a href="https://www.instagram.com/attracdev/" target="_blank"><i class="fab fa-instagram"></i></a></li> -->
        <!-- <li><a href="https://github.com/Attrac-Dev" target="_blank"><i class="fab fa-github"></i></a></li> -->
        <!-- <li><a href="#" target="_blank"><i class="fab fa-linkedin"></i></a></li> -->
        <!-- <li><a href="https://www.youtube.com/channel/UCmRdPCkCDIt9d8iTSBuH6Fw" target="_blank"><i class="fab fa-youtube"></i></a></li> -->
      <!-- </ul> -->
    <!-- </section> -->
    <FooterSocial />
    <!-- Footer legal -->
    <section class="ft-legal">
      <ul class="ft-legal-list">
        <!-- <li><a href="#">Terms &amp; Conditions</a></li>
        <li><a href="#">Privacy Policy</a></li> -->
        <li class="copyright">&copy; Copyright {{ startYear }}-{{ currentYear }}, AttracDev LLC.</li>
      </ul>
    </section>
  </footer>
</template>

<style>
    @import '~/styles/normalize.css';
    @import '~/styles/footer.css';
</style>

<script>
import NewsLetterSignup from './NewsLetterSignup.vue'
import FooterSocial from './FooterSocial.vue'

export default {
 data() {
      return {
        currentYear: new Date().getFullYear(),
        startYear: 2019
      }
    },
  computed: {

  },
  components: {
    NewsLetterSignup,
    FooterSocial
  }
}
</script>