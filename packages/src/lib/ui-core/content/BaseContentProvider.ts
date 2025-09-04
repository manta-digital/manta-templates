import { ContentProvider, ContentData, ContentMeta, ContentLoadError, ContentNotFoundError, TokenConfig } from './types';
import { ContentProcessor, ProcessorConfig } from './processor';

/**
 * Abstract Base Content Provider
 * 
 * Provides common functionality for content providers including:
 * - Shared content processing pipeline
 * - Caching layer for improved performance
 * - Error handling and validation
 * - Retry logic for resilience
 * 
 * Framework-specific implementations should extend this class
 * and implement the abstract methods for raw content loading.
 */
export abstract class BaseContentProvider<T = unknown> implements ContentProvider<T> {
  protected processor: ContentProcessor;
  private cache: Map<string, ContentData<T>> = new Map();
  private retryAttempts = 3;
  private retryDelay = 1000; // Base delay in milliseconds

  constructor(processorConfig?: ProcessorConfig) {
    this.processor = new ContentProcessor(processorConfig);
  }

  /**
   * Load raw content from the underlying storage system.
   * This method must be implemented by framework-specific adapters.
   * 
   * @param slug - The content identifier
   * @param contentType - The type/category of content
   * @returns Promise resolving to raw markdown content
   * @throws ContentLoadError - When content cannot be accessed
   * @throws ContentNotFoundError - When content doesn't exist
   */
  abstract loadRawContent(slug: string, contentType: string): Promise<string>;

  /**
   * Load raw content metadata for all items of a given type.
   * This method must be implemented by framework-specific adapters.
   * 
   * @param contentType - The type/category of content to list
   * @returns Promise resolving to array of raw content with slugs
   * @throws ContentLoadError - When content listing fails
   */
  abstract loadAllRawContent(contentType: string): Promise<{ slug: string; content: string }[]>;

  /**
   * Load and process a single piece of content with caching and optional token interpolation
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
   * const content = await provider.loadContent('my-post', 'articles', {
   *   tokenConfig: { 
   *     enableTokens: true, 
   *     tokenProvider: myTokenProvider 
   *   }
   * });
   */
  async loadContent(slug: string, contentType: string, options?: { tokenConfig?: TokenConfig }): Promise<ContentData<T>> {
    const cacheKey = `${contentType}:${slug}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Load and process content with retry logic
    const rawContent = await this.loadRawContentWithRetry(slug, contentType);
    const { frontmatter, content } = this.processor.parseFrontmatter(rawContent);
    const contentHtml = await this.processor.processMarkdown(content);

    const result: ContentData<T> = {
      slug,
      frontmatter: frontmatter as T,
      contentHtml,
      rawContent
    };

    // Validate content before caching
    this.validateContent(result);

    // Cache the result
    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Load and process metadata for all content of a given type
   * 
   * @param contentType - The type/category of content to list
   * @returns Promise resolving to array of content metadata
   */
  async loadAllContent(contentType: string): Promise<ContentMeta<T>[]> {
    const rawContentArray = await this.loadAllRawContentWithRetry(contentType);
    const results: ContentMeta<T>[] = [];

    for (const { slug, content } of rawContentArray) {
      try {
        const { frontmatter } = this.processor.parseFrontmatter(content);
        results.push({
          slug,
          frontmatter: frontmatter as T
        });
      } catch (error) {
        // Log warning but continue processing other items
        console.warn(`Failed to process content metadata for ${contentType}:${slug}:`, error);
      }
    }

    return results;
  }

  /**
   * Clear the content cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Validate content data structure and required fields
   * 
   * @param data - Content data to validate
   * @param requiredFields - Array of required frontmatter field names
   * @throws ContentLoadError - When validation fails
   */
  protected validateContent(data: ContentData<T>, requiredFields: string[] = []): void {
    if (!data.slug) {
      throw new ContentLoadError('Content missing required slug');
    }
    
    if (!data.frontmatter) {
      throw new ContentLoadError('Content missing frontmatter');
    }

    // Check required frontmatter fields
    for (const field of requiredFields) {
      if (!(field in (data.frontmatter as any))) {
        throw new ContentLoadError(`Content missing required field: ${field}`);
      }
    }
  }

  /**
   * Load raw content with retry logic and exponential backoff
   */
  private async loadRawContentWithRetry(slug: string, contentType: string): Promise<string> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await this.loadRawContent(slug, contentType);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // Don't retry for ContentNotFoundError
        if (error instanceof ContentNotFoundError) {
          throw error;
        }

        // If this was the last attempt, throw the error
        if (attempt === this.retryAttempts) {
          break;
        }

        // Wait before retrying (exponential backoff)
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Convert to ContentLoadError if it isn't already
    if (lastError instanceof ContentLoadError || lastError instanceof ContentNotFoundError) {
      throw lastError;
    } else {
      throw new ContentLoadError(
        `Failed to load content after ${this.retryAttempts} attempts: ${lastError?.message}`,
        lastError || undefined
      );
    }
  }

  /**
   * Load all raw content with retry logic
   */
  private async loadAllRawContentWithRetry(contentType: string): Promise<{ slug: string; content: string }[]> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await this.loadAllRawContent(contentType);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');

        // If this was the last attempt, throw the error
        if (attempt === this.retryAttempts) {
          break;
        }

        // Wait before retrying (exponential backoff)
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Convert to ContentLoadError if it isn't already
    if (lastError instanceof ContentLoadError) {
      throw lastError;
    } else {
      throw new ContentLoadError(
        `Failed to load content list after ${this.retryAttempts} attempts: ${lastError?.message}`,
        lastError || undefined
      );
    }
  }
}