import { useRef, useEffect, useCallback } from 'react'

const categoryColors = [
  { r: 0, g: 240, b: 255 },
  { r: 59, g: 130, b: 246 },
  { r: 239, g: 68, b: 68 },
  { r: 168, g: 85, b: 247 },
  { r: 34, g: 197, b: 94 },
  { r: 251, g: 191, b: 36 },
  { r: 249, g: 115, b: 22 },
  { r: 236, g: 72, b: 153 },
]

const NeuralNetwork = ({ activeCategory = 0, mousePos = { x: 0.5, y: 0.5 } }) => {
  const canvasRef = useRef(null)
  const nodesRef = useRef([])
  const animationRef = useRef(null)
  const glowIntensityRef = useRef(0)
  const prevCategoryRef = useRef(0)

  const initNodes = useCallback((width, height) => {
    const nodes = []
    const count = Math.min(60, Math.floor((width * height) / 25000))
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }
    return nodes
  }, [])

  useEffect(() => {
    if (activeCategory !== prevCategoryRef.current) {
      glowIntensityRef.current = 1
      prevCategoryRef.current = activeCategory
    }
  }, [activeCategory])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      nodesRef.current = initNodes(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width, height } = canvas
      const nodes = nodesRef.current
      const color = categoryColors[activeCategory] || categoryColors[0]
      const glow = glowIntensityRef.current

      ctx.clearRect(0, 0, width, height)

      // Draw connections
      const connectionDist = 180
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * (0.15 + glow * 0.25)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
            ctx.lineWidth = 0.8 + glow * 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      const time = Date.now() * 0.001
      for (const node of nodes) {
        const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.3 + 0.7
        const r = node.radius * (1 + glow * 0.5) * pulse

        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4)
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 + glow * 0.4})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.8 + glow * 0.2})`
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fill()

        // Mouse influence
        const mx = mousePos.x * width
        const my = mousePos.y * height
        const mdx = node.x - mx
        const mdy = node.y - my
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 200) {
          const influence = (1 - mdist / 200) * 0.3
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${influence})`
          ctx.lineWidth = 1
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      // Update positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }

      // Decay glow
      if (glowIntensityRef.current > 0) {
        glowIntensityRef.current = Math.max(0, glowIntensityRef.current - 0.008)
      }

      animationRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [activeCategory, mousePos, initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default NeuralNetwork
