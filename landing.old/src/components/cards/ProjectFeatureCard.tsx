import React from 'react';
import { Code, Layers, Zap, FileText } from 'lucide-react';
import FeatureCardWrapper from './FeatureCardWrapper';

const techColors = {
  dark: [
    { bg: 'bg-mintteal-600/80', text: 'text-slate-100', border: 'border-teal-600/80' },
    { bg: 'bg-purple-600/80', text: 'text-slate-100', border: 'border-purple-500/80' },
    { bg: 'bg-blue-600/80', text: 'text-slate-100', border: 'border-blue-500/80' },
    { bg: 'bg-cyan-600/80', text: 'text-slate-100', border: 'border-cyan-500/80' },
    { bg: 'bg-emerald-600/80', text: 'text-slate-100', border: 'border-emerald-500/80' },
  ],
  light: [
    { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300' },
    { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
    { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-300' },
    { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
  ],
};

interface ProjectFeatureCardProps {
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  features?: { icon: React.ReactNode; label: string }[];
  mode?: 'dark' | 'light';
}

export default function ProjectFeatureCard({
  title,
  description,
  techStack,
  repoUrl,
  demoUrl,
  features,
  mode = 'dark',
}: ProjectFeatureCardProps) {
  const featureList =
    features ||
    [
      { icon: <Zap size={14} className={mode === 'light' ? 'mr-2 text-yellow-600' : 'mr-2 text-yellow-400'} />, label: 'Fast & modern React framework' },
      { icon: <Layers size={14} className={mode === 'light' ? 'mr-2 text-emerald-600' : 'mr-2 text-emerald-400'} />, label: 'Production-ready components' },
    ];

  const colors = techColors[mode];
  const textClasses = mode === 'light' ? {
    title: 'text-slate-900',
    subtitle: 'text-slate-600',
    description: 'text-slate-700',
    features: 'text-slate-700',
    divider: 'bg-slate-300/70',
    codeIcon: 'text-cyan-600',
    disabledButton: 'bg-slate-200 text-slate-500',
    secondaryButton: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300',
  } : {
    title: 'text-white',
    subtitle: 'text-slate-200',
    description: 'text-slate-300',
    features: 'text-slate-300',
    divider: 'bg-slate-700/70',
    codeIcon: 'text-cyan-400',
    disabledButton: 'bg-slate-800 text-slate-400',
    secondaryButton: 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700',
  };

  return (
    <FeatureCardWrapper mode={mode}>
      <div className="flex flex-col lg:flex-row lg:h-64">
        {/* Title section */}
        <div className={`relative lg:w-1/4 ${mode === 'light' ? 'bg-gradient-to-r from-cyan-100/60 to-purple-100/60' : 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20'} overflow-hidden flex flex-col justify-center p-8`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="grid grid-cols-3 gap-3 w-full h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`${mode === 'light' ? 'bg-slate-400/20' : 'bg-white/10'} rounded-md animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-start">
            <h2 className={`text-3xl font-bold ${textClasses.title} tracking-tight text-balance break-words leading-tight mb-2`}>{title}</h2>
            <p className={`text-base ${textClasses.subtitle} mb-4`}>{techStack.join(' + ')}</p>
          </div>
        </div>
        {/* Divider */}
        <div className={`hidden lg:block w-0.5 ${textClasses.divider} h-full mx-0`} />
        <div className={`block lg:hidden h-0.5 ${textClasses.divider} w-full mx-0`} />
        {/* Content section */}
        <div className="p-6 lg:pl-10 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
          <div className={`mb-4 ${textClasses.description} flex items-center`}>
            <Code size={16} className={`mr-2 ${textClasses.codeIcon}`} />
            <span className="text-sm">{description}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech, i) => {
              const color = colors[i % colors.length];
              return (
                <span
                  key={tech}
                  className={`px-3 py-1 ${color.bg} ${color.text} ${color.border} border rounded-[0.5em] text-xs font-medium`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
          {/* Features */}
          <div className="space-y-3 mb-6">
            {featureList.map((f, i) => (
              <div className={`flex items-center ${textClasses.features}`} key={i}>
                {f.icon}
                <span className="text-xs">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="p-6 lg:w-1/4 lg:flex lg:flex-col lg:justify-center lg:gap-4">
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-3 lg:mb-0 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-[0.5em] transition-all duration-200 flex items-center justify-center"
            >
              <Code size={14} className="mr-2" />
              <span>Use Template</span>
            </a>
          ) : (
            <button disabled className={`w-full mb-3 lg:mb-0 py-2 px-3 ${textClasses.disabledButton} font-medium rounded-[0.5em] flex items-center justify-center opacity-60 cursor-not-allowed`}>
              <Code size={14} className="mr-2" />
              <span>Use Template</span>
            </button>
          )}
          {demoUrl ? (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2 px-3 ${textClasses.secondaryButton} font-medium rounded-[0.5em] border transition-all duration-200 flex items-center justify-center`}
            >
              <FileText size={14} className="mr-2" />
              <span>View Readme</span>
            </a>
          ) : (
            <button disabled className={`w-full py-2 px-3 ${textClasses.secondaryButton} font-medium rounded-[0.5em] border flex items-center justify-center opacity-60 cursor-not-allowed`}>
              <FileText size={14} className="mr-2" />
              <span>View Readme</span>
            </button>
          )}
        </div>
      </div>
    </FeatureCardWrapper>
  );
}