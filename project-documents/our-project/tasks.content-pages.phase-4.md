---
phase: 4
docType: task-expansion
audience: [ai, human]
description: Expanded and enhanced tasks for Content Pages section (Phase 4)
dependsOn:
  [detailed-task-breakdown.md, guide.ai-project.task-expansion.md, coderules.md]
---

# Phase 4 – Task Expansion: Content Pages

The following subtasks expand the Detailed Task Breakdown for the Content Pages section. Each subtask is atomic and includes clear acceptance criteria.

## Build homepage layout

- [ ] Verify `src/app/page.tsx` routing

  - Ensure `app/page.tsx` exists and is default export
  - Acceptance: Dev server serves homepage without 404

- [ ] Create `Hero` component

  - File: `src/components/Hero.tsx`
  - Props: `title`, `subtitle`, optional `backgroundImage`
  - Acceptance: Hero section renders title, subtitle, and background

- [ ] Create `FeaturedGrid` component

  - File: `src/components/FeaturedGrid.tsx`
  - Uses `GridContainer` and `GridItem` for featured items
  - Acceptance: Featured items display in bento grid on homepage

- [ ] Create `ExpertiseSection` component

  - File: `src/components/ExpertiseSection.tsx`
  - Accepts list of skills; renders icons or tags
  - Acceptance: Expertise list displays correctly

- [ ] Create `CallToAction` component

  - File: `src/components/CallToAction.tsx`
  - Props: `text`, `href`
  - Acceptance: Button navigates to correct link when clicked

- [ ] Integrate components into homepage
  - Import and use `Hero`, `FeaturedGrid`, `ExpertiseSection`, `CallToAction` in `app/page.tsx`
  - Acceptance: Homepage renders all sections with no errors

## Create about/bio page

- [ ] Ensure `src/app/about/page.tsx` exists

  - Create file with default export if missing
  - Acceptance: `/about` route renders without error

- [ ] Create `BioSection` component

  - File: `src/components/BioSection.tsx`
  - Renders professional bio text
  - Acceptance: Bio text displays as intended

- [ ] Create `SkillsList` component

  - File: `src/components/SkillsList.tsx`
  - Renders tech skills as styled tags
  - Acceptance: Skills list displays with correct styling

- [ ] Create `CareerTimeline` component

  - File: `src/components/CareerTimeline.tsx`
  - Renders career milestones vertically
  - Acceptance: Timeline displays items in chronological order

- [ ] Create `InterestsSection` component

  - File: `src/components/InterestsSection.tsx`
  - Renders list of personal interests
  - Acceptance: Interests section displays correctly

- [ ] Integrate sections into about page
  - Import and use all components in `app/about/page.tsx`
  - Acceptance: About page displays all subsections without errors

## Implement contact system

- [ ] Create `ContactInfo` component

  - File: `src/components/ContactInfo.tsx`
  - Displays email, phone, location
  - Acceptance: Contact info renders correctly

- [ ] Create `SocialLinks` component

  - File: `src/components/SocialLinks.tsx`
  - Accepts list of social profiles; renders icons with links
  - Acceptance: Icons link to correct profiles

- [ ] Create `AvailabilityIndicator` component

  - File: `src/components/AvailabilityIndicator.tsx`
  - Shows current status (e.g., "Available", "Busy")
  - Acceptance: Indicator updates based on provided prop

- [ ] Create contact form page

  - File: `src/app/contact/page.tsx`
  - Form fields: name, email, message; client-side validation
  - Acceptance: Form submits data and shows success message

- [ ] Implement contact API route
  - File: `src/app/api/contact/route.ts`
  - POST handler validating input and returning status
  - Acceptance: API route returns 200 on valid POST

## Develop blog section

- [ ] Create blog index page

  - File: `src/app/blog/page.tsx`
  - Load markdown posts from `/content/blog`
  - Use `BlogCard` to render list with title, date, excerpt
  - Acceptance: Blog index displays posts correctly

- [ ] Implement dynamic blog post page

  - File: `src/app/blog/[slug]/page.tsx`
  - Load MDX content via chosen loader (e.g., contentlayer2)
  - Render frontmatter and content
  - Acceptance: Sample post renders with correct layout

- [ ] Add code block syntax highlighting

  - Configure MDX loader with Prism or Highlight.js
  - Acceptance: Code blocks show syntax coloring

- [ ] Add table of contents generation

  - Use remark-toc or custom parser to generate TOC
  - Display TOC on post pages
  - Acceptance: TOC links scroll to headings

- [ ] Implement category filter on blog index
  - Add dropdown or tags to filter posts by category
  - Acceptance: Blog index filters posts correctly

---

_STOP: Confirm completion of all subtasks before moving to Phase 5._
