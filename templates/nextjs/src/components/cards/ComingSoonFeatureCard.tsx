import React from 'react';
import FeatureCardWrapper from './FeatureCardWrapper';
import { FileText, Rocket, Star, Box, Globe } from 'lucide-react';

export default function ComingSoonFeatureCard() {
  return (
    <FeatureCardWrapper>
      <div className="flex flex-col lg:flex-row lg:h-64">
        {/* Title section */}
        <div className="relative h-32 lg:h-auto lg:w-1/4 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-teal-400 animate-pulse"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              ></div>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col justify-center p-8">
            <h2 className="text-3xl font-bold text-white tracking-tight break-words">Astro Starter</h2>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-teal-400 mr-1" fill="currentColor" />
              <Star className="h-4 w-4 text-teal-400 mr-1" fill="currentColor" />
              <Star className="h-4 w-4 text-teal-400" fill="currentColor" />
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="hidden lg:block w-0.5 bg-slate-700/70 h-full mx-0" />
        <div className="block lg:hidden h-0.5 bg-slate-700/70 w-full mx-0" />

        {/* Content section */}
        <div className="p-6 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
          <div className="mb-4 text-slate-300 flex items-center">
            <Rocket size={16} className="mr-2 text-teal-400" />
            <span className="text-sm">Lightning-fast static site generation</span>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-slate-300">
              <Globe size={14} className="mr-2 text-teal-400" />
              <span className="text-xs">Content-focused with zero JS by default</span>
            </div>
            <div className="flex items-center text-slate-300">
              <Box size={14} className="mr-2 text-teal-400" />
              <span className="text-xs">Use any UI framework or none at all</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-teal-700/40 text-teal-400 rounded-full text-xs font-medium border border-teal-700/50 animate-pulse">Coming Soon</span>
          </div>
        </div>
        {/* Actions */}
        <div className="p-6 lg:w-1/4 lg:flex lg:flex-col lg:justify-center lg:gap-4">
          <button className="w-full mb-3 lg:mb-0 py-2 px-3 bg-gradient-to-r from-teal-500/70 to-emerald-300/80 hover:from-teal-500 hover:to-emerald-500 text-white font-medium rounded-[0.5em] transition-all duration-200 flex items-center justify-center opacity-70 cursor-not-allowed">
            <Rocket size={14} className="mr-2" />
            <span>Join Waitlist</span>
          </button>
          <button className="w-full py-2 px-3 bg-slate-800 text-slate-200 hover:bg-slate-700 font-medium rounded-[0.5em] border border-slate-700 transition-all duration-200 flex items-center justify-center">
            <FileText size={14} className="mr-2" />
            <span>View Readme</span>
          </button>
        </div>
      </div>
    </FeatureCardWrapper>
  );
}
