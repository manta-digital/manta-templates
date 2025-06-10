# Content Truth - Runtime Markdown Processing Implementation

## Problem Statement

**CRITICAL ISSUE**: The current system is **NOT content-driven** despite appearances:
- Card containers read from static JSON files (`src/data/*.json`)
- Markdown files exist but aren't processed at runtime  
- No mechanism to convert markdown → JSON dynamically
- Templates are unusable for actual content generation
- Build-time processing is explicitly avoided

## Core Technical Challenge

Convert from **Static JSON → Runtime Markdown** processing while maintaining:
1. Server-side markdown processing 
2. Client-side theme support
3. App Router compatibility
4. No build-time preprocessing
5. Clean template structure

## Implementation Plan

### Phase 1: Core Runtime System
- [ ] **Create runtime markdown processor**
  - Create `lib/content.ts` with `getContentBySlug<T>()` and `getAllContent<T>()` functions
  - Use gray-matter + remark + remark-html for processing
  - Support generic content types (projects, features, quotes, videos, demos, blog)
  - Success: Can load any markdown file dynamically by slug and content type

- [ ] **Remove static JSON dependencies**
  - Delete `src/data/features.json`
  - Delete `src/data/projects.json` 
  - Delete `src/data/quotes.json`
  - Delete `src/data/videos.json`
  - Success: No static JSON files remain in codebase

- [ ] **Create content directory structure**
  - Ensure `content/projects/` exists with sample markdown
  - Ensure `content/features/` exists with sample markdown
  - Ensure `content/quotes/` exists with sample markdown
  - Ensure `content/videos/` exists with sample markdown
  - Create `content/demos/` for ThreeJS content
  - Create `content/blog/` for blog content
  - Success: All content types have sample markdown files

### Phase 2: Container Updates
- [ ] **Update ProjectCardContainer for runtime processing**
  - Replace static JSON loading with `getContentBySlug<ProjectContent>('projects', slug)`
  - Define `ProjectContent` interface with proper typing
  - Handle displayMode switching (standard vs feature)
  - Add error handling for missing content
  - Success: ProjectCardContainer reads from markdown at runtime

- [ ] **Update FeatureCardContainer for runtime processing**
  - Replace static JSON loading with `getContentBySlug<FeatureContent>('features', slug)`
  - Define `FeatureContent` interface with proper typing
  - Handle category switching (guides, coming-soon, project)
  - Add error handling for missing content
  - Success: FeatureCardContainer reads from markdown at runtime

- [ ] **Update QuoteCardContainer for runtime processing**
  - Replace static JSON loading with `getContentBySlug<QuoteContent>('quotes', slug)`
  - Define `QuoteContent` interface with proper typing
  - Add error handling for missing content
  - Success: QuoteCardContainer reads from markdown at runtime

- [ ] **Update VideoCardContainer for runtime processing**
  - Replace static JSON loading with `getContentBySlug<VideoContent>('videos', slug)`
  - Define `VideoContent` interface with proper typing
  - Handle displayMode switching (thumbnail, player, background)
  - Add error handling for missing content
  - Success: VideoCardContainer reads from markdown at runtime

- [ ] **Create BlogCardContainer with runtime processing**
  - Create new `BlogCardContainer` component
  - Implement `getContentBySlug<BlogContent>('blog', slug)` loading
  - Define `BlogContent` interface with proper typing
  - Handle different blog card variants (BlogCard, BlogCardImage, BlogCardWide, BlogHeroCard)
  - Add error handling for missing content
  - Success: BlogCardContainer exists and reads from markdown at runtime

- [ ] **Create ThreeJSCardContainer with runtime processing**
  - Create new `ThreeJSCardContainer` component
  - Implement `getContentBySlug<DemoContent>('demos', slug)` loading
  - Define `DemoContent` interface for ThreeJS configuration
  - Pass configuration to ThreeJSCard component
  - Add error handling for missing content
  - Success: ThreeJSCard can be configured via markdown content

### Phase 3: Page Architecture
- [ ] **Convert page.tsx to server component**
  - Remove "use client" directive from `app/page.tsx`
  - Ensure all card containers are called as async server components
  - Test that markdown processing works server-side
  - Success: page.tsx is server component loading markdown

- [ ] **Create ClientThemeWrapper component**
  - Create `components/client-theme-wrapper.tsx` as client component
  - Move ThemeProvider and Layout into wrapper
  - Import and use in page.tsx
  - Success: Themes work with server-side markdown processing

- [ ] **Update all card usage to use containers**
  - Replace direct ProjectCard usage with ProjectCardContainer
  - Replace direct BlogCard usage with BlogCardContainer  
  - Replace direct ThreeJSCard usage with ThreeJSCardContainer
  - Ensure all cards on page use container pattern
  - Success: No hardcoded card content on any page

### Phase 4: Workspace Configuration
- [ ] **Update root package.json workspace scripts**
  - Add `"workspaces": ["templates/nextjs", "landing"]`
  - Add `"install:all": "pnpm install"` script
  - Add `"build": "pnpm -r build"` script
  - Add `"build:template": "pnpm --filter manta-template-next build"` script
  - Add `"build:landing": "pnpm --filter manta-landing build"` script
  - Add `"dev:template": "pnpm --filter manta-template-next dev"` script
  - Add `"dev:landing": "pnpm --filter manta-landing dev"` script
  - Success: Can build and dev both workspaces from root

- [ ] **Configure landing workspace properly**
  - Update `landing/package.json` with correct name: `"manta-landing"`
  - Set different port for landing dev server: `--port 3001`
  - Ensure private: true
  - Success: Landing workspace builds and runs independently

- [ ] **Test monorepo build processes**
  - Run `pnpm install:all` from root
  - Run `pnpm build` from root
  - Run `pnpm dev:template` and `pnpm dev:landing` from root
  - Verify both workspaces work independently
  - Success: Complete monorepo workflow functions

## Success Criteria

1. **No static JSON files** - All content loaded from markdown at runtime
2. **Runtime processing** - No build-time preprocessing required
3. **Theme support** - Client-side themes work with server-side markdown
4. **All cards content-driven** - Every card uses container + markdown pattern
5. **Monorepo builds** - Both template and landing build/dev properly
6. **Templates usable** - Developers can add content by creating markdown files

## Technical Notes

### Content Processing Flow
```typescript
// Runtime flow (no build-time processing)
markdown file → gray-matter → frontmatter + content → remark → HTML → React component
```

### Server/Client Architecture
```typescript
// Server Component (markdown processing)
page.tsx → CardContainer → getContentBySlug() → markdown → component

// Client Component (themes only)  
ClientThemeWrapper → ThemeProvider → children
```

### Content Interface Examples
```typescript
interface ProjectContent {
  title: string
  description: string
  techStack: string[]
  repoUrl?: string
  demoUrl?: string
  displayMode?: 'standard' | 'feature'
  features?: Array<{ icon?: string; label: string }>
}

interface FeatureContent {
  title: string
  description: string
  category: 'guides' | 'coming-soon' | 'project'
  status: 'available' | 'coming-soon' | 'beta'
  features?: Array<{ icon: string; label: string }>
  links?: Array<{ label: string; url: string; type: 'primary' | 'secondary' }>
}
