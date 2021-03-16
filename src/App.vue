<template>
  <div class="content">
    <nav-bar />
    <router-view />
    <footer />
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import NavBar from './components/NavBar.vue'

  const store = useStore()

  store.dispatch('msal/createInstance')
</script>

<style lang="scss">
  @import 'bulma/css/bulma.css';
  @import '@fortawesome/fontawesome-free/css/all.css';

  html, body, #app {
    height: 100%;
  }

  #app > .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>