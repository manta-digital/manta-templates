"use client";

import React from 'react';
import GridLayout from '@/components/layouts/grid-layout/grid-layout';

const gridData = {
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
  'bg-cyan-200'
];

const Demo = () => {
  // Generate some sample cards
  const cards = Array.from({ length: 12 }, (_, idx) => (
    <div
      key={idx}
      className={`h-full rounded shadow p-6 flex items-center justify-center text-lg font-semibold ${cardColors[idx % cardColors.length]}`}
    >
      Card {idx + 1}
    </div>
  ));

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold mb-6">GridLayout Demo</h1>
      <GridLayout gridData={gridData} minRowHeight="150px" gap="1rem">{cards}</GridLayout>
      <p className="mt-8 text-gray-700">
        Resize the window to see the layout change at <code>md</code> and <code>lg</code> breakpoints.
      </p>
    </div>
  );
};

export default Demo;
