import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { Button } from '../../../shared/components/ui/Button'
import { Link } from 'react-router-dom'

export function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="mt-1 text-sm text-white/50">All your generated videos.</p>
      </div>
      <EmptyState
        title="No videos yet"
        description="Your generated videos will appear here"
        action={
          <Link to="/dashboard/generate">
            <Button size="sm">Generate Video</Button>
          </Link>
        }
      />
    </div>
  )
}
