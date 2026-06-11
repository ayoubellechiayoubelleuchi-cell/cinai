import { Card } from '../../../shared/components/ui/Card'

interface CreditDisplayProps {
  balance: number
  used: number
  total: number
}

export function CreditDisplay({ balance, used, total }: CreditDisplayProps) {
  const percentage = total > 0 ? Math.round((used / total) * 100) : 0

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white/60">Credits</h3>
        <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
          {balance} remaining
        </span>
      </div>
      <div className="mb-2 flex items-baseline gap-1">
        <span className="text-3xl font-bold">{used}</span>
        <span className="text-sm text-white/40">/ {total} used</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-aurora-gradient transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  )
}
