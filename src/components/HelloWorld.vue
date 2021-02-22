<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a> |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <button @click="getMessage">Get message from API</button>
  <p v-if="state.message">{{ state.message }}</p>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { computed, defineProps, reactive } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

defineProps({
  msg: String
})

const store = useStore()
const state = reactive({ count: 0, message: '' })

const msalAccount = computed(() => store.state.msal.account)
const msalScopes = computed(() => store.state.msal.scopes)

async function getMessage() {
  if (msalAccount.value === null) return

  // TODO: pull API endpoint definitions out of here
  const endpoint = import.meta.env.PROD
    ? 'https://paper-scope-6-api.azurewebsites.net'
    : 'http://127.0.0.1:21383/'

  const msalInstance = store.getters['msal/instance']
  const tokenRequest =  {
    account: msalAccount.value,
    scopes: msalScopes.value
  }
  try {
    const response = await msalInstance.acquireTokenSilent(tokenRequest)
    console.log('acquireTokenSilent result:')
    console.log(response)
    const headers = { Authorization: `Bearer ${response.accessToken}` }
    const apiResponse = await axios.get(endpoint, { headers })
    console.log('API request result:')
    console.log(apiResponse)
    state.message = apiResponse.data.message;
  } catch (error) {
    console.log('Caught error:')
    console.log(error.message)
    console.log(error.response)
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>