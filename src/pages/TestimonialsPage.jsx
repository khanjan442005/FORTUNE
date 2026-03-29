import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import PageHero from "../components/PageHero"
import PageShell from "../components/PageShell"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import { sectionIds, sectionLinks } from "../data/sectionLinks"

const highlights = [
  { title: "Professional Installation", desc: "Every project is handled by our certified installation team who ensure perfect fitting and finish.", author: "Multiple Clients" },
  { title: "Responsive Customer Support", desc: "From first inquiry to post-installation, the team stays available and responsive at every step.", author: "Multiple Clients" },
  { title: "Value for Money", desc: "Premium quality at competitive pricing. The products deliver long-term value that justifies the investment.", author: "Multiple Clients" },
]

const trustMetrics = [
  { value: "4.9/5", label: "Google Rating", sublabel: "Based on 350+ reviews" },
  { value: "98%", label: "Would Recommend", sublabel: "To friends & family" },
  { value: "95%", label: "On-time Delivery", sublabel: "Projects completed on schedule" },
  { value: "10+", label: "Industry Awards", sublabel: "For quality & design" },
]

function TestimonialsPage({ embedded = false }) {
  const content = (
    <div className={embedded ? "" : "pt-20"}>
        <PageHero
          badge="Testimonials"
          title="What Our"
          titleAccent="Clients Say"
          description="Don't just take our word for it. Hear from hundreds of satisfied homeowners, architects, and developers who chose Dynamic Windows."
          stats={[
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" },
            { value: "500+", label: "Happy Customers" },
          ]}
        />

          <Testimonials />

          {/* Trust Metrics */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {trustMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="fx-panel rounded-2xl p-6 text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{metric.value}</div>
                    <div className="text-white font-semibold mb-1">{metric.label}</div>
                    <div className="text-sm text-gray-500">{metric.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Review Highlights */}
          <section className="py-20 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[200px]"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">What Clients </span><span className="gradient-text">Love Most</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">Common themes from our customer feedback that we take pride in.</p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-8">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="fx-panel rounded-2xl p-8 group"
                  >
                    <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{item.desc}</p>
                    <p className="text-sm text-cyan-400">&mdash; {item.author}</p>
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join 500+ Happy Customers</h2>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">Experience the same quality and service that our customers rave about. Start your project today.</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to={sectionLinks.contact} className="neon-button"><span>Get Started</span></Link>
                    <Link to={sectionLinks.gallery} className="outline-button"><span>See Our Work</span></Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

      </div>
  )

  if (embedded) {
    return (
      <section
        id={sectionIds.testimonials}
        className="relative min-h-screen scroll-mt-28 py-6 md:scroll-mt-32 md:py-10"
      >
        {content}
      </section>
    )
  }

  return (
    <PageShell tone="violet">
      <Navbar />
      {content}
      <Footer />
    </PageShell>
  )
}

export default TestimonialsPage
