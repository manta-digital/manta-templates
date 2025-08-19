# UI Refactor Tasks - Expanded

## Phase 2: Core Component Extraction

### Extract Base UI Primitives
- [x] Move BaseCard component to ui-core
  - [x] Copy templates/nextjs/src/components/cards/BaseCard.tsx to packages/ui-core/src/components/ui/BaseCard.tsx
  - [x] Remove Next.js specific imports from BaseCard
    1. Remove any `import` statements referencing 'next/*'
    2. Replace `import Image from 'next/image'` with generic Image prop pattern
    3. Replace `import Link from 'next/link'` with generic Link prop pattern
  - [x] Abstract Image dependency using dependency injection
    1. Update BaseCard interface to accept optional ImageComponent:
    ```typescript
    interface BaseCardProps {
      // existing props...
      ImageComponent?: React.ComponentType<any>;
    }
    ```
    2. Use ImageComponent || 'img' as fallback in component
- [x] Move Button component to ui-core
  - [x] Copy templates/nextjs/src/components/ui/button.tsx to packages/ui-core/src/components/ui/Button.tsx
  - [x] Abstract any Next.js dependencies (likely minimal for Button)
  - [x] Update import/export paths to use ui-core structure
- [x] Create generic Image and Link primitives with dependency injection
  - [x] Create packages/ui-core/src/components/primitives/Image.tsx
    1. Implement with this pattern:
    ```typescript
    interface CoreImageProps {
      src: string;
      alt: string;
      className?: string;
      ImageComponent?: React.ComponentType<any>;
      [key: string]: any;
    }
    
    export const CoreImage: React.FC<CoreImageProps> = ({ 
      ImageComponent = 'img', 
      ...props 
    }) => {
      const Component = ImageComponent;
      return <Component {...props} />;
    };
    ```
  - [x] Create packages/ui-core/src/components/primitives/Link.tsx
    1. Implement with dependency injection pattern similar to Image
- [x] Update component exports
  - [x] Add BaseCard and Button to packages/ui-core/src/components/ui/index.ts:
    ```typescript
    export { BaseCard } from './BaseCard';
    export { Button } from './Button';
    ```
  - [x] Add primitives to packages/ui-core/src/components/primitives/index.ts:
    ```typescript
    export { CoreImage } from './Image';
    export { CoreLink } from './Link';
    ```
- [x] Test extraction
  - [x] Build ui-core: `pnpm build`
  - [x] Verify components can be imported: `import { BaseCard, Button } from '@manta-templates/ui-core'`
  - [x] Success: BaseCard and Button work independently without Next.js dependencies

### Extract and Abstract Core Cards
- [x] Move BlogCard with dependency injection
  - [x] Copy templates/nextjs/src/components/cards/BlogCard.tsx to packages/ui-core/src/components/cards/BlogCard.tsx
  - [x] Update BlogCard interface to accept ImageComponent and LinkComponent props
    1. Add to BlogCardProps:
    ```typescript
    interface BlogCardProps {
      // existing props...
      ImageComponent?: React.ComponentType<any>;
      LinkComponent?: React.ComponentType<any>;
    }
    ```
  - [x] Replace direct Next.js Image usage with injected ImageComponent
    1. Replace `<Image` with `<ImageComponent` or fallback to `<img`
    2. Update props to work with generic image component
  - [x] Replace direct Next.js Link usage with injected LinkComponent
    1. Replace `<Link` with `<LinkComponent` or fallback to `<a`
  - [x] Update imports to use ui-core utilities
    1. Change `import { cn } from '@/lib/utils'` to relative import from ui-core utils
- [x] Move ProjectCard with abstracted dependencies
  - [x] Copy templates/nextjs/src/components/cards/ProjectCard.tsx to packages/ui-core/src/components/cards/ProjectCard.tsx
  - [x] Apply same dependency injection pattern as BlogCard
  - [x] Abstract Next.js Link and Image usage
  - [x] Update utility imports to use ui-core paths
- [x] Move QuoteCard (minimal abstraction needed)
  - [x] Copy templates/nextjs/src/components/cards/QuoteCard.tsx to packages/ui-core/src/components/cards/QuoteCard.tsx
  - [x] Update utility imports to relative ui-core paths
  - [x] Minimal changes needed since QuoteCard likely has fewer Next.js dependencies
- [x] Update component interfaces and exports
  - [x] Ensure all card interfaces are properly typed with optional injected components
  - [x] Add cards to packages/ui-core/src/components/cards/index.ts:
    ```typescript
    export { BlogCard } from './BlogCard';
    export { ProjectCard } from './ProjectCard';  
    export { QuoteCard } from './QuoteCard';
    ```
- [x] Test card extraction
  - [x] Build ui-core package
  - [x] Test importing cards with mock injected components
  - [x] Verify cards render without errors when dependencies are injected
  - [x] Success: Cards render correctly with injected dependencies, maintain full functionality

### Extract Layout Components
- [x] Move BentoLayout to ui-core
  - [x] Copy templates/nextjs/src/components/layouts/bento-layout.tsx to packages/ui-core/src/components/layouts/BentoLayout.tsx
  - [x] Abstract any framework-specific dependencies (likely minimal for BentoLayout)
  - [x] Update utility imports to use ui-core relative paths
- [x] Move GridLayout system to ui-core
  - [x] Copy entire GridLayout system to ui-core:
    1. templates/nextjs/src/components/layouts/grid-layout/grid-container.tsx → packages/ui-core/src/components/layouts/GridContainer.tsx
    2. templates/nextjs/src/components/layouts/grid-layout/grid-item.tsx → packages/ui-core/src/components/layouts/GridItem.tsx  
    3. templates/nextjs/src/components/layouts/grid-layout/grid-layout.tsx → packages/ui-core/src/components/layouts/GridLayout.tsx
  - [x] Update internal imports within GridLayout system to use relative paths
  - [x] Update index.ts file references
- [x] Move Container component to ui-core
  - [x] Copy templates/nextjs/src/components/container.tsx to packages/ui-core/src/components/layouts/Container.tsx
  - [x] Abstract any framework-specific dependencies
  - [x] Update utility imports
- [x] Update layout exports
  - [x] Add layouts to packages/ui-core/src/components/layouts/index.ts:
    ```typescript
    export { BentoLayout } from './BentoLayout';
    export { GridLayout } from './GridLayout';
    export { GridContainer } from './GridContainer';
    export { GridItem } from './GridItem';
    export { Container } from './Container';
    ```
- [x] Test layout extraction
  - [x] Build ui-core package
  - [x] Test importing and using layout components
  - [x] Verify Tailwind classes work correctly
  - [x] Success: Layout components work with any React framework, no Next.js coupling

## Phase 2 Extended: Additional Card Component Extraction

### Extract Blog Variant Cards
- [x] Extract BlogCardImage to ui-core
  - [x] Copy templates/nextjs/src/components/cards/BlogCardImage.tsx to packages/ui-core/src/components/cards/BlogCardImage.tsx
  - [x] CRITICAL: Preserve exact CSS layout and Tailwind classes - do not approximate
  - [x] Update BlogCardImage interface to accept ImageComponent and LinkComponent props:
    ```typescript
    interface BlogCardImageProps {
      // existing props...
      ImageComponent?: React.ComponentType<any>;
      LinkComponent?: React.ComponentType<any>;
    }
    ```
  - [x] Replace direct Next.js Image usage with conditional rendering:
    1. Replace `<Image` with conditional `ImageComponent ? <ImageComponent : <img`
    2. Update props to work with both Next.js Image and standard img
    3. Maintain exact aspect ratios and sizing from original
  - [x] Replace direct Next.js Link usage with conditional rendering
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test with Next.js components injected - verify exact visual match to original
  - [x] Success: BlogCardImage renders identically to original with dependency injection

- [x] Extract BlogCardWide to ui-core
  - [x] Copy templates/nextjs/src/components/cards/BlogCardWide.tsx to packages/ui-core/src/components/cards/BlogCardWide.tsx
  - [x] CRITICAL: Preserve exact CSS layout and Tailwind classes - do not approximate
  - [x] Apply same dependency injection pattern as BlogCardImage
  - [x] Update interface for ImageComponent and LinkComponent props
  - [x] Abstract Next.js dependencies with conditional rendering
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test with Next.js components injected - verify exact visual match to original
  - [x] Success: BlogCardWide renders identically to original with dependency injection

### Extract Specialized Cards
- [x] Extract AnimatedCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/animations/AnimatedCard.tsx to packages/ui-core/src/components/cards/AnimatedCard.tsx
  - [x] CRITICAL: Preserve exact animations and Tailwind classes - do not approximate
  - [x] Identify animation dependencies (Framer Motion, CSS animations, etc.)
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Handle animation library dependencies:
    1. Check if animations use Framer Motion or other libraries
    2. Keep animation logic intact - do not simplify or approximate
    3. Ensure animations work with framework-agnostic approach
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test animations work correctly with dependency injection
  - [x] Success: AnimatedCard maintains exact animation behavior and visual appearance

- [x] Extract GradientCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/variants/GradientCard.tsx to packages/ui-core/src/components/cards/GradientCard.tsx
  - [x] CRITICAL: Preserve exact gradient styles and Tailwind classes - do not approximate
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Maintain gradient calculations and CSS custom properties
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test gradient rendering across different themes/modes
  - [x] Success: GradientCard renders with exact gradients and styling

- [x] Extract AboutCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/people/AboutCard.tsx to packages/ui-core/src/components/cards/AboutCard.tsx
  - [x] CRITICAL: Preserve exact layout and Tailwind classes - do not approximate
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Handle person/profile image requirements with ImageComponent
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test with person data and profile images
  - [x] Success: AboutCard renders identically to original with dependency injection

### Extract Media Cards (Complex)
- [x] Extract VideoCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/VideoCard.tsx to packages/ui-core/src/components/cards/VideoCard.tsx
  - [x] CRITICAL: Preserve exact video layout and Tailwind classes - do not approximate
  - [x] Analyze video player dependencies and requirements
  - [x] Apply dependency injection pattern for:
    1. ImageComponent (for video thumbnails)
    2. LinkComponent (for video links)
    3. VideoComponent (for video player - may need custom injection pattern)
  - [x] Handle video-specific features:
    1. Video thumbnails and poster images
    2. Play button overlays and controls
    3. Video player integration (maintain existing player setup)
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test video functionality with Next.js components injected
  - [x] Success: VideoCard maintains exact video functionality and appearance

- [x] Extract ThreeJSCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/ThreeJSCard.tsx to packages/ui-core/src/components/cards/ThreeJSCard.tsx
  - [x] CRITICAL: Preserve exact 3D rendering and layout - do not approximate
  - [x] Analyze Three.js dependencies and WebGL requirements
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Handle Three.js specific features:
    1. WebGL canvas integration
    2. 3D scene setup and rendering
    3. Animation loops and interactions
    4. Ensure Three.js imports and setup remain intact
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test 3D rendering works correctly across frameworks
  - [x] Success: ThreeJSCard maintains exact 3D functionality and rendering

- [x] Extract CosineTerrainCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/math/CosineTerrainCard.tsx to packages/ui-core/src/components/cards/CosineTerrainCard.tsx
  - [x] CRITICAL: Preserve exact mathematical visualization and layout - do not approximate
  - [x] Analyze mathematical rendering dependencies (Canvas, SVG, etc.)
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Handle mathematical visualization features:
    1. Canvas or SVG rendering for terrain
    2. Mathematical calculations and algorithms
    3. Animation and interactive features
    4. Maintain exact mathematical accuracy
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test mathematical visualizations render correctly
  - [x] Success: CosineTerrainCard maintains exact mathematical visualization behavior

### Extract Layout Cards
- [x] Extract CardCarousel to ui-core
  - [x] Copy templates/nextjs/src/components/cards/layouts/CardCarousel.tsx to packages/ui-core/src/components/layouts/CardCarousel2.tsx.  Work on CardCarousel2 as Carousel until this is verified functioning correctly.  DO NOT break the existing carousel.  We will use it for comparison until this one is complete.
  - [x] CRITICAL: Preserve exact carousel behavior and Tailwind classes - do not approximate.  This includes: correctly functioning infinite carousel, no jump-back, jump-forward or other inconcistencies,  one slide visible (this is configurable I believe and it should stay that way)
  - [x] Analyze carousel dependencies (Swiper, custom carousel logic, etc.)
  - [x] Apply dependency injection pattern for:
    1. ImageComponent (for carousel item images)
    2. LinkComponent (for carousel item links)
    3. ButtonComponent, ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon
    4. MotionComponent for animations
  - [x] Handle carousel-specific features:
    1. Touch/swipe gestures
    2. Navigation arrows and pagination
    3. Auto-play and transition animations
    4. Responsive breakpoints for carousel behavior
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test carousel functionality across different screen sizes
  - [x] Success: CardCarousel2 maintains exact carousel functionality and behavior with dependency injection

### Update Exports and Testing
- [x] Update component exports
  - [x] Add all new cards to packages/ui-core/src/components/cards/index.ts:
    ```typescript
    // Blog variants
    export { BlogCardImage } from './BlogCardImage';
    export { BlogCardWide } from './BlogCardWide';
    
    // Specialized cards
    export { AnimatedCard } from './AnimatedCard';
    export { GradientCard } from './GradientCard';
    export { AboutCard } from './AboutCard';
    
    // Media cards
    export { VideoCard } from './VideoCard';
    export { ThreeJSCard } from './ThreeJSCard';
    export { CosineTerrainCard } from './CosineTerrainCard';
    ```
  - [x] Add CardCarousel to packages/ui-core/src/components/layouts/index.ts:
    ```typescript
    export { CardCarousel } from './CardCarousel';
    ```

### Extract missing ArticleCard
- [x] Copy templates/nextjs/src/components/cards/ArticleCard.tsx to packages/ui-core/src/components/cards/ArticleCard.tsx
- [x] CRITICAL: Preserve exact article layout and Tailwind classes - do not approximate
- [x] Apply dependency injection pattern for ImageComponent and LinkComponent
- [x] Handle article-specific features AS APPLICABLE (if you don't know, ASK):
  1. Article thumbnail and image handling — [x] implemented via injected `ImageComponent` plus `imageProps` passthrough
  2. Article metadata display (author, date, etc.) — [n/a] not present in original ArticleCard
  3. Article content rendering — [n/a] not applicable beyond title/subtitle/description present
  4. Article-specific interactions — [n/a] none in original
- [x] Update utility imports to use ui-core relative paths
- [x] Test article functionality with Next.js components injected (using `templates/nextjs/src/app/test-extracted/page.tsx`)
- [x] Success: ArticleCard maintains exact article functionality and appearance

- [ ] Comprehensive testing of extracted cards
  - [ ] Build ui-core package: `pnpm build-ui`
  - [ ] Create comprehensive test page for all new cards -- use existing if possible!
  - [ ] Test each card with Next.js Image and Link components injected
  - [ ] Verify exact visual and functional match to originals
  - [ ] Test responsive behavior and animations
  - [ ] Test video and 3D functionality where applicable
  - [ ] Success: All extracted cards render and function identically to originals

## Phase 2 Final: Comprehensive Testing Infrastructure

### Create Test Suite for Next.js Integration
- [ ] Create comprehensive test page for all extracted components
  - [ ] Create templates/nextjs/src/app/test-all-cards/page.tsx
  - [ ] Import and test ALL extracted cards with Next.js Image and Link injection
  - [ ] Include edge cases, different props, responsive behavior
  - [ ] Test dark/light mode compatibility for all cards
  - [ ] Test animations, videos, 3D rendering where applicable
  - [ ] Document visual regression testing approach

- [ ] Create unit/integration tests (high priority for accuracy)
  - [ ] Set up testing infrastructure in ui-core package
  - [ ] Create tests for each component with mocked Image/Link components
  - [ ] Test dependency injection patterns work correctly
  - [ ] Test component props and interfaces
  - [ ] Test responsive behavior programmatically
  - [ ] Success: Comprehensive test coverage prevents regressions

- [ ] Performance testing and optimization
  - [ ] Test bundle size impact of extracted components
  - [ ] Verify no performance degradation from dependency injection
  - [ ] Test lazy loading and code splitting compatibility
  - [ ] Success: Performance maintained or improved over originals

