/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FAQ_DATA } from "../../lib/constants";
import { AccordionItem } from "../ui/AccordionItem";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

/**
 * FAQ (Frequently Asked Questions) section.
 * Renders an accordion block with dual columns on desktop to handle buy intent queries.
 */
export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Split FAQ data into two columns for elegant desktop layout pacing
  const halfLength = Math.ceil(FAQ_DATA.length / 2);
  const leftColFaqs = FAQ_DATA.slice(0, halfLength);
  const rightColFaqs = FAQ_DATA.slice(halfLength);

  return (
    <section 
      id="faq" 
      className="bg-graphite py-24 md:py-32 relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="CLIENT SERVICES"
          title="Horology Clarified"
          description="Purchase queries, technical specifications, limited configurations, and extended concierge support. Learn how we handle our timepieces."
          align="center"
        />

        {/* Dual Column Accordion List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0 mt-12 md:mt-20">
          
          {/* Left Column */}
          <div className="flex flex-col">
            {leftColFaqs.map((faq, idx) => (
              <Reveal 
                key={faq.id} 
                direction="up" 
                delay={idx * 0.05}
                className="w-full"
              >
                <AccordionItem
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openId === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                />
              </Reveal>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {rightColFaqs.map((faq, idx) => (
              <Reveal 
                key={faq.id} 
                direction="up" 
                delay={idx * 0.05 + 0.1}
                className="w-full"
              >
                <AccordionItem
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openId === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                />
              </Reveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
