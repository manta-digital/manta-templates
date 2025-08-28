/**
 * Content Loading Examples
 * 
 * Comprehensive examples showing how to use the Next.js adapter package
 * for content loading with ArticleCard components.
 * 
 * Run this file with: npx tsx examples/content-loading-examples.tsx
 */

import React from 'react';
// Current pattern: Direct dependency injection with ui-core components
// import { ArticleCard } from '@manta-templates/ui-core';
// import Image from 'next/image';
// import Link from 'next/link';

// For now, showing the imports and usage patterns as comments/examples

export function ContentLoadingExamples() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Content Loading Examples</h1>

      {/* Example 1: Basic Content Loading */}
      <section className="border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Basic Content Loading</h2>
        <p className="text-gray-600 mb-4">
          Load content directly from markdown files in src/content/
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-mono text-sm text-gray-500 mb-2">Code:</h3>
          <pre className="text-sm">
{`<ArticleCardWithContent 
  slug="intro-article"
  contentType="articles"
/>`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <h3 className="font-mono text-sm text-gray-500 mb-2">Expected markdown file:</h3>
          <code className="text-sm">src/content/articles/intro-article.md</code>
        </div>
      </section>

      {/* Example 2: Content with Fallbacks */}
      <section className="border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Content Loading with Fallbacks</h2>
        <p className="text-gray-600 mb-4">
          Provide fallback values for when content loading fails
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm">
{`<ArticleCardWithContent 
  slug="might-not-exist"
  contentType="articles"
  title="Fallback Title"
  description="This appears if content loading fails"
  className="my-custom-class"
/>`}
          </pre>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mt-4">
          <p className="text-sm"><strong>Behavior:</strong> Attempts to load content, falls back to provided props if loading fails</p>
        </div>
      </section>

      {/* Example 3: Content with Overrides */}
      <section className="border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Content Loading with Prop Overrides</h2>
        <p className="text-gray-600 mb-4">
          Load content but override specific properties
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm">
{`<ArticleCardWithContent 
  slug="intro-article"
  contentType="articles"
  title="Custom Override Title"
  className="special-styling"
/>`}
          </pre>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mt-4">
          <p className="text-sm"><strong>Behavior:</strong> Loads content from markdown, but uses "Custom Override Title" instead of markdown title</p>
        </div>
      </section>

      {/* Example 4: Server-Side Loading */}
      <section className="border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Server-Side Content Loading</h2>
        <p className="text-gray-600 mb-4">
          Pre-load content on the server for optimal performance and SEO
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-mono text-sm text-gray-500 mb-2">Server Component (app/my-page/page.tsx):</h3>
          <pre className="text-sm">
{`export default async function MyPage() {
  return (
    <ArticleCardServerContent 
      slug="featured-article"
      contentType="main-grid"
    />
  );
}`}
          </pre>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg mt-4">
          <p className="text-sm"><strong>Benefits:</strong> Content loaded at build time, better SEO, faster initial page load</p>
        </div>
      </section>

      {/* Example 5: Custom Image Props */}
      <section className="border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Next.js Image Optimization</h2>
        <p className="text-gray-600 mb-4">
          Customize Next.js Image component behavior
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm">
{`<ArticleCardWithContent 
  slug="hero-article"
  contentType="featured"
  imageProps={{
    priority: true,
    sizes: "100vw",
    quality: 90
  }}
/>`}
          </pre>
        </div>
      </section>

      {/* Example 6: Error Handling */}
      <section className="border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Custom Error Handling</h2>
        <p className="text-gray-600 mb-4">
          Handle content loading errors gracefully
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm">
{`function CustomErrorComponent({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="error-state p-4 border border-red-200 bg-red-50 rounded">
      <p className="text-red-600">Failed to load content: {error.message}</p>
      <button onClick={retry} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
        Try Again
      </button>
    </div>
  );
}

<ArticleCardWithContent 
  slug="unreliable-content"
  contentType="articles"
  ErrorComponent={CustomErrorComponent}
/>`}
          </pre>
        </div>
      </section>

      {/* Example 7: Content Directory Structure */}
      <section className="border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Content Directory Structure</h2>
        <p className="text-gray-600 mb-4">
          Expected directory structure for markdown files
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm">
{`src/
  content/
    articles/           # contentType="articles"
      intro.md
      advanced.md
    main-grid/          # contentType="main-grid" (default)
      header.md
      featured.md
    blog/               # contentType="blog"
      my-post.md
    projects/           # contentType="projects"
      project-1.md`}
          </pre>
        </div>
      </section>

      {/* Example 8: Token Interpolation */}
      <section className="border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Token Interpolation</h2>
        <p className="text-gray-600 mb-4">
          Use dynamic tokens in your markdown content for site-specific information
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-mono text-sm text-gray-500 mb-2">Markdown with tokens:</h3>
          <pre className="text-sm">
{`---
title: "Privacy Policy"
---

Last updated: {{copyright.lastUpdated}}

## Contact Information

For privacy questions, contact {{contacts.primaryEmail}}.
Visit {{site.url}} for more information about {{site.name}}.

© {{copyright.year}} {{copyright.holder}}. All rights reserved.`}
          </pre>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h3 className="font-mono text-sm text-gray-500 mb-2">Load content with token interpolation:</h3>
          <pre className="text-sm">
{`import { nextjsContentProvider, NextjsTokenProvider } from '@manta-templates/ui-adapters-nextjs';
import { siteConfig } from '@/content/site.config';

const content = await nextjsContentProvider.loadContent('privacy', 'legal/presets/mit', {
  tokenConfig: {
    enableTokens: true,
    tokenProvider: new NextjsTokenProvider(siteConfig)
  }
});`}
          </pre>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mt-4">
          <p className="text-sm"><strong>Supported tokens:</strong> site.name, site.url, author.name, contacts.primaryEmail, copyright.year, copyright.lastUpdated, copyright.holder</p>
        </div>
      </section>

      {/* Example 9: Legal Content System */}
      <section className="border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Legal Content System</h2>
        <p className="text-gray-600 mb-4">
          Framework-agnostic legal content with automatic token interpolation
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-mono text-sm text-gray-500 mb-2">Legal page implementation:</h3>
          <pre className="text-sm">
{`export default async function PrivacyPage() {
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

  return (
    <Container>
      <ContentCard>
        <h1>{content.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
      </ContentCard>
    </Container>
  );
}`}
          </pre>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mt-4">
          <p className="text-sm"><strong>Available presets:</strong> legal/presets/mit, legal/presets/full, legal/default</p>
        </div>
      </section>

      {/* Example 10: Markdown Format */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">10. Markdown File Format</h2>
        <p className="text-gray-600 mb-4">
          Required frontmatter format for content files
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-mono text-sm text-gray-500 mb-2">Example: src/content/articles/intro.md</h3>
          <pre className="text-sm">
{`---
title: "Getting Started with Modern Web Development"
description: "An introduction to modern web development practices and tools."
image: "/images/web-dev-intro.jpg"
author: "Development Team"
pubDate: "2024-01-15"
tags: ["web-development", "tutorial"]
---

# Introduction

Your markdown content here...

## Key Concepts

- Component-driven architecture
- Type safety with TypeScript
- Modern build tools`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="text-sm"><strong>Note:</strong> Only title, description, and image are used by ArticleCard. Other fields are available in the content data.</p>
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Import ui-core components:</h3>
            <code className="bg-white p-2 rounded block">import {"{ ArticleCard }"} from '@manta-templates/ui-core';</code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Import Next.js components for dependency injection:</h3>
            <code className="bg-white p-2 rounded block">
              import Image from 'next/image';<br/>
              import Link from 'next/link';
            </code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Create content directory:</h3>
            <code className="bg-white p-2 rounded block">mkdir -p src/content/articles</code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">4. Add markdown files and start using!</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContentLoadingExamples;