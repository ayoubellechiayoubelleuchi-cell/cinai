import { type FormEvent, useState } from 'react'
import { Button } from '../../../shared/components/ui/Button'
import { Input } from '../../../shared/components/ui/Input'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      {status === 'success' ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-aurora/20">
            <svg className="h-6 w-6 text-aurora" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">You're on the list!</h3>
          <p className="mt-2 text-sm text-white/50">
            We'll notify you when CineAI launches. Get ready to create cinematic magic.
          </p>
        </div>
      ) : (
        <>
          <Input
            id="name"
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <Input
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Joining...
              </span>
            ) : (
              'Join the Waitlist'
            )}
          </Button>
          {status === 'error' && (
            <p className="text-center text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </form>
  )
}
