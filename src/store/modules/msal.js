import {
  PublicClientApplication,
  BrowserAuthError,
  InteractionRequiredAuthError
} from '@azure/msal-browser'

// The msalInstance gets mutated when loginPopup() is called
// which means if made an attribute of the Vuex store state,
// it causes errors even when called in a mutation.
// The workaround is to have a global instance somewhere else
// in the application.
var msalInstance = null

// initial state
const state = () => ({
  config: {
    auth: {
      clientId: 'f1162a25-8ad7-4118-9b81-a9827603fa0c',
      authority:
      'https://clunacy.b2clogin.com/clunacy.onmicrosoft.com/' +
      'B2C_1A_signup_signin',
      knownAuthories: 'clunacy.b2clogin.com',
      redirectUri: import.meta.env.PROD
        ? 'https://paper-scope-6.azurewebsites.net/'
        : 'https://localhost:3000/'
    },
    cache: {
      cacheLocation: 'localStorage',
    },
  },
  scopes: [
    'https://clunacy.onmicrosoft.com/' +
    '35b7836b-13d4-433b-b3d1-7d165353a6ad/user.impersonate',
  ],
  account: null,
  instanceCreated: false
})

// getters
const getters = {
  username(state) {
    if (state.account === null) return null
    const claims = state.account.idTokenClaims
    return `${claims.given_name} ${claims.family_name}`
  },
  instance(state) {
    if (!state.instanceCreated) return null
    return msalInstance
  }
}

// mutations
const mutations = {
  createInstance(state) {
    if (!state.instanceCreated) {
      state.instanceCreated = true
      msalInstance = new PublicClientApplication(state.config)
    }
  },
  signIn(state, account) {
    state.account = account
    msalInstance.setActiveAccount(account)
  },
  signOut(state) {
    state.account = null
    msalInstance.logout({ postLogoutRedirectUri: '/unauthenticated' })
  }
}

// actions
const actions = {
  createInstance(context) {
    context.commit('createInstance')
  },
  async signIn({ commit, state }) {
    if (!state.instanceCreated) commit('createInstance')
    const loginRequest = {
      scopes: state.scopes,
      loginHint: null
    }
    let loginResponse = null
    try {
      loginResponse = await msalInstance.ssoSilent(loginRequest)
    } catch (error) {
      if (!(error instanceof InteractionRequiredAuthError) &&
          !(error instanceof BrowserAuthError) )
        throw error
      loginResponse = await msalInstance.loginPopup(loginRequest)
    }
    commit('signIn', loginResponse.account)
  },
  signOut(context) {
    context.commit('signOut')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
