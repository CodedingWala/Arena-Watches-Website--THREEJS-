/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SmoothScrollProvider } from "./components/providers/SmoothScrollProvider";
import { ScrollProgressProvider } from "./components/providers/ScrollProgressProvider";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { PrecisionEngineering } from "./components/sections/PrecisionEngineering";
import { Materials } from "./components/sections/Materials";
import { DesignPhilosophy } from "./components/sections/DesignPhilosophy";
import { FeatureHighlights } from "./components/sections/FeatureHighlights";
import { InteractiveShowcase } from "./components/sections/InteractiveShowcase";
import { Lifestyle } from "./components/sections/Lifestyle";
import { TechnicalSpecs } from "./components/sections/TechnicalSpecs";
import { Testimonials } from "./components/sections/Testimonials";
import { FAQ } from "./components/sections/FAQ";
import { CTA } from "./components/sections/CTA";
import { Footer } from "./components/layout/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Elegant loading sequence to simulate WebGL asset & core calibration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScrollProvider>
      <ScrollProgressProvider>
        <div className="relative min-h-screen bg-obsidian text-platinum select-none font-sans overflow-x-hidden antialiased">

          {/* 1. BRAND INITIAL TIMEPIECE PRELOADER */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                key="preloader"
                initial={{ opacity: 1 }}
                exit={{ 
                  opacity: 0, 
                  filter: "blur(12px)",
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }}
                className="fixed inset-0 bg-obsidian z-50 flex flex-col items-center justify-center select-none"
              >
                <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                  {/* Glowing concentric dials */}
                  <div className="absolute inset-0 border border-champagne-gold/10 rounded-full" />
                  <div className="absolute inset-3 border border-dashed border-champagne-gold/5 rounded-full" />
                  
                  {/* Brand Word Mark Initial V */}
                  <span className="font-display text-2xl font-bold tracking-widest text-champagne-gold drop-shadow-[0_0_15px_rgba(201,165,92,0.4)]">V</span>
                  
                  {/* Sweep Second Hand ticking smoothly */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                    className="absolute top-0 bottom-1/2 w-[1px] bg-champagne-gold origin-bottom"
                    style={{ height: "42%" }}
                  />
                </div>

                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="font-mono text-[9px] tracking-[0.3em] text-champagne-gold/75 uppercase font-medium"
                >
                  ARENA CHRONOMETRY
                </motion.span>
                
                <span className="font-sans text-[8px] tracking-[0.15em] text-platinum-dim/40 uppercase mt-1.5 font-light">
                  CALIBRATING MECHANICAL ENGINE
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. MAIN APP COMPOSITION (Mounts once preloader resolves) */}
          <Navbar />
          
          <main className="relative z-10 w-full flex flex-col">
            <Hero />
            <PrecisionEngineering />
            <Materials />
            <DesignPhilosophy />
            <FeatureHighlights />
            <InteractiveShowcase />
            <Lifestyle />
            <TechnicalSpecs />
            <Testimonials />
            <FAQ />
            <CTA />
          </main>
          
          <Footer />

        </div>
      </ScrollProgressProvider>
    </SmoothScrollProvider>
  );
}
