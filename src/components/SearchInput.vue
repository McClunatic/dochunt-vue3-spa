<template>
  <div class="field">
    <p class="control has-icons-left">
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
  </div>
</template>

<script>
import { toRefs } from 'vue'

export default {
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
