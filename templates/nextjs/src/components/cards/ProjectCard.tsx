import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BaseCard } from './BaseCard';
import type { ProjectContent } from '@/types/content';

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
}) => (
  <div className={wrapperClassName}>
    <h3 className={h3ClassName}>{title || 'Untitled Project'}</h3>
    {description && <p className={pClassName}>{description}</p>}
    <div className="flex flex-wrap gap-2 mb-4">
      {techStack.map((tech) => (
        <span key={tech} className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs font-medium">
          {tech}
        </span>
      ))}
    </div>
    <div className="mt-auto flex justify-end gap-3 pt-2 w-full">
      {repoUrl && (
        <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Code
        </Link>
      )}
      {demoUrl && (
        <span className="text-sm text-muted-foreground cursor-pointer group-hover:text-foreground transition-colors">Demo</span>
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
}) => {
  // overlay mode: children as background, text overlaid
  if (overlay) {
    const overlayContent = (
      <BaseCard tabIndex={0} className={cn('relative overflow-hidden h-full p-4', className)}>
        {/* background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {children}
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
        />
      </BaseCard>
    );
    return demoUrl ? <Link href={demoUrl} className="block h-full" tabIndex={-1} aria-label={title}>{overlayContent}</Link> : overlayContent;
  }
  // standard cardContent
  const cardContent = (
    <BaseCard tabIndex={0} className={cn('h-full group cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none', className)}>
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
        />
      </div>
          </BaseCard>
  );

  // If demoUrl is set, wrap the card in a Link
  return demoUrl ? <Link href={demoUrl} className="block h-full" tabIndex={-1} aria-label={title}>{cardContent}</Link> : cardContent;
};

export default ProjectCard;
