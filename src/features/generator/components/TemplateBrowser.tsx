import { useState } from 'react'
import { cn } from '../../../shared/lib/cn'
import { templates, templateCategories, type Template } from '../data/templates'
import { TemplateCard } from './TemplateCard'

interface TemplateBrowserProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (prompt: string, style: string) => void
}

export function TemplateBrowser({ isOpen, onClose, onSelect }: TemplateBrowserProps) {
  const [category, setCategory] = useState('cinematic')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (!isOpen) return null

  const filtered = templates.filter((t) => t.category === category)

  function handleSelect(template: Template) {
    setSelectedId(template.id)
    onSelect(template.prompt, template.style)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-obsidian p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Prompt Templates</h2>
            <p className="mt-1 text-sm text-white/50">Choose a cinematic template to get started</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4">
          {templateCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors',
                category === cat.id
                  ? 'bg-aurora/10 text-aurora border border-aurora/30'
                  : 'bg-white/5 text-white/50 border border-white/5 hover:bg-white/10 hover:text-white',
              )}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid max-h-80 gap-3 overflow-y-auto pr-2 sm:grid-cols-2">
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedId === template.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
