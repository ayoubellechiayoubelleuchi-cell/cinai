export interface Template {
  id: string
  title: string
  prompt: string
  category: string
  style: string
}

export interface TemplateCategory {
  id: string
  name: string
  icon: string
}

export const templateCategories: TemplateCategory[] = [
  { id: 'cinematic', name: 'Cinematic', icon: '🎬' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'sci-fi', name: 'Sci-Fi', icon: '🚀' },
  { id: 'action', name: 'Action', icon: '💥' },
  { id: 'noir', name: 'Noir', icon: '🌃' },
  { id: 'fantasy', name: 'Fantasy', icon: '🧙' },
]

export const templates: Template[] = [
  {
    id: 'aerial-cinematic',
    title: 'Aerial Cinematic',
    prompt: 'A sweeping aerial drone shot over a misty mountain range at golden hour, clouds parting to reveal valleys below, cinematic 24fps, warm golden tones',
    category: 'cinematic',
    style: 'cinematic',
  },
  {
    id: 'slow-motion-portrait',
    title: 'Slow Motion Portrait',
    prompt: "Extreme close-up of a person's eyes in dramatic lighting, slow motion, shallow depth of field, cinematic grain, emotional atmosphere",
    category: 'cinematic',
    style: 'cinematic',
  },
  {
    id: 'rainy-night-city',
    title: 'Rainy Night City',
    prompt: 'Rain-soaked neon-lit city street at night, reflections on wet pavement, steam rising from vents, cinematic tracking shot, moody blue and magenta tones',
    category: 'noir',
    style: 'neon-noir',
  },
  {
    id: 'foggy-alley',
    title: 'Foggy Alley',
    prompt: 'A detective walking through a foggy alleyway, dim streetlights casting long shadows, film noir style, high contrast, 35mm film grain',
    category: 'noir',
    style: 'neon-noir',
  },
  {
    id: 'space-station',
    title: 'Space Station',
    prompt: 'A massive rotating space station orbiting a distant planet, stars in background, sleek metallic surfaces, cold blue lighting, cinematic wide shot',
    category: 'sci-fi',
    style: 'sci-fi',
  },
  {
    id: 'cyberpunk-street',
    title: 'Cyberpunk Street',
    prompt: 'Flying cars between towering neon-lit skyscrapers, holographic advertisements, rain, cyberpunk aesthetic, dutch angle shot, vibrant purple and cyan',
    category: 'sci-fi',
    style: 'neon-noir',
  },
  {
    id: 'forest-waterfall',
    title: 'Forest Waterfall',
    prompt: 'A crystal clear waterfall in a lush green forest, sunlight piercing through canopy, mist rising, nature documentary style, vibrant natural colors',
    category: 'nature',
    style: 'nature',
  },
  {
    id: 'ocean-sunset',
    title: 'Ocean Sunset',
    prompt: 'Waves crashing on a rocky shore at sunset, golden light reflecting on water, dramatic clouds, cinematic wide angle, warm amber tones',
    category: 'nature',
    style: 'nature',
  },
  {
    id: 'car-chase',
    title: 'Car Chase',
    prompt: 'A high-speed car chase through a winding mountain road at dusk, tires screeching, dust clouds, dynamic camera angles, fast cuts, blockbuster style',
    category: 'action',
    style: 'blockbuster',
  },
  {
    id: 'explosion-slowmo',
    title: 'Explosion Slow Motion',
    prompt: 'A massive explosion in slow motion, debris flying, shockwave rippling through air, intense orange and red flames, cinematic 24fps, high contrast',
    category: 'action',
    style: 'blockbuster',
  },
  {
    id: 'magical-forest',
    title: 'Magical Forest',
    prompt: 'A glowing enchanted forest with bioluminescent mushrooms and floating fireflies, ethereal mist, fantasy style, soft dreamy lighting, cinematic depth of field',
    category: 'fantasy',
    style: 'cinematic',
  },
  {
    id: 'medieval-castle',
    title: 'Medieval Castle',
    prompt: 'A majestic medieval castle on a cliff at sunrise, banners waving, dramatic clouds, epic orchestral atmosphere, wide establishing shot, vintage film look',
    category: 'fantasy',
    style: 'vintage',
  },
]
