'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

export interface BrandMark {
  no: string;
  name: string;
  image: string;
  pdf?: string;
  category: string;
}

interface BrandMarksHoverExpandProps {
  marks?: BrandMark[];
  className?: string;
  onOpenDeck?: (pdfUrl: string, title: string) => void;
  maxDisplay?: number;
}

const defaultMarks: BrandMark[] = [
  { no: '01', name: 'CMC Global', image: '/logo-01.png', pdf: '/CMC%20FINAL.pdf', category: 'Corporate Identity' },
  { no: '02', name: 'Rore Monogram', image: '/logo-02.png', pdf: '/rcpdf.pdf', category: 'Fashion Monogram' },
  { no: '03', name: 'Suzen Mark', image: '/logo-03.png', pdf: '/SUZEN%20FINAL.pdf', category: 'Tech Brandmark' },
  { no: '04', name: 'LX Signature', image: '/logo-04.png', pdf: '/lxconfirm.pdf', category: 'Geometric Mark' },
  { no: '05', name: 'MAXIFY', image: '/logo-05.png', pdf: '/MAXIFY.pdf', category: 'Growth & Strategy' },
  { no: '06', name: 'Bluebird (BB)', image: '/logo-06.png', pdf: '/BB%20FINAL.pdf', category: 'Packaging & Identity' },
  { no: '07', name: 'BBC Culture', image: '/logo-07.png', pdf: '/bbc1.pdf', category: 'Visual Communication' }
];

export const BrandMarksHoverExpand: React.FC<BrandMarksHoverExpandProps> = ({
  marks = defaultMarks,
  className = '',
  onOpenDeck,
  maxDisplay
}) => {
  const displayMarks = maxDisplay ? marks.slice(0, maxDisplay) : marks;
  const [activeImage, setActiveImage] = useState<number | null>(0);

  return (
    <div className={cn('brand-marks-hover-wrapper', className)}>
      <div className="brand-marks-track">
        {displayMarks.map((mark, index) => {
          const isActive = activeImage === index;
          return (
            <motion.div
              key={mark.name}
              className={cn('brand-mark-expand-card', isActive && 'is-expanded')}
              initial={{ opacity: 0, y: 36, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              animate={{
                flex: isActive ? '3.5 1 0%' : '1 1 0%',
              }}
              transition={{
                flex: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.45, delay: index * 0.07 },
                y: { duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] },
              }}
              onClick={() => {
                if (!isActive) {
                  setActiveImage(index);
                } else if (mark.pdf && onOpenDeck) {
                  onOpenDeck(mark.pdf, mark.name);
                }
              }}
              onHoverStart={() => setActiveImage(index)}
              data-cursor="LOGO"
              style={{
                backgroundColor: '#E8E4D3',
                cursor: 'pointer',
              }}
            >
              {/* Subtle Ambient Warm Vignette */}
              <div className="card-ambient-backdrop" />

              {/* Pure Logo Emblem Presentation (Zero extra words, descriptions, or captions - 20% larger size) */}
              <motion.div
                className="brand-mark-logo-center"
                animate={{
                  scale: isActive ? 1.50 : 1.25, // Increased by 20%
                  y: isActive ? [0, -6, 0] : 0,
                }}
                transition={{
                  y: { repeat: Infinity, duration: 3.2, ease: 'easeInOut' },
                  scale: { duration: 0.35, ease: 'easeOut' },
                }}
              >
                <img
                  src={mark.image}
                  alt={mark.name}
                  className="brand-mark-img"
                  loading="lazy"
                  style={{
                    maxHeight: '192px', // 20% increase from 160px
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 6px 16px rgba(3, 18, 17, 0.1))',
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandMarksHoverExpand;
