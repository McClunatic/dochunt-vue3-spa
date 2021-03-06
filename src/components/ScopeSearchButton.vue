<template>
  <a
    class="button is-primary"
    @click="router.push('/search')"
  >
    Scope Search
  </a>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>