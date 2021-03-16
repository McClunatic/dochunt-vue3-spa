<template>
  <div
    v-if="!loading"
    class="has-text-justified"
  >
    {{ results.length }} results found ({{ time }} ms)
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const loading = computed(() => store.state.search.loading)
  const results = computed(() => store.state.search.results)
  const time = computed(() => store.state.search.time)
</script>

<style>
  .has-text-justified {
    font-size: 0.9rem;
  }
</style>
