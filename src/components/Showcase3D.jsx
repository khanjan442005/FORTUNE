import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  MeshTransmissionMaterial,
  OrbitControls,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useInView } from "../hooks/useInView";

const finishes = [
  {
    name: "Dark Slate",
    color: "#1e293b",
    frame: "#1e293b",
    trim: "#334155",
    glass: "#d9f7ff",
    glow: "#22d3ee",
    thermal: "#4f46e5",
    handle: "#cbd5f5",
  },
  {
    name: "Arctic White",
    color: "#f8fafc",
    frame: "#f8fafc",
    trim: "#cbd5e1",
    glass: "#ecfeff",
    glow: "#67e8f9",
    thermal: "#2563eb",
    handle: "#0f172a",
  },
  {
    name: "Midnight Blue",
    color: "#1e3a5f",
    frame: "#1e3a5f",
    trim: "#31577f",
    glass: "#dbeafe",
    glow: "#38bdf8",
    thermal: "#1d4ed8",
    handle: "#e2e8f0",
  },
  {
    name: "Charcoal",
    color: "#374151",
    frame: "#374151",
    trim: "#4b5563",
    glass: "#e0f2fe",
    glow: "#14b8a6",
    thermal: "#0f766e",
    handle: "#e5e7eb",
  },
  {
    name: "Titanium",
    color: "#64748b",
    frame: "#64748b",
    trim: "#94a3b8",
    glass: "#eff6ff",
    glow: "#93c5fd",
    thermal: "#475569",
    handle: "#f8fafc",
  },
  {
    name: "Royal Gold",
    color: "#d97706",
    frame: "#d97706",
    trim: "#f59e0b",
    glass: "#fff7ed",
    glow: "#fbbf24",
    thermal: "#ea580c",
    handle: "#fff7ed",
  },
];

const premiumFeatures = [
  {
    key: "locking",
    icon: "🔒",
    title: "Multi-point Locking",
    desc: "Advanced security system",
  },
  {
    key: "precision",
    icon: "🎯",
    title: "Precision Engineering",
    desc: "Perfect fit every time",
  },
  {
    key: "glass",
    icon: "💎",
    title: "Premium Glass",
    desc: "Double/triple glazed options",
  },
  {
    key: "thermal",
    icon: "🌡️",
    title: "Thermal Break",
    desc: "Superior insulation",
  },
];

const AUTO_PREVIEW_DELAY = 2600;

const featureCameraViews = {
  locking: {
    position: [3.4, 0.2, 6.3],
    target: [1.55, 0.15, 0.2],
  },
  precision: {
    position: [-3.1, 0.4, 6.5],
    target: [-0.6, 0.15, 0.16],
  },
  glass: {
    position: [0, 0.05, 5.4],
    target: [0, 0.05, 0.18],
  },
  thermal: {
    position: [0, -2.3, 6.2],
    target: [0, -1.75, 0.08],
  },
};

function FeatureCameraDirector({ activeFeature, focusRequest, controlsRef }) {
  const desiredPositionRef = useRef(new THREE.Vector3(0, 0.15, 9));
  const desiredTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimatingRef = useRef(true);

  useEffect(() => {
    const view = featureCameraViews[activeFeature];

    if (!view) {
      return;
    }

    desiredPositionRef.current.set(...view.position);
    desiredTargetRef.current.set(...view.target);
    isAnimatingRef.current = true;
  }, [activeFeature, focusRequest]);

  useFrame(({ camera }, delta) => {
    if (!isAnimatingRef.current) {
      return;
    }

    const cameraAlpha = 1 - Math.exp(-delta * 5.5);
    const targetAlpha = 1 - Math.exp(-delta * 6.5);

    camera.position.lerp(desiredPositionRef.current, cameraAlpha);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(desiredTargetRef.current, targetAlpha);
      controlsRef.current.update();
    } else {
      camera.lookAt(desiredTargetRef.current);
    }

    const cameraReady =
      camera.position.distanceToSquared(desiredPositionRef.current) < 0.01;
    const targetReady = controlsRef.current
      ? controlsRef.current.target.distanceToSquared(desiredTargetRef.current) < 0.01
      : true;

    if (cameraReady && targetReady) {
      isAnimatingRef.current = false;
    }
  });

  return null;
}

function Window3DModel({ finish, activeFeature, autoSpin }) {
  const groupRef = useRef();
  const frameMaterialRef = useRef();
  const trimMaterialRef = useRef();
  const handleMaterialRef = useRef();
  const lockRefs = useRef([]);
  const thermalRefs = useRef([]);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const pulse = (Math.sin(elapsed * 2.4) + 1) / 2;

    if (groupRef.current) {
      if (autoSpin) {
        groupRef.current.rotation.y = Math.sin(elapsed * 0.45) * 0.28;
      }
      groupRef.current.rotation.x = Math.cos(elapsed * 0.3) * 0.04;
      groupRef.current.position.y = Math.sin(elapsed * 0.7) * 0.05;
    }

    if (frameMaterialRef.current) {
      frameMaterialRef.current.emissiveIntensity =
        0.08 + pulse * 0.08 + (activeFeature === "precision" ? 0.12 : 0);
    }

    if (trimMaterialRef.current) {
      trimMaterialRef.current.emissiveIntensity =
        0.03 + pulse * 0.05 + (activeFeature === "precision" ? 0.16 : 0);
    }

    if (handleMaterialRef.current) {
      handleMaterialRef.current.emissiveIntensity =
        0.04 + pulse * 0.06 + (activeFeature === "locking" ? 0.24 : 0);
    }

    lockRefs.current.forEach((lock) => {
      if (lock?.material) {
        lock.material.emissiveIntensity =
          activeFeature === "locking" ? 0.18 + pulse * 0.26 : 0.02;
      }
    });

    thermalRefs.current.forEach((strip) => {
      if (strip?.material) {
        strip.material.emissiveIntensity =
          activeFeature === "thermal" ? 0.18 + pulse * 0.2 : 0.02;
      }
    });
  });

  const glassColor = activeFeature === "glass" ? "#ffffff" : finish.glass;
  const thermalColor = activeFeature === "thermal" ? "#fb923c" : finish.thermal;
  const trimColor = activeFeature === "precision" ? "#a5f3fc" : finish.trim;
  const lockColor = activeFeature === "locking" ? "#f8fafc" : finish.handle;

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.18}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.2, 5.3, 0.18]} />
          <meshStandardMaterial
            ref={frameMaterialRef}
            color={finish.frame}
            metalness={0.82}
            roughness={0.16}
            emissive={finish.glow}
            emissiveIntensity={0.08}
          />
        </mesh>

        <mesh position={[0, 0, 0.13]} castShadow receiveShadow>
          <boxGeometry args={[3.74, 4.84, 0.08]} />
          <meshStandardMaterial
            ref={trimMaterialRef}
            color={trimColor}
            metalness={0.68}
            roughness={0.22}
            emissive={finish.glow}
            emissiveIntensity={0.03}
          />
        </mesh>

        <mesh position={[0, 0, 0.19]}>
          <boxGeometry args={[3.24, 4.34, 0.06]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.18}
            chromaticAberration={activeFeature === "glass" ? 0.08 : 0.03}
            anisotropy={0.2}
            distortion={0.08}
            distortionScale={0.12}
            temporalDistortion={0.08}
            transmission={0.95}
            ior={1.15}
            roughness={0.03}
            color={glassColor}
          />
        </mesh>

        <mesh position={[0, 0, 0.22]} castShadow>
          <boxGeometry args={[0.12, 4.38, 0.08]} />
          <meshStandardMaterial
            color={trimColor}
            metalness={0.66}
            roughness={0.2}
            emissive={finish.glow}
            emissiveIntensity={activeFeature === "precision" ? 0.1 : 0.03}
          />
        </mesh>

        <mesh position={[0, 0, 0.22]} castShadow>
          <boxGeometry args={[3.28, 0.12, 0.08]} />
          <meshStandardMaterial
            color={trimColor}
            metalness={0.66}
            roughness={0.2}
            emissive={finish.glow}
            emissiveIntensity={activeFeature === "precision" ? 0.1 : 0.03}
          />
        </mesh>

        {[-1.42, 0, 1.42].map((y, index) => (
          <mesh
            key={`lock-${y}`}
            ref={(node) => {
              lockRefs.current[index] = node;
            }}
            position={[1.92, y, 0.18]}
            castShadow
          >
            <boxGeometry args={[0.16, 0.28, 0.1]} />
            <meshStandardMaterial
              color={lockColor}
              metalness={0.9}
              roughness={0.18}
              emissive={finish.glow}
              emissiveIntensity={0.02}
            />
          </mesh>
        ))}

        {[
          [0, -2.08, 0.08, 3.56, 0.12],
          [-1.76, 0, 4.16, 0.1, 0.12],
          [1.76, 0, 4.16, 0.1, 0.12],
        ].map(([x, y, height, width, depth], index) => (
          <mesh
            key={`thermal-${index}`}
            ref={(node) => {
              thermalRefs.current[index] = node;
            }}
            position={[x, y, 0.05]}
            castShadow
          >
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial
              color={thermalColor}
              metalness={0.34}
              roughness={0.44}
              emissive={thermalColor}
              emissiveIntensity={0.02}
            />
          </mesh>
        ))}

        <mesh position={[1.58, 0.16, 0.28]} castShadow>
          <boxGeometry args={[0.14, 0.78, 0.12]} />
          <meshStandardMaterial
            ref={handleMaterialRef}
            color={lockColor}
            metalness={0.92}
            roughness={0.16}
            emissive={finish.glow}
            emissiveIntensity={0.04}
          />
        </mesh>

        <mesh position={[1.42, 0.16, 0.34]} castShadow>
          <boxGeometry args={[0.36, 0.12, 0.12]} />
          <meshStandardMaterial
            color={lockColor}
            metalness={0.92}
            roughness={0.16}
            emissive={finish.glow}
            emissiveIntensity={activeFeature === "locking" ? 0.16 : 0.03}
          />
        </mesh>

        <mesh position={[0, 0, -0.16]} receiveShadow>
          <planeGeometry args={[3.6, 4.6]} />
          <meshStandardMaterial color={finish.glow} emissive={finish.glow} emissiveIntensity={0.08} transparent opacity={0.08} />
        </mesh>
      </group>
    </Float>
  );
}

function ColorOption({ item, isSelected, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      aria-label={item.name}
      className={`group flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4 transition-all ${
        isSelected ? "shadow-[0_0_30px_rgba(34,211,238,0.18)]" : "hover:bg-white/[0.04]"
      }`}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border-4 transition-all ${
          isSelected ? "border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.65)]" : "border-slate-600"
        }`}
        style={{ backgroundColor: item.color }}
      />
      <span className={`text-sm ${isSelected ? "text-white" : "text-gray-400"}`}>{item.name}</span>
    </motion.button>
  );
}

function FeatureCard({ feature, isActive, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseEnter={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      className={`flex w-full items-center gap-4 rounded-2xl border px-6 py-5 text-left transition-all ${
        isActive
          ? "border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
          : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/[0.07]"
      }`}
    >
      <span className="text-3xl">{feature.icon}</span>
      <span>
        <span className="block text-xl font-semibold text-white">{feature.title}</span>
        <span className="block text-sm text-gray-400">{feature.desc}</span>
      </span>
    </motion.button>
  );
}

function Showcase3D() {
  const [selectedFinish, setSelectedFinish] = useState(finishes[1]);
  const [activeFeature, setActiveFeature] = useState(premiumFeatures[0].key);
  const [sceneReady, setSceneReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [focusRequest, setFocusRequest] = useState(0);
  const controlsRef = useRef(null);
  const [showcaseRef, isShowcaseInView] = useInView({
    threshold: 0.15,
    rootMargin: "220px 0px",
    triggerOnce: true,
  });

  const selectFeature = (featureKey, manual = true) => {
    setActiveFeature(featureKey);
    setFocusRequest((value) => value + 1);

    if (manual) {
      setHasInteracted(true);
    }
  };

  useEffect(() => {
    if (hasInteracted) {
      return undefined;
    }

    const featureKeys = premiumFeatures.map((feature) => feature.key);
    const intervalId = window.setInterval(() => {
      setActiveFeature((currentFeature) => {
        const currentIndex = featureKeys.indexOf(currentFeature);
        const nextFeature = featureKeys[(currentIndex + 1) % featureKeys.length];
        return nextFeature;
      });
      setFocusRequest((value) => value + 1);
    }, AUTO_PREVIEW_DELAY);

    return () => window.clearInterval(intervalId);
  }, [hasInteracted]);

  const handleCustomize = () => {
    const target = document.querySelector("#contact");

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="showcase"
      ref={showcaseRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#030712] py-24"
    >
      <div className="absolute inset-0 hex-pattern opacity-30"></div>
      <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[200px]"></div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400"
          >
            3D Interactive Showcase
          </motion.span>
          <h2 className="mb-4 text-5xl font-bold md:text-6xl">
            <span className="text-white">Experience </span>
            <span className="gradient-text">In 3D</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Rotate the model, switch finishes, and tap each premium feature to highlight it on the live preview.
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[620px] overflow-hidden rounded-[2rem] border border-white/8 bg-slate-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_120px_rgba(2,8,23,0.8)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_28%)]" />
            <div className="absolute left-6 top-6 z-20 rounded-full border border-cyan-400/20 bg-slate-900/70 px-4 py-2 text-sm text-cyan-200 backdrop-blur">
              Selected Finish: {selectedFinish.name}
            </div>
            <div className="absolute right-6 top-6 z-20 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-400 backdrop-blur">
              {premiumFeatures.find((feature) => feature.key === activeFeature)?.title}
            </div>

            {isShowcaseInView && (
              <Canvas
                shadows
                dpr={[1, 1.75]}
                camera={{ position: [0, 0.15, 9], fov: 34 }}
                gl={{ antialias: true, alpha: true }}
                onCreated={({ gl }) => {
                  gl.setClearColor("#08111f", 0);
                  setSceneReady(true);
                }}
              >
                <ambientLight intensity={0.65} />
                <directionalLight
                  castShadow
                  position={[4, 5, 5]}
                  intensity={1.8}
                  color="#ffffff"
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <pointLight position={[-4, 2, 4]} intensity={1.1} color={selectedFinish.glow} />
                <pointLight position={[0, -2, 3]} intensity={0.5} color="#93c5fd" />

                <Suspense fallback={null}>
                  <Stars radius={18} depth={14} count={80} factor={2.4} saturation={0} fade speed={0.8} />
                  <Sparkles
                    count={28}
                    size={5}
                    scale={[8, 5, 3]}
                    speed={0.35}
                    color={selectedFinish.glow}
                  />
                  <Window3DModel
                    finish={selectedFinish}
                    activeFeature={activeFeature}
                    autoSpin={!hasInteracted}
                  />
                  <FeatureCameraDirector
                    activeFeature={activeFeature}
                    focusRequest={focusRequest}
                    controlsRef={controlsRef}
                  />
                  <Environment preset="city" />
                </Suspense>

                <ContactShadows
                  position={[0, -3.3, 0]}
                  opacity={0.45}
                  scale={10}
                  blur={2.8}
                  far={5}
                  color={selectedFinish.glow}
                />

                <OrbitControls
                  ref={controlsRef}
                  enablePan={false}
                  enableZoom
                  enableDamping
                  dampingFactor={0.08}
                  minDistance={6.4}
                  maxDistance={10.5}
                  minPolarAngle={Math.PI / 2.5}
                  maxPolarAngle={Math.PI / 1.7}
                  onStart={() => setHasInteracted(true)}
                />
              </Canvas>
            )}

            <motion.div
              initial={false}
              animate={{ opacity: isShowcaseInView && sceneReady ? 0 : 1 }}
              transition={{ duration: 0.45 }}
              className={`absolute inset-0 flex items-center justify-center bg-[#030712] ${
                isShowcaseInView && sceneReady ? "pointer-events-none" : ""
              }`}
            >
              <div className="loading-spinner"></div>
            </motion.div>

            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
              <div className="glass rounded-full px-5 py-3">
                <span className="text-xs text-gray-400">Drag to rotate • Scroll to zoom</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass rounded-[2rem] border border-white/8 p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-white">Choose Your Color</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
                  {selectedFinish.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {finishes.map((finish) => (
                  <ColorOption
                    key={finish.name}
                    item={finish}
                    isSelected={selectedFinish.name === finish.name}
                    onClick={() => {
                      setSelectedFinish(finish);
                      setHasInteracted(true);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="glass rounded-[2rem] border border-white/8 p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-white">Premium Features</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    {hasInteracted ? "Manual preview" : "Auto demo active"}
                  </span>
                  {hasInteracted && (
                    <button
                      type="button"
                      onClick={() => {
                        setHasInteracted(false);
                        setFocusRequest((value) => value + 1);
                      }}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/15"
                    >
                      Resume Demo
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                {premiumFeatures.map((feature) => (
                  <FeatureCard
                    key={feature.key}
                    feature={feature}
                    isActive={activeFeature === feature.key}
                    onSelect={() => selectFeature(feature.key)}
                  />
                ))}
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0, 240, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCustomize}
              className="w-full neon-button"
            >
              <span>Customize Your Window</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Showcase3D;
