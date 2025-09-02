import { z } from 'zod';

export const ProjectContentSchema = z.object({
  type: z.literal('project'),
  title: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  image: z.string(),
  repoUrl: z.string().url(),
  liveUrl: z.string().url().optional(),
  features: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    color: z.string().optional()
  })),
  actions: z.array(z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(['default', 'outline', 'secondary']).optional()
  }))
});

export const QuoteContentSchema = z.object({
  type: z.literal('quote'),
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().optional(),
  theme: z.enum(['default', 'minimal', 'emphasis']).optional()
});

export const VideoContentSchema = z.object({
  type: z.literal('video'),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  videoUrl: z.string().url(),
  displayMode: z.enum(['thumbnail', 'background', 'player']),
  autoplay: z.boolean().optional(),
  loop: z.boolean().optional()
});

export const ArticleContentSchema = z.object({
  type: z.literal('article'),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  image: z.string(),
  href: z.string(),
  category: z.string().optional(),
  excerpt: z.string().optional(),
  coverImageUrl: z.string().optional(),
  slug: z.string().optional()
});

export const TechnologyItemSchema = z.object({
  name: z.string(),
  svg: z.string(),
  color: z.string().optional(),
  colorDark: z.string().optional(),
  invertOnDark: z.boolean().optional()
});

export const TechnologyContentSchema = z.object({
  type: z.literal('technology'),
  title: z.string(),
  description: z.string(),
  items: z.array(TechnologyItemSchema),
  speed: z.enum(['slow', 'normal', 'fast']).optional(),
  direction: z.enum(['left', 'right']).optional()
});

// Export inferred types for perfect TypeScript DX
export type ProjectContent = z.infer<typeof ProjectContentSchema>;
export type QuoteContent = z.infer<typeof QuoteContentSchema>;
export type VideoContent = z.infer<typeof VideoContentSchema>;
export type ArticleContent = z.infer<typeof ArticleContentSchema>;
export type TechnologyItem = z.infer<typeof TechnologyItemSchema>;
export type TechnologyContent = z.infer<typeof TechnologyContentSchema>;