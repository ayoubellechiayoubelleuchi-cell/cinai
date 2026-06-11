import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Container } from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-28', className)}>
      <Container>{children}</Container>
    </section>
  )
}
