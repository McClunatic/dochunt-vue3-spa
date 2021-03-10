<template>
  <div class="is-flex is-flex-direction-column">
    <nav-bar class="is-flow-grow-0" />
    <div class="columns is-centered is-vcentered is-flex-grow-1">
      <div class="container is-fluid is-centered">
        <search-results-table />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import SearchResultsTable from '../components/SearchResultsTable.vue'
</script>

<style>
.is-flex.is-flex-direction-column {
  height: 98%;
}
</style>
