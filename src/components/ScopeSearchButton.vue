<template>
  <a
    class="button is-primary"
    @click="router.push(`/search/${tab}`)"
  >
    Scope Search
  </a>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const router = useRouter()
  const store = useStore()
  const tab = computed(() => store.state.search.tab)
</script>