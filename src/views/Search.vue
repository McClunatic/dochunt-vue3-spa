<template>
  <div class="is-flex is-flex-direction-column">
    <nav-bar class="is-flow-grow-0" />
    <div class="columns is-centered is-vcentered is-flex-grow-1">
      <div class="column is-three-fifths">
        <div class="columns is-multiline">
          <div class="column is-10 is-offset-1">
            <logo class="margined" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '../components/Logo.vue'
import NavBar from '../components/NavBar.vue'
</script>

<style>
.margined {
  margin-bottom: 16px;
}

.is-flex.is-flex-direction-column {
  height: 98%;
}

.column.is-three-fifths {
  margin-bottom: 25vh;
}
</style>
