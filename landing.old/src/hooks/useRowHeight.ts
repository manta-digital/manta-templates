import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Hook to measure container height and compute per-row height for a grid.
 * @param rowsCount Number of rows in the grid
 */
export default function useRowHeight(rowsCount: number): { ref: RefObject<HTMLDivElement | null>; rowHeight: number } {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rowHeight, setRowHeight] = useState<number>(0);

  useEffect(() => {
    function updateHeight() {
      const wrapper = containerRef.current;
      if (!wrapper) return;
      const style = window.getComputedStyle(wrapper);
      const padTop = parseFloat(style.paddingTop) || 0;
      const padBottom = parseFloat(style.paddingBottom) || 0;
      const totalPadding = padTop + padBottom;
      const innerHeight = wrapper.clientHeight - totalPadding;
      const gridEl = wrapper.firstElementChild as HTMLElement;
      if (!gridEl) return;
      const gridStyle = window.getComputedStyle(gridEl);
      const rowGapPx = parseFloat(gridStyle.rowGap || gridStyle.gap || '0') || 0;
      const totalGap = rowGapPx * (rowsCount - 1);
      const available = innerHeight - totalGap;
      if (available > 0) {
        setRowHeight(available / rowsCount);
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [rowsCount]);

  return { ref: containerRef, rowHeight };
}
