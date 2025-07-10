---
layer: project
docType: review
filePath: src/components/cards/BlogHeroCard.tsx
---

# Code Review Tasks: BlogHeroCard.tsx

## P2: Best Practices
- [ ] **Task: Fix invalid Tailwind CSS class**
  - Line 22: Replace `bg-linear-to-br` with `bg-gradient-to-br`
  - Verify all gradient classes are valid Tailwind utilities
  - **Success:** All CSS classes are valid and render correctly

## P3: Enhancements
- [ ] **Task: Add semantic HTML structure**
  - Add proper ARIA labels for hero section
  - Use semantic HTML elements for better accessibility
  - Add screen reader announcements
  - **Success:** Better accessibility for hero card content 