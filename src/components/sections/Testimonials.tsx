/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS_DATA, Testimonial } from "../../lib/constants";
import { Reveal } from "../ui/Reveal";

/**
 * Editorial Review Testimonials section.
 * Large format magazine quote layouts with smooth cross-fade slides.
 */
export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  // Auto rotate quotes every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = TESTIMONIALS_DATA[activeIndex];

  // Motion variants for cross-fade with directional slide drift
  const quoteVariants: any = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 20 : -20,
      filter: "blur(6px)",
    }),
    center: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -20 : 20,
      filter: "blur(6px)",
      transition: {
        duration: 0.4,
      },
    }),
  };

  return (
    <section className="bg-obsidian py-24 md:py-36 relative overflow-hidden select-none border-b border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-radial from-champagne-gold/[0.02] to-transparent pointer-events-none blur-3xl" />

      <div className="w-full max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Giant Serif Quote Mark Decoration */}
        <Reveal direction="up" delay={0.1}>
          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-none mb-8 flex items-center justify-center text-champagne-gold/30">
            <Quote className="w-6 h-6 rotate-180" />
          </div>
        </Reveal>

        {/* Carousel slide container */}
        <div className="min-h-[220px] md:min-h-[180px] w-full flex flex-col justify-center relative overflow-hidden mb-8 md:mb-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeTestimonial.id}
              custom={direction}
              variants={quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <blockquote className="font-display text-lg md:text-2xl lg:text-3xl text-platinum font-medium leading-relaxed mb-8 italic">
                “{activeTestimonial.quote}”
              </blockquote>
              
              <cite className="not-italic flex flex-col items-center">
                <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-champagne-gold mb-1">
                  — {activeTestimonial.author}
                </span>
                <span className="font-mono text-[9px] tracking-widest text-platinum-dim/50 uppercase">
                  {activeTestimonial.title}
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows & Progress Indexes */}
        <div className="flex justify-between items-center w-full max-w-xs mt-4">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 border border-white/10 hover:border-champagne-gold hover:text-champagne-gold text-platinum-dim transition-all duration-300 flex items-center justify-center rounded-none outline-none cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Progress Indicators */}
          <div className="flex gap-3">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer outline-none ${
                  idx === activeIndex 
                    ? "bg-champagne-gold scale-125 shadow-[0_0_8px_rgba(201,165,92,0.6)]" 
                    : "bg-platinum/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="w-10 h-10 border border-white/10 hover:border-champagne-gold hover:text-champagne-gold text-platinum-dim transition-all duration-300 flex items-center justify-center rounded-none outline-none cursor-pointer"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </section>
  );
};
