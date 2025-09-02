import type { ContentEngine, ContentResult, ContentFilters } from '../ui-core/content/contentTypes';

export class ViteContentProvider implements ContentEngine {
  private contentCache = new Map<string, ContentResult<any>>();
  private inflightRequests = new Map<string, Promise<ContentResult<any>>>();

  // CRITICAL: Configure import.meta.glob without 'as: raw' to get precompiled ESM modules
  private modules = import.meta.glob('@manta-templates/content/**/*.md', { eager: false });

  constructor() {
    if (typeof import.meta.glob === 'undefined') {
      console.warn('ViteContentProvider: import.meta.glob not available - content loading will fail');
    }
    // Debug: log available modules
    console.log('ViteContentProvider modules:', Object.keys(this.modules));
  }

  keyFor(slug: string) {
    // Try multiple possible key formats to find the right one
    const possibleKeys = [
      `@manta-templates/content/${slug}.md`,
      `../../packages/content/src/${slug}.md`,
      `/packages/content/src/${slug}.md`
    ];
    
    for (const key of possibleKeys) {
      if (this.modules[key]) {
        return key;
      }
    }
    
    // If no direct match, try to find a key that ends with the slug
    const matchingKey = Object.keys(this.modules).find(key => 
      key.endsWith(`/${slug}.md`)
    );
    
    return matchingKey || possibleKeys[0]; // fallback to first format
  }

  async loadContent<T>(slug: string): Promise<ContentResult<T>> {
    // De-duplicate inflight requests
    if (this.inflightRequests.has(slug)) {
      return this.inflightRequests.get(slug) as Promise<ContentResult<T>>;
    }

    // Check cache first
    if (this.contentCache.has(slug)) {
      return this.contentCache.get(slug) as ContentResult<T>;
    }

    const loadPromise = this.loadContentInternal<T>(slug);
    this.inflightRequests.set(slug, loadPromise);

    try {
      const result = await loadPromise;
      this.contentCache.set(slug, result);
      return result;
    } finally {
      this.inflightRequests.delete(slug);
    }
  }

  private async loadContentInternal<T>(slug: string): Promise<ContentResult<T>> {
    const key = this.keyFor(slug);
    const loader = this.modules[key];

    if (!loader) {
      throw new Error(`Content not found: ${slug}. Available: ${Object.keys(this.modules).join(', ')}`);
    }

    // CRITICAL: Load precompiled ESM module (no remark in browser!)
    const mod: any = await loader();
    return mod.default as ContentResult<T>;
  }

  async loadContentCollection<T>(filters?: ContentFilters): Promise<ContentResult<T>[]> {
    // Extract slugs from actual module keys
    const allSlugs = Object.keys(this.modules)
      .map(key => {
        // Handle different key formats:
        // ../../packages/content/src/quotes/developer-testimonial.md -> quotes/developer-testimonial
        // @manta-templates/content/quotes/developer-testimonial.md -> quotes/developer-testimonial
        if (key.includes('/content/src/')) {
          return key.split('/content/src/')[1].replace('.md', '');
        } else if (key.includes('@manta-templates/content/')) {
          return key.replace('@manta-templates/content/', '').replace('.md', '');
        }
        // Fallback: just remove .md and try to extract the path part
        return key.replace('.md', '').split('/').slice(-2).join('/');
      })
      .filter(slug => slug); // Remove empty slugs

    console.log('Extracted slugs:', allSlugs);

    const results = await Promise.all(
      allSlugs.map(slug => this.loadContent<T>(slug))
    );

    // Apply filters
    return results.filter(result => {
      const frontmatter = result.frontmatter as any;

      if (filters?.type && frontmatter.type !== filters.type) {
        return false;
      }

      if (filters?.tags && filters.tags.length > 0) {
        const contentTags = frontmatter.tags || [];
        if (!filters.tags.some(tag => contentTags.includes(tag))) {
          return false;
        }
      }

      if (filters?.category && frontmatter.category !== filters.category) {
        return false;
      }

      return true;
    });
  }

  // Placeholder methods to satisfy ContentEngine interface
  async renderMarkdown(content: string, options?: any): Promise<string> {
    throw new Error('renderMarkdown not implemented in ViteContentProvider - content is precompiled');
  }

  validateContent<S>(content: unknown, schema: S): any {
    throw new Error('validateContent not implemented in ViteContentProvider - validation happens at build time');
  }

  // Development HMR support
  invalidateCache(slug?: string): void {
    if (slug) {
      this.contentCache.delete(slug);
    } else {
      this.contentCache.clear();
    }
  }
}

// HMR integration - use singleton pattern to avoid creating new instances
let globalProvider: ViteContentProvider | null = null;

if (typeof import.meta !== 'undefined' && import.meta.hot) {
  import.meta.hot.accept(
    Object.keys(import.meta.glob('@manta-templates/content/**/*.md')),
    () => {
      // Clear cache when content changes
      if (globalProvider) {
        globalProvider.invalidateCache();
      }
    }
  );
}

// Export factory to maintain singleton
export function getViteContentProvider(): ViteContentProvider {
  if (!globalProvider) {
    globalProvider = new ViteContentProvider();
  }
  return globalProvider;
}