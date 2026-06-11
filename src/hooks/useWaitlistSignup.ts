import { useMutation } from '@tanstack/react-query'

interface WaitlistInput {
  email: string
  name?: string
}

async function submitToWaitlist(input: WaitlistInput): Promise<{ message: string }> {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to join waitlist')
  }

  return data
}

export function useWaitlistSignup() {
  return useMutation({
    mutationFn: submitToWaitlist,
  })
}
