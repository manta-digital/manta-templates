---
item: react-content
project: manta-templates  
type: tasks
sliceRef: slices/17-slice.react-content.md
dependencies: [ui-core, react-components]
projectState: ui-core established with React template validation, framework-agnostic video components complete
status: not started
lastUpdated: 2025-09-01
---

# Tasks: Universal Content System (React Content)

## Context Summary

This slice creates a framework-agnostic content loading system that enables shared markdown content between Next.js and React templates, eliminating content duplication while maintaining identical authoring experience across all frameworks.

**Critical Architecture Requirements**:
- **Zero Client-Side Markdown Processing**: Vite provider must load precompiled ESM modules, not raw markdown
- **Build-Time Compilation**: Vite plugin transforms `.md` → ESM with full remark/rehype pipeline at build time
- **Proper HTML Handling**: Always parse raw HTML before optional sanitization
- **Nested Content Support**: Recursive directory walking with posix slug generation
- **Type Safety**: Real Date objects, proper Zod validation, complete TypeScript interfaces

**Key Design Specifications**:
- Content workspace package: `@manta-templates/content` with proper exports
- Vite alias configuration: `'@manta-templates/content' -> '../packages/content/src'`
- Framework providers: NextjsContentProvider (Node.js only) and ViteContentProvider (compiled modules)
- Universal content hooks: `useContent` and `useContentCollection` with ContentFilters
- Security: HTML sanitization with rehype-sanitize, proper external link handling

## Implementation Tasks

### Task 1: Content Workspace Package Setup (Effort: 2/5) 🥇 **START HERE**
- **Objective**: Create dedicated content workspace package to resolve Vite import limitations
- **Reference**: Design section "Content Workspace Package Structure"

#### Create Package Structure
- [x] Create `packages/content/` directory
- [x] Create `packages/content/package.json` with exact structure from design:
  ```json
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
- [x] Create `packages/content/src/` directory structure
- [x] Create nested directories: `src/projects/`, `src/quotes/`, `src/videos/`
- [x] Create `packages/content/src/index.ts` as re-export file

#### Migrate Sample Content
- [ ] Create sample markdown files with proper frontmatter:
  - [x] `src/projects/nextjs-template.md` (slug: "projects/nextjs-template")
  - [x] `src/projects/react-template.md` (slug: "projects/react-template") 
  - [x] `src/projects/ui-core-showcase.md` (slug: "projects/ui-core-showcase")
  - [x] `src/quotes/developer-testimonial.md` (slug: "quotes/developer-testimonial")
  - [x] `src/quotes/framework-comparison.md` (slug: "quotes/framework-comparison")
  - [x] `src/videos/component-demo.md` (slug: "videos/component-demo")
  - [x] `src/videos/framework-showcase.md` (slug: "videos/framework-showcase")

#### Configure Workspace Dependencies
- [x] Update root `package.json` to include `packages/content` in workspace
- [x] Add content package to relevant template dependencies
- [x] Verify package resolution works correctly

- **Success**: Content package enables clean imports and nested slug structure

### Task 2: Core Content Engine Implementation (Effort: 3/5)
- **Objective**: Create framework-agnostic content processing core with security
- **Reference**: Design section "Core Architecture: Framework-Agnostic Content Engine"

#### Testing Strategy for Task 2-3
- **Content Engine**: Unit tests for `processMarkdownContent` function with various markdown inputs
- **Schema Validation**: Zod schema tests with valid/invalid content  
- **Vite Plugin**: Unit tests for transform logic with mock file inputs
- **Providers**: Integration tests for content loading and caching
- **Security Testing**: Validate HTML sanitization and external link handling
- **Framework Parity**: Ensure identical output between Next.js and Vite providers

**Testing Benefits:**
- Catch regressions early as we build complex remark/rehype pipelines
- Validate security features (HTML sanitization, external links)
- Ensure framework parity between Next.js and Vite providers  
- Document expected behavior through test cases

#### Create Content Engine Interface
- [x] Create `packages/ui-core/src/content/` directory
- [x] Create `packages/ui-core/src/content/ContentEngine.ts` with exact interfaces from design:
  - [x] `ContentEngine` interface with proper method signatures
  - [x] `ContentResult<T>` interface with meta.headings array
  - [x] `ContentFilters` interface with type/tags/category
  - [x] `ValidationResult<S extends z.ZodTypeAny>` type
  - [x] `RenderOptions` interface with all security options

#### Implement Content Processing Function
- [x] Add all required imports exactly as specified in design:
  ```typescript
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
  ```
- [x] Implement `processMarkdownContent` function with exact pipeline from design:
  - [x] Proper remark → rehype bridge with `remarkRehype({ allowDangerousHtml: options.allowHtml || false })`
  - [x] Always run `rehypeRaw` when `options.allowHtml` is true
  - [x] Optional `rehypeSanitize` based on `options.sanitize`
  - [x] Heading collection using `visit(tree, 'element', ...)` exactly as specified
  - [x] External link handling with proper rel attributes
  - [x] Metadata calculation with proper word counting

#### Create Content Schemas
- [x] Create `packages/ui-core/src/content/schemas.ts` with Zod schemas from design:
  - [x] `ProjectContentSchema` with all fields and validations
  - [x] `QuoteContentSchema` with theme enum
  - [x] `VideoContentSchema` with displayMode enum  
  - [x] Export inferred types: `ProjectContent`, `QuoteContent`, `VideoContent`

- **Success**: Secure, type-safe content engine with identical behavior across frameworks

### Task 3: Vite Plugin Development (Effort: 4/5) 🔧 **CRITICAL**
- **Objective**: Build-time markdown compilation to eliminate client-side remark
- **Reference**: Design section "Vite Plugin: Build-Time Markdown Compilation"

#### Create Plugin File and Basic Structure
- [x] Create plugin file and directory structure
  - [x] Create `packages/ui-adapters/vite/` directory as new sibling to existing nextjs/ and react/
  - [ ] Note that `packages/ui-adapters/nextjs/` and `packages/ui-adapters/react/` exist. DO NOT REMOVE OR BREAK THEM. THIS APPLIES IN GENERAL AS WELL.
  - [x] Create `packages/ui-adapters/vite/vite-plugin-content.ts`
  - [x] Add all required imports exactly as specified in design:
    ```typescript
    import type { Plugin, ResolvedConfig } from 'vite';
    import path from 'node:path';
    import fs from 'node:fs/promises';
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
    ```
  - [x] Success: Plugin file created with all required imports

#### Create Plugin Interface and Options
- [x] Define plugin options interface
  - [x] Create `ViteContentPluginOptions` interface:
    ```typescript
    export interface ViteContentPluginOptions {
      sanitize?: boolean;
      contentAlias?: string;
    }
    ```
  - [x] Create `viteContentPlugin` function signature:
    ```typescript
    export function viteContentPlugin({
      sanitize = true,
      contentAlias = '@manta-templates/content',
    }: {
      sanitize?: boolean; 
      contentAlias?: string;
    } = {}): Plugin
    ```
  - [x] Add helper function for path normalization:
    ```typescript
    function toPosix(p: string) { 
      return p.split(path.sep).join('/'); 
    }
    ```
  - [x] Success: Plugin interface and basic structure defined

#### Implement Configuration Resolution
- [x] Add config resolution for alias handling
  - [x] Define config variables:
    ```typescript
    let config: ResolvedConfig;
    let aliasRootAbs: string | null = null;
    ```
  - [x] Implement `configResolved` hook:
    ```typescript
    configResolved(c) {
      config = c;
      const alias = c.resolve.alias.find(a =>
        typeof a.find === 'string' && a.find === contentAlias
      );
      aliasRootAbs = alias ? (alias.replacement as string) : null;
    }
    ```
  - [x] Success: Plugin can resolve content alias absolute path

#### Build Markdown Processing Pipeline
- [x] Create transform method structure
  - [x] Implement basic transform method signature:
    ```typescript
    async transform(code, id) {
      if (!id.endsWith('.md')) return null;
      // Processing logic will go here
    }
    ```
  - [x] Parse frontmatter and content:
    ```typescript
    const { data: frontmatter, content, excerpt } = matter(code, { excerpt: true });
    ```
  - [x] Success: Transform method structure ready for processing pipeline

#### Implement Remark/Rehype Processing Chain
- [x] Build headings collection system
  - [x] Initialize headings array: 
    ```typescript
    const headings: { depth: number; text: string; id: string }[] = [];
    ```
  - [x] Create headings collection plugin:
    ```typescript
    .use(() => (tree: any) => {
      visit(tree, 'element', (node: any) => {
        if (/^h[1-6]$/.test(node.tagName)) {
          const depth = Number(node.tagName[1]);
          const id = node.properties?.id ?? '';
          const text = (node.children ?? [])
            .filter((c: any) => c.type === 'text')
            .map((c: any) => c.value)
            .join('');
          headings.push({ depth, text, id });
        }
      });
    })
    ```
  - [x] Success: Headings collection system implemented

- [x] Build complete remark processor pipeline
  - [x] Create base processor with remark-gfm:
    ```typescript
    let p = remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true });
    ```
  - [x] **CRITICAL**: Always add rehypeRaw for HTML parsing:
    ```typescript
    p = p.use(rehypeRaw);
    ```
  - [x] Add optional sanitization:
    ```typescript
    if (sanitize) p = p.use(rehypeSanitize);
    ```
  - [x] Add heading processing:
    ```typescript
    p = p.use(rehypeSlug)
         .use(rehypeAutolinkHeadings);
    ```
  - [x] Add external link handling:
    ```typescript
    p = p.use(rehypeExternalLinks, { 
      target: '_blank', 
      rel: ['noopener','noreferrer'] 
    });
    ```
  - [x] Add headings collection plugin (from above)
  - [x] Add final stringify step: `p = p.use(rehypeStringify);`
  - [x] Success: Complete processing pipeline implemented

#### Generate Compiled ESM Output
- [x] Process content and generate HTML
  - [x] Process markdown content: `const html = String(await p.process(content));`
  - [x] Calculate accurate word count: 
    ```typescript
    const wordCount = (content.trim().match(/\S+/g) ?? []).length;
    const readingTime = Math.ceil(wordCount / 200);
    ```
  - [x] Get file modification time: `const stats = await fs.stat(id);`
  - [x] Success: Content processed and metadata calculated

- [x] Generate nested slug from file path
  - [x] Create relative path from alias root:
    ```typescript
    const rel = aliasRootAbs ? path.relative(aliasRootAbs, id) : path.basename(id);
    ```
  - [x] Convert to posix slug:
    ```typescript
    const slug = rel.split(path.sep).join('/').replace(/\.md$/, '');
    ```
  - [x] Success: Nested slug generation implemented

- [x] Generate ESM module with proper Date constructor
  - [x] Create ISO date string: `const iso = stats.mtime.toISOString();`
  - [x] Generate complete ESM export:
    ```typescript
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
    ```
  - [x] Return compiled result: `return { code: js, map: null };`
  - [x] Success: ESM module generation with proper Date objects

#### Implement HMR Support
- [x] Add hot module replacement handling
  - [x] Implement `handleHotUpdate` method:
    ```typescript
    handleHotUpdate(ctx) {
      if (ctx.file.endsWith('.md')) {
        return ctx.modules; // hot-update the transformed module(s)
      }
    }
    ```
  - [ ] Test HMR works during development
    1. Start dev server
    2. Modify a markdown file
    3. Verify page updates without full reload
  - [ ] Success: Fine-grained HMR updates work for content changes

#### Final Plugin Integration
- [x] Complete plugin export and validation
  - [x] Ensure plugin function returns complete Plugin object
  - [x] Add error handling for transform failures
  - [ ] Test plugin works with different markdown files
    1. Simple markdown (no HTML)
    2. Markdown with HTML content
    3. Markdown with complex frontmatter
    4. Markdown in nested directories
  - [ ] Success: Plugin transforms all markdown file types correctly

- **Success**: React template has zero remark dependencies and fast content loading

### Task 4: Vite Content Provider Creation (Effort: 3/5)
- **Objective**: Create optimized provider using precompiled content modules  
- **Reference**: Design section "Vite Content Provider (Build-Time Compiled)"

#### Create Provider Class
- [x] Create `packages/ui-adapters/vite/ViteContentProvider.ts`
- [x] Add correct import: `import type { ContentEngine, ContentResult, ContentFilters } from '@manta-templates/ui-core/content';`
- [x] Create class with proper cache and inflight request maps (contentCache and inflightRequests)

#### Implement Static Module Loading
- [x] **CRITICAL**: Configure `import.meta.glob` without `'as: raw'`:
  ```typescript
  private modules = import.meta.glob('@manta-templates/content/**/*.md', { eager: false });
  ```
- [x] Implement `keyFor` method for consistent key generation
- [x] Create `loadContent` method with inflight request deduplication

#### Implement Content Loading Logic
- [x] **CRITICAL**: Load precompiled ESM modules, not raw content:
  ```typescript
  const p = (async () => {
    const mod: any = await loader();
    // The plugin exports a fully-formed ContentResult (no remark in browser!)
    const result = mod.default as ContentResult<T>;
    this.cache.set(slug, result);
    return result;
  })();
  ```
- [x] Implement `loadContentCollection` with proper filtering logic
- [x] Add `invalidate` method for cache management

#### Add HMR Integration
- [x] Create singleton pattern with proper factory function:
  ```typescript
  let singleton: ViteContentProvider | null = null;
  export function getViteContentProvider() {
    return (singleton ??= new ViteContentProvider());
  }
  ```
- [x] Add HMR integration that invalidates singleton cache:
  ```typescript
  if (import.meta.hot) {
    import.meta.hot.accept(
      Object.keys(import.meta.glob('@manta-templates/content/**/*.md')),
      () => singleton?.invalidate()
    );
  }
  ```

- [x] **Success**: React template loads precompiled content with optimal performance

### Task 5: Universal Content Hooks Implementation (Effort: 2/5)
- **Objective**: Create framework-agnostic React hooks for content loading
- **Reference**: Design section "Universal Content Hooks"

#### Create Content Hooks
- [x] Create `packages/ui-core/src/content/hooks.ts`
- [x] Implement `useContent` hook with exact signature from design:
  ```typescript
  export const useContent = <T = Record<string, any>>(
    filename: string, 
    provider: ContentEngine
  ) => {
    // Implementation exactly as specified in design
  }
  ```
- [x] Implement `useContentCollection` hook with ContentFilters parameter:
  ```typescript
  export const useContentCollection = <T = Record<string, any>>(
    filters: ContentFilters,
    provider: ContentEngine
  ) => {
    // Implementation exactly as specified in design
  }
  ```

#### Add Error Handling and Loading States
- [x] Implement proper error boundaries with descriptive error messages
- [x] Add loading states and refetch capabilities
- [x] Ensure hooks work with both provider types

- **Success**: Universal hooks provide consistent content loading API

### Task 6: Vite Configuration Setup (Effort: 1/5)
- **Objective**: Configure Vite alias and plugin for React template
- **Reference**: Design section "Vite Configuration for Content Alias"

#### Configure Vite Alias
- [x] Update `templates/react/vite.config.ts` to include:
  ```typescript
  import { fileURLToPath } from 'node:url';
  import { viteContentPlugin } from '@manta-templates/ui-adapters/vite';
  
  export default defineConfig({
    resolve: {
      alias: {
        '@manta-templates/content': fileURLToPath(
          new URL('../packages/content/src', import.meta.url)
        )
      }
    },
    plugins: [
      viteContentPlugin({
        sanitize: true,
        contentAlias: '@manta-templates/content'
      })
    ]
  });
  ```
- [x] Verify alias resolution works with `import.meta.glob`
- [x] Test that plugin transforms `.md` files correctly

- **Success**: Vite properly resolves content alias and processes markdown at build time

### Task 7: React Template Integration (Effort: 3/5)
- **Objective**: Integrate content system into React template
- **Reference**: Content loading patterns from design

#### Update Template Dependencies and Configuration
- [ ] Add required packages to React template
  - [ ] Update `templates/react/package.json` to include:
    ```json
    {
      "dependencies": {
        "@manta-templates/content": "workspace:*",
        "@manta-templates/ui-core": "workspace:*",
        "@manta-templates/ui-adapters": "workspace:*"
      }
    }
    ```
  - [ ] Run `pnpm install` to install new dependencies
  - [ ] Verify workspace packages resolve correctly
  - [ ] Success: All content system packages available in React template

#### Configure Content Provider
- [ ] Set up Vite content provider singleton
  - [ ] Create `src/lib/content.ts` configuration file:
    ```typescript
    import { getViteContentProvider } from '@manta-templates/ui-adapters/vite';
    
    export const contentProvider = getViteContentProvider();
    ```
  - [ ] Test provider imports work correctly
  - [ ] Success: Content provider singleton configured

#### Replace Hardcoded Content in HomePage
- [ ] Update HomePage component to use content hooks
  - [ ] Import content hooks and provider:
    ```typescript
    import { useContent, useContentCollection } from '@manta-templates/ui-core/content/hooks';
    import { contentProvider } from '../lib/content';
    import type { ProjectContent } from '@manta-templates/ui-core/content/schemas';
    ```
  - [ ] Replace hardcoded project content:
    ```typescript
    const { content: projectContent, loading, error } = useContent<ProjectContent>(
      'projects/react-template', 
      contentProvider
    );
    ```
  - [ ] Add loading and error states:
    ```typescript
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!projectContent) return <div>No content found</div>;
    ```
  - [ ] Update component to use `projectContent.frontmatter`
  - [ ] Success: HomePage uses markdown-driven content

#### Replace Hardcoded Content in ExamplesPage
- [ ] Update ExamplesPage component for multiple content types
  - [ ] Import all content schemas needed:
    ```typescript
    import type { ProjectContent, QuoteContent, VideoContent } from '@manta-templates/ui-core/content/schemas';
    ```
  - [ ] Replace project content collection:
    ```typescript
    const { content: projects, loading: projectsLoading } = useContentCollection<ProjectContent>(
      { type: 'project' }, 
      contentProvider
    );
    ```
  - [ ] Replace quote content:
    ```typescript
    const { content: quotes } = useContentCollection<QuoteContent>(
      { type: 'quote' }, 
      contentProvider
    );
    ```
  - [ ] Replace video content:
    ```typescript
    const { content: videos } = useContentCollection<VideoContent>(
      { type: 'video' }, 
      contentProvider
    );
    ```
  - [ ] Update all component rendering to use `content.frontmatter`
  - [ ] Success: ExamplesPage uses all content types from markdown

#### Test Content Loading and Rendering
- [ ] Verify individual content loading
  - [ ] Test single project loads: `useContent('projects/react-template')`
  - [ ] Test single quote loads: `useContent('quotes/developer-testimonial')`  
  - [ ] Test single video loads: `useContent('videos/component-demo')`
  - [ ] Verify nested slugs work correctly with `/` separators
  - [ ] Success: All individual content items load correctly

- [ ] Verify content collections work
  - [ ] Test projects collection with type filter
  - [ ] Test quotes collection with type filter
  - [ ] Test videos collection with type filter
  - [ ] Test mixed collections without filters
  - [ ] Success: Content collections load and filter correctly

- [ ] Test error handling and edge cases
  - [ ] Test missing content file (should show error)
  - [ ] Test malformed frontmatter (should show validation error)
  - [ ] Test network/loading states render properly
  - [ ] Success: Error handling works as expected

#### Verify HMR and Development Experience
- [ ] Test hot module replacement during development
  - [ ] Start dev server: `pnpm dev`
  - [ ] Modify content in `packages/content/src/projects/react-template.md`
  - [ ] Verify page updates automatically without full reload
  - [ ] Modify content in nested file (quotes/videos)
  - [ ] Verify HMR works for all content types
  - [ ] Success: Content changes trigger immediate UI updates

#### Test Production Build
- [ ] Verify production build works correctly
  - [ ] Run production build: `pnpm build`
  - [ ] Verify build completes without errors
  - [ ] Check that no remark/rehype packages in client bundle
    1. Analyze bundle with `pnpm build --analyze` or similar
    2. Confirm markdown processing libraries absent from client bundle
  - [ ] Test production site serves content correctly
  - [ ] Success: Production build is optimized and functional

- **Success**: React template uses markdown-driven content with identical rendering

### Task 8: Next.js Content Provider Enhancement (Effort: 2/5)
- **Objective**: Enhance Next.js provider with recursive directory support and proper caching
- **Reference**: Design section "Next.js Content Provider (Server-Side Optimized)"

#### Update Provider Structure
- [ ] Create `packages/ui-adapters/nextjs/NextjsContentProvider.ts` (enhance existing nextjs adapter) 
- [ ] Add all required imports including `createRequire` from 'node:module'
- [ ] Implement constructor with proper package path resolution:
  ```typescript
  constructor(contentPackage: string = '@manta-templates/content') {
    const require = createRequire(import.meta.url);
    const pkgJsonPath = require.resolve(`${contentPackage}/package.json`);
    const pkgRoot = path.dirname(pkgJsonPath);
    this.contentRoot = path.join(pkgRoot, 'src');
  }
  ```

#### Implement Recursive Directory Walking
- [ ] Create `private async *walk(dir: string): AsyncGenerator<string>` method exactly as specified:
  ```typescript
  private async *walk(dir: string): AsyncGenerator<string> {
    for (const d of await fs.readdir(dir, { withFileTypes: true })) {
      const res = path.join(dir, d.name);
      if (d.isDirectory()) yield* this.walk(res);
      else if (d.isFile() && res.endsWith('.md')) yield res;
    }
  }
  ```
- [ ] Create `slugFrom` method with proper posix separator handling:
  ```typescript
  private slugFrom(absPath: string) {
    const relativePath = path.relative(this.contentRoot, absPath);
    return relativePath.split(path.sep).join('/').replace(/\.md$/, '');
  }
  ```

#### Update Content Loading Methods
- [ ] Enhance `loadContent` with file-based caching using mtime and proper RenderOptions:
  ```typescript
  const result = await processMarkdownContent(rawContent, slug, {
    allowHtml: true,
    sanitize: true, 
    generateHeadingIds: true,
    externalLinkTarget: '_blank'
  });
  ```
- [ ] Update `loadContentCollection` to use recursive walking:
  ```typescript
  async loadContentCollection<T>(filters?: ContentFilters): Promise<ContentResult<T>[]> {
    const files: string[] = [];
    for await (const f of this.walk(this.contentRoot)) {
      files.push(f);
    }
    const results = await Promise.all(files.map(async f => {
      const slug = this.slugFrom(f);
      return this.loadContent<T>(slug);
    }));
    // Apply filters logic exactly as specified
  }
  ```

#### Add Runtime Safety
- [ ] Add JSDoc comment: `// NOTE: This provider requires runtime: 'nodejs' - not Edge compatible`
- [ ] Ensure all fs operations use proper error handling

- **Success**: Next.js provider performs optimally with enhanced features and recursive support

### Task 9: Next.js Template Migration (Effort: 2/5)
- **Objective**: Migrate Next.js template to use shared content package
- **Reference**: NextjsContentProvider implementation

#### Update Next.js Dependencies
- [ ] Add `@manta-templates/content` to `templates/nextjs/package.json`
- [ ] Update imports to use shared content package

#### Migrate to NextjsContentProvider
- [ ] Replace existing content loading with `NextjsContentProvider`
- [ ] Update pages to use new content loading patterns
- [ ] Ensure `runtime: 'nodejs'` is set for routes using fs operations
- [ ] Test server-side content loading and caching

#### Validate Backward Compatibility
- [ ] Ensure existing functionality works identically
- [ ] Verify performance is maintained or improved
- [ ] Test nested content organization works

- **Success**: Next.js template uses shared content package with enhanced caching

### Task 10: Asset Handling Strategy (Effort: 3/5)
- **Objective**: Resolve relative asset paths across frameworks
- **Reference**: Design considerations for asset handling

#### Design Asset Resolution Strategy
- [ ] Create asset path rewriting strategy for relative paths in markdown
- [ ] Plan Next.js asset resolution (potentially converting to `<Image/>` components)
- [ ] Design Vite asset handling with proper URL rewriting during build

#### Implement Asset Processing
- [ ] Add asset validation and optimization pipeline
- [ ] Configure framework-specific asset handling
- [ ] Test image and link resolution across templates

#### Document Asset Usage Patterns
- [ ] Create asset usage guidelines for content authors
- [ ] Document relative path conventions
- [ ] Add troubleshooting guide for common asset issues

- **Success**: Images and links work correctly across all frameworks

### Task 11: Testing & Validation (Effort: 3/5)
- **Objective**: Comprehensive testing with focus on security and performance
- **Reference**: Success metrics from design

#### Create Content Processing Tests
- [ ] Create golden snapshot tests for HTML output parity
  - [ ] Create test file `packages/ui-core/src/content/__tests__/content-processing.test.ts`
  - [ ] Set up test content samples:
    ```typescript
    const sampleMarkdown = `---
type: project
title: Test Project
---
# Test Content
This is **bold** text with [links](https://example.com).`;
    ```
  - [ ] Test NextjsContentProvider output:
    ```typescript
    const nextjsResult = await processMarkdownContent(sampleMarkdown, 'test', {
      allowHtml: true, 
      sanitize: true, 
      generateHeadingIds: true, 
      externalLinkTarget: '_blank'
    });
    expect(nextjsResult.contentHtml).toMatchSnapshot('nextjs-output.html');
    ```
  - [ ] Test Vite plugin output with same input
  - [ ] Compare outputs are identical (HTML, metadata, headings)
  - [ ] Success: Both providers generate identical output

#### Create Schema Validation Tests  
- [ ] Test Zod schema validation with helpful error messages
  - [ ] Create test file `packages/ui-core/src/content/__tests__/schema-validation.test.ts`
  - [ ] Test valid content passes validation:
    ```typescript
    const validProject = {
      type: 'project',
      title: 'Test',
      description: 'Test project',
      techStack: ['React'],
      // ... other required fields
    };
    const result = ProjectContentSchema.safeParse(validProject);
    expect(result.success).toBe(true);
    ```
  - [ ] Test invalid content fails with helpful messages:
    ```typescript
    const invalidProject = { type: 'project' }; // missing required fields
    const result = ProjectContentSchema.safeParse(invalidProject);
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('Required');
    ```
  - [ ] Test type validation for all schema fields
  - [ ] Success: Schema validation provides clear error messages

#### Performance Budget Validation
- [ ] Verify client bundle size requirements
  - [ ] Create bundle analysis test for React template
  - [ ] Build React template: `cd templates/react && pnpm build`
  - [ ] Analyze bundle contents:
    1. Check bundle does not contain 'remark' or 'rehype' packages
    2. Check bundle does not contain 'gray-matter' in client code
    3. Verify only precompiled content modules are included
  - [ ] Set up automated bundle size checks:
    ```typescript
    // In CI/testing
    const bundleContent = fs.readFileSync('dist/assets/index-*.js', 'utf8');
    expect(bundleContent).not.toContain('remark');
    expect(bundleContent).not.toContain('rehype');
    expect(bundleContent).not.toContain('gray-matter');
    ```
  - [ ] Success: Client bundles contain no markdown processing libraries

#### Integration Testing Across Templates
- [ ] Test content loading and caching behavior
  - [ ] Create integration test file `__tests__/content-integration.test.ts`
  - [ ] Test NextjsContentProvider caching:
    1. Load same content twice
    2. Verify second load uses cache (faster response)
    3. Modify file mtime, verify cache invalidation
  - [ ] Test ViteContentProvider module loading:
    1. Load content in React template
    2. Verify modules are cached correctly
    3. Test HMR cache invalidation works
  - [ ] Success: Caching works correctly in both environments

- [ ] Test nested content organization
  - [ ] Test nested slug generation:
    ```typescript
    // Test files: projects/sub/nested.md should become "projects/sub/nested"
    const nestedContent = await provider.loadContent('projects/sub/nested');
    expect(nestedContent.slug).toBe('projects/sub/nested');
    ```
  - [ ] Test recursive directory walking finds all content
  - [ ] Test posix path separators work on all platforms
  - [ ] Success: Nested content organization works correctly

- [ ] Test error handling scenarios
  - [ ] Test missing content file:
    ```typescript
    await expect(provider.loadContent('nonexistent')).rejects.toThrow('Content not found');
    ```
  - [ ] Test malformed frontmatter:
    ```typescript
    const malformedContent = '---\ninvalid: yaml: content\n---\n# Content';
    await expect(processMarkdownContent(malformedContent, 'test')).rejects.toThrow();
    ```
  - [ ] Test schema validation errors provide file context
  - [ ] Success: Error handling is robust and informative

#### Security Validation Tests
- [ ] Test HTML sanitization effectiveness
  - [ ] Create security test file `__tests__/content-security.test.ts`
  - [ ] Test malicious HTML is sanitized:
    ```typescript
    const maliciousContent = `---\ntype: project\n---\n<script>alert('xss')</script>`;
    const result = await processMarkdownContent(maliciousContent, 'test', { sanitize: true });
    expect(result.contentHtml).not.toContain('<script>');
    ```
  - [ ] Test external link security policies:
    ```typescript
    const linkContent = '[External](https://evil.com)';
    const result = await processMarkdownContent(linkContent, 'test');
    expect(result.contentHtml).toContain('rel="noopener noreferrer"');
    expect(result.contentHtml).toContain('target="_blank"');
    ```
  - [ ] Test sanitization can be disabled when needed
  - [ ] Success: Security measures work correctly

#### Memory and Performance Testing
- [ ] Test memory usage during content loading
  - [ ] Create memory test that loads large number of content files
  - [ ] Monitor memory usage over time
  - [ ] Verify no memory leaks during repeated loads
  - [ ] Test content provider cleanup works correctly
  - [ ] Success: Memory usage remains stable during operation

- [ ] Test TypeScript type safety
  - [ ] Verify inferred types work correctly:
    ```typescript
    const content = await provider.loadContent<ProjectContent>('projects/test');
    // TypeScript should enforce content.frontmatter has ProjectContent shape
    expect(content.frontmatter.title).toBeDefined();
    expect(content.frontmatter.techStack).toBeInstanceOf(Array);
    ```
  - [ ] Test generic type parameters work with content collections
  - [ ] Verify ValidationResult types work with Zod schemas
  - [ ] Success: TypeScript integration provides proper type safety

- **Success**: Content system reliability and security validated across frameworks

### Task 12: Documentation and Migration Guide (Effort: 2/5)
- **Objective**: Create comprehensive documentation for content system usage

#### Create Usage Documentation
- [ ] Document content authoring workflow and markdown conventions
- [ ] Create schema validation guide with examples
- [ ] Document provider setup for different frameworks
- [ ] Add troubleshooting guide for common issues

#### Create Migration Guide
- [ ] Document migration from hardcoded content to markdown-driven system
- [ ] Create migration tools/scripts for existing projects
- [ ] Add examples showing before/after content structures
- [ ] Document breaking changes and upgrade paths

#### Performance and Security Guide
- [ ] Document performance implications and optimization strategies
- [ ] Create security best practices guide for content handling
- [ ] Add monitoring and debugging guidance

- **Success**: Comprehensive documentation enables confident adoption

## Success Criteria

### Critical Requirements
- [ ] **Zero Client-Side Markdown Processing**: Vite provider loads only precompiled ESM modules
- [ ] **Proper HTML Handling**: rehypeRaw always runs before optional sanitization  
- [ ] **Nested Content Support**: Recursive directory walking with posix slugs works correctly
- [ ] **Type Safety**: All TypeScript interfaces work with proper type inference
- [ ] **Framework Parity**: Identical content rendering across Next.js and React templates

### Performance Requirements
- [ ] **Bundle Size**: No remark/rehype in client bundles (Vite template)
- [ ] **Loading Performance**: Content loading matches or exceeds existing implementations
- [ ] **Memory Usage**: No memory leaks during content loading and caching
- [ ] **Build Performance**: Vite plugin compilation time remains reasonable

### Developer Experience Requirements
- [ ] **Hot Reload**: Content changes trigger proper updates during development
- [ ] **Error Messages**: Clear, actionable error messages for content issues
- [ ] **Migration Path**: Existing projects can adopt system incrementally
- [ ] **Documentation**: Complete usage and migration documentation available

## Notes

- **Architecture Compliance**: All tasks must follow the exact patterns specified in the slice design
- **Security First**: HTML sanitization and external link handling are mandatory security features
- **Performance Critical**: Client-side bundle size and loading performance are key success metrics
- **Framework Agnostic**: All code must work identically across supported frameworks

## Review Checklist

Before marking tasks complete, verify against slice design:
- [ ] All code examples from design are implemented exactly as specified
- [ ] No architectural shortcuts or simplifications were made
- [ ] All security considerations (HTML sanitization, external links) are implemented
- [ ] Performance requirements (zero client-side remark, proper caching) are met
- [ ] TypeScript interfaces match design specifications exactly
- [ ] Error handling follows design patterns
- [ ] HMR and development experience features work as designed