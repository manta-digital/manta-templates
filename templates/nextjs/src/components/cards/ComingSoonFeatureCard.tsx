"use client";
import React, { useState, useEffect } from 'react';
import FeatureCardWrapper from './FeatureCardWrapper';
import { FileText, Rocket, Star, Globe } from 'lucide-react';
import { FeatureContent } from '@/types/content';

interface ComingSoonFeatureCardProps {
  mode?: 'dark' | 'light';
  content?: FeatureContent;
}

export default function ComingSoonFeatureCard({ mode = 'dark', content }: ComingSoonFeatureCardProps) {
  // Use content prop if provided, otherwise fall back to defaults
  const cardTitle = content?.title || 'Astro Starter';
  const cardDescription = content?.description || 'Lightning-fast static site generation';
  const cardFeatures = content?.features || [
    { label: 'Content-focused with zero JS by default' },
    { label: 'Use any UI framework or none at all' }
  ];
  const cardLinks = content?.links ? [
    { label: content.links.primary.label, url: content.links.primary.href, type: 'primary' },
    ...(content.links.secondary ? [{ label: content.links.secondary.label, url: content.links.secondary.href, type: 'secondary' }] : [])
  ] : [
    { label: 'Join Waitlist', url: '#', type: 'primary' },
    { label: 'View Readme', url: 'https://github.com/manta-digital/manta-templates', type: 'secondary' }
  ];

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
            <h2 className={`text-3xl font-bold ${textClasses.title} tracking-tight break-words`}>{cardTitle}</h2>
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
            <span className="text-sm">{cardDescription}</span>
          </div>
          <div className="space-y-3 mb-6">
            {cardFeatures.map((feature, i) => (
              <div key={i} className={`flex items-center ${textClasses.features}`}>
                <Globe size={14} className={`mr-2 ${textClasses.icons}`} />
                <span className="text-xs">{feature.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 ${textClasses.comingSoonBadge} rounded-full text-xs font-medium border animate-pulse`}>Coming Soon</span>
          </div>
        </div>
        {/* Actions */}
        <div className="p-6 lg:w-1/4 lg:flex lg:flex-col lg:justify-center lg:gap-4">
          {cardLinks.map((link, i) => (
            <button key={i} className={`w-full py-2 px-3 ${link.type === 'primary' ? textClasses.primaryButton : textClasses.secondaryButton} font-medium rounded-[0.5em] border transition-all duration-200 flex items-center justify-center`}>
              {link.type === 'primary' ? <Rocket size={14} className="mr-2" /> : <FileText size={14} className="mr-2" />}
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </FeatureCardWrapper>
  );
}
