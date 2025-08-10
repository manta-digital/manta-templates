import { getContentBySlug } from '@/lib/content';
import type { ProjectContent } from '@/types/content';
import ProjectCard from '../ProjectCard';

interface Props {
  slug: string;
  className?: string;
  overlay?: boolean;
  children?: React.ReactNode;
}

export default async function ProjectCardContentLoader({ slug, className, overlay, children }: Props) {
  const { frontmatter } = await getContentBySlug<ProjectContent>('projects', slug);
  return (
    <ProjectCard content={frontmatter} className={className} overlay={overlay}>
      {children}
    </ProjectCard>
  );
}


