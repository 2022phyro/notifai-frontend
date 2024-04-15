import { ref,  } from 'vue'
import { defineStore } from 'pinia'

export  const useAuthStore = defineStore('auth', () => {
    const currToken = ref('')
    const tokenExpiry = ref(null)
    const auth = ref(false)

    function setCurrToken(value, expiry) {
        currToken.value = value
        tokenExpiry.value = Date(expiry)
    }
    function setAuth(value) {
        auth.value = value
    }
    return { auth, currToken, setCurrToken, setAuth }
  })