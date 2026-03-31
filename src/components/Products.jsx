import { useRef, useMemo } from "react"
import { Link } from "react-router-dom"
import { motion, useMotionValue, useTransform } from "framer-motion"
import products from '../data/products'
import { sectionLinks } from "../data/sectionLinks"
import { useDebounce, useLocalStorage } from "../hooks/useInView"

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'window', name: 'Windows' },
  { id: 'door', name: 'Doors' }
]

const PRODUCT_FILTERS_KEY = 'dynamic-windows.products.filters'

function createDefaultProductFilters() {
  return {
    activeCategory: 'all',
    searchQuery: ''
  }
}

function normalizeProductFilters(value) {
  const activeCategory = categories.some((category) => category.id === value?.activeCategory)
    ? value.activeCategory
    : 'all'

  return {
    activeCategory,
    searchQuery: String(value?.searchQuery || '').slice(0, 80)
  }
}

function parseProductFilters(value) {
  return normalizeProductFilters(JSON.parse(value))
}

function serializeProductFilters(value) {
  return JSON.stringify(normalizeProductFilters(value))
}

function ProductCard({ product, index }) {
  const ref = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="gaming-card group flex h-full flex-col"
      >
        <div className="relative media-ratio-card overflow-hidden rounded-t-2xl fx-image-zoom">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            src={product.images[0]}
            alt={product.name}
            className="media-image"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 left-4"
          >
            <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold capitalize">
              {product.category}
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 right-4"
          >
            <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold">
              {product.price}
            </span>
          </motion.div>
          
        </div>
        
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>
          <p className="min-h-[3.5rem] text-gray-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="mb-5 flex min-h-[5.75rem] flex-wrap content-start gap-2">
            {product.features.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400"
              >
                {feature}
              </span>
            ))}
          </div>

          <Link
            to={`/product/${product.id}`}
            className="mt-auto block w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-center font-semibold text-white shadow-lg fx-press"
          >
            View Details
          </Link>
        </div>
        
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/30 transition-colors duration-500"></div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Products({ embedded = false }) {
  const [productFilters, setProductFilters] = useLocalStorage(
    PRODUCT_FILTERS_KEY,
    createDefaultProductFilters,
    {
      deserializer: parseProductFilters,
      serializer: serializeProductFilters,
      syncTabs: false
    }
  )
  const activeCategory = productFilters.activeCategory
  const searchQuery = productFilters.searchQuery
  const debouncedSearchQuery = useDebounce(searchQuery, 180)
  const normalizedSearchQuery = debouncedSearchQuery.trim().toLowerCase()

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      const matchesSearch = !normalizedSearchQuery ||
        product.name.toLowerCase().includes(normalizedSearchQuery) ||
        product.description.toLowerCase().includes(normalizedSearchQuery)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, normalizedSearchQuery])

  return (
    <section
      id="products"
      className={`relative overflow-hidden bg-[#030712] ${
        embedded
          ? "scroll-mt-28 py-12 md:scroll-mt-32 md:py-16"
          : "flex min-h-screen items-center py-20 md:py-24"
      }`}
    >
      <div className="absolute inset-0 grid-background opacity-30"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {!embedded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 glass rounded-full text-cyan-400 text-sm font-medium mb-4"
            >
              Our Products
            </motion.span>
            <h2 className="text-4xl font-bold mb-4 sm:text-5xl md:text-6xl">
              <span className="text-white">Premium </span>
              <span className="gradient-text">Collection</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
              Discover our extensive range of windows and doors crafted with cutting-edge technology and premium materials
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${embedded ? "mb-10" : "mb-12"} flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center`}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setProductFilters((previous) => ({
                    ...previous,
                    activeCategory: category.id,
                  }))
                }
                className={`fx-press rounded-xl px-4 py-2.5 text-sm font-medium transition-all sm:px-6 sm:py-3 sm:text-base ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'glass text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) =>
                setProductFilters((previous) => ({
                  ...previous,
                  searchQuery: e.target.value,
                }))
              }
              className="input-glow w-full pl-12"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() =>
                  setProductFilters((previous) => ({
                    ...previous,
                    searchQuery: '',
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No Products Found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
        
        {!embedded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link to={sectionLinks.contact} className="outline-button fx-press">
              <span>Need A Custom Quote?</span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Products
