import { motion } from 'framer-motion'
import { Container } from '../../../shared/components/layout/Container'
import { Button } from '../../../shared/components/ui/Button'
import { SITE, NAV_ITEMS } from '../../../shared/lib/constants'

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur-xl"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-aurora-gradient" />
            <span className="text-lg font-bold">{SITE.name}</span>
          </div>

          <nav className="hidden items-center gap-8 sm:flex">
            {NAV_ITEMS.map((item: { label: string; href: string }) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/50 transition-colors hover:text-white/80"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button size="sm">Get Started</Button>
        </div>
      </Container>
    </motion.header>
  )
}
