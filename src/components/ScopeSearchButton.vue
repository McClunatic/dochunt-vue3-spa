<template>
  <router-link
    class="button is-primary"
    :to="`/search/${tab}?p=1`"
  >
    Scope Search
  </router-link>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const tab = computed(() => store.state.search.tab)
</script>