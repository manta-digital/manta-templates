import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BaseContentProvider } from '../../ui-core';
import { ContentNotFoundError, ContentLoadError } from '../../ui-core';
import type { ContentData, TokenProvider, TokenConfig } from '../../ui-core';
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
   * Additional content roots to search for files (searched in order)
   */
  additionalContentRoots?: string[];
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
export class NextjsContentProvider extends BaseContentProvider<unknown> {
  private contentRoot: string;
  private additionalContentRoots: string[];
  private enableCaching: boolean;
  private codeTheme: string;
  private processingCache = new Map<string, string>();
  private contentCache = new Map<string, ContentData<any>>();
  private tokenCache: Map<string, Record<string, string>> = new Map();

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
    this.additionalContentRoots = config.additionalContentRoots || [];
    this.enableCaching = config.enableCaching ?? true;
    this.codeTheme = config.codeTheme || 'github-dark';
  }

  /**
   * Load raw markdown content from filesystem with multi-location support
   */
  async loadRawContent(slug: string, contentType: string): Promise<string> {
    // Create list of all content roots to search (primary + additional)
    const contentRoots = [this.contentRoot, ...this.additionalContentRoots];
    
    // Try each content root in order
    for (const contentRoot of contentRoots) {
      const contentDir = path.join(contentRoot, contentType);
      const fullPath = path.join(contentDir, `${slug}.md`);

      try {
        if (fs.existsSync(fullPath)) {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          return fileContents;
        }
      } catch {
        // Continue to next content root
        continue;
      }
    }

    // If we get here, file wasn't found in any content root
    throw new ContentNotFoundError(`Content not found: ${contentType}/${slug} (searched ${contentRoots.length} locations)`);
  }

  /**
   * Load raw content for all items of a given type from all content roots
   */
  async loadAllRawContent(contentType: string): Promise<{ slug: string; content: string }[]> {
    const contentRoots = [this.contentRoot, ...this.additionalContentRoots];
    const results: { slug: string; content: string }[] = [];
    const processedSlugs = new Set<string>(); // Avoid duplicates
    
    try {
      // Search through all content roots
      for (const contentRoot of contentRoots) {
        const contentDir = path.join(contentRoot, contentType);
        
        if (!fs.existsSync(contentDir)) {
          continue; // Skip non-existent directories
        }

        const fileNames = fs.readdirSync(contentDir);

        for (const fileName of fileNames) {
          if (!fileName.endsWith('.md')) {
            continue;
          }

          const slug = fileName.replace(/\.md$/, '');
          
          // Skip if we've already processed this slug (first match wins)
          if (processedSlugs.has(slug)) {
            continue;
          }
          
          const fullPath = path.join(contentDir, fileName);
          
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            results.push({ slug, content });
            processedSlugs.add(slug);
          } catch (error) {
            console.warn(`Failed to read content file ${fullPath}:`, error);
            // Continue processing other files
          }
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
   * Override content loading to use Next.js optimized markdown processing with optional token interpolation
   * 
   * @param slug - The content identifier
   * @param contentType - The type/category of content
   * @param options - Loading options including token configuration
   * @param options.tokenConfig - Token interpolation configuration
   * @returns Promise resolving to processed content data
   * 
   * @example
   * // Load content without tokens
   * const content = await provider.loadContent('my-post', 'articles');
   * 
   * // Load content with token interpolation
   * const content = await provider.loadContent('legal', 'legal', {
   *   tokenConfig: {
   *     enableTokens: true,
   *     tokenProvider: new NextjsTokenProvider(siteConfig)
   *   }
   * });
   */
  async loadContent<T = unknown>(
    slug: string, 
    contentType: string,
    options?: { tokenConfig?: TokenConfig }
  ): Promise<ContentData<T>> {
    const cacheKey = `${contentType}:${slug}`;
    
    // Check cache first if enabled
    if (this.enableCaching && this.contentCache.has(cacheKey)) {
      return this.contentCache.get(cacheKey)! as ContentData<T>;
    }

    try {
      const rawContent = await this.loadRawContent(slug, contentType);
      const { data: frontmatter, content } = matter(rawContent);

      // Apply token interpolation to content before markdown processing if requested
      let processedContent = content;
      let tokens: Record<string, string> | undefined;
      
      if (options?.tokenConfig?.enableTokens === true) {
        const tokenData = await this.getTokensForInterpolation(options.tokenConfig.tokenProvider);
        
        if (tokenData && Object.keys(tokenData).length > 0) {
          processedContent = this.applyTokens(content, tokenData);
          tokens = tokenData;
        }
      }

      // Use Next.js optimized markdown processing with potentially tokenized content
      const contentHtml = await this.processMarkdownContent(processedContent);

      const result: ContentData<T> = {
        slug,
        frontmatter: frontmatter as T,
        contentHtml,
        rawContent
      };

      // Add tokens to result if interpolation was applied
      if (tokens) {
        result.tokens = tokens;
      }

      // Cache the result
      if (this.enableCaching) {
        this.contentCache.set(cacheKey, result as ContentData<any>);
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
   * Apply token interpolation to content using the same logic as presetContent.ts
   * 
   * @param content - The content string to process
   * @param tokens - Record of token names to replacement values
   * @returns Content with tokens replaced
   */
  private applyTokens(content: string, tokens: Record<string, string>): string {
    try {
      let processedContent = content;
      
      for (const [key, value] of Object.entries(tokens)) {
        if (value === null || value === undefined) {
          console.warn(`Token '${key}' has null/undefined value, skipping replacement`);
          continue;
        }
        
        // Escape special regex characters in the key (same logic as presetContent.ts)
        const escapedKey = key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        // Create regex pattern for {{key}} format
        const tokenRegex = new RegExp(`\\{\\{${escapedKey}\\}\\}`, 'g');
        processedContent = processedContent.replace(tokenRegex, String(value));
      }
      
      return processedContent;
    } catch (error) {
      console.warn('Error applying tokens to content:', error);
      return content; // Return original content on error
    }
  }

  /**
   * Generate cache key for token provider
   */
  private generateTokenCacheKey(tokenProvider?: TokenProvider): string {
    // Simple cache key strategy - could be enhanced with provider-specific hashing
    return tokenProvider ? 'custom-provider' : 'no-provider';
  }

  /**
   * Get cached tokens for a given provider
   */
  private getCachedTokens(tokenProvider?: TokenProvider): Record<string, string> | null {
    if (!this.enableCaching) return null;
    const cacheKey = this.generateTokenCacheKey(tokenProvider);
    return this.tokenCache.get(cacheKey) || null;
  }

  /**
   * Set cached tokens for a given provider
   */
  private setCachedTokens(tokens: Record<string, string>, tokenProvider?: TokenProvider): void {
    if (!this.enableCaching) return;
    const cacheKey = this.generateTokenCacheKey(tokenProvider);
    this.tokenCache.set(cacheKey, tokens);
  }

  /**
   * Get tokens for interpolation with caching and error handling
   */
  private async getTokensForInterpolation(tokenProvider?: TokenProvider): Promise<Record<string, string> | null> {
    try {
      // Check cache first
      const cachedTokens = this.getCachedTokens(tokenProvider);
      if (cachedTokens) {
        return cachedTokens;
      }
      
      // Build tokens using provided provider
      if (tokenProvider) {
        const tokens = tokenProvider.buildTokens();
        this.setCachedTokens(tokens, tokenProvider);
        return tokens;
      } else {
        console.warn('Token interpolation requested but no tokenProvider provided');
        return null;
      }
    } catch (error) {
      console.warn('Error building tokens for interpolation:', error);
      return null;
    }
  }

  /**
   * Clear token cache
   */
  public clearTokenCache(): void {
    this.tokenCache.clear();
  }

  /**
   * Clear all caches (both content and processing)
   */
  clearCache(): void {
    super.clearCache();
    this.contentCache.clear();
    this.processingCache.clear();
    this.tokenCache.clear();
  }

  /**
   * Get cache statistics for monitoring and debugging
   */
  getCacheStats() {
    return {
      contentCacheSize: this.contentCache.size,
      processingCacheSize: this.processingCache.size,
      tokenCacheSize: this.tokenCache.size,
      cachingEnabled: this.enableCaching
    };
  }
}

// Export singleton instance
export const nextjsContentProvider = new NextjsContentProvider();