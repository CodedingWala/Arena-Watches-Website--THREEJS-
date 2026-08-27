/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold-outline";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Highly crafted button component with custom hover physics and visual tokens.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  ...props
}) => {
  return (
    <button
      className={cn(
        "group relative overflow-hidden font-sans uppercase tracking-[0.15em] text-xs font-semibold transition-all duration-500 rounded-none cursor-pointer flex items-center justify-center gap-2 select-none",
        
        // Variants
        variant === "primary" && 
          "bg-champagne-gold text-[#1A1A1A] border border-champagne-gold hover:bg-champagne-gold-bright hover:border-champagne-gold-bright hover:text-black hover:shadow-[0_0_20px_rgba(201,165,92,0.3)]",
          
        variant === "secondary" && 
          "bg-transparent text-platinum border border-platinum/20 hover:border-champagne-gold hover:text-champagne-gold",
          
        variant === "gold-outline" && 
          "bg-transparent text-champagne-gold border border-champagne-gold/40 hover:border-champagne-gold hover:bg-champagne-gold/5",
          
        variant === "ghost" && 
          "bg-transparent text-platinum-dim hover:text-platinum border border-transparent",

        // Sizes
        size === "sm" && "px-4 py-2.5 text-[10px]",
        size === "md" && "px-6 py-3.5",
        size === "lg" && "px-8 py-4.5 text-sm",
        size === "xl" && "px-10 py-5.5 text-sm tracking-[0.2em]",
        
        className
      )}
      {...props}
    >
      {/* Decorative Shimmer background effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
};
