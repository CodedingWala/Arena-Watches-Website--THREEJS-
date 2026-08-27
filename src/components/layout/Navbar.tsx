/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { useLenis } from "../../hooks/useLenis";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { Button } from "../ui/Button";
import { MagneticButton } from "../ui/MagneticButton";

interface NavLink {
  label: string;
  targetId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Collection", targetId: "collection" },
  { label: "Precision", targetId: "precision" },
  { label: "Materials", targetId: "materials" },
  { label: "Heritage", targetId: "heritage" },
  { label: "Specs", targetId: "specs" },
  { label: "FAQ", targetId: "faq" },
];

/**
 * Fixed sticky header.
 * Seamlessly integrates viewport blur, magnetic button vectors, and full-screen mobile triggers.
 */
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element && lenis) {
      // Smoothly scroll to the target element, offset to account for sticky bar height
      lenis.scrollTo(element, { offset: -70, duration: 1.5 });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-500",
          isScrolled 
            ? "py-4 bg-obsidian/75 backdrop-blur-lg border-b border-white/5" 
            : "py-6 bg-transparent"
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Brand Mark */}
          <button 
            onClick={() => lenis?.scrollTo(0, { duration: 1.8 })}
            className="font-display text-lg md:text-xl font-bold tracking-[0.25em] text-platinum hover:text-champagne-gold transition-colors duration-300 outline-none cursor-pointer"
          >
            ARENA
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.targetId}
                onClick={() => handleNavClick(link.targetId)}
                className="font-sans text-[10px] uppercase tracking-[0.2em] text-platinum-dim hover:text-champagne-gold font-medium transition-colors duration-300 outline-none select-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Magnetic Reserve CTA */}
          <div className="hidden md:block">
            <MagneticButton range={50}>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => handleNavClick("reserve")}
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Reserve Yours
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-platinum-dim hover:text-platinum transition-colors duration-300 outline-none cursor-pointer p-1"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div className="absolute bottom-0 left-0 h-[1px] bg-white/10 w-full">
          <div 
            className="h-full bg-champagne-gold transition-all duration-100 ease-out" 
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </motion.header>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-full bg-obsidian/95 backdrop-blur-xl z-30 md:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6 text-left my-auto">
              <span className="font-mono text-[9px] tracking-[0.3em] text-champagne-gold mb-2 block">SITEMAP DIRECTORY</span>
              {NAV_LINKS.map((link, idx) => (
                <div key={link.targetId} className="overflow-hidden">
                  <motion.button
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: idx * 0.05 + 0.1, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    onClick={() => handleNavClick(link.targetId)}
                    className="font-display text-3xl font-medium tracking-wide text-platinum hover:text-champagne-gold transition-colors duration-300 text-left outline-none cursor-pointer block py-1"
                  >
                    {link.label}
                  </motion.button>
                </div>
              ))}

              <div className="h-[1px] bg-platinum/10 my-6 w-full max-w-xs" />
              
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleNavClick("reserve")}
                    className="w-full max-w-xs"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                  >
                    Reserve Now
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Footer markers inside mobile menu */}
            <div className="mb-12 flex justify-between text-[10px] font-mono text-platinum-dim tracking-wider">
              <span>BENGALURU, INDIA</span>
              <span>© {new Date().getFullYear()} ARENA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
