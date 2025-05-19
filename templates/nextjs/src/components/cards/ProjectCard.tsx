import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import BaseCard from './BaseCard';
// Consider adding icons later (e.g., from lucide-react)
// import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack = [],
  repoUrl,
  demoUrl,
  className,
}) => {
  const cardContent = (
    <BaseCard tabIndex={0} className={cn('h-full group cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none', className)}>
      <div className="flex flex-col grow p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:underline">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 grow">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex justify-end gap-3 pt-2">
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
    </BaseCard>
  );

  // If demoUrl is set, wrap the card in a Link
  return demoUrl ? (
    <Link href={demoUrl} className="block h-full" tabIndex={-1} aria-label={title}>
      {cardContent}
    </Link>
  ) : cardContent;
};

export default ProjectCard;
