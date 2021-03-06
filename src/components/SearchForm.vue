<template>
  <search-input />
  <div class="field is-grouped centered">
    <div class="control">
      <scope-search-button />
    </div>
    <div class="control">
      <search-button />
    </div>
  </div>
</template>

<script setup>
import SearchInput from './SearchInput.vue'
import ScopeSearchButton from './ScopeSearchButton.vue'
import SearchButton from './SearchButton.vue'
</script>

<style>
.centered {
  justify-content: center !important;
}
</style>