<template>
  <search-bar-input />
  <search-bar-button-group class="centered" />
</template>

<script setup>
import SearchBarInput from './SearchBarInput.vue'
import SearchBarButtonGroup from './SearchBarButtonGroup.vue'
</script>

<style>
.centered {
  justify-content: center !important;
}
</style>