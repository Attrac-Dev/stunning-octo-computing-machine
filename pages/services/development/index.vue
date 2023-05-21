<!-- Parent Component -->
<template>
  <div class="content-container">
    <ContentfulPage :entry="entry.fields" />
    <button data-aos="zoom-in" v-if="CTA" class="cta-button" @click="redirectToContact">{{ CTA }}</button>
  </div>
</template>

<script>
import ContentfulPage from '@/components/ContentfulPage.vue'
import { createClient } from '../../../plugins/contentful'
const contentfulClient = createClient();

export default {
  async asyncData() {
      const pageData = { 
        page: 'Development',
        pageType: 'service',
        id: 'ZCg7oYfJr6GVjza8yxxy9'
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

      const path = `/contact?service=${this.pageData.page}&page=${encodePath}`

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

          if (pageName && process.env.ENVIRONMENT === 'development') {
            console.log({
              "message":"success",
              pageName,
              title
            })
          } else if (pageName && process.env.ENVIRONMENT === 'production') {
            console.log({
              message: 'successful page load'
            })
          }  else {
            console.error({
              "message":"failure",
              "pageName": "none detected"
            })
          }

  }
}
</script>

<style scoped>
.content-container {
  margin: 1.25rem;
  }

  .cta-button {
    background-color: var(--brand-indigo);
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    padding: 1rem 1rem;
    width: 100%;
    max-width: 200px;
    display: block;
    margin: 0 auto;
  }
</style>
