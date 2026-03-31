import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import HeroSlider from "../components/HeroSlider"
import Footer from "../components/Footer"
import PageShell from "../components/PageShell"
import products from "../data/products"
import { sectionIds, sectionLinks } from "../data/sectionLinks"
import { RevealOnScroll, StaggerReveal } from "../components/RevealOnScroll"
import TiltCard from "../components/TiltCard"
import GlowCard from "../components/GlowCard"
import { ParallaxLayer } from "../components/ParallaxLayer"
import ProductsPage from "./ProductsPage"
import FeaturesPage from "./FeaturesPage"
import TestimonialsPage from "./TestimonialsPage"
import GalleryPage from "./GalleryPage"
import AboutPage from "./AboutPage"
import ContactPage from "./ContactPage"

function GlowDivider() {
  return (
    <RevealOnScroll variant="fadeScale" duration={1}>
      <div className="relative py-2">
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500/50"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring" }}
          style={{ boxShadow: '0 0 20px rgba(34,211,238,0.4)' }}
        />
      </div>
    </RevealOnScroll>
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
    <section className="relative py-20 md:py-24">
      <div className="container mx-auto px-6">
        <StaggerReveal staggerDelay={0.12} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <GlowCard
              key={index}
              className="glass rounded-2xl p-6 text-center cursor-default hover-lift hover-glow"
              glowColor="rgba(34, 211, 238, 0.08)"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              >
                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            </GlowCard>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}

function MiniProductCard({ product }) {
  return (
    <TiltCard tiltMax={8} scale={1.02} className="h-full">
      <RevealOnScroll variant="fadeUp" className="h-full">
        <div className="glass rounded-2xl overflow-hidden group hover-lift hover-glow hover-shine h-full flex flex-col">
          <div className="relative h-48 overflow-hidden hover-img-zoom">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
            <motion.span
              className="absolute top-3 left-3 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold capitalize"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {product.category}
            </motion.span>
            <motion.span
              className="absolute top-3 right-3 px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {product.price}
            </motion.span>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{product.name}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
            <Link
              to={`/product/${product.id}`}
              className="block w-full py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl text-center text-cyan-400 text-sm font-semibold hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent transition-all interact-press"
            >
              View Details
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </TiltCard>
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
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 grid-background opacity-10"></div>
      <ParallaxLayer speed={0.15} className="absolute top-0 right-0 w-96 h-96 pointer-events-none">
        <div className="w-full h-full bg-cyan-500/10 rounded-full blur-[200px]"></div>
      </ParallaxLayer>
      <div className="container mx-auto px-6 relative z-10">
        <RevealOnScroll variant="fadeUp" className="flex items-center justify-between mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 glass rounded-full text-cyan-400 text-sm font-medium mb-3 hover-glow"
            >
              Hot Picks
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Trending </span>
              <span className="gradient-text">Products</span>
            </h2>
          </div>
          <Link to={sectionLinks.products} className="hidden md:flex items-center gap-2 px-6 py-3 glass rounded-full text-cyan-400 hover:text-white hover:border-cyan-500/30 transition-all text-sm font-medium hover-lift">
            View All
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 5 }}
              transition={{ type: "spring" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((product) => (
            <MiniProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="md:hidden text-center mt-8">
          <Link to={sectionLinks.products} className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-cyan-400 hover:text-white transition-all text-sm font-medium hover-lift interact-press">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

function QuickActions() {
  const actions = [
    { label: "Browse Products", desc: "Explore our full range", to: sectionLinks.products, icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z", gradient: "from-cyan-500 to-blue-600" },
    { label: "Request Quote", desc: "Get a free estimate", to: sectionLinks.contact, icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z", gradient: "from-purple-500 to-pink-600" },
    { label: "Our Features", desc: "See what we offer", to: sectionLinks.features, icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z", gradient: "from-emerald-500 to-teal-600" },
    { label: "Contact Us", desc: "Talk to our team", to: sectionLinks.contact, icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", gradient: "from-amber-500 to-orange-600" },
  ]

  return (
    <section className="relative py-20 md:py-24">
      <div className="container mx-auto px-6">
        <RevealOnScroll variant="fadeUp" className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-white">Quick </span>
            <span className="gradient-text">Actions</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">Jump straight to what you need</p>
        </RevealOnScroll>
        <StaggerReveal staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <TiltCard key={index} tiltMax={6} scale={1.03}>
              <Link to={action.to} className="glass rounded-2xl p-6 block group hover-glow hover-lift text-center tilt-shine">
                <motion.div
                  className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform icon-glow`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-white font-bold mb-1 group-hover:text-cyan-400 transition-colors">{action.label}</h3>
                <p className="text-gray-500 text-sm">{action.desc}</p>
              </Link>
            </TiltCard>
          ))}
        </StaggerReveal>
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
    <section className="relative overflow-hidden py-20 md:py-24">
      <ParallaxLayer speed={0.1} className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none">
        <div className="w-full h-full bg-purple-500/10 rounded-full blur-[200px]"></div>
      </ParallaxLayer>
      <div className="container mx-auto px-6 relative z-10">
        <RevealOnScroll variant="fadeUp" className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-white">Why Choose </span>
            <span className="gradient-text">Us</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">We deliver excellence at every step</p>
        </RevealOnScroll>
        <StaggerReveal staggerDelay={0.08} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <GlowCard
              key={index}
              className="glass rounded-2xl p-6 group hover-lift"
              glowColor="rgba(34, 211, 238, 0.06)"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={point.icon} />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{point.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </GlowCard>
          ))}
        </StaggerReveal>
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
    <section className="relative py-20 md:py-24">
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
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6"
    >
      <Link
        to={sectionLinks.products}
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-110 transition-all group btn-glow-cyan"
      >
        <motion.svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          whileHover={{ y: -2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </motion.svg>
        {count > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-white text-xs flex items-center justify-center font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {count}
          </motion.span>
        )}
        <div className="absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity pointer-events-none group-hover:opacity-100 md:block">
          Browse Products
        </div>
      </Link>
    </motion.div>
  )
}


function Home() {
  return (
    <PageShell tone="cyan">
      <Navbar />
      <section
        id={sectionIds.home}
        className="relative scroll-mt-28 md:scroll-mt-32"
      >
        <HeroSlider />
        <GlowDivider />
        <StatsSection />
        <GlowDivider />
        <TrendingProducts />
        <RecentlyViewed />
      </section>
      <GlowDivider />
      <ProductsPage embedded />
      <GlowDivider />
      <FeaturesPage embedded />
      <GlowDivider />
      <TestimonialsPage embedded />
      <GlowDivider />
      <GalleryPage embedded />
      <GlowDivider />
      <AboutPage embedded />
      <GlowDivider />
      <ContactPage embedded />
      <GlowDivider />
      <Footer />
      <FloatingCartIcon />
    </PageShell>
  )
}

export default Home
