/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Ticket, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WATCH_VARIANTS } from "../../lib/constants";
import { Button } from "../ui/Button";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";

/**
 * Premium Call-To-Action (CTA) section.
 * Contains a fully functional interactive luxury Reservation Form (UI-only)
 * that produces a unique, golden numbered ticket upon successful submission.
 */
export const CTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wristSize: "medium",
    chassis: "midnight",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Generate a unique, realistic concierge serial number
    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    setTicketId(`VRK-04-${randomSerial}`);
    setIsSubmitted(true);
  };

  const selectedChassisName = WATCH_VARIANTS.find(w => w.id === formData.chassis)?.name || "Midnight Obsidian";

  return (
    <section 
      id="reserve" 
      className="bg-obsidian py-24 md:py-36 relative overflow-hidden"
    >
      {/* Absolute Radial breathing glow backdrop */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vw] md:w-[60vw] md:h-[60vw] bg-radial from-champagne-gold/[0.04] to-transparent pointer-events-none blur-3xl z-0 animate-[pulse_6s_infinite_alternate]" 
      />

      <div className="w-full max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="cta-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              <span className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold text-center block mb-4">
                BATCH 04 RESERVATION OPEN
              </span>
              
              <h2 className="font-display text-4xl md:text-5.5xl font-medium tracking-tight text-center text-platinum mb-6 leading-tight max-w-2xl">
                Own a Fragment of Time.
              </h2>
              
              <p className="font-sans text-xs md:text-sm text-platinum-dim font-light text-center leading-relaxed mb-12 max-w-lg">
                Production is limited strictly to 150 individually numbered watch builds per batch. Secure your placement ledger below. A personal concierge advisor will contact you shortly.
              </p>

              {/* Reservation Input Fields */}
              <form 
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-graphite/40 border border-white/5 p-6 md:p-10 flex flex-col gap-6"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-2 text-[9px] font-mono tracking-widest text-platinum-dim/40">
                  <span>LEDGER ENROLLMENT SHEET</span>
                  <span>CONCIERGE BATCH: 04_AUTOMATIC</span>
                </div>

                {/* Name field */}
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="cta-name" className="font-mono text-[9px] tracking-widest uppercase text-champagne-gold font-medium">
                    FULL NAME
                  </label>
                  <input
                    id="cta-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="ENTER YOUR FULL NAME"
                    className="w-full bg-obsidian/60 border border-white/10 px-4 py-3 text-[10px] tracking-widest uppercase text-platinum focus:border-champagne-gold outline-none transition-colors duration-300 font-sans"
                  />
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="cta-email" className="font-mono text-[9px] tracking-widest uppercase text-champagne-gold font-medium">
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    className="w-full bg-obsidian/60 border border-white/10 px-4 py-3 text-[10px] tracking-widest uppercase text-platinum focus:border-champagne-gold outline-none transition-colors duration-300 font-sans"
                  />
                </div>

                {/* Form row for wrist and variant */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  {/* Wrist selection */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="cta-wrist" className="font-mono text-[9px] tracking-widest uppercase text-champagne-gold font-medium">
                      WRIST SIZING
                    </label>
                    <select
                      id="cta-wrist"
                      value={formData.wristSize}
                      onChange={(e) => setFormData(prev => ({ ...prev, wristSize: e.target.value }))}
                      className="w-full bg-obsidian/60 border border-white/10 px-4 py-3 text-[10px] tracking-widest uppercase text-platinum focus:border-champagne-gold outline-none transition-colors duration-300 font-sans"
                    >
                      <option value="small">SMALL (14-16cm)</option>
                      <option value="medium">MEDIUM (16-18cm)</option>
                      <option value="large">LARGE (18-20cm)</option>
                    </select>
                  </div>

                  {/* Casing selection */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="cta-chassis" className="font-mono text-[9px] tracking-widest uppercase text-champagne-gold font-medium">
                      CHASSIS CONFIG
                    </label>
                    <select
                      id="cta-chassis"
                      value={formData.chassis}
                      onChange={(e) => setFormData(prev => ({ ...prev, chassis: e.target.value }))}
                      className="w-full bg-obsidian/60 border border-white/10 px-4 py-3 text-[10px] tracking-widest uppercase text-platinum focus:border-champagne-gold outline-none transition-colors duration-300 font-sans"
                    >
                      {WATCH_VARIANTS.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-4 flex items-center justify-center">
                  <MagneticButton range={60} className="w-full">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      icon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      SUBMIT RESERVATION REQUEST
                    </Button>
                  </MagneticButton>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="cta-success"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-[#0D0E10] border border-champagne-gold/30 p-8 text-center flex flex-col items-center shadow-[0_0_50px_rgba(201,165,92,0.1)] relative"
            >
              {/* Soft watermark background ticket */}
              <div className="absolute inset-0 opacity-[0.02] bg-radial from-champagne-gold to-transparent pointer-events-none" />

              {/* Green/Gold checkmark icon */}
              <div className="p-3 bg-champagne-gold/10 border border-champagne-gold/30 rounded-none mb-6 text-champagne-gold">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="font-mono text-[9px] tracking-[0.25em] text-champagne-gold mb-2 block font-semibold">
                REQUEST ACQUIRED
              </span>
              
              <h3 className="font-display text-2xl md:text-3xl font-medium text-platinum mb-4">
                Reservation Verified.
              </h3>
              
              <p className="font-sans text-xs text-platinum-dim leading-relaxed mb-8 max-w-sm font-light">
                Your entry has been appended to Batch 04&apos;s allocation sheet. Our horological concierge will reach out to your registered inbox within 24 hours to coordinate secure payment.
              </p>

              {/* Ticket graphic display with Dynamic Batch ID */}
              <div className="w-full bg-graphite border border-white/5 p-5 relative overflow-hidden border-dashed">
                {/* Decorative punched holes on ticket borders */}
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0d0e10] rounded-full border border-white/5" />
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0d0e10] rounded-full border border-white/5" />

                <div className="flex justify-between items-center mb-4 text-[7px] font-mono tracking-widest text-platinum-dim/40 border-b border-white/5 pb-2">
                  <span>ARENA ATELIER TICKET</span>
                  <Ticket className="w-3 h-3 text-champagne-gold" />
                </div>

                <div className="flex flex-col items-start text-left gap-3.5 mb-2.5">
                  <div className="flex justify-between w-full">
                    <span className="font-mono text-[8px] text-platinum-dim/40 tracking-wider">RESERVANT:</span>
                    <span className="font-sans text-[10px] text-platinum tracking-wide uppercase font-semibold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="font-mono text-[8px] text-platinum-dim/40 tracking-wider">CHASSIS CONFIG:</span>
                    <span className="font-sans text-[10px] text-champagne-gold tracking-wide uppercase font-medium">{selectedChassisName}</span>
                  </div>
                  <div className="flex justify-between w-full border-t border-white/5 pt-3 mt-1">
                    <span className="font-mono text-[8px] text-platinum-dim/40 tracking-wider pt-0.5">ALLOCATION SERIAL:</span>
                    <span className="font-mono text-xs text-champagne-gold-bright font-bold tracking-widest select-all">{ticketId}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic stamp button to reset */}
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 font-mono text-[8px] tracking-[0.2em] text-platinum-dim/40 hover:text-champagne-gold transition-colors duration-300 uppercase outline-none cursor-pointer p-1"
              >
                ← ENROLL ANOTHER PIECE
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
