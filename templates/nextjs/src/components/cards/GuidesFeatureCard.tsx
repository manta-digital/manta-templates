import React from 'react';
import FeatureCardWrapper from './FeatureCardWrapper';
import { FileText, BookOpen, Code, Terminal, ExternalLink, Search, GitBranch, Cpu } from 'lucide-react';
import GridLayout from '@/components/layouts/grid-layout/grid-layout';
import { ComingSoonOverlay } from '../overlays/ComingSoonOverlay';

export default function GuidesFeatureCard() {
  return (
    <FeatureCardWrapper className="h-full rounded-lg border border-teal-500 hover:border-purple-500 hover:shadow-purple-900/20 hover:scale-[1.01]">
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="relative border-b border-slate-700/50 pb-4">
          <div className="flex items-center justify-between h-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Guides & Docs</h2>
            <BookOpen size={20} className="text-purple-400" />
          </div>
          <p className="text-slate-400 mt-1 text-sm">Comprehensive guides and documentation</p>
        </div>
        {/* Main content */}
        <div className="space-y-4 justify-between pt-4 pb-2">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Cpu size={18} className="mr-2 text-purple-400" />
              AI Project Guide
            </h3>
            <ComingSoonOverlay color="purple" blurAmount="sm">
            <div className="bg-slate-800/50 rounded-[0.5em] p-4 pt-2 pb-4 border border-slate-700">
              <div className="text-xs text-slate-400 mb-2">Quick start</div>
              <div className="font-mono text-sm text-slate-300 bg-slate-900/70 p-3 pb-4 rounded overflow-x-auto">
                <span className="text-emerald-400">npx</span> <span className="text-purple-400">create-manta-app</span> <span className="text-blue-400">my-ai-project</span>
              </div>
            </div>
            </ComingSoonOverlay>
            
            <div className="space-y-2">
              <a href="https://github.com/manta-digital/manta-templates" className="flex items-center text-slate-300 hover:text-purple-400 transition-colors">
                <GitBranch size={14} className="mr-2 text-purple-400" />
                <span className="text-sm">Monorepo Structure</span>
              </a>
              <a href="https://github.com/manta-digital/manta-templates" className="flex items-center text-slate-300 hover:text-purple-400 transition-colors">
                <Terminal size={14} className="mr-2 text-purple-400" />
                <span className="text-sm">CLI Commands Reference</span>
              </a>
              <a href="https://github.com/manta-digital/manta-templates" className="flex items-center text-slate-300 hover:text-purple-400 transition-colors">
                <Code size={14} className="mr-2 text-purple-400" />
                <span className="text-sm">Custom Configuration</span>
              </a>
            </div>
        </div>

        <div className="flex flex-col pt-4 pb-4 gap-2 md:gap-4 h-full">
            <h3 className="text-xl font-semibold text-white flex pb-2">
              <FileText size={18} className="mr-2 mt-1 text-purple-400" />
              Documentation
            </h3>
            <GridLayout gridData={{ default: [[1,1],[1,1]] }} gap="0.75rem">
              <a
                href="https://github.com/manta-digital/manta-templates"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label="Getting Started: Quick installation guide and first steps"
              >
                <div className="bg-slate-800/50 hover:bg-slate-800 p-4 rounded-[0.5em] border border-slate-700 transition-colors group cursor-pointer">
                    <div className="text-purple-400 mb-2 group-hover:text-purple-300">Getting Started</div>
                    <p className="text-xs text-slate-400 flex-grow">Quick installation guide and first steps</p>
                    <div className="mt-3 text-xs text-purple-500 flex items-center">
                      <span>Read</span>
                      <ExternalLink size={10} className="ml-1" />
                    </div>
                </div>
              </a>
              <a
                href="https://github.com/manta-digital/manta-templates"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label="Templates: Available project templates and usage"
              >
                <div className="bg-slate-800/50 hover:bg-slate-800 p-4 rounded-[0.5em] border border-slate-700 transition-colors group cursor-pointer">
                    <div className="text-purple-400 mb-2 group-hover:text-purple-300">Templates</div>
                    <p className="text-xs text-slate-400 flex-grow">Available project templates and usage</p>
                    <div className="mt-3 text-xs text-purple-500 flex items-center">
                      <span>Browse</span>
                      <ExternalLink size={10} className="ml-1" />
                    </div>
                </div>
              </a>              
              <a
                href="https://github.com/manta-digital/manta-templates"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label="API Reference: Complete API documentation"
              >
                <div className="bg-slate-800/50 hover:bg-slate-800 p-4 rounded-[0.5em] border border-slate-700 transition-colors group cursor-pointer">
                    <div className="text-purple-400 mb-2 group-hover:text-purple-300">API Reference</div>
                    <p className="text-xs text-slate-400 flex-grow">Complete API documentation</p>
                    <div className="mt-3 text-xs text-purple-500 flex items-center">
                      <span>Explore</span>
                      <ExternalLink size={10} className="ml-1" />
                    </div>
                </div>
              </a>
              <a
                href="https://github.com/manta-digital/manta-templates"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label="Examples: Sample projects and demos"
              >
                <div className="bg-slate-800/50 hover:bg-slate-800 p-4 rounded-[0.5em] border border-slate-700 transition-colors group cursor-pointer">
                    <div className="text-purple-400 mb-2 group-hover:text-purple-300">Examples</div>
                    <p className="text-xs text-slate-400 flex-grow">Sample projects and demos</p>
                    <div className="mt-3 text-xs text-purple-500 flex items-center">
                      <span>View</span>
                      <ExternalLink size={10} className="ml-1" />
                    </div>
                </div>
              </a>
            </GridLayout>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 h-full p-6 flex flex-col items-center justify-between">
            {/*
            <div className="h-full flex items-center pb-3">
                <Search size={16} className="text-slate-400 mr-2" />
                <span className="text-sm text-slate-400">Search documentation</span>
            </div>
            */}
            <div className="h-full">
              <a
                href="https://github.com/manta-digital/manta-templates"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-[0.5em] transition-colors flex items-center"
                aria-label="View All Documentation"
              >
                <span>View All Documentation</span>
                <ExternalLink size={14} className="ml-2" />
              </a>
            </div>
        </div>
      </div>
    </FeatureCardWrapper>
  );
}
