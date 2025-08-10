import ProjectCard from './ProjectCard';
// ProjectFeatureCard merged into ProjectCard
import { getContentBySlug } from '@/lib/content';
import { Zap, Layers, type LucideIcon } from 'lucide-react';
import type { ProjectContent } from '@/types/content';

// Map icon names from frontmatter to actual Lucide icon components
// Reserved for future mapping of feature icons from frontmatter if needed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const iconMap: { [key: string]: LucideIcon } = { Zap, Layers };

interface ProjectCardContainerProps {
  slug: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
}

export default async function ProjectCardContainer({
  slug,
  className,
  children,
  overlay = false,
}: ProjectCardContainerProps) {
  try {
    const { frontmatter: content } = await getContentBySlug<ProjectContent>('projects', slug);

    // If displayVariant is 'showcase', render showcase via ProjectCard
    if (content.displayVariant === 'showcase') {

      return (
        <ProjectCard
          content={{ ...content, displayVariant: 'showcase' }}
          className={className}
        >
          {children}
        </ProjectCard>
      );
    }

    // Default to standard ProjectCard
    return (
      <ProjectCard
        content={content}
        className={className}
        overlay={overlay}
      >
        {children}
      </ProjectCard>
    );
  } catch (error) {
    console.error(`Error loading project content for slug "${slug}":`, error);
    return null; // Don't render anything if content fails to load
  }
}
