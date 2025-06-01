# Content Management System Phase 2

## Goal
Allow markdown to drive content in card components. Currently this only works for Blog cards, and other content is hard-coded into the page. We want to allow markdown to drive content in remaining card components.

## Feature Overview
This feature extends the existing markdown content system to support all card components in the application. The system will provide a unified approach to content management, allowing content creators to define card data through markdown files with structured frontmatter, reducing hard-coded content and improving maintainability.

## Technical Requirements

### Core Requirements
- Extend existing markdown processing system to support multiple content types
- Maintain backward compatibility with existing blog card implementation
- Support type-safe frontmatter schemas for each card type
- Enable hot-reloading during development for content changes
- Provide clear content authoring guidelines

### Performance Requirements
- Content parsing should happen at build time for static generation
- Support incremental static regeneration for dynamic content updates
- Minimize bundle size impact from additional content processing

### Integration Requirements
- Seamless integration with existing Next.js 15 and React 19 setup
- Compatible with Tailwind CSS v4 styling system
- Work with existing ShadCN UI components
- Support for TypeScript type safety throughout

## Component Analysis

### Currently Markdown-Driven Components
1. **BlogCard** (`/src/components/cards/BlogCard.tsx`)
   - Sources content from `/src/content/blog/*.md`
   - Uses frontmatter: title, date, description, tags, author
   - Already integrated with content system

2. **BlogCardWide** (`/src/components/cards/BlogCardWide.tsx`)
   - Variant of BlogCard with different layout
   - Uses same content source as BlogCard

3. **BlogHeroCard** (`/src/components/cards/BlogHeroCard.tsx`)
   - Featured blog post display
   - Uses same content source with additional featured flag

4. **BlogCardImage** (`/src/components/cards/BlogCardImage.tsx`)
   - Blog card variant with prominent image
   - Uses same content source with image requirements

5. **SidebarPostCard** (`/src/components/cards/SidebarPostCard.tsx`)
   - Compact blog post display for sidebars
   - Uses same content source, optimized for small spaces

### Components Requiring Markdown Integration

1. **Homepage Content** (`/src/app/page.tsx`)
   - Current: Hard-coded hero section title, description, feature bullets
   - Current: Hard-coded "Templates Showcase" section heading and description
   - Target: Frontmatter-driven homepage sections with configurable content
   - Content source: `/src/content/pages/homepage.md`
   - Benefits: Easy content updates without code changes, better content management

2. **QuoteCard** (`/src/components/cards/QuoteCard.tsx`)
   - Current: Hard-coded quote text, author, role
   - Target: Frontmatter with quote, author, role, source, date
   - Content source: `/src/content/quotes/*.md`

3. **ProjectCard** (`/src/components/cards/ProjectCard.tsx`)
   - Moderate complexity: title, description, tech stack, links
   - Clear content structure
   - Reusable across portfolio sections

4. **VideoCard** (`/src/components/cards/VideoCard.tsx`)
   - Requires: title, thumbnailUrl, videoUrl
   - May need video metadata (duration, type)
   - Integration with video components (BackgroundVideo, VideoPlayer)

5. **FeatureCard** variants
   - **GuidesFeatureCard**: Tutorial/guide content
   - **ProjectFeatureCard**: Project highlights
   - **ComingSoonFeatureCard**: Placeholder content
   - **FeatureCardWrapper**: Container component for feature cards
   - Similar structure but different content types

6. **ThreeJSCard** (`/src/components/cards/ThreeJSCard.tsx`)
   - Requires scene configuration data
   - May need custom JSON/YAML for 3D parameters
   - Support R3F
   - Complex interaction between content and code

## Content Structure Design

### Directory Structure
```
src/content/
├── blog/           # Existing blog posts
├── quotes/         # Quote card content
├── projects/       # Project showcases
├── videos/         # Video content metadata
├── features/       # Feature cards
│   ├── guides/
│   ├── projects/
│   └── coming-soon/
├── pages/          # Homepage and other page content
│   └── homepage.md
└── demos/          # ThreeJS demos configuration
```

### Frontmatter Schemas

#### Quote Content Schema
```yaml
---
type: quote
author: string
role?: string
company?: string
quote: string
featured?: boolean
order?: number
---
```

#### Project Content Schema
```yaml
---
type: project
title: string
description: string
thumbnail?: string
techStack: string[]
links:
  demo?: string
  github?: string
  docs?: string
featured?: boolean
order?: number
tags?: string[]
---
```

#### Video Content Schema
```yaml
---
type: video
title: string
description?: string
thumbnailUrl: string
videoUrl: string
duration?: string
videoType: 'youtube' | 'vimeo' | 'direct' | 'background'
aspectRatio?: '16:9' | '4:3' | '1:1'
featured?: boolean
order?: number
tags?: string[]
---
```

## Implementation Architecture

### Content Processing Pipeline
1. **Content Discovery**
   - Scan content directories for markdown files
   - Validate file structure and frontmatter
   - Build content index for each type

2. **Type-Safe Processing**
   - Define Zod schemas for each content type
   - Validate frontmatter against schemas
   - Generate TypeScript types from schemas

3. **Content API Layer**
   ```typescript
   // src/lib/content-api.ts
   export async function getQuotes(): Promise<Quote[]>
   export async function getProjects(): Promise<Project[]>
   export async function getVideos(): Promise<Video[]>
   export async function getContentByType<T>(type: ContentType): Promise<T[]>
   ```

4. **Component Integration**
   - Update card components to accept content props
   - Create container components for content fetching
   - Implement fallback for missing content

## Migration Strategy

### Phase 1: Foundation (Week 1)
1. Extend content processing system
2. Implement Quote card integration
3. Create content authoring guide
4. Test with sample content

### Phase 2: Expansion (Week 2)
1. Migrate Project cards
2. Implement Video card integration
3. Add content validation CLI tool
4. Create content templates

### Phase 3: Completion (Week 3)
1. Handle complex components
2. Implement content preview system
3. Add content management UI (stretch goal)
4. Complete documentation

## Success Criteria
- All identified card components support markdown-driven content
- Zero regression in existing blog functionality
- Type-safe content handling throughout
- Clear documentation for content authors
- Performance metrics maintained or improved
- Development workflow enhanced with hot-reloading

## Technical Considerations

### Error Handling
- Graceful fallbacks for missing content
- Clear error messages for invalid frontmatter
- Development-time validation warnings
- Production-safe error boundaries

### Performance Optimization
- Implement content caching strategy
- Lazy load content for below-fold components
- Optimize image references in content
- Consider CDN integration for media assets

### Extensibility
- Plugin system for custom content processors
- Support for MDX if needed in future
- Hook system for content transformation
- API for external content sources

## Dependencies and Risks

### Dependencies
- Existing markdown processing setup (gray-matter, remark)
- TypeScript and Zod for type safety
- Next.js 15 static generation features
- File system access during build


## Video Components Integration Details

### VideoCard Enhancement Strategy

The VideoCard component will serve as a content-driven wrapper that can utilize either BackgroundVideo or VideoPlayer components based on the content configuration.

#### Current Video Component Architecture

1. **BackgroundVideo Component**
   - Purpose: Ambient video backgrounds with autoplay
   - Features: Error handling, autoplay with fallbacks, hover interactions
   - Use cases: Hero sections, decorative backgrounds

2. **VideoPlayer Component**
   - Purpose: Interactive video playback with controls
   - Features: React Player integration, lazy loading, accessibility
   - Use cases: Tutorial videos, product demos, media content

#### Enhanced VideoCard Implementation

```typescript
// Proposed VideoCard content integration
interface VideoContent {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  videoType: 'youtube' | 'vimeo' | 'direct' | 'background';
  displayMode: 'player' | 'background' | 'card';
  duration?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  autoplay?: boolean;
  controls?: boolean;
  featured?: boolean;
}
```

#### Content-Driven Rendering Logic

```typescript
// VideoCard will intelligently render based on displayMode
const VideoCard: React.FC<{ content: VideoContent }> = ({ content }) => {
  switch (content.displayMode) {
    case 'background':
      return (
        <BaseCard>
          <BackgroundVideo 
            src={content.videoUrl}
            poster={content.thumbnailUrl}
            autoplay={content.autoplay ?? true}
          >
            <div className="p-4">
              <h3>{content.title}</h3>
              {content.description && <p>{content.description}</p>}
            </div>
          </BackgroundVideo>
        </BaseCard>
      );
    
    case 'player':
      return (
        <BaseCard>
          <VideoPlayer
            url={content.videoUrl}
            controls={content.controls ?? true}
            title={content.title}
          />
          <div className="p-4">
            <h3>{content.title}</h3>
            {content.description && <p>{content.description}</p>}
          </div>
        </BaseCard>
      );
    
    case 'card':
    default:
      // Current VideoCard implementation with enhancements
      return (
        <BaseCard>
          {/* Existing VideoCard layout */}
        </BaseCard>
      );
  }
};
```

### Video Content Examples

#### Background Video Content
```yaml
---
type: video
title: "Product Showcase"
description: "Ambient product demonstration"
thumbnailUrl: "/images/product-thumb.jpg"
videoUrl: "/videos/product-ambient.mp4"
videoType: direct
displayMode: background
autoplay: true
aspectRatio: "16:9"
featured: true
order: 1
---
```

#### Player Video Content
```yaml
---
type: video
title: "Getting Started Tutorial"
description: "Learn the basics in 5 minutes"
thumbnailUrl: "/images/tutorial-thumb.jpg"
videoUrl: "https://youtube.com/watch?v=..."
videoType: youtube
displayMode: player
duration: "5:23"
controls: true
tags: ["tutorial", "beginner"]
order: 2
---
```

#### Card Video Content
```yaml
---
type: video
title: "Feature Highlight"
thumbnailUrl: "/images/feature-thumb.jpg"
videoUrl: "https://vimeo.com/..."
videoType: vimeo
displayMode: card
duration: "2:45"
tags: ["feature", "demo"]
---
```

### Implementation Considerations

#### Performance Optimization
1. **Lazy Loading**: Videos load only when in viewport
2. **Thumbnail Optimization**: Use Next.js Image optimization for thumbnails
3. **Preload Strategy**: Configure preload based on video priority
4. **CDN Integration**: Support for external video CDNs

#### Accessibility Enhancements
1. **Keyboard Navigation**: Full keyboard support for video controls
2. **Screen Reader Support**: Proper ARIA labels from content
3. **Captions**: Support for caption files in content
4. **Reduced Motion**: Respect user preferences for autoplay

#### Error Handling
1. **Fallback Images**: Show thumbnail if video fails
2. **Retry Logic**: Automatic retry for network failures
3. **User Feedback**: Clear error messages
4. **Analytics**: Track video load failures

### Video Content Processing

```typescript
// src/lib/content/video-processor.ts
export async function processVideoContent(content: VideoContent) {
  // Validate video URLs
  if (content.videoType === 'youtube') {
    content.videoUrl = normalizeYouTubeUrl(content.videoUrl);
  }
  
  // Generate thumbnail if missing
  if (!content.thumbnailUrl && content.videoType !== 'direct') {
    content.thumbnailUrl = await generateVideoThumbnail(content.videoUrl);
  }
  
  // Extract duration if not provided
  if (!content.duration && content.videoType === 'direct') {
    content.duration = await getVideoDuration(content.videoUrl);
  }
  
  return content;
}
```

### Migration Path for Existing Videos

1. **Audit Current Usage**: Identify all hardcoded video references
2. **Create Content Files**: Generate markdown files for each video
3. **Update Components**: Modify components to accept content props
4. **Test Playback**: Ensure all video types work correctly
5. **Performance Check**: Verify no regression in load times

## Implementation Based on Existing System

### Current Content System Analysis

The existing `/src/lib/content.ts` provides a solid foundation that we'll extend:

1. **Current Features**:
   - Uses `gray-matter` for frontmatter parsing
   - Markdown processing with `remark` and plugins
   - Type-safe interfaces for content
   - Static generation support
   - Syntax highlighting with `rehype-pretty-code`

2. **Extension Strategy**:
   - Generalize the content processing functions
   - Add content type discrimination
   - Create separate directories for each content type
   - Maintain backward compatibility

### Proposed Content API Extension

```typescript
// src/lib/content-api.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

// Content type enum
export enum ContentType {
  BLOG = 'blog',
  QUOTE = 'quotes',
  PROJECT = 'projects',
  VIDEO = 'videos',
  FEATURE = 'features',
  DEMO = 'demos'
}

// Base content interface
interface BaseContent {
  slug: string;
  type: ContentType;
}

// Zod schemas for each content type
const QuoteSchema = z.object({
  type: z.literal('quote'),
  author: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  quote: z.string(),
  featured: z.boolean().optional(),
  order: z.number().optional()
});

const ProjectSchema = z.object({
  type: z.literal('project'),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional(),
  techStack: z.array(z.string()),
  links: z.object({
    demo: z.string().optional(),
    github: z.string().optional(),
    docs: z.string().optional()
  }),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  tags: z.array(z.string()).optional()
});

const VideoSchema = z.object({
  type: z.literal('video'),
  title: z.string(),
  description: z.string().optional(),
  thumbnailUrl: z.string(),
  videoUrl: z.string(),
  duration: z.string().optional(),
  videoType: z.enum(['youtube', 'vimeo', 'direct', 'background']),
  displayMode: z.enum(['player', 'background', 'card']).optional(),
  aspectRatio: z.enum(['16:9', '4:3', '1:1']).optional(),
  autoplay: z.boolean().optional(),
  controls: z.boolean().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  tags: z.array(z.string()).optional()
});

// Type exports
export type QuoteContent = z.infer<typeof QuoteSchema> & BaseContent;
export type ProjectContent = z.infer<typeof ProjectSchema> & BaseContent;
export type VideoContent = z.infer<typeof VideoSchema> & BaseContent;

// Generic content fetching function
export async function getContentByType<T extends BaseContent>(
  contentType: ContentType,
  schema: z.ZodSchema<any>
): Promise<T[]> {
  const contentDir = path.join(process.cwd(), 'src/content', contentType);
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDir);
  const contentItems = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(contentDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        try {
          const validated = schema.parse(data);
          return {
            ...validated,
            slug,
            type: contentType
          } as T;
        } catch (error) {
          console.error(`Validation error in ${fileName}:`, error);
          return null;
        }
      })
  );

  return contentItems
    .filter((item): item is T => item !== null)
    .sort((a, b) => {
      // Sort by order if available, otherwise by slug
      const orderA = (a as any).order ?? 999;
      const orderB = (b as any).order ?? 999;
      return orderA - orderB;
    });
}

// Specific content fetchers
export const getQuotes = () => getContentByType<QuoteContent>(ContentType.QUOTE, QuoteSchema);
export const getProjects = () => getContentByType<ProjectContent>(ContentType.PROJECT, ProjectSchema);
export const getVideos = () => getContentByType<VideoContent>(ContentType.VIDEO, VideoSchema);

// Get content with markdown processing (for content that needs it)
export async function getContentWithMarkdown<T extends BaseContent>(
  contentType: ContentType,
  slug: string,
  schema: z.ZodSchema<any>
): Promise<T & { contentHtml: string }> {
  const fullPath = path.join(process.cwd(), 'src/content', contentType, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const validated = schema.parse(data) as T;
  
  // Process markdown content (reuse existing processing pipeline)
  const processedContent = await processMarkdownContent(content);
  
  return {
    ...validated,
    slug,
    type: contentType,
    contentHtml: processedContent
  };
}
```

### Migration Path for Existing Blog System

To ensure backward compatibility while extending the system:

```typescript
// src/lib/content.ts - Updated to use new system
import { getContentByType, ContentType } from './content-api';

// Maintain existing interfaces
export interface PostFrontmatter {
  title: string;
  description: string;
  image?: string;
  pubDate: string;
  contentType: string;
  cardSize: string;
  tags?: string[];
}

// Adapter function to maintain compatibility
export function getSortedPostsData(): SortedPostInfo[] {
  // Use new system internally but maintain old interface
  const blogPosts = await getContentByType<BlogContent>(
    ContentType.BLOG,
    BlogSchema
  );
  
  return blogPosts.map(post => ({
    slug: post.slug,
    frontmatter: {
      title: post.title,
      description: post.description,
      image: post.image,
      pubDate: post.pubDate,
      contentType: post.contentType,
      cardSize: post.cardSize,
      tags: post.tags
    }
  }));
}
```

### Component Integration Pattern

For each card component, we'll follow this pattern:

```typescript
// Example: QuoteCard integration
// src/components/cards/QuoteCard.tsx

import { QuoteContent } from '@/lib/content-api';

interface QuoteCardProps {
  content?: QuoteContent;
  // Maintain backward compatibility with direct props
  quote?: string;
  author?: string;
  role?: string;
}

export function QuoteCard({ content, quote, author, role }: QuoteCardProps) {
  // Use content if provided, otherwise fall back to direct props
  const displayQuote = content?.quote ?? quote;
  const displayAuthor = content?.author ?? author;
  const displayRole = content?.role ?? role;
  
  // Rest of component implementation
}

// Container component for content-driven usage
export async function QuoteCardContainer({ slug }: { slug: string }) {
  const quotes = await getQuotes();
  const quote = quotes.find(q => q.slug === slug);
  
  if (!quote) return null;
  
  return <QuoteCard content={quote} />;
}
```

### Development Workflow Enhancements

1. **Content Validation CLI**:
```typescript
// scripts/validate-content.ts
import { ContentType, getContentByType, schemas } from '@/lib/content-api';

async function validateAllContent() {
  for (const [type, schema] of Object.entries(schemas)) {
    console.log(`Validating ${type} content...`);
    const items = await getContentByType(type as ContentType, schema);
    console.log(`✓ ${items.length} valid ${type} items`);
  }
}
```

2. **Content Templates**:
```bash
# scripts/create-content.sh
#!/bin/bash
TYPE=$1
SLUG=$2

mkdir -p src/content/$TYPE
cat > src/content/$TYPE/$SLUG.md << EOF
---
type: $TYPE
# Add type-specific fields here
---

# Content goes here
EOF
```

3. **Hot Reload Support**:
```typescript
// next.config.js addition
module.exports = {
  // ... existing config
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};
```

### Testing Strategy

1. **Unit Tests for Content Processing**:
```typescript
// __tests__/content-api.test.ts
describe('Content API', () => {
  it('should validate quote content correctly', async () => {
    const quotes = await getQuotes();
    expect(quotes).toBeInstanceOf(Array);
    quotes.forEach(quote => {
      expect(quote).toHaveProperty('author');
      expect(quote).toHaveProperty('quote');
    });
  });
});
```

2. **Integration Tests for Components**:
```typescript
// __tests__/components/QuoteCard.test.tsx
describe('QuoteCard', () => {
  it('should render with content prop', () => {
    const content: QuoteContent = {
      slug: 'test',
      type: ContentType.QUOTE,
      author: 'Test Author',
      quote: 'Test quote'
    };
    
    render(<QuoteCard content={content} />);
    expect(screen.getByText('Test quote')).toBeInTheDocument();
  });
});
```

This implementation approach ensures a smooth transition from the current system while adding powerful new capabilities for content management.

## Summary and Next Steps


### Implementation Phases

#### Phase 1: Foundation (Week 1)
- [ ] Create `content-api.ts` with base functionality
- [ ] Implement QuoteCard markdown support
- [ ] Set up content directories structure
- [ ] Create content validation scripts
- [ ] Write initial documentation

#### Phase 2: Expansion (Week 2)
- [ ] Migrate ProjectCard to markdown
- [ ] Implement VideoCard with full integration
- [ ] Create content templates and CLI tools
- [ ] Add development workflow enhancements
- [ ] Extend testing coverage

#### Phase 3: Completion (Week 3)
- [ ] Handle FeatureCard variants
- [ ] Implement ThreeJSCard configuration
- [ ] Create content preview system
- [ ] Complete migration documentation
- [ ] Performance optimization

### Key Deliverables

1. **Code Deliverables**:
   - Extended content processing system (`content-api.ts`)
   - Updated card components with content support
   - Content validation and creation tools
   - Comprehensive test suite

2. **Content Deliverables**:
   - Sample content files for each type
   - Content authoring guidelines
   - Migration scripts for existing content

3. **Documentation Deliverables**:
   - API documentation for content system
   - Content author guide with examples
   - Developer migration guide
   - Performance benchmarks

### Success Metrics

- All card components support markdown-driven content
- Zero regression in existing functionality
- 100% type safety for content


This design provides a clear path forward for implementing a comprehensive markdown-driven content management system that scales with the application's needs while maintaining excellent developer and content author experiences.