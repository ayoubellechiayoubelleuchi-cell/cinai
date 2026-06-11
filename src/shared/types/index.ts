export interface Video {
  id: string
  userId: string
  prompt: string
  status: 'processing' | 'completed' | 'failed'
  url: string | null
  thumbnailUrl: string | null
  duration: number
  createdAt: string
}

export interface AuthUser {
  id: string
  email: string
  credits: number
  createdAt: string
}

export interface WaitlistEntry {
  email: string
  name?: string
  createdAt: string
}

export interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
}
