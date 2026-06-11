import { CreditDisplay } from './CreditDisplay'
import { RecentVideos } from './RecentVideos'

const mockVideos: { id: string; prompt: string; status: 'completed' | 'processing' | 'failed'; createdAt: string }[] = []

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">
          Welcome back. Here's your overview.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <CreditDisplay balance={25} used={75} total={100} />
        <div className="sm:col-span-2">
          <RecentVideos videos={mockVideos} />
        </div>
      </div>
    </div>
  )
}
