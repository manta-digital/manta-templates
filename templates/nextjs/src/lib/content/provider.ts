import path from 'path';
import fs from 'fs';
import { ContentData, ContentMeta } from '../content';
import { getArticleBySlug, getProjectBySlug, getQuoteBySlug, getExampleContentBySlug, getAllArticles, getAllProjects, getAllQuotes, getAllExampleContent } from './loader';
import { Article, Project, Quote } from './schemas';

/**
 * Framework-agnostic content provider interface
 * This interface defines the contract for loading content across different frameworks
 */
export interface ContentProvider<T extends object = Record<string, unknown>> {
  loadContent(slug: string, contentType: string): Promise<ContentData<T>>;
  loadAllContent(contentType: string): Promise<ContentMeta<T>[]>;
}

/**
 * Next.js implementation of the ContentProvider interface
 * Wraps the existing Next.js content loading system with proper path resolution
 * for both template development and instance deployment contexts
 */
export class NextjsContentProvider implements ContentProvider {
  private contentPath: string;
  
  constructor() {
    // Adapt to template vs instance context
    // In template development: templates/nextjs/src/content/
    // In instance deployment: src/content/
    this.contentPath = this.resolveContentPath();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`NextjsContentProvider initialized with content path: ${this.contentPath}`);
    }
  }
  
  /**
   * Resolves the correct content path based on deployment context
   */
  private resolveContentPath(): string {
    const cwd = process.cwd();
    
    // Check if we're in template development context (monorepo)
    if (cwd.includes('templates/nextjs')) {
      return path.join(cwd, 'src', 'content');
    }
    
    // Check if templates/nextjs/src/content exists (template development from root)
    const templateContentPath = path.join(cwd, 'templates', 'nextjs', 'src', 'content');
    try {
      fs.statSync(templateContentPath);
      return templateContentPath;
    } catch {
      // Fall back to instance deployment path
      return path.join(cwd, 'src', 'content');
    }
  }
  
  /**
   * Load content by slug and type with proper validation
   */
  async loadContent<T extends object>(slug: string, contentType: string): Promise<ContentData<T>> {
    try {
      switch (contentType) {
        case 'articles':
          return await getArticleBySlug(slug) as ContentData<T>;
        case 'projects':
          return await getProjectBySlug(slug) as ContentData<T>;
        case 'quotes':
          return await getQuoteBySlug(slug) as ContentData<T>;
        case 'example-2':
          return await getExampleContentBySlug(slug) as ContentData<T>;
        default:
          throw new Error(`Unsupported content type: ${contentType}`);
      }
    } catch (error) {
      // Provide fallback behavior for missing content
      throw new Error(`Failed to load content ${contentType}/${slug}: ${error}`);
    }
  }
  
  /**
   * Load all content of a specific type with validation
   */
  async loadAllContent<T extends object>(contentType: string): Promise<ContentMeta<T>[]> {
    try {
      switch (contentType) {
        case 'articles':
          return getAllArticles() as ContentMeta<T>[];
        case 'projects':
          return getAllProjects() as ContentMeta<T>[];
        case 'quotes':
          return getAllQuotes() as ContentMeta<T>[];
        case 'example-2':
          return getAllExampleContent() as ContentMeta<T>[];
        default:
          console.warn(`Unsupported content type: ${contentType}, returning empty array`);
          return [];
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Failed to load all content for type ${contentType}:`, error);
      }
      return [];
    }
  }
  
  /**
   * Get the current content path (useful for debugging)
   */
  getContentPath(): string {
    return this.contentPath;
  }
}

/**
 * Default content provider instance for use throughout the application
 */
export const defaultContentProvider = new NextjsContentProvider();

/**
 * Convenience functions that use the default provider
 */
export async function loadContent<T extends object>(slug: string, contentType: string): Promise<ContentData<T>> {
  return defaultContentProvider.loadContent<T>(slug, contentType);
}

export async function loadAllContent<T extends object>(contentType: string): Promise<ContentMeta<T>[]> {
  return defaultContentProvider.loadAllContent<T>(contentType);
}

/**
 * Type-safe convenience functions for specific content types
 */
export async function loadArticle(slug: string): Promise<ContentData<Article>> {
  return defaultContentProvider.loadContent<Article>(slug, 'articles');
}

export async function loadProject(slug: string): Promise<ContentData<Project>> {
  return defaultContentProvider.loadContent<Project>(slug, 'projects');
}

export async function loadQuote(slug: string): Promise<ContentData<Quote>> {
  return defaultContentProvider.loadContent<Quote>(slug, 'quotes');
}

export async function loadAllArticles(): Promise<ContentMeta<Article>[]> {
  return defaultContentProvider.loadAllContent<Article>('articles');
}

export async function loadAllProjects(): Promise<ContentMeta<Project>[]> {
  return defaultContentProvider.loadAllContent<Project>('projects');
}

export async function loadAllQuotes(): Promise<ContentMeta<Quote>[]> {
  return defaultContentProvider.loadAllContent<Quote>('quotes');
}