<template>
  <a class="button is-primary">
    Scope Search
  </a>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const tab = computed(() => store.state.search.tab)
</script>