"use client";

import React from 'react';
import GridLayout, { GridData } from '@/components/layouts/grid-layout/grid-layout';
import { cn } from '@/lib/utils';

interface GridLayoutExampleProps {
  /** Render a scaled-down preview of the grid */
  mini?: boolean;
}

const gridData: GridData = {
  default: [
    [6],
    [6],
    [6],
    [6],
    [3, 3],
  ],
  md: [
    [3, 3],
    [2, 2, 2],
    [6],
  ],
  lg: [
    [2, 2, 2],
    [1, 4, 1],
    [6],
  ],
};

const cardColors = [
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-pink-200',
  'bg-purple-200',
  'bg-orange-200',
  'bg-red-200',
  'bg-teal-200',
  'bg-indigo-200',
  'bg-gray-200',
  'bg-lime-200',
  'bg-cyan-200',
];

const GridLayoutExample: React.FC<GridLayoutExampleProps> = ({ mini = false }) => {
  const cards = Array.from({ length: cardColors.length }, (_, idx) => (
    <div
      key={idx}
      className={`h-full rounded shadow flex items-center justify-center ${mini ? 'p-2 text-sm' : 'p-6 text-lg'} font-semibold ${cardColors[idx]}`}
    >
      {!mini && `Card ${idx + 1}`}
    </div>
  ));

  const usedGridData = mini ? { default: gridData.lg } : gridData;
  const usedGap = mini ? '0.5rem' : '1rem';
  const usedMinRowHeight = mini ? '50px' : '150px';
  const containerClass = cn(
    mini
      ? 'w-full box-border px-4 pt-4 pb-4'
      : 'min-h-screen bg-background p-8'
  );

  return (
    <div className={containerClass}>
      {!mini && <h1 className="text-2xl font-bold mb-6">GridLayout Demo</h1>}
      <GridLayout
        gridData={usedGridData}
        gap={usedGap}
        minRowHeight={usedMinRowHeight}
      >
        {cards}
      </GridLayout>
      {!mini && (
        <p className="mt-8 text-gray-700">
          Resize the window to see the layout change at <code>md</code> and <code>lg</code> breakpoints.
        </p>
      )}
    </div>
  );
};

export default GridLayoutExample;
