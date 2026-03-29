import { motion } from 'framer-motion'

const categoryGradients = [
  'from-cyan-500/20 to-blue-500/20',
  'from-blue-500/20 to-indigo-500/20',
  'from-red-500/20 to-orange-500/20',
  'from-purple-500/20 to-pink-500/20',
  'from-green-500/20 to-emerald-500/20',
  'from-amber-500/20 to-yellow-500/20',
  'from-orange-500/20 to-red-500/20',
  'from-pink-500/20 to-purple-500/20',
]

const shapes = [
  { size: 400, x: '10%', y: '15%', delay: 0, duration: 20 },
  { size: 300, x: '70%', y: '10%', delay: 2, duration: 25 },
  { size: 350, x: '50%', y: '60%', delay: 4, duration: 22 },
  { size: 250, x: '80%', y: '70%', delay: 1, duration: 18 },
  { size: 200, x: '20%', y: '75%', delay: 3, duration: 24 },
  { size: 280, x: '40%', y: '20%', delay: 5, duration: 21 },
]

const GlassMorphismShapes = ({ activeCategory = 0 }) => {
  const gradient = categoryGradients[activeCategory] || categoryGradients[0]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${gradient}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backdropFilter: 'blur(80px)',
            WebkitBackdropFilter: 'blur(80px)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 15, -10, 0],
            scale: [1, 1.05, 0.95, 1.02, 1],
            opacity: [0.3, 0.5, 0.35, 0.45, 0.3],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  )
}

export default GlassMorphismShapes
