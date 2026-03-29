import { useRef, useEffect, useCallback } from 'react'

const ParticleSystem = ({ scrollProgress = 0 }) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  const initParticles = useCallback((width, height) => {
    const particles = []
    const count = Math.min(120, Math.floor((width * height) / 15000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        depth: Math.random() * 3 + 1,
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = initParticles(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width, height } = canvas
      const particles = particlesRef.current
      const parallaxOffset = scrollProgress * 100

      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        const yOffset = (parallaxOffset * p.depth) % height
        const displayY = (p.y - yOffset + height) % height

        const gradient = ctx.createRadialGradient(p.x, displayY, 0, p.x, displayY, p.size * 2)
        gradient.addColorStop(0, `rgba(0, 240, 255, ${p.opacity})`)
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${p.opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(p.x, displayY, p.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.8})`
        ctx.arc(p.x, displayY, p.size * 0.5, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
      }

      animationRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [scrollProgress, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2, opacity: 0.6 }}
    />
  )
}

export default ParticleSystem
