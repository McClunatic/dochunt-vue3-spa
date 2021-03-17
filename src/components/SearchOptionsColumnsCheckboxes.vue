<template>
  <div class="field is-grouped is-align-items-center">
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

<script setup>
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const columns = ref([...store.state.search.columns])
  const allColumns = computed(() => store.state.search.allColumns)

  watch(
    columns,
    newColumns => store.dispatch('search/updateColumns', newColumns)
  )
</script>

<style>
  label.is-small {
    font-size: 0.75rem;
  }

  .field {
    margin-left: 1.5rem;
  }
</style>
