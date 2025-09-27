# Changelog

All notable changes to manta-templates will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Hero Section Components** - Framework-agnostic hero system with image backgrounds, gradient support, WebP/AVIF optimization, and responsive loading states
- **Hero Slide Navigation** - Added comprehensive slide navigation with keyboard support, disabled states, and dot/arrow controls
- **Navigation Menu System** - Enhanced header with dropdown navigation using Radix UI
- **ComboBox Component** - Advanced dropdown with filtering, custom values, and accessibility support

### Dependencies Added
- **@use-gesture/react@^10.3.1** - Lightweight gesture library (~1-2KB gzipped) enabling touch/swipe gesture support in hero slide navigation. Chosen for minimal bundle impact and comprehensive edge case handling. Now available in all templates (React, NextJS, Electron).

### Changed
- Removed remaining ShadCN references from documentation and guides

### Fixed
- Hero component build compatibility across React and Next.js templates
- Closed issue #52: Added form components and controls to ui-core
- Closed issue #55: Made CosineTerrainCard theme-aware
- Closed issue #60: Added React template to manta-templates
- Closed issue #62: Fully supported footer content and legal in React template
- Closed issue #68: Fixed forms bundling errors in NextJS template

## [0.8.3] - 2025-09-06

### Added
- **Framework-agnostic form system** - Complete ContactForm implementation across React, NextJS, and Electron templates
- **Form validation** - Zod-powered validation with TypeScript schemas and error handling
- **CVA-prefixed components** - Resolved naming conflicts with `ui-*` prefixed class variance authority options
- **Universal form components** - Shared Input, Textarea, Checkbox, RadioGroup, and Select components

### Changed
- **Image optimization** - Consolidated duplicate images across templates, saved ~5.3MB in Electron template
- **Zod imports** - Standardized to `import * as z from 'zod'` across all templates
- **Component architecture** - Enhanced dependency injection patterns for framework compatibility

### Fixed
- **TypeScript configuration** - Resolved jest/node type definition errors in NextJS template
- **AboutCard props interface** - Fixed TypeScript errors with explicit props instead of Partial<AboutContent>
- **Module resolution** - Fixed next/image and next/link import issues
- **Build validation** - Eliminated import and compilation errors across all templates

### Performance
- **Template size reduction** - Significant bundle size improvements through image consolidation
- **Build optimization** - Faster compilation with resolved TypeScript issues

## [0.8.0] - 2025-09-02

### Added
- **React template content system** - Markdown-driven content with precompiled build-time processing for zero client-side overhead
- **Universal content hooks** - Framework-agnostic `useContent` and `useContentCollection` with TypeScript schemas
- **Vite content plugin** - Build-time markdown compilation with proper HTML sanitization and heading extraction
- **CosineTerrainCard theme-awareness** - Complete theme integration with CSS custom property support and OKLCH color conversion
- **FPS meter theme sync** - Performance indicator automatically adapts to component theme colors

### Changed
- **CosineTerrainCard color system** - Enhanced prop interface to support theme CSS variables alongside existing color formats
- **Content architecture** - Unified content system across Next.js and React templates with identical rendering

## [0.7.4] - 2025-08-30

### Added
- **Theme-aware gradient system** - Complete GradientCard overhaul with dual control API (range 0-100 and accent-to-accent)
- **Framework-agnostic UI architecture** - Extracted `@manta-templates/ui-core` package from Next.js implementation
- **Monorepo version management** - Version sync script and multi-level git tagging convention
- **Standard testing framework** - Migration from custom test format to Vitest with 45 comprehensive tests

### Changed
- **Component architecture** - Migrated from hardcoded components to markdown-driven content system
- **Package structure** - Reorganized monorepo with framework-agnostic core and adapter pattern
- **Testing infrastructure** - Complete overhaul to standardized Vitest/Jest patterns
- **Git tag management** - Cleaned up repository and established structured tagging for releases

### Fixed
- **Client/server boundaries** - Resolved React hooks usage in Next.js App Router components
- **Theme integration** - Fixed gradient recomputation and CSS variable mapping across theme variants

### Breaking Changes
- GradientCard API: `gradient="teal"` → `from="accent-7" to="accent-10"`
- Package structure: Components moved to shared ui-core package

## [0.7.4] - 2025-08-15

### Added
- **site.config.ts** - configures metadata, policy, author, and components
- **Headers and Footers** - configurable, choice of default/compact
- **Policy Text** - added canned policy text (helper, *not legal advice*)
- **OpenGraph** - dynamic OG image/card created from react component

## [0.7.3] - 2025-08-10

### Fixed
- **Fixed sync-guides script** - Now pulls from `main` branch instead of `public-only` to get latest guides

## [0.7.2] - 2025-08-08

### Changed
- **Directory structure migration** - Migrated from `our-project/` to `private/` throughout all guides
- **Setup script fixes** - Template instances now create `project-documents/private/` correctly
- **Git submodule warnings eliminated** - Added `.git` exclusion to all setup scripts
- **Documentation consistency** - Updated 13 files across the guide system for new structure

### Added
- **Migration guide added** - Clear instructions for updating older projects

## [0.7.1] - 2025-08-05

### Added
- **Private guides workflow** - Environment-based configuration for organization private guides
- **.env file support** - Simple configuration via `.env` files (like Python!)
- **Project files preservation** - Update scripts now properly preserve project-specific content
- **Cross-platform compatibility** - Improved Node.js scripts for better Windows support
- **Template development workflow** - Clarified development vs distribution separation

## [0.7.0] - 2025-08-01

### Changed
- **Monorepo structure cleanup** - Clean separation between templates and development artifacts
- **Fixed sync-guides workflow** - Fresh monorepo clones now work out of the box
- **Template distribution improvements** - Templates ship clean without project-documents
- **Updated template README** - Correct user workflow with `pnpm dlx degit`
- **Cross-platform compatibility** - Better support for different development environments
- **Repository structure flattening** - Consistent `project-documents/` structure across monorepo and standalone usage

## [0.6.0] - 2025-07-25

### Added
- Next.js 15 upgrade
- Tailwind CSS v4 integration
- Enhanced card component system

## [0.5.x] - 2025-07-20

### Added
- Initial template development
- Basic project structure
- Core component library