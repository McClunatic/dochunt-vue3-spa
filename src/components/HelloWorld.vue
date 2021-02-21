<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a> |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <button @click="callApi">Call API</button>
  <p v-if="apiResponse">{{ apiResponse }}</p>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import axios from 'axios'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
const apiResponse = reactive('')

function callApi() {
  if (store.state.msal.account === null) return

  // TODO: pull API endpoint definitions out of here
  const endpoint = import.meta.env.PROD
    ? 'https://paper-scope-6-api.azurewebsites.net'
    : 'http://127.0.0.1:21383/'

  msalApp.acquireTokenSilent({
    account: store.state.msal.account,
    scopes: store.state.msal.scopes
  }).then((res) => {
    console.log('acquireTokenSilent result:');
    console.log(res);
    headers = { Authorization: `Bearer ${res.accessToken}` }
    return axios.get(endpoint, { headers });
  })
  .then((res) => {
    console.log('API request result:');
    console.log(res);
    apiResponse.value = res.data.message;
  })
  .catch((err) => {
    console.log(err);
  });
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>