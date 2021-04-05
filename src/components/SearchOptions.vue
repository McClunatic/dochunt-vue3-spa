<template>
  <div class="is-flex is-flex-direction-row is-align-items-center">
    <div
      class="font-small"
      :class="{ loading: loading }"
    >
      {{ statsMessage }}
    </div>
    <search-options-per-page-dropdown v-if="tab !== 'plot'" />
    <search-options-columns-checkboxes v-if="tab === 'table'" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SearchOptionsPerPageDropdown from './SearchOptionsPerPageDropdown.vue'
import SearchOptionsColumnsCheckboxes from './SearchOptionsColumnsCheckboxes.vue'

export default {
  components: { SearchOptionsPerPageDropdown, SearchOptionsColumnsCheckboxes },
  setup() {
    const store = useStore()

    const loading = computed(() => store.state.search.loading)
    const results = computed(() => store.state.search.results)
    const time = computed(() => store.state.search.time)
    const tab = computed(() => store.state.search.tab)

    const statsMessage = computed(() => (
      loading.value
        ? 'Searching'
        : `${results.value.length} results found (${time.value} ms)`
    ))

    return {
      store,
      loading,
      results,
      time,
      tab,
      statsMessage
    }
  }
}
</script>

<style>
  .font-small {
    font-size: 0.9rem;
  }

  /* https://stackoverflow.com/questions/13014808/
     is-there-anyway-to-animate-an-ellipsis-with-css-animations */
  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4,end) 900ms infinite;
    animation: ellipsis steps(4,end) 900ms infinite;
    content: "";
    width: 20px;
  }

  @keyframes ellipsis {
    0% {content: ''; }
    25% { content: '.'; }
    50% { content: '..'; }
    75% { content: '...'; }
    100% { content: ''; }
  }

  @-webkit-keyframes ellipsis {
    0% {content: ''; }
    25% { content: '.'; }
    50% { content: '..'; }
    75% { content: '...'; }
    100% { content: ''; }
  }
</style>
