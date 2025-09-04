import { BaseContentProvider } from './BaseContentProvider';
import { ContentNotFoundError, ContentLoadError } from './types';
import { ProcessorConfig } from './processor';

/**
 * Mock Content Provider Configuration
 */
interface MockContentProviderConfig extends ProcessorConfig {
  /** Artificial delay for testing loading states (milliseconds) */
  delay?: number;
}

/**
 * Mock Content Provider
 * 
 * Provides sample content for development and testing purposes.
 * Includes configurable delays to simulate real-world loading scenarios.
 */
export class MockContentProvider extends BaseContentProvider {
  private mockData: Map<string, string> = new Map();
  private delay: number;

  constructor(config: MockContentProviderConfig = {}) {
    super(config);
    this.delay = config.delay || 0;
    this.setupMockData();
  }

  /**
   * Load raw content from mock data store
   */
  async loadRawContent(slug: string, contentType: string): Promise<string> {
    // Add artificial delay if configured
    if (this.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.delay));
    }

    // Handle error test cases
    if (slug === 'error-test') {
      throw new ContentLoadError('Simulated load error for testing');
    }
    if (slug === 'not-found-test') {
      throw new ContentNotFoundError('Simulated not found error for testing');
    }

    const key = `${contentType}:${slug}`;
    const content = this.mockData.get(key);
    
    if (!content) {
      throw new ContentNotFoundError(`Mock content not found: ${key}`);
    }
    
    return content;
  }

  /**
   * Load all raw content for a given content type
   */
  async loadAllRawContent(contentType: string): Promise<{ slug: string; content: string }[]> {
    // Add artificial delay if configured
    if (this.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.delay));
    }

    const results: { slug: string; content: string }[] = [];
    
    for (const [key, content] of this.mockData.entries()) {
      if (key.startsWith(`${contentType}:`)) {
        const slug = key.substring(contentType.length + 1);
        results.push({ slug, content });
      }
    }
    
    return results;
  }

  /**
   * Set up mock data with sample content from various content types
   */
  private setupMockData(): void {
    // Blog posts
    this.mockData.set('blog:sample-post', `---
title: My Sample Blog Post
description: A brief description of this sample post.
image: /image/blog/blog-sample-image.png
pubDate: 2025-05-16
contentType: blog
cardSize: medium 
tags:
  - nextjs
  - markdown
---
This is the main content of the sample blog post.
It can include various markdown elements like headings, lists, and links.

## Heading Level 2

This is a paragraph under a level 2 heading. It contains some **bold text** and some *italic text*.

### Heading Level 3

Here's an unordered list:

- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2
- Item 3

And an ordered list:

1. First item
2. Second item
3. Third item

> This is a blockquote. It should stand out from the rest of the text.

Here is a link to [OpenAI](https://openai.com).

Finally, a code block:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('World');
\`\`\`

And an inline \`code\` example.`);

    this.mockData.set('blog:second-post', `---
title: Second Blog Post
description: Another example blog post for testing.
image: /image/blog/blog-sample-image.png
pubDate: 2025-05-17
contentType: blog
cardSize: large
tags:
  - testing
  - content
---
This is another sample blog post for testing the content system.

## Features Tested

- Multiple posts
- Different frontmatter
- Various content structures

The content system should handle multiple posts gracefully.`);

    // Projects
    this.mockData.set('projects:sample-project', `---
title: "Sample Project"
description: "A demonstration project showcasing modern web development practices."
techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
repoUrl: "https://github.com/example/sample-project"
demoUrl: "https://sample-project.demo.com"
featured: true
order: 1
image: "/image/blog/blog-sample-image.png"
---

# Sample Project

This is a sample project that demonstrates how to build modern web applications using React, TypeScript, and Next.js.

## Features

- Modern React with TypeScript
- Server-side rendering with Next.js
- Responsive design with Tailwind CSS
- Component-based architecture

## Getting Started

1. Clone the repository
2. Install dependencies with \`npm install\`
3. Run the development server with \`npm run dev\`

## Tech Stack

The project uses the following technologies:

- **React**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Next.js**: For server-side rendering and routing
- **Tailwind CSS**: For styling and responsive design`);

    this.mockData.set('projects:nextjs-starter', `---
title: "Next.js Starter Template"
description: "A modern Next.js starter with TypeScript and Tailwind CSS"
techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
repoUrl: "https://github.com/manta-digital/manta-templates"
featured: false
order: 2
---

# Next.js Starter Template

A comprehensive starter template for Next.js applications with modern tooling and best practices.

## What's Included

- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- ESLint and Prettier for code quality`);

    // Quotes
    this.mockData.set('quotes:sample-quote', `---
type: quote
quote: "The art of programming is the skill of controlling complexity. The great program is subdued — made simple in its complexity."
author: "Rich Hickey"
featured: true
order: 1
---`);

    this.mockData.set('quotes:second-quote', `---
type: quote
quote: "Code is like humor. When you have to explain it, it's bad."
author: "Cory House"
featured: false
order: 2
---`);

    // Articles
    this.mockData.set('articles:intro-article', `---
title: "Getting Started with Modern Web Development"
description: "An introduction to modern web development practices and tools."
author: "Development Team"
pubDate: 2025-01-15
tags:
  - web-development
  - modern
  - best-practices
---

# Getting Started with Modern Web Development

Modern web development has evolved significantly over the past few years. This article covers the essential concepts and tools you need to know.

## Key Concepts

1. **Component-Based Architecture**: Breaking UI into reusable components
2. **Type Safety**: Using TypeScript for better developer experience
3. **Modern Build Tools**: Leveraging tools like Vite and Next.js
4. **Responsive Design**: Creating applications that work on all devices

## Best Practices

- Write clean, maintainable code
- Use version control effectively
- Test your applications thoroughly
- Optimize for performance and accessibility`);
  }
}