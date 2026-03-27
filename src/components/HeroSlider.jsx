import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade, EffectCoverflow } from "swiper/modules"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "swiper/css"
import "swiper/css/pagination"

const MotionLink = motion.create(Link)
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/effect-coverflow"

function HeroSlider(){
  const slides = [
    { image: "/assets/1-Sliding Window/1.1.png", title: "Premium Sliding Windows", subtitle: "Smooth gliding mechanism for modern homes" },
    { image: "/assets/2-Casement Window/2.1.png", title: "Elegant Casement Windows", subtitle: "Maximum ventilation with stunning views" },
    { image: "/assets/12. Sliding Door/121.jpg", title: "Modern Sliding Doors", subtitle: "Space-saving solution for your home" },
    { image: "/assets/4-Bay Window/4.1.png", title: "Beautiful Bay Windows", subtitle: "Add architectural beauty to your home" },
    { image: "/assets/15. French Door/151.jpg", title: "French Doors", subtitle: "Classic elegance for your space" },
    { image: "/assets/7-Tilt & Turn Window/7.1.png", title: "Tilt & Turn Windows", subtitle: "European technology for superior performance" },
    { image: "/assets/14. Pivot Door/141.jpg", title: "Luxury Pivot Doors", subtitle: "Modern design with elegant style" },
    { image: "/assets/8-Skylight Window/8.1.png", title: "Skylight Windows", subtitle: "Bring natural light from above" }
  ]

  return(
    <div className="pt-20 relative">
      <div className="hero-3d-slider">
        <Swiper 
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          navigation
          loop={true}
          className="h-[750px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="h-[750px] relative overflow-hidden">
                <div className="slide-3d-wrapper">
                  <motion.img 
                    initial={{scale: 1.3, rotateY: 15}}
                    animate={{scale: 1, rotateY: 0}}
                    transition={{duration: 1.5, ease: "easeOut"}}
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover slide-image-3d"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50"></div>

                
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6">
                    <motion.div 
                      initial={{opacity: 0, y: 80, rotateX: -30}}
                      animate={{opacity: 1, y: 0, rotateX: 0}}
                      transition={{duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1]}}
                      className="max-w-3xl perspective-1000"
                    >
                      <div className="text-white">
                        <motion.div 
                          initial={{opacity: 0, x: -50, rotateY: 20}}
                          animate={{opacity: 1, x: 0, rotateY: 0}}
                          transition={{duration: 0.6, delay: 0.5}}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-8"
                        >
                          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                          <span className="text-blue-300 font-medium text-sm tracking-wide">Premium Quality</span>
                        </motion.div>
                        
                        <motion.h1 
                          initial={{opacity: 0, y: 40, rotateY: 10}}
                          animate={{opacity: 1, y: 0, rotateY: 0}}
                          transition={{duration: 0.8, delay: 0.7}}
                          className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 drop-shadow-2xl"
                        >
                          {slide.title}
                        </motion.h1>
                        
                        <motion.p 
                          initial={{opacity: 0, y: 30}}
                          animate={{opacity: 1, y: 0}}
                          transition={{duration: 0.8, delay: 0.9}}
                          className="text-xl md:text-2xl text-blue-100 mb-10 max-w-xl leading-relaxed"
                        >
                          {slide.subtitle}
                        </motion.p>
                        
                        <motion.div 
                          initial={{opacity: 0, y: 30}}
                          animate={{opacity: 1, y: 0}}
                          transition={{duration: 0.8, delay: 1.1}}
                          className="flex flex-wrap gap-5"
                        >
                          <MotionLink
                            to="/products"
                            whileHover={{scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"}}
                            whileTap={{scale: 0.98}}
                            className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-500/30 text-white overflow-hidden"
                          >
                            <span className="relative z-10">View Products</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                          </MotionLink>
                          
                          <MotionLink
                            to="/contact"
                            whileHover={{scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)"}}
                            whileTap={{scale: 0.98}}
                            className="bg-white/5 hover:bg-white/10 backdrop-blur px-10 py-4 rounded-full font-bold text-lg transition-all border border-white/20 text-white flex items-center gap-2"
                          >
                            <span>Get Quote</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                          </MotionLink>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 1.5}}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  <div className="custom-pagination flex gap-2"></div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  )
}

export default HeroSlider
