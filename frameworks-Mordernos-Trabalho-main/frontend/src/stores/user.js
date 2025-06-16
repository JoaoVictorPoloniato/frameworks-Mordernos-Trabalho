import { defineStore } from 'pinia'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '@/plugins/firebase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async login() {
      const result = await signInWithPopup(auth, provider)
      this.user = result.user
    },

    async logout() {
      await signOut(auth)
      this.user = null
    },

    init() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
      })
    },
  },
})