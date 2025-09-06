import * as z from 'zod';

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
    variant: z.enum(['primary', 'outline', 'secondary']).optional()
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
  author: z.string().optional(),
  publishDate: z.string().optional(),
  readTime: z.number().optional()
});

export const TechnologyContentSchema = z.object({
  type: z.literal('technology'),
  items: z.array(z.object({
    name: z.string(),
    svg: z.string(),
    color: z.string().optional(),
    colorDark: z.string().optional(),
    invertOnDark: z.boolean().optional()
  })),
  speed: z.enum(['slow', 'normal', 'fast']).optional(),
  direction: z.enum(['left', 'right']).optional()
});

export const AboutContentSchema = z.object({
  type: z.literal('about'),
  title: z.string(),
  description: z.string(),
  avatar: z.string().optional(),
  socials: z.array(z.object({
    platform: z.string(),
    url: z.string()
  })).optional()
});

// Export inferred types for perfect TypeScript DX
export type ProjectContent = z.infer<typeof ProjectContentSchema>;
export type QuoteContent = z.infer<typeof QuoteContentSchema>;
export type VideoContent = z.infer<typeof VideoContentSchema>;
export type ArticleContent = z.infer<typeof ArticleContentSchema>;
export type TechnologyContent = z.infer<typeof TechnologyContentSchema>;
export type AboutContent = z.infer<typeof AboutContentSchema>;