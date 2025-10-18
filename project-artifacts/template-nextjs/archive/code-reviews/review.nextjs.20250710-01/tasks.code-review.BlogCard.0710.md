---
layer: project
docType: review
filePath: src/components/cards/BlogCard.tsx
---

# Code Review Tasks: BlogCard.tsx

## P2: Best Practices
- [ ] **Task: Fix deprecated Next.js Image props**
  - Lines 33-36: Replace deprecated `layout="fill"` and `objectFit="cover"`
  - Use modern Next.js Image component with `fill` prop and CSS classes
  - Update to Next.js 15 Image component patterns
  - **Success:** Modern Next.js Image component usage

## P3: Enhancements
- [ ] **Task: Add loading state for images**
  - Add loading placeholder or skeleton for blog card images
  - Implement progressive image loading
  - Add error handling for failed image loads
  - **Success:** Better loading experience for blog cards 