import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import products from "../data/products"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function saveToRecentlyViewed(product) {
  try {
    const stored = JSON.parse(localStorage.getItem("dw_recently_viewed") || "[]")
    const filtered = stored.filter(p => p.id !== product.id)
    const minimal = { id: product.id, name: product.name, images: product.images, category: product.category, price: product.price, description: product.description }
    const updated = [minimal, ...filtered].slice(0, 8)
    localStorage.setItem("dw_recently_viewed", JSON.stringify(updated))
  } catch (err) {
    console.warn("Failed to save recently viewed:", err)
  }
}

function ProductDetailContent({ id }) {
  const product = products.find(p => p.id === parseInt(id))
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (product) saveToRecentlyViewed(product)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <Link to="/home" className="text-cyan-400 hover:text-cyan-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images || []
  const resolvedImageIndex = Math.min(selectedImage, Math.max(images.length - 1, 0))
  const activeImage = images[resolvedImageIndex] || images[0]
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-[#030712]">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/home" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 font-semibold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-6 glass rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${product.id}-${resolvedImageIndex}`}
                    src={activeImage}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-[500px] object-cover"
                  />
                </AnimatePresence>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {product.price}
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        resolvedImageIndex === index 
                          ? 'border-cyan-400 shadow-lg shadow-cyan-400/30' 
                          : 'border-transparent hover:border-gray-600'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-1 glass rounded-full text-cyan-400 text-sm font-semibold">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {product.name}
              </h1>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="glass rounded-3xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-sm flex-shrink-0">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="glass rounded-2xl p-5">
                  <h3 className="text-lg font-bold text-white mb-3">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes?.map((size, index) => (
                      <span key={index} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg text-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl p-5">
                  <h3 className="text-lg font-bold text-white mb-3">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors?.map((color, index) => (
                      <span key={index} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg text-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link to="/contact" className="flex-1 neon-button text-center">
                  <span>Get Quote Now</span>
                </Link>
                <Link to="/home" className="px-6 py-3 glass rounded-xl font-semibold text-white hover:bg-white/10 transition-colors">
                  View All Products
                </Link>
              </div>
            </motion.div>
          </div>

          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                Related <span className="gradient-text">Products</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <Link key={item.id} to={`/product/${item.id}`} className="glass rounded-2xl overflow-hidden group">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">{item.name}</h3>
                      <p className="text-cyan-400 font-bold">{item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

function ProductDetail() {
  const { id = "" } = useParams()

  return <ProductDetailContent key={id} id={id} />
}

export default ProductDetail
