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
  modules: { msal },
  actions: {
    updateTheme() {}
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: 'Youkoso boku no app e' }}],
})

document.body.innerHTML = `
  <div>
    <link id="dark" media="none">
    <link id="light" media="none">
    <div id="app"></div>
  </div>
`

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});


describe('App.test.js', () => {
  beforeEach(async () => {
    router.push('/')
    await router.isReady()
  })
  test('renders a nav bar', async () => {
    const wrapper = mount(App, {
      attachTo: document.getElementById('app'),
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
