## Quality Assurance

### Verify Component Compatibility
- [ ] Test all extracted components work in Next.js
  - [ ] Run templates/nextjs development server
  - [ ] Test all pages load correctly
  - [ ] Verify all components render and function as expected
  - [ ] Test interactive features (theme toggle, navigation, etc.)
- [ ] Test components work in React Router template
  - [ ] Run templates/react development server  
  - [ ] Navigate through all routes
  - [ ] Verify components display identical content
  - [ ] Test component interactions and state management
- [ ] Test components work in Astro template
  - [ ] Run templates/astro development server
  - [ ] Verify React islands hydrate correctly
  - [ ] Test client-side interactions work in islands
  - [ ] Verify SSG builds work correctly
- [ ] Verify performance characteristics are maintained
  - [ ] Use browser dev tools to measure load times
  - [ ] Compare bundle sizes before and after refactor
  - [ ] Test image loading performance (Next.js Image optimization)
  - [ ] Verify hydration performance in Astro
- [ ] Ensure bundle sizes remain reasonable
  - [ ] Analyze bundle sizes: `npx webpack-bundle-analyzer`
  - [ ] Compare total bundle size increase
  - [ ] Verify increase is <10% from abstraction overhead
- [ ] Test theme system across all frameworks
  - [ ] Verify theme switching works in all templates
  - [ ] Test theme persistence
  - [ ] Verify dark/light mode renders correctly
  - [ ] Success: All components work identically across frameworks with acceptable performance

### Validate TypeScript Coverage
- [ ] Ensure 100% TypeScript coverage in ui-core package
  - [ ] Run TypeScript compiler with strict settings
  - [ ] Check for any `any` types: `grep -r "any" packages/ui-core/src`
  - [ ] Verify all component props are properly typed
  - [ ] Ensure all utility functions have return type annotations
- [ ] Verify proper type exports for all components
  - [ ] Test importing types: `import { BlogCardProps } from '@manta-templates/ui-core'`
  - [ ] Verify TypeScript IntelliSense works for imported components
  - [ ] Check that adapter components inherit correct types
- [ ] Test adapter type safety and component prop forwarding
  - [ ] Verify Next.js adapter components accept all original props
  - [ ] Test that injected component props are properly typed
  - [ ] Ensure no type errors in adapter implementations
- [ ] Run comprehensive TypeScript checks
  - [ ] Run `tsc --noEmit` in all packages
  - [ ] Run `tsc --noEmit` in all templates
  - [ ] Fix any TypeScript errors discovered
  - [ ] Success: No TypeScript errors, full type safety across all packages

### Test Template Instantiation
- [ ] Verify Next.js template instantiation works
  - [ ] Test degit command: `npx degit yourorg/nextjs-template test-nextjs`
  - [ ] Navigate to test directory: `cd test-nextjs`
  - [ ] Install dependencies: `npm install`
  - [ ] Run dev server: `npm run dev`
  - [ ] Verify template runs without errors
- [ ] Test React template instantiation
  - [ ] Test degit command: `npx degit yourorg/react-template test-react`
  - [ ] Install and run following same process
  - [ ] Verify all functionality works correctly
- [ ] Test Astro template instantiation
  - [ ] Test degit command: `npx degit yourorg/astro-template test-astro`
  - [ ] Install and run following same process
  - [ ] Verify React islands work correctly
- [ ] Verify all templates install dependencies successfully
  - [ ] Test with npm: `npm install`
  - [ ] Test with pnpm: `pnpm install`
  - [ ] Test with yarn: `yarn install`
  - [ ] Verify no dependency conflicts
- [ ] Confirm development servers start without errors
  - [ ] Test `npm run dev` for all templates
  - [ ] Test `npm run build` for all templates
  - [ ] Verify production builds work correctly
- [ ] Test templates work without workspace context
  - [ ] Copy dist-templates to separate directory outside repo
  - [ ] Test installation and running from clean environment
  - [ ] Success: All templates can be instantiated and run with single command

### Documentation and Examples
- [ ] Update component documentation to reflect new import paths
  - [ ] Update all README files to use new import syntax
  - [ ] Create comprehensive API documentation for ui-core components
  - [ ] Document dependency injection patterns for each component
  - [ ] Create examples showing component usage in different frameworks
- [ ] Create migration guide for existing manta-templates users
  - [ ] Document breaking changes in import paths
  - [ ] Provide step-by-step migration instructions
  - [ ] Create automated migration script if possible:
    ```bash
    # Script to update imports
    find . -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/@\/components\/cards\/BlogCard/@manta-templates\/ui-adapters-nextjs/g'
    ```
- [ ] Generate examples showing multi-framework usage
  - [ ] Create examples/ directory in repository root
  - [ ] Create side-by-side examples of same component in different frameworks
  - [ ] Document framework-specific considerations
- [ ] Update README files for all templates with correct setup instructions
  - [ ] Ensure each template has comprehensive setup documentation
  - [ ] Include troubleshooting section for common issues
  - [ ] Document framework-specific features and optimizations
- [ ] Create comprehensive documentation site
  - [ ] Set up documentation framework (e.g., Docusaurus, VitePress)
  - [ ] Create component showcase with live examples
  - [ ] Document best practices and patterns
- [ ] Success: Clear documentation, smooth migration path for existing users

### Final Integration Test
- [ ] Run complete build process from clean state
  - [ ] Clean all build artifacts: `pnpm clean`
  - [ ] Install all dependencies: `pnpm install`
  - [ ] Build all packages: `pnpm build`
  - [ ] Build all templates: `pnpm build:templates`
  - [ ] Verify no errors in entire process
- [ ] Test complete user workflow
  - [ ] Simulate new user downloading templates
  - [ ] Test template customization workflow
  - [ ] Verify development and build processes work end-to-end
- [ ] Performance regression testing
  - [ ] Compare build times before and after refactor
  - [ ] Compare runtime performance metrics
  - [ ] Verify no significant degradation
- [ ] Success: Complete UI refactor implementation validated and ready for production use