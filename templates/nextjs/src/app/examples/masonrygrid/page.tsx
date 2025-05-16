'use client';

import React from 'react';

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

export default function MasonryGridDemo() {
  const cards = Array.from({ length: 12 }, (_, idx) => {
    const height = Math.floor(Math.random() * 200) + 100;
    return (
      <div
        key={idx}
        className={`mb-4 rounded shadow p-6 flex items-center justify-center text-lg font-semibold ${cardColors[idx % cardColors.length]}`}
        style={{ breakInside: 'avoid-column', height: `${height}px` }}
      >
        Card {idx + 1}
      </div>
    );
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">MasonryGrid Demo</h1>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {cards}
      </div>
      <p className="mt-8 text-gray-700">
        Resize the window to see the number of columns change.
      </p>
    </div>
  );
}
