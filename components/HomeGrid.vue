<template>
    <!-- Grid Area wrapper-->
<div class="content-grid-wrapper">

    <section class="intro-content">
        <h4>SaaS Web Design & Development</h4>
        <h1>Outstanding SaaS <br class="nudge">Web Development Agency</h1>
        <h3>We help SaaS and Tech Companies reach their full potential, but helping them attract new customers. To do this, we craft beautiful, responsive and fast custom websites.</h3>
    </section>
    <div class="call-to-action-block">
       <button class="round-button cta">Contact Us ></button>
       <button class="round-button cta2">Learn More</button>
    </div>
    <div class="hero-image">
      <!-- <a href="https://storyset.com/online">Online illustrations by Storyset</NuxtLink> Use this link to attribute some images to Storyset -->
        <!-- <img src="~/static/temp-hero-img.png" alt="Testing image"> -->
        <img src="~/static/Asset selection-bro.svg" alt="Website layout illustration">
    </div>
    <div class="other-content">
        <h4>Why AttracDev?</h4>
        <h2>SaaS Web Development Agency</h2>
        <h5>Find out why so many SaaS companies <br class="hide-mobile" />want to work with us.</h5>
        <div class="card-wrapper">
           <HomeCard 
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
            />

        </div>
        
    </div>
</div>
</template>

<style>
    @import '~/styles/grid.css';
</style>

<script>
import HomeCard from './HomeCard.vue'
export default {
    head: {
        title: 'AttracDev Development & Design',
        meta: [
            {
                hid: 'home',
                description: 'home page',
                content: 'home page content'
            }
        ]
    },
    components: { HomeCard },
        setup() {

    },
    mounted() {
        console.log('HomeGrid component has been mounted')
    }
}
</script>