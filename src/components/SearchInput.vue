<template>
  <div class="field">
    <p class="control has-icons-left">
      <input
        class="input"
        type="search"
        placeholder="Search"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      >
      <span class="icon is-small is-left">
        <i class="fas fa-search" />
      </span>
    </p>
  </div>
</template>

<script setup>
  import { defineEmit, defineProps } from 'vue'

  const props = defineProps({
    modelValue: String
  })
  const emit = defineEmit(['update:modelValue'])
</script>
