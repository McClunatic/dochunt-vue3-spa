<template>
  <div class="field has-addons">
    <p class="control has-icons-left is-expanded">
      <input
        class="input"
        type="search"
        placeholder="Search"
        :value="modelValue"
        @input="emitValue($event)"
      >
      <span class="icon is-small is-left">
        <i class="fas fa-search" />
      </span>
    </p>
    <div class="control">
      <search-best-dropdown />
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import SearchBestDropdown from './SearchBestDropdown.vue'

export default {
  components: { SearchBestDropdown },
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const emitValue = event => emit('update:modelValue', event.target.value)
    return { emitValue }
  }
}
</script>

<style scoped>
  p.control {
    margin-bottom: 0 !important;
  }
</style>