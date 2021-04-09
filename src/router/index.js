import { computed } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import SearchResultsTable from '../components/SearchResultsTable.vue'
import SearchResultsCards from '../components/SearchResultsCards.vue'
import SearchResultsPlot from '../components/SearchResultsPlot.vue'
import Redirect from '../views/Redirect.vue'
import Unauthenticated from '../views/Unauthenticated.vue'

const account = computed(() => store.state.msal.account);
const instance = computed(() => store.getters['msal/instance'])

const routes = [
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    component: Search,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'table',
        component: SearchResultsTable,
        meta: { requiresAuth: true },
        beforeEnter: (to, from) => store.dispatch('search/updateTab', 'table')
      },
      {
        path: 'cards',
        component: SearchResultsCards,
        meta: { requiresAuth: true },
        beforeEnter: (to, from) => store.dispatch('search/updateTab', 'cards')
      },
      {
        path: 'plot',
        component: SearchResultsPlot,
        meta: { requiresAuth: true },
        beforeEnter: (to, from) => store.dispatch('search/updateTab', 'plot')
      }
    ]
  },
  {
    path: '/redirect',
    component: Redirect,
    meta: { requiresAuth: false }
  },
  {
    path: '/unauthenticated',
    component: Unauthenticated,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const updateSearchResults = (to, from) => {
  const toQuery = to.query.q
  const toMode = to.query.m
  const fromQuery = from.query.q
  const fromMode = from.query.m
  if (toQuery === undefined) return
  if (fromQuery === undefined || toQuery !== fromQuery || toMode !== fromMode)
    store.dispatch('search/updateResults', { q: toQuery, m: toMode })
}

const animatePagination = (to, from) => {
  const toPage = to.query.p
  const fromPage = from.query.p
  if (toPage === undefined || fromPage === undefined || toPage === fromPage) {
    to.meta.enterClass = "animate__animated animate__fadeIn animate__faster"
  } else if (toPage < fromPage) {
    to.meta.enterClass = "animate__animated animate__fadeInLeft"
    to.meta.leaveClass = "animate__animated animate__fadeOutRight leaving"
  } else {
    to.meta.enterClass = "animate__animated animate__fadeInRight"
    to.meta.leaveClass = "animate__animated animate__fadeOutLeft leaving"
  }
}

router.afterEach((to, from) => {
  updateSearchResults(to, from)
  animatePagination(to, from)
})

const handleLoginPopup = async to => {
  if (to.meta.requiresAuth && account.value === null) {
    try {
      await store.dispatch('msal/signIn')
    } catch (error) {
      console.log(error)
      return '/unauthenticated'
    }
  }
}

const handleLoginRedirect = async to => {
  let loginResponse = await instance.value.handleRedirectPromise()
  if (loginResponse !== null)
    store.commit('msal/signIn', loginResponse.account)
  if (to.meta.requiresAuth && account.value === null)
    store.dispatch('msal/signInRedirect')
}

router.beforeEach(
  import.meta.env.VITE_AUTH == 'popup'
    ? handleLoginPopup : import.meta.env.VITE_AUTH == 'redirect'
    ? handleLoginRedirect : () => {}
)

export default router
