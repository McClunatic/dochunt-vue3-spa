<template>
  <div class="columns is-multiline">
    <div
      v-for="result in pageResults(page)"
      :key="result"
      class="card column is-12"
    >
      <div class="card-header">
        <p class="card-header-title">
          <span class="has-text-grey">{{ result.author }}:&nbsp;</span>
          {{ strip(result.title) }}
        </p>
        <p class="card-header-icon">
          <span>{{ result.similarity }}</span>
        </p>
      </div>
      <div class="columns card-content">
        <div class="column is-10">
          <span class="has-text-grey">{{ format(result.date) }} — </span>
          {{ terminate(result.description) }}
        </div>
        <div class="column is-2 groups">
          <span
            v-for="group in result.groups"
            :key="group"
            class="tag is-light"
          >
            {{ group }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'

  const route = useRoute()
  const store = useStore()

  const results = computed(() => store.state.search.results)
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

  const strip = text => text.endsWith(' - The Ringer') ? text.slice(0, -13) : text
  const terminate = text => text.endsWith('.') ? text : `${text}.`

  const pageResults = currentPage => results.value.slice(
    perPage.value * (page.value - 1),
    perPage.value * page.value
  )
</script>

<style>
.card {
  padding: 0.25rem 0.75rem;
  margin-bottom: 0.5rem;
}

.card:first-child {
  margin-top: 0.5rem;
}

.card-content {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
}

.card-header > p.card-header-title {
  margin-bottom: 0;
}

.tag {
  margin: 1px;
}

.groups {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>

