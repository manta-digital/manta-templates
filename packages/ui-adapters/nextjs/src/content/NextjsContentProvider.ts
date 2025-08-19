import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BaseContentProvider } from '@manta-templates/ui-core';
import { ContentNotFoundError, ContentLoadError } from '@manta-templates/ui-core';
import type { ContentData } from '@manta-templates/ui-core';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

interface NextjsContentProviderConfig {
  /**
   * Root directory for content files. Defaults to 'src/content'
   */
  contentRoot?: string;
  /**
   * Enable server-side caching for improved performance
   */
  enableCaching?: boolean;
  /**
   * Pretty code theme for syntax highlighting
   */
  codeTheme?: string;
}

/**
 * Next.js Content Provider
 * 
 * Implements content loading for Next.js applications using the existing
 * filesystem-based content system. Maintains full compatibility with
 * the existing getContentBySlug() and getAllContent() patterns while
 * integrating with the ui-core content provider interface.
 */
export class NextjsContentProvider<T = unknown> extends BaseContentProvider<T> {
  private contentRoot: string;
  private enableCaching: boolean;
  private codeTheme: string;
  private processingCache = new Map<string, string>();
  private contentCache = new Map<string, ContentData<T>>();

  // Custom schema for rehype-sanitize to allow styles from rehype-pretty-code
  private static readonly customSanitizeSchema: typeof defaultSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      pre: [
        ...(defaultSchema.attributes?.pre || []),
        'style',
        'tabindex',
        ['dataLanguage', 'data-language'],
        ['dataTheme', 'data-theme'],
      ],
      code: [
        ...(defaultSchema.attributes?.code || []),
        'style',
        ['dataLanguage', 'data-language'],
        ['dataTheme', 'data-theme'],
      ],
      span: [
        ...(defaultSchema.attributes?.span || []),
        'style',
        ['dataLine', 'data-line'],
      ],
      figure: [
        ...(defaultSchema.attributes?.figure || []),
        ['dataRehypePrettyCodeFigure', 'data-rehype-pretty-code-figure'],
      ],
    },
    tagNames: [...(defaultSchema.tagNames || []), 'figure'],
  };

  constructor(config: NextjsContentProviderConfig = {}) {
    super();
    this.contentRoot = config.contentRoot || path.join(process.cwd(), 'src', 'content');
    this.enableCaching = config.enableCaching ?? true;
    this.codeTheme = config.codeTheme || 'github-dark';
  }

  /**
   * Load raw markdown content from filesystem
   */
  async loadRawContent(slug: string, contentType: string): Promise<string> {
    const contentDir = path.join(this.contentRoot, contentType);
    const fullPath = path.join(contentDir, `${slug}.md`);

    try {
      if (!fs.existsSync(fullPath)) {
        throw new ContentNotFoundError(`Content not found: ${contentType}/${slug}`);
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return fileContents;
    } catch (error) {
      if (error instanceof ContentNotFoundError) {
        throw error;
      }
      throw new ContentLoadError(
        `Failed to load content ${contentType}/${slug}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Load raw content for all items of a given type
   */
  async loadAllRawContent(contentType: string): Promise<{ slug: string; content: string }[]> {
    const contentDir = path.join(this.contentRoot, contentType);
    
    try {
      if (!fs.existsSync(contentDir)) {
        console.warn(`Content directory not found: ${contentDir}`);
        return [];
      }

      const fileNames = fs.readdirSync(contentDir);
      const results: { slug: string; content: string }[] = [];

      for (const fileName of fileNames) {
        if (!fileName.endsWith('.md')) {
          continue;
        }

        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(contentDir, fileName);
        
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          results.push({ slug, content });
        } catch (error) {
          console.warn(`Failed to read content file ${fullPath}:`, error);
          // Continue processing other files
        }
      }

      return results;
    } catch (error) {
      throw new ContentLoadError(
        `Failed to load content directory ${contentType}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Override content loading to use Next.js optimized markdown processing
   */
  async loadContent(slug: string, contentType: string): Promise<ContentData<T>> {
    const cacheKey = `${contentType}:${slug}`;
    
    // Check cache first if enabled
    if (this.enableCaching && this.contentCache.has(cacheKey)) {
      return this.contentCache.get(cacheKey)!;
    }

    try {
      const rawContent = await this.loadRawContent(slug, contentType);
      const { data: frontmatter, content } = matter(rawContent);

      // Use Next.js optimized markdown processing
      const contentHtml = await this.processMarkdownContent(content);

      const result = {
        slug,
        frontmatter: frontmatter as T,
        contentHtml,
        rawContent
      };

      // Cache the result
      if (this.enableCaching) {
        this.contentCache.set(cacheKey, result);
      }

      return result;
    } catch (error) {
      if (error instanceof ContentNotFoundError || error instanceof ContentLoadError) {
        throw error;
      }
      throw new ContentLoadError(
        `Failed to process content ${contentType}/${slug}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Process markdown content using the same pipeline as the existing Next.js system
   */
  private async processMarkdownContent(content: string): Promise<string> {
    const cacheKey = this.createContentHash(content);
    
    if (this.enableCaching && this.processingCache.has(cacheKey)) {
      return this.processingCache.get(cacheKey)!;
    }

    try {
      const processedContent = await remark()
        .use(gfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypePrettyCode, { 
          theme: this.codeTheme
        } as any)
        .use(rehypeSanitize, NextjsContentProvider.customSanitizeSchema)
        .use(rehypeStringify)
        .process(content);

      const result = processedContent.toString();
      
      if (this.enableCaching) {
        this.processingCache.set(cacheKey, result);
      }

      return result;
    } catch (error) {
      throw new ContentLoadError(
        `Failed to process markdown content: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Create a simple hash for content caching
   */
  private createContentHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  /**
   * Clear all caches (both content and processing)
   */
  clearCache(): void {
    super.clearCache();
    this.contentCache.clear();
    this.processingCache.clear();
  }

  /**
   * Get cache statistics for monitoring and debugging
   */
  getCacheStats() {
    return {
      contentCacheSize: this.contentCache.size,
      processingCacheSize: this.processingCache.size,
      cachingEnabled: this.enableCaching
    };
  }
}