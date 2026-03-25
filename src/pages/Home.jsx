import { useEffect, Suspense, useState } from "react"
import { motion, useScroll, useMotionValue, useTransform } from "framer-motion"
import { useLocation } from "react-router-dom"
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

function ParallaxBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isParallaxEnabled, setIsParallaxEnabled] = useState(false)

  const x = useTransform(mouseX, [-0.5, 0.5], [-30, 30])
  const y = useTransform(mouseY, [-0.5, 0.5], [-30, 30])

  useEffect(() => {
    const inputQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const updateParallaxState = () => {
      setIsParallaxEnabled(inputQuery.matches && !motionQuery.matches)
    }

    updateParallaxState()
    inputQuery.addEventListener("change", updateParallaxState)
    motionQuery.addEventListener("change", updateParallaxState)

    return () => {
      inputQuery.removeEventListener("change", updateParallaxState)
      motionQuery.removeEventListener("change", updateParallaxState)
    }
  }, [])

  useEffect(() => {
    if (!isParallaxEnabled) {
      mouseX.set(0)
      mouseY.set(0)
      return
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("pointermove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("pointermove", handleMouseMove)
  }, [mouseX, mouseY, isParallaxEnabled])

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
  const location = useLocation()

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'))

    const handleAnchorClick = (event) => {
      const href = event.currentTarget.getAttribute("href")

      if (!href || href === "#") {
        return
      }

      const target = document.querySelector(href)

      if (!target) {
        return
      }

      event.preventDefault()
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick))

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick))
    }
  }, [])

  useEffect(() => {
    const scrollToSection = () => {
      if (!location.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      const target = document.querySelector(location.hash)

      if (!target) {
        return
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    const frameId = window.requestAnimationFrame(scrollToSection)

    return () => window.cancelAnimationFrame(frameId)
  }, [location.hash])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="min-h-screen bg-[#030712]">
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
