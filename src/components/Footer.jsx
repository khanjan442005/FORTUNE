import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RevealOnScroll } from "./RevealOnScroll";

const footerLinks = {
  products: [
    { label: "Sliding Windows", to: "/products" },
    { label: "Casement Windows", to: "/products" },
    { label: "Bay Windows", to: "/products" },
    { label: "Tilt & Turn", to: "/products" },
    { label: "UPVC Windows", to: "/products" },
    { label: "Glass Doors", to: "/products" },
  ],
  company: [
    { label: "About Us", to: "/about" },
    { label: "Our Team", to: "/about" },
    { label: "Careers", to: "/contact" },
    { label: "Project Gallery", to: "/gallery" },
    { label: "Testimonials", to: "/testimonials" },
    { label: "Contact", to: "/contact" },
  ],
  support: [
    { label: "FAQ", to: "/contact" },
    { label: "Warranty", to: "/features" },
    { label: "Maintenance", to: "/contact" },
    { label: "Installation", to: "/features" },
    { label: "Shipping", to: "/contact" },
    { label: "Returns", to: "/contact" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    to: "/contact",
    color: "hover:bg-blue-600/20",
    path: "M13.5 21v-7h2.3l.4-3H13.5V9.4c0-.9.3-1.4 1.5-1.4h1.3V5.3c-.6-.1-1.3-.1-2-.1-2 0-3.4 1.2-3.4 3.6V11H8.7v3h2.2v7h2.6Z",
  },
  {
    name: "Instagram",
    to: "/gallery",
    color: "hover:bg-pink-600/20",
    path: "M12 7.1A4.9 4.9 0 1 0 12 17a4.9 4.9 0 0 0 0-9.9Zm0 8A3.1 3.1 0 1 1 12 9a3.1 3.1 0 0 1 0 6.2Zm6.2-8.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Zm3 1.1c-.1-1.4-.4-2.4-1-3.4a6 6 0 0 0-2.1-2.1c-1-.6-2-.9-3.4-1C13.3 1.4 12.7 1.4 12 1.4s-1.3 0-2.7.1c-1.4.1-2.4.4-3.4 1a6 6 0 0 0-2.1 2.1c-.6 1-1 2-1 3.4A44 44 0 0 0 2.7 12c0 .7 0 1.3.1 2.7.1 1.4.4 2.4 1 3.4a6 6 0 0 0 2.1 2.1c1 .6 2 .9 3.4 1A44 44 0 0 0 12 22.6c.7 0 1.3 0 2.7-.1 1.4-.1 2.4-.4 3.4-1a6 6 0 0 0 2.1-2.1c.6-1 1-2 1-3.4.1-1.4.1-2 .1-2.7s0-1.3-.1-2.7ZM19.1 18c-.2.6-.5 1.1-1 1.5-.4.4-.9.7-1.5 1-.9.3-3 .2-4.6.2s-3.7.1-4.6-.2a4.2 4.2 0 0 1-2.5-2.5c-.3-.9-.2-3-.2-4.6s-.1-3.7.2-4.6c.2-.6.5-1.1 1-1.5.4-.4.9-.7 1.5-1 .9-.3 3-.2 4.6-.2s3.7-.1 4.6.2c.6.2 1.1.5 1.5 1 .4.4.7.9 1 1.5.3.9.2 3 .2 4.6s.1 3.7-.2 4.6Z",
  },
  {
    name: "Twitter",
    to: "/testimonials",
    color: "hover:bg-sky-500/20",
    path: "M18.9 4.2c-.6.3-1.3.5-2 .6a3.4 3.4 0 0 0-5.9 2.3c0 .3 0 .5.1.8A9.7 9.7 0 0 1 4 4.9a3.4 3.4 0 0 0 1 4.6c-.5 0-1-.2-1.5-.4 0 1.6 1.1 3 2.6 3.4-.3.1-.7.1-1 .1l-.6-.1A3.4 3.4 0 0 0 7.7 15a6.8 6.8 0 0 1-4.2 1.4H3a9.6 9.6 0 0 0 5.2 1.5c6.2 0 9.6-5.1 9.6-9.6v-.4c.7-.4 1.2-.9 1.7-1.5-.6.3-1.2.5-1.8.6.6-.4 1.1-1 1.3-1.8Z",
  },
  {
    name: "LinkedIn",
    to: "/about",
    color: "hover:bg-blue-700/20",
    path: "M6.4 8.8A1.4 1.4 0 1 1 6.4 6a1.4 1.4 0 0 1 0 2.8ZM7.7 18H5V9.8h2.7V18Zm4.2-8.2c1.3 0 2.2.7 2.6 1.5h0V9.8h2.6V18h-2.6v-4.3c0-1.1-.4-1.9-1.5-1.9s-1.6.8-1.6 1.9V18H8.8V9.8h2.6v1.1c.4-.7 1.2-1.1 2.5-1.1Z",
  },
  {
    name: "YouTube",
    to: "/gallery",
    color: "hover:bg-red-600/20",
    path: "M20 8.6c-.1-.8-.7-1.4-1.5-1.6C17.2 6.7 12 6.7 12 6.7s-5.2 0-6.5.3c-.8.2-1.4.8-1.5 1.6C3.7 9.9 3.7 12 3.7 12s0 2.1.3 3.4c.1.8.7 1.4 1.5 1.6 1.3.3 6.5.3 6.5.3s5.2 0 6.5-.3c.8-.2 1.4-.8 1.5-1.6.3-1.3.3-3.4.3-3.4s0-2.1-.3-3.4ZM10.2 14.7v-5.4l4.7 2.7-4.7 2.7Z",
  },
];

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="mb-6 font-bold text-white">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <motion.li
            key={link.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={link.to} className="text-gray-400 transition-colors hover:text-cyan-400 hover-underline">
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#020712]">
      <div className="absolute inset-0 grid-background opacity-10"></div>
      <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      <div className="container relative z-10 mx-auto px-6 pt-20">
        <RevealOnScroll variant="fadeUp" className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="mb-6 flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.08, rotate: -4 }} transition={{ duration: 0.45 }} className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-50 blur-md"></div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/20">
                  <span className="text-xl font-black tracking-tight text-white">DW</span>
                </div>
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Dynamic</span>
                  <span className="gradient-text ml-1">Windows</span>
                </h2>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60">
                  Precision Crafted Openings
                </p>
              </div>
            </Link>

            <p className="mb-6 max-w-sm text-gray-400">
              Premium windows and doors crafted with precision and designed for excellence.
              Transform your space with high-performance systems that feel modern from first touch.
            </p>

            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-white">Subscribe to Newsletter</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="input-glow flex-1 py-3" />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <Link
                      to={social.to}
                      className={`fx-panel flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 ${social.color}`}
                      title={social.name}
                      aria-label={social.name}
                    >
                      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={social.path} />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <FooterLinkColumn title="Products" links={footerLinks.products} />
          <FooterLinkColumn title="Company" links={footerLinks.company} />
          <FooterLinkColumn title="Support" links={footerLinks.support} />
        </RevealOnScroll>

        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">
              Copyright {currentYear} Dynamic Windows. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <Link
                  key={link}
                  to="/contact"
                  className="text-sm text-gray-500 transition-colors hover:text-cyan-400"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to top"
        onClick={handleScrollToTop}
        initial={false}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20,
          scale: showScrollTop ? 1 : 0.96,
        }}
        whileHover={{ scale: 1.12, rotate: 5 }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`btn-glow-cyan fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full glass shadow-lg shadow-cyan-500/20 transition-[visibility] ${
          showScrollTop ? "visible pointer-events-auto" : "invisible pointer-events-none"
        }`}
      >
        <motion.svg
          className="h-6 w-6 text-cyan-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ y: showScrollTop ? [0, -3, 0] : 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </motion.svg>
      </motion.button>
    </footer>
  );
}

export default Footer;
