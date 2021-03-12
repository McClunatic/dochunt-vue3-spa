<template>
  <p
    v-if="loading"
    class="has-text-centered"
  >
    Loading...
  </p>
  <div v-else-if="results.length > 0">
    <p class="container has-text-justified">
      {{ results.length }} results found ({{ time }} ms)
    </p>
    <table class="table container">
      <thead>
        <tr>
          <th
            v-for="name in columns"
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
            :class="{ 'date-text': name.toLowerCase() === 'date' }"
          >
            {{ format(result[name]) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
const time = computed(() => store.state.search.time)

const columns = ['id', 'title', 'author', 'date']
const sortColumns = ref([])

const format = data => {
  const re =
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/
  if (re.test(data))
    return new Intl.DateTimeFormat(
      'en-US',
      { dateStyle: 'medium' }
    ).format(Date.parse(data))
  else return data
}

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
p.container {
  font-size: 0.9rem;
  margin-top: 0.9rem;
  margin-bottom: 0.45rem;
}

th:hover {
  border-color: darkgray;
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

.date-text {
  white-space: nowrap;
}
</style>