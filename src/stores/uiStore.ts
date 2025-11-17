import { create } from 'zustand'
import { AccessibilitySettings, PerformanceMetrics } from '@/types'

interface UIState {
  accessibility: AccessibilitySettings
  performance: PerformanceMetrics | null
  theme: 'light' | 'dark'
  language: string
  sidebarOpen: boolean
  inspectorOpen: boolean
  
  setAccessibility: (settings: Partial<AccessibilitySettings>) => void
  setPerformance: (metrics: PerformanceMetrics) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (lang: string) => void
  toggleSidebar: () => void
  toggleInspector: () => void
}

const useUIStore = create<UIState>((set) => ({
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    fontSize: 'normal',
    colorBlindMode: 'none',
    screenReaderEnabled: false,
  },
  performance: null,
  theme: 'dark',
  language: 'en',
  sidebarOpen: true,
  inspectorOpen: true,

  setAccessibility: (settings: Partial<AccessibilitySettings>) =>
    set((state) => ({
      accessibility: { ...state.accessibility, ...settings },
    })),

  setPerformance: (metrics: PerformanceMetrics) => set({ performance: metrics }),

  setTheme: (theme: 'light' | 'dark') => set({ theme }),

  setLanguage: (lang: string) => set({ language: lang }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  toggleInspector: () => set((state) => ({ inspectorOpen: !state.inspectorOpen })),
}))

export default useUIStore
