<template>
    <nav>
        <ul class="menu">
            <li class="logo"><NuxtLink to="/" >
                <img id="logo" src="~/static/AttracDev_Vector_Logo.svg" alt="AttracDev logo">
            </NuxtLink></li>
            <li class="item"><NuxtLink to="/" >Home</NuxtLink></li>
            <li class="item"><NuxtLink to="/about" >About</NuxtLink></li>
            <li class="item has-submenu">
                <a tabindex="0">Services</a>
                <ul class="submenu">
                    <li class="subitem"><NuxtLink to="/services/design" >Design</NuxtLink></li>
                    <li class="subitem"><NuxtLink to="/services/development" >Development</NuxtLink></li>
                    <li class="subitem"><NuxtLink to="/services/podcasts" >Podcasts</NuxtLink></li>
                    <li class="subitem"><NuxtLink to="/services/videos" >Videos</NuxtLink></li>
                    <li class="subitem"><NuxtLink to="/services/copywriting" >Copywriting</NuxtLink></li>
                    <li class="subitem"><NuxtLink to="/services/social media" >Social Media</NuxtLink></li>
                    <li class="subitem"><NuxtLink to="/services/emails" >Emails</NuxtLink></li>
                    <li class="subitem"><NuxtLink to="/services/etc" >Etc.</NuxtLink></li>
                </ul>
            </li>
            <li class="item has-submenu">
                <a tabindex="0">Plans</a>
                <ul class="submenu">
                    <li class="subitem"><NuxtLink to="/plans/freelancer" >Freelancer</NuxtLink></li>
                    <li class="subitem"><NuxtLink to="/plans/startup" >Startup</NuxtLink></li>
                    <li class="subitem"><NuxtLink to="/plans/enterprise" >Enterprise</NuxtLink></li>
                </ul>
            </li>
            <li class="item"><a href="#">Blog</a></li> <!-- external link to blog subdomain -->
            <li class="item"><NuxtLink to="/contact" >Contact</NuxtLink>
            </li>
            <li class="item button"><a href="#">Log In</a></li>
            <li class="item button secondary"><a href="#">Sign Up</a></li>
            <li class="toggle">
                <button class="hamburger hamburger--emphatic" type="button">
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>  
            </li>
        </ul>
    </nav>
</template>

<style>
    @import '~/styles/navigation.css';
</style>

<script>
import { navigationScript } from '~/functions/navigation.js'
export default {
    data: () => ({
        name: 'navigation'
    }),
    mounted() {
        navigationScript()
    }
    
}
</script>