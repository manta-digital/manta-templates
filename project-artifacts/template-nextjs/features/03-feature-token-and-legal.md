---
layer: project
docType: feature
status: specification
---

# Feature: Token Interpolation and Legal Content Migration

## Overview

Implement token interpolation functionality for dynamic content placeholders and migrate legal content to framework-agnostic ui-core/ui-adapters architecture. This enables legal content to be shared across Next.js, Astro, React, and other frameworks while supporting dynamic token replacement.

## Problem Statement

Currently, legal content (privacy policy, terms of service, etc.) exists in template-specific locations and uses a custom `presetContent.ts` system for token interpolation. This creates duplication across frameworks and prevents legal content from being truly framework-agnostic.

### Current State
- ❌ Legal content locked to Next.js template 
- ❌ Token interpolation only in `presetContent.ts`
- ❌ Cannot reuse legal content across frameworks
- ❌ Only `/legal` page uses token interpolation (privacy/terms/cookies don't)
- ❌ Inconsistent content loading patterns

### Target State  
- ✅ Legal content available to all frameworks via ui-core/ui-adapters
- ✅ Token interpolation built into content provider system
- ✅ Consistent content loading patterns across all legal pages
- ✅ Framework-agnostic implementation (no Next.js/Astro/Vite dependencies)
- ✅ Reusable legal templates with dynamic token replacement

## Technical Approach

### Framework Constraints
**Framework-agnostic means:**
- ❌ No Next.js, Astro, Vite, or other framework-specific dependencies
- ✅ Can use React, ShadCN, Tailwind CSS, and Radix (UI layer dependencies)

### Architecture Design

**1. Token Interpolation System**
- Extend `NextjsContentProvider` with token interpolation capability
- Add `buildTokens()` function for site config → token mapping
- Add `applyTokens()` function for markdown token replacement
- Support token format: `{{site.url}}`, `{{copyright.holder}}`, etc.

**2. Legal Content Migration**
- Move legal markdown files from template to ui-adapters-nextjs
- Support preset system (MIT vs full legal templates)  
- Create framework-agnostic fallback content helpers
- Remove template-specific `presetContent.ts` dependency

**3. Content Provider Enhancement**
- Extend `BaseContentProvider` interface for token support
- Implement token interpolation in `NextjsContentProvider.loadContent()`
- Maintain backward compatibility with existing content loading

## Implementation Plan

### Phase 1: Token Interpolation Foundation (Tasks 1-5)
1. **Add token interpolation interface to ui-core content types**
   - Extend `ContentData` interface with token support
   - Add `TokenProvider` interface for framework-specific token building

2. **Create buildTokens function in ui-adapters-nextjs**  
   - Extract from existing `presetContent.ts` 
   - Make framework-agnostic (accepts any site config object)
   - Support standard tokens: site.url, copyright.holder, contacts.*, etc.

3. **Add applyTokens function to NextjsContentProvider**
   - Regex-based find/replace for `{{token.name}}` format
   - Efficient string interpolation with caching
   - Error handling for missing tokens

4. **Extend NextjsContentProvider.loadContent to support token interpolation**
   - Optional token interpolation parameter
   - Apply tokens after markdown processing
   - Maintain existing content loading behavior

5. **Test token interpolation with existing legal content**
   - Verify token replacement works with `/legal` page
   - Test all token types: site, copyright, contacts
   - Ensure no regression in existing functionality

### Phase 2: Legal Content Migration (Tasks 6-9)
6. **Update /legal page to use nextjsContentProvider with tokens**
   - Replace `getPresetContent` with `nextjsContentProvider.loadContent()`
   - Add token interpolation parameter
   - Maintain existing preset logic (MIT vs full)

7. **Move legal content from template to ui-adapters-nextjs**
   - Copy legal markdown files to ui-adapters package
   - Preserve preset directory structure
   - Update content paths in provider

8. **Create getDefaultLegalContent helper in ui-core**
   - Framework-agnostic fallback content for all legal pages
   - Support different legal presets (MIT, full, custom)
   - Consistent interface for legal content across frameworks

9. **Remove presetContent.ts dependency from template**
   - Update imports in remaining files
   - Remove unused functions and dependencies
   - Clean up template-specific content loading

### Phase 3: Testing & Finalization (Tasks 10-12)
10. **Test all legal pages work with new system**
    - Verify `/legal`, `/privacy`, `/terms`, `/cookies` all work
    - Test token interpolation on all pages
    - Validate preset switching (MIT vs full)

11. **Build and commit legal migration**
    - Ensure all builds pass
    - Commit with detailed migration summary
    - Update documentation

12. **Update other framework adapters (future)**
    - Create Astro content provider with token support
    - Create React/Vite content provider with token support
    - Demonstrate framework-agnostic legal content usage

## Token System Specification

### Supported Tokens
```typescript
interface TokenMap {
  'site.name': string;           // Site name
  'site.url': string;            // Site URL
  'site.domain': string;         // Site domain
  'author.name': string;         // Author/owner name
  'contacts.primaryEmail': string;    // Primary contact email
  'contacts.businessEmail': string;   // Business inquiries email
  'contacts.supportEmail': string;    // Technical support email
  'copyright.year': string;           // Copyright year
  'copyright.lastUpdated': string;    // Last updated year
  'copyright.holder': string;         // Copyright holder name
}
```

### Token Format
- **Pattern**: `{{token.name}}` (double curly braces)
- **Case-sensitive**: `{{site.url}}` ✅, `{{Site.URL}}` ❌
- **Nesting**: `{{level1.level2.level3}}` supported
- **Escaping**: Not needed - literal `{{` will be preserved if no matching token

### Example Usage
```markdown
---
title: Privacy Policy  
---

Last updated: {{copyright.lastUpdated}}

## Data Collection

When you visit {{site.url}}, we may collect information...

## Contact Information

For privacy questions, contact {{contacts.primaryEmail}}.

© {{copyright.year}} {{copyright.holder}}. All rights reserved.
```

## Content Structure

### Legal Content Organization
```
ui-adapters-nextjs/
├── src/
│   ├── content/
│   │   ├── legal/
│   │   │   ├── default/
│   │   │   │   ├── legal.md
│   │   │   │   ├── privacy.md
│   │   │   │   ├── terms.md
│   │   │   │   └── cookies.md
│   │   │   └── presets/
│   │   │       ├── mit/
│   │   │       │   ├── legal.md
│   │   │       │   ├── privacy.md
│   │   │       │   ├── terms.md
│   │   │       │   └── cookies.md
│   │   │       └── full/
│   │   │           ├── legal.md
│   │   │           ├── privacy.md
│   │   │           ├── terms.md
│   │   │           └── cookies.md
│   │   └── index.ts
```

### Framework Usage Pattern
```typescript
// Next.js usage
import { nextjsContentProvider } from '@manta-templates/ui-adapters-nextjs';

const content = await nextjsContentProvider.loadContent<LegalContent>(
  'legal', 
  'legal',
  { tokens: true, preset: 'mit' }
);

// Astro usage (future)
import { astroContentProvider } from '@manta-templates/ui-adapters-astro';

const content = await astroContentProvider.loadContent<LegalContent>(
  'legal',
  'legal', 
  { tokens: true, preset: 'mit' }
);
```

## Benefits

### Developer Experience
- ✅ **Framework Agnostic**: Same legal content works across Next.js, Astro, React
- ✅ **Dynamic Content**: Site-specific information updates automatically
- ✅ **Consistent API**: Same content loading pattern for all legal pages
- ✅ **Type Safety**: Full TypeScript support for content and tokens
- ✅ **Easy Migration**: Templates can gradually adopt ui-adapters pattern

### Content Management
- ✅ **Single Source of Truth**: Legal content maintained in one location
- ✅ **Template System**: Multiple presets (MIT, full, custom) supported
- ✅ **Token Flexibility**: Easy to add new token types and mappings
- ✅ **Fallback Content**: Graceful degradation when content loading fails

### Architecture Benefits
- ✅ **Separation of Concerns**: Content logic separate from framework logic
- ✅ **Reusability**: ui-core components work across all frameworks
- ✅ **Maintainability**: Centralized legal content reduces duplication
- ✅ **Extensibility**: Token system can be expanded for other content types

## Risk Assessment

### Technical Risks
- **Low**: Token interpolation is straightforward string replacement
- **Low**: Content migration follows established ui-adapters patterns
- **Medium**: Need to ensure all legal pages continue working during migration

### Compatibility Risks  
- **Low**: Backward compatibility maintained through optional parameters
- **Low**: Existing content loading continues to work unchanged
- **Low**: Template changes are additive, not breaking

### Migration Risks
- **Medium**: Need to coordinate content movement and page updates
- **Low**: Can be done incrementally page by page
- **Low**: Easy rollback by reverting to presetContent.ts

## Success Criteria

### Functional Requirements
- [ ] All legal pages (legal, privacy, terms, cookies) work with new system
- [ ] Token interpolation works correctly for all supported tokens
- [ ] Preset system (MIT vs full) functions as before
- [ ] No regression in existing content loading functionality
- [ ] Framework-agnostic legal content available via ui-adapters

### Quality Requirements  
- [ ] All builds pass (Next.js template, ui-core, ui-adapters)
- [ ] Type safety maintained throughout token system
- [ ] Performance equivalent or better than existing system
- [ ] Code coverage maintained for content loading functions

### Documentation Requirements
- [ ] Token system documented with examples
- [ ] Migration guide for other frameworks
- [ ] Legal content structure documented
- [ ] Framework adapter patterns documented

## Future Extensions

### Additional Frameworks
- **Astro**: Create `AstroContentProvider` with token support
- **React/Vite**: Create `ViteContentProvider` with token support  
- **SvelteKit**: Create `SvelteKitContentProvider` with token support

### Enhanced Token System
- **Conditional Tokens**: Support for `{{#if condition}}...{{/if}}` logic
- **Loop Tokens**: Support for `{{#each items}}...{{/each}}` iterations  
- **Custom Functions**: Support for `{{formatDate date}}` helper functions
- **External Data**: Support for API-sourced tokens

### Content Types
- **About Pages**: Apply token system to about/contact content
- **Blog Templates**: Use tokens for author information and metadata
- **Product Pages**: Dynamic product information and pricing
- **Documentation**: Framework-specific installation instructions

---

*This feature enables truly framework-agnostic legal content with dynamic token interpolation, making manta-templates legal systems reusable across any React-based framework.*