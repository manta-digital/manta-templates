# erikcorkran - Concept

#### High-Level Project Concept

We're rebuilding erikcorkran.com as a modern Next.js application to serve as the anchor for Erik's personal and professional brand. The current site is built with Astro, but we're transitioning to Next.js to enable more dynamic features, better component integration, and a platform that can showcase technical expertise through various interactive elements.

The site will feature a responsive bento grid layout with cards of varying sizes and importance, supporting diverse content types including blog posts, videos, ThreeJS/R3F demos, and quotes. The design will incorporate both dark and light modes with rich green and teal color schemes, creating a professional yet distinctive aesthetic that stands apart from typical developer portfolios.

- **Next.js application** with TypeScript, React, and App Router architecture
- **Bento card layout** with customizable grid positioning and sizing
- **Component-driven design** using ShadCN UI and Tailwind CSS
- **Interactive elements** including animations via Framer Motion
- **3D capabilities** through ThreeJS/R3F integration
- **Content-focused approach** with Markdown-driven blog articles

This project focuses on rebuilding the core site with placeholders for more complex interactive elements that will be implemented iteratively after the initial launch.

##### Target Users

Primary users of this site are external professionals evaluating Erik's work and capabilities:

- **Potential clients** seeking evidence of technical expertise and project history
- **Employers and recruiters** assessing skills and experience
- **Professional peers** exploring technical writing and project showcases
- **Collaborators** looking for partnership opportunities
- **Technical community members** interested in blog content and demonstrations

The site must effectively communicate professional capabilities while also conveying a sense of personal style and technical identity.

##### Proposed Technical Stack

- **Framework**: Next.js 14+ with App Router and TypeScript
- **UI Components**: ShadCN UI (based on Radix primitives) for consistent design elements
- **Styling**: Tailwind CSS with custom theming for both dark and light modes
- **Animations**: Framer Motion for card transitions and interactive elements
- **3D Graphics**: Three.js with React Three Fiber (R3F) for interactive demos
- **Content Management**: Markdown/MDX with appropriate parser (likely Contentlayer)
- **Deployment**: Vercel platform for optimal Next.js performance
- **Version Control**: Git/GitHub

##### Proposed Development Methodology

We'll implement this project using an iterative approach that prioritizes the core structure and gradually adds more complex features:

1. Create base Next.js application with ShadCN UI integration
2. Implement custom theming system with dark/light mode support
3. Develop responsive bento grid layout system with Framer Motion animations
4. Build core component library for different card types and content formats
5. Integrate Markdown parsing for blog content
6. Create placeholder components for advanced features (3D demos, etc.)
7. Migrate and adapt existing content from the Astro site

In general, favor simplicity and avoid over-engineering. Remember the cliche about premature optimization. Use industry standard solutions where practical and available. Avoid reinventing wheels.

##### Summary

The erikcorkran.com website redesign will transform the current Astro-based site into a dynamic Next.js application with a distinctive bento grid layout, custom theming, and support for various content types. The focus is on creating a professional yet distinctive personal branding platform that showcases technical expertise while providing a foundation for future interactive features and content expansion. This website serves as the central anchor point for Erik's professional identity online.
