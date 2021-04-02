<template>
  <div class="columns is-centered">
    <div class="container column is-9">
    <canvas ref="canvas" />
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import Chart from 'chart.js'

  const container = ref(null)
  const canvas = ref(null)
  const store = useStore()

  const chartData = computed(() => store.getters['search/chartData'])

  let chart = ref(null)

  onMounted(() => {
    chart.value = new Chart(canvas.value, {
      type: 'scatter',
      data: chartData.value,
      options: {
        title: {
          display: true,
          text: 't-SNE Clustering of Article Topics'
        },
      }
    })
  })
</script>

<style>
  .container {
    height: 100%;
  }
</style>