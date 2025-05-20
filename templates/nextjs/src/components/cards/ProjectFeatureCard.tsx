import React from 'react';
import { Code, Layers, Zap, FileText } from 'lucide-react';

const techColors = [
  { bg: 'bg-mintteal-500/80', text: 'text-slate-100', border: 'border-teal-500/80' },
  { bg: 'bg-purple-500/80', text: 'text-slate-100', border: 'border-purple-400/80' },
  { bg: 'bg-blue-500/80', text: 'text-slate-100', border: 'border-blue-400/80' },
  { bg: 'bg-cyan-500/80', text: 'text-slate-100', border: 'border-cyan-400/80' },
  { bg: 'bg-emerald-500/80', text: 'text-slate-100', border: 'border-emerald-400/80' },
];

interface ProjectFeatureCardProps {
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  features?: { icon: React.ReactNode; label: string }[];
}

export default function ProjectFeatureCard({
  title,
  description,
  techStack,
  repoUrl,
  demoUrl,
  features,
}: ProjectFeatureCardProps) {
  const featureList =
    features ||
    [
      { icon: <Zap size={14} className="mr-2 text-yellow-400" />, label: 'Fast & modern React framework' },
      { icon: <Layers size={14} className="mr-2 text-emerald-400" />, label: 'Production-ready components' },
    ];

  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg border border-teal-500 hover:border-teal-600 hover:scale-[1.02] transition-all duration-300 hover:shadow-teal-900/20 hover:shadow-xl">
      <div className="flex flex-col lg:flex-row lg:h-64">
        {/* Title section */}
        <div className="relative lg:w-1/4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 overflow-hidden flex flex-col justify-center p-8">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="grid grid-cols-3 gap-3 w-full h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white/10 rounded-md animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-start">
            <h2 className="text-3xl font-bold text-white tracking-tight text-balance break-words leading-tight mb-2">{title}</h2>
            <p className="text-base text-slate-200 mb-4">{description}</p>
          </div>
        </div>
        {/* Divider */}
        <div className="hidden lg:block w-0.5 bg-slate-700/70 h-full mx-0" />
        <div className="block lg:hidden h-0.5 bg-slate-700/70 w-full mx-0" />
        {/* Content section */}
        <div className="p-6 lg:pl-10 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
          <div className="mb-4 text-slate-300 flex items-center">
            <Code size={16} className="mr-2 text-cyan-400" />
            <span className="text-sm">{techStack.join(', ')}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech, i) => {
              const color = techColors[i % techColors.length];
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
              <div className="flex items-center text-slate-300" key={i}>
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
            <button disabled className="w-full mb-3 lg:mb-0 py-2 px-3 bg-slate-800 text-slate-400 font-medium rounded-[0.5em] flex items-center justify-center opacity-60 cursor-not-allowed">
              <Code size={14} className="mr-2" />
              <span>Use Template</span>
            </button>
          )}
          {demoUrl ? (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-slate-800 text-slate-200 hover:bg-slate-700 font-medium rounded-[0.5em] border border-slate-700 transition-all duration-200 flex items-center justify-center"
            >
              <FileText size={14} className="mr-2" />
              <span>View Readme</span>
            </a>
          ) : (
            <button disabled className="w-full py-2 px-3 bg-slate-800 text-slate-400 font-medium rounded-[0.5em] border border-slate-700 flex items-center justify-center opacity-60 cursor-not-allowed">
              <FileText size={14} className="mr-2" />
              <span>View Readme</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}