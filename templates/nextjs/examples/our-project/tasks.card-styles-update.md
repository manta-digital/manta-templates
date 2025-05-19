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
   - [ ] Update each layout example card (e.g. BentoGrid, MasonryGrid, Portfolio, Blog Example) so the whole card is clickable and links to the correct example route (e.g. `/examples/portfolio`).
   - [ ] Use a wrapper or overlay link approach if needed (do not convert to BlogCardImage).
   - [ ] Validate accessibility and keyboard navigation for the linked card.

2. **Render miniature grid preview inside card**
   - [ ] Investigate if we can render a miniature version of the grid from the associated example page (e.g. Portfolio grid) inside the card.
   - [ ] If practical, create a reusable "MiniGridPreview" or similar component that can be used in cards.
   - [ ] Implement for at least one example (e.g. Portfolio Example card).
   - [ ] Validate that the mini grid preview renders responsively and does not break the card layout.
   - [ ] If not practical, document blockers and suggest alternatives (e.g. static image, SVG, or placeholder blocks).

#### (Add additional card style updates below as needed)
