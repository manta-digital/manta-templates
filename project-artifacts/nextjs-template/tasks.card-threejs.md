# Card ThreeJS

## Phase 3/4 Task Expansion
Section: card-threejs (Add ThreeJS card support to Next.js template)

### Project Context
Framework: Next.js (App Router)
UI: TailwindCSS v4 (not v3), shadcn
3D: First use of Three.js in this template
Theme: Must support both dark and light modes, using Tailwind 4 best practices and project patterns

### Tasks
#### Three.js Integration & Card Component
[x] Add Three.js to project
[x] Install three npm package in the template project
[x] Confirm no existing Three.js code or config in project
[x] Success: three appears in package.json and lockfile

#### Configure Three.js for Next.js (App Router)
[x] Ensure Three.js is only loaded client-side (no SSR)
[x] Confirm usage of "use client" in relevant components
[x] Success: No SSR/Next.js build errors or hydration issues

#### Create ThreeJSCard component
[x] Place in src/components/cards/ThreeJSCard.tsx (PascalCase, per coderules)
[x] Use functional React component with TypeScript interface for props
[x] Render a <canvas> for Three.js scene
[x] Success: Component mounts/unmounts cleanly, canvas is visible

#### Implement minimal Three.js scene in card
[x] Initialize Three.js scene, camera, renderer on mount
[x] Add simple geometry (e.g. spinning cube) for visual validation
[x] Clean up Three.js resources on unmount
[x] Success: 3D object renders, no memory leaks/warnings in console

#### Integrate TailwindCSS v4 for card styling
[x] Use Tailwind 4 utility classes for card container and canvas
[x] Ensure card looks visually consistent with other cards (padding, border, shadow, etc.)
[x] Success: Card matches design system, responsive and accessible

#### Support dark and light mode (Tailwind 4)
[x] Use Tailwind 4 dark mode strategies (no tailwind.config.js)
[x] Ensure Three.js background and card adapt to theme changes
[x] Success: Card and 3D scene background update with theme toggle

#### Accessibility & UX checks
[ ] Card is keyboard accessible and screen-reader friendly
[ ] Canvas has appropriate ARIA roles/labels if needed
[ ] Success: No major a11y issues, passes basic audits

#### Document usage and integration
[x] Add usage example to project documentation or story/demo page
[x] Add ThreeJSCard to landing page Examples section
[ ] Note any gotchas for Three.js + Next.js + Tailwind 4
[x] Success: Example renders, documentation is clear

### Final Check
[ ] Confirm:
[ ] Three.js card displays 3D content in both dark and light modes
[ ] No SSR or hydration errors
[ ] Card matches project UI/UX conventions
[ ] All code follows project coderules and linting passes
[ ] Documentation and examples are present