<template>
    <!-- Grid Area wrapper-->
<div class="content-grid-wrapper">

    <section class="intro-content">
        <h1>{{ mainHeader }}</h1>
        <h2>{{ mainSubHeader }}</h2>
        <h3>{{  mainH3 }}</h3>
    </section>
    <div class="call-to-action-block">
       <button class="round-button cta">{{ mainCTA }}</button>
       <button class="round-button cta2">{{ mainCTA2 }}</button>
    </div>
    <div class="hero-image">
      <!-- <a href="https://storyset.com/online">Online illustrations by Storyset</NuxtLink> Use this link to attribute some images to Storyset -->
        <!-- <img src="~/static/temp-hero-img.png" alt="Testing image"> -->
        <img v-if="mainImage" :src="mainImage.file.url" v-bind:alt="mainImage.description">
        
    </div>
    <div class="other-content">
        <!-- main header -->
        <h4>{{ servicesHeader }}</h4>
        <!-- main subheader -->
        <h2>{{ servicesSubheader }}</h2>
        <!-- main description -->
        <h5>{{ servicesDescription }}</h5>
        <div class="card-wrapper">

            <HomeCard v-for="(service, index) in services" :key="index"
                :header="service.serviceCardType"
                :subheader="service.serviceCardDescription"
                :imgPath="service.serviceCardIcon.url"
                :alt="service.serviceCardIcon.description"
                :nuxtlinkPath="service.serviceCardLinkPath"
            />

            <!-- <HomeCard 
                :id=services[0]
            />
            <hr class="mobile-card-divider"> -->
           <!-- <HomeCard
            :header="'Design'" 
            :subheader="'We provide bespoke website designs that are not only responsive, but also engaging. Your website is the heart of your presence online. Putting your best foot forward by creating an attractive website is only the first step to building relationships online.'" 
            :imgPath="'/screen.svg'"
            :alt="'computer icon'"
            :linkPath="'design'"
            />

            <hr class="mobile-card-divider">
            <HomeCard 
            :header="'Development'" 
            :subheader="'We can either sprinkle just a little bit of Javascript throughout your site, or we can create a powerful web app from the ground up.'" 
            :imgPath="'/web-development.svg'"
            :alt="'computer icon'"
            :linkPath="'development'"
            />
            
            <hr class="mobile-card-divider">
            
            <HomeCard 
            :header="'Email Newsletters'" 
            :subheader="'Reach out to your client base by offering them a monthly newsletter. These have been shown to have a very high engagement rate and can generate repeat customers.'" 
            :imgPath="'/email-marketing.svg'"
            :alt="'letter icon'"
            :linkPath="'emails'"
            />
            
            <hr class="mobile-card-divider">

            <HomeCard 
            :header="'Podcasting'" 
            :subheader="'Producing your own weekly podcast can create garner a large fan base. Advertising in other podcasts can also help engage with potential customers.'" 
            :imgPath="'/microphone.svg'"
            :alt="'microphone icon'"
            :linkPath="'podcasts'"
            />

            <hr class="mobile-card-divider">

            <HomeCard 
            :header="'Video Marketing'" 
            :subheader="'Videos are a great way to establish your brand with new customers. Ads, reviews, interviews, product placement and more have become a proven way to introduce new customers to your product or service.'" 
            :imgPath="'/video-marketing.svg'"
            :alt="'video icon'"
            :linkPath="'videos'"
            />

            <hr class="mobile-card-divider">


            <HomeCard 
            :header="'A/B Testing'" 
            :subheader="'Sometimes one design resonates more with customers than another would. The concept of A/B testing is to try two different designs and let the data show which is the more effective option.'" 
            :imgPath="'/a-b testing.svg'"
            :alt="'A/B Test icon'"
            :linkPath="'etc'"
            />

            
            <hr class="mobile-card-divider">

            <HomeCard 
            :header="'Social Media Management'" 
            :subheader="'Engaging with customers on the many different social media platforms can be exhausting. We can help to streamline the process and get you the results you are looking for.'" 
            :imgPath="'/social-media.svg'"
            :alt="'Social Media icon'"
            :linkPath="'social%20media'"
            />

           
            <hr class="mobile-card-divider">

            <HomeCard 
            :header="'Reviews & Testimonials'" 
            :subheader="'Word of mouth has always been the best way to generate new customers. There are a lot of new ways to do this in the digital age. Having genuine reviews from actual customers can build your brand in ways that nothing else can match.'" 
            :imgPath="'/message-bubble.svg'"
            :alt="'word bubble icon'"
            :linkPath="'etc'"
            /> -->

        </div>
        
    </div>
</div>
</template>

<style>
    @import '~/styles/grid.css';

    h1 {
        font-weight: 600;
        font-size: 2rem;
    }

    h2 {
        font-weight: 300;
        padding-bottom: 2rem;
    }

    h3 {
        font-weight: 200;
        margin-top: 5px;
        padding-bottom: 2rem;
    }

    h4, h5 {
        font-weight: 300;
    }

    .other-content {
        position: relative; /* set the position to relative */
        left: 50%; /* move the element 50% to the right */
        transform: translateX(-50%); /* move the element back 50% to the left */
        width: 100vw; /* set the width to 100% of the viewport width */
        padding: 3rem;
    }
    @media only screen and (max-width: 800px) {
        /* style only mobile devices */
        .hero-image {
            background-color: transparent;
            padding: 0 0;
        }
    }

    @media only screen and (max-width: 500px) {
        /* style only smaller screen widths */
        .hero-image {
            margin-top: -150px;
            margin-bottom: -150px;
        }
    }

    @media only screen and (max-width: 375px) {
        /* style only smallest screens */
        .intro-content {
            padding: 0 0;
        }
        .hero-image {
            margin: 20px 0 10px 0;
            height: 300px;
        }
        section.other-content {
            margin: auto;
            width: 80%;
        }
        .card-sub-header {
            /* font-size: larger; */
            padding: 0;
            margin: auto;
            width: 100%;
        }
        .other-content {
            margin: -300px 0;
        }
        .card {
            padding: 0;
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