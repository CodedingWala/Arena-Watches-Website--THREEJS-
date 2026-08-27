/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
}

/**
 * Scroll-reveal utility component with high-end deceleration easing and blur removal.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className,
  triggerOnce = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: 0.15 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else if (!triggerOnce) {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, triggerOnce]);

  const getVariants = (): any => {
    const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;
    const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;

    return {
      hidden: {
        opacity: 0,
        x: xOffset,
        y: yOffset,
        filter: "blur(6px)",
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // Luxury deceleration curve (expo-out style)
        },
      },
    };
  };

  return (
    <div ref={ref} className={className} style={{ position: "relative", width: "100%" }}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};
