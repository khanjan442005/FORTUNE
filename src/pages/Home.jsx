import { useEffect, Suspense } from "react"
import { motion, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion"
import Navbar from "../components/Navbar"
import HeroSlider from "../components/HeroSlider"
import Products from "../components/Products"
import Showcase3D from "../components/Showcase3D"
import Features from "../components/Features"
import Window3D from "../components/Window3D"
import Testimonials from "../components/Testimonials"
import Gallery from "../components/Gallery"
import About from "../components/About"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 z-[60] origin-left"
    />
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-cyan-400 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    />
  )
}

function ParallaxBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const x = useTransform(mouseX, [-0.5, 0.5], [-30, 30])
  const y = useTransform(mouseY, [-0.5, 0.5], [-30, 30])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ x, y }}
    >
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
    </motion.div>
  )
}

function Home() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })
  }, [])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="min-h-screen bg-[#030712]">
        <CustomCursor />
        <ParallaxBackground />
        <ScrollProgress />
        <Navbar />
        <HeroSlider />
        <Products />
        <Showcase3D />
        <Window3D />
        <Features />
        <Testimonials />
        <Gallery />
        <About />
        <Contact />
        <Footer />
      </div>
    </Suspense>
  )
}

export default Home