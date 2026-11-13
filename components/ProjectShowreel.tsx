'use client';

import { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Maximize2, X } from 'lucide-react';

export interface GalleryProject {
  id: number;
  title: string;
  category: string;
  year: string;
  date: string;
  image: string;
  color: string;
  isLogo?: boolean;
}

// 39 Works: 31 Archival Posters + 8 Brand Identity Logos with accurately sampled synced colors
export const galleryProjects: GalleryProject[] = [
  // Posters 01 to 31
  { id: 1, title: 'Form & Void', category: 'Typography', year: '2025', date: '01 sep', image: '/projects/poster-01.webp', color: '#c39a5b' },
  { id: 2, title: 'Fluid Mechanics', category: 'Editorial Design', year: '2025', date: '28 aug', image: '/projects/poster-02.webp', color: '#93bac3' },
  { id: 3, title: 'Brutalist Rhythm', category: 'Swiss Design', year: '2025', date: '24 aug', image: '/projects/poster-03.webp', color: '#c5b895' },
  { id: 4, title: 'Shadow & Structure', category: 'Brutalism', year: '2025', date: '19 aug', image: '/projects/poster-04.webp', color: '#414142' },
  { id: 5, title: 'Kinetic Mono', category: 'Typography', year: '2025', date: '15 aug', image: '/projects/poster-05.webp', color: '#f5eae1' },
  { id: 6, title: 'Symphony No. 6', category: 'Art Direction', year: '2025', date: '11 aug', image: '/projects/poster-06.webp', color: '#ddbc96' },
  { id: 7, title: 'Modernist Echo', category: 'Editorial Design', year: '2025', date: '06 aug', image: '/projects/poster-07.webp', color: '#f1e4dd' },
  { id: 8, title: 'Botanical Grid', category: 'Visual Art', year: '2025', date: '02 aug', image: '/projects/poster-08.webp', color: '#bed0ae' },
  { id: 9, title: 'Editorial Silence', category: 'Typography', year: '2025', date: '29 jul', image: '/projects/poster-09.webp', color: '#caae9f' },
  { id: 10, title: 'Mono Architecture', category: 'Brutalism', year: '2025', date: '25 jul', image: '/projects/poster-10.webp', color: '#59595c' },
  { id: 11, title: 'Pure Form', category: 'Swiss Minimal', year: '2025', date: '21 jul', image: '/projects/poster-11.webp', color: '#cdc4be' },
  { id: 12, title: 'Velvet Night', category: 'Visual Direction', year: '2025', date: '17 jul', image: '/projects/poster-12.webp', color: '#1c152b' },
  { id: 13, title: 'Raw Identity', category: 'Brutalist Type', year: '2025', date: '12 jul', image: '/projects/poster-13.webp', color: '#1c1312' },
  { id: 14, title: 'Crimson Monolith', category: 'Key Art', year: '2025', date: '08 jul', image: '/projects/poster-14.webp', color: '#221413' },
  { id: 15, title: 'Concrete Verse', category: 'Editorial', year: '2025', date: '04 jul', image: '/projects/poster-15.webp', color: '#545750' },
  { id: 16, title: 'Amber Horizon', category: 'Print Craft', year: '2025', date: '30 jun', image: '/projects/poster-16.webp', color: '#583d22' },
  { id: 17, title: 'Nocturne Opera', category: 'Storytelling', year: '2025', date: '26 jun', image: '/projects/poster-17.webp', color: '#420926' },
  { id: 18, title: 'Signal & Noise', category: 'Experimental', year: '2025', date: '22 jun', image: '/projects/poster-18.webp', color: '#6e7979' },
  { id: 19, title: 'Orchid Distortion', category: 'Acid Graphic', year: '2025', date: '18 jun', image: '/projects/poster-19.webp', color: '#d88fce' },
  { id: 20, title: 'Stark Void', category: 'Brutalism', year: '2025', date: '14 jun', image: '/projects/poster-20.webp', color: '#121212' },
  { id: 21, title: 'Chrome Fiction', category: 'Typography', year: '2025', date: '10 jun', image: '/projects/poster-21.webp', color: '#acaeae' },
  { id: 22, title: 'Atmospheric Blue', category: 'Editorial Design', year: '2025', date: '05 jun', image: '/projects/poster-22.webp', color: '#a2a4b3' },
  { id: 23, title: 'Warm Concrete', category: 'Print Direction', year: '2025', date: '01 jun', image: '/projects/poster-23.webp', color: '#cdbeb5' },
  { id: 24, title: 'Terra Incognita', category: 'Visual Art', year: '2025', date: '27 may', image: '/projects/poster-24.webp', color: '#8a7c6f' },
  { id: 25, title: 'Emerald Circuit', category: 'Digital Art', year: '2025', date: '22 may', image: '/projects/poster-25.webp', color: '#1d4229' },
  { id: 26, title: 'Graphite Pulse', category: 'Typography', year: '2025', date: '17 may', image: '/projects/poster-26.webp', color: '#464139' },
  { id: 27, title: 'Deep Burgundy', category: 'Editorial Layout', year: '2025', date: '12 may', image: '/projects/poster-27.webp', color: '#3a1f1e' },
  { id: 28, title: 'Citron Minimal', category: 'Swiss Grid', year: '2025', date: '07 may', image: '/projects/poster-28.webp', color: '#a9a46d' },
  { id: 29, title: 'Pastel Distortion', category: 'Typography', year: '2025', date: '02 may', image: '/projects/poster-29.webp', color: '#f7e5f6' },
  { id: 30, title: 'Terracotta Echo', category: 'Art Direction', year: '2025', date: '28 apr', image: '/projects/poster-30.webp', color: '#5a2623' },
  { id: 31, title: 'Cobalt Horizon', category: 'Visual Design', year: '2025', date: '24 apr', image: '/projects/poster-31.webp', color: '#364c65' },

  // Logos & Brand Systems (Synced colors)
  { id: 32, title: 'CMC Global', category: 'Corporate Identity', year: '2026', date: '01 jan', image: '/logo-01.png', color: '#172a3a', isLogo: true },
  { id: 33, title: 'Rore Monogram', category: 'Fashion Monogram', year: '2026', date: '15 jan', image: '/logo-02.png', color: '#26201e', isLogo: true },
  { id: 34, title: 'Suzen Mark', category: 'Tech Brandmark', year: '2026', date: '01 feb', image: '/logo-03.png', color: '#102030', isLogo: true },
  { id: 35, title: 'LX Signature', category: 'Geometric Mark', year: '2026', date: '18 feb', image: '/logo-04.png', color: '#202022', isLogo: true },
  { id: 36, title: 'MAXIFY', category: 'Growth & Strategy', year: '2026', date: '04 mar', image: '/logo-05.png', color: '#163022', isLogo: true },
  { id: 37, title: 'Bluebird (BB)', category: 'Packaging Identity', year: '2026', date: '19 mar', image: '/logo-06.png', color: '#1a344d', isLogo: true },
  { id: 38, title: 'BBC Culture', category: 'Visual Communication', year: '2026', date: '02 apr', image: '/logo-07.png', color: '#331e28', isLogo: true },
  { id: 39, title: 'Surprise Cakes', category: 'Bakery Brand System', year: '2026', date: '20 apr', image: '/surprise-cakes-cover.jpg', color: '#183f3d', isLogo: false }
];

const REPEAT = 5;

// Dynamic luminance check to guarantee 100% contrast readability
function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) || 0;
  const g = parseInt(c.substring(2, 4), 16) || 0;
  const b = parseInt(c.substring(4, 6), 16) || 0;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 135;
}

export default function ProjectShowreel({ onReturnToStudio }: { onReturnToStudio?: () => void }) {
  const [step, setStep] = useState(galleryProjects.length * 2);
  const [isPaused, setIsPaused] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<GalleryProject | null>(null);
  const [itemHeight, setItemHeight] = useState(76);

  // Responsive row height (76px on laptop/desktop, 52px on mobile)
  useEffect(() => {
    const handleResize = () => {
      setItemHeight(window.innerWidth <= 768 ? 52 : 76);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeIndex = step % galleryProjects.length;
  const activeProject = galleryProjects[activeIndex] || galleryProjects[0];
  const isLight = useMemo(() => isLightColor(activeProject.color), [activeProject.color]);

  // Automated smooth ticker loop (pauses when user hovers or opens fullscreen)
  useEffect(() => {
    if (isPaused || fullscreenImage !== null) return;
    const timer = setInterval(() => {
      setStep(current =>
        current >= galleryProjects.length * 3 - 1
          ? current - galleryProjects.length + 1
          : current + 1
      );
    }, 1250);

    return () => clearInterval(timer);
  }, [isPaused, fullscreenImage]);

  const repeatedProjects = useMemo(() => {
    return Array.from({ length: REPEAT }, () => galleryProjects).flat();
  }, []);

  return (
    <>
      <motion.section
        className={`showreel ${isLight ? 'theme-light-reel' : 'theme-dark-reel'}`}
        style={{ height: '100dvh', maxHeight: '100dvh', overflow: 'hidden' }}
        animate={{ backgroundColor: activeProject.color }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top Header */}
        <div className="showreel-header">
          <div className="showreel-header-left">
            {onReturnToStudio && (
              <button
                type="button"
                className="showreel-back-pill"
                onClick={onReturnToStudio}
                title="Return to Main Studio"
              >
                <ArrowLeft size={13} />
                <span>Return to Studio</span>
              </button>
            )}
            <span className="showreel-logo" aria-hidden="true">◼</span>
          </div>

          <span className="showreel-label">ARCHIVE SHOWREEL · 39 SELECTED WORKS</span>

          <span className="showreel-count">
            {String(activeIndex + 1).padStart(2, '0')} / {String(galleryProjects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Content: Left List Track & Right Preview Image (Optimized Size Matching Photo) */}
        <div className="showreel-content">
          <div className="project-list-window">
            <motion.div
              className="project-list-track"
              animate={{
                y: -(step * itemHeight) + (itemHeight === 52 ? 174 : 232),
              }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {repeatedProjects.map((project, index) => {
                const isActive = index === step;

                return (
                  <div
                    className={`project-row ${isActive ? 'active' : ''}`}
                    key={`${project.title}-${index}`}
                    onClick={() => setStep(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter') setStep(index);
                    }}
                  >
                    <span className="project-title">
                      {project.title}
                    </span>

                    <span className="project-category-pill">
                      {project.category}
                    </span>

                    <span className="project-date-chip">
                      [{project.date}]
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Interactive Preview Box (Large & Prominent Matching Photo) */}
          <div
            className="project-preview"
            onClick={() => setFullscreenImage(activeProject)}
            title="Click to view full image in lightbox"
            role="button"
            tabIndex={0}
          >
            <AnimatePresence mode="wait">
              {activeProject.isLogo ? (
                <motion.div
                  key={`logo-${activeProject.image}`}
                  className="preview-image preview-image-logo"
                  initial={{ opacity: 0, y: 25, scale: 0.94, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, scale: 0.97, filter: 'blur(5px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'invert(1)',
                    }}
                  />
                  <span className="preview-expand-badge">
                    <Maximize2 size={15} />
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key={`poster-${activeProject.image}`}
                  className="preview-image-wrap"
                  initial={{ opacity: 0, y: 25, scale: 0.96, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, scale: 0.97, filter: 'blur(5px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="preview-image"
                  />
                  <span className="preview-expand-badge">
                    <Maximize2 size={15} />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Lightbox Fullscreen Preview for Clicked Item */}
      <AnimatePresence>
        {fullscreenImage !== null && (
          <motion.div
            className="editorial-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setFullscreenImage(null)}
              aria-label="Close Preview"
            >
              <X size={24} />
            </button>

            <div className="lightbox-center-content" onClick={e => e.stopPropagation()}>
              <img
                src={fullscreenImage.image}
                alt={fullscreenImage.title}
                className="lightbox-main-img"
                style={fullscreenImage.isLogo ? { padding: '40px', background: '#111', filter: 'invert(1)', borderRadius: '24px' } : undefined}
              />
              <div className="lightbox-footer-bar">
                <span>{fullscreenImage.title} · {fullscreenImage.category} ({fullscreenImage.year})</span>
                <span>ASCII DIGITALS GALLERY ARCHIVE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
