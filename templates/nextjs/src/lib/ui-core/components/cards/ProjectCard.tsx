import React from 'react';
import { cn } from '../../utils';
import { BaseCard } from './BaseCard';
import { Button } from '../ui/button';
import type { ProjectContent } from '../../content/schemas';
import { Zap, Code } from 'lucide-react';

interface ProjectCardProps {
  title?: string;
  description?: string;
  techStack?: string[];
  repoUrl?: string;
  demoUrl?: string;
  content?: ProjectContent;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean; // render children as background overlay
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
  /**
   * Additional props to pass to the rendered image component.
   * Useful for framework adapters (e.g., Next.js Image `width`, `height`, `priority`, `sizes`).
   */
  imageProps?: Record<string, unknown>;
}


const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack = [],
  repoUrl,
  content,
  className,
  ImageComponent,
  LinkComponent,
  imageProps = {},
}) => {
  const showTitle = title || content?.title;
  const showDesc = description || content?.description;
  const showStack = techStack.length ? techStack : (content?.techStack || []);
  const image = content?.image;
  const features = content?.features || [];
  
  return (
    <BaseCard 
      className={cn('relative h-full flex flex-col p-4 md:p-6 overflow-hidden bg-background border border-border group', className)}
      ImageComponent={ImageComponent}
      LinkComponent={LinkComponent}
    >
      <div className="relative z-10 flex flex-col h-full">
        {image && (
          <div className="relative mb-4 rounded-md overflow-hidden h-40">
            {ImageComponent ? (
              <ImageComponent
                src={image}
                alt={showTitle || 'Project image'}
                className="object-cover object-top w-full h-full"
                {...imageProps}
              />
            ) : (
              <img
                src={image}
                alt={showTitle || 'Project image'}
                className="object-cover object-top w-full h-full"
              />
            )}
          </div>
        )}
        <h3 className="text-2xl font-bold text-foreground mb-2">{showTitle}</h3>
        {showDesc && <p className="text-sm text-muted-foreground mb-4 flex-grow">{showDesc}</p>}
        
        {!!showStack.length && (
          <div className="flex flex-wrap gap-2 mb-4">
            {showStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 rounded-full border bg-[var(--color-accent-3)] text-[var(--color-accent-12)] border-[var(--color-card-border)] text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {!!features.length && (
          <div className="space-y-2 mt-0.5 mb-6">
            {features.slice(0,4).map((f) => (
              <div key={f.label} className="flex items-center text-muted-foreground">
                <Zap 
                  size={14} 
                  className="mr-2"
                  style={{ 
                    color: f.color === 'primary' ? 'var(--color-accent-9)' : 'var(--color-yellow-400)',
                    marginRight: '6px'
                  }}
                />
                <span className="text-xs">{f.label}</span>
              </div>
            ))}
          </div>
        )}
        
        {(() => {
          const actions = (content?.actions && content.actions.length > 0) ? content.actions : [{
            href: repoUrl || content?.repoUrl || '',
            label: 'View on GitHub',
            variant: 'primary' as const
          }];
          const action = actions[0];
          if (!action?.href) return null;
          const isPrimary = action.variant === 'primary';
          return (
            <Button
              asChild
              key={`${action.href}-${action.label}`}
              className={isPrimary 
                ? "mt-auto bg-[var(--color-accent-9)] hover:bg-[var(--color-accent-8)] text-background"
                : "mt-auto inline-flex items-center px-3 py-1.5 rounded-full border bg-[var(--color-accent-3)] text-[var(--color-accent-12)] border-[var(--color-card-border)] text-xs font-medium leading-none hover:bg-[var(--color-accent-4)] transition-colors"
              }
            >
              {LinkComponent ? (
                <LinkComponent href={action.href} target="_blank" rel="noopener noreferrer">
                  <Code size={16} className="mr-2" />
                  {action.label}
                </LinkComponent>
              ) : (
                <a href={action.href} target="_blank" rel="noopener noreferrer">
                  <Code size={16} className="mr-2" />
                  {action.label}
                </a>
              )}
            </Button>
          );
        })()}
      </div>
    </BaseCard>
  );
};

export { ProjectCard };
export type { ProjectCardProps };