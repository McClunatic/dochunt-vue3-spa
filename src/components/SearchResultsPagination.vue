<template>
  <nav
    class="pagination"
    role="navigation"
    aria-label="pagination"
    :class="{'is-hidden': numPages === 0 || tab === 'plot'}"
  >
    <a
      class="pagination-previous"
      :disabled="page == 1 ? true : null"
      @click="switchPage(page - 1)"
    >
      Previous
    </a>
    <a
      class="pagination-next"
      :disabled="page == numPages ? true : null"
      @click="switchPage(page + 1)"
    >
      Next
    </a>
    <ul class="pagination-list">
      <li v-if="page > 2">
        <a
          class="pagination-link"
          aria-label="Go to page 1"
          @click="switchPage(1)"
        >
          1
        </a>
      </li>
      <li v-if="page > 3">
        <a class="pagination-ellipsis">&hellip;</a>
      </li>
      <li v-if="page > 1">
        <a
          class="pagination-link"
          :aria-label="`Go to page ${page - 1}`"
          @click="switchPage(page - 1)"
        >
          {{ page - 1 }}
        </a>
      </li>
      <li>
        <a
          class="pagination-link is-current"
          :aria-label="`Go to page ${page}`"
          @click="switchPage(page)"
        >
          {{ page }}
        </a>
      </li>
      <li v-if="numPages - page > 0">
        <a
          class="pagination-link"
          :aria-label="`Go to page ${page + 1}`"
          @click="switchPage(page + 1)"
        >
          {{ page + 1 }}
        </a>
      </li>
      <li v-if="numPages - page > 2">
        <a class="pagination-ellipsis">&hellip;</a>
      </li>
      <li v-if="numPages - page > 1">
        <a
          class="pagination-link"
          :aria-label="`Go to page ${numPages}`"
          @click="switchPage(numPages)"
        >
          {{ numPages }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  const page = computed(() => parseInt(route.query.p || '1'))
  const numPages = computed(() => store.getters['search/numPages'])
  const tab = computed(() => store.state.search.tab)

  const switchPage = newPage => router.push({
    path: route.path,
    query: {
      q: route.query.q,
      p: newPage
    }
  })
</script>
