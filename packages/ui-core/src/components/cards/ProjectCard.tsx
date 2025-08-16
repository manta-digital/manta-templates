import React from 'react';
import { cn } from '../../utils';
import { BaseCard } from '../ui/BaseCard';
import { Button } from '../ui/button';
import { ProjectContent } from '../../types/content';
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
}

interface ProjectCardBodyProps {
  title?: string;
  description?: string;
  techStack?: string[];
  repoUrl?: string;
  demoUrl?: string;
  wrapperClassName?: string;
  h3ClassName: string;
  pClassName: string;
  isOverlay?: boolean;
  LinkComponent?: React.ComponentType<any>;
}

const ProjectCardBody: React.FC<ProjectCardBodyProps> = ({
  title,
  description,
  techStack = [],
  repoUrl,
  demoUrl,
  wrapperClassName = '',
  h3ClassName,
  pClassName,
  isOverlay = false,
  LinkComponent,
}) => (
  <div className={wrapperClassName}>
    <h3 className={h3ClassName}>{title || 'Untitled Project'}</h3>
    {description && <p className={pClassName}>{description}</p>}
    <div className="flex flex-wrap gap-2 mb-4">
      {techStack.map((tech) => (
        <span
          key={tech}
          className={isOverlay 
            ? "inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium leading-none backdrop-blur-sm border border-white/30"
            : "inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium leading-none"
          }
        >
          {tech}
        </span>
      ))}
    </div>
    <div className="mt-auto flex justify-end gap-3 pt-2 w-full">
      {repoUrl && (
        LinkComponent ? (
          <LinkComponent 
            href={repoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={isOverlay 
              ? "text-sm text-white/80 hover:text-white transition-colors"
              : "text-sm text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            Code
          </LinkComponent>
        ) : (
          <a 
            href={repoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={isOverlay 
              ? "text-sm text-white/80 hover:text-white transition-colors"
              : "text-sm text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            Code
          </a>
        )
      )}
      {demoUrl && (
        <span className={isOverlay 
          ? "text-sm text-white/80 cursor-pointer group-hover:text-white transition-colors"
          : "text-sm text-muted-foreground cursor-pointer group-hover:text-foreground transition-colors"
        }>Demo</span>
      )}
    </div>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack = [],
  repoUrl,
  demoUrl,
  content,
  className,
  children,
  overlay = false,
  ImageComponent,
  LinkComponent,
}) => {
  // Showcase variant (image-top spotlight style)
  if (content?.displayVariant === 'showcase') {
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
            <div className="relative mb-4 rounded-lg overflow-hidden h-40">
              {ImageComponent ? (
                <ImageComponent
                  src={image}
                  alt={showTitle || 'Project image'}
                  fill="true"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top"
                  priority="true"
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
                    style={f.color ? { 
                      color: f.color === 'primary' ? 'var(--color-accent-9)' : `var(--${f.color}-9)` 
                    } : undefined}
                    {...(!f.color && { className: 'mr-2 text-yellow-400' })}
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
  }

  // overlay mode: children as background, text overlaid
  if (overlay) {
    const overlayContent = (
      <BaseCard 
        tabIndex={0} 
        className={cn('relative overflow-hidden h-full p-4 group', className)}
        ImageComponent={ImageComponent}
        LinkComponent={LinkComponent}
      >
        {/* background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
            {children}
          </div>
        </div>
        {/* overlay text */}
        <ProjectCardBody
          wrapperClassName="relative z-10 flex flex-col justify-end h-full p-4 rounded-[0.5rem] bg-black/10"
          h3ClassName="text-lg font-semibold mb-2 text-white"
          pClassName="text-sm text-white mb-4"
          title={title || content?.title}
          description={description || content?.description}
          techStack={techStack || content?.techStack}
          repoUrl={repoUrl || content?.repoUrl}
          demoUrl={demoUrl || content?.demoUrl}
          isOverlay={true}
          LinkComponent={LinkComponent}
        />
      </BaseCard>
    );
    
    return demoUrl ? (
      LinkComponent ? (
        <LinkComponent href={demoUrl} className="block h-full" tabIndex={-1} aria-label={title}>
          {overlayContent}
        </LinkComponent>
      ) : (
        <a href={demoUrl} className="block h-full" tabIndex={-1} aria-label={title}>
          {overlayContent}
        </a>
      )
    ) : overlayContent;
  }
  
  // standard cardContent
  const cardContent = (
    <BaseCard 
      tabIndex={0} 
      className={cn('h-full group cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none', className)}
      ImageComponent={ImageComponent}
      LinkComponent={LinkComponent}
    >
      <div className="flex flex-col grow h-full">
        {/* Preview/children area (flex-1, fills top) */}
        {children && (
          <div className="flex-1 flex items-center justify-center p-4 pb-0">
            {children}
          </div>
        )}
        {/* Text content area */}
        <ProjectCardBody
          wrapperClassName="flex flex-col p-6 pt-4 pb-6 mt-auto"
          h3ClassName="text-lg font-semibold mb-2 line-clamp-2 group-hover:underline"
          pClassName="text-sm text-muted-foreground mb-4 line-clamp-3 grow"
          title={title || content?.title}
          description={description || content?.description}
          techStack={techStack || content?.techStack}
          repoUrl={repoUrl || content?.repoUrl}
          demoUrl={demoUrl || content?.demoUrl}
          LinkComponent={LinkComponent}
        />
        {!!(content?.features?.length) && (
          <ul className="px-6 pb-4 -mt-2 space-y-2">
            {content.features.slice(0,4).map((f) => (
              <li key={f.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-muted-foreground/70" />
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </BaseCard>
  );

  // If demoUrl is set, wrap the card in a Link
  return demoUrl ? (
    LinkComponent ? (
      <LinkComponent href={demoUrl} className="block h-full" tabIndex={-1} aria-label={title}>
        {cardContent}
      </LinkComponent>
    ) : (
      <a href={demoUrl} className="block h-full" tabIndex={-1} aria-label={title}>
        {cardContent}
      </a>
    )
  ) : cardContent;
};

export { ProjectCard };
export type { ProjectCardProps };