/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { cn } from "../../lib/utils";

interface MarqueeProps {
  items: string[];
  speed?: "slow" | "medium" | "fast";
  className?: string;
  outline?: boolean;
}

/**
 * Infinitely scrolling, high-performance horizontal marquee.
 * Great for large decorative background headers or editorial word ribbons.
 */
export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = "medium",
  className,
  outline = false,
}) => {
  const duration = speed === "fast" ? "20s" : speed === "slow" ? "55s" : "35s";

  return (
    <div 
      className={cn(
        "overflow-hidden w-full flex select-none py-6 border-y border-platinum/5 relative bg-transparent", 
        className
      )}
    >
      {/* Soft fading gradient caps on left and right for editorial blend */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-16 whitespace-nowrap animate-marquee shrink-0"
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {/* Render multiple sets to guarantee continuous wrapping */}
        {[...Array(4)].map((_, groupIdx) => (
          <div key={groupIdx} className="flex gap-16 items-center shrink-0">
            {items.map((item, itemIdx) => (
              <span
                key={itemIdx}
                className={cn(
                  "font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-wide uppercase flex items-center gap-16",
                  outline
                    ? "text-transparent [-webkit-text-stroke:1px_rgba(216,217,219,0.15)] hover:[-webkit-text-stroke:1px_var(--color-champagne-gold)] transition-all duration-700"
                    : "text-platinum/10"
                )}
              >
                {item}
                <span className="text-champagne-gold/30 text-2xl md:text-3xl font-light">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee-run var(--marquee-duration) linear infinite;
        }
        @keyframes marquee-run {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};
