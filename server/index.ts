import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json({ limit: '100mb' }))

// Mock database
const mockProjects: any[] = []
const mockScenes: any[] = []
const mockAssets: any[] = []

// Auth endpoints
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body
  res.json({
    user: {
      id: 'user-1',
      email,
      name: email.split('@')[0],
      role: 'creator',
      subscription: 'pro',
      createdAt: new Date(),
    },
    token: 'mock-token',
  })
})

app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.json({ success: true })
})

app.get('/api/auth/me', (req: Request, res: Response) => {
  res.json({
    id: 'user-1',
    email: 'user@example.com',
    name: 'User',
    role: 'creator',
    subscription: 'pro',
  })
})

// Scene endpoints
app.get('/api/scenes', (req: Request, res: Response) => {
  res.json(mockScenes)
})

app.post('/api/scenes', (req: Request, res: Response) => {
  const scene = { ...req.body, id: Date.now().toString() }
  mockScenes.push(scene)
  res.status(201).json(scene)
})

app.get('/api/scenes/:id', (req: Request, res: Response) => {
  const scene = mockScenes.find((s) => s.id === req.params.id)
  if (!scene) return res.status(404).json({ error: 'Not found' })
  return res.json(scene)
})

app.patch('/api/scenes/:id', (req: Request, res: Response) => {
  const scene = mockScenes.find((s) => s.id === req.params.id)
  if (!scene) return res.status(404).json({ error: 'Not found' })
  Object.assign(scene, req.body)
  return res.json(scene)
})

app.delete('/api/scenes/:id', (req: Request, res: Response) => {
  const idx = mockScenes.findIndex((s) => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  mockScenes.splice(idx, 1)
  return res.json({ success: true })
})

// Project endpoints
app.get('/api/projects', (req: Request, res: Response) => {
  res.json(mockProjects)
})

app.post('/api/projects', (req: Request, res: Response) => {
  const project = { ...req.body, id: Date.now().toString() }
  mockProjects.push(project)
  res.status(201).json(project)
})

// Marketplace endpoints
app.get('/api/marketplace', (req: Request, res: Response) => {
  const assets = [
    {
      id: '1',
      name: 'Sample Model',
      description: 'A sample 3D model',
      author: 'Demo Author',
      category: 'model',
      price: 0,
      rating: 4.5,
      downloads: 1000,
      fileUrl: '#',
      thumbnailUrl: 'https://via.placeholder.com/300x300?text=Model',
      tags: ['free', 'sample'],
      createdAt: new Date(),
    },
  ]
  res.json(assets)
})

app.get('/api/marketplace/search', (req: Request, res: Response) => {
  const { query, category } = req.query
  res.json([])
})

// Export endpoints
app.post('/api/export/start', (req: Request, res: Response) => {
  const jobId = Date.now().toString()
  res.json({ jobId, status: 'queued' })
})

app.get('/api/export/status/:jobId', (req: Request, res: Response) => {
  res.json({ jobId: req.params.jobId, status: 'processing', progress: 50 })
})

// Collaboration endpoints
app.post('/api/collaboration/sessions', (req: Request, res: Response) => {
  res.json({
    id: Date.now().toString(),
    sceneId: req.body.sceneId,
    participants: [],
    createdAt: new Date(),
  })
})

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`✅ SceneSensei API server running on http://localhost:${PORT}`)
})

export default app
