---
layer: project
docType: migration-inventory
slice: template-migration
project: manta-templates
created: 2025-01-16
---

# Template Migration Import Inventory

## Overview
Complete inventory of all @/components/* imports found in the templates/nextjs template that need migration to ui-core.

## App Router Pages (src/app/) - 48 imports across 18 files

### Core Pages
- **src/app/page.tsx**: 2 imports
  - `import { Container } from '@/components';`
  - `import QuoteCardContainer from '@/components/cards/QuoteCardContainer';`

- **src/app/layout.tsx**: 2 imports
  - `import Header from '@/components/header';`
  - `import Footer from '@/components/footer';`

- **src/app/HomePageClient.tsx**: 1 import
  - `import Layout from '@/components/layout';`

### Legal/Content Pages (4 files, 4 imports)
- **src/app/privacy/page.tsx**: `import ContentCard from '@/components/layouts/ContentCard';`
- **src/app/terms/page.tsx**: `import ContentCard from '@/components/layouts/ContentCard';`
- **src/app/legal/page.tsx**: `import ContentCard from '@/components/layouts/ContentCard';`
- **src/app/cookies/page.tsx**: `import ContentCard from '@/components/layouts/ContentCard';`

### About Page
- **src/app/about/page.tsx**: 2 imports
  - `import { BaseCard } from '@/components/cards';`
  - `import Container from '@/components/container';`

### Test Pages (2 files, 17 imports)
- **src/app/test-cards/page.tsx**: 15 imports (comprehensive test file)
- **src/app/test-example-2/page.tsx**: 2 imports

### Examples Section (6 files, 20 imports)
- **src/app/examples/page.tsx**: 12 imports
- **src/app/examples/cards/page.tsx**: 6 imports  
- **src/app/examples/bentogrid/BentoGrid.tsx**: 2 imports
- **src/app/examples/blog/page.tsx**: 2 imports
- **src/app/examples/portfolio/PortfolioGrid.tsx**: 1 import

## Components Directory (src/components/) - 18 imports across 12 files

### Layout Components
- **src/components/layouts/bento-layout.tsx**: 2 imports
- **src/components/layouts/ContentCard.tsx**: 1 import

### Card Components (6 files, 8 imports)
- **src/components/cards/variants/GradientCard.tsx**: 1 import
- **src/components/cards/articles/ArticleCard.tsx**: 1 import  
- **src/components/cards/ProjectCard.tsx**: 1 import
- **src/components/cards/math/CosineTerrainCard.tsx**: 1 import
- **src/components/cards/people/AboutCard.tsx**: 1 import
- **src/components/cards/VideoCard.tsx**: 2 imports
- **src/components/cards/layouts/CardCarousel.tsx**: 1 import

### Header/Footer Components
- **src/components/headers/DefaultHeader.tsx**: 3 imports
- **src/components/footers/DefaultFooter.tsx**: 1 import

### Other Components
- **src/components/blog/BlogPageClient.tsx**: 1 import
- **src/components/cards/GuidesFeatureCard.tsx**: 1 import

## Import Pattern Analysis

### Most Common Imports
1. **BaseCard**: 8 occurrences (cards, layouts)
2. **BentoLayout**: 4 occurrences (examples, tests)
3. **Container**: 3 occurrences (header, about, homepage)
4. **ContentCard**: 4 occurrences (legal pages)
5. **ThemeToggle**: 2 occurrences (header, test-cards)
6. **TechnologyScroller**: 3 occurrences (examples, test-cards)

### Import Categories
- **Card Components**: 35+ imports (BaseCard, ArticleCard, ProjectCard, QuoteCard, etc.)
- **Layout Components**: 15+ imports (BentoLayout, Container, ContentCard, etc.)
- **UI Components**: 8+ imports (ThemeToggle, ColorSelector, BrandMark, etc.)
- **Header/Footer**: 4 imports (Header, Footer components)

## Files Requiring Migration Priority

### High Priority (Core functionality)
1. **src/app/layout.tsx** - Site-wide header/footer
2. **src/app/page.tsx** - Homepage components
3. **src/app/test-cards/page.tsx** - Migration validation page

### Medium Priority (Examples and tests)
1. **src/app/examples/page.tsx** - Main examples showcase
2. **src/app/test-example-2/page.tsx** - Content loading test
3. **src/app/examples/cards/page.tsx** - Card examples

### Low Priority (Legal/content pages)
1. All legal pages using ContentCard
2. About page components

## Migration Strategy Notes

### Components Available in ui-core
Based on Slice 09 completion, all these components should be available:
- All card components (BaseCard, ArticleCard, ProjectCard, etc.)
- Layout components (BentoLayout, Container, Grid system)
- UI components (ThemeToggle, ColorSelector, BrandMark, etc.)
- Header/Footer components

### Dependency Injection Requirements
Components requiring Image/Link injection:
- ArticleCard (Image, Link)
- ProjectCard (Link)
- AboutCard (Image, Link, social icons)
- Any card components with images or navigation

### Template-Specific Components to Keep
Based on the inventory, these might be template-specific:
- QuoteCardContainer (custom composition)
- Layout wrapper (custom layout logic)
- Any custom card variants not in ui-core

## Import Mapping Table (Local → ui-core)

### ✅ Components Available in ui-core
```typescript
// Cards
OLD: import { BaseCard } from '@/components/cards/BaseCard'
NEW: import { BaseCard } from '@manta-templates/ui-core'

OLD: import ArticleCard from '@/components/cards/articles/ArticleCard'
NEW: import { ArticleCard } from '@manta-templates/ui-core'

OLD: import ProjectCard from '@/components/cards/ProjectCard'
NEW: import { ProjectCard } from '@manta-templates/ui-core'

OLD: import QuoteCard from '@/components/cards/QuoteCard'
NEW: import { QuoteCard } from '@manta-templates/ui-core'

OLD: import TemplateAboutCard from '@/components/cards/people/AboutCard'
NEW: import { AboutCard } from '@manta-templates/ui-core'

OLD: import BlogIndexCard from '@/components/cards/articles/BlogIndexCard'
NEW: import { BlogIndexCard } from '@manta-templates/ui-core'

OLD: import TemplateSidebarPostCard from '@/components/cards/SidebarPostCard'
NEW: import { SidebarPostCard } from '@manta-templates/ui-core'

OLD: import CosineTerrainCard from '@/components/cards/math/CosineTerrainCard'
NEW: import { CosineTerrainCard } from '@manta-templates/ui-core'

OLD: import { CardCarousel } from '@/components/cards/layouts/CardCarousel'
NEW: import { CardCarousel } from '@manta-templates/ui-core'

OLD: import VideoCard from '@/components/cards/VideoCard'
NEW: import { VideoCard } from '@manta-templates/ui-core'

OLD: import BlogCardImage from '@/components/cards/BlogCardImage'
NEW: import { BlogCardImage } from '@manta-templates/ui-core'

OLD: import { GradientCard } from '@/components/cards/variants/GradientCard'
NEW: import { GradientCard } from '@manta-templates/ui-core'

// Layouts
OLD: import { BentoLayout } from '@/components/layouts/bento-layout'
NEW: import { BentoLayout } from '@manta-templates/ui-core'

OLD: import Container from '@/components/container'
NEW: import { Container } from '@manta-templates/ui-core'

OLD: import GridItem from '@/components/layouts/grid-layout/grid-item'
NEW: import { GridItem } from '@manta-templates/ui-core'

OLD: import GridLayout, { GridData } from '@/components/layouts/grid-layout/grid-layout'
NEW: import { GridLayout } from '@manta-templates/ui-core'; import type { GridData } from '@manta-templates/ui-core'

// UI Components
OLD: import { ThemeToggle } from '@/components/themetoggle'
NEW: import { ThemeToggle } from '@manta-templates/ui-core'

OLD: import { ColorSelector } from '@/components/themetoggle'
NEW: import { ColorSelector } from '@manta-templates/ui-core'

OLD: import TemplateBrandMark from '@/components/ui/brand-mark'
NEW: import { BrandMark } from '@manta-templates/ui-core'

OLD: import { TechnologyScroller } from '@/components/ui/TechnologyScroller'
NEW: import { TechnologyScroller } from '@manta-templates/ui-core'

OLD: import { Button } from '@/components/ui/button'
NEW: import { Button } from '@manta-templates/ui-core'

// Headers/Footers
OLD: import Header from '@/components/header'
NEW: import { Header } from '@manta-templates/ui-core'

OLD: import Footer from '@/components/footer'
NEW: import { Footer } from '@manta-templates/ui-core'

// Overlays
OLD: import { ComingSoonOverlay } from '@/components/overlays/ComingSoonOverlay'
NEW: import { ComingSoonOverlay } from '@manta-templates/ui-core'
```

### ❓ Components Needing Investigation
```typescript
// These may be template-specific or need special handling:
OLD: import { Container } from '@/components'                      // Index export
OLD: import { CosineTerrainCard } from '@/components/cards'       // Index export
OLD: import ContentCard from '@/components/layouts/ContentCard'   // ContentCard vs ContentCard
OLD: import Layout from '@/components/layout'                     // Custom layout wrapper
OLD: import QuoteCardContainer from '@/components/cards/QuoteCardContainer' // Custom container

// Content Loaders (may be superseded by server-side loading)
OLD: import ArticleCardContentLoader from '@/components/cards/articles/ArticleCardContentLoader'
OLD: import AboutCardContentLoader from '@/components/cards/people/AboutCardContentLoader'
OLD: import ProjectCardContentLoader from '@/components/cards/projects/ProjectCardContentLoader'

// Specialized Components
OLD: import BackgroundVideoComponent from '@/components/ui/BackgroundVideoComponent'
OLD: import BackgroundVideo from '@/components/ui/background-video'
OLD: import VideoPlayer from '@/components/ui/video-player'
```

### Grouped Import Optimization
```typescript
// Multiple components from same package can be grouped:
import { 
  BaseCard, 
  ArticleCard, 
  ProjectCard, 
  QuoteCard, 
  AboutCard,
  BlogIndexCard,
  SidebarPostCard
} from '@manta-templates/ui-core'

import {
  Container,
  BentoLayout,
  GridItem,
  GridLayout,
  CardCarousel
} from '@manta-templates/ui-core'

import {
  ThemeToggle,
  ColorSelector,
  BrandMark,
  TechnologyScroller,
  Button
} from '@manta-templates/ui-core'
```

## Verification Status
✅ **Verified**: All major components exist in ui-core exports  
✅ **Coverage**: 100% of commonly used components available  
❓ **Needs Investigation**: Template-specific components and content loaders

## Next Steps
1. ✅ Verify all components exist in ui-core package.json exports - COMPLETED
2. ✅ Create import mapping table (local → ui-core) - COMPLETED
3. Begin systematic migration starting with high-priority files
4. Handle template-specific components and edge cases