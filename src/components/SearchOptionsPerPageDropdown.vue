<template>
  <div
    ref="dropdown"
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const isActive = ref(false)
    const dropdown = ref(null)
    const perPageOptions = [3, 5, 10, 20, 50]

    const perPage = computed(() => store.state.search.perPage)

    const close = event => {
      if (!dropdown.value.contains(event.target)) isActive.value = false
    }

    onMounted(() => document.addEventListener('click', close))
    onUnmounted(() => document.removeEventListener('click', close))

    return {
      store,
      isActive,
      dropdown,
      perPageOptions,
      perPage
    }
  }
}
</script>

<style scoped>
  .dropdown {
    margin-left: 1.5rem;
  }
  .dropdown-content > a {
    font-size: 0.75rem;
  }
</style>
