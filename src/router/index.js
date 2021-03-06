import { computed } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Unauthenticated from '../views/Unauthenticated.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/search',
    component: Search
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
  router.beforeEach(async (to, from) => {
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
