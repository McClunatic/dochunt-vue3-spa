<template>
  <div>
    <div
      v-if="username"
      class="navbar-item has-dropdown is-hoverable"
    >
      <a class="navbar-link">{{ username }}</a>
      <div class="navbar-dropdown">
        <a
          class="navbar-item"
          href="#"
        >
          Profile
        </a>
        <a
          class="navbar-item"
          @click="signOut"
        >
          Sign out
        </a>
      </div>
    </div>
    <div
      v-else
      class="navbar-item"
    >
      <div class="buttons">
        <button
          class="button"
          @click="signIn"
        >
          <span class="icon">
            <i class="fas fa-sign-in-alt" />
          </span>
          <span>Sign in</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  const username = computed(() => store.getters['msal/username'])

  const signIn = async () => {
    await store.dispatch('msal/signIn')
    if (route.path === '/unauthenticated') router.push('/')
  }
  const signOut = async () => {
    await store.dispatch('msal/signOut')
    if (route.path !== '/unauthenticated') router.push('/unauthenticated')
  }
</script>
