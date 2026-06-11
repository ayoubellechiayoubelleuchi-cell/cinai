import { useEffect, type ReactNode } from 'react'
import { useAuthStore } from '../../../store/authStore'
import { getCurrentUser, onAuthStateChange } from '../../../services/auth'
import { Skeleton } from '../ui/Skeleton'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, isLoading, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    setLoading(true)
    getCurrentUser().then(({ user }) => {
      setUser(user)
      setLoading(false)
    })

    const subscription = onAuthStateChange((user) => {
      setUser(user)
    })

    return () => subscription.data.subscription.unsubscribe()
  }, [setUser, setLoading])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian p-8">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (!user) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
