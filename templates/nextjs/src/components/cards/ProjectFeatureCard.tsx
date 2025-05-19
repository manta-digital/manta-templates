import React from 'react';
import { Code, Layers, Zap, FileText } from 'lucide-react';

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
  // Default features if not provided
  const featureList =
    features ||
    [
      { icon: <Zap size={14} className="mr-2 text-yellow-400" />, label: 'Fast & modern React framework' },
      { icon: <Layers size={14} className="mr-2 text-emerald-400" />, label: 'Production-ready components' },
    ];

  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg border border-slate-700 hover:border-cyan-500 hover:scale-[1.02] transition-all duration-300 hover:shadow-cyan-900/20 hover:shadow-xl">
      <div className="flex flex-col lg:flex-row lg:h-64">
        {/* Title section */}
        <div className="relative h-32 lg:h-auto lg:w-1/4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="grid grid-cols-3 gap-3 w-full h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white/10 rounded-md animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
            <p className="text-base text-slate-200 mt-2">{description}</p>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
          <div className="mb-4 text-slate-300 flex items-center">
            <Code size={16} className="mr-2 text-cyan-400" />
            <span className="text-sm">{techStack.join(', ')}</span>
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
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
            {techStack.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-slate-800 text-cyan-400 rounded-md text-xs font-medium border border-slate-700">{tech}</span>
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
              className="w-full mb-3 lg:mb-0 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              <Code size={14} className="mr-2" />
              <span>Use Template</span>
            </a>
          ) : (
            <button disabled className="w-full mb-3 lg:mb-0 py-2 px-3 bg-slate-800 text-slate-400 font-medium rounded-lg flex items-center justify-center opacity-60 cursor-not-allowed">
              <Code size={14} className="mr-2" />
              <span>Use Template</span>
            </button>
          )}
          {demoUrl ? (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-slate-800 text-slate-200 hover:bg-slate-700 font-medium rounded-lg border border-slate-700 transition-all duration-200 flex items-center justify-center"
            >
              <FileText size={14} className="mr-2" />
              <span>View Readme</span>
            </a>
          ) : (
            <button disabled className="w-full py-2 px-3 bg-slate-800 text-slate-400 font-medium rounded-lg border border-slate-700 flex items-center justify-center opacity-60 cursor-not-allowed">
              <FileText size={14} className="mr-2" />
              <span>View Readme</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}