import type { ContentEngine, ContentResult, ContentFilters } from '@/lib/ui-core/content';

export class ViteContentProvider implements ContentEngine {
  private contentCache = new Map<string, ContentResult<any>>();
  private inflightRequests = new Map<string, Promise<ContentResult<any>>>();
  
  // CRITICAL: Static import.meta.glob for Vite build-time analysis
  private modules = import.meta.glob('@manta-templates/content/**/*.md', { eager: false });

  constructor() {
    const moduleKeys = Object.keys(this.modules);
    console.log('ViteContentProvider: Initialized with', moduleKeys.length, 'content modules');
  }

  // Generate consistent key for module lookup
  private keyFor(slug: string): string {
    // The actual keys from import.meta.glob might have different format
    // Try both potential formats
    const potentialKeys = [
      `@manta-templates/content/${slug}.md`,
      `/content/${slug}.md`
    ];
    
    for (const key of potentialKeys) {
      if (this.modules[key]) {
        return key;
      }
    }
    
    // If neither format works, return the expected format for error reporting
    return `@manta-templates/content/${slug}.md`;
  }

  async loadContent<T = Record<string, any>>(slug: string): Promise<ContentResult<T>> {
    // Check cache first
    if (this.contentCache.has(slug)) {
      return this.contentCache.get(slug) as ContentResult<T>;
    }

    // De-duplicate inflight requests
    if (this.inflightRequests.has(slug)) {
      return this.inflightRequests.get(slug) as Promise<ContentResult<T>>;
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
    // The plugin exports a fully-formed ContentResult (no remark in browser!)
    const result = mod.default as ContentResult<T>;
    return result;
  }

  async loadContentCollection<T = Record<string, any>>(filters?: ContentFilters): Promise<ContentResult<T>[]> {
    // Load all content using static analysis
    const allSlugs = Object.keys(this.modules)
      .map(key => {
        // Handle both possible key formats
        if (key.startsWith('@manta-templates/content/')) {
          return key.replace('@manta-templates/content/', '').replace('.md', '');
        } else if (key.startsWith('/content/')) {
          return key.replace('/content/', '').replace('.md', '');
        } else {
          // Fallback: remove any leading slash and .md extension
          return key.replace(/^\//, '').replace('.md', '');
        }
      });
    
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

  async renderMarkdown(content: string, options?: any): Promise<string> {
    // Not needed for Vite provider since content is precompiled
    throw new Error('renderMarkdown not supported - content is precompiled');
  }

  validateContent<S extends any>(content: unknown, schema: S): any {
    // Content validation will be handled by consuming code
    throw new Error('validateContent not implemented in ViteContentProvider');
  }

  // Cache management
  invalidate(slug?: string): void {
    if (slug) {
      this.contentCache.delete(slug);
      this.inflightRequests.delete(slug);
    } else {
      this.contentCache.clear();
      this.inflightRequests.clear();
    }
  }
}

// HMR integration - use singleton pattern to avoid creating new instances
let singleton: ViteContentProvider | null = null;

export function getViteContentProvider(): ViteContentProvider {
  if (!singleton) {
    singleton = new ViteContentProvider();
  }
  return singleton;
}

// HMR integration that invalidates singleton cache
if (import.meta.hot) {
  import.meta.hot.accept(
    Object.keys(import.meta.glob('@manta-templates/content/**/*.md')),
    () => {
      // Clear cache when content changes
      if (singleton) {
        singleton.invalidate();
      }
    }
  );
}