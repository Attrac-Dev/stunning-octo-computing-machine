<!-- Parent Component -->
<template>
    <div>
      <MyTest :entry="entry.fields" />
    </div>
  </template>
  
  <script>
  import MyTest from '@/components/MyTest.vue'
  import { createClient } from '../../plugins/contentful'
  const contentfulClient = createClient();

  export default {
    components: {
      MyTest
    },
    data() {
        return {
            title: 'AttracDev | Branding and Software',
            robots: 'index, follow',
            keywords: 'AttracDev Software Web Development Design Branding',
            description: 'AttracDev Page',
            author: 'AttracDev Branding and Software'
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
    async asyncData() {
        const pageData = { 
            page: 'About',
            pageType: 'informational',
            id: '4faDEHz7CtVqZtgFbJO4GK'
        }
        const entry = await contentfulClient.getEntry(pageData.id)
        return { entry }
    },
    created() {
        const { robots, keywords, description, author } = this.entry.fields;
    }
  }
  </script>
  
  