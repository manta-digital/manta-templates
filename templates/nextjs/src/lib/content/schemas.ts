import { z } from 'zod';

/**
 * Schema for article content type (blog posts, articles, etc.)
 * Supports both legacy field names and new standardized names
 */
export const ArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  // Support both description (legacy) and excerpt (new)
  description: z.string().min(1, 'Description is required').optional(),
  excerpt: z.string().min(1, 'Excerpt is required').optional(),
  // Support both pubDate (legacy) and publishedAt (new)
  pubDate: z.string().optional(),
  publishedAt: z.string().optional(),
  // Support multiple image field names
  image: z.string().optional(),
  thumbnail: z.string().optional(), 
  coverImage: z.string().optional(),
  // Author field (essential for articles)
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  contentType: z.string().optional(),
  cardSize: z.string().optional()
}).refine(
  (data) => data.description || data.excerpt,
  { message: "Either description or excerpt is required" }
).refine(
  (data) => data.pubDate || data.publishedAt, 
  { message: "Either pubDate or publishedAt is required" }
).refine(
  (data) => data.image || data.thumbnail || data.coverImage,
  { message: "At least one image field (image, thumbnail, or coverImage) is required" }
);

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