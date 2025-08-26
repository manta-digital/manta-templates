# Next.js UI Adapter

Next.js adapter for manta-templates ui-core content system. Provides seamless integration between ui-core components and Next.js-specific features like optimized images, link prefetching, and filesystem-based content loading.

## Installation

```bash
pnpm add @manta-templates/ui-adapters-nextjs
```

## Quick Start

### Basic Content Loading

```tsx
import { ArticleCardWithContent } from '@manta-templates/ui-adapters-nextjs';

export default function MyPage() {
  return (
    <ArticleCardWithContent 
      slug="my-article"
      contentType="articles"
    />
  );
}
```

### With Fallback Props

```tsx
import { ArticleCardWithContent } from '@manta-templates/ui-adapters-nextjs';

export default function MyPage() {
  return (
    <ArticleCardWithContent 
      slug="my-article"
      contentType="articles"
      title="Fallback Title"
      description="Used if content loading fails"
    />
  );
}
```

## Content Loading Patterns

### Pattern 1: Pure Content Loading
Load all content from markdown files:

```tsx
<ArticleCardWithContent slug="intro-to-react" />
```

### Pattern 2: Content + Prop Overrides
Load content but override specific properties:

```tsx
<ArticleCardWithContent 
  slug="intro-to-react"
  title="Custom Title Override"
  className="my-custom-class"
/>
```

### Pattern 3: Fallback Props
Provide fallbacks for when content loading fails:

```tsx
<ArticleCardWithContent 
  slug="might-not-exist"
  title="Fallback Title"
  description="Fallback description"
/>
```

### Pattern 4: Server-Side Loading
Pre-load content on the server for optimal performance:

```tsx
import { ArticleCardServerContent, preloadArticleContent } from '@manta-templates/ui-adapters-nextjs';

// In your page component
export default async function MyPage() {
  return (
    <ArticleCardServerContent 
      slug="my-article"
      contentType="articles"
    />
  );
}

// Or preload for use elsewhere
export async function generateStaticProps() {
  const content = await preloadArticleContent('my-article', 'articles');
  return { props: { content } };
}
```

## Content Structure

Your markdown files should be placed in `src/content/` with the following structure:

```
src/
  content/
    articles/
      intro-to-react.md
      advanced-patterns.md
    blog/
      my-blog-post.md
    main-grid/
      header.md
      featured-article.md
```

### Markdown File Format

```markdown
---
title: "My Article Title"
description: "Brief description of the article"
image: "/images/article-hero.jpg"
pubDate: "2024-01-15"
author: "Your Name"
tags: ["react", "javascript"]
---

# Article Content

Your markdown content here...
```

## Component API

### ArticleCardWithContent

Client-side component with content loading:

```tsx
interface ArticleCardWithContentProps {
  slug: string;                    // Content file name (without .md)
  contentType?: string;            // Content directory (default: 'main-grid')
  className?: string;              // CSS classes
  href?: string;                   // Link destination
  motionProps?: MotionProps;       // Framer Motion animation props
  
  // Content overrides (these override loaded content)
  title?: string;
  subtitle?: string; 
  description?: string;
  image?: string;
  
  // Next.js specific
  imageProps?: Record<string, unknown>;  // Props passed to Next.js Image
  ImageComponent?: ComponentType;        // Override Image component
  LinkComponent?: ComponentType;         // Override Link component
  
  // Loading states
  showLoadingIndicator?: boolean;
  LoadingComponent?: ComponentType;
  ErrorComponent?: ComponentType<{ error: Error; retry: () => void }>;
}
```

### ArticleCardServerContent

Server component for SSR/SSG:

```tsx
interface ArticleCardServerContentProps {
  slug: string;
  contentType?: string;
  // ... same props as ArticleCardWithContent
}
```

## Advanced Usage

### Custom Content Provider

```tsx
import { NextjsContentProvider } from '@manta-templates/ui-adapters-nextjs';

const customProvider = new NextjsContentProvider({
  contentRoot: '/custom/path',
  enableCaching: true,
  codeTheme: 'dracula'
});

<ArticleCard 
  contentProvider={customProvider}
  contentSlug="my-article"
  contentType="custom"
/>
```

### TypeScript Support

Full TypeScript support with proper type inference:

```tsx
import type { ArticleContent, NextjsArticleContent } from '@manta-templates/ui-adapters-nextjs';

// ArticleContent for basic article props
interface MyArticleProps extends ArticleContent {
  customField?: string;
}

// NextjsArticleContent includes Next.js specific fields
const article: NextjsArticleContent = {
  title: "My Article",
  description: "Article description", 
  pubDate: "2024-01-15",
  author: "Author Name",
  tags: ["react", "nextjs"]
};
```

### Error Handling

```tsx
function CustomErrorComponent({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="error-state">
      <p>Failed to load content: {error.message}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
}

<ArticleCardWithContent 
  slug="my-article"
  ErrorComponent={CustomErrorComponent}
/>
```

## Performance Optimization

### Image Optimization

Next.js Image props are automatically configured for optimal performance:

```tsx
// Default props applied:
{
  fill: true,
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  style: { objectFit: 'cover' }
}

// Override as needed:
<ArticleCardWithContent 
  slug="my-article"
  imageProps={{
    priority: true,
    sizes: '50vw'
  }}
/>
```

### Content Caching

Content is automatically cached to improve performance:

```tsx
// Caching is enabled by default
const provider = new NextjsContentProvider({
  enableCaching: true  // default: true
});
```

### Static Generation

Use server components for optimal static generation:

```tsx
// This pre-loads content at build time
export default async function StaticPage() {
  return (
    <ArticleCardServerContent 
      slug="static-content"
      contentType="articles"
    />
  );
}
```

## Migration Guide

### From Direct Content Usage

**Before:**
```tsx
import { getContentBySlug } from '../lib/content';

export default async function Page() {
  const content = await getContentBySlug('my-article', 'articles');
  return (
    <ArticleCard 
      title={content.title}
      description={content.description}
    />
  );
}
```

**After:**
```tsx
import { ArticleCardServerContent } from '@manta-templates/ui-adapters-nextjs';

export default function Page() {
  return (
    <ArticleCardServerContent 
      slug="my-article"
      contentType="articles"
    />
  );
}
```

## Token Interpolation

The NextJS adapter includes a powerful token interpolation system for dynamic content replacement.

### Token Format

Use double curly braces in your markdown content:
```markdown
---
title: Privacy Policy
---

Last updated: {{copyright.lastUpdated}}
Contact us at {{contacts.primaryEmail}} for questions about {{site.name}}.
```

### Supported Tokens

| Token | Description | Example Value |
|-------|-------------|---------------|
| `{{site.name}}` | Site name | "My Website" |
| `{{site.url}}` | Site URL | "https://example.com" |
| `{{author.name}}` | Author/owner name | "John Doe" |
| `{{contacts.primaryEmail}}` | Primary contact email | "info@example.com" |
| `{{contacts.businessEmail}}` | Business email | "business@example.com" |
| `{{contacts.supportEmail}}` | Support email | "support@example.com" |
| `{{copyright.year}}` | Copyright year | "2025" |
| `{{copyright.lastUpdated}}` | Last updated year | "2025" |
| `{{copyright.holder}}` | Copyright holder | "John Doe" |

### Usage with Content Loading

```tsx
import { nextjsContentProvider, NextjsTokenProvider } from '@manta-templates/ui-adapters-nextjs';
import { siteConfig } from '@/content/site.config';

// Enable token interpolation
const content = await nextjsContentProvider.loadContent('legal', 'legal/presets/mit', {
  tokenConfig: {
    enableTokens: true,
    tokenProvider: new NextjsTokenProvider(siteConfig)
  }
});
```

### Site Config Structure

Your `site.config.ts` should include:
```tsx
export const siteConfig = {
  site: {
    name: "Your Site Name",
    url: "https://yoursite.com",
    domain: "yoursite.com" // Optional, derived from URL if not provided
  },
  author: {
    name: "Your Name"
  },
  contacts: {
    primaryEmail: "info@yoursite.com",    // Optional
    businessEmail: "business@yoursite.com", // Optional  
    supportEmail: "support@yoursite.com"  // Optional
  },
  copyright: {
    year: "2025" // Optional, uses current year if not provided
  }
};
```

### Legal Content System

The adapter includes pre-built legal content with token interpolation:

```
packages/ui-adapters/nextjs/src/content/legal/
├── default/           # Default legal templates
│   ├── legal.md
│   ├── privacy.md
│   ├── terms.md
│   └── cookies.md
└── presets/
    └── mit/          # MIT-style legal templates
        ├── legal.md
        ├── privacy.md
        ├── terms.md
        └── cookies.md
```

Load legal content with tokens:
```tsx
const content = await nextjsContentProvider.loadContent<PrivacyContent>(
  'privacy', 
  'legal/presets/mit', 
  {
    tokenConfig: {
      enableTokens: true,
      tokenProvider: new NextjsTokenProvider(siteConfig)
    }
  }
);
```

## Troubleshooting

### Common Issues

1. **Content not loading**: Ensure your markdown files are in the correct directory structure under `src/content/`

2. **Token not replacing**: Check that token syntax uses double curly braces `{{token.name}}` and that `enableTokens: true` is set

3. **Type errors**: Make sure you're importing types from the adapter package:
   ```tsx
   import type { ArticleContent } from '@manta-templates/ui-adapters-nextjs';
   ```

4. **Build errors**: Ensure you have the correct peer dependencies installed:
   ```bash
   pnpm add next react react-dom @manta-templates/ui-core
   ```

5. **Images not optimizing**: Check that your image paths are correct and accessible from the public directory

### Debug Mode

Enable debug logging in development:

```tsx
// Check browser console for token replacement warnings
// Missing tokens will show: "Token 'token.name' has null/undefined value, skipping"
```