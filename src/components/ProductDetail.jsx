import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

function ProductDetail({ product, onClose }){
  const [selectedImage, setSelectedImage] = useState(0)
  const [isClosing, setIsClosing] = useState(false)

  if (!product) return null

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 300)
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{opacity: 0}}
        animate={isClosing ? {opacity: 0} : {opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.3}}
        className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div 
          initial={{opacity: 0, scale: 0.9, y: 50}}
          animate={isClosing ? {opacity: 0, scale: 0.9, y: 50} : {opacity: 1, scale: 1, y: 0}}
          exit={{opacity: 0, scale: 0.9, y: 50}}
          transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
          className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button 
            whileHover={{scale: 1.1, rotate: 90}}
            whileTap={{scale: 0.9}}
            onClick={handleClose} 
            className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </motion.button>
          
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 pb-4">
              <motion.div 
                key={selectedImage}
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.3}}
                className="relative"
              >
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </motion.div>
              
              <motion.div 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2}}
                className="flex gap-3 mt-4 overflow-x-auto pb-2"
              >
                {product.images.map((img, index) => (
                  <motion.button 
                    key={index}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={() => setSelectedImage(index)} 
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === index 
                        ? 'border-blue-500 shadow-lg ring-2 ring-blue-300 ring-offset-2' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover"/>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            <div className="p-8 pb-4">
              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.1}}
              >
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold capitalize mb-2">{product.category}</span>
              </motion.div>
              
              <motion.h2 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2}}
                className="text-3xl font-bold text-gray-800 mb-2"
              >
                {product.name}
              </motion.h2>
              
              <motion.p 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3}}
                className="text-3xl font-bold text-blue-600 mb-4"
              >
                {product.price}
              </motion.p>
              
              <motion.p 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.4}}
                className="text-gray-600 mb-6"
              >
                {product.description}
              </motion.p>

              <motion.div 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.5}}
                className="mb-6"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                  Features
                </h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{opacity: 0, x: -10}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: 0.6 + index * 0.05}}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.7}}
                className="mb-6"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                  Available Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <motion.span 
                      key={index}
                      whileHover={{scale: 1.05}}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      {size}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.8}}
                className="mb-6"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                  Available Colors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <motion.span 
                      key={index}
                      whileHover={{scale: 1.05}}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      {color}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <Link
                to="/contact"
                onClick={onClose}
                className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-center font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProductDetail
