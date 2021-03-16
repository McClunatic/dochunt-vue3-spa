import { computed } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import SearchResultsTable from '../components/SearchResultsTable.vue'
import SearchResultsCards from '../components/SearchResultsCards.vue'
import SearchResultsPlot from '../components/SearchResultsPlot.vue'
import Unauthenticated from '../views/Unauthenticated.vue'

const account = computed(() => store.state.msal.account);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: 'table',
        component: SearchResultsTable,
        beforeEnter: (to, from) => store.dispatch('search/updateTab', 'table')
      },
      {
        path: 'cards',
        component: SearchResultsCards,
        beforeEnter: (to, from) => store.dispatch('search/updateTab', 'cards')
      },
      {
        path: 'plot',
        component: SearchResultsPlot,
        beforeEnter: (to, from) => store.dispatch('search/updateTab', 'plot')
      }
    ]
  },
  {
    path: '/unauthenticated',
    component: Unauthenticated
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const updateSearchResults = (to, from) => {
  const toQuery = to.query.q
  const fromQuery = from.query.q
  if (toQuery === undefined) return
  if (fromQuery === undefined || toQuery !== fromQuery)
    store.dispatch('search/updateResults', toQuery)
}

const animatePagination = (to, from) => {
  const toPage = to.query.p
  const fromPage = from.query.p
  if (toPage === undefined || fromPage === undefined || toPage === fromPage) {
    to.meta.enterClass = "animate__animated animate__fadeIn"
    to.meta.leaveClass = "animate__animated animate__fadeOut"
    from.meta.enterClass = "animate__animated animate__fadeIn"
    from.meta.leaveClass = "animate__animated animate__fadeOut"
  } else if (toPage < fromPage) {
    to.meta.enterClass = "animate__animated animate__fadeInLeft"
    to.meta.leaveClass = "animate__animated animate__fadeOutRight"
    from.meta.enterClass = "animate__animated animate__fadeInRight"
    from.meta.leaveClass = "animate__animated animate__fadeOutLeft"
  } else {
    to.meta.enterClass = "animate__animated animate__fadeInRight"
    to.meta.leaveClass = "animate__animated animate__fadeOutLeft"
    from.meta.enterClass = "animate__animated animate__fadeInLeft"
    from.meta.leaveClass = "animate__animated animate__fadeOutRight"
  }
}

router.afterEach((to, from) => {
  updateSearchResults(to, from)
  animatePagination(to, from)
})

if (import.meta.env.VITE_AUTH_ENABLED == 'true') {
  router.beforeEach(async (to) => {
    if (to.path !== '/unauthenticated' && account.value === null) {
      try {
        await store.dispatch('msal/signIn')
      } catch (error) {
        console.log(error)
        return '/unauthenticated'
      }
    }
  })
}

export default router
