'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  image: string;
  liveUrl?: string;
  pdfUrl?: string;
  tags: string[];
}

const flagshipProjects: Project[] = [
  {
    id: 'surprise-cake',
    num: '01',
    title: 'Surprise Cakes',
    category: 'Artisanal Bakery · Interactive E-Commerce',
    year: '2026',
    image: '/surprise-cakes-cover.jpg',
    liveUrl: 'https://suprise-cakes.vercel.app/',
    pdfUrl: '/surprise-cakes-deck.pdf',
    tags: ['UI/UX Design', 'Full-Stack Next.js', 'Motion'],
  },
  {
    id: 'roreclub-digital',
    num: '02',
    title: 'The Rore Club',
    category: 'High Fashion · Brand & Web Architecture',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1500&q=85',
    liveUrl: 'https://lxshdesignsdesigns.netlify.app',
    pdfUrl: '/rcpdf.pdf',
    tags: ['Visual Identity', 'Digital Experience', 'Creative Engineering'],
  },
  {
    id: 'pr-men-dot',
    num: '03',
    title: 'PR Men Dot',
    category: 'Bespoke Grooming Atelier · Digital Flagship',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1500&q=85',
    liveUrl: 'https://www.prmendotsaloon.in/',
    tags: ['Creative Direction', 'Next.js 15', 'Sub-Second Interactions'],
  },
  {
    id: 'arogya-thatibellam',
    num: '04',
    title: 'Arogya Thatibellam',
    category: 'Heritage Organic Wellness · E-Commerce Platform',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1500&q=85',
    liveUrl: 'https://arogya-weld.vercel.app/',
    tags: ['Next.js Architecture', 'High-Conversion Catalog', 'E-Commerce'],
  },
];

interface HorizontalScrollGalleryProps {
  onOpenDeck?: (pdfUrl: string, title: string) => void;
}

export default function HorizontalScrollGallery({ onOpenDeck }: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 860);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate smooth horizontal movement connected to vertical scroll position
  // Moves the track from 0% to approximately -72% so the 4th project comes smoothly into full view
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-71%']);

  const handleCardClick = (project: Project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noreferrer');
    }
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className={`horizontal-gallery-outer ${isMobile ? 'is-mobile-gallery' : ''}`}
    >
      {/* Pinned Sticky Stage for Desktop / Tablet */}
      <div className="horizontal-gallery-sticky">
        {/* Gallery Section Header Row */}
        <div className="gallery-header-row wrap">
          <div className="gallery-header-meta">
            <span className="gallery-section-tag">01 / SELECTED WORK</span>
            <h2 className="gallery-section-title">Flagship Projects</h2>
          </div>
          <div className="gallery-header-hint">
            <span className="gallery-counter">
              01 — {String(flagshipProjects.length).padStart(2, '0')}
            </span>
            <span className="gallery-scroll-instruction">
              {isMobile ? 'Swipe horizontally' : 'Scroll to navigate'}
            </span>
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="horizontal-track-mask">
          {isMobile ? (
            /* Mobile touch-friendly snap scroll track */
            <div className="horizontal-track-mobile">
              {flagshipProjects.map((project) => (
                <article
                  key={project.id}
                  className="horizontal-project-card"
                  onClick={() => handleCardClick(project)}
                >
                  <div className="project-image-frame">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                    />
                    <div className="project-image-scrim" />
                    <span className="project-num-badge">{project.num}</span>
                  </div>

                  <div className="project-info-row">
                    <div className="project-meta-col">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-category">{project.category}</p>
                    </div>
                    <div className="project-action-col">
                      <span className="project-year">{project.year}</span>
                      <span className="project-link-icon" aria-label={`Open ${project.title}`}>
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>

                  <div className="project-tags-row">
                    {project.tags.map((t) => (
                      <span key={t} className="project-tag-pill">
                        {t}
                      </span>
                    ))}
                    {project.pdfUrl && onOpenDeck && (
                      <button
                        type="button"
                        className="project-tag-pill project-deck-pill"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDeck(project.pdfUrl!, project.title);
                        }}
                      >
                        Case Deck ↗
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Desktop/Tablet Vertical-Scroll-Driven Motion Track */
            <motion.div style={{ x }} className="horizontal-track-desktop">
              {flagshipProjects.map((project) => (
                <article
                  key={project.id}
                  className="horizontal-project-card"
                  onClick={() => handleCardClick(project)}
                >
                  <div className="project-image-frame">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                    />
                    <div className="project-image-scrim" />
                    <span className="project-num-badge">{project.num}</span>

                    <div className="project-hover-curtain">
                      <span className="project-hover-label">View Project</span>
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <div className="project-info-row">
                    <div className="project-meta-col">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-category">{project.category}</p>
                    </div>
                    <div className="project-action-col">
                      <span className="project-year">{project.year}</span>
                      <span className="project-link-icon">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>

                  <div className="project-tags-row">
                    {project.tags.map((t) => (
                      <span key={t} className="project-tag-pill">
                        {t}
                      </span>
                    ))}
                    {project.pdfUrl && onOpenDeck && (
                      <button
                        type="button"
                        className="project-tag-pill project-deck-pill"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDeck(project.pdfUrl!, project.title);
                        }}
                      >
                        Case Deck ↗
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
