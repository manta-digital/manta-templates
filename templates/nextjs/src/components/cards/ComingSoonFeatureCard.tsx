"use client";
import React, { useState, useEffect } from 'react';
import FeatureCardWrapper from './FeatureCardWrapper';
import { FileText, Rocket, Star, Box, Globe } from 'lucide-react';

interface ComingSoonFeatureCardProps {
  mode?: 'dark' | 'light';
}

export default function ComingSoonFeatureCard({ mode = 'dark' }: ComingSoonFeatureCardProps) {
  const [dots, setDots] = useState<React.CSSProperties[]>([]);
  useEffect(() => {
    const newDots = Array.from({ length: 20 }).map(() => ({
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
    setDots(newDots);
  }, []);

  const textClasses = mode === 'light' ? {
    title: 'text-slate-900',
    description: 'text-slate-700',
    features: 'text-slate-700',
    divider: 'bg-slate-300/70',
    icons: 'text-teal-600',
    comingSoonBadge: 'bg-teal-100 text-teal-700 border-teal-300',
    primaryButton: 'bg-gradient-to-r from-teal-400/70 to-emerald-400/80 hover:from-teal-500 hover:to-emerald-500',
    secondaryButton: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300',
    backgroundGradient: 'bg-gradient-to-r from-teal-100/60 to-indigo-100/60',
    animatedDots: 'bg-teal-500',
  } : {
    title: 'text-white',
    description: 'text-slate-300',
    features: 'text-slate-300',
    divider: 'bg-slate-700/70',
    icons: 'text-teal-400',
    comingSoonBadge: 'bg-teal-700/40 text-teal-400 border-teal-700/50',
    primaryButton: 'bg-gradient-to-r from-teal-500/70 to-emerald-300/80 hover:from-teal-500 hover:to-emerald-500',
    secondaryButton: 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700',
    backgroundGradient: 'bg-gradient-to-r from-teal-500/20 to-indigo-500/20',
    animatedDots: 'bg-teal-400',
  };

  return (
    <FeatureCardWrapper mode={mode}>
      <div className="flex flex-col lg:flex-row lg:h-64">
        {/* Title section */}
        <div className={`relative h-32 lg:h-auto lg:w-1/4 ${textClasses.backgroundGradient} overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {dots.map((style, i) => (
              <div key={i} className={`absolute rounded-full ${textClasses.animatedDots} animate-pulse`} style={style}></div>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col justify-center p-8">
            <h2 className={`text-3xl font-bold ${textClasses.title} tracking-tight break-words`}>Astro Starter</h2>
            <div className="flex items-center mt-2">
              <Star className={`h-4 w-4 ${textClasses.icons} mr-1`} fill="currentColor" />
              <Star className={`h-4 w-4 ${textClasses.icons} mr-1`} fill="currentColor" />
              <Star className={`h-4 w-4 ${textClasses.icons}`} fill="currentColor" />
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className={`hidden lg:block w-0.5 ${textClasses.divider} h-full mx-0`} />
        <div className={`block lg:hidden h-0.5 ${textClasses.divider} w-full mx-0`} />

        {/* Content section */}
        <div className="p-6 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
          <div className={`mb-4 ${textClasses.description} flex items-center`}>
            <Rocket size={16} className={`mr-2 ${textClasses.icons}`} />
            <span className="text-sm">Lightning-fast static site generation</span>
          </div>
          <div className="space-y-3 mb-6">
            <div className={`flex items-center ${textClasses.features}`}>
              <Globe size={14} className={`mr-2 ${textClasses.icons}`} />
              <span className="text-xs">Content-focused with zero JS by default</span>
            </div>
            <div className={`flex items-center ${textClasses.features}`}>
              <Box size={14} className={`mr-2 ${textClasses.icons}`} />
              <span className="text-xs">Use any UI framework or none at all</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 ${textClasses.comingSoonBadge} rounded-full text-xs font-medium border animate-pulse`}>Coming Soon</span>
          </div>
        </div>
        {/* Actions */}
        <div className="p-6 lg:w-1/4 lg:flex lg:flex-col lg:justify-center lg:gap-4">
          <button className={`w-full mb-3 lg:mb-0 py-2 px-3 ${textClasses.primaryButton} text-white font-medium rounded-[0.5em] transition-all duration-200 flex items-center justify-center opacity-70 cursor-not-allowed`}>
            <Rocket size={14} className="mr-2" />
            <span>Join Waitlist</span>
          </button>
          <button className={`w-full py-2 px-3 ${textClasses.secondaryButton} font-medium rounded-[0.5em] border transition-all duration-200 flex items-center justify-center`}>
            <FileText size={14} className="mr-2" />
            <span>View Readme</span>
          </button>
        </div>
      </div>
    </FeatureCardWrapper>
  );
}
