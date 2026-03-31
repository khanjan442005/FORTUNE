import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { RevealOnScroll } from "./RevealOnScroll"
import { sectionLinks } from "../data/sectionLinks"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

const MotionLink = motion.create(Link)

const slides = [
  {
    image: "/assets/1-Sliding Window/1.1.png",
    eyebrow: "Sliding Series",
    title: "Premium Sliding Windows",
    subtitle: "Smooth gliding mechanism with a cleaner frame profile for modern homes.",
  },
  {
    image: "/assets/2-Casement Window/2.1.png",
    eyebrow: "Casement Series",
    title: "Elegant Casement Windows",
    subtitle: "Fresh airflow, clean detailing, and sharp elevation lines for premium spaces.",
  },
  {
    image: "/assets/12. Sliding Door/121.jpg",
    eyebrow: "Door Systems",
    title: "Modern Sliding Doors",
    subtitle: "Wide openings with a calm luxury finish for balconies, patios, and living areas.",
  },
  {
    image: "/assets/4-Bay Window/4.1.png",
    eyebrow: "Architectural Style",
    title: "Beautiful Bay Windows",
    subtitle: "A sculpted projection that adds light, depth, and visual character to the room.",
  },
  {
    image: "/assets/15. French Door/151.jpg",
    eyebrow: "Classic Collection",
    title: "French Doors",
    subtitle: "Elegant framed openings designed to bring in light while keeping a timeless look.",
  },
  {
    image: "/assets/7-Tilt & Turn Window/7.1.png",
    eyebrow: "European Tech",
    title: "Tilt & Turn Windows",
    subtitle: "Two opening modes in one refined system for ventilation and full easy access.",
  },
  {
    image: "/assets/14. Pivot Door/141.jpg",
    eyebrow: "Statement Entry",
    title: "Luxury Pivot Doors",
    subtitle: "A bold front-door experience with modern balance, scale, and premium finishes.",
  },
  {
    image: "/assets/8-Skylight Window/8.1.png",
    eyebrow: "Natural Light",
    title: "Skylight Windows",
    subtitle: "Bring daylight deeper into your interior with a cleaner overhead window solution.",
  },
]

function HeroSlider() {
  return (
    <section className="relative px-4 pb-10 pt-20 md:px-6 md:pb-16 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div
          className="hero-showcase-slider relative overflow-hidden rounded-[2rem] border border-white/10 p-2 md:rounded-[3rem] md:p-3"
          style={{
            background:
              "linear-gradient(135deg, rgba(8,15,29,0.72), rgba(255,255,255,0.05) 48%, rgba(8,15,29,0.66))",
            boxShadow:
              "0 28px 70px rgba(2, 8, 23, 0.36), inset 0 1px 0 rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_24%)]" />

          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={900}
            autoplay={{ delay: 4800, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".hero-slider-pagination" }}
            navigation
            loop
            className="overflow-hidden rounded-[1.6rem] md:rounded-[2.7rem]"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.title}>
                <div className="relative min-h-[360px] overflow-hidden rounded-[1.6rem] sm:min-h-[430px] md:min-h-[520px] md:rounded-[2.7rem] lg:min-h-[600px]">
                  <motion.img
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/55 to-slate-950/18" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.16),transparent_18%)]" />

                  <div className="relative z-10 flex h-full items-end lg:items-center">
                    <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,500px)_1fr] lg:items-end">
                      <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="fx-panel-soft m-3 max-w-[min(100%,28rem)] rounded-[1.9rem] border border-white/12 bg-[linear-gradient(155deg,rgba(15,23,42,0.78),rgba(15,23,42,0.38)_55%,rgba(255,255,255,0.12))] p-5 shadow-[0_20px_40px_rgba(2,8,23,0.28)] backdrop-blur-xl sm:m-4 sm:max-w-[30rem] sm:p-6 md:m-6 md:rounded-[2.75rem] md:p-8"
                      >
                        <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/90 sm:px-5 sm:py-2.5 sm:text-[11px]">
                          {slide.eyebrow}
                        </span>

                        <motion.h1
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.25 }}
                          className="mt-5 max-w-3xl text-[2.35rem] font-bold leading-[0.96] text-white sm:text-5xl md:mt-6 md:text-[4.3rem] lg:text-[4.8rem]"
                        >
                          {slide.title}
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.35 }}
                          className="mt-4 max-w-lg text-sm leading-6 text-slate-200/90 sm:text-base md:mt-5 md:text-lg md:leading-7"
                        >
                          {slide.subtitle}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.45 }}
                          className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-8"
                        >
                          <MotionLink
                            to={sectionLinks.products}
                            whileHover={{ y: -3, scale: 1.03, boxShadow: "0 14px 34px rgba(56,189,248,0.4)" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="btn-glow-cyan inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(56,189,248,0.3)] transition-colors hover:from-blue-600 hover:to-cyan-500 sm:w-auto sm:px-7 sm:py-3.5 sm:text-base md:px-8 md:py-3.5"
                          >
                            View Products
                          </MotionLink>

                          <MotionLink
                            to={sectionLinks.contact}
                            whileHover={{ y: -3, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="hover-glow inline-flex w-full items-center justify-center rounded-full border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto sm:px-7 sm:py-3.5 sm:text-base md:px-8 md:py-3.5"
                          >
                            Get Quote
                          </MotionLink>
                        </motion.div>
                      </motion.div>

                      <div className="hidden items-end justify-end p-6 lg:flex">
                        <div className="fx-panel-soft rounded-[2rem] border border-white/10 bg-slate-950/34 px-5 py-4 text-right shadow-[0_18px_34px_rgba(2,8,23,0.2)] backdrop-blur-lg">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                            Slide
                          </p>
                          <p className="mt-2 text-3xl font-semibold text-white">
                            {String(index + 1).padStart(2, "0")}
                            <span className="ml-1 text-lg text-white/35">/ {String(slides.length).padStart(2, "0")}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="relative z-10 mt-4 flex flex-col items-start justify-between gap-3 px-2 sm:flex-row sm:items-center md:px-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40 sm:text-xs">
              Curated Premium Window & Door Systems
            </p>
            <div className="hero-slider-pagination flex items-center gap-2" />
          </div>
        </div>
      </div>

      <style>{`
        .hero-showcase-slider .swiper-button-next,
        .hero-showcase-slider .swiper-button-prev {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(15, 23, 42, 0.44);
          color: #f8fafc;
          backdrop-filter: blur(14px);
          box-shadow: 0 12px 24px rgba(2, 8, 23, 0.18);
        }

        .hero-showcase-slider .swiper-button-next::after,
        .hero-showcase-slider .swiper-button-prev::after {
          font-size: 16px;
          font-weight: 800;
        }

        .hero-showcase-slider .swiper-button-next {
          right: 18px;
        }

        .hero-showcase-slider .swiper-button-prev {
          left: 18px;
        }

        .hero-showcase-slider .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          margin: 0 !important;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
          opacity: 1;
          transition: all 0.25s ease;
        }

        .hero-showcase-slider .swiper-pagination-bullet-active {
          width: 28px;
          background: linear-gradient(90deg, #3b82f6, #22d3ee);
        }

        @media (max-width: 768px) {
          .hero-showcase-slider .swiper-button-next,
          .hero-showcase-slider .swiper-button-prev {
            width: 36px;
            height: 36px;
          }

          .hero-showcase-slider .swiper-button-next {
            right: 10px;
          }

          .hero-showcase-slider .swiper-button-prev {
            left: 10px;
          }
        }

        @media (max-width: 639px) {
          .hero-showcase-slider .swiper-button-next,
          .hero-showcase-slider .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSlider
