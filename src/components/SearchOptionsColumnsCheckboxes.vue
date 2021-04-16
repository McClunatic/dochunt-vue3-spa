<template>
  <div class="field is-grouped is-align-items-center is-flex-wrap-wrap">
    <div
      v-for="column in allColumns"
      :key="column"
      class="control"
    >
      <label class="checkbox is-small">
        <input
          :id="column"
          v-model="columns"
          class="is-small"
          type="checkbox"
          :value="column"
        >
        {{ column }}
      </label>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const columns = ref([...store.state.search.columns])
    const allColumns = computed(() => store.state.search.allColumns)

    watch(
      columns,
      newColumns => store.dispatch('search/updateColumns', newColumns)
    )

    return {
      store,
      columns,
      allColumns
    }
  }
}
</script>

<style scoped>
  label.is-small {
    font-size: 0.75rem;
  }

  div.field {
    margin-left: 1.5rem;
  }
</style>
