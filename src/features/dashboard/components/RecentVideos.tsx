import { Card } from '../../../shared/components/ui/Card'
import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { Button } from '../../../shared/components/ui/Button'
import { Link } from 'react-router-dom'

interface Video {
  id: string
  prompt: string
  status: 'completed' | 'processing' | 'failed'
  createdAt: string
}

const statusColors: Record<string, string> = {
  completed: 'bg-green-500/10 text-green-400 border-green-500/20',
  processing: 'bg-aurora/10 text-aurora border-aurora/20',
  failed: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  processing: 'Processing',
  failed: 'Failed',
}

interface RecentVideosProps {
  videos: Video[]
}

export function RecentVideos({ videos }: RecentVideosProps) {
  if (videos.length === 0) {
    return (
      <Card>
        <EmptyState
          title="No videos yet"
          description="Generate your first cinematic AI video"
          action={
            <Link to="/dashboard/generate">
              <Button size="sm">Generate Video</Button>
            </Link>
          }
        />
      </Card>
    )
  }

  return (
    <Card hover={false}>
      <h3 className="mb-4 text-sm font-medium text-white/60">Recent videos</h3>
      <div className="space-y-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{video.prompt}</p>
              <p className="mt-0.5 text-xs text-white/40">
                {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`ml-4 shrink-0 rounded-full border px-3 py-0.5 text-xs font-medium ${statusColors[video.status]}`}
            >
              {statusLabels[video.status]}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
