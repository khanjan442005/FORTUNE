import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '#products' },
    { name: '3D Showcase', href: '#showcase' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Features', href: '#features' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass border-b border-white/5 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative w-12 h-12"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center border border-cyan-400/30">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-bold tracking-wide"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white">Dynamic</span>
                <span className="gradient-text ml-1">Windows</span>
              </motion.h1>
              <p className="text-xs text-cyan-400/70 tracking-widest uppercase">Premium Solutions</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    className="relative px-4 py-2 text-white/70 hover:text-white font-medium transition-colors group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="relative px-4 py-2 text-white/70 hover:text-white font-medium transition-colors group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="relative w-12 h-12 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0
                  }}
                  className="block w-full h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="block w-full h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0
                  }}
                  className="block w-full h-0.5 bg-white rounded-full"
                />
              </div>
            </button>
          </div>

        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 glass rounded-2xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {item.href.startsWith('#') ? (
                      <a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
