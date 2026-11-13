'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Phone, Mail, MessageSquare } from 'lucide-react';

interface EditorialMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string, view?: 'main' | 'teja' | 'lokesh' | 'gallery') => void;
}

const menuItems = [
  { no: '01', title: 'Curated Studio', section: 'top', view: 'main' as const },
  { no: '02', title: 'Selected Work', section: 'work', view: 'main' as const },
  { no: '03', title: 'Services & Disciplines', section: 'services', view: 'main' as const },
  { no: '04', title: 'Brand Identity Archive', section: 'brand-marks', view: 'lokesh' as const },
  { no: '05', title: 'The Founders', section: 'studio', view: 'main' as const },
  { no: '06', title: 'Showreel & Gallery', section: 'top', view: 'gallery' as const },
  { no: '07', title: 'Direct Inquiries', section: 'contact', view: 'main' as const },
];

export default function EditorialMenuModal({
  isOpen,
  onClose,
  onNavigate,
}: EditorialMenuModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="editorial-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Backdrop Blur */}
          <div className="editorial-menu-backdrop" onClick={onClose} />

          {/* Drawer Container */}
          <motion.div
            className="editorial-menu-drawer"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="editorial-menu-header">
              <div className="menu-logo-mark">
                <span>asciitech</span>
                <span className="menu-logo-dot">•</span>
                <span className="menu-logo-tag">MENU</span>
              </div>
              <button
                type="button"
                className="editorial-menu-close-btn"
                onClick={onClose}
                aria-label="Close Navigation Menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="editorial-menu-nav">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.no}
                  type="button"
                  className="editorial-menu-link"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + idx * 0.04 }}
                  onClick={() => {
                    onClose();
                    onNavigate(item.section, item.view);
                  }}
                >
                  <span className="menu-item-no">{item.no}</span>
                  <span className="menu-item-title">{item.title}</span>
                  <span className="menu-item-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Footer Reach / Social */}
            <div className="editorial-menu-footer">
              <span className="menu-footer-label">DIRECT CONTACT</span>
              <div className="menu-contact-pills">
                <a
                  href="https://wa.me/919701173777?text=Hello%20asciitech%20Studio%2C%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="menu-contact-pill wa"
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp</span>
                </a>
                <a href="tel:+919701173777" className="menu-contact-pill">
                  <Phone size={13} />
                  <span>+91 97011 73777</span>
                </a>
                <a href="mailto:asciisupport@gmail.com" className="menu-contact-pill">
                  <Mail size={13} />
                  <span>asciisupport@gmail.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
