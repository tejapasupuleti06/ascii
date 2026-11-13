'use client';

import React, { useState, useRef } from 'react';

interface CuratedSpotlightHeroProps {
  theme?: 'dark' | 'light';
}

export default function CuratedSpotlightHero({ theme = 'dark' }: CuratedSpotlightHeroProps) {
  const isLight = theme === 'light';
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Palette colors based on present studio theme (Electric Teal, Warm Ivory, Ink Black)
  const accentColor = '#00AEBB';
  const lightConeStop = 'rgba(0, 174, 187, 0.35)';
  const lightConeStopFaint = 'rgba(0, 174, 187, 0.12)';
  const lightPoolStop = 'rgba(0, 174, 187, 0.24)';
  const baseFillColor = isLight ? 'rgba(3, 18, 17, 0.18)' : 'rgba(232, 228, 211, 0.18)';

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="curated-spotlight-hero-wrap wrap"
      id="top"
    >
      {/* Background ambient silk lines & glow */}
      <div className="maayasthra-grid-glow" aria-hidden="true" />
      <div className="maayasthra-silk-lines" aria-hidden="true" />

      {/* Interactive Cursor-Reactive Animated Matrix Grid */}
      <div
        className="animated-cursor-grid"
        style={{
          maskImage: `radial-gradient(circle 340px at ${mousePos.x}% ${mousePos.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 340px at ${mousePos.x}% ${mousePos.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="spotlight-svg-container">
        {/* ================= 1. DESKTOP / LAPTOP SPOTLIGHT SVG ================= */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280 820"
          className="spotlight-svg spotlight-svg-desktop"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Volumetric spotlight beam gradient: Extends continuously to bottom border */}
            <linearGradient id="gradiantLightDesk" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor={lightConeStop} />
              <stop offset="35%" stopColor={lightConeStop} />
              <stop offset="70%" stopColor={lightConeStopFaint} />
              <stop offset="96%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>

            {/* Soft focus blur for realistic beam dispersion */}
            <filter id="blurFilterDesk" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
            </filter>

            {/* Radial gradient mask for smooth spotlight feathering */}
            <radialGradient id="gradientMaskDesk" cx="50%" cy="40%" r="62%" fx="50%" fy="50%">
              <stop offset="35%" stopColor="#fff" />
              <stop offset="65%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>

            {/* Mask to reveal glowing stroke under the spotlight */}
            <mask id="maskStrokeShowDesk">
              <ellipse
                className="spotlight-rotate"
                fill="url(#gradientMaskDesk)"
                cx="640"
                cy="330"
                rx="245"
                ry="190"
              />
            </mask>

            {/* Mask to cut out the muted base fill where spotlight hits */}
            <mask id="maskHideFillDesk">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <ellipse
                className="spotlight-rotate"
                cx="640"
                cy="330"
                rx="245"
                ry="190"
                fill="black"
              />
            </mask>

            {/* Word Definitions: Curated Design Studio */}
            <g id="curatedWordsDesk">
              <text
                x="640"
                y="270"
                textAnchor="middle"
                fontFamily="var(--font-display), 'Space Grotesk', -apple-system, sans-serif"
                fontWeight="700"
                fontSize="120"
                letterSpacing="-0.045em"
              >
                Curated
              </text>
              <text
                x="640"
                y="398"
                textAnchor="middle"
                fontFamily="var(--font-display), 'Space Grotesk', -apple-system, sans-serif"
                fontWeight="600"
                fontStyle="italic"
                fontSize="116"
                letterSpacing="-0.045em"
              >
                Design Studio
              </text>
            </g>
          </defs>

          {/* Layer 1: Base Muted Fill (outside spotlight) */}
          <use
            href="#curatedWordsDesk"
            className="wordsFill"
            style={{
              fill: baseFillColor,
            }}
            mask="url(#maskHideFillDesk)"
          />

          {/* Layer 2: Swinging Spotlight Beam & Light Pool (Extends to bottom border) */}
          <g className="spotlight-rotate" filter="url(#blurFilterDesk)">
            {/* Volumetric light cone extending all the way to bottom boundary */}
            <polygon
              fill="url(#gradiantLightDesk)"
              points="360 330, 440 1200, 840 1200, 920 330, 360 330"
            />
            {/* Elliptical beam puddle */}
            <ellipse
              fill={lightPoolStop}
              cx="640"
              cy="330"
              rx="245"
              ry="190"
            />
          </g>

          {/* Layer 3: Neon Illuminated Stroke revealed only by the swinging spotlight */}
          <use
            href="#curatedWordsDesk"
            mask="url(#maskStrokeShowDesk)"
            className="wordsStroke"
            style={{
              stroke: accentColor,
              strokeWidth: 2,
              filter: 'drop-shadow(0 0 20px rgba(0, 174, 187, 0.95)) drop-shadow(0 0 5px #00AEBB) drop-shadow(0 0 1px #E8E4D3)',
            }}
          />
        </svg>

        {/* ================= 2. MOBILE-OPTIMIZED SPOTLIGHT SVG ================= */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 540 820"
          className="spotlight-svg spotlight-svg-mobile"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="gradiantLightMob" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor={lightConeStop} />
              <stop offset="35%" stopColor={lightConeStop} />
              <stop offset="70%" stopColor={lightConeStopFaint} />
              <stop offset="96%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>

            <filter id="blurFilterMob" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>

            <radialGradient id="gradientMaskMob" cx="50%" cy="40%" r="62%" fx="50%" fy="50%">
              <stop offset="35%" stopColor="#fff" />
              <stop offset="65%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>

            <mask id="maskStrokeShowMob">
              <ellipse
                className="spotlight-rotate-mob"
                fill="url(#gradientMaskMob)"
                cx="270"
                cy="325"
                rx="180"
                ry="155"
              />
            </mask>

            <mask id="maskHideFillMob">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <ellipse
                className="spotlight-rotate-mob"
                cx="270"
                cy="325"
                rx="180"
                ry="155"
                fill="black"
              />
            </mask>

            <g id="curatedWordsMob">
              <text
                x="270"
                y="290"
                textAnchor="middle"
                fontFamily="var(--font-display), 'Space Grotesk', -apple-system, sans-serif"
                fontWeight="700"
                fontSize="76"
                letterSpacing="-0.04em"
              >
                Curated
              </text>
              <text
                x="270"
                y="382"
                textAnchor="middle"
                fontFamily="var(--font-display), 'Space Grotesk', -apple-system, sans-serif"
                fontWeight="600"
                fontStyle="italic"
                fontSize="68"
                letterSpacing="-0.04em"
              >
                Design Studio
              </text>
            </g>
          </defs>

          {/* Base fill */}
          <use
            href="#curatedWordsMob"
            className="wordsFill"
            style={{
              fill: baseFillColor,
            }}
            mask="url(#maskHideFillMob)"
          />

          {/* Swinging beam extending all the way to bottom border */}
          <g className="spotlight-rotate-mob" filter="url(#blurFilterMob)">
            <polygon
              fill="url(#gradiantLightMob)"
              points="90 325, 130 1200, 410 1200, 450 325, 90 325"
            />
            <ellipse
              fill={lightPoolStop}
              cx="270"
              cy="325"
              rx="180"
              ry="155"
            />
          </g>

          {/* Neon stroke */}
          <use
            href="#curatedWordsMob"
            mask="url(#maskStrokeShowMob)"
            className="wordsStroke"
            style={{
              stroke: accentColor,
              strokeWidth: 2,
              filter: 'drop-shadow(0 0 18px rgba(0, 174, 187, 0.95)) drop-shadow(0 0 5px #00AEBB) drop-shadow(0 0 1px #E8E4D3)',
            }}
          />
        </svg>
      </div>
    </section>
  );
}
