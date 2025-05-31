'use client';

import { getFeatureBySlug } from '@/lib/content-api.client';
import GuidesFeatureCard from './GuidesFeatureCard';
import ComingSoonFeatureCard from './ComingSoonFeatureCard';
import ProjectFeatureCard from './ProjectFeatureCard';

interface FeatureCardContainerProps {
  slug: string;
  mode?: 'dark' | 'light';
}

export default function FeatureCardContainer({ 
  slug, 
  mode = 'dark'
}: FeatureCardContainerProps) {
  const content = getFeatureBySlug(slug);
  if (!content) return null;
  
  // Render different feature card types based on category
  switch (content.category) {
    case 'guides':
      return <GuidesFeatureCard mode={mode} content={content} />;
    
    case 'coming-soon':
      return <ComingSoonFeatureCard mode={mode} content={content} />;
    
    case 'project':
      // For project features, we can use the existing ProjectFeatureCard
      const features = content.features?.map(f => ({
        icon: null, // Icons will be handled by the component
        label: f.label
      })) || [];
      
      return (
        <ProjectFeatureCard
          title={content.title}
          description={content.description || ''}
          techStack={content.techStack || []}
          repoUrl={content.repoUrl}
          demoUrl={content.demoUrl}
          features={features}
          mode={mode}
        />
      );
    
    default:
      return null;
  }
}
