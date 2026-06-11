import { cn } from '../../../shared/lib/cn'
import type { Template } from '../data/templates'

interface TemplateCardProps {
  template: Template
  isSelected: boolean
  onSelect: (template: Template) => void
}

const categoryGradients: Record<string, string> = {
  cinematic: 'from-aurora to-nebula',
  nature: 'from-emerald-500 to-teal-600',
  'sci-fi': 'from-cyan-500 to-blue-600',
  action: 'from-red-500 to-orange-600',
  noir: 'from-fuchsia-500 to-indigo-600',
  fantasy: 'from-amber-400 to-purple-600',
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(template)}
      className={cn(
        'w-full rounded-xl border p-4 text-left transition-all duration-200',
        isSelected
          ? 'border-aurora bg-aurora/10 ring-1 ring-aurora/50'
          : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]',
      )}
    >
      <div
        className={cn(
          'mb-3 h-1.5 w-full rounded-full bg-gradient-to-r',
          categoryGradients[template.category] ?? 'from-white/20 to-white/5',
        )}
      />
      <p className="text-sm font-medium">{template.title}</p>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/40">
        {template.prompt}
      </p>
      {isSelected && (
        <span className="mt-2 inline-flex items-center gap-1 text-xs text-aurora">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Selected
        </span>
      )}
    </button>
  )
}
