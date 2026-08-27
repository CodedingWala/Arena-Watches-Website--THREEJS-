/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/Button";
import { AnimatedText } from "../ui/AnimatedText";
import { WatchScene } from "../three/WatchScene";
import { useLenis } from "../../hooks/useLenis";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/**
 * Cinematic Hero section.
 * Places our high-end 3D procedural watch model as the hero asset alongside bold display copy.
 */
export const Hero: React.FC = () => {
  const lenis = useLenis();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const handleExploreClick = () => {
    const el = document.getElementById("collection");
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -70, duration: 1.5 });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-[100dvh] w-full bg-obsidian flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Absolute Radial Background gold glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-radial from-champagne-gold/5 via-transparent to-transparent pointer-events-none blur-3xl z-0" 
      />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Columns: Text Content */}
        <div className="lg:col-span-5 flex flex-col justify-center items-start text-left">
          
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-champagne-gold block mb-4"
          >
            PRECISION SINCE THE FIRST TICK
          </motion.span>

          {/* Staggered display serif headline */}
          <AnimatedText
            text="Time, Engineered."
            el="h1"
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-platinum mb-6 leading-[1.08]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm md:text-base text-platinum-dim font-light leading-relaxed mb-10 max-w-md"
          >
            A confluence of avant-garde micro-engineering and timeless Indian craftsmanship. Hand-calibrated to exceed chronometric expectations.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleExploreClick}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Explore Collection
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById("heritage");
                if (el && lenis) lenis.scrollTo(el, { offset: -70, duration: 1.5 });
              }}
            >
              Atelier Heritage
            </Button>
          </motion.div>
        </div>

        {/* Right Columns: R3F Canvas showing the Watch */}
        <div className="lg:col-span-7 w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] flex items-center justify-center relative">
          
          {/* Circular dial watermark backing the watch */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <div className="w-[85vw] h-[85vw] lg:w-[40vw] lg:h-[40vw] border border-white/[0.02] rounded-full flex items-center justify-center animate-[spin_120s_linear_infinite]">
              <div className="w-[70vw] h-[70vw] lg:w-[32vw] lg:h-[32vw] border border-champagne-gold/[0.015] rounded-full border-dashed" />
            </div>
          </div>

          {/* Lazy-loaded 3D WatchScene Canvas */}
          <div className="relative w-full h-full z-10">
            <WatchScene isInteractive={false} />
          </div>
        </div>
      </div>

      {/* Floating Animated Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => {
          const el = document.getElementById("collection");
          if (el && lenis) lenis.scrollTo(el, { offset: -70, duration: 1.5 });
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="font-mono text-[9px] tracking-[0.25em] text-platinum-dim/50 group-hover:text-champagne-gold transition-colors duration-300 uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-champagne-gold/60 group-hover:text-champagne-gold transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};
