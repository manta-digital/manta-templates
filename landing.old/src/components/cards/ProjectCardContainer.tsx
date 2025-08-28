import ProjectCard from './ProjectCard';
import ProjectFeatureCard from './ProjectFeatureCard';
import { getContentBySlug } from '@/lib/content';
import { Zap, Layers, type LucideIcon } from 'lucide-react';
import type { ProjectContent } from '@/types/content';

// Map icon names from frontmatter to actual Lucide icon components
const iconMap: { [key: string]: LucideIcon } = {
  Zap,
  Layers,
};

interface ProjectCardContainerProps {
  slug: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  mode?: 'dark' | 'light';
}

export default async function ProjectCardContainer({
  slug,
  className,
  children,
  overlay = false,
  mode = 'dark'
}: ProjectCardContainerProps) {
  try {
    const { frontmatter: content } = await getContentBySlug<ProjectContent>('projects', slug);

    // If displayMode is 'feature', render ProjectFeatureCard
    if (content.displayMode === 'feature') {
      const features = content.features?.map(f => {
        const IconComponent = iconMap[f.icon] || Zap; // Default icon
        return {
          icon: <IconComponent size={14} className={f.color} />,
          label: f.label
        };
      });

      return (
        <ProjectFeatureCard
          title={content.title}
          description={content.description || ''}
          techStack={content.techStack}
          repoUrl={content.repoUrl}
          demoUrl={content.demoUrl}
          features={features}
          mode={mode}
        />
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
