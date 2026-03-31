import { Suspense, lazy, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import GlobalExperience from './components/GlobalExperience'
import SmoothLoader from './components/SmoothLoader'
import { sectionLinks } from './data/sectionLinks'

const Home = lazy(() => import('./pages/Home'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

function LoadingFallback() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6">
      <div className="absolute inset-0 grid-background opacity-20" />
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-500/12 blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-purple-500/12 blur-[170px]" />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glass-strong relative w-full max-w-md rounded-[2rem] border border-white/10 p-8 text-center shadow-[0_24px_80px_rgba(2,8,23,0.36)]"
      >
        <motion.div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xl font-black text-white"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          DW
        </motion.div>
        <p className="mt-5 text-sm uppercase tracking-[0.28em] text-cyan-200/75">
          Loading Space
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white">Preparing the next scene</h2>
        <div className="mt-6 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Smooth transitions, motion layers, and interactive details are loading.
        </p>
      </motion.div>
    </div>
  )
}

function RouteViewport() {
  const location = useLocation()

  return (
    <ErrorBoundary fallback={<RouteFallback />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/features" element={<Navigate to={sectionLinks.features} replace />} />
              <Route path="/testimonials" element={<Navigate to={sectionLinks.testimonials} replace />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] px-6">
      <div className="glass w-full max-w-xl rounded-3xl border border-white/10 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Page Error</p>
        <h2 className="mt-4 text-3xl font-bold text-white">This page could not load.</h2>
        <p className="mt-3 text-sm text-slate-400">
          Use the home page link and try the route again.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-200 transition-colors hover:border-cyan-300/40 hover:text-white"
        >
          Go To Home
        </a>
      </div>
    </div>
  )
}

function App() {
  const [isAppReady, setIsAppReady] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setIsAppReady(true)
  }, [])

  return (
    <>
      {!isAppReady && <SmoothLoader onComplete={handleLoaderComplete} minDuration={2500} />}
      <BrowserRouter>
        <ErrorBoundary fallback={null}>
          <GlobalExperience />
        </ErrorBoundary>
        <RouteViewport />
      </BrowserRouter>
    </>
  )
}

export default App
