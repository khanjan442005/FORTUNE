import { Suspense, lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import GlobalExperience from './components/GlobalExperience'
import { sectionLinks } from './data/sectionLinks'

const Home = lazy(() => import('./pages/Home'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

function LoadingFallback() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-6">
      <div className="absolute inset-0 grid-background opacity-20" />
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-[170px]" />
      <div className="glass-strong relative w-full max-w-md rounded-[2rem] border border-white/10 p-8 text-center shadow-[0_24px_80px_rgba(2,8,23,0.36)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 text-xl font-black text-white">
          FT
        </div>
        <p className="mt-5 text-sm uppercase tracking-[0.28em] text-blue-200/75">
          Loading Space
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white">Preparing the next scene</h2>
        <div className="mt-6 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-amber-400" />
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Smooth transitions, motion layers, and interactive details are loading.
        </p>
      </div>
    </div>
  )
}

function RouteViewport() {
  const location = useLocation()

  return (
    <ErrorBoundary fallback={<RouteFallback />}>
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
    </ErrorBoundary>
  )
}

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07111f] px-6">
      <div className="glass w-full max-w-xl rounded-3xl border border-white/10 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-blue-300/80">Page Error</p>
        <h2 className="mt-4 text-3xl font-bold text-white">This page could not load.</h2>
        <p className="mt-3 text-sm text-slate-400">
          Use the home page link and try the route again.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-5 py-2 text-sm font-medium text-blue-200 transition-colors hover:border-blue-300/40 hover:text-white"
        >
          Go To Home
        </a>
      </div>
    </div>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="always">
      <BrowserRouter>
        <ErrorBoundary fallback={null}>
          <GlobalExperience />
        </ErrorBoundary>
        <RouteViewport />
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
