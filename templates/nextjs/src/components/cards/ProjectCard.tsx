import React from 'react';
import Link from 'next/link';
import { cn } from '@manta/ui';
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
  techStack = [], // Default to empty array
  repoUrl,
  demoUrl,
  className,
}) => {
  return (
    <BaseCard className={cn('h-full', className)}> {/* Ensure card fills GridItem height */}
      <div className="flex flex-col grow p-4"> {/* Content wrapper */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 grow">
          {description}
        </p>

        {/* Tech Stack Chips */}
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

        {/* Links */}
        <div className="mt-auto flex justify-end gap-3 pt-2"> {/* Push links to bottom */}
          {repoUrl && (
            <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {/* <Github className="h-4 w-4 mr-1 inline" /> */}
              Code
            </Link>
          )}
          {demoUrl && (
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {/* <ExternalLink className="h-4 w-4 mr-1 inline" /> */}
              Demo
            </Link>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

export default ProjectCard;
