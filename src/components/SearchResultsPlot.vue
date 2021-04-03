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

  watch(chartData, newData => {
    chart.value.data = newData
    chart.value.update()
  })

  onMounted(() => {
    chart.value = new Chart(canvas.value, {
      type: 'scatter',
      data: chartData.value,
      options: {
        title: {
          display: true,
          text: 't-SNE Clustering of Article Topics'
        },
        elements: {
          point: {
            radius: ctx => ctx.dataIndex === 0 ? 6 : 3,
            display: true
          }
        },
        onClick: (event) => {
          const nearest = chart.value.getElementsAtEventForMode(
            event,
            'nearest',
            {axis: 'xy', intersect: true}
          )
          if (nearest.length === 0) return
          console.log(nearest[0]._index)
          console.log(chartData.value.datasets[0].data[nearest[0]._index])
        }
      }
    })
  })
</script>

<style>
  .container {
    height: 100%;
  }
</style>