<!-- Parent Component -->
<template>
  <div class="content-container">
    <MyTest :entry="entry.fields" />
  </div>
</template>

<script>
import MyTest from '@/components/MyTest.vue'
import { createClient } from '../../../plugins/contentful'
const contentfulClient = createClient();

export default {
  async asyncData() {
      const pageData = { 
        page: 'Podcasts',
        pageType: 'service',
        id: '7mTdwKpE6O2nRgcWXriGES'
      }
      const entry = await contentfulClient.getEntry(pageData.id)
      return { entry }
  },
  components: {
    MyTest
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
          const { robots, keywords, description, author, pageName } = this.entry.fields
          // ternary operators to check if values have been passed in  or give a default value
          this.robots = robots ? robots : 'index, follow'
          this.keywords = keywords ? keywords : 'This is just a sting to test if the keywords are working... There already are keywords on Contentful'
          this.description = description ? description : 'some description string'
          this.author = author ? author : 'AttracDev'

          if (pageName) {
            console.log({
              "message":"success",
              pageName
            })
          } else {
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
</style>
