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

// Export inferred types for perfect TypeScript DX
export type ProjectContent = z.infer<typeof ProjectContentSchema>;
export type QuoteContent = z.infer<typeof QuoteContentSchema>;
export type VideoContent = z.infer<typeof VideoContentSchema>;