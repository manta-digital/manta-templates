---
slice: token-and-legal
project: manta-templates
lld: project-artifacts/nextjs-template/features/03-feature-token-and-legal.md
dependencies: []
projectState: ui-core and ui-adapters-nextjs packages established, header/footer content migration completed, legal pages exist but use inconsistent content loading patterns
status: completed
lastUpdated: 2025-08-27
---

## Context Summary
- Working on token-and-legal slice for manta-templates project
- Current project state: ui-core/ui-adapters architecture established, legal content exists in template-specific locations using presetContent.ts
- Key assumptions: Framework-agnostic means no Next.js/Astro/Vite dependencies but React/ShadCN/Tailwind/Radix are allowed
- Dependencies: None - this is foundational content system enhancement
- What this slice delivers: Token interpolation system and framework-agnostic legal content migration
- Next planned slice: TBD by Project Manager

## Phase 1: Token Interpolation Foundation

### Task 1: Add Token Interpolation Interface to ui-core Content Types

#### Extend ContentData interface in ui-core
- [x] **Open and examine `/packages/ui-core/src/content/types.ts`**
  - [x] Locate the existing `ContentData` interface definition
  - [x] Add optional `tokens?: Record<string, string>` property to ContentData interface
    ```typescript
    export interface ContentData {
      // ... existing properties ...
      tokens?: Record<string, string>;
    }
    ```
  - [x] Success: ContentData interface updated with tokens property

#### Add token-related interfaces
- [x] **Create TokenProvider interface in same file**
  - [x] Add interface with JSDoc documentation:
    ```typescript
    /**
     * Provider interface for building token replacements for content interpolation
     */
    export interface TokenProvider {
      buildTokens(): Record<string, string>;
    }
    ```
  - [x] Success: TokenProvider interface defined

- [x] **Create TokenConfig interface**
  - [x] Add configuration interface:
    ```typescript
    /**
     * Configuration for token interpolation in content loading
     */
    export interface TokenConfig {
      enableTokens?: boolean;
      tokenProvider?: TokenProvider;
    }
    ```
  - [x] Success: TokenConfig interface defined

#### Update BaseContentProvider interface
- [x] **Modify BaseContentProvider loadContent method signature**
  - [x] Locate existing `loadContent()` method in BaseContentProvider interface
  - [x] Add optional tokenConfig parameter:
    ```typescript
    loadContent(path: string, options?: { tokenConfig?: TokenConfig }): Promise<ContentData>
    ```
  - [x] Add JSDoc documentation explaining the new parameter
  - [x] Success: BaseContentProvider supports token configuration

#### Update exports
- [x] **Add new interfaces to exports**
  - [x] Verify `TokenProvider` and `TokenConfig` are exported from types.ts
  - [x] Update main ui-core package exports if needed
  - [x] Run `pnpm build` in ui-core package to verify TypeScript compilation
  - [x] Success: All token-related types properly exported and building

### Task 2: Create buildTokens Function in ui-adapters-nextjs

#### Extract existing token logic
- [x] **Examine current presetContent.ts implementation**
  - [x] Read `/templates/nextjs/src/lib/presetContent.ts` to understand existing `buildTokens()` function
  - [x] Document the token types currently supported (site.*, author.*, contacts.*, copyright.*)
  - [x] Note any helper functions like `deriveContacts()` that are used
  - [x] Success: Understand existing token building logic

#### Create tokenBuilder.ts module
- [x] **Create `/packages/ui-adapters/nextjs/src/content/tokenBuilder.ts`**
  - [x] Add imports and SiteConfig interface:
    ```typescript
    import type { TokenProvider } from '@manta-templates/ui-core';

    interface SiteConfig {
      site: {
        url: string;
        title: string;
        name?: string;
      };
      author: {
        name: string;
        email?: string;
      };
      contacts?: {
        primaryEmail?: string;
        supportEmail?: string;
      };
      copyright: {
        holder: string;
        lastUpdated?: string;
      };
    }
    ```
  - [x] Success: File created with proper TypeScript setup

#### Implement buildTokens function
- [x] **Copy and adapt buildTokens function**
  - [x] Copy the existing buildTokens logic from presetContent.ts
  - [x] Modify to accept siteConfig parameter instead of importing it
  - [x] Ensure all token types are supported: site.*, author.*, contacts.*, copyright.*
  - [x] Add error handling for missing config properties
  - [x] Success: Framework-agnostic buildTokens function implemented

#### Create NextjsTokenProvider class
- [x] **Implement TokenProvider interface**
  - [x] Add NextjsTokenProvider class:
    ```typescript
    export class NextjsTokenProvider implements TokenProvider {
      private siteConfig: SiteConfig;

      constructor(siteConfig: SiteConfig) {
        this.siteConfig = siteConfig;
      }

      buildTokens(): Record<string, string> {
        return buildTokens(this.siteConfig);
      }
    }
    ```
  - [x] Success: NextjsTokenProvider class implements interface correctly

#### Export new functions
- [x] **Update package exports**
  - [x] Ensure `/packages/ui-adapters/nextjs/src/content/index.ts` exists
  - [x] Add exports: `export { NextjsTokenProvider, buildTokens } from './tokenBuilder';`
  - [x] Update main package index if needed
  - [x] Test with simple import to verify exports work
  - [x] Success: TokenProvider and buildTokens exported from ui-adapters-nextjs

### Task 3: Add applyTokens Function to NextjsContentProvider

#### Locate NextjsContentProvider
- [x] **Find NextjsContentProvider class file**
  - [x] Look for file in `/packages/ui-adapters/nextjs/src/content/`
  - [x] Examine current class structure and loadContent method
  - [x] Success: Located NextjsContentProvider implementation

#### Study existing token replacement logic
- [x] **Examine applyTokens function in presetContent.ts**
  - [x] Note the regex pattern used for token replacement: `{{token.name}}`
  - [x] Understand how special characters are handled
  - [x] Document current error handling approach
  - [x] Success: Understand token replacement logic

#### Add applyTokens method to class
- [x] **Implement private applyTokens method**
  - [x] Add method to NextjsContentProvider class:
    ```typescript
    private applyTokens(content: string, tokens: Record<string, string>): string {
      let processedContent = content;
      
      for (const [key, value] of Object.entries(tokens)) {
        if (value === null || value === undefined) {
          console.warn(`Token '${key}' has null/undefined value, skipping`);
          continue;
        }
        
        // Escape special regex characters and create pattern
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const tokenRegex = new RegExp(`\\{\\{\\s*${escapedKey}\\s*\\}\\}`, 'g');
        processedContent = processedContent.replace(tokenRegex, String(value));
      }
      
      return processedContent;
    }
    ```
  - [x] Success: applyTokens method added with error handling

#### Add token caching
- [x] **Implement basic token caching**
  - [x] Add private property: `private tokenCache: Map<string, Record<string, string>> = new Map();`
  - [x] Add cache clearing method: `public clearTokenCache(): void { this.tokenCache.clear(); }`
  - [x] Add methods to get/set cached tokens based on provider
  - [x] Success: Token caching implemented

### Task 4: Extend NextjsContentProvider.loadContent for Token Support

#### Update loadContent method signature
- [x] **Modify method signature for token support**
  - [x] Change loadContent signature to include options:
    ```typescript
    async loadContent<T>(
      slug: string,
      contentType: string,
      options?: { tokenConfig?: TokenConfig }
    ): Promise<ContentData<T>>
    ```
  - [x] Add comprehensive JSDoc with examples
  - [x] Ensure backward compatibility (options parameter is optional)
  - [x] Success: Method signature updated for token support

#### Integrate token processing
- [x] **Add token interpolation to loadContent flow**
  - [x] Add token processing after frontmatter parsing but before markdown processing:
    ```typescript
    // Apply token interpolation if requested
    if (options?.tokenConfig?.enableTokens === true) {
      const tokens = await this.getTokensForInterpolation(options.tokenConfig.tokenProvider);
      
      if (tokens && Object.keys(tokens).length > 0) {
        if (content) {
          content = this.applyTokens(content, tokens);
        }
        result.tokens = tokens;
      }
    }
    ```
  - [x] Success: Token interpolation integrated into content loading

#### Add token retrieval helper
- [x] **Create getTokensForInterpolation helper method**
  - [x] Add private method to handle token building with caching
  - [x] Include error handling for missing tokenProvider
  - [x] Log warnings but don't throw errors to maintain backward compatibility
  - [x] Success: Token retrieval helper implemented with proper error handling

#### Test backward compatibility
- [x] **Verify existing functionality unchanged**
  - [x] Test loadContent calls without options parameter
  - [x] Test loadContent with tokenConfig: { enableTokens: false }
  - [x] Test loadContent with tokenConfig: { enableTokens: true, tokenProvider } and valid tokenProvider
  - [x] Verify ContentData structure matches expectations
  - [x] Success: Backward compatibility maintained

### Task 5: Test Token Interpolation with Existing Legal Content

#### Set up test infrastructure
- [x] **Create test file**
  - [x] Create `/packages/ui-adapters/nextjs/src/__tests__/tokenInterpolation.test.ts`
  - [x] Add necessary imports for testing buildTokens, NextjsTokenProvider, and NextjsContentProvider
  - [x] Create mock site config object for testing
  - [x] Success: Test infrastructure ready

#### Test buildTokens function
- [x] **Unit test buildTokens**
  - [x] Test basic token building with complete site config
  - [x] Test with missing config properties
  - [x] Test with null/undefined values
  - [x] Verify all expected token types are generated
  - [x] Success: buildTokens function thoroughly tested

#### Test applyTokens functionality
- [x] **Test token replacement patterns**
  - [x] Test standard format: `{{site.url}}`
  - [x] Test with whitespace: `{{ site.url }}`
  - [x] Test multiple tokens in same content
  - [x] Test malformed tokens (should be left unchanged)
  - [x] Test special characters in token values
  - [x] Success: applyTokens handles all scenarios correctly

#### Test NextjsContentProvider integration
- [x] **Integration test with real legal content**
  - [x] Load actual legal content file with token placeholders
  - [x] Verify tokens are replaced in both HTML and raw content
  - [x] Compare results with existing presetContent.ts behavior
  - [x] Ensure markdown processing still works after token replacement
  - [x] Success: Integration test passes, matches existing behavior

#### Run tests and verify
- [x] **Execute test suite**
  - [x] Run tests in ui-adapters-nextjs package
  - [x] Fix any failing tests
  - [x] Verify code coverage includes new token functionality
  - [x] Success: All tests pass, token interpolation produces identical results to presetContent.ts

## Phase 2: Legal Content Migration

### Task 6: Update /legal Page to Use nextjsContentProvider with Tokens

#### Examine current legal page implementation
- [x] **Read `/templates/nextjs/src/app/legal/page.tsx`**
  - [x] Note current imports and getPresetContent usage
  - [x] Understand how site config is currently accessed
  - [x] Document current page structure
  - [x] Success: Understand current implementation

#### Update imports and provider usage
- [x] **Replace presetContent imports**
  - [x] Remove: `import { getPresetContent } from '@/lib/presetContent'`
  - [x] Add: `import { nextjsContentProvider } from '@manta-templates/ui-adapters-nextjs'`
  - [x] Add: `import { NextjsTokenProvider } from '@manta-templates/ui-adapters-nextjs'`
  - [x] Add: `import { siteConfig } from '@/content/site.config'`
  - [x] Success: Imports updated for new system

#### Update content loading logic
- [x] **Replace getPresetContent call**
  - [x] Replace `getPresetContent('legal', 'legal', 'mit')` with nextjsContentProvider.loadContent with token configuration
  - [x] Handle preset logic based on siteConfig.presets.legal value
  - [x] Implement token interpolation with NextjsTokenProvider
  - [x] Add fallback logic from preset to default content
  - [x] Success: Content loading updated to use new system

#### Test page functionality
- [x] **Verify legal page works**
  - [x] Run `pnpm build` in templates/nextjs to check compilation
  - [x] Fixed linting error (unused variable)
  - [x] Build passes cleanly with no compilation errors
  - [x] Static page generation successful (confirmed in build output)
  - [x] Verified token interpolation setup correctly configured
  - [x] Success: Legal page works identically using nextjsContentProvider

### Task 7: Move Legal Content from Template to ui-adapters-nextjs

#### Create content directory structure
- [x] **Set up legal content directories in ui-adapters-nextjs**
  - [x] Create `/packages/ui-adapters/nextjs/src/content/legal/` directory
  - [x] Create subdirectories: `default/` and `presets/mit/`
  - [x] Mirror existing template structure
  - [x] Success: Directory structure created

#### Copy legal content files
- [x] **Move legal markdown files**
  - [x] Copy `/templates/nextjs/src/content/legal/*.md` to `ui-adapters-nextjs/src/content/legal/default/`
  - [x] Copy `/templates/nextjs/src/content/presets/mit/legal/*.md` to `ui-adapters-nextjs/src/content/legal/presets/mit/`
  - [x] Include all files: legal.md, privacy.md, terms.md, cookies.md
  - [x] Preserve token placeholders and frontmatter exactly
  - [x] Success: Legal content moved to ui-adapters-nextjs

#### Update NextjsContentProvider content path
- [x] **Configure NextjsContentProvider to load from new location**
  - [x] Update contentRoot path to point to ui-adapters-nextjs content directory
  - [x] Adjust preset path logic for new structure
  - [x] Test that content loads from new location
  - [x] Ensure template can still override if needed (backward compatibility)
  - [x] Success: Content loads from ui-adapters-nextjs, maintains flexibility

### Task 8: Create getDefaultLegalContent Helper in ui-core

#### Create legal content helper
- [x] **Add `/packages/ui-core/src/content/legalContent.ts`**
  - [x] Create function signature:
    ```typescript
    export function getDefaultLegalContent(
      type: 'legal' | 'privacy' | 'terms' | 'cookies', 
      preset: 'mit' | 'full'
    ): ContentData
    ```
  - [x] Include hardcoded fallback content for each legal page type
  - [x] Support both MIT and full legal presets
  - [x] Success: Legal content helper created

#### Add TypeScript interfaces
- [x] **Define legal content types**
  - [x] Create `LegalContentType` and `LegalPreset` types
  - [x] Add `DefaultLegalContent` interface matching ContentData structure
  - [x] Include proper frontmatter types for legal pages
  - [x] Success: Type definitions added

#### Update exports
- [x] **Export from ui-core**
  - [x] Add exports to `/packages/ui-core/src/content/index.ts`
  - [x] Update main ui-core index.ts exports
  - [x] Add JSDoc documentation for the helper function
  - [x] Test import from external package
  - [x] Success: Framework-agnostic legal fallback content available

### Task 9: Remove presetContent.ts Dependency from Template

#### Audit remaining usage
- [x] **Search for remaining presetContent.ts dependencies**
  - [x] Use grep/search to find `getPresetContent` imports in `/templates/nextjs/src/`
  - [x] Check if any other files depend on presetContent.ts functions
  - [x] Verify content.ts (getContentBySlug) is still needed for other content
  - [x] Success: Complete audit of presetContent.ts usage

#### Update remaining legal pages
- [x] **Update other legal pages (privacy, terms, cookies) if needed**
  - [x] Apply same changes as done to /legal page in Task 6
  - [x] Replace getPresetContent calls with nextjsContentProvider.loadContent
  - [x] Add token interpolation support
  - [x] Test each page works correctly
  - [x] Success: All legal pages use new system

#### Clean up unused code
- [x] **Remove presetContent.ts if no longer needed**
  - [x] Delete `/templates/nextjs/src/lib/presetContent.ts`
  - [x] Remove any presetContent-specific dependencies from package.json
  - [x] Update any remaining imports that referenced presetContent
  - [x] Run build to verify no broken references
  - [x] Success: presetContent.ts removed cleanly, no broken imports

## Phase 3: Testing & Finalization

### Task 10: Test All Legal Pages Work with New System

#### Test individual legal pages
- [x] **Verify each legal page loads correctly**
  - [x] Navigate to `/legal` and verify content loads with tokens replaced
  - [x] Navigate to `/privacy` and verify nextjsContentProvider works
  - [x] Navigate to `/terms` and verify nextjsContentProvider works
  - [x] Navigate to `/cookies` and verify nextjsContentProvider works
  - [x] Success: All legal pages load correctly

#### Verify token interpolation
- [x] **Check token replacement across all pages**
  - [x] Verify `{{site.url}}` shows correct site URL
  - [x] Verify `{{copyright.holder}}` shows correct owner name
  - [x] Verify `{{contacts.primaryEmail}}` shows correct email
  - [x] Check `{{copyright.lastUpdated}}` shows current year
  - [x] Success: All tokens interpolated correctly on all pages

#### Test error scenarios
- [x] **Verify error handling and fallbacks**
  - [x] Test behavior when legal content files are missing
  - [x] Test when token interpolation fails (graceful degradation)
  - [x] Verify fallback content from getDefaultLegalContent works
  - [x] Test both MIT and full legal presets if applicable
  - [x] Success: Error handling works, fallbacks function properly

### Task 11: Build and Commit Legal Migration

#### Run comprehensive build
- [x] **Execute full project build**
  - [x] Run `pnpm build` from project root
  - [x] Verify ui-core package builds successfully
  - [x] Verify ui-adapters/nextjs package builds successfully
  - [x] Verify templates/nextjs builds successfully
  - [x] Success: All packages build without errors

#### Fix any issues
- [x] **Resolve build problems if any**
  - [x] Fix TypeScript compilation errors
  - [x] Resolve missing imports or exports
  - [x] Address linting issues
  - [x] Update dependencies if needed
  - [x] Success: Clean build with no errors or warnings

#### Create git commit
- [x] **Commit all changes**
  - [x] Stage changes: `git add .`
  - [x] Create detailed commit message:
    ```
    feat: implement token interpolation system and migrate legal content
    
    - Add token interpolation interfaces to ui-core
    - Implement NextjsTokenProvider in ui-adapters-nextjs
    - Migrate legal content from template to ui-adapters
    - Update legal pages to use nextjsContentProvider with tokens
    - Remove presetContent.ts dependency
    
    🤖 Generated with [Claude Code](https://claude.ai/code)
    
    Co-Authored-By: Claude <noreply@anthropic.com>
    ```
  - [x] Reference feature document: project-artifacts/nextjs-template/features/03-feature-token-and-legal.md
  - [x] Success: Comprehensive commit created with clear message

### Task 12: Update Documentation and Examples

#### Update package documentation
- [x] **Add token system docs to ui-adapters README**
  - [x] Document NextjsTokenProvider usage in `/packages/ui-adapters/nextjs/README.md`
  - [x] Include examples of token interpolation
  - [x] List supported token types (site.*, author.*, etc.)
  - [x] Add migration guide for other frameworks
  - [x] Success: Package documentation updated

#### Update template documentation
- [x] **Document new system in template**
  - [x] Update `/templates/nextjs/examples/migration-guide.md` with token examples
  - [x] Document how to customize legal content
  - [x] Show framework-agnostic legal content usage patterns
  - [x] Success: Template documentation comprehensive

#### Create usage examples
- [x] **Add practical examples**
  - [x] Add token interpolation examples to `/templates/nextjs/examples/content-loading-examples.tsx`
  - [x] Show nextjsContentProvider usage with tokens
  - [x] Demonstrate legal content loading patterns
  - [x] Include error handling examples
  - [x] Success: Comprehensive usage examples created

#### Final documentation review
- [x] **Verify documentation completeness**
  - [x] Check all new APIs are documented
  - [x] Ensure examples work as written
  - [x] Verify migration instructions are clear
  - [x] Test documentation with fresh perspective
  - [x] Success: Complete documentation for token system and legal content migration

---

## Notes for Junior AI Implementation

**Key Technical Constraints:**
- Framework-agnostic: NO Next.js, Astro, Vite dependencies in ui-core or shared code
- React, ShadCN, Tailwind, Radix are ALLOWED as UI-layer dependencies
- All token parameters must be optional to maintain backward compatibility
- Use consistent error handling and fallback patterns throughout

**Testing Strategy:**
- Test token interpolation with real legal content files
- Verify backward compatibility - existing content loading must work unchanged
- Test both MIT and full legal presets
- Ensure graceful degradation when token interpolation fails

**File Locations Reference:**
- ui-core content types: `/packages/ui-core/src/content/`
- NextJS content provider: `/packages/ui-adapters/nextjs/src/content/`
- Legal content migration: From `/templates/nextjs/src/content/` to ui-adapters
- Template legal pages: `/templates/nextjs/src/app/{legal,privacy,terms,cookies}/page.tsx`

**Success Criteria:**
- All builds pass without errors
- Legal pages work identically to before but use new system  
- Token interpolation produces same results as presetContent.ts
- Framework-agnostic legal content available from ui-core
- Comprehensive documentation and examples provided