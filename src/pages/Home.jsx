import { useEffect, Suspense, useState, useRef, useMemo } from "react"
import { motion, useScroll, useMotionValue, useTransform, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import HeroSlider from "../components/HeroSlider"
import Footer from "../components/Footer"
import products from "../data/products"

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
    const update = () => setIsParallaxEnabled(inputQuery.matches && !motionQuery.matches)
    update()
    inputQuery.addEventListener("change", update)
    motionQuery.addEventListener("change", update)
    return () => {
      inputQuery.removeEventListener("change", update)
      motionQuery.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!isParallaxEnabled) { mouseX.set(0); mouseY.set(0); return }
    const handle = (e) => { mouseX.set(e.clientX / window.innerWidth - 0.5); mouseY.set(e.clientY / window.innerHeight - 0.5) }
    window.addEventListener("pointermove", handle, { passive: true })
    return () => window.removeEventListener("pointermove", handle)
  }, [mouseX, mouseY, isParallaxEnabled])

  return (
    <motion.div className="fixed inset-0 pointer-events-none z-0" style={{ x, y }}>
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
    </motion.div>
  )
}

function GlowDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-2"
    />
  )
}

function AnimatedCounter({ target, suffix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

function StatsSection() {
  const stats = [
    { label: "Products", value: 120, suffix: "+" },
    { label: "Happy Customers", value: 500, suffix: "+" },
    { label: "Projects Done", value: 1200, suffix: "+" },
    { label: "Years Experience", value: 15, suffix: "+" },
  ]

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.08, y: -5 }}
              className="glass rounded-2xl p-6 text-center cursor-default group hover:border-cyan-500/30 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MiniProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-colors"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
        <span className="absolute top-3 left-3 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold capitalize">
          {product.category}
        </span>
        <span className="absolute top-3 right-3 px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold">
          {product.price}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{product.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{product.description}</p>
        <Link to={`/product/${product.id}`} className="block w-full py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl text-center text-cyan-400 text-sm font-semibold hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent transition-all">
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(((i + 1) * (i * 31 + 17)) % (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function TrendingProducts() {
  const trending = useMemo(() => shuffleArray(products).slice(0, 4), [])

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[200px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-10">
          <div>
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block px-4 py-2 glass rounded-full text-cyan-400 text-sm font-medium mb-3">
              Hot Picks
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Trending </span>
              <span className="gradient-text">Products</span>
            </h2>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-2 px-6 py-3 glass rounded-full text-cyan-400 hover:text-white hover:border-cyan-500/30 transition-all text-sm font-medium">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((product) => (
            <MiniProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="md:hidden text-center mt-8">
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-cyan-400 hover:text-white transition-all text-sm font-medium">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

function QuickActions() {
  const actions = [
    { label: "Browse Products", desc: "Explore our full range", to: "/products", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z", gradient: "from-cyan-500 to-blue-600" },
    { label: "Request Quote", desc: "Get a free estimate", to: "/contact", icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z", gradient: "from-purple-500 to-pink-600" },
    { label: "3D Showcase", desc: "See products in 3D", to: "/showcase", icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5", gradient: "from-emerald-500 to-teal-600" },
    { label: "Contact Us", desc: "Talk to our team", to: "/contact", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", gradient: "from-amber-500 to-orange-600" },
  ]

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-white">Quick </span>
            <span className="gradient-text">Actions</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">Jump straight to what you need</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <Link to={action.to} className="glass rounded-2xl p-6 block group hover:border-cyan-500/30 transition-colors text-center">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-1">{action.label}</h3>
                <p className="text-gray-500 text-sm">{action.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const points = [
    { title: "Premium Quality", desc: "Aerospace-grade aluminium and double-glazed glass for lasting performance.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    { title: "Affordable Pricing", desc: "Factory-direct rates with no middlemen. Best value guaranteed.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Fast Delivery", desc: "15-20 business days from order to installation. On-time, every time.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { title: "10-Year Warranty", desc: "Complete peace of mind with our industry-leading warranty coverage.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { title: "Expert Installation", desc: "Certified technicians ensure perfect fit and finish every time.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { title: "24/7 Support", desc: "Our customer service team is always available to help with any queries.", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[200px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-white">Why Choose </span>
            <span className="gradient-text">Us</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">We deliver excellence at every step</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass rounded-2xl p-6 group hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={point.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{point.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RecentlyViewed() {
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dw_recently_viewed") || "[]")
    } catch { return [] }
  })

  if (recent.length === 0) return null

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-10">
          <div>
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block px-4 py-2 glass rounded-full text-cyan-400 text-sm font-medium mb-3">
              Just For You
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Recently </span>
              <span className="gradient-text">Viewed</span>
            </h2>
          </div>
          <button
            onClick={() => { localStorage.removeItem("dw_recently_viewed"); setRecent([]) }}
            className="hidden md:block px-4 py-2 glass rounded-full text-gray-400 hover:text-white text-sm transition-colors"
          >
            Clear History
          </button>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recent.slice(0, 4).map((product) => (
            <MiniProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FloatingCartIcon() {
  const [count] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        to="/products"
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-110 transition-all group"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            {count}
          </span>
        )}
        <div className="absolute right-full mr-3 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Browse Products
        </div>
      </Link>
    </motion.div>
  )
}

function LiveNotification() {
  const [msg, setMsg] = useState("")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const notifications = [
      "🔥 Someone from Mumbai just viewed Casement Windows",
      "⭐ Sliding Door got a 5-star review",
      "🏠 Bay Windows installed in Delhi today",
      "🔥 Someone from Bangalore is viewing Products",
      "💎 Premium French Door just got ordered",
      "🎉 500+ happy customers and counting",
      "🔨 New batch of Skylight Windows just arrived",
      "⭐ Someone gave a 5-star testimonial",
    ]

    const show = () => {
      const random = notifications[Math.floor(Math.random() * notifications.length)]
      setMsg(random)
      setVisible(true)
      setTimeout(() => setVisible(false), 4000)
    }
    const timer = setTimeout(show, 5000)
    const interval = setInterval(show, 12000)
    return () => { clearTimeout(timer); clearInterval(interval) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: -50 }}
      animate={visible ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-6 left-6 z-50 max-w-xs"
    >
      <div className="glass rounded-2xl px-5 py-3 border border-white/10 shadow-xl">
        <p className="text-white text-sm font-medium">{msg}</p>
      </div>
    </motion.div>
  )
}

function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="min-h-screen bg-[#030712]">
        <ParallaxBackground />
        <ScrollProgress />
        <Navbar />
        <HeroSlider />
        <GlowDivider />
        <StatsSection />
        <GlowDivider />
        <TrendingProducts />
        <QuickActions />
        <GlowDivider />
        <WhyChooseUs />
        <RecentlyViewed />
        <GlowDivider />
        <Footer />
        <FloatingCartIcon />
        <LiveNotification />
      </div>
    </Suspense>
  )
}

export default Home
