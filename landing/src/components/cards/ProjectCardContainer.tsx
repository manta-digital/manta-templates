import ProjectCard from './ProjectCard';
import ProjectFeatureCard from './ProjectFeatureCard';
import { getProjectBySlug } from '@/lib/content-api.client';
import { Zap, Layers } from 'lucide-react';

interface ProjectCardContainerProps {
  slug: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  mode?: 'dark' | 'light';
}

export default function ProjectCardContainer({ 
  slug, 
  className,
  children,
  overlay = false,
  mode = 'dark'
}: ProjectCardContainerProps) {
  const content = getProjectBySlug(slug);
  if (!content) return null;
  
  // If displayMode is 'feature', render ProjectFeatureCard
  if (content.displayMode === 'feature') {
    const features = content.features?.map(f => ({
      icon: <Zap size={14} className={mode === 'light' ? 'mr-2 text-yellow-600' : 'mr-2 text-yellow-400'} />,
      label: f.label
    })) || [
      { icon: <Zap size={14} className={mode === 'light' ? 'mr-2 text-yellow-600' : 'mr-2 text-yellow-400'} />, label: 'Fast & modern React framework' },
      { icon: <Layers size={14} className={mode === 'light' ? 'mr-2 text-emerald-600' : 'mr-2 text-emerald-400'} />, label: 'Production-ready components' },
    ];

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
}
