<template>
  <div class="navbar-item is-flex is-align-items-center">
    <div class="switch">
      <a
        class="icon slider"
        :class="{ checked }"
        @click="toggleTheme"
      >
        <i
          class="fas"
          :class="themeIcon" />
      </a>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const theme = computed(() => store.state.theme)
    const checked = computed(() => theme.value === 'dark')
    const themeIcon = computed(() => checked.value ? 'fa-moon' : 'fa-sun')

    const toggleTheme = () => {
      if (theme.value === 'dark')
        store.dispatch('updateTheme', 'light')
      else
        store.dispatch('updateTheme', 'dark')
    }

    return {
      checked,
      themeIcon,
      toggleTheme
    }
  }
}
</script>

<style scoped>
  .switch {
    position: relative;
    display: inline-block;
    height: 1rem;
    width: 2.5rem;
    border-radius: 0.5rem;
    background: white;
  }

  .slider {
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    cursor: pointer;
    -webkit-transition: .4s;
    transition: .4s;
    color: gold;
    background-color: lightskyblue;
  }

  .slider.checked {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    color: ghostwhite;
    background-color: midnightblue;
  }
</style>
