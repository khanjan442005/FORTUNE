import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [startHover, setStartHover] = useState(false)

  const particles = useMemo(() => {
    return [...Array(30)].map(() => ({
      // eslint-disable-next-line react-hooks/purity
      left: `${Math.random() * 100}%`,
      // eslint-disable-next-line react-hooks/purity
      top: `${Math.random() * 100}%`,
      // eslint-disable-next-line react-hooks/purity
      animationDelay: `${Math.random() * 4}s`,
      // eslint-disable-next-line react-hooks/purity
      animationDuration: `${3 + Math.random() * 4}s`,
      // eslint-disable-next-line react-hooks/purity
      width: `${4 + Math.random() * 8}px`,
      // eslint-disable-next-line react-hooks/purity
      height: `${4 + Math.random() * 8}px`
    }))
  }, [])

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
      setTimeout(() => navigate('/'), 1200)
    }, 2800)
    return () => { clearInterval(interval); clearTimeout(timer); }
  }, [navigate])

  const handleSkip = () => {
    setLoaded(true)
    setProgress(100)
    setTimeout(() => navigate('/'), 500)
  }

  return (
    <div className="landing-page">
      <div className="bg-shapes">
      </div>
      
      <div className="particles">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={p}></div>
        ))}
      </div>
      
      <div 
        className={`logo-container ${loaded ? 'loaded' : ''}`}
        onMouseEnter={() => setStartHover(true)}
        onMouseLeave={() => setStartHover(false)}
      >
        <div className="logo-wrapper">
          <div className={`logo-3d ${startHover ? 'hover' : ''}`}>
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
              <div className="logo-face logo-back"></div>
              <div className="logo-face logo-right"></div>
              <div className="logo-face logo-left"></div>
              <div className="logo-face logo-top"></div>
              <div className="logo-face logo-bottom"></div>
            </div>
            <div className="logo-shadow"></div>
          </div>
        </div>
        
        <h1 className="company-name">
          <span className="name-dynamic">Dynamic</span>
          <span className="name-windows">Windows</span>
        </h1>
        
        <p className="tagline">
          <span className="tagline-text">Premium Windows & Doors</span>
        </p>
        
        <div className="features-list">
          {['Quality Craftsmanship', 'Modern Design', 'Expert Installation'].map((feature, i) => (
            <div key={i} className="feature-item" style={{animationDelay: `${0.8 + i * 0.15}s`}}>
              <span className="feature-icon">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="progress-container">
          <div className="progress-track">
            <div className="progress-bar" style={{width: `${progress}%`}}></div>
          </div>
          <div className="progress-info">
            <span className="loading-text">Loading</span>
            <span className="progress-percent">{progress}%</span>
          </div>
        </div>
        
        <p className="skip-text" onClick={handleSkip}>Skip →</p>
      </div>
    </div>
  )
}

export default Landing
