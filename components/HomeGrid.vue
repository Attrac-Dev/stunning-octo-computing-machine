<template>
    <!-- Grid Area wrapper-->
<div class="content-grid-wrapper">
        <div class="above-fold">
            <div class="left">
                <section class="intro-content">
                    <h1>{{ mainHeader }}</h1>
                    <h2>{{ mainSubHeader }}</h2>
                    <h3>{{  mainH3 }}</h3>
                </section>
                <div class="call-to-action-block">
                    <button class="round-button cta">{{ mainCTA }}</button>
                    <button class="round-button cta2">{{ mainCTA2 }}</button>
                </div>
            </div>
            <div class="right">
                <div class="hero-image">
                <!-- <a href="https://storyset.com/online">Online illustrations by Storyset</NuxtLink> Use this link to attribute some images to Storyset -->
                <!-- <img src="~/static/temp-hero-img.png" alt="Testing image"> -->
                <img v-if="mainImage" :src="mainImage.file.url" v-bind:alt="mainImage.description">
            </div>
            </div>
        </div>
        

    
    <div class="other-content">
        <div class="services-headers breakout">
            <!-- main header -->
            <h2 class="service-header">{{ servicesHeader }}</h2>
            <!-- main subheader -->
            <h3 class="service-header">{{ servicesSubheader }}</h3>
            <!-- main description -->
            <h5 class="service-header">{{ servicesDescription }}</h5>
        </div>

        <div class="card-wrapper">
            <HomeCard v-for="(service, index) in services" :key="index"
                :header="service.serviceCardType"
                :subheader="service.serviceCardDescription"
                :imgPath="service.serviceCardIcon.url"
                :alt="service.serviceCardIcon.description"
                :nuxtlinkPath="service.serviceCardLinkPath"
            />
        </div>
        
    </div>
</div>
</template>


<style scoped>
@import '~/styles/vars.css';
@import '~/styles/misc.css';

.breakout {
    /* go beyond the wrapping container */
    margin-left:   calc(50% - 50vw);
    margin-right:  calc(50% - 50vw);
    padding-left:  calc(50vw - 50%);
    padding-right: calc(50vw - 50%);
}
.services-headers {
    background-color: var(--brand-blue);
    padding: 2rem 4rem 4rem 4rem;
    
}
.service-header {
    color: var(--brand-white);
}

@media screen and (min-width: 1200px) {
    .content-grid-wrapper {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .content-grid-wrapper, .other-content {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(1, 1fr);
        column-gap: 25px;
        align-items: center;
    }
    .above-fold, .card-wrapper {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
    }

}


</style>

<script>
// import here
import { createClient } from '../plugins/contentful'
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { BLOCKS, MARKS } from '@contentful/rich-text-types'

const contentfulClient = createClient();
import HomeCard from './HomeCard.vue'

export default {
    data: (instance) => ({
        test: 0,
        // entryID: '4faDEHz7CtVqZtgFbJO4GK',
        entryID: instance.id,
        object: {},
        // contentful Page specific fields
        pageName: '',
        mainHeader: '',
        mainSubHeader: '',
        mainH3: '',
        mainImage: '',
        mainCTA: '',
        mainCTA2: '',
        servicesHeader: '',
        servicesSubheader: '',
        servicesDescription: '',
        services: [],
        robots: '',
        author: '',
        metaDescription: '',
        keywords: '',
        title: '',

    }),
    head() {
        return {
            title: this.title,
            meta: [
                { hid: 'description', name: 'description', content: this.description },
                { hid: 'robots', name: 'robots', content: this.robots },
                { hid: 'keywords', name: 'keywords', content: this.keywords },
                { hid: 'author', name: 'author', content: this.author }
            ]
        }
    },
    components: { HomeCard },
        setup() {

    },
    async created() {
      this.fetchContent()

    },
    mounted() {
        console.log('HomeGrid component has been mounted')
    },
    methods: {
        // component specific methods here
        getNested(obj){
            // map obj.fields => service: {serviceCardType, serviceCardDescription, serviceCardIcon}
            var services = obj.map(function(service){

                return ({   
                    "serviceCardIcon": {
                        "title": service.fields.serviceCardIcon.fields.title,
                        "description": service.fields.serviceCardIcon.fields.description,
                        "url": service.fields.serviceCardIcon.fields.file.url,
                        "fileName": service.fields.serviceCardIcon.fields.file.fileName
                    },
                    "serviceCardType": service.fields.serviceCardType,
                    "serviceCardDescription": service.fields.serviceCardDescription,
                    "serviceCardLinkPath": service.fields.linkPath,
                })
            }) 
            // console.log(JSON.stringify(services))
            return services
        },
        async fetchContent() {
            try {
                // had to use the getEntries instead of getEntry, because getEntry does not return the linked entry values
                const entries = await contentfulClient.getEntries({
                    'sys.id':this.entryID
                })
                if (entries) {
                    console.log("we got the entries")
                    entries.items.forEach((entry) => {
                        this.object = entry.fields
                        // meta tags
                        this.robots = this.object ? entry.fields.robots : 'noindex, nofollow',
                        this.title = this.object ? entry.fields.title: `${this.pageName} | AttracDev`,
                        this.author = this.object ? entry.fields.author: 'AttracDev',
                        this.keywords = this.object ? entry.fields.keywords: '',
                        this.description = this.object ? entry.fields.metaDescription: ''
                        // body content
                        // main header, main sub-header, main h3, main image, main cta, main cta2, services header, services sub-header, services description, services[]
                        this.pageName = this.object ? entry.fields.pageName : ''

                        this.mainHeader = this.object ? entry.fields.h1 : ''
                        this.mainSubHeader = this.object ? entry.fields.mainSubHeader : ''
                        this.mainH3 = this.object ? entry.fields.h3 : ''
                        this.mainImage = this.object ? entry.fields.mainImage.fields : ''
                        this.mainCTA = this.object ? entry.fields.mainCTA : ''
                        this.mainCTA2 = this.object ? entry.fields.mainCTA2 : ''
                        this.servicesHeader = this.object ? entry.fields.servicesH2 : ''
                        this.servicesSubheader = this.object ? entry.fields.servicesH3 : ''
                        this.servicesDescription = this.object ? entry.fields.servicesDescription : ''
                        // this.services = this.object ? entry.fields.services : ''
                        // this.services = this.object ? entry.fields.services : ''  // returns array of card ids             
                    })
                    // try to get the nested service info
                    this.services = this.object ? this.getNested(this.object.services) : []
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