import { useState } from "react"
import { motion } from "framer-motion"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", service: "", message: "" })
      alert("Thank you! We'll contact you soon.")
    }, 2000)
  }

  const inputFields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", icon: "👤" },
    { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com", icon: "✉️" },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", icon: "📞" }
  ]

  const services = [
    "New Installation",
    "Replacement",
    "Repair & Maintenance",
    "Custom Design",
    "Consultation"
  ]

  return (
    <section id="contact" className="min-h-screen py-24 bg-[#030712] relative overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gray-500/10 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 glass rounded-full text-cyan-400 text-sm font-medium mb-4"
          >
            Get In Touch
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Let's </span>
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to transform your space? Contact us for a free consultation and quote
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                { icon: "📍", title: "Visit Us", desc: "123 Business Park, Suite 100", subdesc: "Ahmedabad, Gujarat 380001" },
                { icon: "📞", title: "Call Us", desc: "+91 98765 43210", subdesc: "Mon - Sat: 9AM - 7PM" },
                { icon: "✉️", title: "Email Us", desc: "info@dynamicwindows.com", subdesc: "We reply within 24 hours" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="glass rounded-2xl p-6 flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-cyan-400">{item.desc}</p>
                    <p className="text-gray-500 text-sm">{item.subdesc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { name: "Facebook", icon: "📘" },
                  { name: "Instagram", icon: "📸" },
                  { name: "Twitter", icon: "🐦" },
                  { name: "LinkedIn", icon: "💼" },
                  { name: "YouTube", icon: "📺" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center text-xl hover:bg-cyan-500/20 transition-colors"
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
              {/* Input Fields */}
              <div className="grid md:grid-cols-3 gap-4">
                {inputFields.map((field) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm text-gray-400 mb-2">{field.label}</label>
                    <div className="relative">
                      <input
                        type={field.type}
                        value={formData[field.id]}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.placeholder}
                        className={`input-glow ${focusedField === field.id ? 'border-cyan-500' : ''}`}
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg opacity-50">
                        {field.icon}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Service Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm text-gray-400 mb-2">Service Interested In</label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    onFocus={() => setFocusedField("service")}
                    onBlur={() => setFocusedField(null)}
                    className={`input-glow appearance-none cursor-pointer ${focusedField === "service" ? 'border-cyan-500' : ''}`}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-slate-800">
                        {service}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </motion.div>
              
              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className={`input-glow resize-none ${focusedField === "message" ? 'border-cyan-500' : ''}`}
                    required
                  />
                </div>
              </motion.div>
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitted}
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0, 240, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className={`w-full neon-button ${isSubmitted ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitted ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
