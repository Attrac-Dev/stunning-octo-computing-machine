<!-- Parent Component -->
<template>
  <div class="content-container">
    <ContentfulPage :entry="entry.fields" />
    <button data-aos="zoom-in" v-if="CTA" class="cta-button" @click="redirectToContact" :data-title="tooltipText">{{ CTA }}</button>
  </div>
</template>

<script>
import ContentfulPage from '@/components/ContentfulPage.vue'
import { createClient } from '../../../plugins/contentful'
const contentfulClient = createClient();

export default {
  async asyncData() {
      const pageData = { 
        page: 'Design',
        pageType: 'service',
        id: '3kstSkCjhIXIgmPtk3XGZM'
      }
      const entry = await contentfulClient.getEntry(pageData.id)
      return { entry, pageData }
  },
  components: {
    ContentfulPage
  },
  data() {
      return {
          title: '',
          robots: '',
          keywords: '',
          description: '',
          author: '',
          CTA: ''
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
    redirectToContact() {
      const encodePath = encodeURIComponent(this.$route.path)

      const path = "/contact/form"

      // redirect to contact page
      this.$router.push(path)
    }
  },
  created() {
          const { linkText } = this.entry.fields.service.fields
          const { title, robots, keywords, description, author, pageName } = this.entry.fields
          // ternary operators to check if values have been passed in  or give a default value
          this.title = title ? title : 'AttracDev | Software and Branding'
          this.robots = robots ? robots : 'index, follow'
          this.keywords = keywords ? keywords : 'This is just a sting to test if the keywords are working... There already are keywords on Contentful'
          this.description = description ? description : 'some description string'
          this.author = author ? author : 'AttracDev'
          this.CTA = linkText ? linkText : ''
  },
  computed: {
    tooltipText() {
      return `Click here to fill out a form to help with your ${this.pageData.page}`;
    }
  }
}
</script>

<style scoped>
.content-container {
  margin: 1.25rem;
  }

  .cta-button {
    background-color: var(--accent-color);
    border: none;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    padding: 1rem 1rem;
    width: 100%;
    max-width: 250px;
    display: block;
    margin: 0 auto;
  }

  .cta-button:active, .cta-button:hover {
    background-color: var(--brand-blue);
    outline: 2px solid var(--accent-color);
    outline-offset: -2px;
  }

  /* tooltip styling */
[data-title]:hover:after {
  opacity: 1;
  transition: all 0.1s ease 0.5s;
  visibility: visible;
}

[data-title]:after {
  content: attr(data-title);
  background-color: var(--brand-off-white);
  color: var(--brand-dark-grey);
  font-size: 14px; /* Adjust the font size as needed */
  position: absolute;
  padding: 0.75rem;
  top: 120%; /* Change 'bottom' to 'top' */
  left: 50%; /* Adjust the horizontal position */
  transform: translateX(-50%); /* Center horizontally */
  white-space: nowrap;
  /* box-shadow: 1px 1px 3px #222222; */
  opacity: 0;
  z-index: 99999;
  visibility: hidden;
}

[data-title] {
  position: relative;
}
</style>
