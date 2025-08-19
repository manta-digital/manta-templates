---
layer: project
docType: slice-design
---

# Slice 08: Markdown-Driven Content for ui-core

## Overview
Enable ui-core cards to consume markdown-driven content through framework-agnostic dependency injection, preserving the powerful content system from Next.js while enabling support for Astro, React Router, and other frameworks.

## Problem Statement
The ui-refactor successfully extracted card components to ui-core with dependency injection for Image/Link components, but lost the markdown-driven content capabilities that made the original Next.js cards highly productive. Currently:

- ✅ ui-core cards work with hardcoded props via dependency injection
- ❌ ui-core cards cannot load markdown content dynamically  
- ❌ No framework-agnostic equivalent to `ArticleCardContentLoader` pattern
- ❌ Content system tied to Next.js filesystem APIs and server-side processing

## Success Criteria
1. **Framework Agnostic Content Loading**: ui-core cards can consume markdown content in Next.js, Astro, React Router, and plain React
2. **Preserved Functionality**: Full feature parity with existing Next.js markdown system (frontmatter, remark processing, etc.)
3. **Developer Experience**: Simple, consistent API across frameworks for loading content into cards
4. **Performance**: No performance degradation; efficient content loading patterns for each framework
5. **Type Safety**: Full TypeScript support for content types and card props

## Design Architecture

### Phase 1: Content Abstraction Layer
Create framework-agnostic content interfaces and processing utilities:

```typescript
// packages/ui-core/src/content/types.ts
export interface ContentProvider<T = unknown> {
  loadContent(slug: string, contentType: string): Promise<ContentData<T>>;
  loadAllContent(contentType: string): Promise<ContentMeta<T>[]>;
}

export interface ContentData<T> {
  slug: string;
  frontmatter: T;
  contentHtml?: string;
  rawContent?: string;
}

// packages/ui-core/src/content/processor.ts  
export class ContentProcessor {
  async processMarkdown(content: string): Promise<string> {
    // Framework-agnostic remark/rehype processing
  }
}
```

### Phase 2: Framework Adapters
Implement content providers for each framework:

**Next.js Adapter:**
```typescript
// packages/ui-adapters/nextjs/src/content/NextjsContentProvider.ts
export class NextjsContentProvider implements ContentProvider {
  // Uses existing fs + gray-matter + remark system
  async loadContent(slug: string, contentType: string) {
    return getContentBySlug(contentType, slug);
  }
}
```

**Astro Adapter:**
```typescript  
// packages/ui-adapters/astro/src/content/AstroContentProvider.ts
export class AstroContentProvider implements ContentProvider {
  // Uses Astro content collections
  async loadContent(slug: string, contentType: string) {
    const entry = await getEntry(contentType, slug);
    return {
      slug,
      frontmatter: entry.data,
      contentHtml: await entry.render()
    };
  }
}
```

**React Router Adapter:**
```typescript
// packages/ui-adapters/react-router/src/content/ReactRouterContentProvider.ts
export class ReactRouterContentProvider implements ContentProvider {
  // Uses dynamic imports or bundler plugins
  async loadContent(slug: string, contentType: string) {
    const module = await import(`../content/${contentType}/${slug}.md`);
    return this.processor.process(module.default);
  }
}
```

### Phase 3: Enhanced Card Components
Extend ui-core cards with content loading capabilities:

```typescript
// packages/ui-core/src/components/cards/ArticleCard.tsx (enhanced)
interface ArticleCardProps extends Partial<ArticleContent> {
  // Existing props...
  contentProvider?: ContentProvider<ArticleContent>;
  contentSlug?: string;
  contentType?: string;
}

export function ArticleCard({ 
  contentProvider,
  contentSlug, 
  contentType = 'articles',
  ...hardcodedProps
}: ArticleCardProps) {
  const [content, setContent] = useState<ArticleContent | null>(null);
  
  useEffect(() => {
    if (contentProvider && contentSlug) {
      contentProvider.loadContent(contentSlug, contentType)
        .then(data => setContent(data.frontmatter));
    }
  }, [contentProvider, contentSlug, contentType]);
  
  // Use content or fallback to hardcoded props
  const finalProps = { ...hardcodedProps, ...(content || {}) };
  
  // Render with finalProps...
}
```

### Phase 4: Framework-Specific Wrappers
Create convenient wrapper components for each framework:

**Next.js:**
```typescript
// packages/ui-adapters/nextjs/src/components/ArticleCardWithContent.tsx
export function ArticleCardWithContent({ slug, ...props }: { slug: string } & Partial<ArticleCardProps>) {
  return (
    <ArticleCard 
      contentProvider={nextjsProvider}
      contentSlug={slug}
      ImageComponent={NextImage}
      LinkComponent={NextLink}
      {...props}
    />
  );
}
```

**Astro:**
```typescript
// packages/ui-adapters/astro/src/components/ArticleCardWithContent.tsx
export function ArticleCardWithContent({ slug, ...props }: { slug: string } & Partial<ArticleCardProps>) {
  return (
    <ArticleCard 
      contentProvider={astroProvider}
      contentSlug={slug}
      {...props}
    />
  );
}
```

## Technical Implementation Strategy

### Content Processing Pipeline
1. **Markdown Files**: Framework-specific location (`src/content/`, `content/`, etc.)
2. **Content Provider**: Framework-specific loading mechanism  
3. **Content Processor**: Shared remark/rehype processing (ui-core)
4. **Card Component**: Enhanced ui-core cards with content injection
5. **Framework Wrapper**: Convenient per-framework components

### Dependency Injection Pattern
```typescript
// ui-core cards accept both content and presentation dependencies
interface EnhancedCardProps {
  // Content dependencies
  contentProvider?: ContentProvider;
  contentSlug?: string;
  
  // Presentation dependencies (existing)
  ImageComponent?: ComponentType;
  LinkComponent?: ComponentType;
  
  // Direct props (fallback/override)
  title?: string;
  description?: string;
  // ...
}
```

## Framework-Specific Considerations

### Next.js
- **Strengths**: Server-side processing, filesystem APIs, build-time optimization
- **Approach**: Maintain existing `getContentBySlug` system, wrap in ContentProvider interface
- **Pattern**: Server components load content, pass to client components

### Astro  
- **Strengths**: Content collections, markdown processing, static generation
- **Approach**: Use Astro content collections, leverage built-in markdown processing
- **Pattern**: Content collection queries in Astro components, inject into React islands

### React Router
- **Strengths**: Client-side flexibility, dynamic routing
- **Challenges**: No built-in markdown processing, bundle size considerations  
- **Approach**: Bundler plugins (Vite markdown plugin), dynamic imports, client-side processing
- **Pattern**: Route loaders or component-level async loading

### Plain React
- **Strengths**: Maximum flexibility
- **Challenges**: No built-in markdown system
- **Approach**: Custom build process or runtime markdown processing
- **Pattern**: Similar to React Router, but more manual setup required

## Migration Strategy

### Phase 1: Foundation (1-2 weeks)
- Create content abstractions in ui-core
- Implement shared markdown processor
- Create ContentProvider interface

### Phase 2: Next.js Adapter (1 week)  
- Wrap existing Next.js content system in ContentProvider
- Enhance ui-core cards with content loading
- Create Next.js wrapper components
- Maintain backward compatibility

### Phase 3: Additional Frameworks (2-3 weeks)
- Implement Astro content adapter
- Implement React Router content adapter  
- Test across frameworks
- Documentation and examples

### Phase 4: Optimization (1 week)
- Performance optimization
- Bundle size analysis
- Developer experience improvements

## Risk Mitigation

### Performance Risks
- **Risk**: Client-side markdown processing performance impact
- **Mitigation**: Framework-appropriate processing (SSG where possible, efficient client processing where needed)

### Complexity Risks  
- **Risk**: Over-abstraction leading to difficult debugging
- **Mitigation**: Clear framework-specific examples, preserve direct prop usage as fallback

### Breaking Changes
- **Risk**: Existing Next.js usage disrupted
- **Mitigation**: Additive changes only, maintain existing ContentLoader pattern alongside new system

## Dependencies
- **Prerequisite**: ui-refactor (Phase 2) - ui-core cards with dependency injection
- **Concurrent**: Framework adapter development
- **Blocks**: Template bundling system, multi-framework template distribution

## Success Metrics
1. **Functional Parity**: All existing Next.js markdown functionality preserved
2. **Framework Coverage**: Working content system in Next.js, Astro, React Router  
3. **Performance**: <5% performance overhead from abstraction
4. **Developer Experience**: Single API works across frameworks with framework-specific optimizations
5. **Type Safety**: Zero TypeScript errors, full IntelliSense support

## Future Extensions
- **Rich Content Types**: Video, interactive components in markdown
- **Content Management**: Headless CMS integration
- **Performance**: Advanced caching and preloading strategies
- **Developer Tools**: Content preview, hot reloading across frameworks