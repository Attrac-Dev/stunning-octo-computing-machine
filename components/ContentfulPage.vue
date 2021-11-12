<template>

<div class="content-container" v-if="object">
<h1 v-if="pageName">{{ pageName }}</h1>
<img class="main-page-image" v-if="mainPageImage" :src="mainPageImage.file.url" v-bind:alt="mainPageImage.description">
<div class="content-text" v-html="contentText"></div>
<img class="secondary-page-image" v-if="secondaryPageImage" :src="secondaryPageImage.file.url" v-bind:alt="secondaryPageImage.description">
<div class="additional-content-text" v-if="additionalContentText" v-html="additionalContentText"></div>
</div>
        
<div v-else>
<p>This content counld not be found</p>
</div>

</template>

<script>
// import here
import { createClient } from '../plugins/contentful'
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { BLOCKS, MARKS } from '@contentful/rich-text-types'

const contentfulClient = createClient();
export default {
    components: {

    },
    data: (instance) => ({
        test: 0,
        // entryID: '4faDEHz7CtVqZtgFbJO4GK',
        entryID: instance.id,
        object: {},
        // contentful Page specific fields
        pageName: '',
        mainPageImage: '',
        contentText: '',
        secondaryPageImage: '',
        additionalContentText: ''
    }),
    // Directive has a set of lifecycle hooks:
    // called before bound element's attributes or event listeners are applied
    async created() {
      this.fetchContent()
    },
    // called before bound element's parent component is mounted
    beforeMount() {

    },
    // called when bound element's parent component is mounted
    mounted() {
       

    },
    // called before the containing component's VNode is updated
    beforeUpdate() {},
    // called after the containing component's VNode and the VNodes of its children // have updated
    updated() {},
    // called before the bound element's parent component is unmounted
    beforeUnmount() {},
    // called when the bound element's parent component is unmounted
    unmounted() {},
    methods: {
        // component specific methods here
        async fetchContent() {
            try {
                const entry = await contentfulClient.getEntry(this.entryID)
                if (entry) {
                    console.log("we got the entry")
                    this.object = entry.fields
                    this.pageName = this.object ? entry.fields.pageName : ''
                    this.mainPageImage = this.object ? entry.fields.mainPageImage.fields : ''
                    this.contentText = this.object ? documentToHtmlString(entry.fields.contentText) : ''
                    this.secondaryPageImage = this.object ? entry.fields.secondaryPageImage.fields : ''
                    this.additionalContentText = this.object ? documentToHtmlString(entry.fields.additionalContentText) : ''
                } else {
                    console.log('no entry was found')
                }
            } catch (e) {
                console.log(e)
            }
            
        }
    },
    props: {
        // contentful entry object
       id: String
    }
}
</script>

<style scoped>
    .main-page-image {
        width: 50vw;
    }
    .secondary-page-image {
        width: 50vw;
    }
    .content-text >>> h2, h3, h4, h5 {
        margin-bottom: 2rem;
    }
    .additional-content-text >>> h2, h3, h4, h5 {
        margin-bottom: 2rem;
    }
    .content-text >>> p {
        padding-bottom: 2rem;
        line-height: 1.5rem;
        font-size: 1.25rem;
    }
    .additional-content-text >>> p {
        padding-bottom: 2rem;
        line-height: 1.5rem;
        font-size: 1.25rem;
    }
</style>