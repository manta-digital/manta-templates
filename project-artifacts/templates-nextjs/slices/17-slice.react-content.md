---
item: react-content
project: manta-templates
type: slice
github: https://github.com/manta-digital/manta-templates/issues/TBD
dependencies: [ui-core, react-components]
projectState: ui-core established with React template validation, framework-agnostic video components complete
status: not started
lastUpdated: 2025-09-01
---

# Slice 17: Universal Content System (React Content)

## Overview

This slice creates a framework-agnostic content loading system that enables shared markdown content between Next.js and React templates, eliminating content duplication while maintaining identical authoring experience across all frameworks.

## Problem Statement

Currently, content management differs significantly between frameworks:
- **Next.js template**: Rich markdown-driven content system using `gray-matter` and `remark`
- **React template**: Hardcoded content objects limiting flexibility and scalability
- **Content Duplication**: No shared content files between template types
- **Inconsistent DX**: Different content authoring approaches across frameworks

This creates maintenance overhead, content inconsistencies, and limits the ability to showcase identical examples across different framework implementations.

## Goals

### Primary Goals
1. **Universal Content API**: Identical content loading interface across Next.js and React templates
2. **Shared Content Files**: Same markdown files work across all template types
3. **Framework Parity**: Identical content authoring experience and capabilities
4. **Migration Path**: Seamless transition from hardcoded to markdown-driven content

### Secondary Goals
1. **Performance Optimization**: Framework-specific loading optimizations where appropriate
2. **Development Experience**: Hot-reload content updates during development
3. **Type Safety**: Full TypeScript support for content schemas
4. **Content Validation**: Runtime validation of content structure and frontmatter

## Technical Approach

### Core Architecture: Framework-Agnostic Content Engine

Create a shared content processing core with security and performance optimizations:

```typescript
// packages/ui-core/src/content/ContentEngine.ts
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
import { z } from 'zod';

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
  let processor = remark()
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
```

### Framework-Specific Content Providers

#### Next.js Content Provider (Server-Side Optimized)
```typescript
// packages/ui-adapters/src/nextjs/NextjsContentProvider.ts
import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'node:module';
import { ContentEngine, processMarkdownContent, ContentResult, ContentFilters } from '@manta-templates/ui-core/content';

// NOTE: This provider requires runtime: 'nodejs' - not Edge compatible
export class NextjsContentProvider implements ContentEngine {
  private contentCache = new Map<string, { result: ContentResult<any>; mtime: number }>();
  private contentRoot: string;
  
  constructor(contentPackage: string = '@manta-templates/content') {
    // Resolve actual package path at construction time
    const require = createRequire(import.meta.url);
    const pkgJsonPath = require.resolve(`${contentPackage}/package.json`);
    const pkgRoot = path.dirname(pkgJsonPath);
    this.contentRoot = path.join(pkgRoot, 'src');
  }

  private slugFrom(absPath: string) {
    // Ensure posix separators for consistent cross-platform slug format
    const relativePath = path.relative(this.contentRoot, absPath);
    return relativePath.split(path.sep).join('/').replace(/\.md$/, '');
  }

  private async *walk(dir: string): AsyncGenerator<string> {
    for (const d of await fs.readdir(dir, { withFileTypes: true })) {
      const res = path.join(dir, d.name);
      if (d.isDirectory()) yield* this.walk(res);
      else if (d.isFile() && res.endsWith('.md')) yield res;
    }
  }
  
  async loadContent<T>(slug: string): Promise<ContentResult<T>> {
    const filePath = path.join(this.contentRoot, `${slug}.md`);
    
    // Check file modification time for cache invalidation
    const stats = await fs.stat(filePath);
    const mtime = stats.mtime.getTime();
    
    const cached = this.contentCache.get(slug);
    if (cached && cached.mtime >= mtime) {
      return cached.result as ContentResult<T>;
    }
    
    const rawContent = await fs.readFile(filePath, 'utf-8');
    const result = await processMarkdownContent(rawContent, slug);
    
    // Use actual file modification time
    result.lastModified = stats.mtime;
    
    this.contentCache.set(slug, { result, mtime });
    return result as ContentResult<T>;
  }

  async loadContentCollection<T>(filters?: ContentFilters): Promise<ContentResult<T>[]> {
    const files: string[] = [];
    for await (const f of this.walk(this.contentRoot)) {
      files.push(f);
    }

    const results = await Promise.all(files.map(async f => {
      const slug = this.slugFrom(f);
      return this.loadContent<T>(slug);
    }));

    // Apply filters
    return results.filter(r => {
      const fm: any = r.frontmatter;
      if (filters?.type && fm.type !== filters.type) return false;
      if (filters?.category && fm.category !== filters.category) return false;
      if (filters?.tags?.length) {
        const tags = fm.tags ?? [];
        if (!filters.tags.some(t => tags.includes(t))) return false;
      }
      return true;
    });
  }
}
```

#### Vite Content Provider (Build-Time Compiled)
```typescript
// packages/ui-adapters/src/vite/ViteContentProvider.ts
import type { ContentEngine, ContentResult, ContentFilters } from '@manta-templates/ui-core/content';

// Vite plugin transforms .md → .md.js with compiled content at build time
export class ViteContentProvider implements ContentEngine {
  private contentCache = new Map<string, ContentResult<any>>();
  private inflightRequests = new Map<string, Promise<ContentResult<any>>>();
  
  // Use import.meta.glob for static analysis
  // Note: Requires Vite alias: '@manta-templates/content' -> '../packages/content/src'
  private contentModules = import.meta.glob('@manta-templates/content/**/*.md', {
    // NO 'as: raw' - we want compiled ESM modules!
    eager: false
  });
  
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
    const key = `@manta-templates/content/${slug}.md`;
    const loader = this.contentModules[key];
    
    if (!loader) {
      throw new Error(`Content not found: ${slug}. Available: ${Object.keys(this.contentModules).join(', ')}`);
    }
    
    // CRITICAL: Load precompiled ESM module (no remark in browser!)
    const mod: any = await loader();
    return mod.default as ContentResult<T>;
  }

  async loadContentCollection<T>(filters?: ContentFilters): Promise<ContentResult<T>[]> {
    // Load all content using static analysis
    const allSlugs = Object.keys(this.contentModules)
      .map(key => key.replace('@manta-templates/content/', '').replace('.md', ''));
    
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

if (import.meta.hot) {
  import.meta.hot.accept(Object.keys(import.meta.glob('@manta-templates/content/**/*.md')), () => {
    // Clear cache when content changes
    if (globalProvider) {
      globalProvider.invalidateCache();
    }
  });
}

// Export factory to maintain singleton
export function getViteContentProvider(): ViteContentProvider {
  if (!globalProvider) {
    globalProvider = new ViteContentProvider();
  }
  return globalProvider;
}
```

### Vite Plugin: Build-Time Markdown Compilation

Critical component that transforms `.md` → `.md.js` at build time to eliminate client-side remark:

```typescript
// packages/ui-adapters/src/vite/vite-plugin-content.ts
import { Plugin } from 'vite';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import fs from 'fs/promises';
import path from 'path';

export interface ViteContentPluginOptions {
  include?: string | string[];
  contentDir?: string;
  sanitize?: boolean;
}

export function viteContentPlugin(options: ViteContentPluginOptions = {}): Plugin {
  const {
    include = ['**/*.md'],
    contentDir = '@manta-templates/content',
    sanitize = true
  } = options;

  return {
    name: 'vite-plugin-content',
    async transform(code, id) {
      if (!id.endsWith('.md')) return null;
      
      // Transform .md file to .md.js with compiled content
      const { data: frontmatter, content, excerpt } = matter(code, { excerpt: true });
      
      // Build proper remark → rehype pipeline with bridges
      let processor = remark()
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true });
      
      // CRITICAL: Always parse raw HTML when allowDangerousHtml is true
      processor = processor.use(rehypeRaw);
      
      // CRITICAL: Sanitize is optional, but rehypeRaw must run first
      if (sanitize) {
        processor = processor.use(rehypeSanitize);
      }
      
      processor = processor.use(rehypeStringify);
      
      const html = String(await processor.process(content));
      
      // Stable, nested slug relative to alias root (prevents collisions)
      const rel = aliasRootAbs ? path.relative(aliasRootAbs, id) : path.basename(id);
      const slug = rel.split(path.sep).join('/').replace(/\.md$/, '');
      
      // Calculate metadata with proper word counting
      const wordCount = (content.trim().match(/\S+/g) ?? []).length;
      const readingTime = Math.ceil(wordCount / 200);
      
      // Get real modification time
      const stats = await fs.stat(id);
      
      // CRITICAL: Emit ESM with proper Date constructor (not JSON.stringify!)
      const iso = stats.mtime.toISOString();
      const js = `
const compiled = {
  frontmatter: ${JSON.stringify(frontmatter)},
  contentHtml: ${JSON.stringify(html)},
  excerpt: ${excerpt ? JSON.stringify(excerpt) : 'undefined'},
  slug: ${JSON.stringify(slug)},
  lastModified: new Date(${JSON.stringify(iso)}),
  meta: {
    readingTime: ${readingTime},
    wordCount: ${wordCount},
    headings: ${JSON.stringify(headings)}
  }
};
export default compiled;`;
      return { code: js, map: null };
    },
    
    // Handle HMR
    handleHotUpdate(ctx) {
      if (ctx.file.endsWith('.md')) {
        // Invalidate dependent modules
        ctx.server.ws.send({
          type: 'full-reload'
        });
      }
    }
  };
}
```

### Content Workspace Package Structure

Address Vite import limitations with dedicated content package:

```json
// packages/content/package.json
{
  "name": "@manta-templates/content",
  "version": "1.0.0",
  "type": "module",
  "files": ["dist/**", "src/**"],
  "exports": {
    ".": "./src/index.ts",
    "./*": "./src/*"
  }
}
```

```
// Directory structure
packages/content/src/
├── projects/
│   ├── nextjs-template.md
│   ├── react-template.md
│   └── ui-core-showcase.md
├── quotes/
│   ├── developer-testimonial.md
│   └── framework-comparison.md
├── videos/
│   ├── component-demo.md
│   └── framework-showcase.md
└── index.ts  # Re-export content loaders
```

### Content Schema System (Zod-Based)

Type-safe content schemas with runtime validation:

```typescript
// packages/ui-core/src/content/schemas.ts
import { z } from 'zod';

export const ProjectContentSchema = z.object({
  type: z.literal('project'),
  title: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  image: z.string(),
  repoUrl: z.string().url(),
  liveUrl: z.string().url().optional(),
  features: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    color: z.string().optional()
  })),
  actions: z.array(z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(['default', 'outline', 'secondary']).optional()
  }))
});

export const QuoteContentSchema = z.object({
  type: z.literal('quote'),
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().optional(),
  theme: z.enum(['default', 'minimal', 'emphasis']).optional()
});

export const VideoContentSchema = z.object({
  type: z.literal('video'),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  videoUrl: z.string().url(),
  displayMode: z.enum(['thumbnail', 'background', 'player']),
  autoplay: z.boolean().optional(),
  loop: z.boolean().optional()
});

// Export inferred types for perfect TypeScript DX
export type ProjectContent = z.infer<typeof ProjectContentSchema>;
export type QuoteContent = z.infer<typeof QuoteContentSchema>;
export type VideoContent = z.infer<typeof VideoContentSchema>
```

### Universal Content Hooks

Framework-agnostic React hooks for content loading:

```typescript
// packages/ui-core/src/content/hooks.ts
export const useContent = <T = Record<string, any>>(
  filename: string, 
  provider: ContentEngine
) => {
  const [content, setContent] = useState<ContentResult<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const result = await provider.loadContent<T>(filename);
        setContent(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Content loading failed'));
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [filename, provider]);

  return { content, loading, error, refetch: () => loadContent() };
};

export const useContentCollection = <T = Record<string, any>>(
  filters: ContentFilters,
  provider: ContentEngine
) => {
  const [content, setContent] = useState<ContentResult<T>[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const results = await provider.loadContentCollection<T>(filters);
        setContent(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Content collection loading failed'));
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [filters, provider]);

  return { content, loading, error };
};
```
## Implementation Tasks
Details of implementation tasks are moved to: 17-tasks-react-content.md

## Future Considerations

### Multi-Language Content Support
**Status**: Foundation ready for future implementation

The universal content system provides the foundation for internationalization:
- Content providers can be extended with locale-aware loading
- Shared content structure supports language-specific frontmatter
- Framework-agnostic processing enables consistent i18n across templates

### Advanced Content Features
1. **Content Collections**: Automated content discovery and organization
2. **Content Search**: Full-text search capabilities across content
3. **Content Relationships**: Cross-references and content linking
4. **Content Scheduling**: Publication date and draft state management

### Framework Extensions
1. **Astro Integration**: Astro collections with ui-core components
2. **Vue Adapter**: Vue composition API for content loading
3. **Svelte Integration**: Svelte stores for reactive content
4. **Static Site Generators**: Generic provider for Gatsby, 11ty, etc.

## Risk Assessment

### Low Risk
- **Framework Compatibility**: Both `gray-matter` and `remark` are framework-agnostic
- **Performance Impact**: Content loading patterns already proven in Next.js template
- **Migration Complexity**: Existing content structure maps cleanly to markdown

### Medium Risk  
- **Development Experience**: Hot-reload behavior may differ between frameworks
- **Content Validation**: Schema validation adds complexity but provides value
- **Bundle Size**: Additional dependencies offset by improved developer experience

### High Risk
- **None identified**: This slice builds on proven technologies and patterns

## Conclusion

Slice 17 creates a universal content system that eliminates the content management disparity between Next.js and React templates while providing a foundation for future framework support. By implementing a framework-agnostic content engine with framework-specific providers, developers gain a consistent content authoring experience regardless of their chosen framework.

The slice prioritizes developer experience through identical APIs, comprehensive TypeScript support, and seamless migration paths, ensuring that content-driven development becomes a strength across the entire template ecosystem.