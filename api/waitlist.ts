import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? ''

export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
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
    const body: unknown = await request.json()

    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers,
      })
    }

    const data = body as Record<string, unknown>

    if (typeof data.email !== 'string' || !data.email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers,
      })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { error } = await supabase
      .from('waitlist')
      .insert({
        email: data.email.toLowerCase().trim(),
        name: typeof data.name === 'string' ? data.name.trim() : null,
      })

    if (error) {
      if (error.code === '23505') {
        return new Response(JSON.stringify({
          message: 'You are already on the waitlist!',
        }), { status: 200, headers })
      }
      throw error
    }

    return new Response(JSON.stringify({
      message: 'Successfully joined the waitlist',
    }), { status: 200, headers })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers,
    })
  }
}
