import { getContentBySlug } from '@/lib/content';
import type { FeatureContent } from '@/types/content';
import GuidesFeatureCard from './GuidesFeatureCard';
import ComingSoonFeatureCard from './ComingSoonFeatureCard';
import ProjectFeatureCard from './ProjectFeatureCard';

interface FeatureCardContainerProps {
  slug: string;
  mode?: 'dark' | 'light';
}

export default async function FeatureCardContainer({
  slug,
  mode = 'dark'
}: FeatureCardContainerProps) {
  try {
    const { frontmatter: content } = await getContentBySlug<FeatureContent>('features', slug);

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
  } catch (error) {
    console.error(`Error loading feature content for slug "${slug}":`, error);
    return null; // Don't render anything if content fails to load
  }
}
