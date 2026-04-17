import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { routeSectionIds, sectionLinks } from "../data/sectionLinks"

const navItems = [
  { name: "Home", to: sectionLinks.home, hash: `#${routeSectionIds["/"]}` },
  { name: "Products", to: sectionLinks.products, hash: `#${routeSectionIds["/products"]}` },
  { name: "Gallery", to: sectionLinks.gallery, hash: `#${routeSectionIds["/gallery"]}` },
  { name: "About", to: sectionLinks.about, hash: `#${routeSectionIds["/about"]}` },
  { name: "Contact", to: sectionLinks.contact, hash: `#${routeSectionIds["/contact"]}` },
]

function resolveActiveHash(pathname, hash) {
  if (pathname.startsWith("/product/")) {
    return `#${routeSectionIds["/products"]}`
  }

  const routeSectionId = routeSectionIds[pathname]
  if (routeSectionId) {
    return pathname === "/" ? hash || `#${routeSectionIds["/"]}` : `#${routeSectionId}`
  }

  return hash || `#${routeSectionIds["/"]}`
}

function isNavItemActive(pathname, hash, itemHash) {
  return resolveActiveHash(pathname, hash) === itemHash
}

function DesktopNavItem({ item, isActive }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2, type: "spring", stiffness: 300 }}>
      <Link
        to={item.to}
        aria-current={isActive ? "page" : undefined}
        className={`relative inline-flex h-12 items-center justify-center px-4 text-sm font-medium transition-all duration-300 nav-link-hover ${
          isActive
            ? "text-blue-100 [text-shadow:0_0_16px_rgba(96,165,250,0.45)]"
            : "text-white/[0.66] hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.12)]"
        }`}
      >
        <span className="whitespace-nowrap">{item.name}</span>
        {isActive && (
          <motion.div
            layoutId="navbar-active"
            className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 to-amber-400 rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  )
}

function MobileNavItem({ item, isActive, onNavigate }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        to={item.to}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        className={`flex items-center rounded-[0.95rem] px-3 py-2.5 text-sm transition-all duration-300 interact-press ${
          isActive
            ? "bg-white/[0.05] text-blue-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_18px_rgba(59,130,246,0.08)]"
            : "text-white/[0.68] hover:bg-white/[0.04] hover:text-white"
        }`}
      >
        <span>{item.name}</span>
        {isActive && (
          <motion.div
            className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </Link>
    </motion.div>
  )
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-1rem)] max-w-[1380px] -translate-x-1/2 md:top-5 md:w-[calc(100%-2rem)]">
      <motion.div
        style={{
          background:
            "linear-gradient(135deg, rgba(7,14,27,0.92), rgba(255,255,255,0.05) 46%, rgba(7,14,27,0.82))",
          boxShadow:
            "0 28px 70px rgba(3, 8, 20, 0.42), 0 10px 26px rgba(59,130,246,0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
        }}
        className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.08]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_24%)]" />
        <div className="pointer-events-none absolute -left-8 top-2 h-16 w-24 rounded-full bg-blue-300/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -right-8 bottom-0 h-20 w-28 rounded-full bg-amber-400/[0.08] blur-3xl" />

        <div className="relative flex items-center gap-4 px-4 py-3.5 md:px-5">
          <div className="shrink-0 rounded-[1.05rem] bg-white/[0.04] px-3.5 py-2.5 shadow-[0_10px_24px_rgba(2,8,23,0.16),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <Link to={sectionLinks.home} aria-label="Go to home section">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black text-white">
                  FT
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-sky-500 to-amber-400 bg-clip-text text-lg font-bold text-transparent">
                  FORTUNE
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="px-4 py-1">
              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <DesktopNavItem
                    key={item.to}
                    item={item}
                    isActive={isNavItemActive(pathname, hash, item.hash)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center lg:hidden">
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white/[0.05] text-white/[0.86] shadow-[0_10px_24px_rgba(2,8,23,0.14),inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-300 hover:bg-white/[0.08]"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              <div className="flex w-5 flex-col gap-1.5">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.22 }}
                  className="block h-0.5 w-full rounded-full bg-current"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.18 }}
                  className="block h-0.5 w-full rounded-full bg-current"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.22 }}
                  className="block h-0.5 w-full rounded-full bg-current"
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="relative px-3 pb-3 pt-1 lg:hidden"
            >
              <div className="grid gap-2 rounded-[0.95rem] bg-white/[0.03] px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                {navItems.map((item) => (
                  <MobileNavItem
                    key={item.to}
                    item={item}
                    isActive={isNavItemActive(pathname, hash, item.hash)}
                    onNavigate={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  )
}

export default Navbar
