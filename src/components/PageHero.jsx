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
    <section className="relative overflow-hidden px-6 pb-14 pt-28 md:pb-24 md:pt-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_28%)]" />
      <ParallaxLayer speed={0.12} className="absolute -left-20 top-14 h-64 w-64">
        <div className="h-full w-full rounded-full bg-cyan-500/10 blur-[150px]" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.18} direction="horizontal" className="absolute right-0 top-10 h-72 w-72">
        <div className="h-full w-full rounded-full bg-purple-500/10 blur-[180px]" />
      </ParallaxLayer>
      <div className="container mx-auto max-w-[1400px]">
        <RevealOnScroll
          variant="fadeUp"
          className={`relative ${isCentered ? "mx-auto text-center" : "max-w-4xl text-left"}`}
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="fx-chip inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-cyan-100 md:px-5 md:py-2.5 md:text-base"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            {badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-6 text-4xl font-black leading-[0.96] text-white sm:text-5xl md:mt-7 md:text-8xl lg:text-[6.4rem]"
          >
            <span>{title} </span>
            <span className="gradient-text">{titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className={`mx-auto mt-5 max-w-4xl text-base leading-7 text-slate-300 sm:text-lg md:mt-7 md:text-[1.35rem] md:leading-9 ${
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
            className="relative mt-12 grid gap-5 md:grid-cols-3"
          >
            {stats.map((item) => (
              <div key={item.label} className="fx-panel rounded-[1.5rem] p-6 text-left">
                <div className="text-4xl font-black text-white">{item.value}</div>
                <div className="mt-3 text-sm uppercase tracking-[0.22em] text-slate-400">
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
