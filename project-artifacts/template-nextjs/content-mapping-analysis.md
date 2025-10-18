---
layer: project
docType: analysis
slice: markdown-content
phase: 3
task: 3.3.1
---

# Content Mapping Analysis: test-example-2

## Current Component Structure

The test-example-2 page (`templates/nextjs/src/app/test-example-2/page.tsx`) contains a BentoLayout with the following components and hardcoded content:

### 1. Hero Section (Lines 15-17)
**Component:** GradientCard
**Grid Position:** `col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-2 xl:row-span-2`
**Hardcoded Content:**
- title: "Theme Test Grid"
- description: "Switch palette and dark/light to validate tokens"
- gradient: "teal"

**Content Mapping:** This appears to be a static UI test component - no markdown mapping needed.

### 2. Carousel Section (Lines 20-72)
**Component:** CardCarousel
**Grid Position:** `col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-4 xl:row-span-2`

#### 2.1 Carousel Item 1 - BlogCardImage (Lines 34-41)
**Hardcoded Content:**
- title: "Carousel Article"
- excerpt: "Testing image hover inside carousel."
- coverImageUrl: "/image/blog-sample-image.png"
- slug: "/blog/sample-post"
- textColorClassName: "text-white"

**Content Mapping:** → `templates/nextjs/src/content/example-2/carousel-hero.md`
**Schema:** ArticleSchema

#### 2.2 Carousel Item 2 - ProjectCard (Lines 42-61)
**Hardcoded Content:**
- title: 'Semantic Colors'
- description: 'Cards using accent and foreground tokens'
- techStack: ['Next.js', 'Tailwind v4', 'Radix']
- displayVariant: 'showcase'
- image: '/image/blog-sample-image.png'
- repoUrl: 'https://github.com/manta-templates/semantic-colors'
- features: [4 feature objects with label, icon, color]
- actions: [{ label: 'View on GitHub', href: '...', variant: 'outline' }]

**Content Mapping:** → `templates/nextjs/src/content/example-2/carousel-project.md`
**Schema:** ProjectSchema

#### 2.3 Carousel Item 3 - BackgroundVideo (Lines 64-70)
**Component:** BaseCard with BackgroundVideo
**Hardcoded Content:**
- src: "https://www.w3schools.com/html/mov_bbb.mp4"
- poster: "/image/blog-sample-image.png"
- title: "Background Video Demo" (in overlay)

**Content Mapping:** → `templates/nextjs/src/content/example-2/carousel-video.md`
**Schema:** ArticleSchema (for metadata, video URLs in frontmatter)

### 3. Featured Article (Lines 75-84)
**Component:** BlogCardImage
**Grid Position:** `col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2 xl:col-span-2`
**Hardcoded Content:**
- title: "Colors and Themes"
- excerpt: "Radix scales with semantic aliasing and palette switching. Testing making this a longer description to see how it handles the card layout."
- coverImageUrl: "/image/blog-sample-image.png"
- slug: "/blog/sample-post"
- textColorClassName: "text-white"

**Content Mapping:** → `templates/nextjs/src/content/articles/theme-guide.md`
**Schema:** ArticleSchema

### 4. Secondary Blog Card (Lines 87-89)
**Component:** BlogCardImage
**Grid Position:** `col-span-8 md:col-span-8 lg:col-span-5 xl:col-span-3`
**Hardcoded Content:**
- title: "Foreground and Borders"
- excerpt: "This card validates text-card-foreground and border tokens over imagery."
- coverImageUrl: "/image/blog-sample-image.png"
- textColorClassName: "text-white"

**Content Mapping:** This appears to be a UI test component - likely keep as static or create minimal content file if needed.

### 5. Cosine Terrain Card (Lines 92-94)
**Component:** CosineTerrainCard
**Grid Position:** `col-span-8 md:col-span-8 md:row-span-2 lg:col-span-5 lg:row-span-1`
**Content:** No hardcoded content - pure visual component

**Content Mapping:** No mapping needed - visual component only.

### 6. Technology Scroller (Lines 96-107)
**Component:** TechnologyScroller inside BaseCard
**Grid Position:** `col-span-8 md:col-span-8 lg:col-span-4`
**Hardcoded Content:**
- items: Array of technology objects (Next.js, Tailwind CSS, React)

**Content Mapping:** This is configuration data - likely keep as static or make configurable later.

### 7. Quote Card (Lines 110-112)
**Component:** QuoteCard
**Grid Position:** `col-span-8 md:col-span-8 lg:col-span-4`
**Hardcoded Content:**
- quote: "Make the easy path the right path—semantic tokens everywhere."
- author: "Manta Templates"

**Content Mapping:** → `templates/nextjs/src/content/quotes/design-philosophy.md`
**Schema:** QuoteSchema

## Layout Preservation Requirements

### Grid Structure
- Uses BentoLayout with 8-column grid system
- Responsive breakpoints: mobile, md, lg, xl
- Row height: `minmax(200px, auto)`
- Gap: 6 units

### Critical Layout Classes to Preserve
- All `col-span-*` and `row-span-*` classes must be maintained
- All responsive breakpoint variants must be preserved
- `h-full` classes on cards are essential for proper layout
- Carousel configuration (autoPlay, visibleCards, etc.) must be preserved

### Component Props to Preserve
- **BlogCardImage:** `textColorClassName="text-white"` for overlay text
- **CardCarousel:** All navigation and autoplay settings
- **ProjectCard:** `displayVariant="showcase"` and all feature/action arrays
- **BaseCard:** className positioning and overflow settings

## Content Files Required

Based on existing task completion, these files already exist:
1. ✅ `templates/nextjs/src/content/example-2/carousel-hero.md`
2. ✅ `templates/nextjs/src/content/example-2/carousel-project.md`
3. ✅ `templates/nextjs/src/content/example-2/carousel-video.md`
4. ✅ `templates/nextjs/src/content/articles/theme-guide.md`
5. ✅ `templates/nextjs/src/content/quotes/design-philosophy.md`

## Migration Strategy

### Phase 1: Component Structure Change
- Convert from client component to async server component
- Remove `"use client"` directive
- Change function to async
- Add content loading imports

### Phase 2: Content Loading Integration
- Replace hardcoded carousel items with content loading
- Replace featured article props with content loading
- Replace quote props with content loading
- Maintain all existing className and styling props

### Phase 3: Error Handling
- Add try-catch blocks around content loading
- Implement fallback content objects
- Ensure graceful degradation

## Visual Consistency Requirements

The transformed page MUST maintain:
- Exact same grid layout and positioning
- All responsive behavior at all breakpoints
- Carousel autoplay and navigation functionality
- Image hover effects and transitions
- Typography and color schemes
- Card padding and spacing
- Visual hierarchy and component relationships

## Next Steps for Task 3.3.2

The analysis shows clear mapping between hardcoded content and the already-created markdown files. The transformation should focus on:

1. Converting to async server component
2. Loading content using the schema-validated loading functions
3. Mapping loaded content to existing component props
4. Preserving all layout and styling classes
5. Adding robust error handling with fallbacks