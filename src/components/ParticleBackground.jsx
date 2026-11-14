import { useEffect, useRef } from 'react'
 
// Palette + layers taken from the portfolio's background
const BG = '#090811'
const AMBIENT =
  'radial-gradient(ellipse at 77% 28%, rgba(104, 62, 185, .18), transparent 40%), ' +
  'radial-gradient(ellipse at 12% 95%, rgba(40, 103, 95, .10), transparent 35%)'
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E")`
 
export default function ParticleBackground({ count = 110, color = '#b9a5ec' }) {
  const canvasRef = useRef(null)
 
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
 
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -1000, y: -1000 }
    let width = 0
    let height = 0
    let frameId = 0
    let particles = []
 
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.45 + 0.12,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }))
    }
 
    const draw = () => {
      context.clearRect(0, 0, width, height)
      for (const particle of particles) {
        if (!reduceMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < 0) particle.x = width
          if (particle.x > width) particle.x = 0
          if (particle.y < 0) particle.y = height
          if (particle.y > height) particle.y = 0
 
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance > 0 && distance < 90) {
            particle.x += (dx / distance) * 0.45
            particle.y += (dy / distance) * 0.45
          }
        }
 
        context.globalAlpha = particle.alpha
        context.fillStyle = color
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }
      context.globalAlpha = 1
      if (!reduceMotion) frameId = window.requestAnimationFrame(draw)
    }
 
    const onPointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }
    const onPointerLeave = () => {
      pointer.x = -1000
      pointer.y = -1000
    }
 
    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
 
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [count, color])
 
  return (
    <>
      {/* Base color */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundColor: BG }}
        aria-hidden="true"
      />
      {/* Purple + teal ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: AMBIENT }}
        aria-hidden="true"
      />
      {/* Particles (unchanged) */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />
      {/* Film grain, sits above page content like the original */}
      <div
        className="pointer-events-none fixed inset-0 z-4"
        style={{ backgroundImage: GRAIN, opacity: 0.11 }}
        aria-hidden="true"
      />
    </>
  )
}
 