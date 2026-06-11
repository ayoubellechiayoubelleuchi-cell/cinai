import { Container } from '../../../shared/components/layout/Container'
import { SITE, NAV_ITEMS } from '../../../shared/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-aurora-gradient" />
            <span className="text-lg font-bold">{SITE.name}</span>
          </div>

          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((item: { label: string; href: string }) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/40 transition-colors hover:text-white/80"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-white/20">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
