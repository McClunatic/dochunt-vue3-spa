<template>
  <div
    class="has-text-justified"
    :class="{ loading: loading }"
  >
    {{ statsMessage }}
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const loading = computed(() => store.state.search.loading)
  const results = computed(() => store.state.search.results)
  const time = computed(() => store.state.search.time)

  const statsMessage = computed(() => (
    loading.value
      ? 'Loading'
      : `${results.value.length} results found (${time.value} ms)`
  ))
</script>

<style>
  .has-text-justified {
    font-size: 0.9rem;
  }

  /* https://stackoverflow.com/questions/13014808/
     is-there-anyway-to-animate-an-ellipsis-with-css-animations */
  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4,end) 900ms infinite;
    animation: ellipsis steps(4,end) 900ms infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
    width: 0px;
  }

  @keyframes ellipsis {
    to {
      width: 20px;
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 20px;
    }
  }
</style>
