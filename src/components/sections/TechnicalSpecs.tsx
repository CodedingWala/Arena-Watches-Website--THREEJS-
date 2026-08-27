/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TECHNICAL_SPECS } from "../../lib/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

/**
 * Technical Specifications section.
 * Renders a highly detailed, clean horological grid spec sheet 
 * paired with a custom-drawn CAD vector watch schematic.
 */
export const TechnicalSpecs: React.FC = () => {
  return (
    <section 
      id="specs" 
      className="bg-graphite py-24 md:py-32 border-t border-b border-white/5 relative"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="ENGINEERING SCHEMATICS"
          title="Chronometric Architecture"
          description="For the discerning collector who values raw, objective data. Explore the comprehensive dimensional parameters, frequency rates, and metallurgical compositions."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12 md:mt-20">
          
          {/* Left Side: Technical CAD-style SVG schematic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-obsidian/35 p-6 md:p-8 border border-white/5 relative">
            <span className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.2em] text-platinum-dim/40">
              CAD COMPONENT: CHASSIS_V1
            </span>
            
            {/* Custom Watch Measurement Diagram Vector */}
            <div className="w-full max-w-[280px] aspect-square flex items-center justify-center py-6">
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-full text-champagne-gold/30 stroke-current fill-none stroke-[0.75] select-none pointer-events-none"
              >
                {/* Watch Case center circle */}
                <circle cx="100" cy="100" r="48" />
                <circle cx="100" cy="100" r="45" strokeDasharray="2, 2" />
                
                {/* Dial index ring */}
                <circle cx="100" cy="100" r="40" />

                {/* Right side crown */}
                <rect x="148" y="93" width="7" height="14" rx="1" />
                <line x1="151" y1="93" x2="151" y2="107" />
                <line x1="153" y1="93" x2="153" y2="107" />

                {/* Top/Bottom Lugs */}
                {/* Top Left */}
                <path d="M78 58 L72 38" />
                {/* Top Right */}
                <path d="M122 58 L128 38" />
                {/* Bottom Left */}
                <path d="M78 142 L72 162" />
                {/* Bottom Right */}
                <path d="M122 142 L128 162" />

                {/* Leather straps extending outwards */}
                <path d="M78 38 H122 V14 H78 Z" strokeDasharray="1, 1" />
                <path d="M78 162 H122 V186 H78 Z" strokeDasharray="1, 1" />

                {/* --- DIMENSION MEASUREMENT CALLOUT LINES --- */}
                {/* 1. Case Diameter (Horizontal Arrow: 41.0mm) */}
                <g className="text-platinum-dim/40 stroke-current">
                  <line x1="52" y1="100" x2="148" y2="100" strokeWidth="0.5" />
                  <polyline points="57,97 52,100 57,103" strokeWidth="0.75" />
                  <polyline points="143,97 148,100 143,103" strokeWidth="0.75" />
                </g>
                <text 
                  x="100" 
                  y="92" 
                  className="font-mono text-[8px] fill-champagne-gold text-center stroke-none tracking-widest font-semibold"
                  textAnchor="middle"
                >
                  41.0 mm (DIAMETER)
                </text>

                {/* 2. Case Thickness (Vertical bracket at side: 11.8mm) */}
                <g className="text-platinum-dim/40 stroke-current">
                  <line x1="168" y1="52" x2="168" y2="148" strokeWidth="0.5" />
                  <line x1="164" y1="52" x2="172" y2="52" strokeWidth="0.5" />
                  <line x1="164" y1="148" x2="172" y2="148" strokeWidth="0.5" />
                </g>
                <text 
                  x="176" 
                  y="103" 
                  className="font-mono text-[8px] fill-champagne-gold stroke-none tracking-widest font-semibold"
                  transform="rotate(90 176 103)"
                  textAnchor="middle"
                >
                  48.2 mm (LUG-TO-LUG)
                </text>

                {/* Case thickness horizontal dimension callout */}
                <line x1="100" y1="148" x2="100" y2="182" strokeWidth="0.5" className="text-platinum-dim/20" />
                <line x1="145" y1="148" x2="145" y2="182" strokeWidth="0.5" className="text-platinum-dim/20" />
                <g className="text-platinum-dim/40 stroke-current">
                  <line x1="100" y1="178" x2="145" y2="178" strokeWidth="0.5" />
                  <polyline points="105,175 100,178 105,181" strokeWidth="0.75" />
                  <polyline points="140,175 145,178 140,181" strokeWidth="0.75" />
                </g>
                <text 
                  x="122" 
                  y="173" 
                  className="font-mono text-[7px] fill-champagne-gold stroke-none tracking-widest font-semibold"
                  textAnchor="middle"
                >
                  11.8 mm THICK
                </text>
              </svg>
            </div>

            <div className="w-full border-t border-white/5 pt-4 flex justify-between text-[8px] font-mono tracking-wider text-platinum-dim/40">
              <span>SCALE: 1:1.5 CAD</span>
              <span>VERIFIED ATELIER METRICS</span>
            </div>
          </div>

          {/* Right Side: Editorial Spec Rows */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="w-full flex flex-col">
              
              {Object.entries(TECHNICAL_SPECS).map(([key, spec], idx) => (
                <Reveal 
                  key={key} 
                  direction="up" 
                  delay={idx * 0.03}
                  className="w-full"
                >
                  <div 
                    data-cursor="spec"
                    className="grid grid-cols-3 md:grid-cols-4 py-4.5 border-b border-white/5 hover:bg-white/[0.01] px-2 transition-all duration-300 group items-start"
                  >
                    {/* Spec Label */}
                    <span className="col-span-1 font-mono text-[9px] md:text-[10px] tracking-widest text-champagne-gold uppercase font-medium pt-1">
                      {spec.label}
                    </span>
                    
                    {/* Spec Value */}
                    <p className="col-span-2 md:col-span-3 font-sans text-xs md:text-sm text-platinum-dim group-hover:text-platinum transition-colors duration-300 font-light leading-relaxed">
                      {spec.value}
                    </p>
                  </div>
                </Reveal>
              ))}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
