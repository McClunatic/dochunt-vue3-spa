<template>
  <div class="columns is-centered is-vcentered is-flex-grow-1">
    <div class="column is-three-fifths">
      <div class="columns is-multiline">
        <logo class="column is-10 is-offset-1 logo" />
        <search-form class="column is-full search-form" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Logo from '../components/Logo.vue'
  import NavBar from '../components/NavBar.vue'
  import SearchForm from '../components/SearchForm.vue'
</script>

<style>
  .logo {
    margin-bottom: 24px;
  }

  .search-form {
    padding-bottom: 40px;
  }
</style>
