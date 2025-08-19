---
layer: project
docType: tasks
slice: markdown-content
project: manta-templates
phase: 1
lldRef: project-artifacts/nextjs-template/slices/08-slice.markdown-content.md
dependencies:
  - ui-refactor foundation (tasks 01-07 completed)
status: ready
---

# Tasks: Markdown Content Phase 1 - Foundation

## Context Summary
This phase creates the foundational content abstraction layer in ui-core, establishing framework-agnostic interfaces and shared markdown processing utilities. This foundation enables ui-core cards to consume markdown content through dependency injection patterns.

**Current State**: ui-core cards work with hardcoded props via dependency injection, but cannot load markdown content dynamically.

**Goal**: Create ContentProvider interface and shared markdown processing infrastructure that can be implemented by framework-specific adapters.

## Phase 1 Tasks: Content Abstraction Layer

### Create Content Type Definitions
- [x] **Create content types interface file**
  - [x] Create directory structure: `mkdir -p packages/ui-core/src/content`
  - [x] Create `packages/ui-core/src/content/types.ts` file
  - [x] Define `ContentProvider<T>` interface:
    ```typescript
    export interface ContentProvider<T = unknown> {
      loadContent(slug: string, contentType: string): Promise<ContentData<T>>;
      loadAllContent(contentType: string): Promise<ContentMeta<T>[]>;
    }
    ```
  - [x] Define `ContentData<T>` interface:
    ```typescript
    export interface ContentData<T> {
      slug: string;
      frontmatter: T;
      contentHtml?: string;
      rawContent?: string;
    }
    ```
  - [x] Define `ContentMeta<T>` interface:
    ```typescript
    export interface ContentMeta<T> {
      slug: string;
      frontmatter: T;
    }
    ```
  - [x] Add JSDoc documentation for each interface explaining purpose and usage
  - [x] Verify TypeScript compilation: `pnpm -C packages/ui-core tsc --noEmit`
  - **Success**: TypeScript interface file compiles without errors, provides complete type coverage

- [x] **Create content processing error types**
  - [x] Add error type definitions to `types.ts`:
    ```typescript
    export interface ContentError {
      code: string;
      message: string;
      cause?: Error;
    }
    
    export class ContentLoadError extends Error implements ContentError {
      code = 'CONTENT_LOAD_ERROR';
      cause?: Error;
      constructor(message: string, cause?: Error) {
        super(message);
        this.name = 'ContentLoadError';
        this.cause = cause;
      }
    }
    ```
  - [x] Create `ContentProcessError` class following same pattern with code 'CONTENT_PROCESS_ERROR'
  - [x] Create `ContentNotFoundError` class following same pattern with code 'CONTENT_NOT_FOUND'
  - [x] Update `ContentProvider` interface to document error throwing in JSDoc comments
  - [x] Verify error classes can be imported and instantiated correctly
  - **Success**: Complete error type coverage for content loading scenarios

### Implement Shared Content Processor
- [x] **Create ContentProcessor class foundation**
  - [x] Create `packages/ui-core/src/content/processor.ts` file
  - [x] Copy sanitization schema from `templates/nextjs/src/lib/content.ts` lines 34-62
  - [x] Implement basic ContentProcessor class structure:
    ```typescript
    import { remark } from 'remark';
    import gfm from 'remark-gfm';
    import remarkRehype from 'remark-rehype';
    import rehypeStringify from 'rehype-stringify';
    import rehypePrettyCode from 'rehype-pretty-code';
    import rehypeSanitize from 'rehype-sanitize';
    
    export class ContentProcessor {
      async processMarkdown(content: string): Promise<string> {
        // Implementation will be added in next subtask
      }
    }
    ```
  - [x] Add method signature for `processMarkdown(content: string): Promise<string>`
  - [x] Verify imports resolve correctly and class structure compiles
  - **Success**: ContentProcessor class structure created, ready for implementation

- [x] **Implement markdown processing pipeline**
  - [x] Implement `processMarkdown()` method using existing Next.js pattern from `templates/nextjs/src/lib/content.ts` lines 86-92:
    ```typescript
    async processMarkdown(content: string): Promise<string> {
      const processedContent = await remark()
        .use(gfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypePrettyCode, { theme: 'github-dark' })
        .use(rehypeSanitize, customSanitizeSchema)
        .use(rehypeStringify)
        .process(content);
      return processedContent.toString();
    }
    ```
  - [x] Add gray-matter import and frontmatter parsing method:
    ```typescript
    import matter from 'gray-matter';
    
    parseFrontmatter(content: string): { frontmatter: any; content: string } {
      const matterResult = matter(content);
      return { frontmatter: matterResult.data, content: matterResult.content };
    }
    ```
  - [x] Wrap processing in try-catch block, throw ContentProcessError for failures
  - [x] Test with sample markdown content from existing templates/nextjs/src/content/ files
  - [x] Compare output HTML with existing Next.js content system using same input
  - **Success**: Markdown processing produces identical output to existing Next.js content system

- [x] **Add processor configuration options**
  - [x] Define `ProcessorConfig` interface in processor.ts:
    ```typescript
    export interface ProcessorConfig {
      theme?: string | { light: string; dark: string };
      sanitizeSchema?: any;
      remarkPlugins?: any[];
      rehypePlugins?: any[];
    }
    ```
  - [x] Update ContentProcessor constructor to accept optional config:
    ```typescript
    constructor(private config: ProcessorConfig = {}) {
      this.theme = config.theme || 'github-dark';
      this.sanitizeSchema = config.sanitizeSchema || customSanitizeSchema;
    }
    ```
  - [x] Update processMarkdown to use configurable theme and plugins
  - [x] Create default configuration constant for standard usage
  - [x] Test with different themes: github-dark, github-light, verify output changes appropriately
  - **Success**: ContentProcessor accepts configuration, produces correct themed output

### Create Base Content Provider Abstract Class
- [x] **Create abstract ContentProvider base class**
  - [x] Create `packages/ui-core/src/content/BaseContentProvider.ts` file
  - [x] Import required types and ContentProcessor
  - [x] Define abstract class structure:
    ```typescript
    export abstract class BaseContentProvider<T = unknown> implements ContentProvider<T> {
      protected processor: ContentProcessor;
      private cache: Map<string, ContentData<T>> = new Map();
      
      constructor(processorConfig?: ProcessorConfig) {
        this.processor = new ContentProcessor(processorConfig);
      }
      
      abstract loadRawContent(slug: string, contentType: string): Promise<string>;
      abstract loadAllRawContent(contentType: string): Promise<{ slug: string; content: string }[]>;
      
      // Concrete implementations will be added in next subtasks
    }
    ```
  - [x] Verify abstract class structure compiles and can be extended
  - **Success**: Abstract base class structure ready for concrete method implementation

- [x] **Implement concrete methods with processing and caching**
  - [x] Implement `loadContent()` method:
    ```typescript
    async loadContent(slug: string, contentType: string): Promise<ContentData<T>> {
      const cacheKey = `${contentType}:${slug}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }
      
      const rawContent = await this.loadRawContent(slug, contentType);
      const { frontmatter, content } = this.processor.parseFrontmatter(rawContent);
      const contentHtml = await this.processor.processMarkdown(content);
      
      const result: ContentData<T> = {
        slug,
        frontmatter: frontmatter as T,
        contentHtml,
        rawContent
      };
      
      this.cache.set(cacheKey, result);
      return result;
    }
    ```
  - [x] Implement `loadAllContent()` method using similar pattern with loadAllRawContent
  - [x] Add cache clearing method: `clearCache(): void`
  - [x] Test caching behavior: verify cache hits avoid reprocessing
  - **Success**: Base class provides shared processing with caching, ready for framework-specific extensions

- [x] **Add content validation and error handling**
  - [x] Add validation method to BaseContentProvider:
    ```typescript
    protected validateContent(data: ContentData<T>, requiredFields: string[] = []): void {
      if (!data.slug) throw new ContentLoadError('Content missing required slug');
      if (!data.frontmatter) throw new ContentLoadError('Content missing frontmatter');
      
      for (const field of requiredFields) {
        if (!(field in (data.frontmatter as any))) {
          throw new ContentLoadError(`Content missing required field: ${field}`);
        }
      }
    }
    ```
  - [x] Wrap loadRawContent calls in try-catch blocks in concrete methods
  - [x] Convert framework-specific errors to ContentLoadError, ContentNotFoundError as appropriate
  - [x] Add console.warn for non-fatal issues (missing optional fields, etc.)
  - [x] Add retry logic for loadRawContent (max 3 attempts with exponential backoff)
  - [x] Test error scenarios: missing files, malformed frontmatter, network failures
  - **Success**: Robust error handling prevents crashes, provides helpful debugging information

### Set Up Package Infrastructure
- [x] **Update ui-core package.json dependencies**
  - [x] Open `packages/ui-core/package.json` in editor
  - [x] Check existing Next.js template dependencies in `templates/nextjs/package.json` for version compatibility
  - [x] Add these dependencies to ui-core (use same versions as Next.js template where they exist):
    ```json
    "dependencies": {
      "remark": "^15.0.1",
      "remark-gfm": "^4.0.0",
      "remark-rehype": "^11.1.0",
      "rehype-stringify": "^10.0.0",
      "rehype-pretty-code": "^0.13.2",
      "rehype-sanitize": "^6.0.0",
      "gray-matter": "^4.0.3"
    }
    ```
  - [x] Run `pnpm install` in packages/ui-core to install new dependencies
  - [x] Verify no version conflicts by running `pnpm -C packages/ui-core build`
  - **Success**: ui-core builds successfully with new dependencies

- [x] **Create content module exports**
  - [x] Open `packages/ui-core/src/index.ts` file
  - [x] Add content exports section (avoid conflicts with existing card/component exports):
    ```typescript
    // Content system exports
    export {
      ContentProvider,
      ContentData,
      ContentMeta,
      ContentError,
      ContentLoadError,
      ContentProcessError,
      ContentNotFoundError,
      ProcessorConfig
    } from './content/types';
    export { ContentProcessor } from './content/processor';
    export { BaseContentProvider } from './content/BaseContentProvider';
    ```
  - [x] Verify exports work by testing import in a separate test file:
    ```typescript
    import { ContentProvider, ContentProcessor } from '@manta-templates/ui-core';
    ```
  - [x] Run `pnpm -C packages/ui-core build` to verify barrel exports compile correctly
  - **Success**: All content abstractions importable from @manta-templates/ui-core

- [x] **Update TypeScript configuration**
  - [x] Open `packages/ui-core/tsconfig.json` file
  - [x] Verify `"include"` array includes `"src/**/*"` to cover content directory
  - [x] Check that `"moduleResolution"` is set to `"bundler"` or `"node"`
  - [x] Ensure `"strict": true` is enabled for proper type checking
  - [x] Add path mapping if needed for internal imports (usually not required for simple structure)
  - [x] Test TypeScript compilation: `pnpm -C packages/ui-core tsc --noEmit`
  - [x] Verify content modules appear in build output directory after `pnpm -C packages/ui-core build`
  - **Success**: TypeScript compilation works without errors, proper type checking enabled

### Create Development Testing Infrastructure
- [x] **Create basic content provider mock for testing**
  - [x] Create `packages/ui-core/src/content/MockContentProvider.ts` file
  - [x] Implement MockContentProvider extending BaseContentProvider:
    ```typescript
    export class MockContentProvider extends BaseContentProvider {
      private mockData: Map<string, string> = new Map();
      
      constructor(config?: ProcessorConfig & { delay?: number }) {
        super(config);
        this.setupMockData();
      }
      
      async loadRawContent(slug: string, contentType: string): Promise<string> {
        // Add artificial delay if configured
        const key = `${contentType}:${slug}`;
        const content = this.mockData.get(key);
        if (!content) throw new ContentNotFoundError(`Mock content not found: ${key}`);
        return content;
      }
    }
    ```
  - [x] Add `setupMockData()` method with sample content for articles, projects, quotes
  - [x] Include sample markdown with frontmatter from existing templates/nextjs/src/content/ files
  - [x] Add error scenario testing (throw errors for specific slugs like 'error-test')
  - [x] Add configurable delay support for testing loading states
  - **Success**: Mock provider available for development and testing

- [x] **Create content processing tests**
  - [x] Create test directory: `mkdir -p packages/ui-core/src/__tests__`
  - [x] Create `packages/ui-core/src/__tests__/content.test.ts` file
  - [x] Set up test framework (check existing ui-core test setup or use basic Node.js assertions)
  - [x] Create test cases for ContentProcessor:
    ```typescript
    // Test basic markdown processing
    const processor = new ContentProcessor();
    const input = '# Hello\n\nThis is **bold** text.';
    const output = await processor.processMarkdown(input);
    // Verify output contains <h1>, <p>, <strong> tags
    
    // Test frontmatter parsing
    const withFrontmatter = '---\ntitle: Test\n---\n# Content';
    const { frontmatter, content } = processor.parseFrontmatter(withFrontmatter);
    // Verify frontmatter.title === 'Test', content === '# Content'
    ```
  - [x] Test error scenarios: malformed frontmatter, invalid markdown syntax
  - [x] Test different themes by comparing code block output with theme changes
  - [x] Create sample test using MockContentProvider to verify full pipeline
  - **Success**: Content processing thoroughly tested, edge cases covered

- [x] **Build and verify foundation**
  - [x] Clean previous build: `pnpm -C packages/ui-core clean` (if clean script exists)
  - [x] Build ui-core package: `pnpm -C packages/ui-core build`
  - [x] Check build output in `packages/ui-core/dist/` - verify content files are included
  - [x] Create simple test file in project root to test imports:
    ```typescript
    // test-content-imports.ts
    import { ContentProvider, ContentProcessor, MockContentProvider } from '@manta-templates/ui-core';
    console.log('Content imports working:', { ContentProvider, ContentProcessor, MockContentProvider });
    ```
  - [x] Run the test file: `npx tsx test-content-imports.ts`
  - [x] Run existing ui-core tests: `pnpm -C packages/ui-core test` (if test script exists)
  - [x] Check for TypeScript errors: `pnpm -C packages/ui-core type-check`
  - [x] Delete test file after verification
  - **Success**: ui-core builds successfully, content foundation ready for framework adapters

## Quality Gates
- [x] TypeScript compilation passes without errors
- [x] All content interfaces provide complete type coverage
- [x] ContentProcessor produces HTML output matching Next.js quality
- [x] Error handling covers all failure scenarios
- [x] Mock content provider available for development/testing
- [x] ui-core package builds and exports content abstractions correctly

## Dependencies for Next Phase
This phase provides:
- `ContentProvider<T>` interface for framework adapters
- `ContentProcessor` class for shared markdown processing
- `BaseContentProvider` abstract class for common functionality
- Content type definitions and error handling
- Testing infrastructure and mocks

Phase 2 will use these abstractions to create the Next.js adapter and enhance ui-core cards with content loading capabilities.