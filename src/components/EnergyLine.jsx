import { useRef, useEffect } from 'react'

const categoryColors = [
  { start: '#00f0ff', end: '#0066ff' },
  { start: '#3b82f6', end: '#6366f1' },
  { start: '#ef4444', end: '#f97316' },
  { start: '#a855f7', end: '#ec4899' },
  { start: '#22c55e', end: '#10b981' },
  { start: '#f59e0b', end: '#eab308' },
  { start: '#f97316', end: '#ef4444' },
  { start: '#ec4899', end: '#a855f7' },
]

const EnergyLine = ({ activeCategory = 0, brightness = 1 }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width, height } = canvas
      const colors = categoryColors[activeCategory] || categoryColors[0]
      const time = Date.now() * 0.001

      ctx.clearRect(0, 0, width, height)

      // Draw multiple energy lines
      for (let line = 0; line < 3; line++) {
        const yOffset = height * (0.25 + line * 0.25)
        const alpha = (0.15 + brightness * 0.2) * (1 - line * 0.2)

        ctx.beginPath()
        const gradient = ctx.createLinearGradient(0, 0, width, 0)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(0.2, colors.start + Math.round(alpha * 255).toString(16).padStart(2, '0'))
        gradient.addColorStop(0.5, colors.end + Math.round(alpha * 1.5 * 255).toString(16).padStart(2, '0'))
        gradient.addColorStop(0.8, colors.start + Math.round(alpha * 255).toString(16).padStart(2, '0'))
        gradient.addColorStop(1, 'transparent')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5 + brightness * 1.5
        ctx.shadowColor = colors.start
        ctx.shadowBlur = 10 + brightness * 20

        for (let x = 0; x <= width; x += 2) {
          const wave1 = Math.sin(x * 0.005 + time * 1.5 + line) * 30
          const wave2 = Math.sin(x * 0.01 + time * 2.5 + line * 2) * 15
          const wave3 = Math.sin(x * 0.003 + time * 0.8 + line * 0.5) * 40
          const y = yOffset + wave1 + wave2 + wave3

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Horizontal energy beam at center
      const centerY = height * 0.5
      ctx.beginPath()
      const beamGrad = ctx.createLinearGradient(0, 0, width, 0)
      beamGrad.addColorStop(0, 'transparent')
      beamGrad.addColorStop(0.15, colors.start + '30')
      beamGrad.addColorStop(0.5, colors.end + '60')
      beamGrad.addColorStop(0.85, colors.start + '30')
      beamGrad.addColorStop(1, 'transparent')

      ctx.strokeStyle = beamGrad
      ctx.lineWidth = 0.5 + brightness
      ctx.shadowColor = colors.end
      ctx.shadowBlur = 5 + brightness * 10

      const beamOffset = time * 100
      ctx.setLineDash([20, 30])
      ctx.lineDashOffset = -beamOffset
      ctx.moveTo(0, centerY)
      ctx.lineTo(width, centerY)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.shadowBlur = 0

      animationRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [activeCategory, brightness])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 4, opacity: 0.8 }}
    />
  )
}

export default EnergyLine
