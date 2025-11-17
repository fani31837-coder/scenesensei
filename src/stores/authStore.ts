import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (email: string, password: string, name: string) => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,

  login: async (email: string, password: string) => {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: 'user-1',
      email,
      name: email.split('@')[0],
      role: 'creator',
      subscription: 'pro',
      createdAt: new Date(),
    }
    set({ user: mockUser, isAuthenticated: true, token: 'mock-token' })
  },

  logout: () => set({ user: null, isAuthenticated: false, token: null }),

  signup: async (email: string, password: string, name: string) => {
    const newUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: 'creator',
      subscription: 'free',
      createdAt: new Date(),
    }
    set({ user: newUser, isAuthenticated: true, token: 'mock-token' })
  },

  updateProfile: async (updates: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }))
  },
}))

export default useAuthStore
