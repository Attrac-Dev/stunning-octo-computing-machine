<!-- Child Component -->
<template>

        <div class="content-container" v-if="entry">
            <h1 data-aos="fade-right" data-aos-delay="2600" data-aos-offset="-10" data-aos-anchor="top-top" data-aos-duration="300" v-if="pageName" class="page-name">{{ mainPageHeader }}</h1>
            <div class="container-grid-1">
                <img data-aos="fade-right" data-aos-offset="-500" data-aos-delay="100" ata-aos-easing="ease-in-out" data-aos-duration="900" class="main-page-image grid-item fade-in" v-if="mainPageImage" :src="mainPageImage.fields.file.url" v-bind:alt="mainPageImage.fields.description" v-bind:title="mainPageImage.fields.title" />
                <div data-aos="fade-left" data-aos-offset="-500" data-aos-delay="100" ata-aos-easing="ease-in-out" data-aos-duration="900" class="content-text grid-item" v-html="printEntries(contentText)"></div>
            </div>
            <div class="container-grid-2">
                <div data-aos="fade-right" data-aos-offset="20" data-aos-delay="100" ata-aos-easing="ease-in-out" data-aos-duration="900" class="additional-content-text grid-item" v-if="additionalContentText" v-html="printEntries(additionalContentText)"></div>
                <img data-aos="fade-left" data-aos-offset="20" data-aos-delay="100" ata-aos-easing="ease-in-out" data-aos-duration="900" class="secondary-page-image grid-item fade-in" v-if="secondaryPageImage" :src="secondaryPageImage.fields.file.url" v-bind:alt="secondaryPageImage.fields.description" v-bind:title="secondaryPageImage.fields.title" />
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
        },
        trackPageview() {
            const currPage = this.$route.path
            if (process.env.ENVIRONMENT === 'production') {
                this.$gtag.pageview(currPage)
                // leaving temp console log, purely for testing... Remember to remove it.
                console.log({
                    gTagEnabled: true,
                    gTagMessage: `Tracking view for "${currPage}"`
                })
            } else {
                console.log({
                    gTagEnabled: false,
                    gTagMessage: `Google Analytics tracking not enabled for "${currPage}" while ENVIRONMENT: ${process.env.ENVIRONMENT}`
                })
            }

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
        this.trackPageview()
    }
  }
  </script>
  
  <style scoped>
    @import '~/styles/typography.css';


    .main-page-image, .secondary-page-image {
        width: 100%;
    }
    .content-text ::v-deep h2::after {
    display: inline-block;
    font: var(--fa-font-solid);
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f076";
    transform: rotate(-90deg);
    color: var(--accent-color);
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
    position: relative;
    left: 0.75rem;
    top: 0;
    font-size: smaller;
    animation-name: slideIn;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-delay: 2.5s;
    animation-fill-mode: forwards;
    opacity: 0;
    }

    .additional-content-text ::v-deep h3::after {
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font: var(--fa-font-solid);
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f076";
    transform: rotate(-90deg);
    color: var(--accent-color);
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
    position: relative;
    left: 0.75rem;
    top: 0;
    font-size: smaller;
    animation-name: slideIn;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-delay: 5s;
    animation-fill-mode: forwards;
    opacity: 0;
    }

    @keyframes slideIn {
    from {
        transform: translateX(20rem) rotate(90deg);
        opacity: 0;
    }
    to {
        transform: translateX(0) rotate(-90deg);
        opacity: 1;
    }
    }


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