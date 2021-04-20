<template>
  <div class="content">
    <nav-bar />
    <router-view />
    <footer />
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'

export default {
  components: { NavBar },
  setup() {
    const store = useStore()
    store.dispatch('msal/createInstance')

    const theme = computed(() => store.state.theme)

    const setDarkTheme = () => {
      let link = document.getElementById('app-theme')
      if (link === null) {
        const head = document.getElementsByTagName('head')[0]
        link = document.createElement('link')
        link.id = 'app-theme'
        link.type = 'text/css'
        link.rel = 'stylesheet'
        link.media = 'all'
        head.appendChild(link)
      }
      const themeName = theme.value === 'dark' ? 'darkly' : 'flatly'
      link.href = `/${themeName}.bulmaswatch.min.css`
    }

    onMounted(() => {
      let preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      if (theme.value !== preferred) store.dispatch('updateTheme', preferred)
    })

    setDarkTheme()

    watch(theme, setDarkTheme)
  }
}
</script>

<style lang="scss">
  @import 'bulma/css/bulma.min.css';
  @import 'animate.css/animate.min.css';
  @import '@fortawesome/fontawesome-free/css/all.min.css';

  html, body, #app {
    height: 100%;
  }

  #app > .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  nav.navbar {
    border-radius: 0;
  }
</style>