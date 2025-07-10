---
layer: project
docType: review
filePath: src/components/cards/ComingSoonFeatureCard.tsx
---

# Code Review Tasks: ComingSoonFeatureCard.tsx

## P2: Best Practices
- [ ] **Task: Extract hard-coded URLs to configuration**
  - Line 22: Move hard-coded GitHub URL to environment variables or config
  - Make repository URL configurable per environment
  - Add proper URL validation
  - **Success:** Configurable repository URLs without code changes

## P3: Enhancements
- [ ] **Task: Add reduced motion support**
  - Lines 25-35: Add prefers-reduced-motion media query detection
  - Disable animated dots when reduced motion is preferred
  - Respect user accessibility preferences
  - **Success:** Better accessibility for users with motion sensitivity 