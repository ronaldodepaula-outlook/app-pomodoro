import api from './api'

export const startPomodoro = (payload) => api.post('/pomodoros/start', payload)
export const finishPomodoro = (id, payload) => api.post(`/pomodoros/${id}/finish`, payload)
export const historico = (params) => api.get('/pomodoros/historico', { params })
