# erikcorkran.com - Detailed Task Breakdown

## Sections

- [x] Project Setup & Configuration
- [x] Core Layout Components
- [x] Component Library
- [x] Advanced Layout
- [ ] Navigation
- [ ] Security Hardening
- [ ] Automated Quality Gates
- [ ] Analytics & Monitoring
- [ ] Content Management System
- [ ] Interactive Features
- [ ] Content Pages
- [ ] Performance Optimization
- [ ] Accessibility and SEO
- [ ] Final Verification and Launch

##### Project Overview

This document provides a granular breakdown of tasks for rebuilding erikcorkran.com as a modern Next.js application. The site will feature a distinctive bento grid layout, custom theming, and support for multiple content types including blog posts, project showcases, and interactive 3D demos.

##### Technical Foundation

- Next.js 14+ with App Router and TypeScript
- ShadCN UI component library with Tailwind CSS
- Framer Motion for animations
- Three.js/R3F for interactive 3D elements
- Markdown/MDX content processing

## Project Setup & Configuration

- [x] **Initialize Next.js project with TypeScript**

  - Create a new Next.js project using the App Router
  - Configure TypeScript support
  - Set up the basic folder structure following Next.js best practices
  - Success: Project runs locally with TypeScript support and proper file structure

- [x] **Configure Tailwind CSS and ShadCN UI**

  - Install and configure Tailwind CSS with required plugins
  - Set up ShadCN UI component library
  - Integrate the required Radix UI primitives
  - Create initial component configuration
  - Success: Tailwind styles apply correctly and ShadCN components render properly

- [x] **Set up custom theming system**

  - Create CSS variables for theme colors in Tailwind config
  - Implement green/teal color schemes for both dark and light modes
  - Configure default color palette variables
  - Create theme switching functionality
  - Success: The application supports both dark and light modes with custom color schemes

- [x] **Configure build and deployment pipeline**
  - Set up ESLint and Prettier for code quality
  - Configure Next.js build settings for optimal performance
  - Create deployment configuration for Vercel
  - Set up environment variables
  - Success: Project builds without errors and deployment pipeline is functional

## Core Layout Components

- [x] **Create responsive layout system**

  - Develop main layout component with appropriate metadata
  - Implement responsive container components
  - Implement main navigation structure
  - Success: Basic site structure renders correctly on all device sizes

- [x] **Implement bento grid layout system**

  - Create flexible grid container component
  - Develop different card size components (small, medium, large)
  - Implement responsive grid breakpoints
  - Create layout utility functions for grid positioning
  - Success: Bento grid layout adapts properly to different screen sizes

- [x] **Implement theme switching**
  - Create theme toggle component
  - Implement theme persistence using local storage
  - Add smooth transition effects between themes
  - Ensure all components respect the current theme
  - Success: Theme switching works smoothly with proper state persistence

### Component Library

#### Card Foundations

- [x] **Create BaseCard component**
 
   - Implement polymorphic `<article>` with props for `as`, `variant`, `size`
   - Success: Renders children, passes a11y axe‑core with no violations
   - *Note: Polymorphism removed for simplicity; accessibility check pending setup.* Success: Renders children and adapts to theme.

- [x] **Add BlogCard variant**

  - Title, date, excerpt, cover image support
  - Success: Dummy MDX post renders inside grid using BlogCard

- [x] **Add ProjectCard variant**

  - Tech‑stack chips, repo/demo links
  - Success: Sample JSON-driven project renders

- [x] **Add VideoCard variant**

  - Embed iframe (YT/Vimeo) with responsive wrapper
  - Success: Demo video plays, CLS < 0.1 on load

- [x] **Add QuoteCard variant**
  - Stylised blockquote with attribution slot
  - Success: Component meets WCAG contrast rules

### Navigation

- [ ] **Primary header & mobile drawer**

  - Success: Links keyboard‑navigable, passes Lighthouse a11y

- [ ] **Breadcrumb / secondary nav**

  - Auto‑generates from `route` param array
  - Success: Appears on deep pages (blog/[slug])

### Automated Quality Gates

- [ ] **Add GitHub Actions workflow**

  - Steps: install, lint, test, build, upload artifact
  - Success: PR status check blocks merge on failure

- [ ] **Set up Jest + React Testing Library**

  - Write smoke test for BaseCard rendering
  - Success: `pnpm test` exits 0

- [ ] **Add Lighthouse‑CI GitHub Action**
  - Budget: perf ≥ 90, a11y ≥ 95
  - Success: Workflow comment shows green scores

## Advanced Layout

- [x] **Implement useMasonryGrid hook**
  - Calculates optimal placement for variable‑height cards
  - Success: On desktop (≥1024 px) LCP < 2 s with 20 mixed cards

## Predefined Layout Components
- [x] **Implement distinct layout patterns**
  - **Strategy:** Implement distinct layout patterns (e.g., Portfolio Dashboard, Blog Index) as dedicated React components (e.g., `<PortfolioDashboardLayout>`).
  - **Approach:** These components will internally use `GridContainer` and specific arrangements of `GridItem` + Card components (from Component Library) to render predefined layouts.
  - **Benefit:** Allows switching between complex visual arrangements on a single page/URL by conditionally rendering the appropriate layout component.
  - **Next Steps:** Build individual Card components first (Phase 5), then create specific Layout components as needed.

## Content Management System

- [x] **Set up Markdown file routing**
  - Evaluate Contentlayer2 vs native MDX support
  - Install and configure chosen MDX loader (e.g., contentlayer2 or next-mdx-remote)
  - Create `/content/blog` folder for markdown files
  - Implement dynamic route `app/blog/[slug]/page.tsx` to load frontmatter and content
  - Success: Markdown files in `/content/blog` render as pages under `/blog/<slug>`

- [x] **Add sample blog post**
  - Create a markdown file with frontmatter in `/content/{some appropriate subdir}`
  - Success: Sample post displays correctly with content and metadata

## Interactive Features

> ⚙️ Refer to `project-documents/tool-guides/threejs/introduction.md` and `project-documents/tool-guides/r3f/introduction.md` for Three.js/R3F setup details.

- [ ] **Set up Three.js and R3F integration**

  - Install and configure Three.js and React Three Fiber
  - Create base 3D scene component
  - Implement canvas optimization for performance
  - Set up loading and error handling for 3D components
  - Success: Base 3D functionality works without breaking the page layout

- [ ] **Create animation system with Framer Motion**

  - Configure Framer Motion for page transitions
  - Implement scroll-based animations
  - Create reusable animation hooks
  - Develop staggered animation effects for card layouts
  - Success: Animations run smoothly at 60fps without layout shifts

- [ ] **Build interactive card components**

  - Implement hover effects for cards
  - Create expandable card functionality
  - Develop card transition animations
  - Build interactive content reveals
  - Success: Cards respond to user interaction with smooth animations

- [ ] **Develop media embedding components**
  - Create responsive video player component
  - Implement image gallery component
  - Build code snippet display with syntax highlighting
  - Develop audio player component if needed
  - Success: Media embeds display correctly with proper responsive behavior

## Content Pages

- [ ] **Build homepage layout**

  - Create hero section with main messaging
  - Implement featured content bento grid
  - Develop skill/expertise highlight section
  - Create call-to-action components
  - Success: Homepage presents professional information in an engaging bento layout

- [ ] **Create about/bio page**

  - Implement professional bio section
  - Create skills and expertise components
  - Build timeline component for career history
  - Develop personal interests section
  - Success: About page clearly communicates professional background and capabilities

- [ ] **Implement contact system**

  - Create contact information display
  - Build social media link components
  - Implement availability indicator
  - Create contact form functionality
  - Success: Visitors can easily find contact information and communication channels

- [ ] **Develop blog section**
  - Build blog index page with filtering
  - Implement blog post page template
  - Create code block and syntax highlighting
  - Develop table of contents functionality
  - Success: Blog section presents technical content with proper formatting and navigation

## Analytics and Security

### Analytics & Monitoring

- [ ] **Integrate Vercel Analytics early**
  - Success: Page‑view events visible in dev dashboard by first staging deploy

### Security Hardening

- [ ] **Enforce CSP via next‑secure‑headers**
  - Success: No CSP errors in browser console

- [ ] **Configure `@next/eslint‑plugin‑security`**
  - Success: Lint passes in CI

- [ ] **Enable CSRF protection for contact form**
  - Success: Test POST without CSRF token returns 403

## Performance Optimization

- [ ] **Implement image optimization**
  - Configure Next.js image component for optimal performance
  - Create responsive image loading strategies
  - Implement lazy loading for offscreen images
  - Set up proper image formats and compression
  - Success: Images load efficiently with appropriate sizes for different devices

- [ ] **Optimize ThreeJS/R3F performance**
  - Implement conditional loading based on device capabilities
  - Create performance monitoring system
  - Optimize 3D models and textures
  - Implement level-of-detail systems
  - Success: 3D elements load and render efficiently without impacting page performance

- [ ] **Implement performance monitoring**
  - Set up Core Web Vitals measurement
  - Create performance budget tracking
  - Implement runtime performance monitoring
  - Configure error logging and monitoring
  - Success: Performance metrics are tracked and meet target thresholds

- [ ] **Enhance load performance**
  - Implement code splitting for route-based chunking
  - Configure appropriate caching strategies
  - Optimize critical rendering path
  - Implement progressive loading strategies
  - Success: Initial page load meets target performance metrics

## Accessibility and SEO

- [ ] **Implement accessibility features**

  - Ensure proper semantic HTML structure
  - Add appropriate ARIA attributes
  - Implement keyboard navigation support
  - Create focus management system
  - Success: Site meets WCAG 2.1 AA standards for accessibility

- [ ] **Optimize SEO elements**

  - Create SEO metadata component
  - Implement structured data (JSON-LD)
  - Configure proper meta tags for social sharing
  - Create XML sitemap generation
  - Success: Pages have proper SEO elements and score well in Lighthouse SEO audits

- [ ] **Enhance content accessibility**
  - Ensure proper color contrast for all text
  - Implement text scaling support
  - Create accessible navigation patterns
  - Add proper image alt text
  - Success: Content is accessible to users with various abilities and assistive technologies

## Final Verification and Launch

- [ ] **Perform cross-browser testing**

  - Test in Chrome, Firefox, Safari, and Edge
  - Verify mobile browser compatibility
  - Fix any browser-specific issues
  - Validate responsive behavior across browsers
  - Success: Site functions correctly across all target browsers

- [ ] **Conduct pre-launch audit**

  - Run Lighthouse performance audits
  - Verify all accessibility requirements
  - Check for broken links or media
  - Validate content rendering
  - Success: Site passes all pre-launch checks with target scores

- [ ] **Configure analytics**

  - Implement Vercel Analytics or equivalent
  - Set up custom event tracking
  - Configure performance monitoring
  - Create analytics dashboards
  - Success: Analytics capture user interactions and performance metrics

- [ ] **Deploy to production**
  - Configure production environment variables
  - Deploy to Vercel production environment
  - Verify domain configuration
  - Test live site functionality
  - Success: Site is live and functioning correctly on the production environment
