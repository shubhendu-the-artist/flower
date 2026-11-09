import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import Contact from './components/Contact'
import Footer from './components/Footer'


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  // Refresh ScrollTrigger on mount and resize
  useEffect(() => {
    ScrollTrigger.refresh()
    const refreshScrollTriggers = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refreshScrollTriggers)
    return () => window.removeEventListener('resize', refreshScrollTriggers)
  }, [])

  return (
    <div id="main" className="relative isolate min-h-screen w-full overflow-clip bg-black text-white">
      {/* Particle Background */}
      <ParticleBackground count={110} color="#818cf8" />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">

        <section id="about" className="relative">
          {/* Hero Section */}
          <Hero className="absolute" />

        </section>

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}