import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import PageHero from "../components/PageHero"
import PageShell from "../components/PageShell"
import Features from "../components/Features"
import Footer from "../components/Footer"

const certifications = [
  { name: "ISO 9001", desc: "Quality Management System" },
  { name: "BIS Certified", desc: "Bureau of Indian Standards" },
  { name: "IGBC Green", desc: "Green Building Council" },
  { name: "CE Marked", desc: "European Conformity" },
]

const techSpecs = [
  { label: "Frame Material", value: "Aerospace Grade Aluminium" },
  { label: "Glass Type", value: "Double/Triple Glazed Low-E" },
  { label: "Thermal U-Value", value: "1.1 W/m²K" },
  { label: "Sound Reduction", value: "Up to 42 dB" },
  { label: "Air Tightness", value: "Class 4 (EN 12207)" },
  { label: "Water Tightness", value: "Class E1050 (EN 12208)" },
  { label: "Wind Resistance", value: "Class C5/B5 (EN 12210)" },
  { label: "Burglary Resistance", value: "RC2 / RC3 (EN 1627)" },
]

const processHighlights = [
  { title: "Rigorous Testing", desc: "Every product undergoes 50+ quality checks before leaving our facility." },
  { title: "Premium Materials", desc: "We source only the highest-grade aluminium, UPVC, and glass from trusted suppliers." },
  { title: "Precision Engineering", desc: "CNC machining ensures tolerances within 0.1mm for perfect fitting." },
  { title: "Eco-Friendly", desc: "100% recyclable materials and energy-efficient production processes." },
]

function FeaturesPage() {
  return (
    <PageShell tone="violet">
      <Navbar />
      <div className="pt-20">
        <PageHero
          badge="Why Choose Us"
          title="Premium"
          titleAccent="Features"
          description="Our windows and doors come packed with advanced features for superior performance, aesthetics, and lasting durability."
          stats={[
            { value: "42 dB", label: "Acoustic Shielding" },
            { value: "1.1 U", label: "Thermal U-Value" },
            { value: "C5/B5", label: "Wind Resistance" },
          ]}
        />

        <Features />

          {/* Technical Specifications */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Technical </span><span className="gradient-text">Specifications</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">Industry-leading performance metrics that set our products apart.</p>
              </motion.div>
              <div className="fx-panel rounded-3xl overflow-hidden">
                {techSpecs.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center justify-between px-8 py-5 ${index !== techSpecs.length - 1 ? 'border-b border-white/5' : ''}`}
                  >
                    <span className="text-gray-400">{spec.label}</span>
                    <span className="text-white font-semibold">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Quality Process */}
          <section className="py-20 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[200px]"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Our Quality </span><span className="gradient-text">Promise</span>
                </h2>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-6">
                {processHighlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="fx-panel rounded-2xl p-8 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Certifications & </span><span className="gradient-text">Standards</span>
                </h2>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="fx-panel rounded-2xl p-6 text-center group"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-500">{cert.desc}</p>
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience the Quality Difference</h2>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">Visit our showroom or schedule a free consultation to see our premium features firsthand.</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/contact" className="neon-button"><span>Schedule a Visit</span></Link>
                    <Link to="/products" className="outline-button"><span>View Products</span></Link>
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

export default FeaturesPage
