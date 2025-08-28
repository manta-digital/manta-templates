import React from 'react';
import { BaseCard, BentoLayout, GridItem, ComingSoonOverlay } from '@/lib/ui-core';
import { BookOpen, Cpu, GitBranch, Code, Terminal, ExternalLink } from 'lucide-react';

interface GuidesContent {
  title: string;
  subtitle: string;
  comingSoonFeature: {
    title: string;
    icon: string;
    codeExample: string;
  };
  features: Array<{
    icon: string;
    label: string;
  }>;
  documentation: Array<{
    title: string;
    description: string;
    action: string;
    href: string;
  }>;
  footerAction: {
    text: string;
    href: string;
  };
}

interface GuidesCardProps {
  content: GuidesContent;
  className?: string;
}

const iconMap = {
  'cpu': Cpu,
  'git-branch': GitBranch,
  'code': Code,
  'terminal': Terminal,
  'book-open': BookOpen,
};

export default function GuidesCard({ content, className }: GuidesCardProps) {
  return (
    <BaseCard className={`h-full p-6 overflow-hidden ${className || ''}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border pb-4 flex-none">
          <div className="flex items-center justify-between h-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {content.title}
            </h2>
            <BookOpen size={20} className="text-primary" />
          </div>
          <p className="text-muted-foreground mt-1 text-sm">{content.subtitle}</p>
        </div>

        {/* Coming Soon Feature */}
        <div className="space-y-4 pt-4 pb-4 flex-shrink-0">
          <h3 className="text-xl font-semibold text-foreground flex items-center mb-2">
            <Cpu size={18} className="mr-2 text-primary" />
            {content.comingSoonFeature.title}
          </h3>
          
          <div className="min-h-[120px]">
            <ComingSoonOverlay color="purple" blurAmount="sm">
              <div className="bg-muted/50 rounded-lg p-4 border border-border h-full">
                <div className="text-xs text-muted-foreground mb-2">Quick start</div>
                <div className="font-mono text-sm bg-muted p-3 rounded overflow-x-auto">
                  <span className="text-emerald-500">npx</span>{' '}
                  <span className="text-primary">create-manta-app</span>{' '}
                  <span className="text-blue-500">my-ai-project</span>
                </div>
              </div>
            </ComingSoonOverlay>
          </div>

          {/* Features List */}
          <div className="space-y-2">
            {content.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || GitBranch;
              return (
                <div key={index} className="flex items-center">
                  <IconComponent size={14} className="mr-2 text-primary" />
                  <span className="text-sm text-muted-foreground">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Documentation Grid */}
        <div className="flex flex-col pt-4 pb-4 gap-2 md:gap-4 flex-1 min-h-0">
          <h3 className="text-xl font-semibold text-foreground flex pb-0 mb-0">
            <BookOpen size={18} className="mr-2 mt-1 text-primary" />
            Documentation
          </h3>
          
          <div className="flex-1 min-h-0">
            <BentoLayout columns="grid-cols-2" gap={3} rowHeight="minmax(100px, auto)">
              {content.documentation.map((doc, index) => (
                <GridItem key={index} colSpan="col-span-1">
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="bg-muted/50 hover:bg-muted p-4 rounded-lg border border-border transition-colors group cursor-pointer h-full flex flex-col">
                      <div className="text-primary mb-2 group-hover:text-primary/80">
                        {doc.title}
                      </div>
                      <p className="text-xs text-muted-foreground flex-grow">
                        {doc.description}
                      </p>
                      <div className="mt-3 text-xs text-primary flex items-center">
                        <span>{doc.action}</span>
                        <ExternalLink size={10} className="ml-1" />
                      </div>
                    </div>
                  </a>
                </GridItem>
              ))}
            </BentoLayout>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-4 flex justify-center flex-none">
          <a
            href={content.footerAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-2xl py-2 px-4 bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-colors flex items-center justify-center"
          >
            <span>{content.footerAction.text}</span>
            <ExternalLink size={14} className="ml-2" />
          </a>
        </div>
      </div>
    </BaseCard>
  );
}