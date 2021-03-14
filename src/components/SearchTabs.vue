<template>
  <div class="tabs">
    <ul>
      <li
        v-for="tabName in tabs"
        :key="tabName"
        :class="{ 'is-active': tab === tabName.toLowerCase() }"
      >
        <router-link :to="`/search/${tabName.toLowerCase()}`">
          {{ tabName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { computed, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'

  const tabs = ['Table', 'Cards', 'Plot']
  const route = useRoute()
  const store = useStore()
  const tab = computed(() => store.state.search.tab)

  watch(
    () => route.params,
    params => params.tab && store.dispatch('search/updateTab', params.tab),
    { immediate: true }
  )
</script>