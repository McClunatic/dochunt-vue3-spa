<template>
  <div
    class="dropdown"
    :class="{ 'is-active': isActive }"
    @click="isActive = !isActive"
  >
    <div class="dropdown-trigger">
      <button
        class="button is-light"
        aria-haspopup="true"
        aria-controls="num-best-dropdown-menu"
      >
        <span class="icon is-small">
          <i class="fas fa-award" />
        </span>
        <span>{{ numBest }}</span>
        <span class="icon is-small">
          <i
            class="fas fa-angle-down"
            aria-hidden="true"
          ></i>
        </span>
      </button>
    </div>
    <div
      id="num-best-dropdown-menu"
      class="dropdown-menu"
      role="menu"
    >
      <div class="dropdown-content">
        <a
          v-for="option in numBestOptions"
          :key="option"
          class="dropdown-item"
          :class="{ 'is-active': option == numBest }"
          @click="store.dispatch('search/updateNumBest', option)"
        >
          <span>{{ option }} best results</span>
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
    const numBestOptions = [10, 50, 500, 10000]

    const numBest = computed(() => store.state.search.numBest)

    return {
      store,
      isActive,
      numBestOptions,
      numBest
    }
  }
}
</script>

<style>
  .dropdown-content > a {
    font-size: 0.75rem;
  }
</style>
