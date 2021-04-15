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
  @import 'bulma/css/bulma.min.css';
</style>
