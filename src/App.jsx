import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import NeonCursor from './components/NeonCursor'
import ErrorBoundary from './components/ErrorBoundary'

const Home = lazy(() => import('./pages/Home'))
const Landing = lazy(() => import('./pages/Landing'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

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

function RouteStateManager() {
  const location = useLocation()

  useEffect(() => {
    const scrollToTarget = () => {
      if (!location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        return
      }

      const target = document.querySelector(location.hash)

      if (!target) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        return
      }

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    const frameId = window.requestAnimationFrame(scrollToTarget)
    return () => window.cancelAnimationFrame(frameId)
  }, [location.hash, location.pathname])

  return null
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
  return (
    <>
      <BrowserRouter>
        <RouteStateManager />
        <ErrorBoundary fallback={null}>
          <NeonCursor />
        </ErrorBoundary>
        <ErrorBoundary fallback={<RouteFallback />}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  )
}

export default App
