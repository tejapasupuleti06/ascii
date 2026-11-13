'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';

interface CuratedSilkHeroProps {
  onOpenMenu: () => void;
  onScheduleCall: () => void;
  onSelectFeature: (featureName: string) => void;
}

const featuresList = [
  { id: 'brand-identity', title: 'Brand Identity', target: 'brand-identity' },
  { id: 'web-app', title: 'Web & App Experiences', target: 'work' },
  { id: 'corporate-design', title: 'Corporate Design', target: 'services' },
  { id: 'digital-presence', title: 'Digital Presence', target: 'studio' },
];

export default function CuratedSilkHero({
  onOpenMenu,
  onScheduleCall,
  onSelectFeature,
}: CuratedSilkHeroProps) {
  return (
    <section className="curated-silk-hero-section" id="top">
      {/* 1. Deep Amber Molten Silk Background Image */}
      <div className="curated-silk-bg-container" aria-hidden="true">
        <img
          src="/amber-silk-bg.jpg"
          alt="Curated Studio Silk Backdrop"
          className="curated-silk-bg-image"
        />
        <div className="curated-silk-ambient-vignette" />

        {/* Delicate Perspective Wireframe Grid Overlay (matching Reference Image) */}
        <div className="curated-silk-wireframe-overlay">
          <svg
            className="curated-grid-svg"
            viewBox="0 0 1000 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 100 150 Q 500 200 900 150 M 80 250 Q 500 320 920 250 M 60 380 Q 500 450 940 380 M 50 500 Q 500 560 950 500"
              stroke="hsla(0, 0%, 90%, 0.12)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
            <path
              d="M 250 100 Q 270 350 240 550 M 380 90 Q 410 350 370 560 M 500 80 Q 500 350 500 570 M 620 90 Q 590 350 630 560 M 750 100 Q 730 350 760 550"
              stroke="hsla(0, 0%, 90%, 0.12)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      </div>

      {/* 2. Top Header Navigation Bar */}
      <header className="curated-hero-header wrap">
        {/* Top Left: asciitech with ↗ arrow */}
        <div className="curated-brand-lockup">
          <a href="#top" className="curated-brandmark-link">
            <span className="brand-text">asciitech</span>
            <span className="brand-arrow">↗</span>
          </a>
        </div>

        {/* Top Right: Two-line Menu Symbol */}
        <div className="curated-header-actions">
          <button
            type="button"
            className="curated-menu-toggle-btn"
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
          >
            <span className="menu-bar menu-bar-top" />
            <span className="menu-bar menu-bar-bottom" />
          </button>
        </div>
      </header>

      {/* 3. Schedule 15-Minute Call Pill (Aligned top right below header, matching Reference Image) */}
      <div className="wrap curated-schedule-pill-wrapper">
        <button
          type="button"
          className="curated-schedule-pill"
          onClick={onScheduleCall}
        >
          <span className="schedule-text">
            Schedule A 15-Minute Call With<br />Our Team To Discuss Your Project
          </span>
          <div className="schedule-avatar-group">
            <img
              src="/teja.jpg"
              alt="Teja - ASCII Lead"
              className="schedule-avatar-img"
            />
            <span className="schedule-plus-badge">
              <Plus size={10} strokeWidth={3} />
            </span>
          </div>
        </button>
      </div>

      {/* 4. Main Hero Typography & Editorial Layout */}
      <div className="wrap curated-hero-content-stage">
        {/* Left Column: EST tag, Monumental Headline, Supporting Narrative */}
        <div className="curated-hero-left-column">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="curated-est-tag"
          >
            EST. 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="curated-monumental-headline"
          >
            <span className="headline-row headline-curated">Curated</span>
            <span className="headline-row headline-studio">Design Studio</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="curated-supporting-paragraph"
          >
            We design brands, products and digital experiences for companies that refuse
            mediocrity. Creative precision. Enterprise scale. Built to move businesses forward.
          </motion.p>
        </div>

        {/* Right Column: Stacked Core Features / Disciplines List (matching Reference Image) */}
        <div className="curated-hero-right-column">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="curated-features-stack"
          >
            {featuresList.map((feature, idx) => (
              <motion.button
                key={feature.id}
                type="button"
                className="curated-feature-item"
                onClick={() => onSelectFeature(feature.title)}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                <span className="feature-item-title">{feature.title}</span>
                <span className="feature-item-hover-arrow">↗</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
