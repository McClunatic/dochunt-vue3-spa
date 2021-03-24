import axios from 'axios'

// initial state
const state = () => ({
  results: [],
  loading: false,
  time: 0.0,
  tab: 'table',
  perPage: 5,
  columns: ['title', 'author', 'date', 'similarity'],
  allColumns: [
    'id',
    'href',
    'title',
    'description',
    'image',
    'tags',
    'groups',
    'author',
    'date',
    'content',
    'similarity',
  ]
})

// getters
const getters = {
  numPages(state) {
    return Math.ceil(state.results.length / state.perPage)
  }
}

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
  },
  updateTab(state, tab) {
    state.tab = tab
  },
  updatePerPage(state, perPage) {
    state.perPage = perPage
  },
  updateColumns(state, columns) {
    columns.sort((a, b) => (
      state.allColumns.findIndex(e => e === a) <
      state.allColumns.findIndex(e => e === b) ? -1 : 1
    ))
    state.columns = columns
  },
}

// actions
const actions = {
  async updateResults({ commit, rootState, rootGetters }, query) {
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
      const opts = { params: { q: query } }
      if (import.meta.env.VITE_AUTH_ENABLED == 'true') {
        const response = await msalInstance.acquireTokenSilent(tokenRequest)
        opts['headers'] = { Authorization: `Bearer ${response.accessToken}` }
      }
      const startTime = new Date().getTime()
      const apiResponse = await axios.get(`${endpoint}/search/`, opts)
      commit('updateTime', new Date().getTime() - startTime)
      results = apiResponse.data
    } catch (error) {
      commit('updateTime', 0)
      console.log(error.message)
      console.log(error.response)
    }
    commit('updateResults', results)
    commit('updateLoading', false)
  },
  async updateTab(context, tab) {
    context.commit('updateTab', tab)
  },
  async updatePerPage(context, perPage) {
    context.commit('updatePerPage', perPage)
  },
  async updateColumns(context, columns) {
    context.commit('updateColumns', columns)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
