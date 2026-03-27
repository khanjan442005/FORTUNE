import { Suspense } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Showcase3D from "../components/Showcase3D"
import Window3D from "../components/Window3D"
import Footer from "../components/Footer"
import ErrorBoundary from "../components/ErrorBoundary"

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

const techFeatures = [
  { title: "Real-time Customization", desc: "Change frame colors, glass types, and finishes instantly in the 3D viewer.", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  { title: "Accurate Measurements", desc: "See the exact proportions of how the window or door will look in your space.", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  { title: "Material Preview", desc: "Explore aluminium, UPVC, and wood finishes with photorealistic rendering quality.", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { title: "360° Rotation", desc: "Inspect every angle of the product with smooth orbit controls and zoom capabilities.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
]

const finishes = [
  { name: "Dark Slate", color: "#1e293b" },
  { name: "Arctic White", color: "#f8fafc" },
  { name: "Bronze", color: "#92400e" },
  { name: "Charcoal", color: "#374151" },
  { name: "Rose Gold", color: "#f472b6" },
  { name: "Navy Blue", color: "#1e3a5f" },
]

function PageHero({ badge, title, titleAccent, description }) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-2 glass rounded-full text-cyan-400 text-sm font-medium mb-6">
          {badge}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">{title} </span><span className="gradient-text">{titleAccent}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {description}
        </motion.p>
      </div>
    </section>
  )
}

function ShowcasePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="min-h-screen bg-[#030712]">
        <Navbar />
        <div className="pt-20">
          <PageHero
            badge="3D Experience"
            title="Interactive"
            titleAccent="Showcase"
            description="Experience our products like never before. Customize colors, materials, and finishes in real-time with our interactive 3D viewer."
          />

          {/* Tech Features */}
          <section className="py-16 relative">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {techFeatures.map((feat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-6 group hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 3D Showcase Components */}
          <ErrorBoundary
            fallback={
              <section className="relative flex min-h-screen items-center overflow-hidden bg-[#030712] py-24">
                <div className="container relative z-10 mx-auto px-6">
                  <div className="glass mx-auto max-w-3xl rounded-[2rem] border border-white/10 p-10 text-center">
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">3D Preview Unavailable</p>
                    <h2 className="mt-4 text-4xl font-bold text-white">The interactive showcase could not load on this device.</h2>
                  </div>
                </div>
              </section>
            }
          >
            <Showcase3D />
          </ErrorBoundary>

          <Window3D />

          {/* Available Finishes */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Available </span><span className="gradient-text">Finishes</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">Choose from our wide range of premium finishes to match your interior and exterior design.</p>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {finishes.map((finish, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="glass rounded-2xl p-4 text-center group hover:border-cyan-500/30 transition-colors cursor-pointer"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 rounded-xl border border-white/10 group-hover:scale-110 transition-transform" style={{ backgroundColor: finish.color }}></div>
                    <p className="text-white text-sm font-medium">{finish.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-3xl p-12 md:p-16 text-center border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Want a Personalized Demo?</h2>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">Our design experts can walk you through the 3D configurator and help you find the perfect product for your space.</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/contact" className="neon-button"><span>Book a Demo</span></Link>
                    <Link to="/products" className="outline-button"><span>Browse Products</span></Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

        </div>
        <Footer />
      </div>
    </Suspense>
  )
}

export default ShowcasePage
