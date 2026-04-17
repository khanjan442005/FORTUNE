import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import PageHero from "../components/PageHero"
import PageShell from "../components/PageShell"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import { sectionIds } from "../data/sectionLinks"

const faqs = [
  { q: "How long does installation take?", a: "Most residential installations are completed within 1-3 days depending on the number of windows and doors. Commercial projects are scheduled based on scope and complexity." },
  { q: "Do you offer a warranty on products?", a: "Yes, all our products come with a comprehensive 10-year warranty covering manufacturing defects, hardware, and glass seal failures." },
  { q: "Can I customize the window/door sizes?", a: "Absolutely! All our products are made-to-measure. We take precise measurements at your site and manufacture to your exact specifications." },
  { q: "What areas do you serve?", a: "We serve clients across India with showrooms in Ahmedabad, Mumbai, Delhi, Bangalore, and Hyderabad. For remote locations, we coordinate installation teams." },
  { q: "Do you provide free quotations?", a: "Yes, we provide free, no-obligation quotations. Simply fill out the contact form or call us to schedule a site visit and consultation." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, UPI, credit/debit cards, and also offer EMI options through our financing partners for larger projects." },
]

function ContactPage({ embedded = false }) {
  const content = (
    <div className={embedded ? "" : "pt-20"}>
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
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-blue-400 font-medium mb-1">{card.detail}</p>
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
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-500/10 to-amber-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
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
                      className="mt-4 inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-blue-400 hover:text-white transition-colors text-sm font-medium"
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

      </div>
  )

  if (embedded) {
    return (
      <section
        id={sectionIds.contact}
        className="relative min-h-screen scroll-mt-28 py-6 md:scroll-mt-32 md:py-10"
      >
        {content}
      </section>
    )
  }

  return (
    <PageShell tone="cyan">
      <Navbar />
      {content}
      <Footer />
    </PageShell>
  )
}

export default ContactPage
