import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Absolutely stunning windows! The quality is exceptional and the installation team was professional. My home looks transformed with the new sliding windows. Highly recommended!",
    product: "Sliding Windows"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Bangalore, Karnataka",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Dynamic Windows exceeded my expectations. The casement windows are beautifully crafted and the attention to detail is remarkable. Great customer service throughout.",
    product: "Casement Windows"
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Delhi, NCR",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "We installed folding doors from Dynamic Windows and it's been a game changer for our living space. The quality is top-notch and the team was very helpful.",
    product: "Folding Doors"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    location: "Hyderabad, Telangana",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Excellent product quality and professional installation. The glass doors have completely changed the look of our office. Very satisfied with the results.",
    product: "Glass Doors"
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Pune, Maharashtra",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    text: "Great experience overall. The pivot door adds a modern touch to our entrance. Quality craftsmanship and timely delivery. Will definitely recommend to friends.",
    product: "Pivot Door"
  }
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="fx-panel relative rounded-2xl p-8"
    >
      <div className="absolute top-6 right-6 text-6xl text-cyan-500/10 font-serif">"</div>
      
      <div className="flex items-start gap-4 mb-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/30"
        />
        <div>
          <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.location}</p>
          <div className="mt-2">
            <StarRating rating={testimonial.rating} />
          </div>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
        {testimonial.text}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-sm text-cyan-400">{testimonial.product}</span>
        <span className="text-xs text-gray-500">Verified Customer</span>
      </div>
    </motion.div>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="min-h-screen py-24 bg-[#030712] relative overflow-hidden flex items-center">
      <div className="absolute inset-0 grid-background opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-cyan-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">What Our </span>
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Dynamic Windows.
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "4.9", label: "Average Rating" },
              { value: "50+", label: "Awards Won" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.1);
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .testimonials-swiper .swiper-button-next:after,
        .testimonials-swiper .swiper-button-prev:after {
          font-size: 20px;
        }
        .testimonials-swiper .swiper-button-next:hover,
        .testimonials-swiper .swiper-button-prev:hover {
          background: rgba(0, 240, 255, 0.2);
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
          width: 10px;
          height: 10px;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #00f0ff;
        }
      `}</style>
    </section>
  )
}

export default Testimonials
