import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function Landing() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 2
      })
    }, 35)
    const timer = setTimeout(() => {
      setLoaded(true)
      setTimeout(() => navigate('/home'), 1200)
    }, 3000)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [navigate])

  const handleSkip = useCallback(() => {
    setLoaded(true)
    setProgress(100)
    setTimeout(() => navigate('/home'), 500)
  }, [navigate])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#22d3ee', '#3b82f6', '#7c3aed', '#06b6d4', '#60a5fa']
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x
          const dy = p.y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = 0.08 * (1 - dist / 120)
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })
      ctx.globalAlpha = 1
      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <div className="landing-page">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      <div className="bg-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <AnimatePresence>
        <motion.div
          className={`logo-container ${loaded ? 'loaded' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8 }}
        >
          {/* 3D Rotating Logo Cube */}
          <div className="logo-wrapper">
            <motion.div
              className="logo-3d"
              initial={{ opacity: 0, scale: 0.3, rotateX: 60, rotateY: -60 }}
              animate={{ opacity: 1, scale: 1, rotateX: 15, rotateY: -20 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08, rotateX: 0, rotateY: 0 }}
            >
              <div className="logo-box">
                <div className="logo-face logo-front">
                  <svg viewBox="0 0 100 100" className="logo-icon">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#60a5fa'}} />
                        <stop offset="50%" style={{stopColor:'#22d3ee'}} />
                        <stop offset="100%" style={{stopColor:'#06b6d4'}} />
                      </linearGradient>
                      <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'rgba(255,255,255,0.9)'}} />
                        <stop offset="100%" style={{stopColor:'rgba(255,255,255,0.7)'}} />
                      </linearGradient>
                    </defs>
                    <rect x="15" y="20" width="70" height="60" rx="5" fill="url(#grad1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                    <rect x="22" y="27" width="24" height="24" rx="2" fill="url(#glass)"/>
                    <rect x="54" y="27" width="24" height="24" rx="2" fill="url(#glass)"/>
                    <rect x="22" y="56" width="24" height="18" rx="2" fill="url(#glass)"/>
                    <rect x="54" y="56" width="24" height="18" rx="2" fill="url(#glass)"/>
                    <rect x="35" y="10" width="30" height="12" rx="3" fill="url(#grad1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <line x1="34" y1="39" x2="66" y2="39" stroke="rgba(59,130,246,0.5)" strokeWidth="1"/>
                    <line x1="50" y1="27" x2="50" y2="74" stroke="rgba(59,130,246,0.5)" strokeWidth="1"/>
                    <line x1="22" y1="50" x2="46" y2="50" stroke="rgba(59,130,246,0.5)" strokeWidth="1"/>
                    <line x1="54" y1="50" x2="78" y2="50" stroke="rgba(59,130,246,0.5)" strokeWidth="1"/>
                  </svg>
                </div>
                <div className="logo-face logo-back" />
                <div className="logo-face logo-right" />
                <div className="logo-face logo-left" />
                <div className="logo-face logo-top" />
                <div className="logo-face logo-bottom" />
              </div>
              <div className="logo-shadow" />
            </motion.div>
          </div>

          {/* Brand Name */}
          <motion.h1
            className="company-name"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="name-dynamic">Dynamic</span>
            <span className="name-windows">Windows</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="tagline-text">Premium Windows & Doors</span>
          </motion.p>

          {/* Feature Badges */}
          <div className="features-list">
            {['Quality Craftsmanship', 'Modern Design', 'Expert Installation'].map((feature, i) => (
              <motion.div
                key={i}
                className="feature-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
                whileHover={{ y: -3, scale: 1.05 }}
              >
                <span className="feature-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <motion.div
            className="progress-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="progress-track">
              <div className="progress-bar" style={{width: `${progress}%`}} />
            </div>
            <div className="progress-info">
              <span className="loading-text">Entering</span>
              <span className="progress-percent">{progress}%</span>
            </div>
          </motion.div>

          {/* Skip Button */}
          <motion.p
            className="skip-text"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            whileHover={{ x: 5, color: '#22d3ee' }}
          >
            Skip →
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Landing
