'use client';

import React, { useRef, useState, useEffect } from 'react';
import GridLayout, { GridData } from '@/components/layouts/grid-layout/grid-layout';

// Shared grid configuration for the portfolio demo
const gridData: GridData = {
  md: [
    [4],
    [2, 2],
    [4],
    [2, 2],
    [2, 2],
  ],
  lg: [
    [2, 1, 1],
    [4],
    [2, 2],
    [2, 2],
  ],
  xl: [
    [2, 1, 1],
    [4],
    [2, 2],
    [2, 2],
  ],
  default: [
    [1], [1], [1], [1], [1], [1], [1],
  ],
};

const cardStyles = [
  'bg-sky-900 text-sky-200',
  'bg-sky-800 text-sky-100',
  'bg-sky-950 text-sky-100',
  'bg-zinc-900 text-zinc-200',
  'bg-slate-900 text-teal-300',
  'bg-slate-900 text-emerald-300',
  'bg-slate-900 text-sky-300',
  'bg-slate-900 text-green-300',
];

const defaultGap = '1em';
const defaultMinRowHeight = '200px';

interface PortfolioGridProps {
  /** Render a scaled-down preview (mini) using the lg configuration */
  mini?: boolean;
  className?: string;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ mini = false, className = '' }) => {
  const effectiveGridData = mini ? { default: gridData.lg } : gridData;
  const rowsCount = effectiveGridData.default.length;
  const [rowHeight, setRowHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container height and compute per-row height
  useEffect(() => {
    function updateHeight() {
      if (containerRef.current) {
        const wrapper = containerRef.current;
        const styleWrapper = window.getComputedStyle(wrapper);
        const padTop = parseFloat(styleWrapper.paddingTop) || 0;
        const padBottom = parseFloat(styleWrapper.paddingBottom) || 0;
        const totalWrapperPadding = padTop + padBottom;
        const innerHeight = wrapper.clientHeight - totalWrapperPadding;
        const gridEl = wrapper.firstElementChild as HTMLElement;
        const computedGrid = window.getComputedStyle(gridEl);
        const rowGapPx = parseFloat(computedGrid.rowGap || computedGrid.gap || '0') || 0;
        const totalGapPx = rowGapPx * (rowsCount - 1);
        const available = innerHeight - totalGapPx;
        if (available > 0) {
          setRowHeight(available / rowsCount);
        }
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [rowsCount]);
  const gap = mini ? '0.5em' : defaultGap;
  const minRowHeight = mini && rowHeight > 0 ? `${rowHeight}px` : defaultMinRowHeight;

  const grid = (
    <GridLayout
      gridData={effectiveGridData}
      gap={gap}
      minRowHeight={minRowHeight}
      className={`${className} ${mini ? 'w-full h-full' : ''}`}
    >
      {cardStyles.map((style, idx) => (
        <div
          key={idx}
          className={`h-full ${mini ? 'rounded-[0.5rem]' : 'rounded-xl'} shadow-lg flex items-center justify-center ${style} ${mini ? '' : 'text-xl font-semibold'}`}
        >
          {!mini && `Card ${idx + 1}`}
        </div>
      ))}
    </GridLayout>
  );

  return mini ? (
    <div ref={containerRef} className={`w-full h-full overflow-hidden p-4 ${className}`}>
      {grid}
    </div>
  ) : (
    grid
  );
};

export default PortfolioGrid;
