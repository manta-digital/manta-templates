'use client';

import { useEffect, useState } from 'react';

// Default Tailwind breakpoints - can be overridden via props
const DEFAULT_BREAKPOINTS = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Converts px string to number
function pxToNum(px: string) {
  return parseInt(px.replace('px', ''), 10);
}

/**
 * React hook to get the current Tailwind breakpoint name (or 'default' for mobile)
 * @param customBreakpoints - Optional custom breakpoints object to override defaults
 */
export function useBreakpoint(customBreakpoints?: Record<string, string>): string {
  const [breakpoint, setBreakpoint] = useState('default');

  useEffect(() => {
    const breakpoints = customBreakpoints || DEFAULT_BREAKPOINTS;
    
    // Turn breakpoints object into sorted array (largest first)
    const breakpointArray = Object.entries(breakpoints)
      .map(([name, px]: [string, string]) => ({ name, min: pxToNum(px) }))
      .sort((a: { min: number }, b: { min: number }) => b.min - a.min);

    function getBreakpoint() {
      const width = window.innerWidth;
      for (const bp of breakpointArray) {
        if (width >= bp.min) return bp.name;
      }
      return 'default';
    }
    
    function handleResize() {
      setBreakpoint(getBreakpoint());
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [customBreakpoints]);

  return breakpoint;
}