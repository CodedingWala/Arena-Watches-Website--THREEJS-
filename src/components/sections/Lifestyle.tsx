/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { gsap } from "../../lib/gsap";

interface LifestyleMoment {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  gradientClass: string;
  noiseIntensity: string;
  align: "left" | "right";
}

const MOMENTS: LifestyleMoment[] = [
  {
    id: "m1",
    eyebrow: "MOMENT I: ATELIER DUSK",
    title: "The Midnight Confluence",
    description: "Ink-blue twilight settling over the architectural spires of MUMBAI. In the quiet of the studio, a master watchmaker tightens the microscopic balance bridge. Precision is not a job here; it is a ritual of silence.",
    gradientClass: "from-[#E3EBF4] via-[#F3EDE6] to-[#FAF8F5]",
    noiseIntensity: "opacity-[0.06]",
    align: "left"
  },
  {
    id: "m2",
    eyebrow: "MOMENT II: EXECUTIVE FOCUS",
    title: "Quiet Command",
    description: "High-contrast steel reflections inside a monolithic glass boardroom. The sweep second hand glides without friction, ticking four times a second. No ticks, no rush — only the absolute composure of those who control their own hour.",
    gradientClass: "from-[#FAF9F5] via-[#EAE7DF] to-[#DAD6CC]",
    noiseIntensity: "opacity-[0.04]",
    align: "right"
  },
  {
    id: "m3",
    eyebrow: "MOMENT III: THE WESTERN ESCAPE",
    title: "The Amber Horizon",
    description: "Deep, bark-tanned leather resting against a steering wheel. Winding roads tracing the Western Ghats under a saturated sepia sunset. The sapphire crystal catches the dying rays of sun, reflecting absolute clarity back to the explorer.",
    gradientClass: "from-[#FAF2E8] via-[#EEDC9A]/30 to-[#EADBC8]",
    noiseIntensity: "opacity-[0.08]",
    align: "left"
  }
];

const renderMomentArt = (id: string) => {
  switch (id) {
    case "m1":
      return (
        <svg viewBox="0 0 300 300" className="w-64 h-64 md:w-80 md:h-80 text-champagne-gold/60 select-none drop-shadow-[0_0_20px_rgba(201,165,92,0.1)] transition-transform duration-700 hover:scale-105">
          {/* Circular technical grids */}
          <circle cx="150" cy="150" r="130" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="150" cy="150" r="110" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="150" cy="150" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Crosshairs */}
          <line x1="150" y1="10" x2="150" y2="290" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="10" y1="150" x2="290" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          
          {/* Mechanical Balance Wheel Escapement */}
          <g className="origin-[150px_150px] animate-[spin_45s_linear_infinite]">
            <circle cx="150" cy="150" r="75" fill="none" stroke="currentColor" strokeWidth="2.5" />
            {/* Spokes */}
            <line x1="150" y1="75" x2="150" y2="225" stroke="currentColor" strokeWidth="1.5" />
            <line x1="75" y1="150" x2="225" y2="150" stroke="currentColor" strokeWidth="1.5" />
            {/* Micro screw weights */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x = 150 + 75 * Math.cos(angle);
              const y = 150 + 75 * Math.sin(angle);
              return (
                <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" />
              );
            })}
          </g>
          
          {/* Hairspring spiral */}
          <path
            d="M 150 150 A 4 4 0 0 1 154 150 A 8 8 0 0 1 146 150 A 12 12 0 0 1 158 150 A 16 16 0 0 1 142 150 A 20 20 0 0 1 162 150 A 24 24 0 0 1 138 150 A 28 28 0 0 1 166 150 A 32 32 0 0 1 134 150"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            className="origin-[150px_150px] animate-[pulse_3s_ease-in-out_infinite]"
          />
          
          {/* Escapement fork and pallet jewel hints */}
          <path d="M 150 220 L 135 245 M 150 220 L 165 245" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="131" y="243" width="8" height="4" fill="currentColor" rx="1" />
          <rect x="161" y="243" width="8" height="4" fill="currentColor" rx="1" />

          {/* Technical labels */}
          <text x="150" y="38" className="font-mono text-[7px] tracking-[0.25em] fill-current text-center font-bold" textAnchor="middle">
            ESCAPEMENT BRIDGE
          </text>
          <text x="150" y="278" className="font-mono text-[7px] tracking-[0.25em] fill-current text-center text-platinum-dim/40" textAnchor="middle">
            ATELIER MUMBAI
          </text>
        </svg>
      );
    case "m2":
      return (
        <svg viewBox="0 0 300 300" className="w-64 h-64 md:w-80 md:h-80 text-platinum/70 select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-transform duration-700 hover:scale-105">
          {/* Clean outer bezel */}
          <circle cx="150" cy="150" r="130" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="150" cy="150" r="122" fill="none" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Fine second ticks (60 ticks) */}
          {[...Array(60)].map((_, i) => {
            const isMajor = i % 5 === 0;
            const length = isMajor ? 10 : 5;
            const strokeW = isMajor ? 1 : 0.5;
            const angle = (i * 6 * Math.PI) / 180;
            const x1 = 150 + 120 * Math.cos(angle);
            const y1 = 150 + 120 * Math.sin(angle);
            const x2 = 150 + (120 - length) * Math.cos(angle);
            const y2 = 150 + (120 - length) * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={strokeW} />
            );
          })}
          
          {/* Clean corporate sub-dial */}
          <circle cx="150" cy="200" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="150" y1="200" x2="150" y2="175" stroke="currentColor" strokeWidth="0.75" />
          <text x="150" y="222" className="font-mono text-[6px] tracking-[0.1em] fill-current text-center font-semibold" textAnchor="middle">
            24H REGULATOR
          </text>
          
          {/* Continuous sweep second hand */}
          <g className="origin-[150px_150px] animate-[spin_12s_linear_infinite]">
            <line x1="150" y1="150" x2="150" y2="42" stroke="#C9A55C" strokeWidth="1.5" />
            <circle cx="150" cy="42" r="2.5" fill="#C9A55C" />
            <line x1="150" y1="150" x2="150" y2="170" stroke="#C9A55C" strokeWidth="2" />
          </g>
          
          {/* Hour and Minute Hands (classic 10:10 angle) */}
          <g transform="rotate(-30 150 150)">
            <line x1="150" y1="150" x2="150" y2="75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g transform="rotate(110 150 150)">
            <line x1="150" y1="150" x2="150" y2="55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </g>
          
          {/* Center pivot cover */}
          <circle cx="150" cy="150" r="5" fill="#C9A55C" />
          
          {/* Text labels */}
          <text x="150" y="100" className="font-mono text-[8px] tracking-[0.25em] fill-current text-center font-bold" textAnchor="middle">
            ARENA
          </text>
          <text x="150" y="112" className="font-mono text-[6px] tracking-[0.15em] fill-current text-center text-platinum-dim/50" textAnchor="middle">
            CHRONOMETER AUTOMATIC
          </text>
        </svg>
      );
    case "m3":
      return (
        <svg viewBox="0 0 300 300" className="w-64 h-64 md:w-80 md:h-80 text-[#8B5E3C]/60 select-none drop-shadow-[0_0_20px_rgba(139,94,60,0.1)] transition-transform duration-700 hover:scale-105">
          {/* Compass ring outer frame */}
          <circle cx="150" cy="150" r="130" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="150" cy="150" r="120" fill="none" stroke="currentColor" strokeWidth="0.75" />
          
          {/* Directional markers */}
          <text x="150" y="36" className="font-mono text-[9px] font-bold fill-current text-center" textAnchor="middle">N</text>
          <text x="150" y="274" className="font-mono text-[9px] font-bold fill-current text-center" textAnchor="middle">S</text>
          <text x="264" y="153" className="font-mono text-[9px] font-bold fill-current" textAnchor="middle">E</text>
          <text x="36" y="153" className="font-mono text-[9px] font-bold fill-current" textAnchor="middle">W</text>
          
          {/* Topographical contour elevation lines (Western Ghats) */}
          <path d="M 60 180 Q 90 140 120 180 T 180 180 T 240 180" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 50 195 Q 85 130 125 190 T 195 190 T 250 195" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <path d="M 40 210 Q 80 120 130 200 T 210 200 T 260 210" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 30 225 Q 75 110 135 210 T 225 210 T 270 225" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 2" />
          
          {/* Golden sunset on horizon */}
          <circle cx="150" cy="120" r="35" fill="none" stroke="#C9A55C" strokeWidth="1" />
          <circle cx="150" cy="120" r="2" fill="#C9A55C" />
          <line x1="100" y1="120" x2="200" y2="120" stroke="#C9A55C" strokeWidth="0.5" />
          <line x1="115" y1="110" x2="185" y2="110" stroke="#C9A55C" strokeWidth="0.5" />
          <line x1="125" y1="100" x2="175" y2="100" stroke="#C9A55C" strokeWidth="0.5" />
          <line x1="115" y1="130" x2="185" y2="130" stroke="#C9A55C" strokeWidth="0.5" />
          
          {/* Coordinate grid overlay */}
          <line x1="150" y1="45" x2="150" y2="255" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="45" y1="150" x2="255" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          
          {/* Altimeter coords */}
          <text x="150" y="245" className="font-mono text-[7px] tracking-[0.2em] fill-current text-center" textAnchor="middle">
            WESTERN GHATS ELEVATION
          </text>
          <text x="150" y="255" className="font-mono text-[7px] tracking-[0.1em] fill-current text-center text-platinum-dim/40" textAnchor="middle">
            1,200M ALTITUDE
          </text>
        </svg>
      );
    default:
      return null;
  }
};

/**
 * Lifestyle section.
 * Replaces traditional photography with rich, art-directed CSS compositions 
 * that establish high-end spatial moods and sensory copy.
 */
export const Lifestyle: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const panels = document.querySelectorAll(".lifestyle-panel");
    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        const bg = panel.querySelector(".panel-bg");
        if (!bg) return;
        
        // Gentle Ken Burns scaling loop synchronised directly to scroll scrub
        gsap.fromTo(bg, 
          { scale: 1.0 }, 
          { 
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section 
      ref={sectionRef} 
      className="bg-obsidian py-24 md:py-32 relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="LIFE, CURATED"
          title="The Texture of Hours"
          description="A ARENA timepiece does not just measure time; it frames the sensory spaces you inhabit. Explore the atmospheric settings where design meets daily life."
          align="center"
        />

        {/* Vertical Stack of Large Art-directed Moment Panels */}
        <div className="flex flex-col gap-12 md:gap-20 mt-12 md:mt-20">
          {MOMENTS.map((moment) => {
            const isLeft = moment.align === "left";
            
            return (
              <div
                key={moment.id}
                className="lifestyle-panel relative w-full h-[400px] md:h-[500px] lg:h-[540px] flex items-center overflow-hidden border border-[#1A1A1A]/10 bg-ivory"
              >
                {/* 1. LAYERED GRADIENT BACKGROUND WITH PARALLAX SCALING */}
                <div 
                  className={cn(
                    "panel-bg absolute inset-0 bg-gradient-to-br z-0 will-change-transform",
                    moment.gradientClass
                  )} 
                />

                {/* Ambient radial lighting flares within the background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial from-[#927A54]/[0.05] to-transparent pointer-events-none blur-3xl" />
                
                {/* SVG fine noise filter overlay for tactile high-end feel */}
                <div 
                  className={cn("absolute inset-0 mix-blend-overlay z-1 pointer-events-none", moment.noiseIntensity)}
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
                  }}
                />

                {/* Visual Art on the Left if text is on the Right */}
                {!isLeft && (
                  <div className="hidden md:flex relative z-10 flex-1 items-center justify-center h-full px-8 md:px-16 justify-start">
                    <Reveal direction="none" delay={0.3}>
                      {renderMomentArt(moment.id)}
                    </Reveal>
                  </div>
                )}

                {/* 2. FOREGROUND TEXT CONTENT CARD */}
                <div 
                  className={cn(
                    "relative z-10 w-full max-w-lg px-8 md:px-16 flex flex-col justify-center items-start text-left h-full",
                    isLeft ? "mr-auto" : "ml-auto"
                  )}
                >
                  <Reveal direction={isLeft ? "right" : "left"} delay={0.15}>
                    <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-champagne-gold font-semibold uppercase mb-4 block">
                      {moment.eyebrow}
                    </span>
                  </Reveal>

                  <Reveal direction={isLeft ? "right" : "left"} delay={0.25}>
                    <h3 className="font-display text-2xl md:text-3.5xl font-medium text-platinum mb-4 leading-tight">
                      {moment.title}
                    </h3>
                  </Reveal>

                  <Reveal direction={isLeft ? "right" : "left"} delay={0.35}>
                    <p className="font-sans text-xs md:text-sm text-platinum-dim font-light leading-relaxed mb-6">
                      {moment.description}
                    </p>
                  </Reveal>

                  {/* Micro specification stamp */}
                  <Reveal direction="none" delay={0.45}>
                    <div className="h-[1px] w-12 bg-champagne-gold/30 mb-4" />
                    <span className="font-mono text-[8px] tracking-[0.2em] text-platinum-dim/40 uppercase">
                      ARENA JOURNAL ENTRIES
                    </span>
                  </Reveal>
                </div>

                {/* Visual Art on the Right if text is on the Left */}
                {isLeft && (
                  <div className="hidden md:flex relative z-10 flex-1 items-center justify-center h-full px-8 md:px-16 justify-end">
                    <Reveal direction="none" delay={0.3}>
                      {renderMomentArt(moment.id)}
                    </Reveal>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
