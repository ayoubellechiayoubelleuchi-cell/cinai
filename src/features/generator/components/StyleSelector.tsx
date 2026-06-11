import { cn } from '../../../shared/lib/cn'

interface Style {
  id: string
  name: string
  description: string
  gradient: string
}

const styles: Style[] = [
  { id: 'cinematic', name: 'Cinematic', description: 'Film-like depth of field, 24fps grain', gradient: 'from-amber-700 to-amber-900' },
  { id: 'neon-noir', name: 'Neon Noir', description: 'Cyberpunk aesthetic with neon highlights', gradient: 'from-fuchsia-600 to-indigo-900' },
  { id: 'blockbuster', name: 'Blockbuster', description: 'High contrast, vibrant, action-ready', gradient: 'from-red-600 to-orange-800' },
  { id: 'vintage', name: 'Vintage', description: '8mm film look with warm tones', gradient: 'from-yellow-700 to-amber-800' },
  { id: 'sci-fi', name: 'Sci-Fi', description: 'Cold blues, sleek metallic tones', gradient: 'from-cyan-600 to-blue-900' },
  { id: 'nature', name: 'Nature', description: 'Earthy tones, soft natural lighting', gradient: 'from-emerald-600 to-teal-800' },
]

interface StyleSelectorProps {
  selected: string
  onSelect: (id: string) => void
}

export function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/60">Cinematic style</label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {styles.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onSelect(style.id)}
            className={cn(
              'rounded-xl border p-3 text-left transition-all duration-200',
              selected === style.id
                ? 'border-aurora bg-aurora/10 ring-1 ring-aurora/50'
                : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]',
            )}
          >
            <div className={cn('mb-2 h-1.5 w-full rounded-full bg-gradient-to-r', style.gradient)} />
            <p className="text-sm font-medium">{style.name}</p>
            <p className="mt-0.5 text-xs text-white/40">{style.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
