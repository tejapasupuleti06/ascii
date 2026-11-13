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
  onTransitionComplete?: () => void;
}

export default function PeacockLoader({
  speed = 0.75,
  theme = 'asciiStudio',
  activeView = 'main',
  onTransitionStart,
  onTransitionComplete,
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

  // Handle immediate transition trigger on click or animation completion
  const handleTriggerOpening = () => {
    if (phase !== 'intro') return;

    if (onTransitionStart) {
      onTransitionStart();
    }

    setPhase('dissolving');

    // After circular expansion completes (~1100ms), unmount
    setTimeout(() => {
      setPhase('hidden');
      if (onTransitionComplete) {
        onTransitionComplete();
      }
      if (loaderInstanceRef.current?.destroy) {
        loaderInstanceRef.current.destroy();
        loaderInstanceRef.current = null;
      }
    }, 1100);
  };

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
          theme: theme, // Pure White Logo on complete black #000000
          speed: speed,
          scale: responsiveScale,
          loop: false,
          interactive: true,
          onComplete: () => {
            if (!active) return;
            handleTriggerOpening();
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
  }, [theme, speed]);

  if (phase === 'hidden') {
    return null;
  }

  const isDissolving = phase === 'dissolving';

  return (
    <div
      id="peacock-3d-system-wrapper"
      aria-label="ASCII Peacock 3D Emblem"
      onClick={handleTriggerOpening}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        background: '#000000',
        cursor: isDissolving ? 'default' : 'pointer',
        pointerEvents: isDissolving ? 'none' : 'auto',
        opacity: isDissolving ? 0 : 1,
        transition: 'opacity 1.05s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Expanding Circular Ring Shockwave Effect originating from the Logo */}
      {isDissolving && (
        <div
          className="circular-preloader-ripple"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '2px solid hsl(21, 100%, 75%)',
            boxShadow: '0 0 60px 20px hsla(21, 100%, 75%, 0.6), inset 0 0 40px hsla(21, 100%, 75%, 0.4)',
            animation: 'circularIrisExpand 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}

      {/* 3D Canvas Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 1,
          transform: isDissolving ? 'scale(1.12)' : 'scale(1)',
          filter: isDissolving ? 'blur(20px)' : 'none',
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
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

      {/* Hint to click */}
      {!isDissolving && (
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'hsl(0, 0%, 55%)',
            pointerEvents: 'none',
            opacity: 0.8,
          }}
        >
          Click to enter
        </div>
      )}
    </div>
  );
}
