<template>
  <nav class="navbar" role="navigation" aria-role="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img alt="Vue logo" src="../assets/logo.png" height="28"/>
      </a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="app-navbar"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      id="app-navbar"
      class="navbar-menu"
      :class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
      <a class="navbar-item" href="#">
        Documentation
      </a>
      </div>
      <div v-if="authEnabled" class="navbar-end">
        <nav-bar-user-element />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import NavBarUserElement from './NavBarUserElement.vue'
let isActive = ref(window.innerWidth >= 1024)
const toggleMenu = () => {
  isActive.value = !isActive.value
}
const authEnabled = import.meta.env.VITE_AUTH_ENABLED
</script>