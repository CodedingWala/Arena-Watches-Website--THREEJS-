/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useEffect, useState } from "react";
import { useLenis } from "../../hooks/useLenis";

export const ScrollProgressContext = createContext<number>(0);

interface ScrollProgressProviderProps {
  children: React.ReactNode;
}

/**
 * Tracks and provides global scroll progress as a percentage from 0 (top) to 1 (bottom).
 * Provides clean reactive state for progress indicators and 3D camera animations.
 */
export const ScrollProgressProvider: React.FC<ScrollProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<number>(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      // Standard window scroll fallback if Lenis is not active yet
      const handleScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total <= 0) return;
        setProgress(window.scrollY / total);
      };
      
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // Lenis scroll listener
    const handleLenisScroll = (e: any) => {
      // e.progress is a value between 0 and 1
      if (typeof e.progress === "number") {
        setProgress(e.progress);
      } else {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0) {
          setProgress(window.scrollY / total);
        }
      }
    };

    lenis.on("scroll", handleLenisScroll);
    return () => {
      lenis.off("scroll", handleLenisScroll);
    };
  }, [lenis]);

  return (
    <ScrollProgressContext.Provider value={progress}>
      {children}
    </ScrollProgressContext.Provider>
  );
};
