import api from './api'

export const listTags = (params) => api.get('/tags', { params })
export const createTag = (payload) => api.post('/tags', payload)
export const getTag = (id) => api.get(`/tags/${id}`)
export const updateTag = (id, payload) => api.put(`/tags/${id}`, payload)
export const deleteTag = (id) => api.delete(`/tags/${id}`)

export default {
  listTags,
  createTag,
  getTag,
  updateTag,
  deleteTag
}
