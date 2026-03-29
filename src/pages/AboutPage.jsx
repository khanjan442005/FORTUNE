import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import PageHero from "../components/PageHero"
import PageShell from "../components/PageShell"
import About from "../components/About"
import Footer from "../components/Footer"

const coreValues = [
  { title: "Innovation", desc: "We continuously push boundaries with smart technology, modern designs, and sustainable materials.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "Quality", desc: "Every product passes through rigorous quality checks to ensure it meets the highest global standards.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { title: "Sustainability", desc: "100% recyclable materials and energy-efficient production reflect our commitment to the environment.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Customer First", desc: "From consultation to post-installation support, we prioritize your satisfaction at every step.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
]

const teamMembers = [
  { name: "Rajesh Mehta", role: "Founder & CEO", desc: "20+ years in architectural solutions" },
  { name: "Priya Desai", role: "Head of Design", desc: "Former lead architect at top firms" },
  { name: "Amit Shah", role: "Technical Director", desc: "Expert in thermal & acoustic engineering" },
  { name: "Sneha Patel", role: "Operations Manager", desc: "15+ years in manufacturing excellence" },
]

const milestones = [
  { year: "2010", event: "Company Founded", detail: "Started with a small team and big dreams in Ahmedabad." },
  { year: "2013", event: "First Major Project", detail: "Completed 200+ window installation for a luxury residential complex." },
  { year: "2016", event: "National Expansion", detail: "Expanded operations to 5 major cities across India." },
  { year: "2019", event: "Smart Windows Launch", detail: "Introduced IoT-enabled smart window solutions." },
  { year: "2022", event: "1000th Project", detail: "Celebrated completing our 1000th successful project." },
  { year: "2025", event: "Industry Leader", detail: "Recognized as India's leading premium window manufacturer." },
]

function AboutPage() {
  return (
    <PageShell tone="violet">
      <Navbar />
      <div className="pt-20">
        <PageHero
          badge="About Us"
          title="Crafting"
          titleAccent="Excellence"
          description="Since 2010, Dynamic Windows has been transforming spaces with premium windows and doors that blend innovation, quality, and timeless design."
          stats={[
            { value: "2010", label: "Company Founded" },
            { value: "1000+", label: "Projects Milestone" },
            { value: "15+", label: "Years of Growth" },
          ]}
        />

          <About />

          {/* Core Values */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Our Core </span><span className="gradient-text">Values</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">The principles that guide everything we do.</p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="fx-panel rounded-2xl p-8 group"
                  >
                    <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={value.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-20 relative">
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[200px]"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Our </span><span className="gradient-text">Journey</span>
                </h2>
              </motion.div>
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-purple-500/50 hidden lg:block"></div>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex flex-col lg:flex-row items-center gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                      <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                        <div className="fx-panel rounded-2xl p-6 inline-block">
                          <div className="text-cyan-400 font-bold text-lg mb-1">{milestone.year}</div>
                          <h3 className="text-white font-bold text-lg mb-2">{milestone.event}</h3>
                          <p className="text-gray-400 text-sm">{milestone.detail}</p>
                        </div>
                      </div>
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-[#030712] z-10 hidden lg:block"></div>
                      <div className="flex-1"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Meet the </span><span className="gradient-text">Team</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">The passionate professionals driving Dynamic Windows forward.</p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="fx-panel rounded-2xl p-8 text-center group"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-cyan-400 text-sm mb-2">{member.role}</p>
                    <p className="text-gray-500 text-sm">{member.desc}</p>
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Work With Us?</h2>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">Let's discuss your project and create something extraordinary together.</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/contact" className="neon-button"><span>Get in Touch</span></Link>
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

export default AboutPage
