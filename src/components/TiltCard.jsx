import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

function TiltCard({
  children,
  className = '',
  tiltMax = 15,
  scale = 1.02,
  perspective = 1000,
  springConfig = { stiffness: 300, damping: 20, mass: 0.5 },
  glareEnabled = true,
  glareMax = 0.4,
  glareColor = 'rgba(255,255,255,0.1)',
  disabled = false,
  onClick,
}) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltMax, -tiltMax]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltMax, tiltMax]), springConfig)
  const scaleSpring = useSpring(isHovered ? scale : 1, springConfig)

  const glareX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100])
  const glareOpacity = useTransform(
    x,
    [-0.5, 0, 0.5],
    [0, isHovered ? glareMax : 0, 0]
  )

  const handleMouseMove = useCallback((e) => {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }, [disabled, x, y])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }, [x, y])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={`relative ${className}`}
      style={{ perspective, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          scale: disabled ? 1 : scaleSpring,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}

        {glareEnabled && !disabled && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor}, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}

export default TiltCard
