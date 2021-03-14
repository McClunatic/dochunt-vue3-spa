import { computed } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import SearchResultsTable from '../components/SearchResultsTable.vue'
import Unauthenticated from '../views/Unauthenticated.vue'

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
        component: SearchResultsTable,
        beforeEnter: (to, from) => store.dispatch('search/updateTab', 'cards')
      },
      {
        path: 'plot',
        component: SearchResultsTable,
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

const account = computed(() => store.state.msal.account);

if (import.meta.env.VITE_AUTH_ENABLED) {
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
