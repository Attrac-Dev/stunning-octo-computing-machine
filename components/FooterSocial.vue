<template>
    <div>
    <section class="ft-social">
        <ul class="ft-social-list">
            <li><a href="https://tiktok.com/@attracdev/" target="_blank"><font-awesome-icon :icon="['fab', 'tiktok']" class="social-icon" /></a></li>
            <!-- <li><a href="#" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']"  /></a></li> -->
            <li><a href="https://twitter.com/attracdev" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" class="social-icon" /></a></li>
            <li><a href="https://instagram.com/attracdev/" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']" class="social-icon" /></a></li>
            <li><a href="https://github.com/Attrac-Dev" target="_blank"><font-awesome-icon :icon="['fab', 'github']" class="social-icon" /></a></li>
            <!-- <li><a href="#" target="_blank"><font-awesome-icon :icon="['fab', 'linkedin']"  /></a></li> -->
            <li><a href="https://youtube.com/channel/UCmRdPCkCDIt9d8iTSBuH6Fw" target="_blank"><font-awesome-icon :icon="['fab', 'youtube']" class="social-icon" /></a></li>
        </ul>
    </section>
    <div v-if="isHome" class="icon-credit">Icons made by <a class="icon-credit-link" href="https://www.flaticon.com/authors/vectoricons" title="Vectoricons"> Vectoricons </a> from <a class="icon-credit-link" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    <div v-else class="icon-credit">illustrations made by <a href="https://storyset.com/" class="icon-credit-link">Storyset.com</a></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: '',
      isHome: false
    }
  },
  watch: {
    $route(to, from) {
      this.getPage()
      this.setCredit()
    }
  },
  mounted() {
    this.getPage()
    this.setCredit()
  },
  methods: {
    getPage() {
      this.currentPage = this.$route.name
    },
    setCredit() {
      this.isHome = this.currentPage === 'index'
    }
  }
}
</script>

<style scoped>
.social-icon {
    color: var(--highlight-color)
}

.social-icon:hover, .social-icon:active {
    color: var(--accent-color);
}

.icon-credit {
    display: flex;
    justify-content: center;
    color: var(--brand-blue);
}

.icon-credit-link {
    color: var(--brand-blue);
    margin: 0 5px;
}

.icon-credit-link:hover, .icon-credit-link:active {
    color: var(--accent-color);
    text-decoration: underline;
}
</style>