import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../src/App.vue'


const msal = {
  namespaced: true,
  actions: {
    createInstance() {}
  }
}

const store = createStore({
  modules: { msal }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: 'Youkoso boku no app e' }}],
})

describe('App.test.js', () => {
  beforeEach(async () => {
    router.push('/')
    await router.isReady()
  })
  test('renders a nav bar', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store, router],
        stubs: {
          NavBar: {
            template: '<nav />'
          }
        }
       },
    })

    console.log(wrapper.html())
    expect('nav-bar').toBe('nav-bar')
  })
})
