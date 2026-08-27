/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowUpRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { WATCH_VARIANTS, WatchVariant } from "../../lib/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { WatchScene } from "../three/WatchScene";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { useLenis } from "../../hooks/useLenis";

const VARIANT_DESCRIPTIONS: Record<string, string> = {
  midnight: "Stealth DLC coating over a Grade 5 Titanium frame. Hand-fitted with a vulcanized midnight-obsidian synthetic rubber strap. Crafted for absolute discretion.",
  champagne: "A warm, hand-brushed champagne gold chassis. Accented by a premium acacia bark-tanned leather strap in deep coffee-brown. Uncompromising classic elegance.",
  "steel-blue": "Highly-polished marine grade 316L stainless steel casing. Complemented by an ocean-blue sunburst dial and deep navy linen-stitched leather. Maritime heritage.",
  "racing-crimson": "Monolithic matte carbon bezel coupled with a deep, layered blood-crimson dial. Fitted with an organic dark-bordeaux leather band. Intense horological speed."
};

/**
 * Interactive watch showcase and customizer configurator.
 * Links React state directly to the 3D WebGL material parameters.
 */
export const InteractiveShowcase: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState<WatchVariant>(WATCH_VARIANTS[0]);
  const lenis = useLenis();

  const handleReserveClick = () => {
    const el = document.getElementById("reserve");
    if (el && lenis) {
      lenis.scrollTo(el, { duration: 1.5 });
    }
  };

  return (
    <section 
      id="showcase" 
      className="bg-graphite py-24 md:py-32 relative overflow-hidden"
    >
      {/* Soft background gold drift light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[60vw] h-[60vw] bg-radial from-champagne-gold/[0.03] to-transparent pointer-events-none blur-3xl" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="TAILORED SPECS"
          title="Calibrate Your Identity"
          description="Interact with our master-grade customizer. Drag to spin the watch, inspect bezel chamfers from any angle, and choose a finish that speaks to your personality."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12 md:mt-20">
          
          {/* Left Side: FULLY INTERACTIVE R3F CANVAS */}
          <div className="lg:col-span-7 w-full h-[45vh] md:h-[55vh] lg:h-[65vh] bg-obsidian/40 border border-white/5 relative group">
            
            {/* Direct Interaction Overlay Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 font-mono text-[9px] tracking-widest text-champagne-gold bg-obsidian/80 px-3 py-1.5 border border-champagne-gold/20 select-none">
              <Zap className="w-3 h-3 text-champagne-gold animate-pulse" />
              <span>DRAG TO ROTATE (3D REALTIME)</span>
            </div>

            {/* Render interactive 3D watch canvas passing active materials */}
            <WatchScene
              isInteractive={true}
              strapColor={activeVariant.strapColor}
              dialColor={activeVariant.dialColor}
              caseColor={activeVariant.caseColor}
              metallic={activeVariant.metallic}
              roughness={activeVariant.roughness}
            />

            {/* Reset prompt or visual compass */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none text-[8px] font-mono text-platinum-dim/40 tracking-wider">
              STUDIO VIEW: ACTIVE RENDER ENGINE
            </div>
          </div>

          {/* Right Side: Customization Swatches & Text */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start text-left">
            
            <Reveal direction="left" delay={0.1}>
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-champagne-gold uppercase block mb-3 font-semibold">
                ACTIVE CONFIGURATION
              </span>
            </Reveal>

            <div className="overflow-hidden h-14 md:h-16 w-full mb-3">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeVariant.id}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-3xl md:text-4xl font-semibold text-platinum tracking-tight"
                >
                  {activeVariant.name}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="min-h-[100px] w-full mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeVariant.id}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="font-sans text-xs md:text-sm text-platinum-dim font-light leading-relaxed"
                >
                  {VARIANT_DESCRIPTIONS[activeVariant.id]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Swatch Button list */}
            <div className="w-full mb-10 border-t border-b border-white/5 py-8 flex flex-col gap-4">
              <span className="font-sans text-[10px] tracking-widest text-platinum-dim/60 uppercase font-semibold">
                SELECT FINISH:
              </span>
              
              <div className="flex gap-4">
                {WATCH_VARIANTS.map((variant) => {
                  const isActive = variant.id === activeVariant.id;
                  
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setActiveVariant(variant)}
                      data-cursor="swatch"
                      className={cn(
                        "w-10 h-10 rounded-full border p-[3px] transition-all duration-300 relative flex items-center justify-center cursor-pointer outline-none",
                        isActive 
                          ? "border-champagne-gold scale-110 shadow-[0_0_15px_rgba(201,165,92,0.3)]" 
                          : "border-white/10 hover:border-white/40 hover:scale-105"
                      )}
                      aria-label={`Select variant ${variant.name}`}
                    >
                      {/* Concentric colored core representing strap, casing and dial */}
                      <div className="w-full h-full rounded-full overflow-hidden relative flex">
                        {/* Half-dial half-strap visualization inside swatch */}
                        <div 
                          className="w-1/2 h-full shrink-0" 
                          style={{ backgroundColor: variant.dialColor }} 
                        />
                        <div 
                          className="w-1/2 h-full shrink-0" 
                          style={{ backgroundColor: variant.strapColor }} 
                        />
                        <div 
                          className="absolute inset-2 rounded-full border border-white/10" 
                          style={{ backgroundColor: variant.caseColor }} 
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA action to skip to reserve segment */}
            <Reveal direction="up" delay={0.3}>
              <Button
                variant="gold-outline"
                size="lg"
                onClick={handleReserveClick}
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Reserve This Build
              </Button>
            </Reveal>

          </div>

        </div>

      </div>
    </section>
  );
};
