import axios from 'axios'

// initial state
const state = () => ({
  results: [],
  loading: false,
  time: 0.0
})

// getters
const getters = {}

// mutations
const mutations = {
  updateResults(state, results) {
    state.results = results
  },
  updateLoading(state, loading) {
    state.loading = loading
  },
  updateTime(state, time) {
    state.time = time
  }
}

// actions
const actions = {
  async updateResults({ commit, rootState, rootGetters }) {
    const endpoint = import.meta.env.PROD
      ? 'https://paper-scope-6-api.azurewebsites.net'
      : 'http://127.0.0.1:21383'
    const msalInstance = rootGetters['msal/instance']
    const tokenRequest = {
      account: rootState.msal.account,
      scopes: rootState.msal.scopes
    }
    let results = []
    try {
      commit('updateLoading', true)
      const response = await msalInstance.acquireTokenSilent(tokenRequest)
      const headers = { Authorization: `Bearer ${response.accessToken}` }
      const startTime = new Date().getTime()
      const apiResponse = await axios.get(`${endpoint}/search/`, { headers })
      commit('updateTime', new Date().getTime() - startTime)
      console.log(apiResponse)
      results = apiResponse.data
    } catch (error) {
      commit('updateTime', 0)
      console.log(error.message)
      console.log(error.response)
    }
    commit('updateResults', results)
    commit('updateLoading', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
