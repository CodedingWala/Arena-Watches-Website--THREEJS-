/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * High-performance, expandable accordion item with smooth height transitions.
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-platinum/10 py-5 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left py-3 font-sans group select-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span 
          className={cn(
            "text-sm md:text-base font-medium tracking-wide transition-colors duration-300",
            isOpen ? "text-champagne-gold" : "text-platinum group-hover:text-champagne-gold"
          )}
        >
          {question}
        </span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-platinum-dim transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-champagne-gold shrink-0 ml-4",
            isOpen && "rotate-180 text-champagne-gold"
          )} 
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm text-platinum-dim font-light leading-relaxed pt-2 pb-4 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
