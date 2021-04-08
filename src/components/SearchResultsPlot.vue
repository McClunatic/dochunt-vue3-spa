<template>
  <div class="columns is-centered">
    <div class="container column is-9">
    <canvas ref="canvas" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import {
  Chart,
  ScatterController,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
 } from 'chart.js'

export default {
  setup() {
    const canvas = ref(null)
    const store = useStore()

    const results = computed(() => store.state.search.results)
    const chartData = computed(() => store.getters['search/chartData'])

    let chart = ref(null)

    watch(chartData, newData => {
      chart.value.data = newData
      chart.value.update()
    })

    onMounted(() => {
      Chart.register(
        ScatterController,
        LinearScale,
        PointElement,
        LineElement,
        Legend,
        Title,
        Tooltip
      )
      chart.value = new Chart(canvas.value, {
        type: 'scatter',
        data: chartData.value,
        options: {
          elements: {
            point: {
              radius: ctx => ctx.dataIndex === 0 ? 6 : 3,
              display: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 't-SNE Clustering of Article Topics'
            },
            tooltip: {
              callbacks: { 
                label: item => results.value[item.dataIndex].title
              }
            }
          },
          onClick: event => {
            const nearest = chart.value.getElementsAtEventForMode(
              event,
              'nearest',
              {axis: 'xy', intersect: true}
            )
            if (nearest.length === 0 || results.value.length === 0) return
            window.open(results.value[nearest[0].index].href, '_blank').focus()
          }
        }
      })
    })

    return {
      canvas
    }
  }
}
</script>

<style>
  .container {
    height: 100%;
  }
</style>