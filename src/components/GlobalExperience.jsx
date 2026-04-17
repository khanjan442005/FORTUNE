import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GlobalExperience() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (location.hash) {
        const target = document.querySelector(location.hash);

        if (target) {
          target.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
            block: "start",
          });
          return;
        }
      }

      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.hash, location.pathname]);

  return null;
}

export default GlobalExperience;
