import { useMutation } from '@tanstack/react-query'

interface WaitlistInput {
  email: string
  name?: string
}

interface WaitlistResponse {
  message?: string
  error?: string
}

async function submitToWaitlist(input: WaitlistInput): Promise<WaitlistResponse> {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  const data: WaitlistResponse = await response.json()

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
