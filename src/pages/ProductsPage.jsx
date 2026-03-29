import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import PageHero from "../components/PageHero"
import PageShell from "../components/PageShell"
import Products from "../components/Products"
import Footer from "../components/Footer"

const trustBadges = [
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "ISO Certified", desc: "9001:2015 Quality Management" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Quick Delivery", desc: "15-20 Business Days" },
  { icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z", label: "Fire Rated", desc: "BIS Approved Materials" },
  { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", label: "10 Year Warranty", desc: "Complete Peace of Mind" },
]

const processSteps = [
  { step: "01", title: "Consultation", desc: "Share your requirements and get a free expert consultation tailored to your space and budget." },
  { step: "02", title: "Design & Quote", desc: "Our team creates custom designs and provides a transparent, detailed quotation." },
  { step: "03", title: "Manufacturing", desc: "Precision engineering with quality-checked materials at our state-of-the-art facility." },
  { step: "04", title: "Installation", desc: "Professional installation by certified technicians with zero-hassle experience." },
]

const categories = [
  { name: "Windows", count: "12+ Types", desc: "Sliding, Casement, Bay, Tilt & Turn, Skylight and more", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { name: "Doors", count: "8+ Types", desc: "Sliding, French, Pivot, Folding, Bi-fold and more", icon: "M8 7h8m-8 4h8m-4-8v16m-4-4h8" },
  { name: "Glass Solutions", count: "6+ Options", desc: "Double Glazing, Tinted, Frosted, Laminated, Low-E", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { name: "Custom Projects", count: "Unlimited", desc: "Bespoke designs for unique architectural requirements", icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" },
]

function ProductsPage() {
  return (
    <PageShell tone="cyan">
      <Navbar />
      <div className="pt-20">
        <PageHero
          badge="Our Products"
          title="Premium"
          titleAccent="Collection"
          description="Explore our extensive range of windows and doors crafted with cutting-edge technology and premium materials for modern living spaces."
          stats={[
            { value: "20+", label: "System Types" },
            { value: "10 Year", label: "Warranty Focus" },
            { value: "Factory Direct", label: "Pricing Model" },
          ]}
        />

        {/* Trust Badges */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="fx-panel rounded-2xl p-6 text-center group"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 transition-transform group-hover:scale-110">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                    </svg>
                  </div>
                  <h3 className="mb-1 text-white font-semibold">{badge.label}</h3>
                  <p className="text-sm text-gray-500">{badge.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 relative">
          <div className="absolute inset-0 grid-background opacity-10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">Browse by </span>
                <span className="gradient-text">Category</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">Find the perfect solution for every space in your home or commercial project.</p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="fx-panel rounded-2xl p-8 group"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 transition-transform group-hover:scale-110">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                    </svg>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                    <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400">{cat.count}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{cat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Products />

        {/* Process Section */}
        <section className="py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[200px]"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">How It </span>
                  <span className="gradient-text">Works</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">From consultation to installation, we make the process seamless and hassle-free.</p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="fx-panel rounded-2xl p-8 h-full relative overflow-hidden group">
                      <div className="absolute -top-4 -right-4 text-8xl font-bold text-cyan-500/5 group-hover:text-cyan-500/10 transition-colors">{step.step}</div>
                      <div className="relative z-10">
                        <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                          {step.step}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                    )}
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
                className="fx-panel rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">Our team can create custom solutions tailored to your exact specifications. Get a free consultation today.</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/contact" className="neon-button">
                      <span>Get Free Quote</span>
                    </Link>
                    <Link to="/features" className="outline-button">
                      <span>View Features</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
        </section>
      </div>
      <Footer />
    </PageShell>
  )
}

export default ProductsPage
