import { useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

function Window3D(){
  const features = [
    { img: "/assets/1-Sliding Window/1.1.png", title: "Premium Quality", desc: "High-grade aluminium frames with superior finish", glow: "from-blue-500 to-cyan-400" },
    { img: "/assets/7-Tilt & Turn Window/7.1.png", title: "Modern Design", desc: "Sleek and contemporary aesthetics", glow: "from-purple-500 to-pink-400" },
    { img: "/assets/4-Bay Window/4.1.png", title: "Expert Installation", desc: "Professional team with years of experience", glow: "from-emerald-500 to-teal-400" }
  ]

  const stats = [
    { icon: "🛡️", title: "5 Year Warranty", desc: "Comprehensive coverage", color: "from-blue-500 to-cyan-500" },
    { icon: "⚡", title: "Quick Delivery", desc: "Fast installation", color: "from-purple-500 to-pink-500" },
    { icon: "🎨", title: "Custom Colors", desc: "Wide color options", color: "from-emerald-500 to-teal-500" },
    { icon: "🔧", title: "Free Maintenance", desc: "First year free", color: "from-orange-500 to-red-500" }
  ]

  const FeatureCard = ({ item, index }) => {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    
    const rotateX = useTransform(y, [-100, 100], [10, -10])
    const rotateY = useTransform(x, [-100, 100], [-10, 10])
    
    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set(e.clientX - centerX)
      y.set(e.clientY - centerY)
    }
    
    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    return (
      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
        initial={{opacity: 0, y: 50, rotateX: -15}}
        whileInView={{opacity: 1, y: 0, rotateX: 0}}
        viewport={{once: true}}
        transition={{delay: index * 0.2, duration: 0.6}}
        whileHover={{y: -10}}
      >
        <motion.div 
          style={{ rotateX, rotateY }}
          className="relative group"
        >
          <div className={`absolute -inset-1 bg-gradient-to-r ${item.glow} rounded-3xl blur opacity-0 group-hover:opacity-60 transition duration-500`}></div>
          <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 group-hover:border-slate-600/50 transition-all">
            <div className="relative h-80 overflow-hidden preserve-3d">
              <motion.img 
                whileHover={{scale: 1.2, rotateY: 10}}
                transition={{duration: 0.5}}
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover"
                style={{ transformStyle: "preserve-3d" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              <motion.div 
                initial={{scale: 0.8, opacity: 0}}
                whileHover={{scale: 1, opacity: 1}}
                className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold text-white"
              >
                {index + 1}
              </motion.div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{item.desc}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return(
    <div className="min-h-screen py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center">
      <div className="absolute inset-0 overflow-hidden">
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="inline-block px-4 py-1.5 bg-blue-500/20 rounded-full text-blue-400 font-medium text-sm mb-4"
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mt-3 mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 text-transparent bg-clip-text">Premium Windows & Doors</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">We provide premium quality windows and doors with cutting-edge technology and exceptional craftsmanship</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <FeatureCard key={index} item={item} index={index} />
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div 
              key={index}
              initial={{opacity: 0, y: 30, scale: 0.9}}
              whileInView={{opacity: 1, y: 0, scale: 1}}
              viewport={{once: true}}
              transition={{delay: index * 0.1}}
              whileHover={{y: -8, scale: 1.05}}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300`}></div>
              <div className="relative bg-slate-800/80 backdrop-blur p-8 rounded-2xl text-center border border-slate-700/50 group-hover:border-slate-600/50 transition-all">
                <motion.div 
                  whileHover={{scale: 1.3, rotate: 15, y: -5}}
                  className="text-5xl mb-4"
                >
                  {item.icon}
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Window3D
