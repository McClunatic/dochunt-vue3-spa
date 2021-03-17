<template>
  <div class="tabs">
    <ul>
      <li
        v-for="tabName in tabs"
        :key="tabName"
        :class="{ 'is-active': tab === tabName.toLowerCase() }"
      >
        <a @click="switchTab(tabName)">
          <span class="icon is-small">
            <i :class="tabClass[tabName]" aria-hidden="true"></i>
          </span>
          <span>{{ tabName }}</span>
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
  const tabClass = {
    Table: 'fas fa-table',
    Cards: 'fas fa-address-card',
    Plot: 'fas fa-chart-bar',
  }
  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  const tab = computed(() => store.state.search.tab)

  const switchTab = name => router.push({
    path: `/search/${name.toLowerCase()}`,
    query: route.query
  })
</script>

<style>
  div.tabs > ul {
    margin-left: 1em;
    margin-top: 0.5em;
  }
</style>
