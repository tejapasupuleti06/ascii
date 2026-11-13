'use client';

import React from 'react';

export type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: 'top' | 'bottom';
  height?: string;
  blurAmount?: string;
};

export const ProgressiveBlur = ({
  className = '',
  backgroundColor,
  position = 'top',
  height = '120px',
  blurAmount = '8px',
}: ProgressiveBlurProps) => {
  const isTop = position === 'top';
  const bg = backgroundColor || 'var(--bg)';

  return (
    <div
      className={`pointer-events-none absolute left-0 w-full select-none z-20 ${className}`}
      style={{
        [isTop ? 'top' : 'bottom']: 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${bg})`
          : `linear-gradient(to bottom, transparent, ${bg})`,
        maskImage: isTop
          ? `linear-gradient(to bottom, black 35%, transparent)`
          : `linear-gradient(to top, black 35%, transparent)`,
        WebkitMaskImage: isTop
          ? `linear-gradient(to bottom, black 35%, transparent)`
          : `linear-gradient(to top, black 35%, transparent)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
      aria-hidden="true"
    />
  );
};

export default ProgressiveBlur;
