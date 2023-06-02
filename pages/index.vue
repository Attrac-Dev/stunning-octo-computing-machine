<!-- Homepage Page Template -->
<template>
  <div class="content-container">
    <HomeGrid :entry="entry.fields" />
  </div>
</template>

<script>
import HomeGrid from '../components/HomeGrid.vue'
import { createClient } from '~/plugins/contentful'
const contentfulClient = createClient();
export default {
  async asyncData() {
      const pageData = { 
        page: 'Home',
        pageType: 'landing',
        id: '6fVWWN65k4vv6WSI3SD88s'
      }
      const entry = await contentfulClient.getEntry(pageData.id)
      return { entry }
  },
  components: {
    HomeGrid
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
    margin: 2rem;
  }
</style>
