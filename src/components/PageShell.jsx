import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const toneMap = {
  cyan: {
    primary: "34, 211, 238",
    secondary: "59, 130, 246",
    tertiary: "168, 85, 247",
  },
  violet: {
    primary: "125, 211, 252",
    secondary: "99, 102, 241",
    tertiary: "217, 70, 239",
  },
  emerald: {
    primary: "16, 185, 129",
    secondary: "34, 197, 94",
    tertiary: "56, 189, 248",
  },
};

function AmbientBackdrop({ tone = "cyan" }) {
  const palette = useMemo(() => toneMap[tone] || toneMap.cyan, [tone]);
  const [isInteractive, setIsInteractive] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useTransform(pointerX, [-0.5, 0.5], [-52, 52]);
  const driftY = useTransform(pointerY, [-0.5, 0.5], [-40, 40]);
  const reverseX = useTransform(pointerX, [-0.5, 0.5], [28, -28]);
  const reverseY = useTransform(pointerY, [-0.5, 0.5], [22, -22]);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateState = () => {
      setIsInteractive(pointerQuery.matches && !motionQuery.matches);
    };

    updateState();
    pointerQuery.addEventListener("change", updateState);
    motionQuery.addEventListener("change", updateState);

    return () => {
      pointerQuery.removeEventListener("change", updateState);
      motionQuery.removeEventListener("change", updateState);
    };
  }, []);

  useEffect(() => {
    if (!isInteractive) {
      pointerX.set(0);
      pointerY.set(0);
      return undefined;
    }

    const handlePointerMove = (event) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isInteractive, pointerX, pointerY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-24 top-12 h-[32rem] w-[32rem] rounded-full blur-[170px]"
        style={{
          x: driftX,
          y: driftY,
          background: `radial-gradient(circle, rgba(${palette.primary}, 0.22) 0%, rgba(${palette.primary}, 0.08) 38%, transparent 72%)`,
        }}
      />
      <motion.div
        className="absolute right-[-10rem] top-[18%] h-[34rem] w-[34rem] rounded-full blur-[185px]"
        style={{
          x: reverseX,
          y: reverseY,
          background: `radial-gradient(circle, rgba(${palette.secondary}, 0.18) 0%, rgba(${palette.secondary}, 0.06) 35%, transparent 74%)`,
        }}
      />
      <motion.div
        className="absolute bottom-[-12rem] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[210px]"
        style={{
          x: driftX,
          y: reverseY,
          background: `radial-gradient(circle, rgba(${palette.tertiary}, 0.15) 0%, rgba(${palette.tertiary}, 0.04) 35%, transparent 76%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(3,7,18,0.22),rgba(3,7,18,0.72)_45%,rgba(3,7,18,0.96))]" />
      <div className="absolute inset-0 opacity-[0.15] mix-blend-screen">
        <div className="absolute inset-0 grid-background" />
      </div>
      <div className="absolute inset-0 opacity-[0.05] noise-overlay" />
    </div>
  );
}

function PageShell({
  children,
  tone = "cyan",
  showProgress = true,
  className = "",
  contentClassName = "",
  animate = true,
}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.35,
  });

  return (
    <div className={`relative min-h-screen overflow-x-hidden bg-[#030712] ${className}`}>
      {showProgress && (
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      )}
      <AmbientBackdrop tone={tone} />
      <motion.div
        initial={animate ? { opacity: 0, y: 22 } : false}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 ${contentClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default PageShell;
