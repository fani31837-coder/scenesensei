import axios, { AxiosInstance } from 'axios'
import { Scene, Project, User, MarketplaceAsset, ExportOptions } from '@/types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<{ user: User; token: string }>('/auth/login', { email, password }),
  
  signup: (email: string, password: string, name: string) =>
    api.post<{ user: User; token: string }>('/auth/signup', { email, password, name }),
  
  logout: () => api.post('/auth/logout'),
  
  getCurrentUser: () => api.get<User>('/auth/me'),
}

// Scene endpoints
export const sceneAPI = {
  list: () => api.get<Scene[]>('/scenes'),
  
  get: (id: string) => api.get<Scene>(`/scenes/${id}`),
  
  create: (scene: Scene) => api.post<Scene>('/scenes', scene),
  
  update: (id: string, updates: Partial<Scene>) => api.patch<Scene>(`/scenes/${id}`, updates),
  
  delete: (id: string) => api.delete(`/scenes/${id}`),
  
  duplicate: (id: string) => api.post<Scene>(`/scenes/${id}/duplicate`, {}),
}

// Project endpoints
export const projectAPI = {
  list: () => api.get<Project[]>('/projects'),
  
  get: (id: string) => api.get<Project>(`/projects/${id}`),
  
  create: (project: Project) => api.post<Project>('/projects', project),
  
  update: (id: string, updates: Partial<Project>) => api.patch<Project>(`/projects/${id}`, updates),
  
  delete: (id: string) => api.delete(`/projects/${id}`),
}

// Marketplace endpoints
export const marketplaceAPI = {
  search: (query: string, category?: string) =>
    api.get<MarketplaceAsset[]>('/marketplace/search', { params: { query, category } }),
  
  get: (id: string) => api.get<MarketplaceAsset>(`/marketplace/${id}`),
  
  list: () => api.get<MarketplaceAsset[]>('/marketplace'),
  
  purchase: (assetId: string) => api.post(`/marketplace/${assetId}/purchase`, {}),
  
  download: (assetId: string) => api.get(`/marketplace/${assetId}/download`),
}

// Collaboration endpoints
export const collaborationAPI = {
  createSession: (sceneId: string) =>
    api.post('/collaboration/sessions', { sceneId }),
  
  joinSession: (sessionId: string) =>
    api.post(`/collaboration/sessions/${sessionId}/join`, {}),
  
  leaveSession: (sessionId: string) =>
    api.post(`/collaboration/sessions/${sessionId}/leave`, {}),
  
  updateCursor: (sessionId: string, x: number, y: number) =>
    api.post(`/collaboration/sessions/${sessionId}/cursor`, { x, y }),
}

// Export endpoints
export const exportAPI = {
  startExport: (sceneId: string, options: ExportOptions) =>
    api.post('/export/start', { sceneId, options }),
  
  getStatus: (jobId: string) => api.get(`/export/status/${jobId}`),
  
  download: (jobId: string) => api.get(`/export/download/${jobId}`),
}

export default api
