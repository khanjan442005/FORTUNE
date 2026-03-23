import { motion } from "framer-motion"

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
    <section id="about" className="min-h-screen py-24 bg-[#030712] relative overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-500/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              className="inline-block px-4 py-2 glass rounded-full text-cyan-400 text-sm font-medium mb-4"
            >
              About Us
            </motion.span>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Crafting </span>
              <span className="gradient-text">Excellence</span>
              <br />
              <span className="text-white">Since 2010</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Dynamic Windows has been at the forefront of the windows and doors industry for over 15 years. 
              We specialize in premium aluminium, UPVC, and glass solutions that transform ordinary spaces into extraordinary ones.
            </p>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our commitment to quality, innovation, and customer satisfaction has made us the preferred choice 
              for homeowners, architects, and developers across the region.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-4 text-center"
                >
                  <div className="text-3xl font-bold gradient-text">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="neon-button"
            >
              <span>Learn More About Us</span>
            </motion.button>
          </motion.div>
          
          {/* Right Content - Timeline & Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <img
                  src="/assets/1-Sliding Window/1.1.png"
                  alt="Window"
                  className="rounded-2xl w-full h-48 object-cover"
                />
                <img
                  src="/assets/12. Sliding Door/121.jpg"
                  alt="Door"
                  className="rounded-2xl w-full h-32 object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4 pt-8"
              >
                <img
                  src="/assets/4-Bay Window/4.1.png"
                  alt="Bay Window"
                  className="rounded-2xl w-full h-32 object-cover"
                />
                <img
                  src="/assets/15. French Door/151.jpg"
                  alt="French Door"
                  className="rounded-2xl w-full h-48 object-cover"
                />
              </motion.div>
            </div>
            
            {/* Timeline */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Our Journey</h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-16 glass rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold">{item.year}</span>
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
