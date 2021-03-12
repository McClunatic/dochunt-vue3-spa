<template>
  <nav
    class="navbar"
    role="navigation"
    aria-role="main navigation"
  >
    <div class="navbar-brand">
      <router-link
        class="navbar-item"
        to="/"
      >
        <img
          alt="Paper Scope 6 logo"
          src="../assets/paper-scope-6-reishi-crosshair-primary.png"
        >
      </router-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="app-navbar"
        @click="toggleMenu"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div
      id="app-navbar"
      class="navbar-menu"
      :class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <router-link
          class="navbar-item"
          to="/"
        >
          Home
        </router-link>
        <a
          class="navbar-item"
          href="#"
        >
          Docs
        </a>
        <div
          v-if="route.path === '/search'"
          class="navbar-item"
        >
          <search-input />
        </div>
        <div
          v-if="route.path === '/search'"
          class="navbar-item"
        >
          <div class="buttons">
            <scope-search-button />
            <search-button />
          </div>
        </div>
      </div>
      <div
        v-if="authEnabled"
        class="navbar-end"
      >
        <nav-bar-user-element />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SearchInput from './SearchInput.vue'
import ScopeSearchButton from './ScopeSearchButton.vue'
import SearchButton from './SearchButton.vue'
import NavBarUserElement from './NavBarUserElement.vue'

const route = useRoute()
let isActive = ref(false)

const toggleMenu = () => {
  isActive.value = !isActive.value
}
const authEnabled = import.meta.env.VITE_AUTH_ENABLED
</script>
