/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { PRECISION_FEATURES, FeatureBlock } from "../../lib/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

/**
 * Precision Engineering section.
 * Sticky blueprint visualization on the left that lights up dynamically 
 * as technical specification cards scroll on the right.
 */
export const PrecisionEngineering: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("calibre");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if browser environment supports IntersectionObserver
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const cards = document.querySelectorAll(".precision-card");
    
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // Trigger when card occupies central focal area of viewport
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-feature-id");
          if (id) {
            setActiveId(id);
          }
        }
      });
    }, observerOptions);

    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  return (
    <section 
      id="precision" 
      ref={sectionRef}
      className="relative bg-graphite py-24 md:py-32 blueprint-grid"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <SectionHeading
          eyebrow="HOROLOGICAL INTEGRITY"
          title="The Master of Movements"
          description="Every mechanical watch lives or dies by its movement. At ARENA, we assemble our engines with tolerances measured in single microns, marrying classic finishing with advanced silicon micro-elements."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12 md:mt-20">
          
          {/* Left Side: Desktop-Pinned Line-Art Blueprint (Interactive Mechanical Gears SVG) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-center justify-center bg-obsidian/30 border border-white/5 p-6 md:p-8 rounded-none">
            
            <div className="text-center w-full mb-6 border-b border-white/5 pb-4 flex justify-between items-center text-[10px] font-mono tracking-widest text-platinum-dim/40">
              <span>DRAWING REGISTRY: V-81_MVT</span>
              <span className="text-champagne-gold animate-pulse">● MECHANICAL</span>
            </div>

            {/* Micro blueprint vector drawings */}
            <div className="relative w-full aspect-square max-w-[340px] flex items-center justify-center">
              
              {/* Spinning main wheel outline */}
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-full text-white/[0.03] select-none pointer-events-none"
              >
                {/* 1. Outer caliper dial */}
                <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3, 3" />
                <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.75" />
                
                {/* 2. Concentric gears */}
                {/* Gear A (Middle Wheel - rotates based on Active ID) */}
                <g 
                  className="origin-[100px_100px] transition-transform duration-[1.8s] ease-out text-platinum/10"
                  style={{
                    transform: activeId === "calibre" 
                      ? "rotate(0deg)" 
                      : activeId === "reserve" 
                        ? "rotate(120deg)" 
                        : activeId === "accuracy" 
                          ? "rotate(240deg)" 
                          : "rotate(360deg)"
                  }}
                >
                  <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
                  {/* Gear teeth */}
                  {[...Array(24)].map((_, i) => (
                    <line 
                      key={i} 
                      x1="100" 
                      y1="36" 
                      x2="100" 
                      y2="40" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      transform={`rotate(${i * 15} 100 100)`} 
                    />
                  ))}
                  {/* Internal spokes */}
                  <line x1="100" y1="40" x2="100" y2="160" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="40" y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="0.5" />
                </g>

                {/* Gear B (Escapement gear - offset from center, rocking balance) */}
                <g 
                  className="origin-[65px_100px] text-platinum/15"
                  style={{
                    animation: "gear-rock 4s ease-in-out infinite"
                  }}
                >
                  <circle cx="65" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  {[...Array(12)].map((_, i) => (
                    <line 
                      key={i} 
                      x1="65" 
                      y1="67" 
                      x2="65" 
                      y2="70" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      transform={`rotate(${i * 30} 65 100)`} 
                    />
                  ))}
                  <circle cx="65" cy="100" r="3" fill="currentColor" />
                </g>

                {/* 3. Highlighting circles/segments dynamically on activeId */}
                {/* Calibre highlight (Upper-Right) */}
                <circle 
                  cx="140" 
                  cy="70" 
                  r="22" 
                  fill="none" 
                  className={cn(
                    "transition-all duration-700 ease-out", 
                    activeId === "calibre" 
                      ? "stroke-champagne-gold stroke-2 opacity-100 drop-shadow-[0_0_8px_rgba(201,165,92,0.4)]" 
                      : "stroke-white/5 stroke-[0.5] opacity-20"
                  )}
                />
                <line 
                  x1="100" y1="100" x2="140" y2="70" 
                  className={cn(
                    "transition-all duration-700 ease-out", 
                    activeId === "calibre" ? "stroke-champagne-gold stroke-1 opacity-80" : "stroke-white/5 stroke-[0.5] opacity-20"
                  )}
                />

                {/* Reserve highlight (Lower-Right) */}
                <circle 
                  cx="135" 
                  cy="135" 
                  r="20" 
                  fill="none" 
                  className={cn(
                    "transition-all duration-700 ease-out", 
                    activeId === "reserve" 
                      ? "stroke-champagne-gold stroke-2 opacity-100 drop-shadow-[0_0_8px_rgba(201,165,92,0.4)]" 
                      : "stroke-white/5 stroke-[0.5] opacity-20"
                  )}
                />
                <line 
                  x1="100" y1="100" x2="135" y2="135" 
                  className={cn(
                    "transition-all duration-700 ease-out", 
                    activeId === "reserve" ? "stroke-champagne-gold stroke-1 opacity-80" : "stroke-white/5 stroke-[0.5] opacity-20"
                  )}
                />

                {/* Accuracy highlight (Lower-Left) */}
                <circle 
                  cx="65" 
                  cy="140" 
                  r="18" 
                  fill="none" 
                  className={cn(
                    "transition-all duration-700 ease-out", 
                    activeId === "accuracy" 
                      ? "stroke-champagne-gold stroke-2 opacity-100 drop-shadow-[0_0_8px_rgba(201,165,92,0.4)]" 
                      : "stroke-white/5 stroke-[0.5] opacity-20"
                  )}
                />
                <line 
                  x1="100" y1="100" x2="65" y2="140" 
                  className={cn(
                    "transition-all duration-700 ease-out", 
                    activeId === "accuracy" ? "stroke-champagne-gold stroke-1 opacity-80" : "stroke-white/5 stroke-[0.5] opacity-20"
                  )}
                />

                {/* Shield highlight (Upper-Left) */}
                <circle 
                  cx="65" 
                  cy="70" 
                  r="24" 
                  fill="none" 
                  className={cn(
                    "transition-all duration-700 ease-out", 
                    activeId === "shield" 
                      ? "stroke-champagne-gold stroke-2 opacity-100 drop-shadow-[0_0_8px_rgba(201,165,92,0.4)]" 
                      : "stroke-white/5 stroke-[0.5] opacity-20"
                  )}
                />
                <line 
                  x1="100" y1="100" x2="65" y2="70" 
                  className={cn(
                    "transition-all duration-700 ease-out", 
                    activeId === "shield" ? "stroke-champagne-gold stroke-1 opacity-80" : "stroke-white/5 stroke-[0.5] opacity-20"
                  )}
                />
              </svg>
              
              {/* Dynamic center focus readout metrics */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="font-mono text-[9px] text-platinum-dim/40 tracking-[0.2em] block">FOCUS STAT</span>
                <span className="font-sans font-medium text-lg text-champagne-gold tracking-wide transition-all duration-500">
                  {PRECISION_FEATURES.find(f => f.id === activeId)?.stat || "—"}
                </span>
              </div>
            </div>

            <div className="w-full mt-6 grid grid-cols-2 gap-3 pt-5 border-t border-white/5 font-mono text-[9px] text-platinum-dim/50">
              <div className="bg-obsidian/20 border border-white/5 p-2.5 flex flex-col justify-between">
                <span className="tracking-widest block text-[8px] text-platinum-dim/40">CALIBRATION RATE</span>
                <span className="text-champagne-gold font-medium text-[11px] mt-1">±1.2 SEC / DAY</span>
                <div className="w-full bg-white/5 h-1 mt-2 relative overflow-hidden">
                  <div className="bg-champagne-gold h-full w-[85%] absolute left-0 top-0" />
                </div>
              </div>
              <div className="bg-obsidian/20 border border-white/5 p-2.5 flex flex-col justify-between">
                <span className="tracking-widest block text-[8px] text-platinum-dim/40">BEAT ERROR</span>
                <span className="text-champagne-gold font-medium text-[11px] mt-1">0.1 MS</span>
                <div className="w-full bg-white/5 h-1 mt-2 relative overflow-hidden">
                  <div className="bg-champagne-gold h-full w-[95%] absolute left-0 top-0" />
                </div>
              </div>
              <div className="bg-obsidian/20 border border-white/5 p-2.5 flex flex-col justify-between">
                <span className="tracking-widest block text-[8px] text-platinum-dim/40">CALIBRE SPEED</span>
                <span className="text-champagne-gold font-medium text-[11px] mt-1">28,800 BPH</span>
                <div className="w-full bg-white/5 h-1 mt-2 relative overflow-hidden">
                  <div className="bg-champagne-gold h-full w-[70%] absolute left-0 top-0" />
                </div>
              </div>
              <div className="bg-obsidian/20 border border-white/5 p-2.5 flex flex-col justify-between">
                <span className="tracking-widest block text-[8px] text-platinum-dim/40">LUBRICATION GRADE</span>
                <span className="text-champagne-gold font-medium text-[11px] mt-1">SYNTH-A-902</span>
                <div className="w-full bg-white/5 h-1 mt-2 relative overflow-hidden">
                  <div className="bg-champagne-gold h-full w-[90%] absolute left-0 top-0" />
                </div>
              </div>
            </div>

            <div className="mt-6 text-left w-full border-t border-white/5 pt-4 text-[9px] font-mono tracking-wider text-platinum-dim/40 flex justify-between items-center">
              <span>CALIBRATED AT: 28,800 BPH</span>
              <span>GRADE 1 ATELIER</span>
            </div>
            
            <style>{`
              @keyframes gear-rock {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(30deg); }
              }
            `}</style>
          </div>

          {/* Right Side: Scrollable Technical Specification Blocks */}
          <div className="lg:col-span-7 flex flex-col gap-12 md:gap-16">
            {PRECISION_FEATURES.map((feature, idx) => {
              const isActive = feature.id === activeId;
              
              return (
                <div
                  key={feature.id}
                  data-feature-id={feature.id}
                  className={cn(
                    "precision-card border-l-2 pl-6 md:pl-10 py-6 transition-all duration-500",
                    isActive 
                      ? "border-champagne-gold bg-white/[0.01]" 
                      : "border-white/5 bg-transparent"
                  )}
                >
                  <span className={cn(
                    "font-mono text-[9px] md:text-[10px] tracking-[0.3em] font-semibold block mb-2 transition-colors duration-500",
                    isActive ? "text-champagne-gold" : "text-platinum-dim/40"
                  )}>
                    {feature.eyebrow}
                  </span>
                  
                  <h3 className={cn(
                    "font-display text-2xl md:text-3xl font-medium tracking-tight mb-4 transition-colors duration-500",
                    isActive ? "text-platinum" : "text-platinum-dim/60"
                  )}>
                    {feature.title}
                  </h3>
                  
                  <p className={cn(
                    "font-sans text-xs md:text-sm font-light leading-relaxed mb-6 transition-colors duration-500",
                    isActive ? "text-platinum-dim" : "text-platinum-dim/30"
                  )}>
                    {feature.description}
                  </p>
                  
                  {/* Monospace Stat pill block */}
                  <div className={cn(
                    "inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3.5 py-1.5 border transition-all duration-500",
                    isActive 
                      ? "border-champagne-gold/30 text-champagne-gold bg-champagne-gold/5" 
                      : "border-white/5 text-platinum-dim/30"
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
                    <span>{feature.stat}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
