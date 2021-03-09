<template>
  <div class="is-flex is-flex-direction-column">
    <nav-bar class="is-flow-grow-0" />
    <div class="columns is-centered is-vcentered is-flex-grow-1">
      <div class="container is-fluid is-centered">
        <p
          v-if="loading"
          class="has-text-centered"
        >
          Loading...
        </p>
        <table
          v-else-if="results.length > 0"
          class="table margined"
        >
          <thead>
            <tr>
              <th
                v-for="(value, name) in displayResults[0]"
                :key="name"
              >
                {{ name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="result in displayResults"
              :key="result.id"
            >
              <td
                v-for="(value, name) in result"
                :key="name"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
        <p
          v-else
          class="has-text-centered"
        >
          No results to display.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const store = useStore()
const results = computed(() => store.state.search.results)
const loading = computed(() => store.state.search.loading)

const displayResults = computed(() => {
  const cond = (({ id, title, author, date}) => ({ id, title, author, date}))
  return results.value.map(cond)
})

watch(
  () => route.params,
  () => store.dispatch('search/updateResults'),
  { immediate: true }
)
</script>

<style>
.margined {
  margin-top: 16px;
}

.is-flex.is-flex-direction-column {
  height: 98%;
}
</style>
