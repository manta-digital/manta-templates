import React from 'react';
import FeatureCardWrapper from './FeatureCardWrapper';
import { FileText, BookOpen, ExternalLink, GitBranch, Cpu, Code, Terminal } from 'lucide-react';
import GridLayout from '@/components/layouts/grid-layout/grid-layout';
import { ComingSoonOverlay } from '../overlays/ComingSoonOverlay';
import { FeatureContent } from '@/types/content';

interface GuidesFeatureCardProps {
  mode?: 'dark' | 'light';
  content?: FeatureContent;
}

export default function GuidesFeatureCard({ mode = 'dark', content }: GuidesFeatureCardProps) {
  // Use content prop if provided, otherwise fall back to defaults
  const cardTitle = content?.title || 'Guides & Docs';
  const cardDescription = content?.description || 'Comprehensive guides and documentation';
  const cardFeatures = content?.features || [
    { icon: 'GitBranch', label: 'Monorepo Structure' },
    { icon: 'Code', label: 'Component Library' },
    { icon: 'Terminal', label: 'CLI Tools' }
  ];
  const cardRepoUrl = content?.repoUrl || 'https://github.com/manta-digital/manta-templates';

  const textClasses = mode === 'light' ? {
    title: 'text-slate-900',
    subtitle: 'text-slate-600',
    sectionTitle: 'text-slate-900',
    description: 'text-slate-700',
    links: 'text-slate-700 hover:text-purple-600',
    divider: 'border-slate-300/50',
    icons: 'text-purple-600',
    cardBg: 'bg-slate-50/50 hover:bg-slate-100',
    cardBorder: 'border-slate-300',
    cardText: 'text-purple-600 group-hover:text-purple-500',
    cardDescription: 'text-slate-600',
    cardAction: 'text-purple-700',
    footerButton: 'bg-purple-100/60 text-purple-700 hover:bg-purple-200/60',
    codeBlock: 'bg-slate-100/70',
    codeText: 'text-slate-800',
  } : {
    title: 'text-white',
    subtitle: 'text-slate-400',
    sectionTitle: 'text-white',
    description: 'text-slate-300',
    links: 'text-slate-300 hover:text-purple-400',
    divider: 'border-slate-700/50',
    icons: 'text-purple-400',
    cardBg: 'bg-slate-800/50 hover:bg-slate-800',
    cardBorder: 'border-slate-700',
    cardText: 'text-purple-400 group-hover:text-purple-300',
    cardDescription: 'text-slate-400',
    cardAction: 'text-purple-500',
    footerButton: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30',
    codeBlock: 'bg-slate-900/70',
    codeText: 'text-slate-300',
  };

  return (
    <FeatureCardWrapper mode={mode}>
      <div className="flex flex-col h-full p-6 overflow-hidden">
        {/* Header */}
        <div className={`relative border-b ${textClasses.divider} pb-4 flex-none`}>
          <div className="flex items-center justify-between h-10">
            <h2 className={`text-2xl md:text-3xl font-bold ${textClasses.title} tracking-tight`}>{cardTitle}</h2>
            <BookOpen size={20} className={textClasses.icons} />
          </div>
          <p className={`${textClasses.subtitle} mt-1 text-sm`}>{cardDescription}</p>
        </div>
        {/* Main content */}
        <div className="space-y-4 justify-between pt-4 pb-2 flex-shrink-0">
            <h3 className={`text-xl font-semibold ${textClasses.sectionTitle} flex items-center`}>
              <Cpu size={18} className={`mr-2 ${textClasses.icons}`} />
              AI Project Guide
            </h3>
            <ComingSoonOverlay color="purple" blurAmount="sm" mode={mode}>
            <div className={`${textClasses.cardBg} rounded-[0.5em] p-4 pt-2 pb-4 border ${textClasses.cardBorder}`}>
              <div className={`text-xs ${textClasses.subtitle} mb-2`}>Quick start</div>
              <div className={`font-mono text-sm ${textClasses.codeText} ${textClasses.codeBlock} p-3 pb-4 rounded overflow-x-auto`}>
                <span className="text-emerald-400">npx</span> <span className="text-purple-400">create-manta-app</span> <span className="text-blue-400">my-ai-project</span>
              </div>
            </div>
            </ComingSoonOverlay>
            
            <div className="space-y-2">
              {cardFeatures.map((feature, index) => {
                let IconComponent;
                if (feature.icon) {
                  switch (feature.icon) {
                    case 'Code': IconComponent = Code; break;
                    case 'Terminal': IconComponent = Terminal; break;
                    case 'GitBranch': IconComponent = GitBranch; break;
                    default: IconComponent = GitBranch;
                  }
                } else {
                  IconComponent = GitBranch;
                }
                return (
                  <div key={index} className="flex items-center">
                    <IconComponent size={14} className={`mr-2 ${textClasses.icons}`} />
                    <span className={`text-sm ${textClasses.description}`}>{feature.label}</span>
                  </div>
                );
              })}
            </div>
        </div>

        <div className="flex flex-col pt-4 pb-4 gap-2 md:gap-4 flex-1 min-h-0">
            <h3 className={`text-xl font-semibold ${textClasses.sectionTitle} flex pb-2`}>
              <FileText size={18} className={`mr-2 mt-1 ${textClasses.icons}`} />
              Documentation
            </h3>
            <div className="flex-1 min-h-0">
              <GridLayout gridData={{ default: [[1,1],[1,1]] }} gap="0.75rem">
                <a
                  href={cardRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Getting Started: Quick installation guide and first steps"
                >
                  <div className={`${textClasses.cardBg} p-4 rounded-[0.5em] border ${textClasses.cardBorder} transition-colors group cursor-pointer`}>
                      <div className={`${textClasses.cardText} mb-2`}>Getting Started</div>
                      <p className={`text-xs ${textClasses.cardDescription} flex-grow`}>Quick installation guide and first steps</p>
                      <div className={`mt-3 text-xs ${textClasses.cardAction} flex items-center`}>
                        <span>Read</span>
                        <ExternalLink size={10} className="ml-1" />
                      </div>
                  </div>
                </a>
                <a
                  href={cardRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Templates: Available project templates and usage"
                >
                  <div className={`${textClasses.cardBg} p-4 rounded-[0.5em] border ${textClasses.cardBorder} transition-colors group cursor-pointer`}>
                      <div className={`${textClasses.cardText} mb-2`}>Templates</div>
                      <p className={`text-xs ${textClasses.cardDescription} flex-grow`}>Available project templates and usage</p>
                      <div className={`mt-3 text-xs ${textClasses.cardAction} flex items-center`}>
                        <span>Browse</span>
                        <ExternalLink size={10} className="ml-1" />
                      </div>
                  </div>
                </a>              
                <a
                  href={cardRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="API Reference: Complete API documentation"
                >
                  <div className={`${textClasses.cardBg} p-4 rounded-[0.5em] border ${textClasses.cardBorder} transition-colors group cursor-pointer`}>
                      <div className={`${textClasses.cardText} mb-2`}>API Reference</div>
                      <p className={`text-xs ${textClasses.cardDescription} flex-grow`}>Complete API documentation</p>
                      <div className={`mt-3 text-xs ${textClasses.cardAction} flex items-center`}>
                        <span>Explore</span>
                        <ExternalLink size={10} className="ml-1" />
                      </div>
                  </div>
                </a>
                <a
                  href={cardRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Examples: Sample projects and demos"
                >
                  <div className={`${textClasses.cardBg} p-4 rounded-[0.5em] border ${textClasses.cardBorder} transition-colors group cursor-pointer`}>
                      <div className={`${textClasses.cardText} mb-2`}>Examples</div>
                      <p className={`text-xs ${textClasses.cardDescription} flex-grow`}>Sample projects and demos</p>
                      <div className={`mt-3 text-xs ${textClasses.cardAction} flex items-center`}>
                        <span>View</span>
                        <ExternalLink size={10} className="ml-1" />
                      </div>
                  </div>
                </a>
              </GridLayout>
            </div>
        </div>

        {/* Footer */}
        <div className={`border-t ${textClasses.divider} p-6 flex flex-col items-center justify-between flex-none`}>
            <div className="h-full">
              <a
                href={cardRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-2 px-4 ${textClasses.footerButton} rounded-[0.5em] transition-colors flex items-center`}
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
