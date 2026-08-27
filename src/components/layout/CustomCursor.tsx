/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/**
 * Premium custom cursor with elastic trailing spring physics.
 * Adapts contextually (scales, changes blend modes, reveals text labels) on interactive hover.
 * Automatically disabled on touch screens to protect mobile UX.
 */
export const CustomCursor: React.FC = () => {
  const isTouchDevice = useMediaQuery("(hover: none)");
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  
  // Track cursor coordinates with MotionValues to prevent full React re-renders (runs off main thread)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Configure high-end dampening and stiffness parameters for lag-behind momentum
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      // Offset by half of cursor size to keep centered
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    // Detect if hovering over clickable or swappable targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = target.closest("button, a, input, select, textarea, [role='button']");
      const isSwatch = target.closest("[data-cursor='swatch']");
      const isSpec = target.closest("[data-cursor='spec']");

      if (isSwatch) {
        setHoveredState("swatch");
      } else if (isSpec) {
        setHoveredState("spec");
      } else if (isClickable) {
        setHoveredState("clickable");
      } else {
        setHoveredState(null);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouchDevice, cursorX, cursorY]);

  // If mobile or tablet, return empty fragment immediately (zero DOM layout footprint)
  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full border border-champagne-gold mix-blend-difference pointer-events-none z-50 flex items-center justify-center overflow-hidden"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
        }}
        animate={{
          scale: hoveredState ? 3.5 : 1,
          backgroundColor: hoveredState === "clickable" 
            ? "rgba(216, 217, 219, 0.1)" 
            : hoveredState === "swatch" 
              ? "rgba(201, 165, 92, 0.15)"
              : hoveredState === "spec"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0)",
          borderColor: hoveredState 
            ? hoveredState === "swatch" 
              ? "var(--color-champagne-gold)" 
              : "var(--color-platinum)" 
            : "var(--color-champagne-gold)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.1 }}
      >
        {/* Micro-label text revealed on scale-up */}
        <span 
          className="text-[3px] font-mono font-semibold uppercase tracking-[0.1em] text-champagne-gold select-none pointer-events-none opacity-0"
          style={{
            opacity: hoveredState ? 1 : 0,
            transition: "opacity 0.3s ease"
          }}
        >
          {hoveredState === "swatch" && "MIX"}
          {hoveredState === "spec" && "SPEC"}
          {hoveredState === "clickable" && "VIEW"}
        </span>
      </motion.div>
    </>
  );
};
