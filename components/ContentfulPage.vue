<template>

<div class="content-container" v-if="object">
    <h1 v-if="pageName" data-aos="fade-left" ata-aos-easing="linear" class="page-name">{{ mainPageHeader }}</h1>
    <div class="container-grid-1">
        <img data-aos="fade-right" ata-aos-easing="linear" class="main-page-image grid-item fade-in" v-if="mainPageImage" :src="mainPageImage.file.url" v-bind:alt="mainPageImage.description">
        <div data-aos="fade-left" ata-aos-easing="linear"  class="content-text grid-item" v-html="contentText"></div>
    </div>
    <div class="container-grid-2">
        <div data-aos="fade-right" ata-aos-easing="linear" class="additional-content-text grid-item" v-if="additionalContentText" v-html="additionalContentText"></div>
        <img data-aos="fade-left" ata-aos-easing="linear" class="secondary-page-image grid-item fade-in" v-if="secondaryPageImage" :src="secondaryPageImage.file.url" v-bind:alt="secondaryPageImage.description">
    </div>
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
            title: this.title,
            meta: [
                { hid: 'description', name: 'description', content: this.description },
                { hid: 'robots', name: 'robots', content: this.robots },
                { hid: 'keywords', name: 'keywords', content: this.keywords },
                { hid: 'author', name: 'author', content: this.author },
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
        robots: '',
        title: '',
        author: '',
        keywords: '',
        description: '',
        pageName: '',
        mainPageHeader: '',
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
                    // meta tags
                    this.robots = this.object.robots ? entry.fields.robots : 'index, follow',
                    this.title = this.object.title ? entry.fields.title : `${this.pageName} | AttracDev`,
                    this.author = this.object.author ? entry.fields.author : 'AttracDev',
                    this.keywords = this.object.keywords ? entry.fields.keywords : '',
                    this.description = this.object.description ? entry.fields.description : ''
                    // body content
                    this.pageName = this.object.pageName ? entry.fields.pageName : ''
                    this.mainPageHeader = this.object.mainPageHeader ? entry.fields.mainPageHeader : this.object.pageName
                    this.mainPageImage = this.object.mainPageImage ? entry.fields.mainPageImage.fields : ''
                    this.contentText = this.object.contentText ? documentToHtmlString(entry.fields.contentText) : ''
                    this.secondaryPageImage = this.object.secondaryPageImage ? entry.fields.secondaryPageImage.fields : ''
                    this.additionalContentText = this.object.additionalContentText ? documentToHtmlString(entry.fields.additionalContentText) : ''
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
@import '~/styles/typography.css';
    @media screen and (min-width: 1366px) {
        .container-grid-1 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 25px;
            align-items: center;
        }
        .container-grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 25px;
            align-items: center;
        }
        .grid-item {
            align-self: center;
        }
    }
    .page-name {
        /* using global typography */
    }
    .main-page-image, .secondary-page-image {
        margin-bottom: 20px;
    }
    .content-text {
        margin-bottom: 15px;
    }
    .content-text ::v-deep(h2), .additional-content-text ::v-deep(h2) {
        /* margin-bottom: 2rem; */
        /* using global typography */
    }
    .content-text ::v-deep(h3), .additional-content-text ::v-deep(h3) {
        /* using global typography */
    }

    .content-text ::v-deep(h4, h5), .additional-content-text ::v-deep(h4, h5) {
        /* using global typography */
    }
    .content-text ::v-deep(h4), .additional-content-text ::v-deep(h4) {
        /* margin-bottom: 0.5rem; */
    }
    .content-text ::v-deep(li), .additional-content-text ::v-deep(li) {
        margin-left: 1.5rem;
        margin-bottom: -1rem;
        /* using global typography */
    }
    .content-text ::v-deep(ul) , .additional-content-text ::v-deep(ul) {
        margin-bottom: 0.5rem;
    }
    .content-text ::v-deep(ol) , .additional-content-text ::v-deep(ol) {
        margin-bottom: 0.5rem;
    }
    .content-text ::v-deep(ol li), .additional-content-text ::v-deep(ol li) {
        margin-bottom: -20px;
    }

    .additional-content-text,  ::v-deep(h2) {
        padding-bottom: 2rem;
        /* using global typography */
        margin-top: 5px;
    }

    .additional-content-text ::v-deep(h3, h4, h5) {
        padding-bottom: 2rem;
        /* using global typography */
    }

    .content-text ::v-deep(p), .additional-content-text ::v-deep(p) {
        margin-bottom: 40px;
        /* using global typography */
    }
    .additional-content-text ::v-deep(p) {
        margin-bottom: 20px;
        /* using global typography */
    }
</style>