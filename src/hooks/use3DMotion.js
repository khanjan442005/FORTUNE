import { useRef, useCallback, useState } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export function use3DMotion(options = {}) {
  const {
    maxRotate = 10,
    springConfig = { stiffness: 200, damping: 20, mass: 0.5 },
    perspective = 1000,
    scale = 1,
    glareIntensity = 0.3,
    disabled = false,
  } = options

  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [maxRotate, -maxRotate]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxRotate, maxRotate]), springConfig)
  const scaleSpring = useSpring(isHovered ? scale : 1, springConfig)

  const glareX = useTransform(x, [0, 1], [0, 100])
  const glareY = useTransform(y, [0, 1], [0, 100])
  const glareOpacity = useSpring(isHovered ? glareIntensity : 0, { stiffness: 100, damping: 20 })

  const handleMouseMove = useCallback((e) => {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }, [disabled, x, y])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0.5)
    y.set(0.5)
  }, [x, y])

  return {
    ref,
    style: {
      rotateX: disabled ? 0 : rotateX,
      rotateY: disabled ? 0 : rotateY,
      scale: scaleSpring,
      transformPerspective: perspective,
      transformStyle: 'preserve-3d',
    },
    glareStyle: {
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareIntensity}), transparent 60%)`,
      opacity: glareOpacity,
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    isHovered,
  }
}

export default use3DMotion
