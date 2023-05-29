<!-- Child Component -->
<template>

        <div class="content-container" v-if="entry">
            <h1 data-aos="fade" data-aos-delay="1000" data-aos-offset="-10" data-aos-anchor="top-top" data-aos-duration="1600" v-if="pageName" class="page-name">{{ mainPageHeader }}</h1>
            <div class="container-grid-1">
                <img data-aos="fade-right" data-aos-offset="-500" data-aos-delay="800" ata-aos-easing="ease-in" data-aos-duration="1200" class="main-page-image grid-item fade-in" v-if="mainPageImage" :src="mainPageImage.fields.file.url" v-bind:alt="mainPageImage.fields.description" v-bind:title="mainPageImage.fields.title" />
                <div data-aos="fade-left" data-aos-offset="-500" data-aos-delay="800" ata-aos-easing="ease-in" data-aos-duration="1200" class="content-text grid-item" v-html="printEntries(contentText)"></div>
            </div>
            <div class="container-grid-2">
                <div data-aos="fade-right" data-aos-offset="20" data-aos-delay="800" ata-aos-easing="ease-in" data-aos-duration="1200" class="additional-content-text grid-item" v-if="additionalContentText" v-html="printEntries(additionalContentText)"></div>
                <img data-aos="fade-left" data-aos-offset="20" data-aos-delay="800" ata-aos-easing="ease-in" data-aos-duration="1200" class="secondary-page-image grid-item fade-in" v-if="secondaryPageImage" :src="secondaryPageImage.fields.file.url" v-bind:alt="secondaryPageImage.fields.description" v-bind:title="secondaryPageImage.fields.title" />
            </div>
        </div>

        <div v-else>
        <p>This content couldn't not be found</p>
        </div>

  </template>
  
  <script>
    import { pageLog } from '../functions/logging'
  import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
  export default {
    data() {
        return {
            title: '',
            robots: '',
            keywords: '',
            description: '',
            author: '',
            pageName: '',
            mainPageHeader: '',
            mainPageImage: '',
            contentText: '',
            secondaryPageImage: '',
            additionalContentText: '',
        }
    },
    props: {
      entry: {
        type: Object,
        required: true
      }
    },
    methods: {
        printEntries(doc) {
            return documentToHtmlString(doc)
        }
    },
    created() {
        // this.title =    this.entry.title
        // this.robots =   this.entry.robots
        // this.keywords = this.entry.keywords
        // this.description =  this.entry.description
        // this.author =   this.entry.author
        this.pageName =     this.entry.pageName ? this.entry.pageName : 'ERROR RETRIEVING PAGE NAME'
        this.mainPageHeader =   this.entry.mainPageHeader ? this.entry.mainPageHeader : this.entry.pageName
        this.mainPageImage =    this.entry.mainPageImage ? this.entry.mainPageImage : ''
        this.contentText =  this.entry.contentText ? this.entry.contentText : 'ERROR RETRIEVING TEXT'
        this.secondaryPageImage =   this.entry.secondaryPageImage ? this.entry.secondaryPageImage : ''
        this.additionalContentText =    this.entry.additionalContentText ? this.entry.additionalContentText : ''

        pageLog(this.entry)
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

    .main-page-image, .secondary-page-image {
        margin-bottom: 20px;
    }
    .content-text {
        margin-bottom: 15px;
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