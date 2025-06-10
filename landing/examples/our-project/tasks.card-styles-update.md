# Card Styles Update Tasks

### Blog Example Card
- [x] Replace the example card for "Blog" (the large/focus card) in the Examples section of the landing page
  - [x] Use `BlogCard` in "image" mode for this card
  - [x] Use a placeholder image if no blog cover image is set
  - [x] Card should retain the same grid size/placement as before
- [x] Validate that the card renders and links as expected


---

### Update Layout Examples

1. **Make entire card a link**
   - [x] Update each layout example card (e.g. BentoGrid, MasonryGrid, Portfolio, Blog Example) so the whole card is clickable and links to the correct example route (e.g. `/examples/portfolio`).
   - [x] Use a wrapper or overlay link approach if needed (do not convert to BlogCardImage).
   - [x] Validate accessibility and keyboard navigation for the linked card.

2. **Render miniature grid preview inside card**
   - [x] Investigate if we can render a miniature version of the grid from the associated example page (e.g. Portfolio grid) inside the card.
   - [x] If practical, create a reusable "MiniGridPreview" or similar component that can be used in cards.
   - [x] Implement for at least one example (e.g. Portfolio Example card).
   - [x] Validate that the mini grid preview renders responsively and does not break the card layout.
   - [x] If not practical, document blockers and suggest alternatives (e.g. static image, SVG, or placeholder blocks).

3. **Extract shared PortfolioGrid component**
   - [x] Create `PortfolioGrid.tsx` under `/templates/nextjs/src/app/examples/portfolio` that encapsulates the `<GridLayout>` logic and styles for the portfolio demo.
   - [x] Update `/templates/nextjs/src/app/examples/portfolio/page.tsx` to import and render `PortfolioGrid` instead of inline grid code.
   - [x] Replace `MiniGridPreview` in `/templates/nextjs/src/app/page.tsx` to import and render `PortfolioGrid` with a `mini` or scaled mode prop.
   - [x] Add a `mini` or `card` prop to `PortfolioGrid` to adjust row heights, gap, and card size when used as a preview, forcing the grid to always use the `lg` (or `xl`) breakpoint configuration regardless of container width.
   - [x] Validate that the portfolio example page and the mini preview in the card both render correctly and responsively.

#### Extract shared grid components for remaining layout examples
   - [x] Create `BentoGrid.tsx` under `/templates/nextjs/src/app/examples/bentogrid` that encapsulates `<GridLayout>` logic and styles for the BentoGrid demo.
   - [x] Update `/templates/nextjs/src/app/examples/bentogrid/page.tsx` to import and render `BentoGrid.tsx` instead of inline grid code.
   - [x] Replace the BentoGrid card in the landing page (`/src/app/page.tsx`) with `<BentoGrid mini />` for a miniature preview.
   - [x] Create `BlogGrid.tsx` under `/templates/nextjs/src/app/examples/blog` to encapsulate blog-grid demo layout.
   - [x] Update `/templates/nextjs/src/app/examples/blog/page.tsx` to import and render `BlogGrid.tsx` instead of inline grid code.
   - [x] Create `GridLayoutExample.tsx` under `/templates/nextjs/src/app/examples/gridlayout` to extract grid code and styles.
   - [x] Update `/templates/nextjs/src/app/examples/gridlayout/page.tsx` to import and render `GridLayoutExample.tsx`.
   - [x] Replace the GridLayout Example card in the landing page with `<GridLayoutExample mini />`.
   - [x] Create `MasonryGrid.tsx` under `/templates/nextjs/src/app/examples/masonrygrid` to encapsulate layout and styles.
   - [x] Update `/templates/nextjs/src/app/examples/masonrygrid/page.tsx` to import and render `MasonryGrid.tsx`.
   - [x] Replace the MasonryGrid Example card in the landing page with `<MasonryGrid mini />`.
   - [ ] Consider extracting the list layout under `/templates/nextjs/src/app/blog` into `BlogListGrid.tsx` and update `/src/app/blog/page.tsx` for consistency and test keyboard navigation.

#### Update Project Feature Card

- [x] Make border match the border on the 2nd card in the example image (`bg-teal-500`, thin appearing style)
- [x] Move the buttons for the different techs into the content section, reduce corner rounding, and tone down the colors.
- [x] Increase left padding in content section (pl-10).
- [x] Make vertical divider extend the height of the card it is dividing.
- [x] Increasing padding for text in title section.  Increase all, but increase top more than the others.

#### Add Coming Soon Feature Card

- [x] Create `ComingSoonFeatureCard.tsx` under `src/components/cards` with the Astro template layout (stars animation, status badge, action buttons)
- [x] Import `FileText`, `Rocket`, `Star`, `Box`, and `Globe` from `lucide-react` in the new component
- [x] Add `ComingSoonFeatureCard` to `/src/app/page.tsx`, replacing the Astro Starter card
- [x] Ensure responsive layout and hover animations match design
- [x] Write a simple smoke test or Storybook story for the component

#### Add Guides & Docs Card
- [x] Create `GuidesFeatureCard.tsx` under `src/components/cards` with the provided reference layout and styles.
- [x] Import `FileText`, `BookOpen`, `Code`, `Terminal`, `ExternalLink`, `Search`, `GitBranch`, and `Cpu` from `lucide-react` in the new component.
- [x] Wrap the card content in `FeatureCardWrapper` (rounded-[0.5em], bg-gradient-to-br from-slate-900 to-slate-800, border border-slate-700, hover:border-purple-500, hover:shadow-purple-900/20).
- [x] Implement the header section with title "Guides & Docs", description, and `BookOpen` icon.
- [x] Implement the main content area with two columns: key guides (AI Project Guide quick start, links to Monorepo Structure, CLI Commands, Custom Configuration) and documentation resources grid (Getting Started, Templates, API Reference, Examples).
- [x] Implement the footer with search icon and label, and a "View All Documentation" button with `ExternalLink` icon.
- [x] Export `GuidesFeatureCard` in `src/components/cards/index.ts`.
- [x] Import and render `GuidesFeatureCard` in `/src/app/page.tsx` landing page in the Templates grid.

#### Add Coming Soon Overlay Component

- [ ] **Design & Plan Coming Soon Overlay**
  - [ ] Review `guide.ai-project.process` Phases 3 & 4 for design system/componentization and UX polish requirements.
  - [ ] Reference `guide.ai-project.task-expansion` for detail expansion and process linkage.
  - [ ] Define overlay requirements: themeable (color prop), badge label prop, blur/opacity customization, pattern density, accessibility, and composability.
  - [ ] Draft component API signature and prop types.
  - [ ] Create initial Tailwind style map for gradients, blur, and badges.
  - [ ] Confirm icon library imports and dependencies (e.g., lucide-react).
  - [ ] Specify accessibility attributes (aria-disabled, role).
  - [ ] Write design spec section in documentation for overlay behavior and theming.

- [ ] **Implement Universal Coming Soon Overlay**
  - [ ] Create a reusable `ComingSoonOverlay` component under `src/components/overlays/`.
  - [ ] Accept props: `color` (teal, purple, etc.), `label`, `blurAmount`, `patternLines`, `children`, and `className`.
  - [ ] Implement diagonal pattern and badge, using color map for theme alignment.
  - [ ] Ensure overlay is accessible (aria-disabled, role="presentation").
  - [ ] Write Storybook story or smoke test for the overlay.

- [ ] **Integrate Overlay with GuidesFeatureCard**
  - [ ] Apply `ComingSoonOverlay` to the API documentation card in `src/components/cards/GuidesFeatureCard.tsx`.
  - [ ] Use purple theme for API docs overlay, teal for greenish items, etc.
  - [ ] Adjust blur and opacity for optimal UX focus.
  - [ ] Ensure underlying card content is blurred and interaction is blocked.

- [ ] **Polish & Document**
  - [ ] Confirm overlay works across all supported themes and screen sizes.
  - [ ] Update documentation for overlay usage and theming.
  - [ ] Review accessibility and keyboard navigation.
  - [ ] Solicit feedback from project manager before rollout to other cards.

---

##### Notes

- Project: manta-templates
- Framework: nextjs
- Tools: tailwindcss (4), shadcn
- Initial integration target: API documentation card in `GuidesFeatureCard.tsx`
- All design and process expansions should follow project guides and .windsurfrules.

#### Maintenance Items
- [ ] Factor out hard-coded content from `BlogIndexLayout.tsx` to support dynamic data.
- [ ] Factor out hard-coded content from project, coming soon, and guides feature cards to support dynamic data.
- [ ] Write a smoke test or Storybook story for `GuidesFeatureCard` to verify layout and interactions.


#### (Add additional card style updates below as needed)
