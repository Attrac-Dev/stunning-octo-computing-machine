<template>
    <!-- Grid Area wrapper-->
<div class="content-grid-wrapper">
        <div class="above-fold">
            <div class="left">
                <section class="intro-content">
                    <h1 class="intro-header blue-text" data-aos="fade-left" data-aos-delay="400" data-aos-duration="600">{{ mainHeader }}</h1>
                    <h2 class="intro-header grey-text" data-aos="fade-right" data-aos-delay="800" data-aos-duration="600">{{ mainSubHeader }}</h2>
                    <h3 class="intro-header indigo-text" data-aos="fade-left" data-aos-delay="1200" data-aos-duration="600">{{  mainH3 }}</h3>
                </section>
                <div class="call-to-action-block breakout">
                    <VariableButton data-aos="fade-right" ata-aos-easing="linear" data-aos-duration="600" data-aos-delay="1600" class="cta-button" :color="'var(--brand-blue)'" :filled="true" :link="'contact/consulting'" :text=mainCTA :textColor="'white'" />
                    <VariableButton data-aos="fade-left" ata-aos-easing="linear" data-aos-duration="600" data-aos-delay="1600" class="cta-button" :color="'var(--brand-blue)'" :filled="true" :link="'/contact/quote'" :text=mainCTA2 :textColor="'white'" />
                </div>
            </div>
            <div class="right">
                <div class="hero-image">
                <!-- <a href="https://storyset.com/online">Online illustrations by Storyset</NuxtLink> Use this link to attribute some images to Storyset -->
                <!-- <img src="~/static/temp-hero-img.png" alt="Testing image"> -->
                <img v-if="mainImage" :src="mainImage.fields.file.url" v-bind:alt="mainImage.fields.description" v-bind:title="mainImage.fields.title">
            </div>
            </div>
        </div>
        

    
    <div class="other-content">
        <div data-aos-offset="80" data-aos-anchor="center-bottom" data-aos="fade-right" ata-aos-easing="linear" data-aos-duration="600" data-aos-delay="3000" class="services-headers breakout">
            <!-- main header -->
            <h2 class="service-header">{{ servicesHeader }}</h2>
            <!-- main subheader -->
            <h3 class="service-header">{{ servicesSubheader }}</h3>
            <!-- main description -->
            <h4 class="service-header">{{ servicesDescription }}</h4>
        </div>

        <div class="card-wrapper">
            <HomeCard v-for="(service, index) in services" :key="index"
                :header="service.serviceCardType"
                :subheader="service.serviceCardDescription"
                :imgPath="service.serviceCardIcon.url"
                :alt="service.serviceCardIcon.description"
                :imgTitle="service.serviceCardIcon.title"
                :nuxtlinkPath="service.serviceCardLinkPath"
                :cta-text="service.linkText"
            />
        </div>
        
    </div>
</div>
</template>

<script>
// import here
import { createClient } from '../plugins/contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { pageLog } from '../functions/logging'
const contentfulClient = createClient();
import HomeCard from './HomeCard.vue'
import VariableButton from './VariableButton.vue';

export default {
    data() {
        return {
            // meta data
            title: '',
            robots: '',
            keywords: '',
            description: '',
            author: '',
            // page data
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
        }
    },
    components: { HomeCard, VariableButton },
    methods: {
        printEntries(doc) {
            return documentToHtmlString(doc)
        },
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
                    "linkText": service.fields.linkText
                })
            }) 
            // console.log(JSON.stringify(services))
            return services
        },
    },
    created() {
        this.pageName =             this.entry.pageName ? this.entry.pageName : 'ERROR RETRIEVING PAGE NAME'
        this.mainHeader =           this.entry.h1 ? this.entry.h1 : this.entry.h1
        this.mainSubHeader =        this.entry.mainSubHeader ? this.entry.mainSubHeader : ''
        this.mainH3 =               this.entry.h3 ? this.entry.h3 : 'ERROR RETRIEVING TEXT'
        this.mainImage =            this.entry.mainImage ? this.entry.mainImage : ''
        this.mainCTA =              this.entry.mainCTA ? this.entry.mainCTA : ''
        // 
        this.mainCTA2 =             this.entry.mainCTA2 ? this.entry.mainCTA2 : ''
        this.servicesHeader =       this.entry.servicesH2 ? this.entry.servicesH2 : ''
        this.servicesSubheader =    this.entry.servicesH3 ? this.entry.servicesH3 : ''
        this.servicesDescription =  this.entry.servicesDescription ? this.entry.servicesDescription : ''
        this.services =             this.entry.services ? this.getNested(this.entry.services) : []

        pageLog(this.entry)
    },
    props: {
      entry: {
        type: Object,
        required: true
      }
    }
}
</script>

<style scoped>
@import '~/styles/vars.css';
@import '~/styles/typography.css';

.breakout {
    /* go beyond the wrapping container */
    margin-left:   calc(50% - 50vw);
    margin-right:  calc(50% - 50vw);
    padding-left:  calc(50vw - 50%);
    padding-right: calc(50vw - 50%);
}
.call-to-action-block {
    margin-top: 4rem;
    display: flex;
    justify-content: space-evenly;
}

.services-headers {
    background-color: var(--brand-indigo);
    padding: 2rem 4rem 4rem 4rem;
    box-shadow: 0 3px 1px var(--brand-dark-grey);

}
.service-header {
    color: var(--brand-white);
}

.blue-text {
     color: var(--brand-blue);
}
.grey-text {
    color: var(--brand-dark-grey);
    margin: 2rem 0;
}

.indigo-text {
    color: var(--brand-indigo);
}
.card-wrapper {
    margin-top: 5rem;
}

/* Huge Screens */
@media screen and (min-width: 1201px) {
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
/* Extra-large screens */
@media screen and (min-width: 1025px) and (max-width: 1200px) {
  /* styles for screens between 1025 and 1200 pixels go here */
}

/* Large screens */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  /* styles for screens between 769 and 1024 pixels go here */
}

/* medium screens */
@media screen and (min-width: 481px) and (max-width: 768px) {
        /* styles for screens between 481 and 768 pixels go here */
    .call-to-action-block {
        margin-top: 4rem;
        display: flex;
        /* justify-content: space-evenly; */
        flex: 1;
        flex-direction: column;
        align-items: center;
    }
    .intro-header {
        text-align: right;
    }
    .services-headers {
        padding-left:30px;
        padding-right: 15px;
    }

}

/* smallest screens */
@media screen and (max-width: 480px) {
    /* styles for screens smaller than 480 pixels go here */
    h1.intro-header {
        /* using global typography */
        text-align: right;
    }
    h2.intro-header {
        /* using global typography */
        text-align: right;
    }
    h3.intro-header {
        /* using global typography */
        text-align: right;
    }
    .call-to-action-block {
        margin-top: 4rem;
        display: flex;
        /* justify-content: space-evenly; */
        flex: 1;
        flex-direction: column;
        align-items: center;
    }
    .cta-button {
        margin: 1rem 0;
    }
    .services-headers {
        padding-left:15px;
        padding-right: 15px;
    }
}


</style>