'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  deliverables: string[];
  image: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'web-flagships',
    num: '01',
    title: 'Digital Flagships & Web Architecture',
    tagline: 'High-performance Next.js engineering with kinetic precision.',
    deliverables: ['Next.js 15 Full-Stack', 'Interactive WebGL', 'Micro-Interactions', 'SEO & Sub-Second Speeds'],
    image: '/surprise-cakes-cover.jpg',
  },
  {
    id: 'brand-identity',
    num: '02',
    title: 'Brand Identity & Visual Systems',
    tagline: 'Distilled brand marks, typographic systems, and enduring craft.',
    deliverables: ['Custom Monograms', 'Design Systems', 'Logomarks', 'Typography Spec'],
    image: '/rorehomepage.webp',
  },
  {
    id: 'ecommerce',
    num: '03',
    title: 'Interactive Commerce & Configurators',
    tagline: 'Conversion-engineered storefronts with bespoke 3D & custom flows.',
    deliverables: ['Sub-Second Checkout', 'Bespoke Customizer', 'E-Commerce Architecture', 'Cart Optimization'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1500&q=85',
  },
  {
    id: 'art-direction',
    num: '04',
    title: 'Art Direction & Editorial Typography',
    tagline: 'Posters, lookbooks, and tangible tactile brand aesthetics.',
    deliverables: ['Editorial Layouts', 'Print Collateral', 'Packaging Architecture', 'Campaign Direction'],
    image: '/suzen1.webp',
  },
  {
    id: 'motion-creative',
    num: '05',
    title: 'Creative Direction & Experiential Motion',
    tagline: 'Immersive interactions that turn passive viewers into devotees.',
    deliverables: ['Motion Systems', 'Three.js / WebGL', 'Interactive Prototypes', 'Experience Design'],
    image: '/projects/poster-01.webp',
  },
];

interface InteractiveServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export default function InteractiveServices({ onSelectService }: InteractiveServicesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0);

  const activeService = servicesData[activeIndex];

  const handleServiceClick = (service: ServiceItem, index: number) => {
    setActiveIndex(index);
    setExpandedMobile(expandedMobile === index ? null : index);
    if (onSelectService) {
      onSelectService(service.title);
    }
  };

  return (
    <section className="interactive-services-section wrap" id="services">
      {/* Section Header */}
      <div className="services-section-header">
        <span className="services-tag">02 / EXPERTISE</span>
        <h2 className="services-title">Services & Disciplines</h2>
      </div>

      <div className="interactive-services-stage">
        {/* Left Column: Vertical Interactive List */}
        <div className="services-list-column">
          {servicesData.map((service, idx) => {
            const isHovered = activeIndex === idx;
            const isExpanded = expandedMobile === idx;

            return (
              <div
                key={service.id}
                className={`service-list-item ${isHovered ? 'is-active-service' : ''}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => handleServiceClick(service, idx)}
              >
                <div className="service-row-main">
                  <span className="service-index">{service.num}</span>
                  <h3 className="service-name">{service.title}</h3>
                  <div className="service-indicator">
                    <span className="service-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                    <span className="service-mobile-chevron">
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </span>
                  </div>
                </div>

                {/* Mobile Expandable Preview & Deliverables */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="service-mobile-expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="service-mobile-img-box">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="service-mobile-img"
                          loading="lazy"
                        />
                      </div>
                      <p className="service-tagline-mobile">{service.tagline}</p>
                      <div className="service-deliverables-pills">
                        {service.deliverables.map((deliv) => (
                          <span key={deliv} className="deliv-pill">
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Floating Image Preview (Desktop/Tablet) */}
        <div className="services-preview-column" aria-hidden="true">
          <div className="services-preview-frame">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                className="services-preview-media"
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -12 }}
                transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="services-preview-img"
                  loading="lazy"
                />
                <div className="services-preview-scrim" />
              </motion.div>
            </AnimatePresence>

            <div className="services-preview-footer">
              <span className="preview-num">{activeService.num}</span>
              <div className="preview-meta">
                <span className="preview-tagline">{activeService.tagline}</span>
                <div className="preview-tags-row">
                  {activeService.deliverables.slice(0, 3).map((item) => (
                    <span key={item} className="preview-tag-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
