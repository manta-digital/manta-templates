import { getContentBySlug, getAllContent, ContentData, ContentMeta } from '../content';
import { ArticleSchema, ProjectSchema, QuoteSchema, Article, Project, Quote } from './schemas';

/**
 * Handles validation errors with development-friendly messages
 */
function handleValidationError(error: string, contentType: string, slug: string): never {
  const message = `Content validation failed for ${contentType}/${slug}: ${error}`;
  
  if (process.env.NODE_ENV === 'development') {
    console.error(message);
    console.error('This error will be silent in production');
  }
  
  throw new Error(message);
}

/**
 * Schema-specific loading functions
 */
export async function getArticleBySlug(slug: string): Promise<ContentData<Article>> {
  const content = await getContentBySlug<Record<string, unknown>>('articles', slug);
  const result = ArticleSchema.safeParse(content.frontmatter);
  
  if (!result.success) {
    handleValidationError(result.error.errors.map(e => e.message).join(', '), 'articles', slug);
  }
  
  return {
    ...content,
    frontmatter: result.data!
  };
}

export async function getProjectBySlug(slug: string): Promise<ContentData<Project>> {
  const content = await getContentBySlug<Record<string, unknown>>('projects', slug);
  const result = ProjectSchema.safeParse(content.frontmatter);
  
  if (!result.success) {
    handleValidationError(result.error.errors.map(e => e.message).join(', '), 'projects', slug);
  }
  
  return {
    ...content,
    frontmatter: result.data!
  };
}

export async function getQuoteBySlug(slug: string): Promise<ContentData<Quote>> {
  const content = await getContentBySlug<Record<string, unknown>>('quotes', slug);
  const result = QuoteSchema.safeParse(content.frontmatter);
  
  if (!result.success) {
    handleValidationError(result.error.errors.map(e => e.message).join(', '), 'quotes', slug);
  }
  
  return {
    ...content,
    frontmatter: result.data!
  };
}

export async function getExampleContentBySlug(slug: string): Promise<ContentData<Article | Project>> {
  const content = await getContentBySlug<Record<string, unknown>>('example-2', slug);
  
  // Try Article schema first
  const articleResult = ArticleSchema.safeParse(content.frontmatter);
  if (articleResult.success) {
    return {
      ...content,
      frontmatter: articleResult.data
    };
  }
  
  // Try Project schema
  const projectResult = ProjectSchema.safeParse(content.frontmatter);
  if (projectResult.success) {
    return {
      ...content,
      frontmatter: projectResult.data
    };
  }
  
  // If neither works, provide a helpful error
  const articleErrors = articleResult.error.errors.map(e => e.message).join(', ');
  const projectErrors = projectResult.error.errors.map(e => e.message).join(', ');
  throw new Error(`Content ${slug} in example-2 doesn't match Article or Project schema. Article validation: ${articleErrors}, Project validation: ${projectErrors}`);
}

/**
 * Get all content with validation - returns empty array on schema errors
 */
export function getAllArticles(): ContentMeta<Article>[] {
  const allContent = getAllContent<Record<string, unknown>>('articles');
  const validContent: ContentMeta<Article>[] = [];
  
  for (const item of allContent) {
    const result = ArticleSchema.safeParse(item.frontmatter);
    if (result.success) {
      validContent.push({
        ...item,
        frontmatter: result.data
      });
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(`Skipping invalid article ${item.slug}: ${result.error.errors.map(e => e.message).join(', ')}`);
    }
  }
  
  return validContent;
}

export function getAllProjects(): ContentMeta<Project>[] {
  const allContent = getAllContent<Record<string, unknown>>('projects');
  const validContent: ContentMeta<Project>[] = [];
  
  for (const item of allContent) {
    const result = ProjectSchema.safeParse(item.frontmatter);
    if (result.success) {
      validContent.push({
        ...item,
        frontmatter: result.data
      });
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(`Skipping invalid project ${item.slug}: ${result.error.errors.map(e => e.message).join(', ')}`);
    }
  }
  
  return validContent;
}

export function getAllQuotes(): ContentMeta<Quote>[] {
  const allContent = getAllContent<Record<string, unknown>>('quotes');
  const validContent: ContentMeta<Quote>[] = [];
  
  for (const item of allContent) {
    const result = QuoteSchema.safeParse(item.frontmatter);
    if (result.success) {
      validContent.push({
        ...item,
        frontmatter: result.data
      });
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(`Skipping invalid quote ${item.slug}: ${result.error.errors.map(e => e.message).join(', ')}`);
    }
  }
  
  return validContent;
}

export function getAllExampleContent(): ContentMeta<Article | Project>[] {
  const allContent = getAllContent<Record<string, unknown>>('example-2');
  const validContent: ContentMeta<Article | Project>[] = [];
  
  for (const item of allContent) {
    const articleResult = ArticleSchema.safeParse(item.frontmatter);
    if (articleResult.success) {
      validContent.push({
        ...item,
        frontmatter: articleResult.data
      });
      continue;
    }
    
    const projectResult = ProjectSchema.safeParse(item.frontmatter);
    if (projectResult.success) {
      validContent.push({
        ...item,
        frontmatter: projectResult.data
      });
      continue;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Skipping invalid example-2 content ${item.slug}: neither Article nor Project schema matched`);
    }
  }
  
  return validContent;
}