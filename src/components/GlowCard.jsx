import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(34, 211, 238, 0.15)',
  glowSize = 400,
  borderColor = 'rgba(255,255,255,0.08)',
  hoverBorderColor = 'rgba(34, 211, 238, 0.3)',
  borderRadius = '1.5rem',
  disabled = false,
}) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || disabled) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [disabled])

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius,
        border: `1px solid ${isHovered ? hoverBorderColor : borderColor}`,
        transition: 'border-color 0.4s ease',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ borderRadius, zIndex: 0 }}
      >
        <motion.div
          className="absolute"
          style={{
            width: glowSize,
            height: glowSize,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
            left: mousePos.x - glowSize / 2,
            top: mousePos.y - glowSize / 2,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default GlowCard
