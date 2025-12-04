import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://rdpsolutions.online/pomodoro-api/public/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para incluir token automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
