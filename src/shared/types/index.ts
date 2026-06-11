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

export interface User {
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
