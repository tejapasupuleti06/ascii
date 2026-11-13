'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface EditorialHeroProps {
  onScrollToWork?: () => void;
  onScrollToContact?: () => void;
}

const rotatingWords = [
  'digital flagships',
  'brand identities',
  'interactive worlds',
  'visual systems',
];

export default function EditorialHero({
  onScrollToWork,
  onScrollToContact,
}: EditorialHeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="editorial-hero-container wrap" id="top">
      {/* Top Studio Micro-Header Meta */}
      <div className="editorial-hero-meta-row">
        <div className="hero-studio-badge">
          <span className="pulse-indicator" />
          <span>ASCII STUDIO — CREATIVE PRACTICE</span>
        </div>
        <div className="hero-discipline-meta">
          <span>WEB ARCHITECTURE • BRAND IDENTITY</span>
        </div>
      </div>

      {/* Primary Dynamic Headline */}
      <div className="editorial-hero-title-stage">
        <h1 className="editorial-hero-title">
          <span className="hero-title-line">
            Designing
          </span>
          <span className="hero-title-line rotating-slot-wrapper">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[index]}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className="rotating-text-dynamic"
              >
                {rotatingWords[index]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="hero-title-line hero-title-end">
            that <em className="hero-italic-emphasis">endure.</em>
          </span>
        </h1>
      </div>

      {/* Supporting One-Liner Description & Direct Scroll Anchor */}
      <div className="editorial-hero-footer-row">
        <p className="editorial-hero-subline">
          Where creative engineering meets uncompromising brand direction.
        </p>

        <div className="editorial-hero-actions">
          <a
            href="#work"
            onClick={(e) => {
              if (onScrollToWork) {
                e.preventDefault();
                onScrollToWork();
              }
            }}
            className="hero-pill-btn hero-primary-btn"
          >
            <span>Explore Work</span>
            <ArrowDown size={13} className="hero-arrow-bounce" />
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              if (onScrollToContact) {
                e.preventDefault();
                onScrollToContact();
              }
            }}
            className="hero-pill-btn hero-secondary-btn"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
