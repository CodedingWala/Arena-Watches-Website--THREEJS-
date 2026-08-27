/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowUpRight, Instagram, Twitter, Globe } from "lucide-react";
import { useLenis } from "../../hooks/useLenis";
import { cn } from "../../lib/utils";

/**
 * Editorial, rich footer containing sitemaps, social indices, 
 * and an oversized typographic wordmark treatment.
 */
export const Footer: React.FC = () => {
  const lenis = useLenis();
  const currentYear = new Date().getFullYear();

  const handleSitemapClick = (id: string) => {
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -70, duration: 1.5 });
    }
  };

  const sitemapCols = [
    {
      title: "COLLECTION",
      links: [
        { label: "Automatic V.81", targetId: "collection" },
        { label: "Titanium Series", targetId: "materials" },
        { label: "Limited Batches", targetId: "reserve" },
        { label: "Bespoke Engravings", targetId: "reserve" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "Our Story", targetId: "heritage" },
        { label: "Atelier India", targetId: "precision" },
        { label: "Materials Science", targetId: "materials" },
        { label: "Sourcing Policy", targetId: "materials" },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { label: "Technical Support", targetId: "faq" },
        { label: "Atelier Servicing", targetId: "faq" },
        { label: "Extended Warranty", targetId: "specs" },
        { label: "Authenticity Ledger", targetId: "faq" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Privacy Policy", targetId: "faq" },
        { label: "Terms of Use", targetId: "faq" },
        { label: "Warranty Terms", targetId: "specs" },
        { label: "Declaration", targetId: "heritage" },
      ],
    },
  ];

  return (
    <footer className="bg-[#040405] border-t border-white/5 pt-16 md:pt-20 pb-12 overflow-hidden select-none relative">
      {/* Premium ambient backdrop glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-champagne-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ZONE A: Newsletter & Sitemaps */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8 pb-12 md:pb-14">
          
          {/* Newsletter / Brand Statement Column */}
          <div className="col-span-2 md:col-span-2 pr-0 md:pr-10">
            <h4 className="font-display text-lg font-medium text-platinum mb-4 tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full border border-champagne-gold bg-transparent inline-block shrink-0 animate-pulse" />
              Atelier Newsletter
            </h4>
            <p className="font-sans text-xs text-platinum-dim leading-relaxed mb-6 font-light">
              Register to receive advanced notifications for our highly-anticipated limited batch releases, mechanical logs, and private invitations.
            </p>
            
            {/* Visually hidden label for compliance */}
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                className="w-full bg-white/[0.02] border border-white/10 px-4 py-3.5 text-[10px] tracking-[0.2em] uppercase text-platinum focus:border-champagne-gold/60 focus:bg-white/[0.04] placeholder:text-platinum-dim outline-none transition-all duration-300 rounded-none font-sans"
              />
              <button
                type="submit"
                aria-label="Submit Newsletter"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-platinum-dim hover:text-champagne-gold transition-colors duration-300 p-1 cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Sitemap Columns */}
          {sitemapCols.map((col, idx) => (
            <div key={idx} className="col-span-1">
              <h5 className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-platinum-dim mb-5 md:mb-6">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-3.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button
                      onClick={() => handleSitemapClick(link.targetId)}
                      className="font-sans text-[11px] md:text-xs text-platinum hover:text-champagne-gold hover:translate-x-1 font-light transition-all duration-300 outline-none text-left cursor-pointer flex items-center gap-1 group"
                    >
                      <span className="w-0 h-[1px] bg-champagne-gold transition-all duration-300 group-hover:w-1.5" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Hairline Divider 1 */}
        <div className="w-full border-t border-white/10" />

        {/* ZONE B: Wordmark, Tagline, and Credit Signature */}
        <div className="py-12 md:py-16 flex flex-col items-center justify-center text-center">
          <h3 
            className="font-display text-[12vw] md:text-[9vw] font-bold tracking-[0.2em] leading-none text-center select-none text-transparent bg-clip-text bg-no-repeat bg-[position:0%_50%] hover:bg-[position:100%_50%] transition-[background-position] duration-1000 ease-out cursor-default"
            style={{
              backgroundImage: "linear-gradient(100deg, #4A4A4C 0%, #E8E6E0 45%, #8A8C90 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ARENA
          </h3>
          
          {/* Compact Tagline & Subtle Credit Signature */}
          <div className="mt-5 md:mt-6 flex flex-col items-center gap-2">
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.5em] text-champagne-gold/60 uppercase block font-semibold">
              EXPERIENCED HOROLOGY & DESIGN
            </span>
            <div className="h-[1px] w-8 bg-champagne-gold/25 my-1" />
            <span className="font-sans text-[11px] md:text-xs tracking-[0.25em] text-platinum-dim uppercase">
              Made by Atharva Kanojia
            </span>
          </div>
        </div>

        {/* Hairline Divider 2 */}
        <div className="w-full border-t border-white/10" />

        {/* ZONE C: Bottom Metadata & Legal Bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono tracking-[0.15em] text-platinum-dim">
          <div className="flex items-center gap-4">
            <span>BENGALURU, INDIA</span>
            <span className="text-champagne-gold/60">•</span>
            <span>ESTD 2026</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 items-center">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              referrerPolicy="no-referrer" 
              aria-label="Follow us on Instagram"
              className="hover:text-champagne-gold transition-colors duration-300 p-1"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              referrerPolicy="no-referrer" 
              aria-label="Follow us on Twitter"
              className="hover:text-champagne-gold transition-colors duration-300 p-1"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://ARENA.com" 
              target="_blank" 
              referrerPolicy="no-referrer" 
              aria-label="Our global web services"
              className="hover:text-champagne-gold transition-colors duration-300 p-1"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          <div className="text-center md:text-right font-sans font-light">
            © {currentYear} ARENA. All Rights Reserved. Engineered with precision.
          </div>
        </div>
      </div>
    </footer>
  );
};
