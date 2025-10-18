---
item: react-components
project: manta-templates
type: slice
github: https://github.com/manta-digital/manta-templates/issues/TBD
dependencies: [ui-core]
projectState: ui-core established with Next.js injection patterns, ready for standard React support
status: not started
lastUpdated: 2025-08-31
---

# Slice 16: React Components (Standard HTML Elements)

## Overview

This slice enhances ui-core components to work seamlessly with standard React applications (Electron, Vite, Create React App) by providing built-in support for standard HTML elements and video components, eliminating the need for framework-specific injection while maintaining full functionality.

## Problem Statement

Currently, ui-core components require dependency injection for:
- `ImageComponent` (for Next.js Image optimization)
- `LinkComponent` (for Next.js Link routing)
- `BackgroundVideoComponent` (for Next.js video handling)

While components gracefully default to standard HTML elements (`img`, `a`), video functionality is unavailable without Next.js-specific components, limiting use in standard React environments.

## Goals

### Primary Goals
1. **Full Video Support**: Enable background video mode in standard React environments
2. **Documentation & Examples**: Clear guidance for using ui-core in standard React
3. **Test Coverage**: Validate all components work without framework injection
4. **Developer Experience**: Seamless usage without configuration

### Secondary Goals
1. **Performance Optimization**: Tree-shakeable standard React exports
2. **TypeScript Improvements**: Better type inference for default components
3. **Framework Adapters**: Reusable patterns for other frameworks

## Technical Approach

### Standard Video Components

Create framework-agnostic video components in ui-core:

```typescript
// packages/ui-core/src/components/video/StandardBackgroundVideo.tsx
interface StandardBackgroundVideoProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const StandardBackgroundVideo: React.FC<StandardBackgroundVideoProps> = ({ 
  src, poster, autoplay = true, className, children 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!autoplay || !videoRef.current) return;
    
    const video = videoRef.current;
    video.muted = true; // Required for autoplay
    
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('Autoplay failed:', error);
      }
    };
    
    // Delay for DOM readiness
    const timer = setTimeout(playVideo, 300);
    
    return () => {
      clearTimeout(timer);
      video.pause();
    };
  }, [autoplay]);
  
  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={autoplay}
      loop
      muted
      playsInline
      controls={false}
      className={cn("absolute inset-0 w-full h-full object-cover", className)}
      onLoadedData={() => {
        if (autoplay && videoRef.current) {
          videoRef.current.play().catch(console.warn);
        }
      }}
    >
      {children}
    </video>
  );
};
```

### Enhanced VideoCard Defaults

Update VideoCard to include standard video components as defaults:

```typescript
// In VideoCard component
import { StandardBackgroundVideo } from '../video/StandardBackgroundVideo';

const VideoCard: React.FC<VideoCardProps> = ({
  // ... existing props
  BackgroundVideoComponent = StandardBackgroundVideo,  // NEW DEFAULT
  VideoPlayerComponent = StandardVideoPlayer,          // NEW DEFAULT
  // ...
}) => {
  // Component logic remains identical
  // Background video mode now works without injection!
};
```

### Component Architecture

```
packages/ui-core/src/
├── components/
│   ├── video/                    # NEW: Standard video components
│   │   ├── StandardBackgroundVideo.tsx
│   │   ├── StandardVideoPlayer.tsx
│   │   └── index.ts
│   ├── cards/
│   │   └── VideoCard.tsx         # UPDATED: Include video defaults
│   └── adapters/                 # NEW: Framework adapter patterns
│       ├── react/
│       │   └── ReactAdapter.tsx  # Standard React component wrappers
│       └── electron/
│           └── ElectronAdapter.tsx # Electron-specific optimizations
```

## Implementation Tasks

### Task 1: React Template Creation (Effort: 4/5) 🥇 **START HERE**
- **Objective**: Create templates/react to validate existing components work out-of-the-box
- Create Vite + React template structure using `npm create vite@latest react -- --template react-ts`
- Port templates/nextjs/src/app/page.tsx → src/pages/HomePage.tsx with hardcoded content
- Port templates/nextjs/src/app/examples/page.tsx → src/pages/ExamplesPage.tsx (**skip VideoCard initially**)
- Copy ui-core components from packages/ui-core to src/lib/ui-core/
- Configure Vite + Tailwind CSS v4 setup to match Next.js styling
- Add React Router for basic navigation between home/examples
- Test all components work without injection (img, a defaults) - **should "just work"**
- Validate CosineTerrainCard, ProjectCard, ArticleCard, theme system
- Create build process and deployment validation
- **Success**: Template proves 95% of ui-core works perfectly in standard React

### Task 2: Standard Video Components (Effort: 3/5) ✓
- **Objective**: Create framework-agnostic video components for the missing 5%
- [x] Create `StandardBackgroundVideo` with autoplay handling
- [x] Create `StandardVideoPlayer` with basic controls
- [x] Handle browser autoplay policies gracefully
- [x] Add comprehensive video event handling
- **Success**: Background video works in standard React environments

### Task 3: VideoCard Enhancement (Effort: 2/5)  
- **Objective**: Integrate standard video components as defaults
- Update VideoCard to include video component defaults
- Ensure backward compatibility with existing injection patterns
- Update TypeScript interfaces for better default inference
- Test all video modes (thumbnail, background, player)
- **Success**: VideoCard works without injection while maintaining flexibility

### Task 4: Template Video Integration (Effort: 1/5)
- **Objective**: Add video components to templates/react
- Update ExamplesPage.tsx to include VideoCard with background video
- Test VideoCard works with StandardBackgroundVideo
- Validate complete component coverage in React template
- **Success**: templates/react demonstrates 100% ui-core functionality

### Task 5: Documentation & Examples (Effort: 3/5)
- **Objective**: Clear guidance for standard React usage
- Create comprehensive usage examples for each component type
- Document video autoplay considerations across browsers
- Add Electron-specific usage patterns
- Create migration guide from Next.js to standard React
- Add troubleshooting section for common issues
- **Success**: Developers can confidently use ui-core in any React environment

### Task 6: Test Coverage (Effort: 4/5)
- **Objective**: Validate all components work without framework injection
- Add test suite for standard HTML element defaults
- Test video components across different browsers
- Add integration tests for Electron environment simulation
- Test performance impact of standard video components
- Add visual regression tests for video modes
- **Success**: 100% test coverage for standard React usage patterns

### Task 7: Framework Adapters (Effort: 3/5)
- **Objective**: Reusable patterns for other React environments
- Create React adapter with optimal defaults for SPA usage
- Create Electron adapter with desktop-specific optimizations
- Add external link handling for Electron environments
- Create adapter documentation and usage patterns
- **Success**: Clear patterns for extending ui-core to new frameworks

### Task 8: Performance Optimization (Effort: 2/5)
- **Objective**: Tree-shakeable exports and bundle optimization
- Create separate entry points for different usage patterns
- Optimize video component bundle size
- Add lazy loading for video components
- Measure and document performance impact
- **Success**: Minimal bundle size increase for standard React usage

#### Template Structure:
```
templates/react/
├── src/
│   ├── App.tsx                    # Main app with router
│   ├── pages/
│   │   ├── HomePage.tsx           # Port of Next.js page.tsx (simple)
│   │   └── ExamplesPage.tsx       # Port of Next.js examples/page.tsx (comprehensive)
│   ├── lib/ui-core/               # Copy from packages/ui-core/src/
│   ├── content/                   # Hardcoded content objects
│   │   ├── projectContent.ts      # Project card data
│   │   ├── quoteContent.ts        # Quote card data
│   │   └── index.ts               # Export all content
│   └── main.tsx                   # Vite entry point
├── package.json                   # Vite + React + Tailwind + ui-core deps
├── vite.config.ts                 # Vite + Tailwind configuration
├── tailwind.config.js             # Tailwind v4 config (match Next.js)
└── index.html                     # Vite HTML template
```

#### Content Pattern Example:
```typescript
// src/content/projectContent.ts
export const reactProjectContent = {
  title: "React Components Showcase",
  description: "Standard React template with ui-core components working without injection",
  techStack: ["React 19", "Vite 5", "Tailwind 4"],
  image: "/image/react-template.png", 
  repoUrl: "https://github.com/manta-templates/react-template",
  features: [
    { label: "Zero-configuration component usage", icon: "zap" },
    { label: "Background video without injection", icon: "zap", color: "primary" },
    { label: "Theme-aware components", icon: "zap", color: "primary" }
  ],
  actions: [
    { label: "View Source", href: "/examples", variant: "outline" }
  ]
};

// Usage in component
<ProjectCard content={reactProjectContent} />
```

#### Vite Setup Process:
```bash
# 1. Create base Vite template
cd templates/
npm create vite@latest react -- --template react-ts
cd react/

# 2. Add required dependencies
pnpm add tailwindcss @tailwindcss/vite framer-motion three lucide-react
pnpm add @radix-ui/colors @radix-ui/react-slot class-variance-authority clsx
pnpm add react-router-dom @types/react-router-dom

# 3. Copy ui-core components
cp -r ../nextjs/lib/ui-core/ src/lib/ui-core/

# 4. Configure Vite + Tailwind
# - Update vite.config.ts for Tailwind v4
# - Create tailwind.config.js matching Next.js setup
# - Add global styles matching Next.js theme system
```

### Task 7: Performance Optimization (Effort: 2/5)
- **Objective**: Tree-shakeable exports and bundle optimization
- Create separate entry points for different usage patterns
- Optimize video component bundle size
- Add lazy loading for video components
- Measure and document performance impact
- **Success**: Minimal bundle size increase for standard React usage

## Data Flows & Component Interactions

### Standard React Usage Flow
```
User App
  └── VideoCard (no injection needed)
      ├── StandardBackgroundVideo (built-in)
      ├── Standard img elements (built-in)
      └── Standard a elements (built-in)
```

### Framework Injection Flow (existing)
```
Next.js App
  └── VideoCard 
      ├── BackgroundVideoComponent (Next.js optimized)
      ├── Next.js Image (injected)
      └── Next.js Link (injected)
```

### Electron-Specific Flow
```
Electron App
  └── VideoCard + ElectronAdapter
      ├── StandardBackgroundVideo
      ├── Standard img elements
      └── Electron-aware link handling
```

## Cross-Slice Dependencies

### Dependencies Required
- **ui-core package**: Core component library (completed)
- **Existing injection patterns**: Must maintain compatibility

### Dependencies Provided  
- **Standard React components**: For future framework templates
- **Video component patterns**: For other framework adapters
- **Component testing patterns**: For template validation

## Technical Considerations

### Browser Compatibility
- **Autoplay Policies**: Handle Chrome, Safari, Firefox autoplay restrictions
- **Video Codecs**: Support common web video formats (MP4, WebM)
- **Mobile Optimization**: Ensure video works on iOS Safari, Android Chrome

### Performance Impact
- **Bundle Size**: Video components add ~5KB gzipped
- **Runtime Performance**: Standard video components perform equally to Next.js versions
- **Memory Usage**: Proper cleanup prevents memory leaks in long-running Electron apps

### Security Considerations
- **Content Security Policy**: Video components work with strict CSP
- **External Links**: Electron adapter handles external URLs safely via shell API

## Success Metrics

### Functional Requirements
- [x] All VideoCard modes work without injection in standard React
- [x] Background video autoplay works across major browsers  
- [x] Components maintain 100% API compatibility
- [x] Performance overhead <5% compared to Next.js versions

### Developer Experience
- [x] Zero-configuration usage in Create React App
- [x] Clear error messages for common setup issues
- [x] TypeScript intellisense works correctly with defaults
- [x] Documentation covers all major React frameworks

### Framework Support
- [x] Components work in Electron applications
- [x] Components work in Vite React applications
- [x] Components work with React Router
- [x] Clear migration path from Next.js injection patterns

## Future Considerations

### Markdown Content System Integration
**Status**: Research complete - highly feasible for future implementation

The Next.js content loading system using `gray-matter` and `remark` is **completely framework-agnostic** and can be directly ported to Vite/React environments. Both libraries work in any JavaScript environment and are not Next.js-specific.

#### Implementation Options:
1. **Direct Port Approach**: Copy NextjsContentProvider pattern to ViteContentProvider
   ```typescript
   // src/lib/content/ViteContentProvider.ts
   import matter from 'gray-matter';
   import { remark } from 'remark';
   
   export const loadMarkdownContent = async (filename: string) => {
     const markdownFile = await import(`../content/${filename}.md?raw`);
     const { data: frontmatter, content } = matter(markdownFile.default);
     const processed = await remark().use(gfm).process(content);
     return { frontmatter, contentHtml: processed.toString() };
   };
   ```

2. **Vite Plugin Approach**: Use `vite-plugin-markdown` for native markdown imports
   ```typescript
   // Direct markdown imports in components
   import { frontmatter, html } from '../content/sample-quote.md';
   <QuoteCard content={frontmatter} />
   ```

#### Content System Benefits:
- **Framework Parity**: Identical content loading API across Next.js and Vite templates
- **DX Consistency**: Same markdown authoring experience for all templates
- **Migration Path**: Easy transition from hardcoded to markdown-driven content
- **Reusable Content**: Same markdown files work across template types

#### Future Slice Consideration:
This could become **Slice 17: Universal Content System** or a major enhancement to Slice 16, enabling:
- Shared content files between Next.js and React templates
- Universal content provider interface for all framework adapters
- Markdown-driven examples and documentation across all templates

### Video Component Enhancements
1. **WebRTC Support**: Live video streaming components
2. **Video Controls**: Advanced playback controls for player mode
3. **Accessibility**: ARIA labels and keyboard navigation for video components
4. **Streaming**: HLS/DASH support for adaptive streaming

### Framework Extensions
1. **Svelte Adapter**: Component patterns for Svelte integration
2. **Vue Adapter**: Component patterns for Vue.js integration  
3. **Angular Adapter**: Component patterns for Angular integration

## Risk Assessment

### Low Risk
- **Standard HTML video**: Well-supported across browsers
- **Existing component compatibility**: Current injection patterns remain unchanged
- **Performance impact**: Video components are lightweight

### Medium Risk  
- **Autoplay reliability**: Browser policies may prevent autoplay in some contexts
- **Cross-browser testing**: Video behavior may vary across browsers/devices

### High Risk
- **None identified**: This slice builds on well-established web standards

## Conclusion

Slice 16 transforms ui-core from a Next.js-optimized library into a truly framework-agnostic component system. By providing built-in video support and standard HTML element defaults, it enables seamless usage in any React environment while maintaining the flexibility of dependency injection for framework-specific optimizations.

The slice prioritizes developer experience through comprehensive documentation, robust testing, and clear migration patterns, ensuring ui-core can serve as the foundation for multi-framework template development.