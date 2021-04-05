<template>
  <div>
    <div class="columns is-centered is-multiline is-flex is-flex-direction-row">
      <search-tabs class="column is-11 search-tabs" />
      <search-options class="column is-11 search-options" />
    </div>
    <div class="columns is-centered">
      <div class="column is-11 search-content">
        <router-view
          v-slot="{ Component, route }"
        >
          <transition
            :enter-active-class="route.meta.enterClass"
            :leave-active-class="route.meta.leaveClass"
          >
            <component
              :is="Component"
              :key="`${route.path}?p=${route.query.p}&q=${route.query.q}`"
              class="search-component"
            />
          </transition>
        </router-view>
        <search-pagination />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import SearchOptions from '../components/SearchOptions.vue'
import SearchTabs from '../components/SearchTabs.vue'
import SearchPagination from '../components/SearchPagination.vue'

export default {
  components: { SearchOptions, SearchTabs, SearchPagination },
  setup() {
    const route = useRoute()
    return { route }
  }
}
</script>

<style>
  div.column.search-tabs {
    margin-bottom: 0;
  }

  div.column.search-options {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  div.search-content {
    position: relative;
  }

  .leaving {
    position: absolute;
    top: 12px;  /* matching relative position of entering component */
  }
</style>
