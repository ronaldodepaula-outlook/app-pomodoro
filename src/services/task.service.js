import api from './api'

export const listTasks = (params) => api.get('/tasks', { params })
export const createTask = (payload) => api.post('/tasks', payload)
export const getTask = (id) => api.get(`/tasks/${id}`)
export const updateTask = (id, payload) => api.put(`/tasks/${id}`, payload)
export const deleteTask = (id) => api.delete(`/tasks/${id}`)

// Tags
export const listTags = (params) => api.get('/tags', { params })
