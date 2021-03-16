<template>
  <nav-bar />
  <div class="columns is-centered is-multiline is-flex is-flex-direction-row">
    <search-tabs class="column is-11 search-tabs" />
    <search-stats class="column is-11 search-stats" />
  </div>
  <div class="columns is-centered">
    <div class="column is-11">
      <router-view />
    </div>
  </div>
  <footer />
</template>

<script setup>
  import NavBar from '../components/NavBar.vue'
  import SearchStats from '../components/SearchStats.vue'
  import SearchTabs from '../components/SearchTabs.vue'
</script>

<style>
div.column.search-tabs {
  margin-bottom: 0;
}

div.column.search-stats {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
</style>
