import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { sectionLinks } from "../data/sectionLinks"

function About() {
  const stats = [
    { value: "500+", label: "Projects Completed", suffix: "" },
    { value: "15+", label: "Years Experience", suffix: "Years" },
    { value: "98%", label: "Client Satisfaction", suffix: "%" },
    { value: "50+", label: "Team Members", suffix: "+" }
  ]

  const timeline = [
    { year: "2010", title: "Founded", description: "Started our journey with a vision" },
    { year: "2015", title: "Expansion", description: "Opened 5 new showrooms" },
    { year: "2020", title: "Innovation", description: "Launched smart window solutions" },
    { year: "2025", title: "Leadership", description: "Became industry leader" }
  ]

  return (
    <section id="about" className="relative flex min-h-screen items-center overflow-hidden bg-[#f8fafc] py-20 md:py-24">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-500/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 glass rounded-full text-blue-400 text-sm font-medium mb-4"
            >
              About Us
            </motion.span>
            
            <h2 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              <span className="text-white">Crafting </span>
              <span className="gradient-text">Excellence</span>
              <br />
              <span className="text-white">Since 2010</span>
            </h2>
            
            <p className="mb-6 text-base leading-relaxed text-gray-400 md:mb-8 md:text-lg">
              FORTUNE has been at the forefront of the windows and doors industry for over 15 years. 
              We specialize in premium aluminium, UPVC, and glass solutions that transform ordinary spaces into extraordinary ones.
            </p>
            
            <p className="mb-8 text-base leading-relaxed text-gray-400 md:text-lg">
              Our commitment to quality, innovation, and customer satisfaction has made us the preferred choice 
              for homeowners, architects, and developers across the region.
            </p>
            
            {/* Stats */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="fx-panel rounded-2xl p-4 text-center"
                >
                  <div className="text-3xl font-bold gradient-text">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0, 240, 255, 0.3)" }} whileTap={{ scale: 0.97 }}>
              <Link to={sectionLinks.contact} className="neon-button inline-flex w-full justify-center sm:w-auto">
                <span>Talk To Our Team</span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Timeline & Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="media-ratio-card overflow-hidden rounded-2xl">
                  <img
                    src="/assets/1-Sliding Window/1.1.png"
                    alt="Window"
                    className="media-image"
                    loading="lazy"
                  />
                </div>
                <div className="media-ratio-card overflow-hidden rounded-2xl">
                  <img
                    src="/assets/12. Sliding Door/121.jpg"
                    alt="Door"
                    className="media-image"
                    loading="lazy"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="media-ratio-card overflow-hidden rounded-2xl">
                  <img
                    src="/assets/4-Bay Window/4.1.png"
                    alt="Bay Window"
                    className="media-image"
                    loading="lazy"
                  />
                </div>
                <div className="media-ratio-card overflow-hidden rounded-2xl">
                  <img
                    src="/assets/15. French Door/151.jpg"
                    alt="French Door"
                    className="media-image"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Timeline */}
            <div className="fx-panel rounded-3xl p-5 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Our Journey</h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="fx-panel-soft flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl sm:h-16 sm:w-16">
                      <span className="text-blue-400 font-bold">{item.year}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
