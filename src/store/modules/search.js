import axios from 'axios'

// initial state
const state = () => ({
  results: []
})

// getters
const getters = {}

// mutations
const mutations = {
  updateResults(state, results) {
    state.results = results
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
      const response = await msalInstance.acquireTokenSilent(tokenRequest)
      const headers = { Authorization: `Bearer ${response.accessToken}` }
      const apiResponse = await axios.get(`${endpoint}/search`, { headers })
      console.log(apiResponse)
      results = apiResponse.data
    } catch (error) {
      console.log(error.message)
      console.log(error.response)
    }
    commit('updateResults', results)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
