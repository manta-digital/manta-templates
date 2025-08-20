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

### Phase 3: Content System Testing Framework

Before enhancing card components with content loading, establish a comprehensive testing framework to validate the content management system across different scenarios and deployment contexts.

#### Testing Strategy Overview

**Content Source Architecture:**
- **Template Development**: Content stored in `templates/nextjs/src/content/` for monorepo testing
- **Template Instance Deployment**: Content stored in `src/content/` for end-user projects
- **Test Integration**: Examples use relative content paths to demonstrate real-world usage patterns

#### Content Directory Structure

```
templates/nextjs/src/content/
├── articles/           # Blog posts and articles
│   ├── sample-post.md
│   └── theme-guide.md
├── projects/          # Project case studies
│   ├── semantic-colors.md
│   └── ui-core-refactor.md
├── quotes/            # Quote content
│   └── design-philosophy.md
└── example-2/         # Test-specific content
    ├── carousel-items.md
    ├── featured-content.md
    └── grid-samples.md
```

#### Template Instance Content Mapping

For deployed template instances, content structure maps as:
```
src/content/           # User's content directory
├── articles/
├── projects/
├── quotes/
└── [custom-collections]/
```

#### Test Implementation Plan

**Phase 3.1: Content-Driven Test Example**
Transform `templates/nextjs/src/app/test-example-2/` to use markdown content:

```typescript
// templates/nextjs/src/app/test-example-2/page.tsx (enhanced)
import { getContentBySlug, getAllContent } from '@/lib/content';

export default async function TestExample2Page() {
  // Load content for carousel items
  const carouselItems = await getAllContent('example-2');
  
  // Load featured article
  const featuredArticle = await getContentBySlug('articles', 'theme-guide');
  
  // Load quote
  const designQuote = await getContentBySlug('quotes', 'design-philosophy');
  
  return (
    <main className="min-h-screen p-6 md:p-10">
      <BentoLayout>
        {/* Content-driven carousel */}
        <GridItem>
          <CardCarousel>
            {carouselItems.map(item => (
              <BlogCardImage
                key={item.slug}
                title={item.frontmatter.title}
                excerpt={item.frontmatter.excerpt}
                coverImageUrl={item.frontmatter.coverImage}
                slug={`/content/${item.slug}`}
              />
            ))}
          </CardCarousel>
        </GridItem>
        
        {/* Content-driven featured article */}
        <GridItem>
          <BlogCardImage
            title={featuredArticle.frontmatter.title}
            excerpt={featuredArticle.frontmatter.excerpt}
            coverImageUrl={featuredArticle.frontmatter.coverImage}
          />
        </GridItem>
        
        {/* Content-driven quote */}
        <GridItem>
          <QuoteCard
            quote={designQuote.frontmatter.quote}
            author={designQuote.frontmatter.author}
          />
        </GridItem>
      </BentoLayout>
    </main>
  );
}
```

**Phase 3.2: Content Schema Validation**
Define and validate content schemas for different content types:

```typescript
// templates/nextjs/src/lib/content/schemas.ts
import { z } from 'zod';

export const ArticleSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  coverImage: z.string(),
  publishedAt: z.string().transform(str => new Date(str)),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional()
});

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  image: z.string(),
  repoUrl: z.string().url(),
  features: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    color: z.string().optional()
  }))
});

export const QuoteSchema = z.object({
  quote: z.string(),
  author: z.string(),
  context: z.string().optional()
});
```

**Phase 3.3: Content Loading Integration**
Implement content loading that works in both template development and instance deployment:

```typescript
// templates/nextjs/src/lib/content/loader.ts
import { join } from 'path';
import { ContentProvider } from '@manta-templates/ui-core';

export class NextjsContentProvider implements ContentProvider {
  private contentPath: string;
  
  constructor() {
    // Adapt to template vs instance context
    this.contentPath = process.env.NODE_ENV === 'development' 
      ? join(process.cwd(), 'src/content')
      : join(process.cwd(), 'src/content');
  }
  
  async loadContent(slug: string, contentType: string) {
    const filePath = join(this.contentPath, contentType, `${slug}.md`);
    // Implementation details...
  }
}
```

**Phase 3.4: Testing Coverage Matrix**

| Test Scenario | Content Source | Framework | Expected Behavior |
|---------------|----------------|-----------|-------------------|
| Template Development | `templates/nextjs/src/content/` | Next.js | Cards load from monorepo content |
| Instance Deployment | `src/content/` | Next.js | Cards load from user content |
| Content Validation | Both | Next.js | Schema validation passes |
| Missing Content | Both | Next.js | Graceful fallback to hardcoded props |
| Invalid Frontmatter | Both | Next.js | Error handling with dev feedback |

#### Success Criteria for Phase 3

1. **Content Integration**: `test-example-2` successfully loads all content from markdown files
2. **Path Resolution**: Content loading works in both template development and instance contexts
3. **Schema Validation**: All content types validate against defined schemas
4. **Error Handling**: Missing or invalid content degrades gracefully
5. **Developer Experience**: Clear error messages for content issues during development
6. **Performance**: Content loading doesn't impact page performance significantly

#### Content Files Required

**Core Content Files:**
```markdown
# templates/nextjs/src/content/example-2/carousel-hero.md
---
title: "Semantic Design System"
excerpt: "Building consistent user experiences with design tokens"
coverImage: "/image/blog-sample-image.png"
type: "article"
---

# templates/nextjs/src/content/articles/theme-guide.md
---
title: "Colors and Themes"
excerpt: "Radix scales with semantic aliasing and palette switching"
coverImage: "/image/blog-sample-image.png"
featured: true
---

# templates/nextjs/src/content/quotes/design-philosophy.md
---
quote: "Make the easy path the right path—semantic tokens everywhere."
author: "Manta Templates"
context: "Design system principles"
---
```

#### Migration Path for Users

When users deploy a template instance:
1. Content is already positioned at `src/content/` in the deployed template
2. All relative imports and content loading work seamlessly
3. Users can modify content without touching component code
4. Clear documentation guides content organization

This testing phase validates that the content system works reliably before implementing the full framework-agnostic abstraction layer.

### Phase 4: Enhanced Card Components
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

### Phase 5: Framework-Specific Wrappers
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

### Phase 3: Content System Testing (1 week)
- Create comprehensive testing framework for content management
- Transform test-example-2 to use markdown content
- Implement content schema validation
- Test content loading in both template and instance contexts

### Phase 4: Additional Frameworks (2-3 weeks)
- Implement Astro content adapter
- Implement React Router content adapter  
- Test across frameworks
- Documentation and examples

### Phase 5: Optimization (1 week)
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