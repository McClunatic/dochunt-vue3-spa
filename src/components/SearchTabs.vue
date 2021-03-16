<template>
  <div class="tabs">
    <ul>
      <li
        v-for="tabName in tabs"
        :key="tabName"
        :class="{ 'is-active': tab === tabName.toLowerCase() }"
      >
        <router-link :to="`/search/${tabName.toLowerCase()}${tabQuery}`">
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
  const page = computed(() => parseInt(route.query.p || '1'))
  const tabQuery = computed(name => name !== 'plot' ? `?p=${page.value}`: '')
</script>