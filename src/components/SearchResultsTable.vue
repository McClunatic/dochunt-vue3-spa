<template>
  <div>
    <p
      v-if="loading"
      class="has-text-centered"
    >
      Loading...
    </p>
    <table
      v-else-if="results.length > 0"
      class="table container">
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
          v-for="result in pageSortedResults(page)"
          :key="result.id"
        >
          <td
            v-for="name in columns"
            :key="name"
            :class="{ 'date-text': name.toLowerCase() === 'date' }"
          >
            <span v-if="name === 'title'">
              <a
                :href="result.href"
                target="_blank"
              >
                {{ format(result[name]) }}
                <span class="icon is-small">
                  <i class="fas fa-external-link-alt" />
                </span>
              </a>
            </span>
            <span v-else>{{ format(result[name]) }}</span>
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
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  const columns = ['title', 'author', 'date', 'similarity']

  const sortColumns = ref([])

  const results = computed(() => store.state.search.results)
  const loading = computed(() => store.state.search.loading)
  const time = computed(() => store.state.search.time)
  const perPage = computed(() => store.state.search.perPage)
  const page = computed(() => parseInt(route.query.p || '1'))

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
    else return found.asc ? 'fa-sort-up' : 'fa-sort-down'
  }

  const sortIndex = name => sortColumns.value.findIndex(el => el.name === name)

  const updateSortColumns = name => {
    const found = sortColumns.value.find(elem => elem.name === name)
    if (found === undefined) sortColumns.value.push({ name })
    else found.asc = !found.asc
    router.push({
      path: route.path,
      query: {
        ...route.query,
        s: sortColumns.value.map(elem => elem.name),
        a: sortColumns.value.filter(elem => elem.asc).map(elem => elem.name)
      }
    })
  }

  const removeSortColumns = name => {
    sortColumns.value.splice(sortIndex(name), 1)
    router.push({
      path: route.path,
      query: {
        ...route.query,
        s: sortColumns.value.map(elem => elem.name),
        a: sortColumns.value.filter(elem => elem.asc).map(elem => elem.name)
      }
    })
  }

  const sortedResults = computed(() => {
    if (sortColumns.value.length === 0) return results.value
    else return [...results.value].sort((a, b) => {
      for (let column of sortColumns.value) {
        const asc = column.asc ? -1 : 1
        if (a[column.name] < b[column.name]) return asc
        else if (a[column.name] > b[column.name]) return -asc
      }
      return 0
    })
  })

  const pageSortedResults = currentPage => sortedResults.value.slice(
    perPage.value * (page.value - 1),
    perPage.value * page.value
  )

  watch(
    () => route.query,
    newQuery => {
      let srt = route.query.s || []
      if (!(srt instanceof Array)) srt = [srt]
      let asc = route.query.a || []
      if (!(asc instanceof Array)) asc = [asc]
      sortColumns.value = srt.map(elem => (
        asc.includes(elem) ? { name: elem, asc: true } : { name: elem }
      ))
    },
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