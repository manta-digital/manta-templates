# erikcorkran - Specification

## 1. Overview and Purpose

### Project Title

erikcorkran.com - Personal Brand Website Rebuild

### Summary

A modern, responsive personal website serving as the digital anchor for Erik Corkran's professional identity. The site will showcase technical expertise, project history, and professional capabilities through a visually distinctive bento grid layout with support for various content types including blog posts, videos, and interactive 3D demos.

### Objectives

- Rebuild the existing Astro-based site using Next.js, enhancing dynamic capabilities while maintaining performance
- Create a distinctive visual identity with custom dark/light themes using green and teal color schemes
- Implement a responsive bento grid layout system for flexible content presentation
- Support multiple content types including markdown-driven blog posts, video embeds, and ThreeJS/R3F demos
- Enhance user experience through subtle animations and interactive elements
- Provide a comprehensive platform for professional branding that stands out from typical developer portfolios

### Target Audience

Professional individuals and organizations evaluating Erik's capabilities and work, including potential clients, employers, recruiters, collaborators, and technical community members interested in Erik's expertise and content.

## 2. Functional Requirements

### Features and Functions

#### Core Layout System

- **Bento Grid Layout** (Priority: High)
  - Responsive grid system supporting cards of varying sizes and importance
  - Configurable layout patterns for different page types (home, blog, projects)
  - Fluid adaptation across device sizes (mobile, tablet, desktop)

#### Theme System

- **Dark/Light Mode Toggle** (Priority: High)
  - User preference detection and persistence
  - Smooth transition between modes
  - Custom green/teal color schemes for both modes

#### Content Types

- **Blog System** (Priority: High)

  - Markdown/MDX-driven content with syntax highlighting for code blocks
  - Category and tag organization
  - Featured posts capability for homepage highlighting

- **Project Showcase** (Priority: High)

  - Visual portfolio of past and current projects
  - Detailed project pages with technology descriptions
  - Links to live demos or repositories where applicable

- **Interactive Demos** (Priority: Medium)

  - ThreeJS/R3F integration for 3D visualizations
  - Placeholder system for future demo additions
  - Performance-optimized loading strategy

- **Video Content** (Priority: Medium)

  - Embedded video player (YouTube, Vimeo, or custom)
  - Video card format for grid layout
  - Auto-play options for hover/interaction

- **Quote Cards** (Priority: Medium)
  - Stylized display for memorable quotes or testimonials
  - Attribution system for quote sources
  - Visual distinction from other content types

#### Navigation

- **Primary Navigation** (Priority: High)

  - Intuitive main navigation to core site sections
  - Mobile-friendly responsive design
  - Visual indicators for current section

- **Secondary Navigation** (Priority: Medium)
  - In-section navigation for multi-part content
  - Breadcrumb system for deep content

#### Contact System

- **Contact Information** (Priority: High)
  - Professional social links (GitHub, LinkedIn, etc.)
  - Email contact with spam protection
  - Availability indicator for contracting/employment

### Use Cases/User Stories

1. **First-time Visitor**

   - As a potential employer, I want to quickly understand Erik's skills and experience so I can evaluate his fit for a position.
   - I navigate to the homepage and scan the bento grid for an overview of skills, projects, and professional background.
   - I can easily identify relevant experience and access detailed information about specific projects.

2. **Technical Peer**

   - As a developer, I want to read Erik's technical blog posts and explore code examples to learn from his expertise.
   - I navigate to the blog section and filter posts by technical topics.
   - I can view syntax-highlighted code examples and understand implementation details.

3. **Potential Client**

   - As a potential client, I want to evaluate Erik's capabilities by reviewing past projects similar to my needs.
   - I browse the project showcase to find relevant examples.
   - I can see detailed information about technologies used and outcomes achieved.

4. **Content Explorer**
   - As a visitor interested in specific content, I want to explore interactive demos and visual elements.
   - I interact with ThreeJS demos and engage with animated UI elements.
   - I can easily navigate between different content types and find related information.

### Process Flows

1. **Content Discovery Flow**

   - Homepage entry → Bento grid overview → Content type selection → Detailed content view → Related content suggestions

2. **Professional Evaluation Flow**

   - Homepage entry → About/Skills section → Project examples → Contact information

3. **Blog Reading Flow**
   - Blog index → Category/tag filtering → Article selection → Article reading → Related post suggestions

## 3. Non-Functional Requirements

### Performance Metrics

- Initial page load under 1.5 seconds (Lighthouse performance score ≥90)
- Time-to-interactive under 2 seconds on desktop, 3 seconds on mobile
- Smooth animations at 60fps
- Core Web Vitals scores meeting "Good" thresholds:
  - Largest Contentful Paint (LCP): ≤2.5s
  - First Input Delay (FID): ≤100ms
  - Cumulative Layout Shift (CLS): ≤0.1

### Scalability

- Component architecture allowing easy addition of new content types
- Blog system supporting 100+ articles without performance degradation
- Media optimization for handling multiple high-resolution images and videos
- Incremental static regeneration for efficient content updates

### Security Requirements

- HTTPS implementation with proper TLS configuration
- Content Security Policy implementation
- Protection against common web vulnerabilities (XSS, CSRF)
- Minimal use of client-side JavaScript for core functionality

### Usability Guidelines

- Responsive design working across devices (mobile, tablet, desktop)
- Minimum WCAG 2.1 AA accessibility compliance:
  - Proper contrast ratios for text elements
  - Keyboard navigation support
  - Screen reader compatibility
  - Semantic HTML structure
- Intuitive navigation with clear visual hierarchy
- Consistent interface patterns across sections
- Support for modern browsers (latest 2 versions of major browsers)

## 4. Technical Specifications

### Technology Stack

- **Framework**

  - Next.js 14+ with App Router
  - React 18+
  - TypeScript 5+
  - Tool knowledge availability: Yes, in `framework-guides/nextjs`

- **UI Components**

  - ShadCN UI based on Radix primitives
  - Custom-themed component library
  - Tool knowledge availability: Yes, in `tool-guides/shadcn`

- **Styling**

  - Tailwind CSS for utility-first styling
  - Custom theme configuration with CSS variables
  - Dark/light mode implementation
  - Tool knowledge availability: Implied in ShadCN docs

- **Animations**

  - Framer Motion for component and page transitions
  - Intersection Observer for scroll-based animations
  - Tool knowledge availability: Referenced in coderules

- **3D Graphics**

  - Three.js for 3D rendering
  - React Three Fiber (R3F) for React integration
  - Tool knowledge availability: Yes, in `tool-guides/threejs` and `tool-guides/r3f`

- **Content Management**
  - Markdown/MDX for blog and project content
  - Contentlayer for MDX processing and front matter
  - Tool knowledge availability: Not explicitly mentioned, may need verification

### Integration Requirements

- **External Services**

  - GitHub integration for repository links
  - Social media embedding for content sharing
  - Video platform embeds (YouTube, Vimeo)
  - Analytics integration (likely Vercel Analytics or similar)

- **API Integrations**
  - Potential future integration with headless CMS
  - Contact form submission handling

### Hosting and Architecture

- **Deployment**

  - Vercel platform for Next.js hosting
  - GitHub integration for CI/CD workflow
  - Environment-based configuration

- **Build Process**
  - Static site generation (SSG) with incremental static regeneration
  - Asset optimization pipeline
  - Caching strategy for optimal performance

### Compatibility

- **Browser Support**

  - Chrome/Edge (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Mobile browsers (iOS Safari, Chrome for Android)

- **Device Support**
  - Desktop (1920x1080 and higher)
  - Tablet (768px and higher)
  - Mobile (320px and higher)
  - Responsive breakpoints with mobile-first approach

## 5. Deliverables and Milestones

### Wireframes/Mockups

- **Core Layout Wireframes**

  - Homepage bento grid layout
  - Blog index and article pages
  - Project showcase layout
  - About/contact section

- **Component Design System**
  - Card component variations
  - Navigation patterns
  - Typography system
  - Color scheme implementation

### Development Phases

1. **Foundation (Week 1-2)**

   - Next.js project setup with TypeScript
   - ShadCN UI integration
   - Tailwind configuration with theme setup
   - Dark/light mode implementation
   - Basic layout structure

2. **Core Components (Week 3-4)**

   - Bento grid system implementation
   - Card component development
   - Navigation structure
   - Basic page templates
   - Animation foundation

3. **Content System (Week 5-6)**

   - Markdown/MDX integration
   - Blog system implementation
   - Project showcase development
   - Media optimization
   - Content migration from existing site

4. **Interactive Features (Week 7-8)**

   - ThreeJS/R3F integration
   - Interactive demo placeholders
   - Enhanced animations and transitions
   - Contact system implementation

5. **Refinement & Launch (Week 9-10)**
   - Performance optimization
   - Cross-browser testing and bug fixes
   - Accessibility improvements
   - Final content integration
   - Deployment and launch

## 6. Risk Management

### Constraints

- **Technical Constraints**

  - Performance impact of ThreeJS/R3F integration on mobile devices
  - Content migration complexity from existing Astro site
  - Balance between visual richness and performance

- **Time Constraints**
  - Potential scope expansion with interactive features
  - Content creation/migration time requirements

### Risk Log

| Risk                                   | Impact | Probability | Mitigation Strategy                                                                 |
| -------------------------------------- | ------ | ----------- | ----------------------------------------------------------------------------------- |
| ThreeJS performance on mobile          | Medium | High        | Implement progressive enhancement, conditional loading based on device capabilities |
| Content migration complexity           | Medium | Medium      | Create structured migration plan, prioritize core content first                     |
| Design inconsistency across components | Medium | Low         | Establish comprehensive design system and component guidelines early                |
| Browser compatibility issues           | High   | Low         | Implement cross-browser testing early in development cycle                          |
| Scope creep with interactive features  | High   | Medium      | Define clear MVP features, create placeholder system for future additions           |

## 7. Documentation and Appendices

### Glossary

- **Bento Grid**: A design pattern featuring cards of various sizes arranged in a grid layout, similar to a Japanese Bento box
- **SSG**: Static Site Generation, a rendering strategy where pages are generated at build time
- **ISR**: Incremental Static Regeneration, Next.js feature for updating static content without full rebuilds
- **R3F**: React Three Fiber, a React renderer for Three.js
- **ShadCN UI**: A component library built on Radix primitives and styled with Tailwind CSS

### References

- Current erikcorkran.com site for content reference
- Design inspirations documented in concept phase
- ShadCN UI examples and patterns
- Three.js and R3F documentation and examples

### Supporting Materials

- Design mockups and wireframes
- Color scheme reference
- Font and typography guidelines
- Animation transition specifications
