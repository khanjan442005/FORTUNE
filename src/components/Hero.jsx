import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls, MeshDistortMaterial, Environment, Stars } from "@react-three/drei"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function WindowModel() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} scale={1.5}>
        {/* Main Window Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 4, 0.1]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        
        {/* Glass Pane */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.6, 3.6, 0.02]} />
          <meshPhysicalMaterial 
            color="#0ea5e9"
            metalness={0.1}
            roughness={0}
            transmission={0.9}
            thickness={0.5}
            envMapIntensity={1}
          />
        </mesh>
        
        {/* Window Frame - Top */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[3.2, 0.2, 0.15]} />
          <meshStandardMaterial 
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Window Frame - Bottom */}
        <mesh position={[0, -2, 0]}>
          <boxGeometry args={[3.2, 0.2, 0.15]} />
          <meshStandardMaterial 
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Window Frame - Left */}
        <mesh position={[-1.5, 0, 0]}>
          <boxGeometry args={[0.2, 4, 0.15]} />
          <meshStandardMaterial 
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Window Frame - Right */}
        <mesh position={[1.5, 0, 0]}>
          <boxGeometry args={[0.2, 4, 0.15]} />
          <meshStandardMaterial 
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Center Divider - Horizontal */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[0.05, 3.6, 0.02]} />
          <meshStandardMaterial 
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Center Divider - Vertical */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.6, 0.05, 0.02]} />
          <meshStandardMaterial 
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Glow Effect */}
        <pointLight position={[0, 0, 1]} intensity={2} color="#00f0ff" distance={5} />
      </group>
    </Float>
  )
}

function FloatingParticles() {
  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      // eslint-disable-next-line react-hooks/purity
      positions[i * 3] = (Math.random() - 0.5) * 20
      // eslint-disable-next-line react-hooks/purity
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      // eslint-disable-next-line react-hooks/purity
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Hero() {
  const heroContent = {
    subtitle: "Premium Windows & Doors",
    title: "Experience",
    titleGradient: "Perfection",
    description: "Transform your space with our cutting-edge windows and doors. Crafted with precision, designed for excellence, built to last.",
    stats: [
      { value: "500+", label: "Projects" },
      { value: "15+", label: "Years" },
      { value: "100%", label: "Satisfaction" },
      { value: "50+", label: "Awards" }
    ]
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-background"></div>
      <div className="absolute inset-0 hex-pattern"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"></div>
      
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <WindowModel />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          <FloatingParticles />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-400 text-sm font-medium">{heroContent.subtitle}</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-tight">
              <span className="text-white">{heroContent.title}</span>
              <br />
              <span className="gradient-text">{heroContent.titleGradient}</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed"
            >
              {heroContent.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 240, 255, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="neon-button"
                >
                  <span>Explore Products</span>
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="outline-button"
                >
                  <span>Get Quote</span>
                </motion.button>
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10"
            >
              {heroContent.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Side - Empty for 3D Model */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
