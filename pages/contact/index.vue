<!-- Parent Component -->
<template>
  <div class="content-container">
    <ContentfulPage :entry="entry.fields" />
    <button class="open-modal-button" @click="openModal">Show Contact Form</button>
    <ContactModal ref="contactModal" />
  </div>
</template>

<script>
import ContentfulPage from '@/components/ContentfulPage.vue'
// import ContactModal from '@/components/ContactModal.vue'

import { createClient } from '../../plugins/contentful'
const contentfulClient = createClient();

export default {
  async asyncData() {
      const pageData = { 
        page: 'Contact',
        pageType: 'contact',
        id: '7B1dLmR2opNNs57iMoGNX8'
      }
      const entry = await contentfulClient.getEntry(pageData.id)
      return { entry }
  },
  components: {
    ContentfulPage,
    // ContactModal

  },
  data() {
      return {
          title: '',
          robots: '',
          keywords: '',
          description: '',
          author: ''
      }
  },
  head() {
      return {
          title: this.title,
          meta: [
              { name: 'description', content: this.description },
              { name: 'robots', content: this.robots },
              { name: 'keywords', content: this.keywords },
              { name: 'author', content: this.author },
          ]
      }
  },
  methods: {
    openModal() {
      this.$router.push('/contact/form')
    }
  },
  created() {
          const { title, robots, keywords, description, author, pageName } = this.entry.fields
          // ternary operators to check if values have been passed in  or give a default value
          this.title = title ? title : 'AttracDev | Software and Branding'
          this.robots = robots ? robots : 'index, follow'
          this.keywords = keywords ? keywords : 'This is just a sting to test if the keywords are working... There already are keywords on Contentful'
          this.description = description ? description : 'some description string'
          this.author = author ? author : 'AttracDev'


  }
}
</script>

<style scoped>
.content-container {
  margin: 1.25rem;
  }

  button.open-modal-button {
    background-color: var(--brand-indigo);
    border: none;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    padding: 1rem;
    width: 100%;
    max-width: 440px;
    display: block;
    margin: 0 auto;
  }

  button.open-modal-button:hover, 
  button.open-modal-button:active {
    background-color: var(--brand-blue);
    outline: 2px solid var(--accent-color);
    outline-offset: -2px;
  }
</style>
