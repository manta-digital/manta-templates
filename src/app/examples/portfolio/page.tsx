'use client';

import React from 'react';
import GridLayout from '@/components/layouts/grid-layout/grid-layout';

const gridData = {
  md: [
    [4],
    [2, 2],
    [4],
    [2, 2],
    [2, 2],
  ],
  lg: [
    [2, 1, 1], // top row: profile, connect, stats
    [4],        // wide row: image/video
    [2, 2],     // bottom left: tech stack, quote
    [2, 2],     // bottom right: current project, available
  ],
  xl: [
    [2, 1, 1],
    [4],
    [2, 2],
    [2, 2],
  ],
  default: [
    [1],
    [1],
    [1],
    [1],
    [1],
    [1],
    [1],
  ],
};

const cardStyles = [
  'bg-sky-900 text-sky-200', // profile
  'bg-sky-800 text-sky-100', // connect
  'bg-sky-950 text-sky-100', // stats
  'bg-zinc-900 text-zinc-200', // wide video/image
  'bg-slate-900 text-teal-300', // tech stack
  'bg-slate-900 text-emerald-300', // quote
  'bg-slate-900 text-sky-300', // current project
  'bg-slate-900 text-green-300', // available
];

const minRowHeight = '200px';
const gap = '1em';

export default function PortfolioDashboardDemo() {
  return (
    <div className="min-h-screen bg-[#151826] p-8">
      <h1 className="text-3xl font-bold mb-8 text-sky-200">Portfolio Dashboard Layout Demo</h1>
      <GridLayout gridData={gridData} gap={gap} minRowHeight={minRowHeight}>
        {cardStyles.map((style, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow-lg flex items-center justify-center text-xl font-semibold ${style}`}
          >
            Card {idx + 1}
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
