import { useRef, Suspense, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Float, MeshTransmissionMaterial } from "@react-three/drei"
import { motion } from "framer-motion"

function Window3DModel({ color }) {
  const groupRef = useRef()
  const frameRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
    if (frameRef.current) {
      frameRef.current.material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.5, 4.5, 0.15]} />
          <meshStandardMaterial 
            ref={frameRef}
            color={color} 
            metalness={0.9} 
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Glass Pane - Main */}
        <mesh position={[0, 0.1, 0.1]}>
          <boxGeometry args={[3, 4, 0.02]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.1}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            transmission={0.95}
            ior={1.5}
            color="#e0f2fe"
          />
        </mesh>
        
        {/* Horizontal Divider */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[3.2, 0.08, 0.05]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Vertical Divider */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[0.08, 4.2, 0.05]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Top Frame */}
        <mesh position={[0, 2.3, 0]}>
          <boxGeometry args={[3.7, 0.2, 0.2]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Bottom Frame */}
        <mesh position={[0, -2.3, 0]}>
          <boxGeometry args={[3.7, 0.2, 0.2]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Left Frame */}
        <mesh position={[-1.75, 0, 0]}>
          <boxGeometry args={[0.2, 4.7, 0.2]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Right Frame */}
        <mesh position={[1.75, 0, 0]}>
          <boxGeometry args={[0.2, 4.7, 0.2]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Glow Lights */}
        <pointLight position={[0, 0, 2]} intensity={1} color="#00f0ff" distance={5} />
      </group>
    </Float>
  )
}

function ColorOption({ color, isSelected, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`w-12 h-12 rounded-full border-4 transition-all ${
        isSelected 
          ? 'border-cyan-400 shadow-lg shadow-cyan-400/50' 
          : 'border-gray-700 hover:border-gray-500'
      }`}
      style={{ backgroundColor: color }}
    />
  )
}

function Showcase3D() {
  const [selectedColor, setSelectedColor] = useState("#1e293b")

  const colors = [
    { name: "Dark Slate", color: "#1e293b" },
    { name: "Arctic White", color: "#f8fafc" },
    { name: "Midnight Blue", color: "#1e3a5f" },
    { name: "Charcoal", color: "#374151" },
    { name: "Titanium", color: "#64748b" },
    { name: "Royal Gold", color: "#b45309" }
  ]

  return (
    <section id="showcase" className="min-h-screen py-24 bg-[#030712] relative overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[200px]"></div>
      
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
            3D Interactive Showcase
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Experience </span>
            <span className="gradient-text">In 3D</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Interact with our premium window model. Rotate, zoom, and explore different color options
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Model */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[600px] glass rounded-3xl overflow-hidden"
          >
            {/* Canvas */}
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={0.3} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
              <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#00f0ff" />
              <pointLight position={[0, 0, 5]} intensity={0.5} color="#00f0ff" />
              
              <Suspense fallback={null}>
                <Window3DModel color={selectedColor} />
              </Suspense>
              
              <ContactShadows
                position={[0, -3, 0]}
                opacity={0.5}
                scale={10}
                blur={2}
                far={4}
                color="#00f0ff"
              />
              
              <Environment preset="city" />
              
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={12}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
            
            {/* Loading Overlay */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute inset-0 bg-[#030712] flex items-center justify-center"
            >
              <div className="loading-spinner"></div>
            </motion.div>
            
            {/* Instructions */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-xs text-gray-400">
                  🖱️ Drag to rotate • Scroll to zoom
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Color Options */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Choose Your Color</h3>
              <div className="grid grid-cols-3 gap-4">
                {colors.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ColorOption
                      color={item.color}
                      isSelected={selectedColor === item.color}
                      onClick={() => setSelectedColor(item.color)}
                    />
                    <p className="text-center text-sm text-gray-400 mt-2">{item.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Features */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Premium Features</h3>
              <div className="space-y-4">
                {[
                  { icon: "🔒", title: "Multi-point Locking", desc: "Advanced security system" },
                  { icon: "🎯", title: "Precision Engineering", desc: "Perfect fit every time" },
                  { icon: "💎", title: "Premium Glass", desc: "Double/triple glazed options" },
                  { icon: "🌡️", title: "Thermal Break", desc: "Superior insulation" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0, 240, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full neon-button"
            >
              <span>Customize Your Window</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Showcase3D
