import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

function ParallaxLayer({
  children,
  speed = 0.5,
  className = '',
  springConfig = { stiffness: 50, damping: 30, mass: 1 },
  direction = 'vertical',
  offset = ['start end', 'end start'],
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const rawRange = direction === 'vertical' ? [-100 * speed, 100 * speed] : [-80 * speed, 80 * speed]
  const motionAxis = direction === 'vertical' ? 'y' : 'x'

  const smoothProgress = useSpring(scrollYProgress, springConfig)

  const transformValue = useTransform(
    smoothProgress,
    [0, 1],
    rawRange
  )

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        [motionAxis]: transformValue,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  )
}

function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = '',
  imgClassName = '',
  scale = 1.2,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`${-30 * speed}%`, `${30 * speed}%`])
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale * 0.95])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
        style={{
          y,
          scale: scaleTransform,
          willChange: 'transform',
        }}
      />
    </div>
  )
}

function ParallaxText({
  children,
  speed = 0.15,
  className = '',
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [`${100 * speed}px`, `${-100 * speed}px`])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}

export { ParallaxLayer, ParallaxImage, ParallaxText }
export default ParallaxLayer
