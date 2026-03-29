import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const TRAIL_LENGTH = 12;
const TRAIL_FADE_SPEED = 0.08;

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

const CLICK_PARTICLES = 8;
const CLICK_LIFETIME = 480;
const MAX_CURSOR_TEXT = 10;

const palettes = {
  default: {
    primary: "#22d3ee",
    secondary: "#0891b2",
    accent: "#ecfeff",
    fill: "rgba(34, 211, 238, 0.14)",
    edge: "rgba(165, 243, 252, 0.42)",
    glow: "rgba(34, 211, 238, 0.26)",
    textBg: "rgba(8, 15, 29, 0.88)",
    frame: "rgba(34, 211, 238, 0.12)",
  },
  interactive: {
    primary: "#f59e0b",
    secondary: "#f97316",
    accent: "#fff7ed",
    fill: "rgba(245, 158, 11, 0.14)",
    edge: "rgba(254, 215, 170, 0.42)",
    glow: "rgba(249, 115, 22, 0.26)",
    textBg: "rgba(67, 20, 7, 0.9)",
    frame: "rgba(249, 115, 22, 0.12)",
  },
  enemy: {
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fff1f2",
    fill: "rgba(239, 68, 68, 0.15)",
    edge: "rgba(254, 205, 211, 0.44)",
    glow: "rgba(244, 63, 94, 0.28)",
    textBg: "rgba(69, 10, 10, 0.92)",
    frame: "rgba(244, 63, 94, 0.13)",
  },
};

function getPalette(mode) {
  return palettes[mode] ?? palettes.default;
}

function getCursorText(element, mode) {
  if (!(element instanceof Element)) {
    return "";
  }

  if (mode === "enemy") {
    return element.getAttribute("data-cursor-text")?.trim() || "TARGET";
  }

  const explicitText =
    element.getAttribute("data-cursor-text") ||
    element.getAttribute("aria-label") ||
    element.getAttribute("title");

  const fallbackText =
    explicitText || element.textContent?.replace(/\s+/g, " ").trim() || "OPEN";

  return fallbackText.slice(0, MAX_CURSOR_TEXT).toUpperCase();
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

function applyMagnetic(element, x, y) {
  if (!(element instanceof Element)) {
    return { x, y };
  }

  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = x - centerX;
  const deltaY = y - centerY;
  const strength = element.closest(".enemy") ? 0.14 : 0.22;

  return {
    x: x - deltaX * strength,
    y: y - deltaY * strength,
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
      const distance = 18 + (index % 2) * 10;

      return {
        id: `${id}-${index}`,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotate: (angle * 180) / Math.PI,
        width: index % 2 === 0 ? 10 : 7,
        height: index % 2 === 0 ? 3 : 2,
      };
    }),
  };
}

function NeonCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [speed, setSpeed] = useState(0);
  const [hoverRect, setHoverRect] = useState(null);
  const [bursts, setBursts] = useState([]);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const coreX = useSpring(pointerX, { stiffness: 860, damping: 38, mass: 0.18 });
  const coreY = useSpring(pointerY, { stiffness: 860, damping: 38, mass: 0.18 });

  const pointerRef = useRef({ x: -100, y: -100 });
  const lastPositionRef = useRef({ x: -100, y: -100, time: 0 });
  const activeElementRef = useRef(null);
  const modeRef = useRef("default");
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
        setCursorText("");
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

      modeRef.current = nextMode;
      setMode(nextMode);
      setCursorText(
        interactiveElement ? getCursorText(interactiveElement, nextMode) : ""
      );

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
      const interactiveTarget =
        target instanceof Element
          ? target.closest(".enemy") ?? target.closest(INTERACTIVE_SELECTOR)
          : null;
      const magneticPosition = applyMagnetic(interactiveTarget, clientX, clientY);
      const now = performance.now();

      pointerRef.current = magneticPosition;
      pointerX.set(magneticPosition.x);
      pointerY.set(magneticPosition.y);
      setVisible(true);
      updateHoverState(target);

      if (lastPositionRef.current.time > 0) {
        const dx = clientX - lastPositionRef.current.x;
        const dy = clientY - lastPositionRef.current.y;
        const dt = Math.max(now - lastPositionRef.current.time, 1);
        const nextSpeed = Math.min(Math.sqrt(dx * dx + dy * dy) / dt, 4);

        setSpeed(nextSpeed);
      }

      lastPositionRef.current = { x: clientX, y: clientY, time: now };

      trailRef.current = [
        { x: magneticPosition.x, y: magneticPosition.y, id: now, opacity: 1 },
        ...trailRef.current.slice(0, TRAIL_LENGTH - 1).map((p) => ({
          ...p,
          opacity: Math.max(p.opacity - TRAIL_FADE_SPEED, 0),
        })),
      ].filter((p) => p.opacity > 0);
      setTrail([...trailRef.current]);
    };

    const handleMouseDown = () => {
      const burst = createBurst(
        pointerRef.current.x,
        pointerRef.current.y,
        modeRef.current
      );

      setPressed(true);
      setBursts((previous) => [...previous, burst]);

      const timerId = window.setTimeout(() => {
        setBursts((previous) => previous.filter((item) => item.id !== burst.id));
        burstTimersRef.current = burstTimersRef.current.filter(
          (item) => item !== timerId
        );
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
      setPressed(false);
      setVisible(false);
      setCursorText("");
      setSpeed(0);
      setHoverRect(null);
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
  const speedFactor = Math.min(speed, 2.2);
  const coreSize = mode === "enemy" ? 46 : mode === "interactive" ? 40 : 34;
  const ringInset = mode === "interactive" ? 3 : 4;
  const innerInset = mode === "interactive" ? 9 : 10;
  const primaryRingMask =
    "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))";
  const secondaryRingMask =
    "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))";

  return (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="cursor-trail-dot"
          style={{
            position: 'fixed',
            left: point.x - 2,
            top: point.y - 2,
            width: 4 - index * 0.25,
            height: 4 - index * 0.25,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${palette.primary}, transparent)`,
            boxShadow: `0 0 ${6 - index * 0.4}px ${palette.glow}`,
            opacity: point.opacity * 0.6,
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      ))}

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
              border: `1px solid ${palette.edge}`,
              background: `linear-gradient(135deg, ${palette.frame}, transparent 60%)`,
              boxShadow: `0 0 0 1px ${palette.fill}, 0 0 26px ${palette.glow}`,
              pointerEvents: "none",
              zIndex: 9997,
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 6,
                borderRadius: Math.max(hoverRect.radius - 6, 10),
                border: `1px dashed ${palette.fill}`,
                opacity: 0.7,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: coreSize,
          height: coreSize,
          pointerEvents: "none",
          zIndex: 10000,
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale:
            pressed
              ? 0.86
              : mode === "interactive"
                ? 1.08 + speedFactor * 0.04
                : 1 + speedFactor * 0.03,
        }}
        transition={{ duration: 0.14 }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "999px",
            border: `1px solid ${palette.edge}`,
            boxShadow: `0 0 18px ${palette.glow}`,
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: ringInset,
            borderRadius: "999px",
            background: `conic-gradient(from 90deg, transparent 0deg 26deg, ${palette.primary} 26deg 110deg, transparent 110deg 202deg, ${palette.secondary} 202deg 262deg, transparent 262deg 360deg)`,
            WebkitMask: primaryRingMask,
            mask: primaryRingMask,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: mode === "interactive" ? 4.8 : 7.5, ease: "linear", repeat: Infinity }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: innerInset,
            borderRadius: "999px",
            background: `conic-gradient(from 0deg, transparent 0deg 46deg, ${palette.accent} 46deg 88deg, transparent 88deg 220deg, ${palette.primary} 220deg 260deg, transparent 260deg 360deg)`,
            WebkitMask: secondaryRingMask,
            mask: secondaryRingMask,
            opacity: 0.95,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: mode === "interactive" ? 3.4 : 5.6, ease: "linear", repeat: Infinity }}
        />

        <div
          style={{
            position: "absolute",
            inset: mode === "interactive" ? 12 : 10,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
            border: `1px solid ${palette.edge}`,
            boxShadow: `0 0 12px ${palette.glow}`,
            transform: "rotate(45deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: mode === "interactive" ? 15 : 13,
            borderRadius: "999px",
            background: palette.accent,
            boxShadow: `0 0 10px ${palette.accent}`,
          }}
        />

        {mode === "enemy" && (
          <>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 2,
                width: 8,
                height: 1,
                background: palette.accent,
                transform: "translateY(-50%)",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 2,
                width: 8,
                height: 1,
                background: palette.accent,
                transform: "translateY(-50%)",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 2,
                width: 1,
                height: 8,
                background: palette.accent,
                transform: "translateX(-50%)",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: 2,
                width: 1,
                height: 8,
                background: palette.accent,
                transform: "translateX(-50%)",
                opacity: 0.8,
              }}
            />
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {cursorText && visible && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              padding: "0.38rem 0.62rem",
              borderRadius: "999px",
              border: `1px solid ${palette.edge}`,
              background: palette.textBg,
              boxShadow: `0 0 18px ${palette.glow}`,
              color: palette.accent,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              pointerEvents: "none",
              zIndex: 10001,
              x: coreX,
              y: coreY,
              translateX: "-50%",
              translateY: "-210%",
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.14 }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>

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
                zIndex: 10002,
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: 18,
                  height: 18,
                  borderRadius: "999px",
                  border: `1px solid ${burstPalette.edge}`,
                  boxShadow: `0 0 16px ${burstPalette.glow}`,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              {burst.particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: particle.width,
                    height: particle.height,
                    borderRadius: "999px",
                    background: `linear-gradient(90deg, ${burstPalette.primary}, ${burstPalette.accent})`,
                    boxShadow: `0 0 10px ${burstPalette.glow}`,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: particle.rotate,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    opacity: 0,
                    scale: 0.2,
                    rotate: particle.rotate + 18,
                  }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                />
              ))}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
}

export default NeonCursor;
