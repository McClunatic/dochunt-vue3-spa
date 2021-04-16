<template>
  <div class="content">
    <nav-bar />
    <router-view />
    <footer />
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'

export default {
  components: { NavBar },
  setup() {
    const store = useStore()
    store.dispatch('msal/createInstance')

    const theme = computed(() => store.state.theme)

    const setTheme = () => ['dark', 'light'].forEach(thm => (
      document.getElementById(thm).media = theme.value === thm ? 'all' : 'none'
    ))

    setTheme()

    watch(theme, setTheme)
  }
}
</script>

<style lang="scss">
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