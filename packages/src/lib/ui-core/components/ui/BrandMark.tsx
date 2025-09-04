import React from 'react';
import { cn } from '../../utils/cn';

interface BrandMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

/**
 * BrandMark: simple concentric-circle mark that follows the active accent palette.
 * - Strokes use semantic tokens so it adapts to `[data-palette]` and dark mode.
 */
export function BrandMark({ size = 36, className, ...props }: BrandMarkProps) {
  const s = `${size}`;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Brand mark"
      className={cn('shrink-0', className)}
      {...props}
    >
      {/* Background subtle tint for glassy look */}
      <circle cx="18" cy="18" r="17" fill="transparent" />
      {/* Outer ring - stronger solid step with reduced opacity so it shows on light/dark */}
      <circle cx="18" cy="18" r="16" fill="none" stroke="var(--color-accent-7)" strokeWidth="2" strokeOpacity="0.35" />
      {/* Mid ring */}
      <circle cx="18" cy="18" r="12" fill="none" stroke="var(--color-accent-9)" strokeWidth="1.75" strokeOpacity="0.45" />
      {/* Inner ring */}
      <circle cx="18" cy="18" r="8" fill="none" stroke="var(--color-accent-11)" strokeWidth="1.75" />
    </svg>
  );
}

export type { BrandMarkProps };