import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DarkModeProvider } from './context/DarkModeContext'

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

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </DarkModeProvider>
  )
}

export default App
