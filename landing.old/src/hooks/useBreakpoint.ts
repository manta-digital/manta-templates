import { useEffect, useState } from 'react';
// Import breakpoints from the single source of truth
import breakpoints from '../styles/breakpoints.js';

// Converts px string to number
function pxToNum(px: string) {
  return parseInt(px.replace('px', ''), 10);
}

// Turn breakpoints object into sorted array (largest first)
const breakpointArray = Object.entries(breakpoints)
  .map(([name, px]) => ({ name, min: pxToNum(px as string) }))
  .sort((a, b) => b.min - a.min);

/**
 * React hook to get the current Tailwind breakpoint name (or 'default' for mobile)
 * Uses breakpoints defined in src/styles/breakpoints.js
 */
export function useBreakpoint(): string {
  const [breakpoint, setBreakpoint] = useState('default');

  useEffect(() => {
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
  }, []);

  return breakpoint;
}
