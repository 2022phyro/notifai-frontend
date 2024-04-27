import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const BASE_URL = 'https://notifai.allcanlearn.me/api/v1'
// const BASE_URL = 'http://localhost:3000/api/v1'
const LEEWAY = 600000

async function getToken() {
  const authState = useAuthStore()
  const { currToken, tokenExpiry } = storeToRefs(authState)
  const { setAuth } = authState
  let accessToken = currToken?.value
  const expiry = tokenExpiry?.value
  if (!accessToken || expiry < Date.now() + LEEWAY) {
    accessToken = await refreshToken()
  }

  if (accessToken) {
    setAuth(true)
    return 'JWT ' + accessToken
  }
  setAuth(false)
}
async function refreshToken() {
  try {
    const authState = useAuthStore()
    const { setCurrToken } = authState
    const response = await axios.post(`${BASE_URL}/refresh`, undefined, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    const result = response.data.data
    setCurrToken(result.accessToken, result.access_exp)
    return result.accessToken
  } catch (error) {
    console.error(error)
  }
}

const inst = async (auth) => {
  const instance = axios.create({
    withCredentials: true
  })

  if (auth) {
    const token = await getToken()
    instance.defaults.headers.common['Authorization'] = token
  }

  return instance
}

export { getToken, inst, BASE_URL }
