<template>
  <div>
    <search-input
      v-model="searchText"
      @keyup.enter.exact="doSearch('lda')"
      @keyup.enter.shift.exact="doSearch('elk')"
    />
    <div class="field is-grouped centered">
      <div class="control">
        <a
          class="button is-link"
          @click.stop="doSearch('lda')"
        >
          Scope Search
        </a>
      </div>
      <div class="control">
        <a
          class="button"
          @click.stop="doSearch('elk')"
        >
          Search
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SearchInput from './SearchInput.vue'

export default {
  components: { SearchInput },
  setup() {
    const router = useRouter()
    const store = useStore()

    const searchText = ref('')

    const tab = computed(() => store.state.search.tab)

    const doSearch = mode => router.push({
      path: `/search/${tab.value}`,
      query: {
        q: searchText.value,
        p: 1,
        m: mode
      }
    })

    return {
      router,
      store,
      searchText,
      tab,
      doSearch
    }
  }
}
</script>

<style>
  .centered {
    justify-content: center !important;
  }
</style>