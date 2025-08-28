"use client";

import React, { useEffect, useState } from 'react';

interface MasonryGridProps {
  mini?: boolean;
  className?: string;
}

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

// Deterministic height calculation based on index
const getCardHeight = (idx: number, mini: boolean) => {
  // Use a simple pattern instead of random for consistent SSR/CSR
  const pattern = [60, 90, 70, 50, 80, 40, 65, 55, 75, 85, 45, 60];
  const baseHeight = pattern[idx % pattern.length];
  return mini ? baseHeight / 1.5 : baseHeight * 1.5;
};

const MasonryGrid: React.FC<MasonryGridProps> = ({ mini = false, className = '' }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // This ensures the component only renders on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cards = Array.from({ length: 12 }, (_, idx) => {
    const height = getCardHeight(idx, mini);
    return (
      <div
        key={idx}
        className={`rounded shadow flex items-center justify-center font-semibold ${
          mini ? 'mb-1.5 p-2 text-sm' : 'mb-4 p-6 text-lg'
        } ${cardColors[idx % cardColors.length]}`}
        style={{ breakInside: 'avoid-column', height: `${height}px` }}
      >
        {!mini && `Card ${idx + 1}`}
      </div>
    );
  });

  const columnClasses = mini
    ? 'columns-4 gap-1.5 overflow-hidden'
    : 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4';

  // Add this empty div to force column flow to respect container bottom
  const spacer = (
    <div 
      aria-hidden="true" 
      className="w-full" 
      style={{ height: '1px', marginBottom: mini ? '1.5rem' : '2rem' }}
    />
  );

  // Don't render anything on the server
  if (!isMounted) {
    return null;
  }

  return mini ? (
    <div className={`w-full box-border relative overflow-hidden h-[calc(100%-1rem)] ${className}`}>
      <div className="p-4">
        <div className={columnClasses}>
          {cards}
          {spacer}
        </div>
      </div>
      <div className="h-4"></div> {/* Bottom padding spacer */}
    </div>
  ) : (
    <div className={`w-full box-border relative ${className}`}>
      <div className="p-8 pb-0">
        <h1 className="text-2xl font-bold mb-6">MasonryGrid Demo</h1>
        <div className={columnClasses}>
          {cards}
          {spacer}
        </div>
        <div className="h-8"></div> {/* Bottom padding spacer */}
        <p className="pt-8 text-gray-700">
          Resize the window to see the number of columns change.
        </p>
      </div>
    </div>
  );
};

export default MasonryGrid;