/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

interface AnimatedTextProps {
  text: string;
  el?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
}

/**
 * Letter-by-letter staggering text reveal that handles text-blur to focus.
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  el: Tag = "p",
  className,
  delay = 0,
}) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: any = {
    hidden: {
      opacity: 0,
      y: "25%",
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: "0%",
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Luxury expo-out curve
      },
    },
  };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        aria-hidden="true"
        className="inline-block"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                variants={letterVariants}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
