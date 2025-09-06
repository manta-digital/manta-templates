import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import * as z from 'zod';

export interface ContentEngine {
  loadContent<T = Record<string, any>>(slug: string): Promise<ContentResult<T>>;
  loadContentCollection<T = Record<string, any>>(filters?: ContentFilters): Promise<ContentResult<T>[]>;
  renderMarkdown(content: string, options?: RenderOptions): Promise<string>;
  validateContent<S extends z.ZodTypeAny>(content: unknown, schema: S): ValidationResult<S>;
}

export interface ContentFilters {
  type?: string;
  tags?: string[];
  category?: string;
}

export type ValidationResult<S extends z.ZodTypeAny> = 
  | { success: true; data: z.infer<S> }
  | { success: false; issues: z.ZodIssue[] };

export interface ContentResult<T> {
  frontmatter: T;
  contentHtml: string;
  excerpt?: string;
  slug: string;
  lastModified: Date;
  meta: {
    readingTime: number;
    wordCount: number;
    headings: Array<{ depth: number; text: string; id: string }>;
  };
}

export interface RenderOptions {
  sanitize?: boolean;
  allowHtml?: boolean;
  generateHeadingIds?: boolean;
  externalLinkTarget?: '_blank' | '_self';
}

// Universal content processing with security (framework-agnostic)
export const processMarkdownContent = async (
  rawContent: string, 
  slug: string,
  options: RenderOptions = { sanitize: true }
): Promise<ContentResult<any>> => {
  const { data: frontmatter, content, excerpt } = matter(rawContent, { excerpt: true });
  
  // Collect headings during processing
  const headings: Array<{ depth: number; text: string; id: string }> = [];
  
  // Build proper remark → rehype pipeline with bridges
  let processor: any = remark()
    .use(remarkGfm)
    .use(remarkRehype, { 
      allowDangerousHtml: options.allowHtml || false 
    });
  
  // Add rehype plugins (now properly bridged)
  if (options.allowHtml) {
    processor = processor.use(rehypeRaw); // Parse raw HTML before sanitizing
  }
  
  if (options.sanitize) {
    processor = processor.use(rehypeSanitize);
  }
  
  if (options.generateHeadingIds) {
    processor = processor.use(rehypeSlug);
    processor = processor.use(rehypeAutolinkHeadings);
  }
  
  // Collect headings metadata
  processor = processor.use(() => (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        const depth = Number(node.tagName[1]);
        const id = node.properties?.id ?? '';
        const text = (node.children || [])
          .filter((c: any) => c.type === 'text')
          .map((c: any) => c.value)
          .join('');
        headings.push({ depth, text, id });
      }
    });
  });
  
  // External link handling
  if (options.externalLinkTarget) {
    processor = processor.use(rehypeExternalLinks, {
      target: options.externalLinkTarget,
      rel: options.externalLinkTarget === '_blank' ? ['noopener', 'noreferrer'] : undefined
    });
  }
  
  processor = processor.use(rehypeStringify);
  
  const processed = await processor.process(content);
  
  // Calculate metadata
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 WPM average
  
  return {
    frontmatter,
    contentHtml: processed.toString(),
    excerpt: excerpt || undefined,
    slug,
    lastModified: new Date(), // Will be overridden by providers with real mtime
    meta: {
      readingTime,
      wordCount,
      headings
    }
  };
};