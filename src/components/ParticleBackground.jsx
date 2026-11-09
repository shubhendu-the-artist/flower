import { useEffect, useRef } from 'react'

export default function ParticleBackground({ count = 110, color = '#818cf8' }) {
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
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
