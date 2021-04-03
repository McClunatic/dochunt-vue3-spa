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
  import { Chart } from 'chart.js'

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
    // TODO: find out why tooltip options aren't working
    const label = item => results.value[item.index].title
    Chart.defaults.scatter.tooltips.callbacks.label = label

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
          if (nearest.length === 0 || results.value.length === 0) return
          window.open(results.value[nearest[0]._index].href, '_blank').focus()
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