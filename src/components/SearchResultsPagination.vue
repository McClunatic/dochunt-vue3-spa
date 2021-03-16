<template>
  <nav
    class="pagination"
    role="navigation"
    aria-label="pagination"
  >
    <router-link
      class="pagination-previous"
      :disabled="page == 1 ? true : null"
      :to="`${route.path}?p=${page - 1}`"
    >
      Previous
    </router-link>
    <router-link
      class="pagination-next"
      :disabled="page == numPages ? true : null"
      :to="`${route.path}?p=${page + 1}`"
    >
      Next
    </router-link>
    <ul class="pagination-list">
      <li v-if="page > 2">
        <router-link
          :to="`${route.path}?p=1`"
          class="pagination-link"
          aria-label="Go to page 1"
        >
          1
        </router-link>
      </li>
      <li v-if="page > 3">
        <a class="pagination-ellipsis">&hellip;</a>
      </li>
      <li v-if="page > 1">
        <router-link
          :to="`${route.path}?p=${page - 1}`"
          class="pagination-link"
          :aria-label="`Go to page ${page - 1}`"
        >
          {{ page - 1 }}
        </router-link>
      </li>
      <li>
        <router-link
          :to="`${route.path}?p=${page}`"
          class="pagination-link is-current"
          :aria-label="`Go to page ${page}`"
        >
          {{ page }}
        </router-link>
      </li>
      <li v-if="numPages - page > 0">
        <router-link
          :to="`${route.path}?p=${page + 1}`"
          class="pagination-link"
          :aria-label="`Go to page ${page + 1}`"
        >
          {{ page + 1 }}
        </router-link>
      </li>
      <li v-if="numPages - page > 2">
        <a class="pagination-ellipsis">&hellip;</a>
      </li>
      <li v-if="numPages - page > 1">
        <router-link
          :to="`${route.path}?p=${numPages}`"
          class="pagination-link"
          :aria-label="`Go to page ${numPages}`"
        >
          {{ numPages }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'

  const route = useRoute()
  const store = useStore()

  const page = computed(() => parseInt(route.query.p || '1'))
  const numPages = computed(() => store.getters['search/numPages'])
</script>
