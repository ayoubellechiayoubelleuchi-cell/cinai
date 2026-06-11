import { Card } from '../../../shared/components/ui/Card'
import { Button } from '../../../shared/components/ui/Button'
export function CreditsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Credits</h1>
        <p className="mt-1 text-sm text-white/50">Manage your plan and usage.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">Free</p>
          <p className="mt-4 text-3xl font-bold">25</p>
          <p className="mt-1 text-sm text-white/50">credits / month</p>
          <Button variant="secondary" size="sm" className="mt-6 w-full" disabled>
            Current
          </Button>
        </Card>

        <Card className="text-center border-aurora/30">
          <div className="mb-2">
            <span className="rounded-full bg-aurora/10 px-3 py-0.5 text-xs font-medium text-aurora">Popular</span>
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">Pro</p>
          <p className="mt-4 text-3xl font-bold">100</p>
          <p className="mt-1 text-sm text-white/50">credits / month</p>
          <Button size="sm" className="mt-6 w-full">Upgrade</Button>
        </Card>

        <Card className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">Studio</p>
          <p className="mt-4 text-3xl font-bold">500</p>
          <p className="mt-1 text-sm text-white/50">credits / month</p>
          <Button variant="secondary" size="sm" className="mt-6 w-full">Contact</Button>
        </Card>
      </div>
    </div>
  )
}
