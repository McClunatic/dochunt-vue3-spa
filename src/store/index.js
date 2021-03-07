import { createStore, createLogger } from 'vuex'
import msal from './modules/msal'
import search from './modules/search'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: { msal, search },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
