import { useState } from 'react'
import { Button } from '../../../shared/components/ui/Button'
import { PromptInput } from './PromptInput'
import { StyleSelector } from './StyleSelector'
import { VideoResult } from './VideoResult'
import { useGenerateVideo } from '../../../hooks/useGenerateVideo'
import { useToastStore } from '../../../store/toastStore'

export function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('cinematic')
  const addToast = useToastStore((s) => s.addToast)
  const { mutate, data, isPending, error } = useGenerateVideo()

  function handleGenerate() {
    if (!prompt.trim()) return
    mutate(
      { prompt, style },
      {
        onSuccess: (result) => {
          if (result.status === 'completed') {
            addToast('Video generated successfully!', 'success')
          } else {
            addToast('Video is processing. Check back shortly.', 'info')
          }
        },
        onError: (err) => {
          addToast(err.message, 'error')
        },
      },
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Generate Video</h1>
        <p className="mt-1 text-sm text-white/50">
          Turn your ideas into cinematic AI videos.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <PromptInput value={prompt} onChange={setPrompt} />
          <StyleSelector selected={style} onSelect={setStyle} />

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              {error.message}
            </div>
          )}

          <Button
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                Generate Video
              </span>
            )}
          </Button>
        </div>

        <div className="lg:col-span-2">
          <VideoResult
            videoUrl={data?.videoUrl ?? null}
            prompt={prompt}
            isLoading={isPending}
          />
        </div>
      </div>
    </div>
  )
}
