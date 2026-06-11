import { Card } from '../../../shared/components/ui/Card'
import { Button } from '../../../shared/components/ui/Button'
import { Skeleton } from '../../../shared/components/ui/Skeleton'

interface VideoResultProps {
  videoUrl: string | null
  prompt: string
  isLoading: boolean
}

export function VideoResult({ videoUrl, prompt, isLoading }: VideoResultProps) {
  if (isLoading) {
    return (
      <Card>
        <div className="space-y-4">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Card>
    )
  }

  if (!videoUrl) {
    return (
      <Card hover={false} className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
          <svg className="h-8 w-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <p className="text-sm text-white/40">Your video will appear here</p>
        <p className="mt-1 text-xs text-white/20">Enter a prompt and generate</p>
      </Card>
    )
  }

  return (
    <Card>
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-void">
        <video
          src={videoUrl}
          controls
          className="h-full w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Generated Video</p>
          <p className="mt-0.5 text-xs text-white/40">{prompt.slice(0, 60)}...</p>
        </div>
        <Button variant="secondary" size="sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download
        </Button>
      </div>
    </Card>
  )
}
