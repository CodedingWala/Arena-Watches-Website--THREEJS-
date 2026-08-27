/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { cn } from "../../lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

/**
 * Shared section header utilizing editorial layouts and typography tokens.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}) => {
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "mb-12 md:mb-20 flex flex-col",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      <Reveal direction="up" delay={0.1}>
        <span
          className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] block mb-3 md:mb-4 text-champagne-gold"
        >
          {eyebrow}
        </span>
      </Reveal>

      <Reveal direction="up" delay={0.2}>
        <h2
          className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 md:mb-6 leading-[1.1] text-platinum"
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal direction="up" delay={0.3}>
          <p
            className={cn(
              "font-sans text-sm md:text-base font-light leading-relaxed max-w-xl md:max-w-2xl text-platinum-dim",
              align === "center" ? "mx-auto" : ""
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {/* Elegant minimalist gold separator line */}
      <Reveal direction="up" delay={0.4}>
        <div
          className={cn(
            "h-[1px] w-12 mt-6 md:mt-8 bg-champagne-gold/30",
            align === "center" ? "mx-auto" : ""
          )}
        />
      </Reveal>
    </div>
  );
};
