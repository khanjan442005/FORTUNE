import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import PageHero from "../components/PageHero"
import PageShell from "../components/PageShell"
import Gallery from "../components/Gallery"
import Footer from "../components/Footer"
import { sectionIds } from "../data/sectionLinks"

const featuredProjects = [
  { title: "Luxury Villa - Ahmedabad", type: "Residential", items: "24 Windows + 6 Doors", desc: "Full home transformation with premium sliding and casement windows paired with French doors for seamless indoor-outdoor living." },
  { title: "Corporate Office - Mumbai", type: "Commercial", items: "50+ Curtain Walls", desc: "Modern glass facade with energy-efficient double-glazed curtain wall system for a Class-A commercial building." },
  { title: "Heritage Resort - Udaipur", type: "Hospitality", items: "100+ Windows", desc: "Custom-designed arched and bay windows that blend heritage aesthetics with modern thermal performance." },
]

const projectStats = [
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Cities Served" },
  { value: "50K+", label: "Windows Installed" },
  { value: "10K+", label: "Doors Installed" },
]

function GalleryPage({ embedded = false }) {
  const content = (
    <div className={embedded ? "" : "pt-20"}>
        <PageHero
          badge="Our Work"
          title="Project"
          titleAccent="Gallery"
          description="Explore our portfolio of stunning installations across residential, commercial, and hospitality projects throughout India."
          stats={[
            { value: "500+", label: "Projects Delivered" },
            { value: "15+", label: "Cities Served" },
            { value: "50K+", label: "Units Installed" },
          ]}
        />

          {/* Stats */}
          <section className="py-16 relative">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {projectStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="fx-panel rounded-2xl p-6 text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Gallery />

          {/* Featured Projects */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Featured </span><span className="gradient-text">Projects</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">A closer look at some of our landmark projects that showcase our capabilities.</p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="fx-panel rounded-2xl p-8 group"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-semibold">{project.type}</span>
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full font-semibold">{project.items}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
      </div>
  )

  if (embedded) {
    return (
      <section
        id={sectionIds.gallery}
        className="relative min-h-screen scroll-mt-28 py-6 md:scroll-mt-32 md:py-10"
      >
        {content}
      </section>
    )
  }

  return (
    <PageShell tone="emerald">
      <Navbar />
      {content}
      <Footer />
    </PageShell>
  )
}

export default GalleryPage
