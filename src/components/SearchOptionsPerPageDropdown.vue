<template>
  <div
    class="dropdown"
    :class="{ 'is-active': isActive }"
    @click="isActive = !isActive"
  >
    <div class="dropdown-trigger">
      <button
        class="button is-small"
        aria-haspopup="true"
        aria-controls="per-page-dropdown-menu"
      >
        <span>{{ perPage }} results per page</span>
        <span class="icon is-small">
          <i
            class="fas fa-angle-down"
            aria-hidden="true"
          ></i>
        </span>
      </button>
    </div>
    <div
      id="per-page-dropdown-menu"
      class="dropdown-menu"
      role="menu"
    >
      <div class="dropdown-content">
        <a
          v-for="option in perPageOptions"
          :key="option"
          class="dropdown-item"
          :class="{ 'is-active': option == perPage }"
          @click="store.dispatch('search/updatePerPage', option)"
        >
          <span>{{ option }} results per page</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const isActive = ref(false)
    const perPageOptions = [3, 5, 10, 20, 50]

    const perPage = computed(() => store.state.search.perPage)

    return {
      store,
      isActive,
      perPageOptions,
      perPage
    }
  }
}
</script>

<style>
  .dropdown {
    margin-left: 1.5rem;
  }
  .dropdown-content > a {
    font-size: 0.75rem;
  }
</style>
