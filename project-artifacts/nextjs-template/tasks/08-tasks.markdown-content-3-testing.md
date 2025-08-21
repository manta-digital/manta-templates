---
layer: project
docType: tasks
slice: markdown-content
phase: 3
project: manta-templates
lldReference: project-artifacts/nextjs-template/slices/08-slice.markdown-content.md
dependencies:
  - ui-refactor (Phase 2) - ui-core cards with dependency injection
  - Existing Next.js content system in templates/nextjs
currentProjectState: ui-refactor completed, Phase 1 and Phase 2 of markdown-content slice completed
lastUpdated: 2025-01-20
---

# Tasks: Phase 3 - Content System Testing Framework

## Context Summary

This phase establishes a comprehensive testing framework for the content management system before implementing full framework-agnostic abstraction. We're transforming the existing `templates/nextjs/src/app/test-example-2/` page to use markdown-driven content, validating content loading across different deployment contexts, and ensuring robust error handling.

**Key Objectives:**
- Validate content system works in both template development and instance deployment contexts
- Create comprehensive content schema validation with Zod
- Transform test-example-2 to demonstrate content-driven card rendering
- Establish error handling patterns for missing/invalid content

**Content Architecture:**
- **Template Development**: `templates/nextjs/src/content/` (monorepo context)
- **Instance Deployment**: `src/content/` (user context)
- **Test Integration**: Relative content paths demonstrating real-world usage

## Phase 3.1: Content Directory Structure Setup

### Task 3.1.1: Create Content Directory Structure
**Priority:** P0 - Foundation
**Estimated Time:** 30 minutes
**Dependencies:** None

Create the complete content directory structure at `templates/nextjs/src/content/` with all required subdirectories and placeholder files.

**Implementation Steps:**
1. Create directory structure:
   ```
   templates/nextjs/src/content/
   ├── articles/
   ├── projects/
   ├── quotes/
   └── example-2/
   ```
2. Create `.gitkeep` files in each subdirectory to ensure they're tracked by git
3. Verify directory structure matches the LLD specification

**Success Criteria:**
- [x] All content directories exist at correct paths
- [x] Directories are tracked by git (contain .gitkeep files)
- [x] Directory structure is accessible from Next.js app context

**Files Created:**
- `templates/nextjs/src/content/articles/.gitkeep`
- `templates/nextjs/src/content/projects/.gitkeep`
- `templates/nextjs/src/content/quotes/.gitkeep`
- `templates/nextjs/src/content/example-2/.gitkeep`

### Task 3.1.2: Create Core Content Schema Definitions
**Priority:** P0 - Foundation
**Estimated Time:** 45 minutes
**Dependencies:** Task 3.1.1

Create comprehensive Zod schemas for all content types used in the testing framework.

#### 3.1.2.1: Set Up Schema File Structure
- [x] Create the schemas file
  - [x] Create `templates/nextjs/src/lib/content/schemas.ts`
  - [x] Add basic imports for Zod
    ```typescript
    import { z } from 'zod';
    ```
  - [x] Success: Schema file exists with proper imports

#### 3.1.2.2: Implement ArticleSchema
- [x] Create ArticleSchema definition
  - [x] Define required fields: title, excerpt, coverImage
    ```typescript
    export const ArticleSchema = z.object({
      title: z.string().min(1, 'Title is required'),
      excerpt: z.string().min(1, 'Excerpt is required'),
      coverImage: z.string().url('Cover image must be a valid URL'),
    });
    ```
  - [x] Add date transformation for publishedAt
    ```typescript
    publishedAt: z.string().transform(str => new Date(str)),
    ```
  - [x] Add optional fields: tags, featured
    ```typescript
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional()
    ```
  - [x] Export TypeScript type
    ```typescript
    export type Article = z.infer<typeof ArticleSchema>;
    ```
  - [x] Success: ArticleSchema validates all required fields and transforms dates correctly

#### 3.1.2.3: Implement ProjectSchema
- [x] Create ProjectSchema definition
  - [x] Define basic project fields
    ```typescript
    export const ProjectSchema = z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().min(1, 'Description is required'),
      techStack: z.array(z.string()).min(1, 'At least one technology required'),
      image: z.string().url('Image must be a valid URL'),
      repoUrl: z.string().url('Repository URL must be valid'),
    });
    ```
  - [x] Add features array with proper validation
    ```typescript
    features: z.array(z.object({
      label: z.string().min(1, 'Feature label is required'),
      icon: z.string().min(1, 'Icon is required'),
      color: z.string().optional()
    })).optional()
    ```
  - [x] Export TypeScript type
    ```typescript
    export type Project = z.infer<typeof ProjectSchema>;
    ```
  - [x] Success: ProjectSchema validates all ProjectCard requirements

#### 3.1.2.4: Implement QuoteSchema
- [x] Create QuoteSchema definition
  - [x] Define quote fields
    ```typescript
    export const QuoteSchema = z.object({
      quote: z.string().min(1, 'Quote text is required'),
      author: z.string().min(1, 'Author is required'),
      context: z.string().optional()
    });
    ```
  - [x] Export TypeScript type
    ```typescript
    export type Quote = z.infer<typeof QuoteSchema>;
    ```
  - [x] Success: QuoteSchema validates all QuoteCard requirements

#### 3.1.2.5: Add Validation Utilities
- [x] Create validation helper functions
  - [x] Add content type validation function
    ```typescript
    export function validateContent<T>(
      content: unknown,
      schema: z.ZodSchema<T>
    ): { success: true; data: T } | { success: false; error: string } {
      try {
        const data = schema.parse(content);
        return { success: true, data };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return { success: false, error: error.errors.map(e => e.message).join(', ') };
        }
        return { success: false, error: 'Unknown validation error' };
      }
    }
    ```
  - [x] Add development-friendly error formatting
  - [x] Success: Validation utilities provide clear error messages

**Overall Success Criteria:**
- [x] All schemas properly validate expected content structure
- [x] TypeScript types are correctly inferred from schemas
- [x] Date transformation works correctly for publishedAt field
- [x] URL validation works for repoUrl field
- [x] Optional fields handle undefined values correctly

**Files Created:**
- `templates/nextjs/src/lib/content/schemas.ts`

### Task 3.1.3: Create Test Content Files
**Priority:** P0 - Foundation
**Estimated Time:** 60 minutes
**Dependencies:** Task 3.1.2

Create all markdown content files required for the test-example-2 page transformation.

#### 3.1.3.1: Create Carousel Hero Content
- [x] Create carousel hero content file
  - [x] Create `templates/nextjs/src/content/example-2/carousel-hero.md`
  - [x] Add frontmatter matching ArticleSchema
    ```markdown
    ---
    title: "Semantic Design System"
    excerpt: "Building consistent user experiences with design tokens and systematic approach to component architecture."
    coverImage: "/image/blog-sample-image.png"
    publishedAt: "2024-01-15"
    featured: true
    tags: ["design-system", "tokens", "ui"]
    ---
    ```
  - [x] Add minimal body content
    ```markdown
    # Semantic Design System
    
    Our design system prioritizes semantic meaning over visual appearance, ensuring consistent and accessible user experiences across all components.
    ```
  - [x] Validate content against ArticleSchema using schemas file
  - [x] Success: File exists with valid frontmatter and content

#### 3.1.3.2: Create Carousel Project Content
- [x] Create carousel project content file
  - [x] Create `templates/nextjs/src/content/example-2/carousel-project.md`
  - [x] Add frontmatter matching ProjectSchema
    ```markdown
    ---
    title: "Semantic Colors"
    description: "Cards using accent and foreground tokens with comprehensive theming support"
    techStack: ["Next.js", "Tailwind v4", "Radix"]
    image: "/image/blog-sample-image.png"
    repoUrl: "https://github.com/manta-templates/semantic-colors"
    features:
      - label: "Structured and Customizable Project Phases"
        icon: "zap"
      - label: "AI-driven Task Discovery and Expansion"
        icon: "zap"
        color: "primary"
      - label: "Parameterized Prompts"
        icon: "zap"
        color: "primary"
      - label: "Automated Code Reviews"
        icon: "zap"
        color: "primary"
    ---
    ```
  - [x] Add minimal body content
    ```markdown
    # Semantic Colors Project
    
    A comprehensive approach to semantic color systems using modern design tokens and framework-agnostic principles.
    ```
  - [x] Validate content against ProjectSchema
  - [x] Success: File exists with valid project frontmatter

#### 3.1.3.3: Create Carousel Video Content
- [x] Create carousel video content file
  - [x] Create `templates/nextjs/src/content/example-2/carousel-video.md`
  - [x] Add frontmatter for video demo
    ```markdown
    ---
    title: "Background Video Demo"
    excerpt: "Interactive video backgrounds with semantic overlay content and accessibility considerations."
    coverImage: "/image/blog-sample-image.png"
    publishedAt: "2024-01-10"
    tags: ["video", "background", "demo"]
    ---
    ```
  - [x] Add body content
    ```markdown
    # Background Video Demo
    
    Demonstrating how video backgrounds can be integrated seamlessly with card components while maintaining accessibility and performance.
    ```
  - [x] Validate content against ArticleSchema
  - [x] Success: File exists with valid video demo content

#### 3.1.3.4: Create Featured Article Content
- [x] Create featured article file
  - [x] Create `templates/nextjs/src/content/articles/theme-guide.md`
  - [x] Add comprehensive frontmatter
    ```markdown
    ---
    title: "Colors and Themes"
    excerpt: "Radix scales with semantic aliasing and palette switching. Testing making this a longer description to see how it handles the card layout."
    coverImage: "/image/blog-sample-image.png"
    publishedAt: "2024-01-20"
    featured: true
    tags: ["colors", "themes", "radix", "palette"]
    ---
    ```
  - [x] Add detailed body content
    ```markdown
    # Colors and Themes Guide
    
    ## Overview
    Comprehensive guide to implementing semantic color systems using Radix color scales and palette switching functionality.
    
    ## Key Concepts
    - Semantic aliasing for consistent color meaning
    - Palette switching for dark/light mode support
    - Accessibility considerations for color contrast
    ```
  - [x] Validate content against ArticleSchema
  - [x] Success: Featured article with comprehensive content exists

#### 3.1.3.5: Create Quote Content
- [x] Create quote content file
  - [x] Create `templates/nextjs/src/content/quotes/design-philosophy.md`
  - [x] Add frontmatter matching QuoteSchema
    ```markdown
    ---
    quote: "Make the easy path the right path—semantic tokens everywhere."
    author: "Manta Templates"
    context: "Design system principles and developer experience philosophy"
    ---
    ```
  - [x] Add body content explaining the quote
    ```markdown
    # Design Philosophy
    
    This quote encapsulates our approach to design systems: making semantic, accessible, and maintainable design the default choice for developers.
    ```
  - [x] Validate content against QuoteSchema
  - [x] Success: Quote content with proper attribution exists

#### 3.1.3.6: Validate All Content Files
- [x] Test all content against schemas
  - [x] Create temporary validation script to test all files
  - [x] Ensure all frontmatter parses correctly
  - [x] Verify all image paths use existing assets
  - [x] Check that content matches visual design requirements from test-example-2
  - [x] Success: All content files validate successfully

**Overall Success Criteria:**
- [x] All content files contain valid frontmatter
- [x] Content validates against corresponding Zod schemas
- [x] Content includes realistic text and metadata
- [x] Image paths reference existing assets
- [x] Content supports all card variants used in test-example-2

**Files Created:**
- `templates/nextjs/src/content/example-2/carousel-hero.md`
- `templates/nextjs/src/content/example-2/carousel-project.md`
- `templates/nextjs/src/content/example-2/carousel-video.md`
- `templates/nextjs/src/content/articles/theme-guide.md`
- `templates/nextjs/src/content/quotes/design-philosophy.md`

## Phase 3.2: Content Loading Infrastructure

### Task 3.2.1: Verify Existing Content Loading System
**Priority:** P0 - Critical Path
**Estimated Time:** 30 minutes
**Dependencies:** None

Analyze and document the existing Next.js content loading system to ensure compatibility with new content structure.

**Implementation Steps:**
1. Examine existing content loading functions in `templates/nextjs/src/lib/content/`
2. Identify `getContentBySlug` and `getAllContent` function signatures
3. Test current content loading with new directory structure
4. Document any required modifications for new content types
5. Verify gray-matter and remark processing works with new schemas

**Success Criteria:**
- [x] Existing content loading functions are documented and understood
- [x] Functions can access new content directory structure
- [x] Current content processing pipeline works with new schema-validated content
- [x] No breaking changes required to existing API surface

**Documentation Required:**
- Current content loading API documentation
- Any modifications needed for schema integration

### Task 3.2.2: Implement Schema Validation Integration
**Priority:** P1 - Important
**Estimated Time:** 45 minutes
**Dependencies:** Task 3.1.2, Task 3.2.1

Integrate Zod schema validation into the existing content loading pipeline.

#### 3.2.2.1: Analyze Existing Content Loading Structure
- [x] Document current content loading implementation
  - [x] Examine existing `getContentBySlug` function signature
  - [x] Examine existing `getAllContent` function signature
  - [x] Document current return types and error handling
  - [x] Identify where schema validation should be integrated
  - [x] Success: Current content loading structure is documented

#### 3.2.2.2: Create Schema-Specific Loading Functions
- [x] Implement typed content loading functions
  - [x] Create `getArticleBySlug` function
    ```typescript
    import { ArticleSchema, Article } from './schemas';
    
    export async function getArticleBySlug(slug: string): Promise<Article> {
      const content = await getContentBySlug('articles', slug);
      const validation = validateContent(content.frontmatter, ArticleSchema);
      
      if (!validation.success) {
        throw new Error(`Article validation failed: ${validation.error}`);
      }
      
      return validation.data;
    }
    ```
  - [x] Create `getProjectBySlug` function following same pattern
  - [x] Create `getQuoteBySlug` function following same pattern
  - [x] Success: All content types have schema-validated loading functions

#### 3.2.2.3: Implement Development Error Handling
- [x] Add development-mode validation
  - [x] Create error handling that shows detailed messages in development
    ```typescript
    function handleValidationError(error: string, contentType: string, slug: string) {
      const message = `Content validation failed for ${contentType}/${slug}: ${error}`;
      
      if (process.env.NODE_ENV === 'development') {
        console.error(message);
        console.error('This error will be silent in production');
      }
      
      throw new Error(message);
    }
    ```
  - [x] Add validation that only runs in development mode
  - [x] Ensure production builds skip validation for performance
  - [x] Success: Clear error messages in development, performance in production

#### 3.2.2.4: Create Generic Content Loading with Validation
- [x] Implement generic typed content loading
  - [x] Create utility function for any content type
    ```typescript
    export async function getValidatedContent<T>(
      contentType: string,
      slug: string,
      schema: z.ZodSchema<T>
    ): Promise<T> {
      try {
        const content = await getContentBySlug(contentType, slug);
        const validation = validateContent(content.frontmatter, schema);
        
        if (!validation.success) {
          handleValidationError(validation.error, contentType, slug);
        }
        
        return validation.data;
      } catch (error) {
        throw new Error(`Failed to load ${contentType}/${slug}: ${error}`);
      }
    }
    ```
  - [x] Add TypeScript generics for type safety
  - [x] Test with all content types
  - [x] Success: Generic validation works for all content types

#### 3.2.2.5: Update Existing Content Loading
- [x] Integrate validation into existing functions
  - [x] Modify existing functions to optionally use validation
  - [x] Maintain backward compatibility with unvalidated content
  - [x] Add optional schema parameter to existing functions
  - [x] Test that existing content loading still works
  - [x] Success: Backward compatibility maintained while adding validation

**Overall Success Criteria:**
- [x] Content loading validates frontmatter against schemas
- [x] TypeScript types are properly inferred from validated content
- [x] Validation errors provide clear, actionable messages
- [x] Performance impact is minimal (validation only in development)
- [x] All existing content loading continues to work

**Files Modified:**
- `templates/nextjs/src/lib/content/` (existing content loading files)

### Task 3.2.3: Create Content Provider Prototype
**Priority:** P1 - Important
**Estimated Time:** 60 minutes
**Dependencies:** Task 3.2.2

Create a prototype NextjsContentProvider that implements the ContentProvider interface for testing phase preparation.

**Implementation Steps:**
1. Create `templates/nextjs/src/lib/content/provider.ts`
2. Implement basic ContentProvider interface following LLD specification
3. Create NextjsContentProvider class wrapping existing content loading
4. Implement proper path resolution for both template and instance contexts
5. Add error handling for missing content files
6. Include TypeScript generics for content type safety

**Provider Requirements:**
- Implement `loadContent(slug, contentType)` method
- Implement `loadAllContent(contentType)` method
- Handle path resolution for `templates/nextjs/src/content/` vs `src/content/`
- Return properly typed ContentData objects
- Include graceful error handling

**Success Criteria:**
- [x] ContentProvider interface is properly implemented
- [x] Path resolution works in both development and production contexts
- [x] Content loading returns proper ContentData structure
- [x] Error handling provides fallback for missing content
- [x] TypeScript generics provide proper type safety

**Files Created:**
- `templates/nextjs/src/lib/content/provider.ts`

## Phase 3.3: Test Example Transformation

### Task 3.3.1: Analyze Current test-example-2 Implementation
**Priority:** P0 - Critical Path
**Estimated Time:** 30 minutes
**Dependencies:** None

Thoroughly analyze the current test-example-2 page to understand component structure and hardcoded content.

**Implementation Steps:**
1. Read and document current `templates/nextjs/src/app/test-example-2/page.tsx`
2. Identify all hardcoded content that should be moved to markdown
3. Map hardcoded props to content schema fields
4. Document grid layout and component placement for preservation
5. Identify which content requires new markdown files vs existing content reuse

**Analysis Requirements:**
- Document all BlogCardImage instances and their props
- Document ProjectCard content structure
- Document QuoteCard content
- Document CardCarousel configuration
- Map all hardcoded strings to appropriate content files

**Success Criteria:**
- [x] All hardcoded content is identified and documented
- [x] Content mapping to markdown files is clearly defined
- [x] Component structure and layout requirements are documented
- [x] No content will be lost in transformation

**Documentation Required:**
- Content mapping document showing hardcoded → markdown file mapping
- Component structure preservation requirements

### Task 3.3.2: Transform test-example-2 to Use Content Loading
**Priority:** P0 - Critical Path
**Estimated Time:** 90 minutes
**Dependencies:** Task 3.3.1, Task 3.2.3, Task 3.1.3

Transform the test-example-2 page to load content from markdown files while preserving exact visual and functional behavior.

#### 3.3.2.1: Convert to Async Server Component
- [x] Update page component structure
  - [x] Change function signature to async
    ```typescript
    export default async function TestExample2Page() {
    ```
  - [x] Remove `"use client"` directive (server component)
  - [x] Add content loading imports
    ```typescript
    import { getArticleBySlug, getProjectBySlug, getQuoteBySlug, getAllContent } from '@/lib/content';
    ```
  - [x] Success: Component is properly configured as async server component

#### 3.3.2.2: Load Content for Carousel
- [x] Replace hardcoded carousel content
  - [x] Load carousel items from example-2 content type
    ```typescript
    const carouselItems = await getAllContent('example-2');
    ```
  - [x] Map hardcoded BlogCardImage to content-driven version
    ```typescript
    const heroContent = await getArticleBySlug('carousel-hero');
    const projectContent = await getProjectBySlug('carousel-project');
    const videoContent = await getArticleBySlug('carousel-video');
    ```
  - [x] Update BlogCardImage props to use loaded content
    ```typescript
    <BlogCardImage
      className="h-full"
      title={heroContent.title}
      excerpt={heroContent.excerpt}
      coverImageUrl={heroContent.coverImage}
      slug={`/content/example-2/carousel-hero`}
      textColorClassName="text-white"
    />
    ```
  - [x] Success: Carousel loads content from markdown files

#### 3.3.2.3: Transform ProjectCard Content
- [x] Replace hardcoded ProjectCard
  - [x] Load project content
    ```typescript
    const projectShowcase = await getProjectBySlug('carousel-project');
    ```
  - [x] Update ProjectCard props structure
    ```typescript
    <ProjectCard
      className="h-full"
      content={{
        title: projectShowcase.title,
        description: projectShowcase.description,
        techStack: projectShowcase.techStack,
        displayVariant: 'showcase',
        image: projectShowcase.image,
        repoUrl: projectShowcase.repoUrl,
        features: projectShowcase.features || [],
        actions: [
          { label: 'View on GitHub', href: projectShowcase.repoUrl, variant: 'outline' },
        ],
      }}
    />
    ```
  - [x] Preserve all existing actions and display variants
  - [x] Success: ProjectCard uses content from markdown

#### 3.3.2.4: Transform Featured Article
- [x] Replace hardcoded featured article
  - [x] Load featured article content
    ```typescript
    const featuredArticle = await getArticleBySlug('theme-guide');
    ```
  - [x] Update BlogCardImage for featured article
    ```typescript
    <BlogCardImage
      className="h-full"
      title={featuredArticle.title}
      excerpt={featuredArticle.excerpt}
      coverImageUrl={featuredArticle.coverImage}
      slug={`/articles/${featuredArticle.slug}`}
      textColorClassName="text-white"
    />
    ```
  - [x] Preserve all existing styling and layout
  - [x] Success: Featured article loads from content file

#### 3.3.2.5: Transform Quote Content
- [x] Replace hardcoded QuoteCard
  - [x] Load quote content
    ```typescript
    const designQuote = await getQuoteBySlug('design-philosophy');
    ```
  - [x] Update QuoteCard props
    ```typescript
    <QuoteCard 
      quote={designQuote.quote} 
      author={designQuote.author} 
    />
    ```
  - [x] Success: QuoteCard uses content from markdown

#### 3.3.2.6: Preserve Layout and Styling
- [x] Ensure visual consistency
  - [x] Verify all grid positioning remains identical
  - [x] Check all className props are preserved
  - [x] Validate responsive behavior at all breakpoints
  - [x] Test carousel autoplay and navigation
  - [x] Verify image hover effects still work
  - [x] Success: Visual appearance matches original exactly

#### 3.3.2.7: Add Error Handling
- [x] Implement graceful error handling
  - [x] Wrap content loading in try-catch blocks
    ```typescript
    try {
      const featuredArticle = await getArticleBySlug('theme-guide');
      // Use loaded content
    } catch (error) {
      console.error('Failed to load featured article:', error);
      // Use fallback content
    }
    ```
  - [x] Create fallback content objects for each type
  - [x] Ensure page renders even if content loading fails
  - [x] Success: Page handles missing content gracefully

**Overall Success Criteria:**
- [x] Page loads content from markdown files instead of hardcoded props
- [x] Visual appearance is identical to original implementation
- [x] All responsive behavior is preserved
- [x] Error handling gracefully handles missing content
- [x] TypeScript compilation succeeds with proper types
- [x] Page renders successfully in development

**Files Modified:**
- `templates/nextjs/src/app/test-example-2/page.tsx`

### Task 3.3.3: Implement Content Fallback System
**Priority:** P1 - Important
**Estimated Time:** 45 minutes
**Dependencies:** Task 3.3.2

Implement a robust fallback system that gracefully handles missing or invalid content.

**Implementation Steps:**
1. Create fallback content objects for each content type
2. Implement try-catch error handling in content loading
3. Add development-mode error logging for missing content
4. Ensure page renders with fallback content when files are missing
5. Add TypeScript types for fallback content
6. Test fallback behavior by temporarily removing content files

**Fallback Requirements:**
- Fallback content should match original hardcoded content structure
- Error messages should be clear and actionable in development
- Production builds should gracefully degrade without errors
- Fallback content should be visually consistent with intended design

**Success Criteria:**
- [ ] Page renders successfully when content files are missing
- [ ] Development mode shows clear error messages for missing content
- [ ] Fallback content maintains visual design consistency
- [ ] No runtime errors occur when content is missing or invalid
- [ ] TypeScript types properly handle fallback scenarios

**Files Modified:**
- `templates/nextjs/src/app/test-example-2/page.tsx`
- `templates/nextjs/src/lib/content/provider.ts`

## Phase 3.4: Testing and Validation

### Task 3.4.1: Create Content Validation Tests
**Priority:** P1 - Important
**Estimated Time:** 60 minutes
**Dependencies:** Task 3.1.2, Task 3.1.3

Create automated tests to validate content schema compliance and loading functionality.

#### 3.4.1.1: Set Up Test File Structure
- [ ] Create test file and imports
  - [ ] Create `templates/nextjs/src/__tests__/content-validation.test.ts`
  - [ ] Add test framework imports
    ```typescript
    import { describe, test, expect } from '@jest/globals';
    import fs from 'fs';
    import path from 'path';
    import matter from 'gray-matter';
    ```
  - [ ] Import schemas and validation utilities
    ```typescript
    import { ArticleSchema, ProjectSchema, QuoteSchema, validateContent } from '../lib/content/schemas';
    ```
  - [ ] Success: Test file is set up with proper imports

#### 3.4.1.2: Test Content File Schema Validation
- [ ] Create schema validation tests
  - [ ] Test carousel hero content
    ```typescript
    describe('Content Schema Validation', () => {
      test('carousel-hero.md validates against ArticleSchema', () => {
        const filePath = path.join(process.cwd(), 'src/content/example-2/carousel-hero.md');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        const validation = validateContent(data, ArticleSchema);
        expect(validation.success).toBe(true);
        if (validation.success) {
          expect(validation.data.title).toBe('Semantic Design System');
        }
      });
    });
    ```
  - [ ] Test all article content files
  - [ ] Test project content files
  - [ ] Test quote content files
  - [ ] Success: All content files pass schema validation

#### 3.4.1.3: Test Content Loading Functions
- [ ] Create content loading tests
  - [ ] Test getArticleBySlug function
    ```typescript
    describe('Content Loading Functions', () => {
      test('getArticleBySlug returns properly typed article', async () => {
        const article = await getArticleBySlug('carousel-hero');
        
        expect(article.title).toBeDefined();
        expect(article.excerpt).toBeDefined();
        expect(article.coverImage).toBeDefined();
        expect(article.publishedAt).toBeInstanceOf(Date);
      });
    });
    ```
  - [ ] Test getProjectBySlug function
  - [ ] Test getQuoteBySlug function
  - [ ] Test getAllContent function
  - [ ] Success: All content loading functions work correctly

#### 3.4.1.4: Test Error Handling
- [ ] Create error handling tests
  - [ ] Test invalid frontmatter handling
    ```typescript
    describe('Error Handling', () => {
      test('invalid frontmatter provides clear error message', () => {
        const invalidData = { title: '', excerpt: 123 }; // Invalid types
        const validation = validateContent(invalidData, ArticleSchema);
        
        expect(validation.success).toBe(false);
        if (!validation.success) {
          expect(validation.error).toContain('Title is required');
        }
      });
    });
    ```
  - [ ] Test missing file handling
  - [ ] Test malformed markdown handling
  - [ ] Success: Error scenarios are properly handled

#### 3.4.1.5: Test TypeScript Type Inference
- [ ] Create type safety tests
  - [ ] Test schema type inference
    ```typescript
    describe('TypeScript Type Safety', () => {
      test('ArticleSchema infers correct types', () => {
        const validArticle = {
          title: 'Test Article',
          excerpt: 'Test excerpt',
          coverImage: 'https://example.com/image.png',
          publishedAt: '2024-01-01'
        };
        
        const validation = validateContent(validArticle, ArticleSchema);
        expect(validation.success).toBe(true);
        
        if (validation.success) {
          // TypeScript should infer correct types
          expect(typeof validation.data.title).toBe('string');
          expect(validation.data.publishedAt).toBeInstanceOf(Date);
        }
      });
    });
    ```
  - [ ] Test all schema type inferences
  - [ ] Success: TypeScript types are correctly inferred

#### 3.4.1.6: Create Test Utilities
- [ ] Add helper functions for testing
  - [ ] Create content file reader utility
    ```typescript
    function readContentFile(contentType: string, slug: string) {
      const filePath = path.join(process.cwd(), `src/content/${contentType}/${slug}.md`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return matter(fileContent);
    }
    ```
  - [ ] Create schema test helper
  - [ ] Add test data generators for edge cases
  - [ ] Success: Test utilities make testing easier and more maintainable

**Overall Success Criteria:**
- [ ] All existing content files pass schema validation tests
- [ ] Content loading tests pass for all content types
- [ ] Error handling tests verify graceful degradation
- [ ] Tests run successfully in CI/development environment
- [ ] Code coverage includes all content loading paths

**Files Created:**
- `templates/nextjs/src/__tests__/content-validation.test.ts`

### Task 3.4.2: Verify Build and Runtime Performance
**Priority:** P1 - Important
**Estimated Time:** 30 minutes
**Dependencies:** Task 3.3.3

Validate that content loading doesn't negatively impact build time or runtime performance.

**Implementation Steps:**
1. Run `pnpm build` and verify successful compilation
2. Measure build time compared to baseline (before content system)
3. Test page load performance in development and production
4. Verify no hydration errors or client-side issues
5. Check bundle size impact of content loading system
6. Test hot reload functionality with content file changes

**Performance Requirements:**
- Build time increase <10% compared to baseline
- Page load performance maintained
- No hydration mismatches
- Hot reload works with content file changes
- Bundle size increase is minimal

**Success Criteria:**
- [ ] `pnpm build` completes successfully
- [ ] Build time is within acceptable range
- [ ] Page loads correctly in production build
- [ ] No hydration errors in browser console
- [ ] Hot reload works when modifying content files
- [ ] Bundle analysis shows minimal size impact

### Task 3.4.3: Create Documentation and Usage Examples
**Priority:** P2 - Important
**Estimated Time:** 45 minutes
**Dependencies:** Task 3.4.2

Create comprehensive documentation for the content system testing framework.

**Implementation Steps:**
1. Document content directory structure and file organization
2. Create usage examples for each content type
3. Document schema validation and error handling
4. Create migration guide for moving from hardcoded to content-driven
5. Add troubleshooting guide for common content issues
6. Document fallback system behavior

**Documentation Requirements:**
- Clear content file structure guidelines
- Schema validation examples and error resolution
- Step-by-step migration process from hardcoded content
- Troubleshooting guide for development issues
- Best practices for content organization

**Success Criteria:**
- [ ] Documentation covers all content system features
- [ ] Examples are clear and actionable
- [ ] Migration guide is step-by-step and complete
- [ ] Troubleshooting guide addresses common issues
- [ ] Documentation follows project style guidelines

**Files Created:**
- `templates/nextjs/docs/content-system-testing.md`

## Phase 3.5: Integration Validation

### Task 3.5.1: End-to-End Testing Across Deployment Contexts
**Priority:** P0 - Critical Path
**Estimated Time:** 60 minutes
**Dependencies:** Task 3.4.2

Validate the content system works correctly in both template development and simulated instance deployment contexts.

#### 3.5.1.1: Test Template Development Context
- [ ] Verify current monorepo content loading
  - [ ] Run development server: `pnpm dev`
  - [ ] Navigate to `/test-example-2` page
  - [ ] Verify all content loads from `templates/nextjs/src/content/`
  - [ ] Check browser console for any errors
  - [ ] Verify all cards display content correctly
  - [ ] Success: Content loading works in template development

#### 3.5.1.2: Simulate Instance Deployment Context
- [ ] Create simulated instance environment
  - [ ] Temporarily create `src/content/` directory (simulating deployed template)
  - [ ] Copy all content from `templates/nextjs/src/content/` to `src/content/`
    ```bash
    mkdir -p src/content
    cp -r templates/nextjs/src/content/* src/content/
    ```
  - [ ] Modify content provider to use `src/content/` path
  - [ ] Test page still loads correctly
  - [ ] Clean up simulation after testing
  - [ ] Success: Content loading works in simulated instance context

#### 3.5.1.3: Test Path Resolution Logic
- [ ] Verify automatic path detection
  - [ ] Test content provider path resolution logic
  - [ ] Ensure it detects correct content directory in both contexts
  - [ ] Add logging to verify which path is being used
    ```typescript
    console.log('Content loading from:', this.contentPath);
    ```
  - [ ] Verify no hardcoded paths in content loading
  - [ ] Success: Path resolution adapts automatically to deployment context

#### 3.5.1.4: Test Error Handling Consistency
- [ ] Test error scenarios in both contexts
  - [ ] Template context: Temporarily remove a content file
  - [ ] Verify graceful fallback behavior
  - [ ] Check error messages are clear and helpful
  - [ ] Instance context: Repeat same test in simulated environment
  - [ ] Ensure error handling is consistent across contexts
  - [ ] Success: Error handling works consistently across deployment contexts

#### 3.5.1.5: Validate Schema Compliance Across Contexts
- [ ] Test schema validation in both environments
  - [ ] Template context: Run content validation tests
  - [ ] Instance context: Run same tests in simulated environment
  - [ ] Verify schema validation works regardless of content location
  - [ ] Test with invalid content in both contexts
  - [ ] Success: Schema validation works consistently across contexts

#### 3.5.1.6: Performance Testing Across Contexts
- [ ] Measure performance in both environments
  - [ ] Template context: Measure page load time with dev tools
  - [ ] Instance context: Measure same metrics in simulated environment
  - [ ] Verify content loading doesn't add significant overhead
  - [ ] Check that build times are acceptable in both contexts
  - [ ] Success: Performance is acceptable in both deployment contexts

#### 3.5.1.7: Test Complete Testing Matrix
- [ ] Systematically test all scenarios
  - [ ] Template Development + Working Content: ✅
  - [ ] Template Development + Missing Content: ✅ (graceful fallback)
  - [ ] Template Development + Invalid Content: ✅ (clear errors)
  - [ ] Instance Deployment + Working Content: ✅
  - [ ] Instance Deployment + Missing Content: ✅ (graceful fallback)
  - [ ] Instance Deployment + Invalid Content: ✅ (clear errors)
  - [ ] Success: All testing matrix scenarios pass

**Overall Success Criteria:**
- [ ] Content loading works in template development context
- [ ] Content loading works in simulated instance context
- [ ] Path resolution adapts correctly to deployment context
- [ ] Error handling works consistently across contexts
- [ ] No deployment-specific configuration required
- [ ] All test scenarios pass in testing matrix

### Task 3.5.2: Validate UI Component Integration
**Priority:** P1 - Important
**Estimated Time:** 45 minutes
**Dependencies:** Task 3.5.1

Ensure all UI components properly render content-driven data and maintain visual consistency.

**Implementation Steps:**
1. Visual comparison test between original and content-driven test-example-2
2. Test all card component variants with content loading
3. Verify responsive behavior is maintained
4. Test carousel functionality with content-driven items
5. Validate image loading and hover effects
6. Ensure accessibility attributes are preserved

**Component Integration Requirements:**
- BlogCardImage renders identically with content vs hardcoded props
- ProjectCard displays all features and actions correctly
- QuoteCard maintains proper styling and typography
- CardCarousel navigation and autoplay work correctly
- All responsive breakpoints function properly

**Success Criteria:**
- [ ] Visual appearance is pixel-perfect compared to original
- [ ] All interactive features work correctly
- [ ] Responsive design behavior is maintained
- [ ] Image loading and hover effects function properly
- [ ] Accessibility features are preserved
- [ ] No visual regressions detected

**Documentation Required:**
- Visual regression test report
- Component integration validation checklist

## Success Criteria Summary

### Phase 3 Complete When:
1. **Content Integration**: test-example-2 successfully loads all content from markdown files
2. **Path Resolution**: Content loading works in both template development and instance contexts  
3. **Schema Validation**: All content types validate against defined schemas
4. **Error Handling**: Missing or invalid content degrades gracefully
5. **Developer Experience**: Clear error messages for content issues during development
6. **Performance**: Content loading doesn't impact page performance significantly

### Quality Gates:
- [ ] All tasks marked as completed with success criteria met
- [ ] `pnpm build` passes without errors
- [ ] `pnpm typecheck` passes without errors
- [ ] Visual regression tests pass
- [ ] Performance benchmarks are within acceptable range
- [ ] Documentation is complete and accurate

### Deliverables:
- Complete content directory structure with sample content
- Schema validation system with comprehensive error handling
- Transformed test-example-2 page using content loading
- Content provider prototype for framework abstraction
- Comprehensive test suite for content validation
- Documentation and usage examples
- Performance validation and optimization