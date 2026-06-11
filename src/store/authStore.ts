import { create } from 'zustand'
import type { AuthUser } from '../shared/types'

interface AuthStore {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  setUser: (user: AuthUser | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setUser: (user) => set({ user, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}))
