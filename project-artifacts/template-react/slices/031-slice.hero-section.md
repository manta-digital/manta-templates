
---
item: hero-section
project: manta-templates
type: slice
github: https://github.com/manta-digital/manta-templates/issues/73
dependencies: []
projectState: React template with existing ui-core framework-agnostic architecture, navigation components completed
status: not-started
lastUpdated: 2025-09-20
---

# Slice Design: Hero Section Component

## Overview
Design for hero section slice providing multiple hero-section variants for business/marketing websites:
* **Static/Traditional**: HTML content with background image, text overlay, and CTA buttons
* **Video Background**: Hero section with video background, darkening overlay, no player controls
* **Slide Hero**: Multi-slide carousel with transitions, autoplay, minimal controls
* **Animated Text**: Hero with animated text effects and transitions

**Effort Level**: 3/5 (Medium complexity due to video handling and animation requirements)

## High-Level Design
We need to provide a hero section for our templates that leverages existing components and follows our framework-agnostic architecture. The component should accommodate multiple hero section types while maintaining bundle size efficiency and theme integration.

Key requirements:
* Framework-agnostic (works across React, Next.js, Electron templates)
* Multiple variants (static, video, slides, animated)
* Content-driven configuration
* Theme integration with existing design tokens
* Responsive design with mobile optimization
* Accessibility compliance
* Reuse existing ui-core components where possible

## Low-Level Design

### 1. Technical Decisions

**Option A: Single Monolithic Hero Component** (❌ Rejected)
- Would become complex and hard to maintain
- Mixing video, slides, and static content in one component
- Difficult to optimize bundle size per use case

**Option B: Separate Hero Components per Type** (❌ Rejected)  
- Code duplication across variants
- Inconsistent API and styling
- More maintenance overhead

**Option C: Modular Hero System with Variant Architecture** (✅ Selected)
- Base `HeroSection` component with variant prop
- Composition pattern for different content types
- Shared styling via CVA variants
- Individual optimization per variant type
- Consistent API across all hero types

### 2. Component Architecture

```
HeroSection (main wrapper)
├── HeroContent (content wrapper with positioning)
├── HeroBackground (handles different background types)
│   ├── HeroImageBackground (static image)
│   ├── HeroVideoBackground (video with overlay)
│   └── HeroSlideBackground (carousel slides)
├── HeroOverlay (darkening/styling overlay)
├── HeroText (text content with animations)
└── HeroCTA (call-to-action buttons)
```

### 3. Implementation Pattern

**Framework-Agnostic Architecture**
Following the established ui-core pattern:
- Framework-agnostic hero logic and styling
- Dependency injection for `LinkComponent`, `ImageComponent`, `VideoComponent`
- Content-driven configuration via `HeroContent` interface
- CVA variants for layout and styling options

**Content Structure:**
```typescript
interface HeroContent {
  // Content
  title: string;
  subtitle?: string;
  description?: string;
  
  // Call-to-action
  primaryCTA?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  secondaryCTA?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  
  // Background configuration
  background: {
    type: 'image' | 'video' | 'slides' | 'gradient';
    image?: string;
    imageDark?: string;
    video?: {
      src: string;
      poster?: string;
      autoPlay?: boolean;
      loop?: boolean;
      muted?: boolean;
    };
    slides?: Array<{
      image: string;
      title?: string;
      subtitle?: string;
    }>;
    gradient?: string;
  };
  
  // Visual options
  overlay?: {
    opacity: number;
    color?: string;
  };
  
  // Animation options
  animations?: {
    text?: 'fade' | 'slide' | 'typewriter' | 'none';
    background?: 'parallax' | 'ken-burns' | 'none';
    duration?: number;
  };
}
```

### 4. Component Specifications

**CVA Variants System:**
```typescript
const heroSectionVariants = cva(
  "relative w-full overflow-hidden",
  {
    variants: {
      size: {
        sm: "min-h-[400px]",
        md: "min-h-[500px]", 
        lg: "min-h-[600px]",
        xl: "min-h-screen",
      },
      contentPosition: {
        left: "items-center justify-start text-left",
        center: "items-center justify-center text-center",
        right: "items-center justify-end text-right",
      },
      variant: {
        default: "",
        fullscreen: "h-screen",
        split: "grid grid-cols-1 lg:grid-cols-2",
      }
    },
    defaultVariants: {
      size: "lg",
      contentPosition: "center",
      variant: "default",
    }
  }
);

const heroTextVariants = cva(
  "space-y-4 z-10 relative",
  {
    variants: {
      textSize: {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
      },
      animation: {
        none: "",
        fade: "animate-in fade-in-0 duration-1000",
        slide: "animate-in slide-in-from-bottom-4 duration-1000", 
        typewriter: "animate-typewriter",
      }
    }
  }
);
```

### 5. Data Flow and Component Interactions

```
User Configuration → HeroContent → HeroSection
├── Background Type Selection → HeroBackground Component
├── Content Positioning → HeroText Component  
├── CTA Configuration → HeroCTA Component
└── Animation Settings → CSS Classes + Framer Motion
```

**State Management:**
- Local component state for slide navigation (if slides variant)
- Video state management (play/pause, loading)
- Animation state for entrance effects
- Responsive state for mobile adaptations

### 6. Cross-slice Dependencies

**Current Dependencies:**
- **Existing Button Components**: Reuse for CTA buttons
- **Container Component**: For content width constraints
- **Theme System**: Integrates with existing design tokens
- **CVA Variants**: Follows established styling patterns

**Provides Interfaces For:**
- Landing pages and marketing sites
- Product showcase pages
- Corporate websites
- Portfolio and personal sites

**Potential Conflicts:**
- **Video Loading**: May impact page load performance
- **Bundle Size**: Video handling and animation libraries
- **Accessibility**: Video autoplay and animation preferences
- **Mobile Performance**: Large background images/videos

### 7. Implementation Considerations

**Performance Optimizations:**
- Lazy loading for video content
- Intersection observer for animation triggers
- Responsive image loading (different sizes for mobile/desktop)
- Preload critical hero content

**Accessibility Features:**
- Respect `prefers-reduced-motion` for animations
- Proper heading hierarchy (h1 for hero title)
- Alt text for background images
- Video captions support
- Keyboard navigation for slides

**Mobile Responsiveness:**
- Different background images for mobile
- Adjusted text sizing and spacing
- Touch-friendly CTA buttons
- Optimized video formats for mobile

**Bundle Size Management:**
- Optional imports for video functionality
- Tree-shakeable animation libraries (Framer Motion)
- Efficient image formats (WebP, AVIF support)
- CSS-only animations where possible

### 8. Animation and Effects

**Text Animations (CSS + optional Framer Motion):**
- Fade in effects
- Slide up from bottom
- Typewriter effect for titles
- Staggered animation for multiple elements

**Background Effects:**
- Parallax scrolling for background images
- Ken Burns effect for static images
- Smooth transitions between slides
- Video fade-in on load

### 9. Files to Create

**Core Component Files:**
- `packages/ui-core/components/hero/HeroSection.tsx` - Main component
- `packages/ui-core/components/hero/HeroBackground.tsx` - Background handling
- `packages/ui-core/components/hero/HeroText.tsx` - Text content with animations
- `packages/ui-core/components/hero/HeroCTA.tsx` - Call-to-action buttons
- `packages/ui-core/components/hero/index.ts` - Exports

**Type Definitions:**
- `packages/ui-core/types/hero.ts` - Hero interfaces
- Update `packages/ui-core/types/index.ts` - Export hero types

**Template Integration Files:**
- Template copies in all three templates (React, Next.js, Electron)
- Example pages demonstrating different hero variants

### 10. Success Criteria

- [ ] HeroSection renders with all size and position variants
- [ ] Static hero with background image works correctly
- [ ] Video background hero functions with overlay and controls
- [ ] Slide hero transitions smoothly with autoplay
- [ ] Text animations respect motion preferences
- [ ] CTA buttons integrate with framework routing
- [ ] Responsive design works across all screen sizes
- [ ] Theme variants apply correctly in light/dark modes
- [ ] Component builds without TypeScript errors
- [ ] Performance targets met (< 3s hero load time)
- [ ] Accessibility audit passes (WAVE, axe-core)
- [ ] All template targets receive updated component via copy process

## Future Enhancements (Post-Slice)

- **Advanced Animations**: GSAP integration for complex effects
- **Interactive Elements**: Scroll-triggered animations
- **Video Optimization**: Adaptive bitrate streaming
- **Analytics Integration**: Hero interaction tracking
- **A/B Testing**: Multiple hero variants
- **Performance Monitoring**: Core Web Vitals tracking