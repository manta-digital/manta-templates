# Migration Guide: Content Loading System

This guide helps you migrate from the existing Next.js content system to the new framework-agnostic content loading system with the Next.js adapter.

## Overview of Changes

The new system maintains **100% backward compatibility** while adding powerful new content loading capabilities:

- ✅ **Existing code continues working unchanged**
- ✅ **Gradual migration - migrate one component at a time**
- ✅ **Same content files, enhanced loading capabilities**
- ✅ **Better TypeScript support and error handling**

## Migration Scenarios

### Scenario 1: Basic ArticleCard Usage

**Before (still works):**
```tsx
import { ArticleCard } from '@manta-templates/ui-core';

<ArticleCard
  title="My Article"
  description="Article description"
  image="/images/hero.jpg"
  ImageComponent={Image}
  LinkComponent={Link}
/>
```

**After (optional upgrade):**
```tsx
import { ArticleCardWithContent } from '@manta-templates/ui-adapters-nextjs';

<ArticleCardWithContent
  slug="my-article"
  contentType="articles"
/>
```

**Benefits of upgrading:**
- Content managed in markdown files
- Automatic content loading
- Better content organization
- Server-side optimization available

### Scenario 2: Content Loading Pattern

**Before:**
```tsx
// In your page component
import { getContentBySlug } from '@/lib/content';
import { ArticleCard } from '@manta-templates/ui-core';

export default async function BlogPage() {
  const content = await getContentBySlug('intro-article', 'blog');
  
  return (
    <ArticleCard
      title={content.title}
      description={content.description}
      image={content.image}
      ImageComponent={Image}
      LinkComponent={Link}
    />
  );
}
```

**After:**
```tsx
import { ArticleCardServerContent } from '@manta-templates/ui-adapters-nextjs';

export default function BlogPage() {
  return (
    <ArticleCardServerContent
      slug="intro-article"
      contentType="blog"
    />
  );
}
```

**Benefits:**
- Much less boilerplate code
- Automatic error handling
- Built-in loading states
- Consistent content loading across components

### Scenario 3: Multiple Cards with Content

**Before:**
```tsx
export default async function HomePage() {
  const [article1, article2, article3] = await Promise.all([
    getContentBySlug('featured-1', 'articles'),
    getContentBySlug('featured-2', 'articles'), 
    getContentBySlug('featured-3', 'articles')
  ]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <ArticleCard
        title={article1.title}
        description={article1.description}
        image={article1.image}
        ImageComponent={Image}
        LinkComponent={Link}
      />
      <ArticleCard
        title={article2.title}
        description={article2.description}
        image={article2.image}
        ImageComponent={Image}
        LinkComponent={Link}
      />
      <ArticleCard
        title={article3.title}
        description={article3.description}
        image={article3.image}
        ImageComponent={Image}
        LinkComponent={Link}
      />
    </div>
  );
}
```

**After:**
```tsx
import { ArticleCardServerContent } from '@manta-templates/ui-adapters-nextjs';

export default function HomePage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <ArticleCardServerContent slug="featured-1" contentType="articles" />
      <ArticleCardServerContent slug="featured-2" contentType="articles" />
      <ArticleCardServerContent slug="featured-3" contentType="articles" />
    </div>
  );
}
```

**Benefits:**
- 90% less code
- Automatic parallel loading
- Built-in error handling for each card
- Easier to maintain and modify

## Step-by-Step Migration Process

### Step 1: Install the Adapter Package

```bash
pnpm add @manta-templates/ui-adapters-nextjs
```

### Step 2: Choose Your Migration Strategy

**Strategy A: Gradual Migration (Recommended)**
- Keep existing components working as-is
- Migrate new components to use the adapter
- Gradually migrate existing components when convenient

**Strategy B: Complete Migration**
- Migrate all components at once
- Remove old content loading code
- Standardize on new system

### Step 3: Migrate Component by Component

For each component you want to migrate:

1. **Identify the current pattern:**
   - Does it use `getContentBySlug`?
   - Does it have hardcoded props?
   - Is it server-side or client-side?

2. **Choose the appropriate new component:**
   - `ArticleCardWithContent` for client-side loading
   - `ArticleCardServerContent` for server-side loading
   - Keep `ArticleCard` for purely hardcoded content

3. **Update the import and usage:**
   ```tsx
   // Replace this
   import { ArticleCard } from '@manta-templates/ui-core';
   
   // With this
   import { ArticleCardWithContent } from '@manta-templates/ui-adapters-nextjs';
   ```

4. **Remove old content loading code:**
   - Remove `getContentBySlug` calls
   - Remove manual content prop spreading
   - Simplify component logic

### Step 4: Update Content Organization (Optional)

The new system works with your existing content structure, but you can optionally reorganize for better clarity:

**Current structure (works fine):**
```
src/content/
  blog-post-1.md
  blog-post-2.md
  article-1.md
  article-2.md
```

**Recommended structure:**
```
src/content/
  blog/
    post-1.md
    post-2.md
  articles/
    article-1.md
    article-2.md
  main-grid/
    header.md
    featured.md
```

### Step 5: Test and Validate

After migrating each component:

1. **Visual testing:** Ensure the component looks identical
2. **Functional testing:** Test content loading and error states  
3. **Performance testing:** Verify server-side loading works correctly
4. **TypeScript checking:** Ensure no type errors

## Common Migration Issues

### Issue 1: Import Errors

**Problem:**
```
Module '@manta-templates/ui-adapters-nextjs' not found
```

**Solution:**
```bash
pnpm install @manta-templates/ui-adapters-nextjs
```

### Issue 2: Content Not Loading

**Problem:** Component shows empty or doesn't load content

**Solutions:**
- Check that content files exist in the expected directory
- Verify slug matches filename (without .md extension)
- Check contentType matches directory name
- Look for console errors in development

### Issue 3: TypeScript Errors

**Problem:** Type errors after migration

**Solution:**
- Import types from the adapter package:
  ```tsx
  import type { ArticleContent } from '@manta-templates/ui-adapters-nextjs';
  ```
- Use proper generic types for custom content providers

### Issue 4: Image Loading Issues

**Problem:** Images not loading correctly

**Solutions:**
- Ensure image paths in markdown are correct
- Use Next.js public directory for static images
- Configure imageProps if needed:
  ```tsx
  <ArticleCardWithContent 
    slug="my-article"
    imageProps={{ priority: true }}
  />
  ```

## Performance Considerations

### Server-Side vs Client-Side Loading

**Server-Side (Recommended for SEO):**
```tsx
// Loads content at build time / request time
<ArticleCardServerContent slug="article" />
```

**Client-Side (For Dynamic Content):**
```tsx
// Loads content after component mounts
<ArticleCardWithContent slug="article" />
```

### Caching

The new system includes automatic caching:
- **Content caching:** Prevents redundant file reads
- **Processing caching:** Markdown is only processed once
- **Build-time optimization:** Server components pre-load at build time

## Rollback Strategy

If you need to rollback a migration:

1. **Revert the import:**
   ```tsx
   // Change back from
   import { ArticleCardWithContent } from '@manta-templates/ui-adapters-nextjs';
   
   // To
   import { ArticleCard } from '@manta-templates/ui-core';
   ```

2. **Restore content loading code:**
   ```tsx
   // Re-add content loading logic
   const content = await getContentBySlug(slug, contentType);
   ```

3. **Update component props:**
   ```tsx
   <ArticleCard
     title={content.title}
     description={content.description}
     // ... other props
   />
   ```

## Next Steps

After successful migration:

1. **Remove unused code:** Clean up old content loading utilities if no longer needed
2. **Optimize content structure:** Organize content files by type for better maintainability
3. **Explore advanced features:** Custom content providers, error handling, loading states
4. **Consider other frameworks:** The same content can be used with Astro, React Router, etc.

## Support

If you encounter issues during migration:

1. Check the component documentation in the adapter package README
2. Look at the examples in `templates/nextjs/examples/`
3. Review the implementation in the test page at `/test-extracted`
4. Check console errors in development mode for debugging information