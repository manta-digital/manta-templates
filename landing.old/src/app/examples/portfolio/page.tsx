import React from 'react';
import PortfolioGrid from './PortfolioGrid';

export default function PortfolioDashboardDemo() {
  return (
    <div className="min-h-screen bg-[#151826] p-8">
      <h1 className="text-3xl font-bold mb-8 text-sky-200">Portfolio Dashboard Layout Demo</h1>
      <PortfolioGrid />
    </div>
  );
}
