<template>
  <p
    v-if="loading"
    class="has-text-centered"
  >
    Loading...
  </p>
  <table
    v-else-if="results.length > 0"
    class="table container"
  >
    <thead>
      <tr>
        <th
          v-for=" name in columns"
          :key="name"
          @click="updateSortColumns(name)"
        >
          <span class="icon-text">
            <span>{{ name }}</span>
            <span class="icon sort-icon">
              <i :class="['fas', sortIcon(name)]" />
            </span>
            <span v-if="sortIndex(name) > -1">{{ sortIndex(name) + 1 }}</span>
            <span
              v-if="sortIndex(name) > -1"
              class="icon remove-icon"
              @click.stop="removeSortColumns(name)"
            >
              <i class="fas fa-times-circle" />
            </span>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="result in sortedResults"
        :key="result.id"
      >
        <td
          v-for="name in columns"
          :key="name"
        >
          {{ result[name] }}
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
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const results = computed(() => store.state.search.results)
const loading = computed(() => store.state.search.loading)

const columns = ['id', 'title', 'author', 'date']
const sortColumns = ref([])

const sortIcon = name => {
  const found = sortColumns.value.find(elem => elem.name === name)
  if (found === undefined) return 'fa-sort'
  else return found.descending ? 'fa-sort-down' : 'fa-sort-up'
}

const updateSortColumns = name => {
  const found = sortColumns.value.find(elem => elem.name === name)
  if (found === undefined) sortColumns.value.push({ name, descending: true })
  else found.descending = !found.descending
}

const sortIndex = name => sortColumns.value.findIndex(el => el.name === name)

const removeSortColumns = name => {
  sortColumns.value.splice(sortIndex(name), 1)
}

const sortedResults = computed(() => {
  if (sortColumns.value.length === 0) return results.value
  else return [...results.value].sort((a, b) => {
    for (let column of sortColumns.value) {
      console.log(column)
      if (a[column.name] < b[column.name]) return -column.descending
      else if (a[column.name] > b[column.name]) return column.descending
    }
    return 0
  })
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

.fa-sort, .remove-icon {
  color: lightgray;
}

.remove-icon:hover {
  color: gray;
}

.icon-text {
  display: inline;
  white-space: nowrap;
}
</style>