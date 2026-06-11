import { create } from 'zustand'

interface AppState {
  credits: number
  isAuthenticated: boolean
  setCredits: (credits: number) => void
  setAuthenticated: (value: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  credits: 0,
  isAuthenticated: false,
  setCredits: (credits) => set({ credits }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))
