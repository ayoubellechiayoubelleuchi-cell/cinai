import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'

export function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard', { replace: true })
      } else {
        setError('Authentication failed. Please try again.')
      }
    })
  }, [navigate])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian p-4">
        <div className="text-center">
          <p className="text-red-400">{error}</p>
          <a href="/login" className="mt-4 inline-block text-sm text-aurora hover:underline">
            Back to login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian">
      <div className="flex items-center gap-3 text-white/50">
        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Signing you in...
      </div>
    </div>
  )
}
