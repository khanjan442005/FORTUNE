import { motion } from "framer-motion"

const galleryImages = [
  { id: 1, src: "/assets/1-Sliding Window/1.1.png", title: "Sliding Windows", category: "Residential", size: "large" },
  { id: 2, src: "/assets/2-Casement Window/2.1.png", title: "Casement Windows", category: "Modern", size: "small" },
  { id: 3, src: "/assets/4-Bay Window/4.1.png", title: "Bay Windows", category: "Premium", size: "small" },
  { id: 4, src: "/assets/12. Sliding Door/121.jpg", title: "Sliding Doors", category: "Commercial", size: "medium" },
  { id: 5, src: "/assets/15. French Door/151.jpg", title: "French Doors", category: "Luxury", size: "medium" },
  { id: 6, src: "/assets/14. Pivot Door/141.jpg", title: "Pivot Doors", category: "Modern", size: "small" },
  { id: 7, src: "/assets/7-Tilt & Turn Window/7.1.png", title: "Tilt & Turn", category: "European", size: "medium" },
  { id: 8, src: "/assets/8-Skylight Window/8.1.png", title: "Skylight", category: "Premium", size: "large" }
]

function GalleryImage({ image, index }) {
  const sizeClasses = {
    small: "md:col-span-1",
    medium: "md:col-span-1 lg:col-span-1",
    large: "md:col-span-2 lg:col-span-2"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl fx-panel ${sizeClasses[image.size]}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="relative h-full min-h-[220px] fx-image-zoom sm:min-h-[250px]"
      >
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        

        
        {/* Content */}
        <div className="absolute inset-0 flex translate-y-0 flex-col justify-end p-5 opacity-100 transition-all duration-500 md:translate-y-4 md:p-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <span className="text-cyan-400 text-sm font-medium mb-1">{image.category}</span>
          <h3 className="text-white text-xl font-bold">{image.title}</h3>
        </div>
        
        {/* Border Glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-500/50 transition-colors duration-500"></div>
      </motion.div>
    </motion.div>
  )
}

function Gallery() {
  return (
    <section id="gallery" className="relative flex min-h-screen items-center overflow-hidden bg-[#030712] py-20 md:py-24">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-20"></div>
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[140px] md:h-[800px] md:w-[800px] md:blur-[200px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
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
            Our Work
          </motion.span>
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            <span className="text-white">Project </span>
            <span className="gradient-text">Gallery</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
            Explore our portfolio of stunning installations across residential and commercial projects
          </p>
        </motion.div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <GalleryImage key={image.id} image={image} index={index} />
          ))}
        </div>
        
        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="outline-button fx-press">
            <span>View All Projects</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery
