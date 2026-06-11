import type { ReactNode } from 'react'
import { Container } from '../../shared/components/layout/Container'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-obsidian">
      <header className="fixed top-0 z-40 w-full border-b border-white/5 backdrop-blur-xl">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-lg bg-aurora-gradient" />
              <span className="font-bold">CineAI</span>
            </div>
          </div>
        </Container>
      </header>

      <div className="flex pt-14">
        <aside className="fixed left-0 top-14 bottom-0 w-56 border-r border-white/5 p-4 hidden lg:block">
          <nav className="space-y-1">
            <SidebarItem href="/dashboard" label="Dashboard" active />
            <SidebarItem href="/dashboard/generate" label="Generate" />
            <SidebarItem href="/dashboard/history" label="History" />
            <SidebarItem href="/dashboard/credits" label="Credits" />
          </nav>
        </aside>

        <main className="flex-1 lg:pl-56">
          <Container className="py-6">
            {children}
          </Container>
        </main>
      </div>
    </div>
  )
}

function SidebarItem({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? 'bg-aurora/10 text-aurora font-medium'
          : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </a>
  )
}
