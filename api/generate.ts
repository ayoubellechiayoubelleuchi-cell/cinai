import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? ''
const vertexProjectId = process.env.VERTEX_PROJECT_ID ?? ''
const vertexApiKey = process.env.VERTEX_AI_KEY ?? ''

interface GenerateRequest {
  prompt: string
  style: string
  duration: number
}

interface VertexPrediction {
  videoUrl?: string
  thumbnailUrl?: string
}

interface VertexResponse {
  predictions?: VertexPrediction[]
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

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
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
        error: 'Vertex AI is not configured. Set VERTEX_AI_KEY and VERTEX_PROJECT_ID in your environment variables.',
      }), { status: 503, headers })
    }

    const location = 'us-central1'
    const vertexResponse = await fetch(
      `https://${location}-aiplatform.googleapis.com/v1/projects/${vertexProjectId}/locations/${location}/publishers/google/models/veo:predict`,
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': vertexApiKey,
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

    const vertexData: VertexResponse = await vertexResponse.json()
    const prediction = vertexData.predictions?.[0]
    const videoUrl = prediction?.videoUrl ?? null
    const thumbnailUrl = prediction?.thumbnailUrl ?? null

    return new Response(JSON.stringify({
      id: generateId(),
      status: videoUrl ? 'completed' : 'failed',
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
