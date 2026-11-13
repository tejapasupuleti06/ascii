'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, ArrowUpRight, ExternalLink } from 'lucide-react';

interface StudioTransitionSectionProps {
  onExploreTeja?: () => void;
  onExploreLokesh?: () => void;
}

export default function StudioTransitionSection({
  onExploreTeja,
  onExploreLokesh,
}: StudioTransitionSectionProps) {
  return (
    <section className="studio-transition-section" id="studio">
      <div className="studio-transition-ambient" />

      <div className="wrap studio-transition-inner">
        {/* Section Meta Tag */}
        <motion.div
          className="studio-meta-badge-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="studio-number-tag">03 / THE STUDIO</span>
          <span className="studio-ethos-pill">ENGINEERING + ART DIRECTION</span>
        </motion.div>

        {/* Large Typography with subtle clipping/masking reveal */}
        <div className="studio-statement-mask-stage">
          <div className="statement-line-overflow">
            <motion.h2
              className="studio-monumental-quote"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Good design gets noticed.
            </motion.h2>
          </div>
          <div className="statement-line-overflow">
            <motion.h2
              className="studio-monumental-quote accent-quote"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              Great design gets <em>remembered.</em>
            </motion.h2>
          </div>
        </div>

        {/* Supporting single concise studio statement */}
        <motion.div
          className="studio-supporting-statement-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.24 }}
        >
          <p className="studio-concise-paragraph">
            ASCII is an independent creative studio founded by <strong>Teja</strong> and <strong>Lokesh Y</strong>.
            We unite performance engineering with bold visual identity — crafting digital flagships, typographic systems, and brand languages engineered to endure.
          </p>
        </motion.div>

        {/* Minimal Founders Showcase */}
        <div className="studio-founders-grid">
          {/* Teja Card */}
          <motion.div
            className="founder-editorial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="founder-portrait-frame">
              <img
                src="/teja.jpg"
                alt="Teja, Creative Technologist and Web Architect"
                className="founder-portrait-image"
                loading="lazy"
              />
              <span className="founder-discipline-badge">CREATIVE ENGINEERING</span>
            </div>

            <div className="founder-details-block">
              <div className="founder-header-line">
                <h3 className="founder-name">Teja</h3>
                <span className="founder-role-title">Web Architect & Creative Technologist</span>
              </div>

              <p className="founder-micro-bio">
                Performance-driven Next.js architectures, kinetic animations, and interactive web flagships.
              </p>

              <div className="founder-reach-pills">
                <a href="tel:+919701173777" className="reach-pill" title="Call Teja">
                  <Phone size={12} />
                  <span>+91 97011 73777</span>
                </a>
                <a
                  href="https://wa.me/919701173777?text=Hello%20Teja%20(ASCII%20Studio)%2C%20I'd%20like%20to%20discuss%20a%20web%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="reach-pill wa-pill"
                >
                  <MessageSquare size={12} />
                  <span>WhatsApp ↗</span>
                </a>
                <a href="mailto:tejapasupuleti06@gmail.com" className="reach-pill" title="Email Teja">
                  <Mail size={12} />
                  <span>Email ↗</span>
                </a>
              </div>

              {onExploreTeja && (
                <button
                  type="button"
                  className="founder-view-action"
                  onClick={onExploreTeja}
                >
                  <span>Explore Engineering Works</span>
                  <ArrowUpRight size={14} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Lokesh Y Card */}
          <motion.div
            className="founder-editorial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="founder-portrait-frame">
              <img
                src="/lokesh-magazine-poster.png"
                alt="Lokesh Y, Graphic Designer and Brand Visual Artist"
                className="founder-portrait-image"
                loading="lazy"
              />
              <span className="founder-discipline-badge">BRAND & ART DIRECTION</span>
            </div>

            <div className="founder-details-block">
              <div className="founder-header-line">
                <h3 className="founder-name">Lokesh Y</h3>
                <span className="founder-role-title">Brand Identity Designer & Visual Artist</span>
              </div>

              <p className="founder-micro-bio">
                Visual identity systems, geometric marks, poster typography, and luxury brand aesthetics.
              </p>

              <div className="founder-reach-pills">
                <a href="tel:+916281488670" className="reach-pill" title="Call Lokesh">
                  <Phone size={12} />
                  <span>+91 62814 88670</span>
                </a>
                <a
                  href="https://wa.me/916281488670?text=Hello%20Lokesh%20(ASCII%20Studio)%2C%20I'd%20like%20to%20discuss%20a%20brand%20identity%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="reach-pill wa-pill"
                >
                  <MessageSquare size={12} />
                  <span>WhatsApp ↗</span>
                </a>
                <a href="mailto:ylokesh0099@gmail.com" className="reach-pill" title="Email Lokesh">
                  <Mail size={12} />
                  <span>Email ↗</span>
                </a>
              </div>

              {onExploreLokesh && (
                <button
                  type="button"
                  className="founder-view-action"
                  onClick={onExploreLokesh}
                >
                  <span>Explore Brand Archive</span>
                  <ArrowUpRight size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
