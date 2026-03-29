import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import PageHero from "../components/PageHero"
import PageShell from "../components/PageShell"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

const faqs = [
  { q: "How long does installation take?", a: "Most residential installations are completed within 1-3 days depending on the number of windows and doors. Commercial projects are scheduled based on scope and complexity." },
  { q: "Do you offer a warranty on products?", a: "Yes, all our products come with a comprehensive 10-year warranty covering manufacturing defects, hardware, and glass seal failures." },
  { q: "Can I customize the window/door sizes?", a: "Absolutely! All our products are made-to-measure. We take precise measurements at your site and manufacture to your exact specifications." },
  { q: "What areas do you serve?", a: "We serve clients across India with showrooms in Ahmedabad, Mumbai, Delhi, Bangalore, and Hyderabad. For remote locations, we coordinate installation teams." },
  { q: "Do you provide free quotations?", a: "Yes, we provide free, no-obligation quotations. Simply fill out the contact form or call us to schedule a site visit and consultation." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, UPI, credit/debit cards, and also offer EMI options through our financing partners for larger projects." },
]

const socialLinks = [
  { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { name: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "YouTube", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
]

function ContactPage() {
  return (
    <PageShell tone="cyan">
      <Navbar />
      <div className="pt-20">
        <PageHero
          badge="Contact Us"
          title="Let's Get In"
          titleAccent="Touch"
          description="Ready to transform your space? Whether you have a question, need a quote, or want to visit our showroom, we're here to help."
          stats={[
            { value: "24 hrs", label: "Response Window" },
            { value: "5 Cities", label: "Showroom Network" },
            { value: "Free Quote", label: "Consultation Promise" },
          ]}
        />

          {/* Quick Contact Cards */}
          <section className="py-16 relative">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Call Us", detail: "+91 98765 43210", sub: "Mon-Sat: 9AM-7PM", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                  { title: "Email Us", detail: "info@dynamicwindows.com", sub: "Replies within 24 hours", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                  { title: "Visit Us", detail: "123 Business Park, Ahmedabad", sub: "Gujarat 380001, India", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="fx-panel rounded-2xl p-8 text-center group"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-cyan-400 font-medium mb-1">{card.detail}</p>
                    <p className="text-sm text-gray-500">{card.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Contact />

          {/* Map Placeholder */}
          <section className="py-16 relative">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fx-panel rounded-3xl overflow-hidden"
              >
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Visit Our Showroom</h3>
                    <p className="text-gray-400">123 Business Park, Suite 100, Ahmedabad, Gujarat 380001</p>
                    <a
                      href="https://maps.google.com/?q=123 Business Park, Ahmedabad"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-cyan-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      <span>Open in Google Maps</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Frequently Asked </span><span className="gradient-text">Questions</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">Quick answers to the most common questions our clients ask.</p>
              </motion.div>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="fx-panel rounded-2xl p-6 group"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section className="py-16 relative">
            <div className="container mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Follow Us</h2>
                <p className="text-gray-400">Stay updated with our latest projects and designs</p>
              </motion.div>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    href="#"
                    className="fx-panel flex h-14 w-14 items-center justify-center rounded-xl text-gray-400 transition-all hover:text-cyan-400"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Prefer a Call Back?</h2>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">Leave your number and our team will call you back within 24 hours to discuss your project.</p>
                  <Link to="/contact" className="neon-button"><span>Request Call Back</span></Link>
                </div>
              </motion.div>
            </div>
          </section>

      </div>
      <Footer />
    </PageShell>
  )
}

export default ContactPage
