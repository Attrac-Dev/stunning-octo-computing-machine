<!-- Parent Component -->
<template>
  <div class="content-container">
    <ContentfulPage :entry="entry.fields" />
  </div>
</template>

<script>
import ContentfulPage from '@/components/ContentfulPage.vue'
import { createClient } from '../../../plugins/contentful'
const contentfulClient = createClient();

export default {
  async asyncData() {
      const pageData = { 
        page: 'Enterprise',
        pageType: 'plans',
        id: '7blSUD1CD6wzLFzQgs4ARe'
      }
      const entry = await contentfulClient.getEntry(pageData.id)
      return { entry }
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
</style>
