import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    products: [
      "Sliding Windows",
      "Casement Windows",
      "Bay Windows",
      "Tilt & Turn",
      "UPVC Windows",
      "Glass Doors"
    ],
    company: [
      "About Us",
      "Our Team",
      "Careers",
      "News",
      "Blog",
      "Contact"
    ],
    support: [
      "FAQ",
      "Warranty",
      "Maintenance",
      "Installation",
      "Shipping",
      "Returns"
    ]
  }

  const socialLinks = [
    { name: "Facebook", icon: "📘", color: "hover:bg-blue-600" },
    { name: "Instagram", icon: "📸", color: "hover:bg-pink-600" },
    { name: "Twitter", icon: "🐦", color: "hover:bg-sky-500" },
    { name: "LinkedIn", icon: "💼", color: "hover:bg-blue-700" },
    { name: "YouTube", icon: "📺", color: "hover:bg-red-600" }
  ]

  return (
    <footer className="bg-[#020712] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-background opacity-10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10 pt-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative w-12 h-12"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-md opacity-50"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center border border-cyan-400/30">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-white">Dynamic</span>
                  <span className="gradient-text ml-1">Windows</span>
                </h1>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-sm">
              Premium windows and doors crafted with precision and designed for excellence. 
              Transform your space with our cutting-edge solutions.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Subscribe to Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 input-glow py-3"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold"
                >
                  →
                </motion.button>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 glass rounded-xl flex items-center justify-center text-lg ${social.color} transition-colors`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="text-white font-bold mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a href="#products" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link === "Contact" ? "#contact" : "#about"} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Dynamic Windows. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <motion.a
        href="#"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 z-50"
      >
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.a>
    </footer>
  )
}

export default Footer
