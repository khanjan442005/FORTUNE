import { useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import Logo3D from "./Logo3D"

const navItems = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  { name: "Features", to: "/features" },
  { name: "Testimonials", to: "/testimonials" },
  { name: "Gallery", to: "/gallery" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
]

function isNavItemActive(pathname, itemPath) {
  if (itemPath === "/products") {
    return pathname === "/products" || pathname.startsWith("/product/")
  }

  return pathname === itemPath
}

function DesktopNavItem({ item, isActive }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2, type: "spring", stiffness: 300 }}>
      <Link
        to={item.to}
        aria-current={isActive ? "page" : undefined}
        className={`relative inline-flex h-11 items-center justify-center px-3 text-[13px] font-medium transition-all duration-300 nav-link-hover ${
          isActive
            ? "text-cyan-100 [text-shadow:0_0_16px_rgba(103,232,249,0.5)]"
            : "text-white/[0.66] hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.14)]"
        }`}
      >
        <span className="whitespace-nowrap">{item.name}</span>
        {isActive && (
          <motion.div
            layoutId="navbar-active"
            className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
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
            ? "bg-white/[0.05] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_18px_rgba(34,211,238,0.08)]"
            : "text-white/[0.68] hover:bg-white/[0.04] hover:text-white"
        }`}
      >
        <span>{item.name}</span>
        {isActive && (
          <motion.div
            className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </Link>
    </motion.div>
  )
}

function Navbar() {
  const [mobileMenuPath, setMobileMenuPath] = useState(null)
  const { pathname } = useLocation()
  const isMobileMenuOpen = mobileMenuPath === pathname
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 190, damping: 18, mass: 0.6 })
  const rotateY = useSpring(tiltY, { stiffness: 190, damping: 18, mass: 0.6 })

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    tiltX.set(-y * 5)
    tiltY.set(x * 7)
  }

  const resetTilt = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <nav
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-1rem)] max-w-[1180px] -translate-x-1/2 md:top-5 md:w-[calc(100%-2rem)]"
      style={{ perspective: 1800 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(135deg, rgba(7,14,27,0.88), rgba(255,255,255,0.06) 46%, rgba(7,14,27,0.78))",
          boxShadow:
            "0 28px 70px rgba(3, 8, 20, 0.42), 0 10px 26px rgba(34,211,238,0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
        }}
        className="relative overflow-hidden rounded-[1.15rem] border border-white/[0.08]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.14),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_24%)]" />
        <div className="pointer-events-none absolute -left-8 top-2 h-16 w-24 rounded-full bg-cyan-300/[0.1] blur-3xl" />
        <div className="pointer-events-none absolute -right-8 bottom-0 h-20 w-28 rounded-full bg-blue-400/[0.1] blur-3xl" />

        <div className="relative flex items-center gap-3 px-3 py-3 md:px-4">
          <div
            className="shrink-0 rounded-[0.95rem] bg-white/[0.04] px-3 py-2 shadow-[0_10px_24px_rgba(2,8,23,0.16),inset_0_1px_0_rgba(255,255,255,0.05)]"
            style={{ transform: "translateZ(42px)" }}
          >
            <Logo3D size="sm" showText={true} className="scale-[0.92] origin-left" />
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div
              className="px-4 py-1"
              style={{ transform: "translateZ(28px)" }}
            >
              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <DesktopNavItem
                    key={item.to}
                    item={item}
                    isActive={isNavItemActive(pathname, item.to)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center lg:hidden">
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-11 w-11 items-center justify-center rounded-[0.95rem] bg-white/[0.05] text-white/[0.86] shadow-[0_10px_24px_rgba(2,8,23,0.14),inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-300 hover:bg-white/[0.08]"
              onClick={() => setMobileMenuPath(isMobileMenuOpen ? null : pathname)}
              style={{ transform: "translateZ(36px)" }}
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
                    isActive={isNavItemActive(pathname, item.to)}
                    onNavigate={() => setMobileMenuPath(null)}
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
