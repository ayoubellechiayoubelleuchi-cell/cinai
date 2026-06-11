import { Link, Outlet, useLocation } from 'react-router-dom'
import { Container } from '../../../shared/components/layout/Container'
import { PageTransition } from '../../../shared/components/layout/PageTransition'

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-obsidian">
      <header className="fixed top-0 z-40 w-full border-b border-white/5 backdrop-blur-xl">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-lg bg-aurora-gradient" />
              <span className="font-bold">CineAI</span>
            </Link>
          </div>
        </Container>
      </header>

      <div className="flex pt-14">
        <Sidebar />
        <main className="flex-1 lg:pl-56">
          <Container className="py-6">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </Container>
        </main>
      </div>
    </div>
  )
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/generate', label: 'Generate' },
  { href: '/dashboard/history', label: 'History' },
  { href: '/dashboard/credits', label: 'Credits' },
]

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-56 border-r border-white/5 p-4 hidden lg:block">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              pathname === item.href
                ? 'bg-aurora/10 text-aurora font-medium'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
