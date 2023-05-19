<template>
    <nav>
        <ul class="menu">
            <li class="logo"><NuxtLink to="/" >
                <img id="logo" src="~/static/AttracDev_Vector_Logo.svg" alt="AttracDev logo">
            </NuxtLink></li>
            <li class="item no-submenu"><NuxtLink to="/" >Home</NuxtLink></li>
            <li class="item no-submenu"><NuxtLink to="/about" >About</NuxtLink></li>
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
                    <li class="subitem"><NuxtLink to="/services/branding" >Branding</NuxtLink></li>
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
            <li class="item no-submenu"><a href="https://attrac.dev" target="_blank">Blog</a></li> <!-- external link to blog subdomain -->
            <li class="item no-submenu"><NuxtLink to="/contact" >Contact</NuxtLink>
            </li>
            <!-- Show when user is NOT logged in -->
            <li class="item button hard-menu" :class="{ hidden: loggedIn }" ><NuxtLink to="/auth/login" >Login</NuxtLink></li> <!-- login-->
            <li class="item button secondary hard-menu" :class="{ hidden: loggedIn }" ><NuxtLink to="/auth/signup" >Sign Up</NuxtLink></li> <!--signup-->
            <!-- Show when user is logged in -->
            <li class="item button secondary hard-menu" :class="{ hidden: !loggedIn }" ><NuxtLink to="/auth/logout" >Log Out</NuxtLink></li> <!--logout-->


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
    @import '~/styles/vars.css';
    /* shows the active page in the menu */
    a.nuxt-link-exact-active {
        color: var(--brand-blue)
    }
    .menu {
        /* when menu closes */
        transition: opacity 0.3s ease-out;
    }

    nav {
        z-index: 1000;
    }                                      
    .item.has-submenu {
        cursor: pointer;
        /* the other menu items have a pointer, so added this to look similar */
    }
    .hidden {
        display: none !important;
    }
    li.hard-menu > .nuxt-link-exact-active.nuxt-link-active {
        background: var(--brand-indigo);
        color: white;
    }

</style>

<script>
import { navigationScript } from '~/functions/navigation.js'
export default {
    data: () => ({
        name: 'navigation',
        loggedIn: false
    }),    methods: {
        logIn() {
            // update loggedIn state to true
            this.loggedIn = true;
        },
        logOut() {
            // update loggedIn state to false
            this.loggedIn = false;
        }
    },
    mounted() {
        navigationScript()
    }
    
}
</script>