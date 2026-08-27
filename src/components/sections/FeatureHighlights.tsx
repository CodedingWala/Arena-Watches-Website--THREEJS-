/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Shield, RefreshCw, Compass, Award, Droplets } from "lucide-react";
import { cn } from "../../lib/utils";
import { BENTO_FEATURES, BentoFeature } from "../../lib/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/**
 * Custom hook/component to track coordinates for the radial gold hover light.
 */
interface BentoCardProps {
  feature: BentoFeature;
  idx: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ feature, idx }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isTouch = useMediaQuery("(hover: none)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Map string names to actual Lucide icons for modularity
  const getIcon = (name: string) => {
    switch (name) {
      case "ShieldAlert":
        return <Droplets className="w-6 h-6 text-champagne-gold" />;
      case "RefreshCw":
        return <RefreshCw className="w-5 h-5 text-champagne-gold" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-champagne-gold" />;
      case "Award":
        return <Award className="w-5 h-5 text-champagne-gold" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-champagne-gold" />;
      default:
        return <Compass className="w-5 h-5 text-champagne-gold" />;
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden glass-card p-6 md:p-8 flex flex-col justify-between transition-all duration-500 ease-out select-none border border-white/5",
        
        // Large Card (2x2 span)
        feature.size === "large" && "col-span-1 md:col-span-2 row-span-2 min-h-[380px] md:min-h-[460px]",
        
        // Medium Card (1x1 desktop, wider look)
        feature.size === "medium" && "col-span-1 row-span-1 min-h-[220px] md:min-h-[260px]",
        
        // Small Card (1x1 standard)
        feature.size === "small" && "col-span-1 row-span-1 min-h-[220px]",
        
        "hover:translate-y-[-6px] hover:border-champagne-gold/25 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] cursor-default"
      )}
    >
      {/* Dynamic Cursor-Tracking Radial Glow Overlay */}
      {isHovered && !isTouch && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(201, 165, 92, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Card Content Top */}
      <div className="flex justify-between items-start">
        <div className="p-3 bg-white/[0.02] border border-white/5 rounded-none flex items-center justify-center">
          {getIcon(feature.iconName)}
        </div>
        
        {feature.metric && (
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-champagne-gold font-bold px-3 py-1 border border-champagne-gold/20 bg-champagne-gold/5">
            {feature.metric}
          </span>
        )}
      </div>

      {/* Card Content Bottom */}
      <div className="mt-8">
        <h4 className="font-display text-lg md:text-xl font-medium text-platinum mb-3">
          {feature.title}
        </h4>
        <p className="font-sans text-xs md:text-sm text-platinum-dim font-light leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export const FeatureHighlights: React.FC = () => {
  return (
    <section 
      id="collection" 
      className="bg-obsidian py-24 md:py-32 relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="PRODUCT ATTRIBUTES"
          title="Designed for Extreme Standards"
          description="A detailed analysis of the auxiliary capabilities engineered directly into the case chassis, strap mechanics, and dial facets of each ARENA timepiece."
          align="center"
        />

        {/* Asymmetric Bento-style Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-20">
          {BENTO_FEATURES.map((feat, idx) => (
            <Reveal 
              key={feat.id} 
              direction="up" 
              delay={0.15 + (idx * 0.05)}
            >
              <BentoCard feature={feat} idx={idx} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
