<template>
  <div class="tabs">
    <ul>
      <li
        v-for="tabName in tabs"
        :key="tabName"
        :class="{ 'is-active': tab === tabName.toLowerCase() }"
      >
        <a @click="switchTab(tabName)">
          {{ tabName }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const tabs = ['Table', 'Cards', 'Plot']
  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  const tab = computed(() => store.state.search.tab)

  const switchTab = name => router.push({
    path: `/search/${name.toLowerCase()}`,
    query: route.query
  })
</script>