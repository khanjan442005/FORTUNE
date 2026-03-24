import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GamingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseOver = (e) => {
      if (e.target.closest("button, a")) {
        setHover(true);
      } else {
        setHover(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", mouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", mouseOver);
    };
  }, []);

  return (
    <motion.div
      className="gaming-cursor"
      animate={{
        x: position.x - 10,
        y: position.y - 10,
        scale: hover ? 1.8 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    />
  );
};

export default GamingCursor;