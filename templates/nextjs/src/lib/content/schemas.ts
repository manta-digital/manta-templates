import { z } from 'zod';

/**
 * Schema for article content type (blog posts, articles, etc.)
 */
export const ArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  coverImage: z.string().min(1, 'Cover image is required'),
  publishedAt: z.string().transform(str => new Date(str)),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional()
});

/**
 * Schema for project content type
 */
export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  techStack: z.array(z.string()).min(1, 'At least one technology required'),
  image: z.string().min(1, 'Image is required'),
  repoUrl: z.string().url('Repository URL must be valid'),
  features: z.array(z.object({
    label: z.string().min(1, 'Feature label is required'),
    icon: z.string().min(1, 'Icon is required'),
    color: z.string().optional()
  })).optional()
});

/**
 * Schema for quote content type
 */
export const QuoteSchema = z.object({
  quote: z.string().min(1, 'Quote text is required'),
  author: z.string().min(1, 'Author is required'),
  context: z.string().optional()
});

/**
 * TypeScript types inferred from schemas
 */
export type Article = z.infer<typeof ArticleSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Quote = z.infer<typeof QuoteSchema>;

/**
 * Utility function for validating content against schemas
 */
export function validateContent<T>(
  content: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(content);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error.errors.map(e => e.message).join(', ') };
  }
}