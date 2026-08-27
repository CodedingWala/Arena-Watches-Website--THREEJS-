/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Reveal } from "../ui/Reveal";

/**
 * Design Philosophy section.
 * Editorial center quote accompanied by custom micro-vector icons representing brand pillars.
 * Integrates background typography parallaxing based on container scroll metrics.
 */
export const DesignPhilosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scroll metrics for back-text translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation: slide text left-to-right gently as user scrolls
  const textXTranslation = useTransform(scrollYProgress, [0, 1], ["-15%", "10%"]);

  return (
    <section
      ref={containerRef}
      id="heritage"
      className="relative bg-obsidian py-24 md:py-36 overflow-hidden select-none"
    >
      {/* Massive Parallax Watermark Backing Text */}
      {!reducedMotion && (
        <motion.div
          style={{ x: textXTranslation }}
          className="absolute top-1/2 -translate-y-1/2 left-0 font-display text-[22vw] font-bold text-black/[0.03] tracking-[0.2em] uppercase whitespace-nowrap pointer-events-none z-0"
        >
          RESTLESS
        </motion.div>
      )}

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Eyebrow label */}
        <Reveal direction="up" delay={0.1}>
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold text-center block mb-8">
            PHILOSOPHY OF RESTRAINT
          </span>
        </Reveal>

        {/* Large Editorial Magazine Pull-Quote */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl">
          <Reveal direction="up" delay={0.2} duration={1.2}>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-medium text-platinum leading-snug md:leading-tight italic">
              “Simplicity is the final tier of complexity. We do not design our timepieces to shout from the wrist; we engineer them to whisper to those who understand.”
            </p>
          </Reveal>
        </div>

        {/* Three Pillars Row with Custom-drawn Line-art Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full border-t border-white/5 pt-16">
          
          {/* Pillar 1: Heritage */}
          <div className="flex flex-col items-center text-center">
            <Reveal direction="up" delay={0.2}>
              <div className="w-12 h-12 flex items-center justify-center mb-6 text-champagne-gold">
                {/* Custom Sundial/Sunburst SVG lineart */}
                <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[0.75]">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <line x1="12" y1="3" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="21" />
                  <line x1="3" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="21" y2="12" />
                  <line x1="5.64" y1="5.64" x2="7.05" y2="7.05" />
                  <line x1="16.95" y1="16.95" x2="18.36" y2="18.36" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-medium text-platinum mb-3">
                Indian Heritage
              </h4>
              <p className="font-sans text-xs md:text-sm text-platinum-dim font-light leading-relaxed max-w-xs">
                Rooted in India&apos;s rich historical arts, utilizing subtle concentric geometries inspired by temple architecture.
              </p>
            </Reveal>
          </div>

          {/* Pillar 2: Precision */}
          <div className="flex flex-col items-center text-center">
            <Reveal direction="up" delay={0.3}>
              <div className="w-12 h-12 flex items-center justify-center mb-6 text-champagne-gold">
                {/* Custom Gear Caliper SVG lineart */}
                <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[0.75]">
                  <circle cx="12" cy="12" r="6" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  <path d="M12 12L16.24 7.76" />
                  <path d="M8 3a9 9 0 0 1 8 0" />
                  <path d="M16 21a9 9 0 0 1-8 0" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-medium text-platinum mb-3">
                Precision Micro-Engineering
              </h4>
              <p className="font-sans text-xs md:text-sm text-platinum-dim font-light leading-relaxed max-w-xs">
                Calibrating balances with microscopic margins to secure flawless kinetic power deliveries day after day.
              </p>
            </Reveal>
          </div>

          {/* Pillar 3: Restraint */}
          <div className="flex flex-col items-center text-center">
            <Reveal direction="up" delay={0.4}>
              <div className="w-12 h-12 flex items-center justify-center mb-6 text-champagne-gold">
                {/* Custom Pendulum/Restraint vertical axis SVG lineart */}
                <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[0.75]">
                  <line x1="12" y1="2" x2="12" y2="16" />
                  <circle cx="12" cy="18" r="3" />
                  <path d="M7 10h10" />
                  <path d="M9 6h6" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-medium text-platinum mb-3">
                Aesthetic Restraint
              </h4>
              <p className="font-sans text-xs md:text-sm text-platinum-dim font-light leading-relaxed max-w-xs">
                Stripping away visual clutter. Prioritizing empty space and structural proportion over superficial decoration.
              </p>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
