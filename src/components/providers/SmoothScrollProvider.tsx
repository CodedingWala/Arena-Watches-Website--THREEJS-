/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const LenisContext = createContext<Lenis | null>(null);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * High-performance smooth scrolling provider using Lenis.
 * Coordinates smooth scroll momentum with GSAP's ScrollTrigger animations.
 */
export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Instantiate Lenis smooth scroll
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo deceleration curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    setLenis(lenisInstance);

    // Tell ScrollTrigger to listen to Lenis scroll events
    lenisInstance.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Hook Lenis raf directly into GSAP's global ticker
    const updatePhysics = (time: number) => {
      lenisInstance.raf(time * 1000); // convert seconds to milliseconds
    };
    
    gsap.ticker.add(updatePhysics);

    // Disable lag smoothing to prevent visual jumps on frame drops
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(updatePhysics);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};
