'use client';

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    THREE?: any;
    PEACOCK_MODEL_DATA?: any;
    PEACOCK_PIVOT_INFO?: any;
    PeacockLoader?: any;
  }
}

interface PeacockLoaderProps {
  speed?: number;
  theme?: string;
  activeView?: string;
  onTransitionStart?: () => void;
}

export default function PeacockLoader({
  speed = 0.75,
  theme = 'asciiStudio',
  activeView = 'main',
  onTransitionStart,
}: PeacockLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderInstanceRef = useRef<any>(null);
  const [phase, setPhase] = useState<'intro' | 'dissolving' | 'hidden'>('intro');

  // Lock scroll during intro to ensure seamless positioning
  useEffect(() => {
    if (phase === 'intro') {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  useEffect(() => {
    let active = true;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
        if (existing) {
          if (existing.getAttribute('data-loaded') === 'true' || (window as any).THREE) {
            resolve();
            return;
          }
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', (e) => reject(e));
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => {
          script.setAttribute('data-loaded', 'true');
          resolve();
        };
        script.onerror = (err) => reject(err);
        document.head.appendChild(script);
      });
    };

    const initLoader = async () => {
      try {
        if (!window.THREE) {
          await loadScript('/assets/three.min.js');
        }
        if (!window.PEACOCK_MODEL_DATA) {
          await loadScript('/assets/peacock_model.js');
        }
        if (!window.PeacockLoader) {
          await loadScript('/peacock-animation.js');
        }

        if (!active || !containerRef.current || !window.PeacockLoader) return;

        // Clean container
        containerRef.current.innerHTML = '';

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const responsiveScale = isMobile
          ? Math.min(0.60, Math.max(0.45, (window.innerWidth / 480) * 0.55))
          : 0.8;

        const loader = new window.PeacockLoader({
          container: containerRef.current,
          theme: theme, // Electric Teal #00AEBB, Warm Ivory #E8E4D3, Ink Black #031211
          speed: speed, // 0.75x speed
          scale: responsiveScale, // Responsively scaled: neatly framed on mobile, impactful on desktop
          loop: false,  // Run feather fan + ASCII letters kick, hold for 1.0s, then trigger onComplete
          interactive: true,
          onComplete: () => {
            if (!active) return;

            // Notify parent that transition has started (revealing main page simultaneously)
            if (onTransitionStart) {
              onTransitionStart();
            }

            // Start dissolving out with complete blur & fade
            setPhase('dissolving');

            // After 900ms smooth blur-fade, completely unmount and dispose Three.js canvas
            setTimeout(() => {
              if (active) {
                setPhase('hidden');
                if (loaderInstanceRef.current?.destroy) {
                  loaderInstanceRef.current.destroy();
                  loaderInstanceRef.current = null;
                }
              }
            }, 900);
          },
        });

        loaderInstanceRef.current = loader;
      } catch (err) {
        console.error('Failed to initialize 3D Peacock Loader:', err);
      }
    };

    initLoader();

    return () => {
      active = false;
      if (loaderInstanceRef.current?.destroy) {
        loaderInstanceRef.current.destroy();
        loaderInstanceRef.current = null;
      }
    };
  }, [theme, speed, onTransitionStart]);

  if (phase === 'hidden') {
    return null;
  }

  const isDissolving = phase === 'dissolving';

  return (
    <div
      id="peacock-3d-system-wrapper"
      aria-label="ASCII Peacock 3D Emblem"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        pointerEvents: isDissolving ? 'none' : 'auto',
        opacity: isDissolving ? 0 : 1,
        filter: isDissolving ? 'blur(35px)' : 'none',
        transform: isDissolving ? 'scale(1.08)' : 'scale(1)',
        transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Fullscreen Frosted Obsidian Backdrop with Teal Radial Glow */}
      <div
        id="peacock-intro-backdrop"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: '#031211',
          opacity: isDissolving ? 0 : 1,
          transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 46%, rgba(0, 174, 187, 0.22) 0%, #031211 72%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 3D Canvas Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: isDissolving ? 'none' : 'auto',
        }}
      >
        <div
          ref={containerRef}
          id="peacock-loader-canvas-host"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </div>
    </div>
  );
}
