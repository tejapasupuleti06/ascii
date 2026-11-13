'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  MoveUpRight,
  ExternalLink,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  Check,
  Code2,
  Palette,
  Phone,
  Mail,
  Sun,
  Moon,
  MessageSquare,
  Sparkles,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import ProjectShowreel from '../components/ProjectShowreel';
import CuratedSilkHero from '../components/CuratedSilkHero';
import EditorialMenuModal from '../components/EditorialMenuModal';
import InteractiveServices from '../components/InteractiveServices';
import StudioTransitionSection from '../components/StudioTransitionSection';
import BrandMarksHoverExpand from '../components/BrandMarksHoverExpand';
import ProgressiveBlur from '../components/ProgressiveBlur';
import PeacockLoader from '../components/PeacockLoader';

// Joint & Web Flagship Projects (Crafted from Imagination)
const webProjects = [
  {
    id: 'surprise-cake',
    title: 'SURPRISE CAKES',
    brandName: 'SURPRISE CAKES',
    category: 'Artisanal Bakery & Interactive E-Commerce',
    year: '2026',
    image: '/surprise-cakes-cover.jpg',
    logoImg: '/surprise-cakes-logo-trans.png',
    summary: 'Delight-driven celebration bakery interface with custom bespoke cake configurator and seamless real-time ordering.',
    tags: ['UI/UX Design', 'Full-Stack', 'Motion'],
    metrics: 'Sub-second Load',
    liveUrl: 'https://suprise-cakes.vercel.app/',
    pdfUrl: '/surprise-cakes-deck.pdf',
    emblemType: 'cake'
  },
  {
    id: 'roreclub-digital',
    title: 'THE RORE CLUB',
    brandName: 'THE RORE CLUB',
    category: 'High Fashion · Brand & Web Architecture',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1500&q=85',
    summary: 'The digital flagship companion to Lokesh Y’s runway brand identity, pairing stark Swiss typography with seamless lookbooks.',
    tags: ['Digital Experience', 'Creative Engineering'],
    metrics: 'Joint Duo Case',
    liveUrl: 'https://lxshdesignsdesigns.netlify.app',
    pdfUrl: '/rcpdf.pdf',
    emblemType: 'monogram'
  },
  {
    id: 'pr-men-dot',
    title: 'PR MEN DOT',
    brandName: 'PR MEN DOT',
    category: 'Bespoke Grooming Atelier · Digital Flagship',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1500&q=85',
    summary: 'High-performance bespoke grooming platform built with reactive micro-interactions, sub-second transitions, and tactile typography.',
    tags: ['Next.js 15', 'Creative Direction', 'E-Commerce'],
    metrics: '+180% Engagement',
    liveUrl: 'https://www.prmendotsaloon.in/',
    emblemType: 'barber'
  },
  {
    id: 'arogya-thatibellam',
    title: 'AROGYA THATIBELLAM',
    brandName: 'AROGYA THATIBELLAM',
    category: 'Heritage Organic Wellness · E-Commerce Platform',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1500&q=85',
    summary: 'Heritage organic palm jaggery & wellness e-commerce storefront with high-conversion product catalog and frictionless checkout.',
    tags: ['Next.js', 'E-Commerce Architecture', 'Full-Stack'],
    metrics: '99 Speed Score',
    liveUrl: 'https://arogya-weld.vercel.app/',
    emblemType: 'palm'
  }
];

// Bespoke SVG Emblems for Flagship Cards
const renderProjectEmblem = (type?: string) => {
  switch (type) {
    case 'barber':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      );
    case 'cake':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
          <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
          <path d="M2 21h20" />
          <circle cx="12" cy="4" r="1.5" />
          <path d="M12 5.5v2.5" />
        </svg>
      );
    case 'diamond':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l4 6-10 12L2 9z" />
          <path d="M11 3 8 9l4 12 4-12-3-6" />
          <path d="M2 9h20" />
        </svg>
      );
    case 'palm':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22V8" />
          <path d="M12 8C12 4 7 3 2 4c1 4 4 7 10 4" />
          <path d="M12 8c0-4 5-5 10-4-1 4-4 7-10 4" />
          <path d="M12 13c-4-2-7-1-9 1 2 2 5 2 9-1" />
          <path d="M12 13c4-2 7-1 9 1-2 2-5 2-9-1" />
        </svg>
      );
    case 'monogram':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8 8h5a2.5 2.5 0 0 1 0 5H8z" />
          <path d="M13 13l3 5" />
          <path d="M8 8v10" />
        </svg>
      );
    default:
      return <Sparkles size={22} />;
  }
};

// Lokesh Y's 3 Complete Brand Identity Decks
const brandDecks = [
  {
    id: 'surprise-cakes',
    title: 'Surprise Cakes',
    discipline: 'Artisanal Bakery Brand Identity & Packaging',
    image: '/surprise-cakes-cover.jpg',
    pdf: '/surprise-cakes-deck.pdf',
    description:
      'Complete brand identity and packaging architecture for an artisanal celebration bakery: geometric S-and-C cake box mark, bespoke color palette (Teal & Cream), custom gift packaging, storefront signage, and brand guidelines.',
    deliverables: ['Logo & Monogram System', 'Brand Guidelines & Color Architecture', 'Packaging & Box Architecture', 'Storefront & Environmental Signage']
  },
  {
    id: 'rore-club',
    title: 'The Rore Club',
    discipline: 'Fashion Brand Identity & Campaign Direction',
    image: '/rorehomepage.webp',
    pdf: '/rcpdf.pdf',
    description:
      'A full visual identity system built for a premium fashion label: stripped monogram, tightly kerned display type, and a black-and-bone palette carried across packaging, campaign imagery, and digital touchpoints.',
    deliverables: ['Custom Monogram', 'Packaging System', 'Lookbook & Campaign Direction', 'Typography Spec']
  },
  {
    id: 'suzen',
    title: 'Suzen',
    discipline: 'Technology Brand System & Identity',
    image: '/suzen1.webp',
    pdf: '/SUZEN%20FINAL.pdf',
    description:
      'Brand identity and visual system for Suzen. Precision geometric construction, comprehensive logo system, color architecture, and clean graphic standards engineered for both digital hardware and print.',
    deliverables: ['Geometric Mark', 'Design System', 'Print Collateral', 'Product Guidelines']
  }
];

// Lokesh Y's 7 Logo Studies (Top 3 Curated on Main Page)
const logoStudies = [
  { no: '01', name: 'CMC Global', image: '/logo-01.png', pdf: '/CMC%20FINAL.pdf', category: 'Corporate Identity' },
  { no: '02', name: 'Rore Monogram', image: '/logo-02.png', pdf: '/rcpdf.pdf', category: 'Fashion Monogram' },
  { no: '03', name: 'Suzen Mark', image: '/logo-03.png', pdf: '/SUZEN%20FINAL.pdf', category: 'Tech Brandmark' },
  { no: '04', name: 'LX Signature', image: '/logo-04.png', pdf: '/lxconfirm.pdf', category: 'Geometric Mark' },
  { no: '05', name: 'MAXIFY', image: '/logo-05.png', pdf: '/MAXIFY.pdf', category: 'Growth & Strategy' },
  { no: '06', name: 'Bluebird (BB)', image: '/logo-06.png', pdf: '/BB%20FINAL.pdf', category: 'Packaging & Identity' },
  { no: '07', name: 'BBC Culture', image: '/logo-07.png', pdf: '/bbc1.pdf', category: 'Visual Communication' }
];

// 31 Archival Posters by Lokesh
const posterWorks = Array.from({ length: 31 }, (_, i) => ({
  id: i + 1,
  no: String(i + 1).padStart(2, '0'),
  image: `/projects/poster-${String(i + 1).padStart(2, '0')}.webp`,
  title: `Poster Exploration ${String(i + 1).padStart(2, '0')}`,
  category: i % 3 === 0 ? 'Typography' : i % 3 === 1 ? 'Editorial' : 'Brutalism'
}));

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: transitionEase } }
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  // Direct Views: 'main' (Curated Design Studio) | 'teja' (Web) | 'lokesh' (Brand) | 'gallery' (Showreel)
  const [activeView, setActiveView] = useState<'main' | 'teja' | 'lokesh' | 'gallery'>('main');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [introLoading, setIntroLoading] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePoster, setActivePoster] = useState<number | null>(null);
  const [activeDeck, setActiveDeck] = useState<typeof brandDecks[0] | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>(['Website Design & Dev']);
  const [recipient, setRecipient] = useState<'both' | 'teja' | 'lokesh'>('both');

  // Dynamic Browser Tab Title based on active view
  useEffect(() => {
    switch (activeView) {
      case 'main':
        document.title = 'ASCII DIGITALS — Curated Design Studio';
        break;
      case 'teja':
        document.title = 'Teja — Creative Engineering & Web Flagships';
        break;
      case 'lokesh':
        document.title = 'Lokesh Y — Brand Identity & Visual Art Direction';
        break;
      case 'gallery':
        document.title = 'Archival Showreel — 39 Selected Works | ASCII DIGITALS';
        break;
    }
  }, [activeView]);

  // ESC Key listener & Body Scroll Lock for Menu/Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) setMenuOpen(false);
        if (activePoster !== null) setActivePoster(null);
        if (activeDeck !== null) setActiveDeck(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, activePoster, activeDeck]);

  useEffect(() => {
    if (menuOpen || activePoster !== null || activeDeck !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, activePoster, activeDeck]);

  const playSound = useCallback((_type?: 'click' | 'switch' | 'chime' | 'hover') => {}, []);

  // System & Device Preference Theme Detection
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ff_theme') as 'dark' | 'light' | null;
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
        return;
      }
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }

      const mq = window.matchMedia('(prefers-color-scheme: light)');
      const handleMq = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('ff_theme')) {
          const next = e.matches ? 'light' : 'dark';
          setTheme(next);
          document.documentElement.setAttribute('data-theme', next);
        }
      };
      mq.addEventListener('change', handleMq);
      return () => mq.removeEventListener('change', handleMq);
    } catch {
      // Fallback
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('ff_theme', next);
      } catch {
        // Fallback
      }
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Modal ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDeck(null);
        setActivePoster(null);
      }
      if (activePoster !== null) {
        if (e.key === 'ArrowRight') {
          playSound('click');
          setActivePoster((activePoster + 1) % posterWorks.length);
        } else if (e.key === 'ArrowLeft') {
          playSound('click');
          setActivePoster((activePoster + posterWorks.length - 1) % posterWorks.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePoster, playSound]);

  const toggleService = (service: string) => {
    playSound('click');
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  // WhatsApp routing with ASCII Studio
  const getWhatsAppUrl = () => {
    const servicesList = selectedServices.length > 0 ? selectedServices.join(', ') : 'Creative Commission';
    const text = encodeURIComponent(
      `Hello ASCII Studio,\n\nI’d like to discuss a project commission regarding: ${servicesList}.\nLooking forward to connecting!`
    );
    return `https://wa.me/919701173777?text=${text}`;
  };

  // Direct Email with ASCII Studio
  const getEmailUrl = () => {
    const servicesList = selectedServices.length > 0 ? selectedServices.join(', ') : 'Creative Commission';
    const subject = encodeURIComponent(`ASCII Commission: ${servicesList}`);
    const body = encodeURIComponent(
      `Hello ASCII Studio Team,\n\nI am reaching out regarding a project commission with ASCII Studio.\n\nRequested Scope:\n${servicesList}\n\nPlease let us know your current availability for a discovery discussion.\n\nBest regards,`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=asciisupport@gmail.com&su=${subject}&body=${body}`;
  };

  // Dock & Nav View Switcher with smooth scroll
  const selectView = (view: 'main' | 'teja' | 'lokesh' | 'gallery', scrollToSection?: string) => {
    playSound('chime');
    setActiveView(view);
    if (view === 'teja') setRecipient('teja');
    else if (view === 'lokesh') setRecipient('lokesh');
    else setRecipient('both');

    if (scrollToSection) {
      setTimeout(() => {
        const el = document.getElementById(scrollToSection);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Global Tactile Film Grain Overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* ================= 1. PEACOCK 3D LOADING & CIRCULAR PRELOADER IRIS ================= */}
      {introLoading && (
        <PeacockLoader
          speed={0.75}
          theme="asciiStudio"
          activeView={activeView}
          onTransitionStart={() => setIsOpening(true)}
          onTransitionComplete={() => setIntroLoading(false)}
        />
      )}

      {/* ================= 2. MAIN APPLICATION WORKSPACE WITH CIRCULAR REVEAL ================= */}
      <div
        className="circular-page-reveal-wrapper"
        style={{
          clipPath: isOpening || !introLoading ? 'circle(160% at 50% 50%)' : 'circle(0% at 50% 50%)',
        }}
      >
        <div className="view-transition-wrapper">
          {/* Subtle aperture curtain wipe during view switches */}
          <motion.div
            key={`curtain-${activeView}`}
            className="luxury-view-shutter"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.52, ease: transitionEase }}
            aria-hidden="true"
          />

          {/* ================= SITE HEADER: BRANDMARK & MENU FOR SUB-VIEWS ================= */}
          {activeView !== 'main' && (
            <header className="site-nav site-nav-minimal">
              <button
                type="button"
                className="studio-brandmark"
                aria-label="asciitech"
                onClick={() => selectView('main')}
                data-cursor="HOME"
              >
                <span>asciitech</span>
                <span style={{ color: 'hsl(21, 100%, 75%)' }}>↗</span>
              </button>
              <button
                type="button"
                className="curated-menu-toggle-btn"
                onClick={() => setMenuOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <span className="menu-bar menu-bar-top" />
                <span className="menu-bar menu-bar-bottom" />
              </button>
            </header>
          )}

          {/* ================= SMOOTH VIEW TRANSITION CONTAINER ================= */}
          <AnimatePresence mode="wait">
            {activeView === 'main' && (
              /* ================= MAIN PAGE: CURATED DESIGN STUDIO + ALL BLOCKS ================= */
              <motion.div
                key="main-view"
                className="studio-canvas"
                data-theme={theme}
                initial={{ opacity: 1, scale: 1, filter: 'none', y: 0 }}
                animate={{ opacity: 1, scale: 1, filter: 'none', y: 0 }}
                exit={{ opacity: 0, scale: 1.015, filter: 'blur(10px)', y: -20 }}
                transition={{ duration: 0.55, ease: transitionEase }}
              >
                {/* ================= 1. HERO SECTION: CURATED DESIGN STUDIO ON AMBER SILK ================= */}
                <CuratedSilkHero
                  onOpenMenu={() => setMenuOpen(true)}
                  onScheduleCall={() => {
                    playSound('chime');
                    window.open(getWhatsAppUrl(), '_blank', 'noreferrer');
                  }}
                  onSelectFeature={(featureTitle) => {
                    playSound('click');
                    if (featureTitle.toLowerCase().includes('brand')) {
                      const el = document.getElementById('brand-marks');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    } else if (featureTitle.toLowerCase().includes('web')) {
                      const el = document.getElementById('work');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    } else if (featureTitle.toLowerCase().includes('corporate')) {
                      const el = document.getElementById('services');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      const el = document.getElementById('studio');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />

                {/* ================= 2. CRAFTED FROM IMAGINATION: ORIGINAL SMOOTH GRID (ZERO LAG) ================= */}
                <section className="section-block wrap" id="work">
                  <div className="editorial-section-header">
                    <div>
                      <h2 className="maayasthra-heading">Crafted from Imagination</h2>
                    </div>
                  </div>

                  <div className="crafted-projects-grid">
                    {webProjects.map((project, index) => (
                      <motion.article
                        key={project.id}
                        className="crafted-card"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{ duration: 0.55, delay: index * 0.08 }}
                        onClick={() => {
                          if (project.liveUrl) {
                            playSound('click');
                            window.open(project.liveUrl, '_blank', 'noreferrer');
                          }
                        }}
                      >
                        <div className="crafted-media-frame">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="crafted-media-img"
                            loading="lazy"
                          />
                          <div className="crafted-media-overlay" />

                          <div className="crafted-center-highlight">
                            {project.logoImg ? (
                              <div className="crafted-brand-lockup">
                                <img
                                  src={project.logoImg}
                                  alt={project.brandName || project.title}
                                  className="crafted-logo-img"
                                />
                              </div>
                            ) : (
                              <div className="crafted-brand-lockup">
                                <div className="crafted-emblem-badge">
                                  {renderProjectEmblem(project.emblemType)}
                                </div>
                                <h4 className="crafted-brand-title">{project.brandName || project.title}</h4>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="crafted-card-header">
                          <div className="crafted-name-row">
                            <h3 className="crafted-card-name">{project.title}</h3>
                            <span className="crafted-card-arrow">
                              <ArrowUpRight size={18} />
                            </span>
                          </div>
                          <div className="crafted-card-subline">
                            <span className="crafted-category-text">{project.category}</span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </section>

                {/* ================= 3. INTERACTIVE SERVICES: LIST WITH HOVER IMAGE PREVIEW ================= */}
                <InteractiveServices
                  onSelectService={(serviceTitle) => {
                    if (serviceTitle.toLowerCase().includes('brand') || serviceTitle.toLowerCase().includes('art')) {
                      selectView('lokesh', 'brand-identity');
                    } else {
                      selectView('teja', 'teja-services');
                    }
                  }}
                />

                {/* ================= 3. SELECTED BRAND MARKS (HOVER EXPAND ACCORDION) ================= */}
                <section className="section-block wrap" id="brand-marks">
                  <div className="logos-sub-header">
                    <div>
                      <h3 className="sub-title">Brand Identity Marks</h3>
                    </div>
                  </div>

                  <BrandMarksHoverExpand
                    marks={logoStudies}
                    maxDisplay={5}
                    onOpenDeck={(pdfUrl, title) => {
                      const deckItem = brandDecks.find(d => d.pdf === pdfUrl) || {
                        id: title.toLowerCase().replace(/\s+/g, '-'),
                        title,
                        discipline: 'Brand Identity Case Presentation',
                        image: '/surprise-cakes-cover.jpg',
                        pdf: pdfUrl,
                        description: `Complete brand identity and visual architecture deck for ${title}.`,
                        deliverables: ['Identity System', 'Brand Guidelines', 'Visual Assets']
                      };
                      setActiveDeck(deckItem);
                    }}
                  />

                  <div className="curated-cta-container">
                    <button
                      type="button"
                      className="curated-explore-archive-btn"
                      onClick={() => selectView('lokesh', 'brand-marks')}
                      data-cursor="LOKESH MARKS"
                    >
                      <span>Explore Full Brand Archive (All 7 Marks & 3 Complete Decks)</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </section>

                {/* ================= 4. FEATURED POSTER WORKS (TOP 4 POSTERS) ================= */}
                <section className="section-block wrap" id="featured-posters">
                  <div className="editorial-section-header">
                    <div>
                      <h2 className="editorial-heading">Featured Poster Works</h2>
                    </div>
                  </div>

                  <div className="poster-mosaic-grid">
                    {posterWorks.slice(0, 4).map((poster, index) => (
                      <motion.button
                        type="button"
                        key={poster.id}
                        className="poster-card-button"
                        onClick={() => {
                          playSound('chime');
                          setActivePoster(index);
                        }}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.08 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        data-cursor="EXPAND"
                        aria-label={`View ${poster.title}`}
                      >
                        <img src={poster.image} alt={poster.title} loading="lazy" />
                        <div className="poster-curtain">
                          <span className="poster-tag-no">{poster.no}</span>
                          <span className="poster-tag-action">View Full ↗</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="curated-cta-container">
                    <button
                      type="button"
                      className="curated-explore-archive-btn"
                      onClick={() => selectView('gallery')}
                      data-cursor="GALLERY"
                    >
                      <ImageIcon size={14} />
                      <span>Explore Complete 39-Work Archival Showreel & Gallery</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </section>

                {/* ================= 5. THE STUDIO: IMMERSIVE SCROLL TRANSITION & FOUNDERS ================= */}
                <StudioTransitionSection
                  onExploreTeja={() => selectView('teja', 'projects')}
                  onExploreLokesh={() => selectView('lokesh', 'brand-identity')}
                />

                {/* ================= 5. STUDIO DIRECT INQUIRIES & CONTACT ================= */}
                <section className="section-block wrap studio-contact-section" id="contact">
                  <div className="studio-contact-card">
                    <div className="studio-contact-glow" aria-hidden="true" />

                    <div className="studio-contact-content">
                      <div className="studio-contact-meta">
                        <span className="studio-contact-pill">DIRECT DIALOGUE</span>
                        <span className="studio-contact-status">● ACCEPTING SELECT COMMISSIONS</span>
                      </div>

                      <h2 className="studio-contact-headline">
                        Let’s craft an iconic digital flagship or brand architecture.
                      </h2>

                      <p className="studio-contact-sub">
                        Direct communication channel to the studio founders. High-performance Next.js engineering and bespoke visual direction.
                      </p>

                      <div className="studio-contact-actions-grid">
                        {/* Direct Email */}
                        <a
                          href="mailto:asciisupport@gmail.com?subject=ASCII%20Studio%20Commission%20Inquiry"
                          className="studio-contact-action-btn email-btn"
                          data-cursor="EMAIL"
                        >
                          <div className="action-btn-icon-wrap">
                            <Mail size={18} />
                          </div>
                          <div className="action-btn-text">
                            <span className="action-btn-label">Studio Email</span>
                            <span className="action-btn-value">asciisupport@gmail.com</span>
                          </div>
                          <ArrowUpRight size={16} className="action-btn-arrow" />
                        </a>

                        {/* Direct Phone / Call */}
                        <a
                          href="tel:+919701173777"
                          className="studio-contact-action-btn phone-btn"
                          data-cursor="CALL"
                        >
                          <div className="action-btn-icon-wrap">
                            <Phone size={18} />
                          </div>
                          <div className="action-btn-text">
                            <span className="action-btn-label">Direct Phone</span>
                            <span className="action-btn-value">+91 9701173777</span>
                          </div>
                          <ArrowUpRight size={16} className="action-btn-arrow" />
                        </a>

                        {/* Direct WhatsApp Button */}
                        <a
                          href="https://wa.me/919701173777?text=Hello%20ASCII%20Studio%2C%20I'd%20like%20to%20discuss%20a%20project%20commission."
                          target="_blank"
                          rel="noreferrer"
                          className="studio-contact-action-btn whatsapp-btn"
                          data-cursor="WHATSAPP"
                        >
                          <div className="action-btn-icon-wrap">
                            <MessageSquare size={18} />
                          </div>
                          <div className="action-btn-text">
                            <span className="action-btn-label">Instant WhatsApp</span>
                            <span className="action-btn-value">Chat on WhatsApp ↗</span>
                          </div>
                          <ArrowUpRight size={16} className="action-btn-arrow" />
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ================= 6. FOOTER ================= */}
                <footer className="studio-footer wrap">
                  <div className="footer-top-row">
                    <button type="button" className="footer-brandmark" onClick={() => selectView('main')}>
                      ASCII
                    </button>
                    <span className="footer-ethos">Curated Design Studio · Web Engineering & Brand Systems</span>
                  </div>

                  <div className="footer-bottom-row">
                    <span>© 2026 ASCII. All Rights Reserved.</span>
                  </div>
                </footer>
              </motion.div>
            )}

            {activeView === 'gallery' && (
              /* ================= SEPARATE GALLERY PAGE WITH PROJECT SHOWREEL (ZERO EXTRA SCROLL) ================= */
              <motion.div
                key="gallery-view"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(12px)', y: 20 }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, scale: 1.015, filter: 'blur(10px)', y: -20 }}
                transition={{ duration: 0.55, ease: transitionEase }}
                style={{ height: '100dvh', maxHeight: '100dvh', overflow: 'hidden' }}
              >
                <ProjectShowreel onReturnToStudio={() => selectView('main')} />
              </motion.div>
            )}

            {activeView === 'teja' && (
              /* ================= TEJA DEDICATED WEB ENGINEERING PORTFOLIO ================= */
              <motion.div
                key="teja-view"
                className="studio-canvas"
                data-theme={theme}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(12px)', y: 20 }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, scale: 1.015, filter: 'blur(10px)', y: -20 }}
                transition={{ duration: 0.55, ease: transitionEase }}
              >
                {/* Teja Hero */}
                <section className="hero-section wrap" id="top">
                  <div className="hero-lead-row">
                    <div className="craft-badge">
                      <span className="badge-bullet">•</span>
                      Teja — Creative Engineering & Digital Flagships
                    </div>
                    <div className="craft-location">India · Worldwide</div>
                  </div>

                  <div className="hero-statement-wrap">
                    <motion.h1
                      initial="hidden"
                      animate="show"
                      variants={staggerContainer}
                      className="hero-display-title"
                    >
                      <motion.span variants={fadeInUp} className="display-row">
                        High-performance web
                      </motion.span>
                      <motion.span variants={fadeInUp} className="display-row accent-row">
                        engineered for <em>presence.</em>
                      </motion.span>
                    </motion.h1>
                  </div>

                  <div className="hero-narrative-grid">
                    <p className="hero-narrative-copy">
                      I’m <strong>Teja</strong>, a Creative Technologist and Web Architect. I engineer bespoke, ultra-fast web flagships, kinetic micro-interactions, and reactive e-commerce experiences built to convert and endure.
                    </p>

                    <div className="hero-cta-group">
                      <a
                        href="#projects"
                        className="editorial-action-btn"
                        onClick={() => playSound('click')}
                        data-cursor="EXPLORE"
                      >
                        Explore Digital Flagships <ArrowDown size={15} />
                      </a>
                      <span className="manifesto-pill">Direct founder collaboration. Zero layers.</span>
                    </div>
                  </div>
                </section>

                {/* Crafted from Imagination Flagships */}
                <section className="section-block wrap" id="projects">
                  <div className="editorial-section-header">
                    <div>
                      <h2 className="maayasthra-heading">Crafted from Imagination</h2>
                    </div>
                  </div>

                  <div className="crafted-projects-grid">
                    {webProjects.map((project, index) => (
                      <motion.article
                        key={project.id}
                        className="crafted-card"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{ duration: 0.55, delay: index * 0.08 }}
                        onClick={() => {
                          if (project.liveUrl) {
                            playSound('click');
                            window.open(project.liveUrl, '_blank', 'noreferrer');
                          }
                        }}
                      >
                        <div className="crafted-media-frame">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="crafted-media-img"
                            loading="lazy"
                          />
                          <div className="crafted-media-overlay" />

                          <div className="crafted-center-highlight">
                            {project.logoImg ? (
                              <div className="crafted-brand-lockup">
                                <img
                                  src={project.logoImg}
                                  alt={project.brandName || project.title}
                                  className="crafted-logo-img"
                                />
                              </div>
                            ) : (
                              <div className="crafted-brand-lockup">
                                <div className="crafted-emblem-badge">
                                  {renderProjectEmblem(project.emblemType)}
                                </div>
                                <h4 className="crafted-brand-title">{project.brandName || project.title}</h4>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="crafted-card-header">
                          <div className="crafted-name-row">
                            <h3 className="crafted-card-name">{project.title}</h3>
                            <span className="crafted-card-arrow">
                              <ArrowUpRight size={18} />
                            </span>
                          </div>
                          <div className="crafted-card-subline">
                            <span className="crafted-category-text">{project.category}</span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </section>

                {/* Teja Services & Expertise */}
                <section className="services section-block wrap" id="teja-services" aria-label="Teja Engineering Services">
                  <div className="section-head">
                    <h2 className="section-title">SERVICES & EXPERTISE</h2>
                  </div>

                  <ul className="services-list">
                    <li className="service" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                      <span className="service-num">01</span>
                      <h3 className="service-title">WEB DESIGNING</h3>
                      <p className="service-desc">Bespoke Next.js platforms built with sub-second page transitions, reactive micro-interactions, and tactile typography.</p>
                    </li>
                    <li className="service" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                      <span className="service-num">02</span>
                      <h3 className="service-title">UI / UX DESIGN</h3>
                      <p className="service-desc">Intuitive digital product interfaces, high-fidelity Figma prototypes, and conversion-focused design systems.</p>
                    </li>
                    <li className="service" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                      <span className="service-num">03</span>
                      <h3 className="service-title">SOCIAL MEDIA</h3>
                      <p className="service-desc">Engaging social media visuals, brand launch campaigns, and dynamic digital creative assets that command attention.</p>
                    </li>
                    <li className="service" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                      <span className="service-num">04</span>
                      <h3 className="service-title">E-COMMERCE</h3>
                      <p className="service-desc">Custom headless storefronts, bespoke product configurators, and seamless real-time checkout experiences.</p>
                    </li>
                  </ul>
                </section>

                {/* ================= TEJA FOUNDER VISION SECTION ================= */}
                <section className="founder-vision-section wrap" id="partnership">
                  <div className="founder-vision-grid">
                    {/* Left Magazine / Portrait Frame */}
                    <div className="vision-poster-wrapper">
                      <div className="vision-offset-frame" aria-hidden="true" />
                      <div className="vision-poster-card" data-cursor="TEJA">
                        <img
                          src="/teja.jpg"
                          alt="Teja - Creative Engineer & Web Architect"
                          className="vision-poster-img"
                        />
                      </div>
                    </div>

                    {/* Right Editorial Manifesto & Meta */}
                    <div className="vision-content-col">
                      <h2 className="vision-big-heading">
                        <span>ENGINEERING IS NOT JUST</span>
                        <span>WHAT I BUILD. IT’S</span>
                        <span className="vision-heading-highlight">HOW I ARCHITECT.</span>
                      </h2>

                      <p className="vision-narrative">
                        I&apos;m a creative engineer who cares as much about the system architecture behind an experience as the visual precision itself. My work sits at the intersection of full-stack engineering, sub-second performance, and tactile interaction design — building digital platforms and web architectures that scale effortlessly and feel unmistakably alive. Every build starts with an obsession for speed, clean logic, and real-world impact.
                      </p>

                      <div className="vision-meta-grid">
                        <div className="vision-meta-item">
                          <span className="vision-meta-label">NAME</span>
                          <span className="vision-meta-val">Teja</span>
                        </div>
                        <div className="vision-meta-item">
                          <span className="vision-meta-label">ROLE</span>
                          <span className="vision-meta-val">Creative Engineer & Web Architect</span>
                        </div>
                        <div className="vision-meta-item">
                          <span className="vision-meta-label">BASED IN</span>
                          <span className="vision-meta-val">India</span>
                        </div>
                        <div className="vision-meta-item">
                          <span className="vision-meta-label">FOCUS</span>
                          <span className="vision-meta-val">Next.js 15, Full-Stack Architecture, Interactive Web, Bespoke E-Commerce</span>
                        </div>
                      </div>

                      <div className="vision-divider-line" />

                      {/* Stats Numbers Row in Accent Color */}
                      <div className="vision-stats-row">
                        <div className="vision-stat-block">
                          <span className="vision-stat-num">08+</span>
                          <span className="vision-stat-label">FLAGSHIP BUILDS</span>
                        </div>
                        <div className="vision-stat-block">
                          <span className="vision-stat-num">99+</span>
                          <span className="vision-stat-label">SPEED INDEX</span>
                        </div>
                        <div className="vision-stat-block">
                          <span className="vision-stat-num">100%</span>
                          <span className="vision-stat-label">ARCHITECTURAL CRAFT</span>
                        </div>
                      </div>

                      {/* Direct Contacts Cluster */}
                      <div className="founder-contacts-cluster" style={{ marginTop: '28px' }}>
                        <a
                          href="tel:+919701173777"
                          className="founder-contact-pill"
                          onClick={() => playSound('click')}
                          data-cursor="CALL"
                        >
                          <Phone size={12} />
                          <span>+91 97011 73777</span>
                        </a>
                        <a
                          href="https://wa.me/919701173777?text=Hello%20Teja%20(ASCII%20DIGITALS)%2C%20I'd%20like%20to%20discuss%20a%20web%20project."
                          target="_blank"
                          rel="noreferrer"
                          className="founder-contact-pill founder-wa-pill"
                          onClick={() => playSound('click')}
                          data-cursor="WHATSAPP"
                        >
                          <MessageSquare size={12} />
                          <span>WhatsApp ↗</span>
                        </a>
                        <a
                          href="mailto:tejapasupuleti06@gmail.com"
                          className="founder-contact-pill"
                          onClick={() => playSound('click')}
                          data-cursor="EMAIL"
                        >
                          <Mail size={12} />
                          <span>tejapasupuleti06@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Teja Inquiry & Dialogue */}
                <section className="section-block wrap contact-block" id="contact">
                  <div className="contact-editorial-header">
                    <span className="section-eyebrow">Initiate Dialogue</span>
                    <h2 className="contact-huge-title">
                      Let’s engineer your brand’s <em>digital flagship.</em>
                    </h2>
                  </div>

                  <div className="inquiry-configurator">
                    <div className="inquiry-actions-row">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="primary-inquiry-btn"
                        onClick={() => playSound('chime')}
                        data-cursor="WHATSAPP"
                      >
                        <MessageSquare size={17} />
                        <span>WhatsApp Teja (97011 73777)</span>
                        <ArrowUpRight size={17} />
                      </a>

                      <a
                        href={getEmailUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="secondary-inquiry-btn"
                        onClick={() => playSound('chime')}
                        data-cursor="EMAIL"
                      >
                        <Mail size={17} />
                        <span>Email Teja</span>
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <footer className="studio-footer wrap">
                  <div className="footer-top-row">
                    <button type="button" className="footer-brandmark" onClick={() => selectView('main')}>
                      ASCII
                    </button>
                    <span className="footer-ethos">Web Engineering & Digital Architecture · Teja</span>
                  </div>
                  <div className="footer-bottom-row">
                    <span>© 2026 ASCII. All Rights Reserved.</span>
                  </div>
                </footer>
              </motion.div>
            )}

            {activeView === 'lokesh' && (
              /* ================= LOKESH DEDICATED BRAND IDENTITY PORTFOLIO ================= */
              <motion.div
                key="lokesh-view"
                className="studio-canvas"
                data-theme={theme}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(12px)', y: 20 }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, scale: 1.015, filter: 'blur(10px)', y: -20 }}
                transition={{ duration: 0.55, ease: transitionEase }}
              >
                {/* Lokesh Hero */}
                <section className="hero-section wrap" id="top">
                  <div className="hero-lead-row">
                    <div className="craft-badge">
                      <span className="badge-bullet">•</span>
                      Lokesh Y — Brand Identity & Visual Art Direction
                    </div>
                    <div className="craft-location">India · Worldwide</div>
                  </div>

                  <div className="hero-statement-wrap">
                    <motion.h1
                      initial="hidden"
                      animate="show"
                      variants={staggerContainer}
                      className="hero-display-title"
                    >
                      <motion.span variants={fadeInUp} className="display-row">
                        Visual identities that make
                      </motion.span>
                      <motion.span variants={fadeInUp} className="display-row accent-row">
                        ideas <em>impossible to ignore.</em>
                      </motion.span>
                    </motion.h1>
                  </div>

                  <div className="hero-narrative-grid">
                    <p className="hero-narrative-copy">
                      I’m <strong>Lokesh Y</strong> (LXSH), a Brand Identity Designer and Visual Creative. I craft unmistakable typographic systems, brand identities, packaging, and high-impact poster compositions.
                    </p>

                    <div className="hero-cta-group">
                      <a
                        href="#brand-identity"
                        className="editorial-action-btn"
                        onClick={() => playSound('click')}
                        data-cursor="EXPLORE"
                      >
                        Explore Brand Archive <ArrowDown size={15} />
                      </a>
                      <span className="manifesto-pill">Direct founder collaboration. Zero layers.</span>
                    </div>
                  </div>
                </section>

                {/* Brand Identity Decks */}
                <section className="section-block wrap" id="brand-identity">
                  <div className="editorial-section-header">
                    <div>
                      <h2 className="maayasthra-heading">Identity & Visual Direction</h2>
                    </div>
                    <a
                      href="https://lxshdesignsdesigns.netlify.app"
                      target="_blank"
                      rel="noreferrer"
                      className="external-archive-link"
                    >
                      Visit Lokesh’s Original Archive <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="brand-decks-grid">
                    {brandDecks.map(deck => (
                      <motion.article
                        key={deck.id}
                        className="brand-deck-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35 }}
                        data-cursor="OPEN DECK"
                      >
                        <div
                          className="deck-visual-frame"
                          onClick={() => {
                            playSound('chime');
                            window.open(deck.pdf, '_blank', 'noreferrer');
                          }}
                        >
                          <img
                            src={deck.image}
                            alt={deck.title}
                            loading="eager"
                            decoding="async"
                          />
                          <div className="deck-hover-prompt">
                            <span>View Brand Deck PDF</span>
                            <MoveUpRight size={16} />
                          </div>
                        </div>

                        <div className="deck-body">
                          <div className="deck-header-line">
                            <span className="deck-tag">{deck.discipline}</span>
                            <a
                              href={deck.pdf}
                              target="_blank"
                              rel="noreferrer"
                              className="direct-pdf-pill"
                              data-cursor="PDF"
                              onClick={e => {
                                e.stopPropagation();
                                playSound('click');
                              }}
                            >
                              View PDF Deck <ExternalLink size={12} />
                            </a>
                          </div>

                          <h3
                            className="deck-title"
                            onClick={() => {
                              playSound('chime');
                              window.open(deck.pdf, '_blank', 'noreferrer');
                            }}
                          >
                            {deck.title}
                          </h3>
                          <p className="deck-text">{deck.description}</p>

                          <button
                            type="button"
                            className="open-deck-button"
                            data-cursor="PDF"
                            onClick={() => {
                              playSound('chime');
                              window.open(deck.pdf, '_blank', 'noreferrer');
                            }}
                          >
                            View Brand Deck PDF <ArrowUpRight size={15} />
                          </button>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </section>

                {/* Marks, Monograms & Identity Studies (Accordion Hover Expand) */}
                <section className="section-block wrap" id="brand-marks">
                  <div className="logos-sub-header">
                    <div>
                      <h3 className="sub-title">Marks, Monograms & Identity Studies</h3>
                    </div>
                  </div>

                  <BrandMarksHoverExpand
                    marks={logoStudies}
                    onOpenDeck={(pdfUrl, title) => {
                      const deckItem = brandDecks.find(d => d.pdf === pdfUrl) || {
                        id: title.toLowerCase().replace(/\s+/g, '-'),
                        title,
                        discipline: 'Brand Identity Case Presentation',
                        image: '/surprise-cakes-cover.jpg',
                        pdf: pdfUrl,
                        description: `Complete brand identity and visual architecture deck for ${title}.`,
                        deliverables: ['Identity System', 'Brand Guidelines', 'Visual Assets']
                      };
                      setActiveDeck(deckItem);
                    }}
                  />

                  <div className="curated-cta-container">
                    <button
                      type="button"
                      className="curated-explore-archive-btn"
                      onClick={() => selectView('gallery')}
                      data-cursor="GALLERY"
                    >
                      <ImageIcon size={14} />
                      <span>Open Full Archival Gallery & Showreel</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </section>

                {/* WHAT I DO */}
                <section className="services section-block wrap" id="services" aria-label="Services">
                  <div className="section-head">
                    <h2 className="section-title">WHAT I DO</h2>
                  </div>

                  <ul className="services-list">
                    <li className="service" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                      <span className="service-num">01</span>
                      <h3 className="service-title">BRAND IDENTITY</h3>
                      <p className="service-desc">Logo systems, visual language, typography, and brand guidelines.</p>
                    </li>
                    <li className="service" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                      <span className="service-num">02</span>
                      <h3 className="service-title">ART DIRECTION</h3>
                      <p className="service-desc">Creative concepts, visual storytelling, and campaign direction.</p>
                    </li>
                    <li className="service" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                      <span className="service-num">03</span>
                      <h3 className="service-title">POSTER DESIGN</h3>
                      <p className="service-desc">Bold compositions for films, events, campaigns, and culture.</p>
                    </li>
                    <li className="service" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                      <span className="service-num">04</span>
                      <h3 className="service-title">DIGITAL DESIGN</h3>
                      <p className="service-desc">Social media visuals, digital campaigns, and web graphics.</p>
                    </li>
                    <li className="service" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                      <span className="service-num">05</span>
                      <h3 className="service-title">CREATIVE EXPERIMENTATION</h3>
                      <p className="service-desc">Typography, visual studies, and unconventional design explorations.</p>
                    </li>
                  </ul>
                </section>

                {/* ================= LOKESH FOUNDER VISION SECTION (MATCHING PHOTO 3) ================= */}
                <section className="founder-vision-section wrap" id="partnership">
                  <div className="founder-vision-grid">
                    {/* Left Magazine Poster Frame */}
                    <div className="vision-poster-wrapper">
                      <div className="vision-offset-frame" aria-hidden="true" />
                      <div className="vision-poster-card" data-cursor="LOKESH">
                        <img
                          src="/lokesh-magazine-poster.png"
                          alt="Lokesh Y - Graphic Designer Editorial Vision"
                          className="vision-poster-img"
                        />
                      </div>
                    </div>

                    {/* Right Editorial Manifesto & Meta */}
                    <div className="vision-content-col">
                      <h2 className="vision-big-heading">
                        <span>DESIGN IS NOT JUST</span>
                        <span>WHAT I MAKE. IT’S</span>
                        <span className="vision-heading-highlight">HOW I THINK.</span>
                      </h2>

                      <p className="vision-narrative">
                        I&apos;m a graphic designer who cares as much about the thinking behind a mark as the mark itself. My work sits at the intersection of branding, typography, and visual storytelling — building identities and compositions that hold up under scrutiny and stay memorable long after the first look. Every project starts with a question worth answering, not a template waiting to be filled in.
                      </p>

                      <div className="vision-meta-grid">
                        <div className="vision-meta-item">
                          <span className="vision-meta-label">NAME</span>
                          <span className="vision-meta-val">Lokesh Y</span>
                        </div>
                        <div className="vision-meta-item">
                          <span className="vision-meta-label">ROLE</span>
                          <span className="vision-meta-val">Graphic Designer</span>
                        </div>
                        <div className="vision-meta-item">
                          <span className="vision-meta-label">BASED IN</span>
                          <span className="vision-meta-val">India</span>
                        </div>
                        <div className="vision-meta-item">
                          <span className="vision-meta-label">FOCUS</span>
                          <span className="vision-meta-val">Branding, Visual Identity, Posters, Digital Design</span>
                        </div>
                      </div>

                      <div className="vision-divider-line" />

                      {/* Stats Numbers Row in Accent Color */}
                      <div className="vision-stats-row">
                        <div className="vision-stat-block">
                          <span className="vision-stat-num">06+</span>
                          <span className="vision-stat-label">SELECTED PROJECTS</span>
                        </div>
                        <div className="vision-stat-block">
                          <span className="vision-stat-num">04+</span>
                          <span className="vision-stat-label">DESIGN DISCIPLINES</span>
                        </div>
                        <div className="vision-stat-block">
                          <span className="vision-stat-num">100%</span>
                          <span className="vision-stat-label">CREATIVE ENERGY</span>
                        </div>
                      </div>

                      {/* Direct Contacts Cluster */}
                      <div className="founder-contacts-cluster" style={{ marginTop: '28px' }}>
                        <a
                          href="tel:+916281488670"
                          className="founder-contact-pill"
                          onClick={() => playSound('click')}
                          data-cursor="CALL"
                        >
                          <Phone size={12} />
                          <span>+91 62814 88670</span>
                        </a>
                        <a
                          href="https://wa.me/916281488670?text=Hello%20Lokesh%20(ASCII%20DIGITALS)%2C%20I'd%20like%20to%20discuss%20a%20brand%20identity%20project."
                          target="_blank"
                          rel="noreferrer"
                          className="founder-contact-pill founder-wa-pill"
                          onClick={() => playSound('click')}
                          data-cursor="WHATSAPP"
                        >
                          <MessageSquare size={12} />
                          <span>WhatsApp ↗</span>
                        </a>
                        <a
                          href="mailto:ylokesh0099@gmail.com"
                          className="founder-contact-pill"
                          onClick={() => playSound('click')}
                          data-cursor="EMAIL"
                        >
                          <Mail size={12} />
                          <span>ylokesh0099@gmail.com</span>
                        </a>
                        <a
                          href="https://www.instagram.com/lxsh_designs/"
                          target="_blank"
                          rel="noreferrer"
                          className="founder-contact-pill"
                          data-cursor="INSTAGRAM"
                        >
                          <span>Instagram ↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Lokesh Inquiry & Dialogue */}
                <section className="section-block wrap contact-block" id="contact">
                  <div className="contact-editorial-header">
                    <span className="section-eyebrow">Initiate Dialogue</span>
                    <h2 className="contact-huge-title">
                      Let’s shape your brand’s <em>visual identity.</em>
                    </h2>
                  </div>

                  <div className="inquiry-configurator">
                    <div className="inquiry-actions-row">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="primary-inquiry-btn"
                        onClick={() => playSound('chime')}
                        data-cursor="WHATSAPP"
                      >
                        <MessageSquare size={17} />
                        <span>WhatsApp Lokesh (62814 88670)</span>
                        <ArrowUpRight size={17} />
                      </a>

                      <a
                        href={getEmailUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="secondary-inquiry-btn"
                        onClick={() => playSound('chime')}
                        data-cursor="EMAIL"
                      >
                        <Mail size={17} />
                        <span>Email Lokesh</span>
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <footer className="studio-footer wrap">
                  <div className="footer-top-row">
                    <button type="button" className="footer-brandmark" onClick={() => selectView('main')}>
                      ASCII
                    </button>
                    <span className="footer-ethos">Brand Identity & Visual Art Direction · Lokesh Y</span>
                  </div>
                  <div className="footer-bottom-row">
                    <span>© 2026 ASCII. All Rights Reserved.</span>
                  </div>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= POSTER LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {activePoster !== null && (
          <motion.div
            className="editorial-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePoster(null)}
          >
            <button
              className="lightbox-close-btn"
              onClick={() => setActivePoster(null)}
              aria-label="Close Preview"
              data-cursor="CLOSE"
            >
              <X size={24} />
            </button>

            <button
              className="lightbox-nav-btn prev"
              onClick={e => {
                e.stopPropagation();
                playSound('click');
                setActivePoster((activePoster + posterWorks.length - 1) % posterWorks.length);
              }}
              aria-label="Previous Poster"
              data-cursor="PREV"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="lightbox-center-content" onClick={e => e.stopPropagation()}>
              <img
                src={posterWorks[activePoster].image}
                alt={posterWorks[activePoster].title}
                className="lightbox-main-img"
              />
              <div className="lightbox-footer-bar">
                <span>POSTER {posterWorks[activePoster].no} OF 31 — LOKESH Y</span>
                <span>Press ESC or Arrows to Navigate</span>
              </div>
            </div>

            <button
              className="lightbox-nav-btn next"
              onClick={e => {
                e.stopPropagation();
                playSound('click');
                setActivePoster((activePoster + 1) % posterWorks.length);
              }}
              aria-label="Next Poster"
              data-cursor="NEXT"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= BRAND DECK PDF INTERACTIVE MODAL ================= */}
      <AnimatePresence>
        {activeDeck !== null && (
          <motion.div
            className="editorial-lightbox deck-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDeck(null)}
          >
            <div className="deck-modal-container" onClick={e => e.stopPropagation()}>
              <div className="deck-modal-header">
                <div>
                  <span className="modal-label">{activeDeck.discipline}</span>
                  <h3>{activeDeck.title}</h3>
                </div>
                <div className="modal-actions">
                  <a
                    href={activeDeck.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-pdf-download"
                    data-cursor="PDF"
                    onClick={() => playSound('click')}
                  >
                    Open Full PDF <ExternalLink size={14} />
                  </a>
                  <button
                    className="modal-close"
                    onClick={() => setActiveDeck(null)}
                    aria-label="Close modal"
                    data-cursor="CLOSE"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="deck-modal-preview">
                <iframe
                  src={`${activeDeck.pdf}#toolbar=0&navpanes=0`}
                  title={`${activeDeck.title} presentation`}
                  className="pdf-iframe-view"
                />
              </div>

              <div className="deck-modal-footer">
                <p>{activeDeck.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= PROGRESSIVE BLUR SCROLL DISSOLVE EFFECT ================= */}
      {!introLoading && activeView !== 'gallery' && (
        <>
          <ProgressiveBlur position="bottom" height="110px" blurAmount="8px" className="fixed" />
          <ProgressiveBlur position="top" height="70px" blurAmount="6px" className="fixed" />
        </>
      )}

      {/* ================= 3. FLOATING CAPSULE NAVIGATION DOCK ================= */}
      {!introLoading && (
        <nav className="luxury-capsule-dock" aria-label="Direct Navigation Dock">
          {/* Main Studio */}
          <button
            type="button"
            className={`capsule-dock-item ${activeView === 'main' ? 'active-pill' : ''}`}
            onClick={() => selectView('main')}
            title="Curated Design Studio"
          >
            {activeView === 'main' && (
              <motion.div
                layoutId="activeDockHighlight"
                className="capsule-active-indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <div className="capsule-icon-box studio-box">
              <Layers size={13} />
            </div>
            <div className="capsule-text-col">
              <span className="capsule-title">Studio</span>
              <span className="capsule-sub">Curated</span>
            </div>
          </button>

          <div className="capsule-divider" />

          {/* Teja Web */}
          <button
            type="button"
            className={`capsule-dock-item ${activeView === 'teja' ? 'active-pill' : ''}`}
            onClick={() => selectView('teja')}
            title="Teja — Creative Engineering & Web Flagships"
          >
            {activeView === 'teja' && (
              <motion.div
                layoutId="activeDockHighlight"
                className="capsule-active-indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <div className="capsule-icon-box teja-box">
              <Code2 size={13} />
              <span className="capsule-dot teja-dot" />
            </div>
            <div className="capsule-text-col">
              <span className="capsule-title">Teja</span>
              <span className="capsule-sub">Web Architect</span>
            </div>
          </button>

          <div className="capsule-divider" />

          {/* Lokesh Brand */}
          <button
            type="button"
            className={`capsule-dock-item ${activeView === 'lokesh' ? 'active-pill' : ''}`}
            onClick={() => selectView('lokesh')}
            title="Lokesh Y — Brand Identity & Art Direction"
          >
            {activeView === 'lokesh' && (
              <motion.div
                layoutId="activeDockHighlight"
                className="capsule-active-indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <div className="capsule-icon-box lokesh-box">
              <Palette size={13} />
              <span className="capsule-dot lokesh-dot" />
            </div>
            <div className="capsule-text-col">
              <span className="capsule-title">Lokesh</span>
              <span className="capsule-sub">Brand Identity</span>
            </div>
          </button>

          <div className="capsule-divider" />

          {/* Gallery Showreel */}
          <button
            type="button"
            className={`capsule-dock-item ${activeView === 'gallery' ? 'active-pill' : ''}`}
            onClick={() => selectView('gallery')}
            title="Archival Gallery — Posters & Logos Showreel"
          >
            {activeView === 'gallery' && (
              <motion.div
                layoutId="activeDockHighlight"
                className="capsule-active-indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <div className="capsule-icon-box gallery-box">
              <Sparkles size={13} />
            </div>
            <div className="capsule-text-col">
              <span className="capsule-title">Gallery</span>
              <span className="capsule-sub">Showreel</span>
            </div>
          </button>
        </nav>
      )}

      {/* ================= EDITORIAL MENU MODAL ================= */}
      <EditorialMenuModal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={(sectionId, view) => {
          if (view && view !== activeView) {
            selectView(view, sectionId);
          } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </>
  );
}
