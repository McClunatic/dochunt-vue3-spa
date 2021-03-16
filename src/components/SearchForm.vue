<template>
  <div>
    <search-input
      v-model="searchText"
      @keyup.enter="doSearch()"
    />
    <div class="field is-grouped centered">
      <div class="control">
        <scope-search-button @click.stop="doSearch()"/>
      </div>
      <div class="control">
        <search-button />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import SearchInput from './SearchInput.vue'
  import ScopeSearchButton from './ScopeSearchButton.vue'
  import SearchButton from './SearchButton.vue'

  const router = useRouter()
  const store = useStore()

  const searchText = ref('')

  const tab = computed(() => store.state.search.tab)

  const doSearch = () => router.push({
    path: `/search/${tab.value}`,
    query: {
      q: searchText.value,
      p: 1
    }
  })
</script>

<style>
  .centered {
    justify-content: center !important;
  }
</style>