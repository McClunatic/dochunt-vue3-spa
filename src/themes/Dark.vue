<template>
  <div>
    <nav-bar />
    <router-view />
    <footer />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
  components: { NavBar },
}
</script>

<style lang="scss">
  @import 'bulmaswatch/darkly/bulmaswatch.min.css';

  nav.navbar {
    border-radius: 0;
  }
</style>
