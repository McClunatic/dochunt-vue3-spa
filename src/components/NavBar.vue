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
          v-if="isSearch"
          class="navbar-item"
        >
          <search-input
            v-model="searchText"
            @keyup.enter="doSearch('lda')"
            @keyup.shift.enter="doSearch('elk')"
          />
        </div>
        <div
          v-if="isSearch"
          class="navbar-item"
        >
          <div class="buttons">
            <a
              class="button is-primary"
              :disabled="isDisabled('lda')"
              @click.stop="doSearch('lda')"
            >
              Scope Search
            </a>
            <a
              class="button"
              :disabled="isDisabled('elk')"
              @click.stop="doSearch('elk')"
            >
              Search
            </a>
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

<script>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SearchInput from './SearchInput.vue'
import NavBarUserElement from './NavBarUserElement.vue'

export default {
  components: { SearchInput, NavBarUserElement },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const authEnabled = (
      import.meta.env.VITE_AUTH == 'popup' ||
      import.meta.env.VITE_AUTH == 'redirect'
    )

    const isActive = ref(false)
    const searchText = ref('')

    const tab = computed(() => store.state.search.tab)
    const isSearch = computed(() => route.path.startsWith('/search'))
    const numResults = computed(() => store.state.search.results.length)
    const numBest = computed(() => store.state.search.numBest)

    const isDisabled = mode => {
      const disabled = !(
        route.query.q !== searchText.value ||
        numBest.value > numResults.value ||
        route.query.m !== mode
      )
      return disabled || null
    }

    const toggleMenu = () => {
      isActive.value = !isActive.value
    }

    const doSearch = mode => router.push({
      path: `/search/${tab.value}`,
      query: {
        q: searchText.value,
        p: 1,
        m: mode
      }
    })

    watch(
      () => route.query,
      () => searchText.value = route.query.q,
      { immediate: true }
    )

    return {
      route,
      router,
      store,
      authEnabled,
      isActive,
      searchText,
      tab,
      isSearch,
      isDisabled,
      toggleMenu,
      doSearch
    }
  }
}
</script>

<style>
  .field > p.control {
    margin-bottom: 0 !important;
  }
</style>
