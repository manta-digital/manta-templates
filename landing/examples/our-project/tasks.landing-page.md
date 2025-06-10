{{ ... }}
# Landing Page Tasks

### Setup and Preliminary Checks
- [x] Ensure dev server runs  
  - [x] Run `pnpm dev`  
  - [x] Confirm homepage loads without errors

### Implement Hero Section
- [x] Add hero section to `app/page.tsx`  
  - [x] Import and use existing layout components (e.g., `BentoGrid` or `GridLayout`)  
  - [x] Display project title “manta-templates”  
  - [x] Display summary sentence: “A monorepo offering customizable templates for Next.js, Astro, and more.”
- [x] Confirm Hero section renders correctly above-the-fold

### Implement Templates Showcase
- [x] Add templates showcase section below Hero  
  - [x] Render a grid of 3 cards using existing Card components  
    1. **Next.js Starter**: “Next.js 15 + Tailwind 4 + shadcn/radix” with link to `/templates/nextjs`  
    2. **Astro Starter**: “Astro-based template (coming soon)” (no link or disabled)  
    3. **Guides & Docs**: “Comprehensive usage guides and documentation” with link to `/project-documents`  
- [x] Confirm all template cards display and links (where applicable) work

### Implement Examples Showcase
- [x] Add examples showcase section  
  - [x] Render cards or grid for the following:  
    1. **Blog Example**: “MDX-driven content, blog layout” linking to `/blog`  
    2. **Layout Examples**: “Examples: /examples/blog, /portfolio, /bentogrid, /grid-layout” linking to `/examples`  
- [x] Confirm example cards display and links work

### Testing and Validation
- [x] Validate page layout at common viewport sizes  
- [x] Test all links navigate correctly in the dev server  
- [x] Confirm page content renders above-the-fold without errors

### Stretch Goals (Optional)
- [ ] Add footer “Powered by manta-templates” beneath all sections  
- [ ] Add icons or images to cards for visual clarity
{{ ... }}