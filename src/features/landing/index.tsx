import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Waitlist } from './components/Waitlist'
import { Footer } from './components/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />
      <Hero />
      <Features />
      <Waitlist />
      <Footer />
    </div>
  )
}
