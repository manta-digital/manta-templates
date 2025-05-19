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
   - [ ] Create `PortfolioGrid.tsx` under `/templates/nextjs/src/app/examples/portfolio` that encapsulates the `<GridLayout>` logic and styles for the portfolio demo.
   - [ ] Update `/templates/nextjs/src/app/examples/portfolio/page.tsx` to import and render `PortfolioGrid` instead of inline grid code.
   - [ ] Replace `MiniGridPreview` in `/templates/nextjs/src/app/page.tsx` to import and render `PortfolioGrid` with a `mini` or scaled mode prop.
   - [ ] Add a `mini` or `card` prop to `PortfolioGrid` to adjust row heights, gap, and card size when used as a preview, forcing the grid to always use the `lg` (or `xl`) breakpoint configuration regardless of container width.
   - [ ] Validate that the portfolio example page and the mini preview in the card both render correctly and responsively.

#### (Add additional card style updates below as needed)
