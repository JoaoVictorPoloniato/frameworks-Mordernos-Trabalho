import axios from 'axios'
import { getAuth } from 'firebase/auth'

const api = axios.create({
  baseURL: 'https://ivanpires.dev/g3/api/'
})

api.interceptors.request.use(async config => {
  const user = getAuth().currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
