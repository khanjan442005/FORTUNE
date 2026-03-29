import { motion } from "framer-motion";
import { ParallaxLayer } from "./ParallaxLayer";
import { RevealOnScroll } from "./RevealOnScroll";

function PageHero({
  badge,
  title,
  titleAccent,
  description,
  stats = [],
  align = "center",
}) {
  const isCentered = align === "center";

  return (
    <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pb-20 md:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_28%)]" />
      <ParallaxLayer speed={0.12} className="absolute -left-20 top-14 h-64 w-64">
        <div className="h-full w-full rounded-full bg-cyan-500/10 blur-[150px]" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.18} direction="horizontal" className="absolute right-0 top-10 h-72 w-72">
        <div className="h-full w-full rounded-full bg-purple-500/10 blur-[180px]" />
      </ParallaxLayer>
      <div className="container mx-auto max-w-6xl">
        <RevealOnScroll
          variant="fadeUp"
          className={`relative ${isCentered ? "mx-auto text-center" : "max-w-3xl text-left"}`}
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="fx-chip inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-cyan-100"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            {badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-6 text-5xl font-black leading-[0.96] text-white md:text-7xl lg:text-[5.25rem]"
          >
            <span>{title} </span>
            <span className="gradient-text">{titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className={`mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-xl ${
              isCentered ? "text-center" : "text-left"
            }`}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className={`mt-10 h-px bg-gradient-to-r from-transparent via-cyan-400/45 to-transparent ${
              isCentered ? "mx-auto max-w-xl" : "max-w-lg"
            }`}
          />
        </RevealOnScroll>

        {stats.length > 0 && (
          <RevealOnScroll
            variant="fadeUp"
            delay={0.18}
            className="relative mt-10 grid gap-4 md:grid-cols-3"
          >
            {stats.map((item) => (
              <div key={item.label} className="fx-panel rounded-2xl p-5 text-left">
                <div className="text-3xl font-black text-white">{item.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </div>
              </div>
            ))}
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}

export default PageHero;
