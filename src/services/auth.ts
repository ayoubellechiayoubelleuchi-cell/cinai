import { supabase } from './supabase'
import type { AuthUser } from '../shared/types'

export async function signInWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  })
  return { error }
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  return { error }
}

export async function getCurrentUser(): Promise<{ user: AuthUser | null; error: Error | null }> {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) return { user: null, error: error as Error | null }

  const user: AuthUser = {
    id: data.user.id,
    email: data.user.email ?? '',
    credits: 0,
    createdAt: data.user.created_at,
  }
  return { user, error: null }
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email ?? '',
        credits: 0,
        createdAt: session.user.created_at,
      })
    } else {
      callback(null)
    }
  })
}
