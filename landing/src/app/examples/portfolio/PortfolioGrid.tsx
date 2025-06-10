'use client';

import React from 'react';
import useRowHeight from '@/hooks/useRowHeight';
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
  'bg-sky-700 text-sky-200',
  'bg-sky-600 text-sky-100',
  'bg-sky-800 text-sky-100',
  'bg-zinc-800 text-zinc-200',
  'bg-violet-800 text-teal-300',
  'bg-violet-900 text-emerald-300',
  'bg-slate-700 text-sky-300',
  'bg-slate-800 text-green-300',
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
  const { ref: containerRef, rowHeight } = useRowHeight(rowsCount);
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
    <div ref={containerRef} className={`w-full h-full overflow-hidden px-4 pt-4 pb-4 ${className}`}>
      {grid}
    </div>
  ) : (
    grid
  );
};

export default PortfolioGrid;
