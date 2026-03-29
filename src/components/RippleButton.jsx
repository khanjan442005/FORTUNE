import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function RippleButton({
  children,
  className = '',
  rippleColor = 'rgba(255,255,255,0.3)',
  duration = 600,
  onClick,
  disabled = false,
  ...props
}) {
  const [ripples, setRipples] = useState([])
  const buttonRef = useRef(null)

  const handleClick = useCallback((e) => {
    if (disabled || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height) * 2

    const ripple = {
      id: Date.now(),
      x: x - size / 2,
      y: y - size / 2,
      size,
    }

    setRipples((prev) => [...prev, ripple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
    }, duration)

    onClick?.(e)
  }, [disabled, duration, onClick])

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              background: rippleColor,
            }}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  )
}

export default RippleButton
