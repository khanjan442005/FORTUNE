import { useRef, Children, isValidElement } from 'react'
import { motion, useInView } from 'framer-motion'

const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  fadeScale: {
    hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -80, y: 40 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  slideRotate: {
    hidden: { opacity: 0, x: -80, rotate: -8 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.5, filter: 'blur(12px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(20px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  clipUp: {
    hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
    visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
  },
}

function RevealOnScroll({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  once = true,
  className = '',
  as = 'div',
  ease = [0.25, 0.46, 0.45, 0.94],
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const variants = revealVariants[variant] || revealVariants.fadeUp

  const Component = motion[as] || motion.div

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            duration,
            delay,
            ease,
          },
        },
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </Component>
  )
}

function StaggerReveal({
  children,
  staggerDelay = 0.08,
  variant = 'fadeUp',
  once = true,
  threshold = 0.1,
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const variants = revealVariants[variant] || revealVariants.fadeUp

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child
        return (
          <motion.div
            variants={{
              hidden: variants.hidden,
              visible: {
                ...variants.visible,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function TextReveal({
  children,
  delay = 0,
  once = true,
  className = '',
  charDelay = 0.03,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const text = typeof children === 'string' ? children : ''

  if (!text) {
    return (
      <RevealOnScroll delay={delay} once={once} className={className}>
        {children}
      </RevealOnScroll>
    )
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', overflow: 'hidden' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, rotateX: -40 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * charDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export { RevealOnScroll, StaggerReveal, TextReveal }
export default RevealOnScroll
