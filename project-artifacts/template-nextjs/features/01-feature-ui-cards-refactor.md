# Architecture: UI-Core + UI-Adapters Content Loading System

Role: Technical Fellow  
Project Guide: `project-documents/project-guides/guide.ai-project.00-process.md`  
Status: **ACTIVE** - Current migration architecture

## Architecture Overview

The manta-templates monorepo uses a 3-layer architecture for UI components and content loading:

### **Layer 1: UI-Core (`@manta-templates/ui-core`)**
**Purpose**: Framework-agnostic React components with dependency injection  
**Location**: `packages/ui-core/src/`

- **Components**: All cards, layouts, primitives (BaseCard, QuoteCard, ArticleCard, etc.)
- **Content System**: Framework-agnostic interfaces and base classes
  - `ContentProvider<T>` interface - standardized content loading contract
  - `BaseContentProvider<T>` - abstract base with retry logic, caching, validation
  - Content types: `ContentData<T>`, `ContentMeta<T>` with type-safe frontmatter
- **Dependency Injection**: Components accept `ImageComponent`, `LinkComponent` props
- **No Framework Dependencies**: No Next.js, no filesystem access, no direct markdown processing

### **Layer 2: UI-Adapters (`@manta-templates/ui-adapters-nextjs`)**  
**Purpose**: Framework-specific content providers implementing ui-core interfaces  
**Location**: `packages/ui-adapters/nextjs/src/`

- **NextjsContentProvider**: Extends `BaseContentProvider` from ui-core
- **Features**: Filesystem-based markdown loading, server-side caching, content processing
- **Pipeline**: Full markdown processing with rehype-pretty-code, syntax highlighting
- **Compatibility**: Works with Next.js patterns (cwd-relative paths, server components)

### **Layer 3: Template (`templates/nextjs`)**
**Purpose**: Next.js application consuming ui-core components with ui-adapters content  
**Location**: `templates/nextjs/src/`

- **Component Usage**: Imports from `@manta-templates/ui-core` with dependency injection
- **Content Loading**: Uses `nextjsContentProvider.loadContent()` from ui-adapters
- **Dependency Injection**: Passes `Image` (Next.js), `Link` (Next.js), icons to ui-core components

## Content Loading Pattern

### **Recommended Pattern** ✅
```typescript
import { QuoteCard } from '@manta-templates/ui-core';
import { nextjsQuoteContentProvider } from '@manta-templates/ui-adapters-nextjs';

export default async function Page() {
  // Load content using ui-adapters
  let quoteContent = null;
  try {
    const quote = await nextjsQuoteContentProvider.loadContent('sample-quote', 'quotes');
    quoteContent = quote.frontmatter;
  } catch (error: unknown) {
    console.error('Error loading quote content:', error);
  }

  return (
    <main>
      {quoteContent && <QuoteCard content={quoteContent} />}
    </main>
  );
}
```

### **Legacy Pattern** ❌ (Being Migrated)
```typescript
import QuoteCard from '@/components/cards/QuoteCard';           // LOCAL IMPORT
import { getContentBySlug } from '@/lib/content';              // LEGACY LOADER
```

## Migration Strategy

### **Current State**
- **ui-core**: ✅ Complete - All components migrated with dependency injection
- **ui-adapters**: ✅ Complete - NextjsContentProvider with full markdown processing
- **Template Migration**: 🔄 In Progress - Replacing local imports with ui-core + ui-adapters

### **Key Benefits**
1. **Separation of Concerns**: UI components, content loading, framework integration are separate
2. **Type Safety**: Generic frontmatter types with Zod validation  
3. **Framework Agnostic**: ui-core can work with any React framework
4. **Performance**: Server-side content loading with caching
5. **Maintainability**: Single source of truth for components and content interfaces

### **Component Dependency Injection**
All ui-core components use dependency injection for framework-specific features:

```typescript
// Required injections vary by component
<ArticleCard 
  ImageComponent={Image}      // Next.js Image
  LinkComponent={Link}        // Next.js Link
  content={articleContent}
/>

<AboutCard
  ImageComponent={Image}
  LinkComponent={Link}  
  socialIcons={{ Github, Linkedin, Mail, X }}  // Lucide icons
  content={aboutContent}
/>
```

### **Content Schema**
Updated schema supports both legacy and new field names:
- **Legacy**: `description`, `pubDate`, `image`, `author`
- **New**: `excerpt`, `publishedAt`, `coverImage` 
- **Validation**: Requires at least one from each group

## Implementation Status

### ✅ **Completed**
- UI-core component library with dependency injection
- UI-adapters NextjsContentProvider with full markdown pipeline  
- Homepage migration (app/page.tsx) using new pattern
- Updated ArticleSchema with author field and backward compatibility

### 🔄 **In Progress** 
- **Task 2.01**: Fix test-example-2 content loading (mixed patterns)
- **Task 2.1**: Complete app router pages migration
- **Task 2.2**: Header/Footer migration with content loading

### 📋 **Acceptance Criteria**
- No `@/components/*` imports in template (use `@manta-templates/ui-core`)
- No direct `@/lib/content` usage (use ui-adapters providers)
- All ui-core components have proper dependency injection
- Build green, functionality identical to pre-migration
