import { useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function SmoothLoader({ onComplete, minDuration = 2800 }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const startTimeRef = useRef(null)
  const rafRef = useRef(null)

  const particles = useMemo(() => {
    const items = []
    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        x: ((i * 37 + 13) % 100),
        y: ((i * 53 + 7) % 100),
        size: ((i % 3) + 1),
        duration: ((i % 3) + 2),
        delay: ((i % 2) * 0.5),
      })
    }
    return items
  }, [])

  useEffect(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now()
    }

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current
      const rawProgress = Math.min((elapsed / minDuration) * 100, 100)

      const eased = rawProgress < 70
        ? rawProgress * 1.1
        : rawProgress < 90
          ? 70 + (rawProgress - 70) * 0.6
          : 82 + (rawProgress - 90) * 1.8

      setProgress(Math.min(eased, 100))

      if (rawProgress >= 100) {
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(() => {
            onComplete?.()
          }, 800)
        }, 400)
        return
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [minDuration, onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#030712' }}
          exit={{
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  background: `radial-gradient(circle, rgba(34,211,238,0.8), transparent)`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-[120px]" />
          </div>

          <div className="relative flex flex-col items-center gap-8 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                className="w-24 h-24 relative"
                animate={{ rotateY: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ transformStyle: 'preserve-3d', perspective: 800 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                    boxShadow: '0 0 40px rgba(34,211,238,0.4)',
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{ rotateX: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-white font-black text-3xl">DW</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  border: '1px solid rgba(34,211,238,0.2)',
                }}
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 6, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
              />
              <motion.div
                className="absolute -inset-6 rounded-full"
                style={{
                  border: '1px solid rgba(139,92,246,0.15)',
                  borderStyle: 'dashed',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Dynamic
                </span>
                <span className="text-white ml-2">Windows</span>
              </h1>
              <motion.p
                className="text-gray-500 text-sm tracking-[0.3em] uppercase"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Premium Windows & Doors
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative"
            >
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #3b82f6, #22d3ee, #06b6d4)',
                    boxShadow: '0 0 12px rgba(34,211,238,0.6)',
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                  Loading
                </span>
                <span className="text-[10px] font-bold text-cyan-500">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SmoothLoader
