import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Link } from "react-router-dom"

function Logo3D({ size = "md", showText = true, className = "" }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 15 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 15 })
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100])

  const sizeConfig = {
    sm: { box: 36, icon: 18, text: "text-lg", sub: "text-[8px]", gap: "gap-2" },
    md: { box: 48, icon: 24, text: "text-2xl", sub: "text-[9px]", gap: "gap-3" },
    lg: { box: 64, icon: 32, text: "text-3xl", sub: "text-[10px]", gap: "gap-4" },
  }

  const cfg = sizeConfig[size] || sizeConfig.md

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <Link
      to="/"
      className={`flex items-center ${cfg.gap} group no-underline ${className}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Logo Box */}
      <motion.div
        className="relative"
        style={{
          width: cfg.box,
          height: cfg.box,
          perspective: 800,
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(245,158,11,0.12) 40%, transparent 70%)",
            filter: "blur(12px)",
          }}
          animate={isHovered ? { scale: [1, 1.1, 1], opacity: 1 } : { scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 3D Rotating container */}
        <motion.div
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
        >
          {/* Main 3D Box */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(0px)",
            }}
            animate={isHovered ? { rotateY: [0, 360] } : {}}
            transition={{ duration: 3, ease: "easeInOut", repeat: isHovered ? Infinity : 0, repeatDelay: 5 }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                transform: "translateZ(8px)",
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #f59e0b 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {/* Glass reflection */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 50%)",
                  opacity: isHovered ? 0.8 : 0.4,
                }}
              />
              {/* Moving glare spot */}
              <motion.div
                className="absolute w-1/2 h-1/2 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
                  left: glareX,
                  top: glareY,
                  filter: "blur(8px)",
                }}
              />
              {/* Window icon */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full p-[18%]"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
              >
                <defs>
                  <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
                  </linearGradient>
                </defs>
                {/* Window frame */}
                <rect x="8" y="18" width="84" height="68" rx="6" fill="none" stroke="url(#windowGrad)" strokeWidth="4" />
                {/* Horizontal divider */}
                <line x1="8" y1="52" x2="92" y2="52" stroke="url(#windowGrad)" strokeWidth="2.5" />
                {/* Vertical divider */}
                <line x1="50" y1="18" x2="50" y2="86" stroke="url(#windowGrad)" strokeWidth="2.5" />
                {/* Panes with glass effect */}
                <rect x="12" y="22" width="34" height="26" rx="2" fill="rgba(255,255,255,0.08)" />
                <rect x="54" y="22" width="34" height="26" rx="2" fill="rgba(255,255,255,0.08)" />
                <rect x="12" y="56" width="34" height="26" rx="2" fill="rgba(255,255,255,0.08)" />
                <rect x="54" y="56" width="34" height="26" rx="2" fill="rgba(255,255,255,0.08)" />
              </svg>
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                transform: "translateZ(-8px) rotateY(180deg)",
                background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
              }}
            />

            {/* Top face */}
            <div
              className="absolute rounded-xl"
              style={{
                width: cfg.box,
                height: 16,
                transform: "rotateX(90deg) translateZ(0px)",
                background: "linear-gradient(to bottom, rgba(59,130,246,0.55), rgba(245,158,11,0.2))",
              }}
            />

            {/* Bottom face */}
            <div
              className="absolute rounded-xl"
              style={{
                width: cfg.box,
                height: 16,
                bottom: 0,
                transform: "rotateX(-90deg) translateZ(0px)",
                background: "linear-gradient(to top, rgba(245,158,11,0.35), rgba(59,130,246,0.24))",
              }}
            />

            {/* Right face */}
            <div
              className="absolute rounded-xl"
              style={{
                width: 16,
                height: cfg.box,
                right: 0,
                transform: "rotateY(90deg) translateZ(0px)",
                background: "linear-gradient(to left, rgba(245,158,11,0.28), rgba(59,130,246,0.35))",
              }}
            />

            {/* Left face */}
            <div
              className="absolute rounded-xl"
              style={{
                width: 16,
                height: cfg.box,
                left: 0,
                transform: "rotateY(-90deg) translateZ(0px)",
                background: "linear-gradient(to right, rgba(59,130,246,0.4), rgba(245,158,11,0.18))",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Animated ring */}
        <motion.svg
          className="absolute -inset-1 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="50" cy="50" r="46"
            stroke="url(#ringGrad)"
            strokeWidth="0.5"
            strokeDasharray="8 12"
            opacity={isHovered ? 0.8 : 0.3}
            className="transition-opacity duration-500"
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Particle dots */}
        {isHovered && (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400"
                initial={{
                  x: cfg.box / 2,
                  y: cfg.box / 2,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: [
                    cfg.box / 2,
                    cfg.box / 2 + Math.cos((i * 60 * Math.PI) / 180) * 30,
                  ],
                  y: [
                    cfg.box / 2,
                    cfg.box / 2 + Math.sin((i * 60 * Math.PI) / 180) * 30,
                  ],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
                style={{
                  filter: "blur(0.5px)",
                  boxShadow: "0 0 6px rgba(59,130,246,0.55)",
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Brand text */}
      {showText && (
        <div className="flex flex-col">
          <motion.h1
            className={`${cfg.text} font-bold tracking-wide leading-tight`}
            whileHover={{ scale: 1.03 }}
          >
            <span className="text-white">Dynamic</span>
            <span className="ml-1.5 bg-gradient-to-r from-blue-400 via-sky-500 to-amber-400 bg-clip-text text-transparent">Windows</span>
          </motion.h1>
          <motion.span
            className={`${cfg.sub} tracking-[0.25em] uppercase font-medium`}
            style={{ color: "rgba(59,130,246,0.72)" }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Premium Solutions
          </motion.span>
        </div>
      )}
    </Link>
  )
}

export default Logo3D
