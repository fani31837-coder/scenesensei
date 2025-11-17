import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { Scene, SceneObject, AnimationTrack, Keyframe } from '@/types'
import { v4 as uuid } from 'uuid'

interface EditorState {
  currentScene: Scene | null
  selectedObjectIds: string[]
  objects: Map<string, SceneObject>
  currentTime: number
  isPlaying: boolean
  zoom: number
  
  // Actions
  createScene: (name: string) => void
  deleteScene: () => void
  addObject: (object: SceneObject) => void
  updateObject: (id: string, updates: Partial<SceneObject>) => void
  deleteObject: (id: string) => void
  selectObjects: (ids: string[]) => void
  setCurrentTime: (time: number) => void
  togglePlayback: () => void
  setZoom: (zoom: number) => void
  
  addKeyframe: (trackId: string, keyframe: Keyframe) => void
  updateKeyframe: (trackId: string, time: number, updates: Partial<Keyframe>) => void
  deleteKeyframe: (trackId: string, time: number) => void
}

const useEditorStore = create<EditorState>()(
  subscribeWithSelector((set) => ({
    currentScene: null,
    selectedObjectIds: [],
    objects: new Map(),
    currentTime: 0,
    isPlaying: false,
    zoom: 1,

    createScene: (name: string) =>
      set(() => {
        const newScene: Scene = {
          id: uuid(),
          name,
          duration: 10,
          fps: 30,
          width: 1920,
          height: 1080,
          tracks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        return { currentScene: newScene }
      }),

    deleteScene: () => set({ currentScene: null, objects: new Map() }),

    addObject: (object: SceneObject) =>
      set((state) => {
        const newObjects = new Map(state.objects)
        newObjects.set(object.id, object)
        return { objects: newObjects }
      }),

    updateObject: (id: string, updates: Partial<SceneObject>) =>
      set((state) => {
        const newObjects = new Map(state.objects)
        const obj = newObjects.get(id)
        if (obj) {
          newObjects.set(id, { ...obj, ...updates })
        }
        return { objects: newObjects }
      }),

    deleteObject: (id: string) =>
      set((state) => {
        const newObjects = new Map(state.objects)
        newObjects.delete(id)
        const selectedIds = state.selectedObjectIds.filter((sid) => sid !== id)
        return { objects: newObjects, selectedObjectIds: selectedIds }
      }),

    selectObjects: (ids: string[]) => set({ selectedObjectIds: ids }),

    setCurrentTime: (time: number) =>
      set((state) => {
        if (!state.currentScene) return {}
        const maxTime = state.currentScene.duration
        return { currentTime: Math.min(time, maxTime) }
      }),

    togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),

    setZoom: (zoom: number) => set({ zoom: Math.max(0.1, Math.min(zoom, 5)) }),

    addKeyframe: (trackId: string, keyframe: Keyframe) =>
      set((state) => {
        if (!state.currentScene) return {}
        const tracks = state.currentScene.tracks.map((t) => {
          if (t.id === trackId) {
            return {
              ...t,
              keyframes: [...t.keyframes, keyframe].sort((a, b) => a.time - b.time),
            }
          }
          return t
        })
        return {
          currentScene: { ...state.currentScene, tracks, updatedAt: new Date() },
        }
      }),

    updateKeyframe: (trackId: string, time: number, updates: Partial<Keyframe>) =>
      set((state) => {
        if (!state.currentScene) return {}
        const tracks = state.currentScene.tracks.map((t) => {
          if (t.id === trackId) {
            return {
              ...t,
              keyframes: t.keyframes.map((k) => (k.time === time ? { ...k, ...updates } : k)),
            }
          }
          return t
        })
        return {
          currentScene: { ...state.currentScene, tracks, updatedAt: new Date() },
        }
      }),

    deleteKeyframe: (trackId: string, time: number) =>
      set((state) => {
        if (!state.currentScene) return {}
        const tracks = state.currentScene.tracks.map((t) => {
          if (t.id === trackId) {
            return {
              ...t,
              keyframes: t.keyframes.filter((k) => k.time !== time),
            }
          }
          return t
        })
        return {
          currentScene: { ...state.currentScene, tracks, updatedAt: new Date() },
        }
      }),
  }))
)

export default useEditorStore
