import { cn } from '../../../shared/lib/cn'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function PromptInput({ value, onChange, className }: PromptInputProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor="prompt" className="text-sm font-medium text-white/60">
        Describe your video
      </label>
      <div className="relative">
        <textarea
          id="prompt"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="A cinematic aerial shot of a neon-lit cyberpunk city at night, raining, with flying cars..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-white/20 transition-all duration-200 focus:outline-none focus:border-aurora focus:ring-1 focus:ring-aurora/50"
        />
        <div className="pointer-events-none absolute bottom-3 right-3 text-xs text-white/20">
          {value.length} chars
        </div>
      </div>
    </div>
  )
}
