import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
  variant?: 'aurora-nebula' | 'aurora-stellar' | 'nebula-stellar'
}

const gradients = {
  'aurora-nebula': 'from-aurora to-nebula',
  'aurora-stellar': 'from-aurora to-stellar',
  'nebula-stellar': 'from-nebula to-stellar',
} as const

export function GradientText({
  children,
  as: Tag = 'span',
  variant = 'aurora-nebula',
  className,
  ...props
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradients[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
