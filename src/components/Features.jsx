import { motion } from "framer-motion"
import TiltCard from "./TiltCard"
import GlowCard from "./GlowCard"
import { RevealOnScroll, StaggerReveal } from "./RevealOnScroll"

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Weather Resistant",
    description: "Engineered to withstand extreme weather conditions, from scorching heat to heavy rainfall.",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Noise Protection",
    description: "Advanced acoustic glass technology that reduces outside noise by up to 40 decibels.",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Premium Aluminium",
    description: "High-grade aerospace-quality aluminium frames that are lightweight yet incredibly strong.",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Energy Efficient",
    description: "Superior thermal insulation reduces energy costs and keeps your home comfortable year-round.",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Modern Design",
    description: "Sleek, contemporary aesthetics that complement any architectural style beautifully.",
    gradient: "from-rose-500 to-red-600"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Smart Integration",
    description: "Compatible with home automation systems for seamless smart living experience.",
    gradient: "from-slate-500 to-blue-600"
  }
]

function FeatureCard({ feature, index }) {
  return (
    <TiltCard tiltMax={8} scale={1.02} className="h-full">
      <RevealOnScroll variant="fadeUp" delay={index * 0.1} className="h-full">
        <GlowCard
          className="relative h-full overflow-hidden rounded-3xl p-6 glass group hover-lift md:p-8"
          glowColor={`${feature.gradient.includes('cyan') ? 'rgba(34,211,238,0.06)' : feature.gradient.includes('purple') ? 'rgba(139,92,246,0.06)' : 'rgba(34,211,238,0.06)'}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
          <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

          <div className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`icon-glow mb-6 bg-gradient-to-br ${feature.gradient}`}
            >
              {feature.icon}
            </motion.div>

            <h3 className="mb-3 text-lg font-bold text-white transition-colors group-hover:text-blue-400 md:text-xl">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>

          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
        </GlowCard>
      </RevealOnScroll>
    </TiltCard>
  )
}

function Features() {
  return (
    <section id="features" className="relative flex min-h-screen items-center overflow-hidden bg-[#030712] py-20 md:py-24">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-amber-500/10 blur-[140px] md:h-[600px] md:w-[600px] md:blur-[200px]"></div>
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px] md:h-[600px] md:w-[600px] md:blur-[200px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <RevealOnScroll variant="fadeUp" className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 glass rounded-full text-blue-400 text-sm font-medium mb-4 hover-glow"
          >
            Why Choose Us
          </motion.span>
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            <span className="text-white">Premium </span>
            <span className="gradient-text">Features</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
            Our windows and doors come packed with advanced features for superior performance and aesthetics
          </p>
        </RevealOnScroll>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
