<template>

<div class="content-container" v-if="object">
<h1 v-if="pageName" class="page-name">{{ pageName }}</h1>
<img class="main-page-image" v-if="mainPageImage" :src="mainPageImage.file.url" v-bind:alt="mainPageImage.description">
<div class="content-text" v-html="contentText"></div>
<img class="secondary-page-image" v-if="secondaryPageImage" :src="secondaryPageImage.file.url" v-bind:alt="secondaryPageImage.description">
<div class="additional-content-text" v-if="additionalContentText" v-html="additionalContentText"></div>
</div>
        
<div v-else>
<p>This content couldn't not be found</p>
</div>

</template>

<script>
// import here
import { createClient } from '../plugins/contentful'
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { BLOCKS, MARKS } from '@contentful/rich-text-types'

const contentfulClient = createClient();
export default {
    head() {
        return {
            title: `${this.pageName} =>  { AttracDev Development & Design }`,
            meta: [
                {
                    hid: this.entryID,
                    name: `${this.pageName} page`,
                    content: `${this.pageName} page content`,
                }
            ]
        }
    },
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

    .page-name {
        font-weight: 600;
        font-size: 2rem;
    }
    .main-page-image, .secondary-page-image {
        margin-bottom: 20px;
    }
    .content-text {
        margin-bottom: 15px;
    }
    .content-text ::v-deep(h2), .additional-content-text ::v-deep(h2) {
        /* margin-bottom: 2rem; */
        padding-bottom: 2rem;
        font-weight: 300;
    }
    .content-text ::v-deep(h3), .additional-content-text ::v-deep(h3) {
        /* margin-bottom: 2rem; */
        padding-bottom: 2rem;
        font-weight: 200;
        margin-top: 5px;
    }

    .content-text ::v-deep(h4, h5), .additional-content-text ::v-deep(h4, h5) {
        font-weight: 300;
    }
    .content-text ::v-deep(h4), .additional-content-text ::v-deep(h4) {
        margin-bottom: 1rem;
    }
    .content-text ::v-deep(li), .additional-content-text ::v-deep(li) {
        margin-left: 1.5rem;
        margin-bottom: -1rem;
    }
    .content-text ::v-deep(ul) , .additional-content-text ::v-deep(ul) {
        margin-bottom: 2rem;
    }
    .content-text ::v-deep(ol) , .additional-content-text ::v-deep(ol) {
        margin-bottom: 2rem;
    }
    .content-text ::v-deep(ol li), .additional-content-text ::v-deep(ol li) {
        margin-bottom: -20px;
    }

    /* .additional-content-text,  ::v-deep(h2) {
        padding-bottom: 2rem;
        font-weight: 300;
        margin-top: 5px;
    }

    .additional-content-text ::v-deep(h3, h4, h5) {
        padding-bottom: 2rem;
        font-weight: 200;
    } */

    .content-text ::v-deep(p), .additional-content-text ::v-deep(p) {
        margin-bottom: 40px;
        line-height: 2rem;
        font-size: 1.25rem;
    }
    /* .additional-content-text ::v-deep(p) {
        margin-bottom: 20px;
        line-height: 2rem;
        font-size: 1.25rem;
    } */
</style>