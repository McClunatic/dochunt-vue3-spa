<template>
  <dark v-if="isDark" class="content" />
  <light v-else class="content" />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Light from './themes/Light.vue'
import Dark from './themes/Dark.vue'

export default {
  components: { Light, Dark },
  setup() {
    const store = useStore()
    store.dispatch('msal/createInstance')

    const isDark = computed(() => (
      store.state.theme === 'dark'
    ))

    return { isDark }
  }
}
</script>

<style lang="scss">
  @import 'animate.css/animate.min.css';
  @import '@fortawesome/fontawesome-free/css/all.min.css';

  html, body, #app {
    height: 100%;
  }

  #app > .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>