/**
 * Content Provider Interface
 * 
 * Defines the contract for content providers that can load and manage content
 * from various sources (filesystem, CMS, etc.). Uses dependency injection pattern
 * to allow framework-specific implementations while maintaining ui-core's
 * framework-agnostic nature.
 */
export interface ContentProvider<T = unknown> {
  /**
   * Load a single piece of content by slug and content type.
   * 
   * @param slug - The unique identifier for the content
   * @param contentType - The type/category of content (e.g., 'articles', 'projects')
   * @returns Promise resolving to the processed content data
   * @throws ContentLoadError - When content cannot be loaded
   * @throws ContentNotFoundError - When content with given slug doesn't exist
   */
  loadContent(slug: string, contentType: string): Promise<ContentData<T>>;

  /**
   * Load metadata for all content items of a given type.
   * 
   * @param contentType - The type/category of content to list
   * @returns Promise resolving to array of content metadata
   * @throws ContentLoadError - When content listing fails
   */
  loadAllContent(contentType: string): Promise<ContentMeta<T>[]>;
}

/**
 * Content Data Structure
 * 
 * Represents a fully processed piece of content including frontmatter,
 * processed HTML, and optional raw content for further processing.
 */
export interface ContentData<T> {
  /** Unique identifier for the content */
  slug: string;
  /** Parsed frontmatter data with type safety */
  frontmatter: T;
  /** Processed HTML content ready for display */
  contentHtml?: string;
  /** Raw markdown content for further processing */
  rawContent?: string;
  /** Token interpolation results */
  tokens?: Record<string, string>;
}

/**
 * Content Metadata Structure
 * 
 * Lightweight representation of content for listing and navigation.
 * Contains only the essential information without the heavy content body.
 */
export interface ContentMeta<T> {
  /** Unique identifier for the content */
  slug: string;
  /** Parsed frontmatter data with type safety */
  frontmatter: T;
}

/**
 * Content Error Interface
 * 
 * Base interface for content-related errors with structured error information.
 */
export interface ContentError {
  /** Error code for programmatic handling */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Optional underlying cause error */
  cause?: Error;
}

/**
 * Content Load Error
 * 
 * Thrown when content cannot be loaded due to access issues, network problems,
 * or other loading failures that don't indicate the content doesn't exist.
 */
export class ContentLoadError extends Error implements ContentError {
  code = 'CONTENT_LOAD_ERROR';
  cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = 'ContentLoadError';
    this.cause = cause;
  }
}

/**
 * Content Process Error
 * 
 * Thrown when content is loaded successfully but cannot be processed
 * due to malformed markdown, invalid frontmatter, or processing pipeline failures.
 */
export class ContentProcessError extends Error implements ContentError {
  code = 'CONTENT_PROCESS_ERROR';
  cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = 'ContentProcessError';
    this.cause = cause;
  }
}

/**
 * Content Not Found Error
 * 
 * Thrown when the requested content does not exist at the specified location.
 * This is distinct from ContentLoadError which indicates access/loading issues.
 */
export class ContentNotFoundError extends Error implements ContentError {
  code = 'CONTENT_NOT_FOUND';
  cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = 'ContentNotFoundError';
    this.cause = cause;
  }
}

/**
 * Token Provider Interface
 * 
 * Provider interface for building token replacements for content interpolation.
 * Allows framework-specific implementations to provide site-specific tokens.
 */
export interface TokenProvider {
  /**
   * Build tokens for content interpolation
   * @returns Record of token names to replacement values
   */
  buildTokens(): Record<string, string>;
}

/**
 * Token Configuration
 * 
 * Configuration for token interpolation in content loading.
 */
export interface TokenConfig {
  /** Whether to enable token interpolation */
  enableTokens?: boolean;
  /** Provider for building tokens */
  tokenProvider?: TokenProvider;
}