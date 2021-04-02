import axios from 'axios'

// initial state
const state = () => ({
  results: [],
  datasets: [],
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
  },
  chartData(state) {
    if (state.datasets === null) return []
    const colors = [
      'rgba(31, 119, 180, 0.5)',
      'rgba(255, 127, 14, 0.5)',
      'rgba(44, 160, 44, 0.5)',
      'rgba(214, 39, 40, 0.5)',
      'rgba(148, 103, 189, 0.5)',
      'rgba(140, 86, 75, 0.5)',
      'rgba(227, 119, 194, 0.5)',
      'rgba(127, 127, 127, 0.5)',
      'rgba(188, 189, 34, 0.5)',
      'rgba(23, 190, 207, 0.5)'
    ]
    return {datasets: state.datasets.map((dataset, index) => ({
      data: dataset,
      label: `Topic ${index + 1}`,
      backgroundColor: colors[index % colors.length]
    }))}
  }
}

// mutations
const mutations = {
  updateResults(state, results) {
    state.results = results
  },
  updateDatasets(state, datasets) {
    state.datasets = datasets
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
  async updateResults({ commit, rootState, rootGetters }, { q, m }) {
    const endpoint = import.meta.env.PROD
      ? 'https://paper-scope-6-api.azurewebsites.net'
      : 'http://127.0.0.1:21383'
    const msalInstance = rootGetters['msal/instance']
    const tokenRequest = {
      account: rootState.msal.account,
      scopes: rootState.msal.scopes
    }
    let results = []
    let datasets = []
    try {
      commit('updateLoading', true)
      const opts = { params: { q } }
      if (import.meta.env.VITE_AUTH_ENABLED == 'true') {
        const response = await msalInstance.acquireTokenSilent(tokenRequest)
        opts['headers'] = { Authorization: `Bearer ${response.accessToken}` }
      }
      const startTime = new Date().getTime()
      const apiResponse = await axios.get(`${endpoint}/search/${m}`, opts)
      commit('updateTime', new Date().getTime() - startTime)
      results = apiResponse.data.results
      if ('datasets' in apiResponse.data) datasets = apiResponse.data.datasets
    } catch (error) {
      commit('updateTime', 0)
      console.log(error.message)
      console.log(error.response)
    }
    commit('updateResults', results)
    commit('updateDatasets', datasets)
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
