<template>
  <nav-bar />
  <img
    alt="Vue logo"
    src="../assets/logo.png"
  >
  <hello-world :msg="msg" />
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import NavBar from '../components/NavBar.vue'
import HelloWorld from '../components/HelloWorld.vue'

const store = useStore();
const account = computed(() => store.state.msal.account)
const username = computed(() => store.getters['msal/username'] || '<unknown>')
const msg = computed(() => `Hi ${username.value} from Vue Router!`)
</script>
