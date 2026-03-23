import { useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

function ProductCard({ product, onClick }){
  const ref = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [15, -15])
  const rotateY = useTransform(x, [-100, 100], [-15, 15])
  
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

  return(
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative"
    >
      <motion.div 
        style={{ rotateX, rotateY }}
        whileHover={{scale: 1.02}}
        transition={{type: "spring", stiffness: 300, damping: 20}}
        onClick={() => onClick(product)} 
        className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
        
        <div className="relative overflow-hidden h-72 preserve-3d">
          <motion.img 
            whileHover={{scale: 1.15, rotateY: 5}}
            transition={{duration: 0.5}}
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
            style={{ transformStyle: "preserve-3d" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          <motion.div 
            initial={{scale: 0.8, opacity: 0}}
            whileHover={{scale: 1, opacity: 1}}
            className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
          >
            {product.category}
          </motion.div>
          
          <motion.div 
            initial={{scale: 0.8, opacity: 0}}
            whileHover={{scale: 1, opacity: 1}}
            className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            {product.images.length}
          </motion.div>
          
          <motion.div 
            initial={{opacity: 0, y: 20, rotateX: -20}}
            whileHover={{opacity: 1, y: 0, rotateX: 0}}
            transition={{duration: 0.3}}
            className="absolute bottom-4 left-4 right-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <button className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
              View Details
            </button>
          </motion.div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">{product.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">{product.price}</span>
            <motion.button 
              whileHover={{scale: 1.1, rotate: 10}}
              whileTap={{scale: 0.95}}
              className="text-sm text-gray-400 flex items-center gap-1 hover:text-blue-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              View
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProductCard
