import { useMutation } from '@tanstack/react-query'
import { supabase } from '../services/supabase'

interface GenerateInput {
  prompt: string
  style: string
  duration?: number
}

interface GenerateResponse {
  id: string
  status: 'processing' | 'completed' | 'failed'
  videoUrl: string | null
  thumbnailUrl: string | null
  error?: string
}

async function generateVideo(input: GenerateInput): Promise<GenerateResponse> {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.access_token) {
    throw new Error('You must be signed in to generate videos')
  }

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      prompt: input.prompt,
      style: input.style,
      duration: input.duration ?? 10,
    }),
  })

  const data: GenerateResponse & { error?: string } = await response.json()

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to generate video')
  }

  return data
}

export function useGenerateVideo() {
  return useMutation({
    mutationFn: generateVideo,
  })
}
