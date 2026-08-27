/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { MATERIALS_DATA, MaterialCard } from "../../lib/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "../../lib/utils";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { gsap } from "../../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Materials section.
 * Tactical editorial section using ivory background for pacing.
 * Implements a high-end horizontal slide track locked to vertical scroll on desktop.
 */
export const Materials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    // If we're on mobile, skip GSAP scroll pinning and let native snap handle layout
    if (isMobile) return;

    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    // Calculate total horizontal translate length
    const totalScrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const translateAmount = totalScrollWidth - viewportWidth + 120; // adding comfort padding

    const ctx = gsap.context(() => {
      // Pin horizontal gallery and link translation to vertical scroll scrub
      gsap.to(track, {
        x: -translateAmount,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${translateAmount}`,
          invalidateOnRefresh: true,
        },
      });
    }, triggerRef);

    return () => {
      ctx.revert(); // clean up GSAP timelines on unmount
    };
  }, [isMobile]);

  // Procedural gradient swatch helper to render premium watch textures without assets
  const renderMaterialSwatch = (type: string) => {
    switch (type) {
      case "titanium":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#5E6266] via-[#7B7F83] to-[#45484B] flex items-center justify-center">
            {/* Fine brushed horizontal lines */}
            <div className="absolute inset-0 opacity-[0.08]" style={{
              backgroundImage: "repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 3px)"
            }} />
            {/* SVG noise texture */}
            <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
            }} />
            <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase font-semibold drop-shadow-sm">SATIN BRUSHED</span>
          </div>
        );
      case "sapphire":
        return (
          <div className="relative w-full h-full bg-gradient-to-tr from-[#98B6D1] via-[#D3E5F5] to-[#B0CBE3] flex items-center justify-center overflow-hidden">
            {/* Glowing diagonal reflection rays */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/40 to-transparent rotate-12 transform animate-[shimmer_8s_infinite]" />
            {/* Glass refraction chamfer bevel */}
            <div className="absolute inset-4 border border-white/25 rounded-sm" />
            <span className="text-[10px] font-mono tracking-widest text-slate-800/85 uppercase font-semibold z-10">9 MOHS ARC</span>
          </div>
        );
      case "leather":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#4D311A] via-[#6B4628] to-[#362110] flex items-center justify-center">
            {/* Leather textured pore grain */}
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
            }} />
            <div className="absolute inset-5 border border-dashed border-[#8B5E3C]/20" />
            <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase font-semibold drop-shadow-sm">BARK PATINA</span>
          </div>
        );
      case "steel":
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-[#7D8083] via-[#EFF2F5] to-[#606366] flex items-center justify-center overflow-hidden">
            {/* Mirror-polish spec highlights */}
            <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-conic from-transparent via-white/50 to-transparent rotate-45" />
            <span className="text-[10px] font-mono tracking-widest text-slate-900/85 uppercase font-semibold z-10">MIRROR FINISH</span>
          </div>
        );
      case "ceramic":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#121213] via-[#202123] to-[#0A0A0B] flex items-center justify-center overflow-hidden">
            {/* Slick high-contrast diagonal luster beam */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-80" />
            <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase font-semibold drop-shadow-sm">MONOLITH GLOSS</span>
          </div>
        );
      default:
        return <div className="w-full h-full bg-zinc-400" />;
    }
  };

  return (
    <div ref={triggerRef} id="materials" className="bg-ivory text-platinum relative lg:h-screen lg:flex lg:flex-col lg:justify-between lg:overflow-hidden">
      {/* 1. Header Section (Padded to separate horizontal scroll trigger from page flow) */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 lg:pt-14 xl:pt-16 pb-2">
        <SectionHeading
          eyebrow="TACTILE MASTERPIECES"
          title="The Elements of Permanence"
          description="A timepiece is meant to endure generations. We source and process only materials that maintain structural perfection and aesthetic brilliance across ages of exposure."
          align="center"
          className="mb-4 md:mb-6 lg:mb-2 xl:mb-4"
        />
      </div>

      {/* 2. Scroll-Track Container */}
      <div 
        className={cn(
          "relative w-full overflow-hidden",
          isMobile 
            ? "overflow-x-auto no-scrollbar flex snap-x snap-mandatory gap-6 px-6 pb-20" 
            : "flex-1 flex items-center pb-6"
        )}
        ref={containerRef}
      >
        <div 
          className={cn(
            isMobile 
              ? "flex gap-6 w-max" 
              : "absolute top-1/2 -translate-y-1/2 left-0 flex pl-24 pr-44 gap-12 select-none"
          )}
          ref={trackRef}
        >
          {MATERIALS_DATA.map((mat) => (
            <div
              key={mat.id}
              className={cn(
                "w-[85vw] sm:w-[440px] lg:w-[340px] xl:w-[385px] flex-shrink-0 bg-white border border-[#1A1A1A]/5 p-6 xl:p-8 flex flex-col justify-between aspect-[10/13] lg:aspect-[10/13] xl:aspect-[3/4] rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-transform duration-500 hover:translate-y-[-8px]",
                isMobile ? "snap-center scroll-ml-6" : ""
              )}
            >
              <div>
                {/* Visual tactile swatch */}
                <div className="aspect-[16/9] w-full mb-5 border border-[#1A1A1A]/5 relative group overflow-hidden">
                  {renderMaterialSwatch(mat.textureType)}
                </div>

                <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-platinum-dim block mb-1.5 uppercase font-medium">
                  {mat.eyebrow}
                </span>

                <h3 className="font-display text-lg md:text-xl xl:text-2xl font-semibold text-platinum mb-3 leading-tight">
                  {mat.name}
                </h3>

                <p className="font-sans text-xs md:text-sm text-platinum-dim leading-relaxed">
                  {mat.description}
                </p>
              </div>

              <div className="border-t border-[#1A1A1A]/10 pt-4 mt-5 flex justify-between items-center text-[9px] font-mono tracking-widest text-platinum-dim">
                <span>SPECIFICATION LOG</span>
                <span className="text-platinum font-semibold">{mat.spec}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
