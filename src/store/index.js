import { createStore, createLogger } from 'vuex'
import msal from './modules/msal'
import search from './modules/search'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: { msal, search },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  },
  mutations: {
    updateTheme(state, theme) {
      state.theme = theme
    }
  },
  actions: {
    updateTheme(context, theme) {
      context.commit('updateTheme', theme)
    }
  }
})
