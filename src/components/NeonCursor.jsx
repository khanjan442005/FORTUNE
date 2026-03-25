import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  "select",
  "summary",
  "label",
  ".enemy",
  ".neon-button",
  ".outline-button",
  ".logo-3d",
  ".skip-text",
  "[data-cursor='interactive']",
].join(", ");

const TRAIL_LIMIT = 10;
const TRAIL_INTERVAL = 22;
const CLICK_PARTICLES = 10;
const CLICK_LIFETIME = 520;

const palettes = {
  default: {
    primary: "#22d3ee",
    secondary: "#60a5fa",
    glow: "rgba(34, 211, 238, 0.38)",
    fill: "rgba(34, 211, 238, 0.14)",
  },
  interactive: {
    primary: "#67e8f9",
    secondary: "#c084fc",
    glow: "rgba(103, 232, 249, 0.42)",
    fill: "rgba(103, 232, 249, 0.16)",
  },
  enemy: {
    primary: "#fb7185",
    secondary: "#f97316",
    glow: "rgba(251, 113, 133, 0.42)",
    fill: "rgba(251, 113, 133, 0.15)",
  },
};

function getPalette(mode) {
  return palettes[mode] ?? palettes.default;
}

function getRectData(element) {
  if (!(element instanceof Element)) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  const styles = window.getComputedStyle(element);
  const radii = [
    parseFloat(styles.borderTopLeftRadius),
    parseFloat(styles.borderTopRightRadius),
    parseFloat(styles.borderBottomRightRadius),
    parseFloat(styles.borderBottomLeftRadius),
  ].filter((value) => Number.isFinite(value));
  const radius = radii.length > 0 ? Math.max(...radii) : 16;
  const padding = element.closest(".enemy") ? 10 : 6;

  return {
    x: rect.left - padding,
    y: rect.top - padding,
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
    radius: radius + padding,
  };
}

function createBurst(x, y, mode) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    id,
    x,
    y,
    mode,
    particles: Array.from({ length: CLICK_PARTICLES }, (_, index) => {
      const angle = (index / CLICK_PARTICLES) * Math.PI * 2;
      const distance = 22 + (index % 3) * 10;

      return {
        id: `${id}-${index}`,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: index % 2 === 0 ? 5 : 3,
      };
    }),
  };
}

const GamingCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState("default");
  const [hoverRect, setHoverRect] = useState(null);
  const [trail, setTrail] = useState([]);
  const [bursts, setBursts] = useState([]);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const coreX = useSpring(pointerX, { stiffness: 900, damping: 42, mass: 0.16 });
  const coreY = useSpring(pointerY, { stiffness: 900, damping: 42, mass: 0.16 });
  const auraX = useSpring(pointerX, { stiffness: 280, damping: 28, mass: 0.7 });
  const auraY = useSpring(pointerY, { stiffness: 280, damping: 28, mass: 0.7 });
  const scopeX = useSpring(pointerX, { stiffness: 180, damping: 24, mass: 0.95 });
  const scopeY = useSpring(pointerY, { stiffness: 180, damping: 24, mass: 0.95 });

  const pointerRef = useRef({ x: -100, y: -100 });
  const modeRef = useRef("default");
  const activeElementRef = useRef(null);
  const lastTrailTimeRef = useRef(0);
  const burstTimersRef = useRef([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const syncEnabled = () => setEnabled(mediaQuery.matches);

    syncEnabled();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncEnabled);
      return () => mediaQuery.removeEventListener("change", syncEnabled);
    }

    mediaQuery.addListener(syncEnabled);
    return () => mediaQuery.removeListener(syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlCursor = html.style.getPropertyValue("cursor");
    const previousHtmlPriority = html.style.getPropertyPriority("cursor");
    const previousBodyCursor = body.style.getPropertyValue("cursor");
    const previousBodyPriority = body.style.getPropertyPriority("cursor");

    const updateHoverState = (target) => {
      if (!(target instanceof Element)) {
        activeElementRef.current = null;
        modeRef.current = "default";
        setMode("default");
        setHoverRect(null);
        return;
      }

      const enemyElement = target.closest(".enemy");
      const interactiveElement = enemyElement ?? target.closest(INTERACTIVE_SELECTOR);
      const nextMode = enemyElement
        ? "enemy"
        : interactiveElement
          ? "interactive"
          : "default";

      if (modeRef.current !== nextMode) {
        modeRef.current = nextMode;
        setMode(nextMode);
      }

      if (activeElementRef.current !== interactiveElement) {
        activeElementRef.current = interactiveElement;
        setHoverRect(interactiveElement ? getRectData(interactiveElement) : null);
      }
    };

    const refreshHoverRect = () => {
      if (!activeElementRef.current || !activeElementRef.current.isConnected) {
        activeElementRef.current = null;
        setHoverRect(null);
        return;
      }

      setHoverRect(getRectData(activeElementRef.current));
    };

    const handleMove = (event) => {
      const { clientX, clientY, target } = event;

      pointerRef.current = { x: clientX, y: clientY };
      pointerX.set(clientX);
      pointerY.set(clientY);
      setVisible(true);
      updateHoverState(target);

      const now = performance.now();
      if (now - lastTrailTimeRef.current >= TRAIL_INTERVAL) {
        lastTrailTimeRef.current = now;
        setTrail((previous) => [
          ...previous.slice(-(TRAIL_LIMIT - 1)),
          { id: now, x: clientX, y: clientY },
        ]);
      }
    };

    const handleMouseDown = (event) => {
      const x = typeof event.clientX === "number" ? event.clientX : pointerRef.current.x;
      const y = typeof event.clientY === "number" ? event.clientY : pointerRef.current.y;
      const burst = createBurst(x, y, modeRef.current);

      setPressed(true);
      setBursts((previous) => [...previous, burst]);

      const timerId = window.setTimeout(() => {
        setBursts((previous) => previous.filter((item) => item.id !== burst.id));
        burstTimersRef.current = burstTimersRef.current.filter((item) => item !== timerId);
      }, CLICK_LIFETIME);

      burstTimersRef.current.push(timerId);
    };

    const handleMouseUp = () => {
      setPressed(false);
    };

    const handleMouseOver = (event) => {
      updateHoverState(event.target);
    };

    const resetCursorState = () => {
      activeElementRef.current = null;
      modeRef.current = "default";
      setMode("default");
      setHoverRect(null);
      setPressed(false);
      setVisible(false);
      setTrail([]);
    };

    html.classList.add("custom-cursor-active");
    html.style.setProperty("cursor", "none", "important");
    body.style.setProperty("cursor", "none", "important");

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", resetCursorState);
    window.addEventListener("blur", resetCursorState);
    window.addEventListener("scroll", refreshHoverRect, true);
    window.addEventListener("resize", refreshHoverRect);

    return () => {
      html.classList.remove("custom-cursor-active");

      if (previousHtmlCursor) {
        html.style.setProperty("cursor", previousHtmlCursor, previousHtmlPriority);
      } else {
        html.style.removeProperty("cursor");
      }

      if (previousBodyCursor) {
        body.style.setProperty("cursor", previousBodyCursor, previousBodyPriority);
      } else {
        body.style.removeProperty("cursor");
      }

      burstTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      burstTimersRef.current = [];

      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", resetCursorState);
      window.removeEventListener("blur", resetCursorState);
      window.removeEventListener("scroll", refreshHoverRect, true);
      window.removeEventListener("resize", refreshHoverRect);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) {
    return null;
  }

  const palette = getPalette(mode);
  const coreSize = mode === "enemy" ? 56 : mode === "interactive" ? 36 : pressed ? 24 : 20;
  const auraSize = mode === "enemy" ? 120 : mode === "interactive" ? 82 : pressed ? 68 : 58;
  const centerDotSize = mode === "enemy" ? 8 : 6;

  return (
    <>
      <AnimatePresence>
        {hoverRect && (
          <motion.div
            key={`${hoverRect.x}-${hoverRect.y}-${hoverRect.width}-${hoverRect.height}-${mode}`}
            style={{
              position: "fixed",
              top: hoverRect.y,
              left: hoverRect.x,
              width: hoverRect.width,
              height: hoverRect.height,
              borderRadius: hoverRect.radius,
              border: `1px solid ${palette.primary}`,
              background:
                mode === "enemy"
                  ? "linear-gradient(135deg, rgba(251, 113, 133, 0.1), rgba(249, 115, 22, 0.05))"
                  : "linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(192, 132, 252, 0.04))",
              boxShadow: `0 0 0 1px ${palette.fill}, 0 0 24px ${palette.glow}`,
              pointerEvents: "none",
              zIndex: 9997,
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {trail.map((point, index) => {
        const strength = (index + 1) / trail.length;

        return (
          <motion.div
            key={point.id}
            style={{
              position: "fixed",
              top: point.y,
              left: point.x,
              width: 6 + strength * 10,
              height: 6 + strength * 10,
              borderRadius: "999px",
              background: `radial-gradient(circle, ${palette.primary} 0%, transparent 72%)`,
              boxShadow: `0 0 ${10 + strength * 18}px ${palette.glow}`,
              opacity: 0.18 + strength * 0.4,
              pointerEvents: "none",
              zIndex: 9998,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{ scale: pressed ? 1.08 : 1 }}
            transition={{ duration: 0.15 }}
          />
        );
      })}

      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: auraSize,
          height: auraSize,
          borderRadius: "999px",
          background:
            mode === "enemy"
              ? `radial-gradient(circle, rgba(251, 113, 133, 0.2) 0%, rgba(249, 115, 22, 0.08) 40%, transparent 72%)`
              : `radial-gradient(circle, ${palette.fill} 0%, transparent 72%)`,
          border: `1px solid ${palette.fill}`,
          boxShadow: `0 0 35px ${palette.glow}`,
          pointerEvents: "none",
          zIndex: 9998,
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: pressed ? 0.92 : mode === "interactive" ? 1.08 : 1,
        }}
        transition={{ duration: 0.16 }}
      />

      {mode === "enemy" && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 152,
            height: 152,
            borderRadius: "999px",
            border: `1px solid ${palette.primary}`,
            boxShadow: `0 0 40px ${palette.glow}`,
            pointerEvents: "none",
            zIndex: 9998,
            x: scopeX,
            y: scopeY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: visible ? 0.9 : 0,
          }}
          animate={{ scale: pressed ? 0.94 : 1, rotate: pressed ? 8 : 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            style={{
              position: "absolute",
              inset: "50% auto auto 50%",
              width: 1,
              height: 152,
              background: `linear-gradient(180deg, transparent, ${palette.primary}, transparent)`,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "50% auto auto 50%",
              width: 152,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${palette.primary}, transparent)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      )}

      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: coreSize,
          height: coreSize,
          borderRadius: "999px",
          border: `1.5px solid ${palette.primary}`,
          background: `radial-gradient(circle, ${palette.fill} 0%, transparent 74%)`,
          boxShadow: `0 0 22px ${palette.glow}, inset 0 0 14px ${palette.fill}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10000,
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: pressed ? 0.82 : mode === "interactive" ? 1.12 : 1,
          rotate: pressed ? 16 : 0,
        }}
        transition={{ duration: 0.14 }}
      >
        <motion.div
          style={{
            width: centerDotSize,
            height: centerDotSize,
            borderRadius: "999px",
            background: palette.primary,
            boxShadow: `0 0 12px ${palette.primary}, 0 0 24px ${palette.glow}`,
          }}
          animate={{
            scale: pressed ? 1.5 : mode === "interactive" ? 1.18 : 1,
          }}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
        />
      </motion.div>

      <AnimatePresence>
        {bursts.map((burst) => {
          const burstPalette = getPalette(burst.mode);

          return (
            <motion.div
              key={burst.id}
              style={{
                position: "fixed",
                top: burst.y,
                left: burst.x,
                pointerEvents: "none",
                zIndex: 10001,
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: 16,
                  height: 16,
                  borderRadius: "999px",
                  border: `1px solid ${burstPalette.primary}`,
                  boxShadow: `0 0 18px ${burstPalette.glow}`,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                initial={{ scale: 0.4, opacity: 0.85 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              {burst.particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: particle.size,
                    height: particle.size,
                    borderRadius: "999px",
                    background: burstPalette.primary,
                    boxShadow: `0 0 12px ${burstPalette.primary}`,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    opacity: 0,
                    scale: 0.2,
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              ))}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default GamingCursor;
