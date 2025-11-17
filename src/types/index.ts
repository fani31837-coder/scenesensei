// Core animation types
export interface Keyframe {
  time: number
  value: number
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'custom'
  bezier?: [number, number, number, number]
}

export interface AnimationTrack {
  id: string
  name: string
  property: string
  keyframes: Keyframe[]
  enabled: boolean
}

export interface Scene {
  id: string
  name: string
  duration: number
  fps: number
  width: number
  height: number
  tracks: AnimationTrack[]
  createdAt: Date
  updatedAt: Date
  metadata?: Record<string, any>
}

export interface SceneObject {
  id: string
  type: 'camera' | 'light' | 'mesh' | 'group' | 'particle' | 'text'
  name: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  visible: boolean
  parentId?: string
  properties?: Record<string, any>
}

export interface Character {
  id: string
  name: string
  modelUrl: string
  animations: Map<string, AnimationTrack[]>
  ikChains?: IKChain[]
  lipSyncData?: LipSyncKeyframe[]
}

export interface IKChain {
  id: string
  name: string
  bones: string[]
  target: [number, number, number]
  constraint?: 'hinge' | 'ball' | 'free'
}

export interface LipSyncKeyframe {
  time: number
  phoneme: string
  intensity: number
}

export interface MarketplaceAsset {
  id: string
  name: string
  description: string
  author: string
  category: 'model' | 'animation' | 'effect' | 'sound'
  price: number
  rating: number
  downloads: number
  fileUrl: string
  thumbnailUrl: string
  tags: string[]
  createdAt: Date
}

export interface CollaborationSession {
  id: string
  sceneId: string
  participants: CollaborationUser[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface CollaborationUser {
  id: string
  name: string
  email: string
  color: string
  cursorPos: { x: number; y: number }
  selectedObjects: string[]
}

export interface ExportOptions {
  format: 'mp4' | 'webm' | 'gif' | 'glb' | 'usdz' | 'fbx'
  quality: 'low' | 'medium' | 'high' | 'ultra'
  includeAudio: boolean
  resolution: { width: number; height: number }
  frameRate: number
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'creator' | 'viewer'
  subscription: 'free' | 'pro' | 'enterprise'
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  description: string
  scenes: Scene[]
  ownerId: string
  collaborators: string[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface NodeEditorNode {
  id: string
  type: string
  position: { x: number; y: number }
  inputs: NodeInput[]
  outputs: NodeOutput[]
  properties: Record<string, any>
}

export interface NodeInput {
  id: string
  name: string
  type: string
  value?: any
  connectedFrom?: string
}

export interface NodeOutput {
  id: string
  name: string
  type: string
  connectedTo: string[]
}

export interface AccessibilitySettings {
  highContrast: boolean
  reducedMotion: boolean
  fontSize: 'small' | 'normal' | 'large' | 'xlarge'
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  screenReaderEnabled: boolean
}

export interface PerformanceMetrics {
  fps: number
  renderTime: number
  memoryUsage: number
  drawCalls: number
  triangles: number
}
