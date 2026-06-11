import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY ?? ''
const vertexProjectId = process.env.VERTEX_PROJECT_ID ?? ''
const vertexApiKey = process.env.VERTEX_AI_KEY ?? ''

interface GenerateRequest {
  prompt: string
  style: string
  duration: number
}

function validateInput(body: unknown): GenerateRequest {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid request body')
  }

  const data = body as Record<string, unknown>

  if (typeof data.prompt !== 'string' || data.prompt.trim().length < 3) {
    throw new Error('Prompt must be at least 3 characters')
  }

  if (typeof data.style !== 'string') {
    throw new Error('Style is required')
  }

  const duration = typeof data.duration === 'number' ? data.duration : 10
  if (duration < 5 || duration > 60) {
    throw new Error('Duration must be between 5 and 60 seconds')
  }

  return {
    prompt: data.prompt.trim(),
    style: data.style,
    duration,
  }
}

export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    })
  }

  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers,
      })
    }

    const token = authHeader.slice(7)
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers,
      })
    }

    const body: unknown = await request.json()
    const { prompt, style, duration } = validateInput(body)

    if (!vertexApiKey || !vertexProjectId) {
      return new Response(JSON.stringify({
        id: crypto.randomUUID(),
        status: 'processing',
        videoUrl: null,
        thumbnailUrl: null,
        message: 'Vertex AI is not configured. Set VERTEX_AI_KEY and VERTEX_PROJECT_ID.',
      }), { status: 200, headers })
    }

    const vertexResponse = await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/projects/${vertexProjectId}/locations/us-central1/publishers/google/models/veo:predict`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vertexApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [{ prompt: `${style} style: ${prompt}` }],
          parameters: {
            sampleCount: 1,
            durationSeconds: duration,
          },
        }),
      },
    )

    if (!vertexResponse.ok) {
      const errorText = await vertexResponse.text()
      throw new Error(`Vertex AI API error: ${vertexResponse.status} ${errorText}`)
    }

    const vertexData = await vertexResponse.json()
    const videoUrl = vertexData.predictions?.[0]?.videoUrl ?? null
    const thumbnailUrl = vertexData.predictions?.[0]?.thumbnailUrl ?? null

    return new Response(JSON.stringify({
      id: crypto.randomUUID(),
      status: videoUrl ? 'completed' : 'processing',
      videoUrl,
      thumbnailUrl,
    }), { status: 200, headers })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers,
    })
  }
}
