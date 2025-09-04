---
layer: project
docType: tasks
project: manta-templates
feature: sync-template-fixes
status: in-progress
dateUpdated: 2025-09-04
effort: 3
dependencies: []
lldReference: impromptu-fix
---

# Task Breakdown: Sync-Template Script Modernization

## Context Summary

The `scripts/sync-template.js` script has critical issues that prevent it from working with the current template architecture:

1. **Legacy Structure**: Creates `lib/` instead of `src/lib/` directory structure
2. **Missing Electron Support**: No handling for `templates/electron` 
3. **NextJS Hard-coding**: Assumes NextJS-specific paths that don't exist in React/Electron
4. **Content Overwrite Risk**: Destructively overwrites customized content
5. **Template-specific Configuration**: Lacks awareness of different template requirements

**Current Template Structure:**
- ✅ `templates/nextjs/src/lib/` (correct)
- ✅ `templates/react/src/lib/` (correct) 
- ✅ `templates/electron/src/lib/` (correct)
- ❌ Script creates `templates/{name}/lib/` (wrong)

## Tasks

### Task 1: Fix Directory Structure (Effort: 2)
- ✓ **Task 1.1: Update target directory path**
  - Change `path.join(templateDir, 'lib')` to `path.join(templateDir, 'src', 'lib')`
  - Update all references to `libDir` to point to `src/lib`
  - **Success:** Script creates `src/lib/` instead of root `lib/`

- ✓ **Task 1.2: Update TypeScript configuration paths**
  - Change tsconfig path mapping from `"@/lib/*": ["./lib/*"]` to `"@/lib/*": ["./src/lib/*"]`
  - **Success:** TypeScript can resolve imports correctly from src/lib

- [in-progress] **Task 1.3: Update ESLint configuration**
  - Change ignore pattern from `"lib/**/*"` to `"src/lib/**/*"`
  - **Success:** ESLint ignores the correct directory

### Task 2: Remove NextJS Hard-coding (Effort: 2)
- ✓ **Task 2.1: Make CSS path detection dynamic**
  - Replace hardcoded `src/app/globals.css` with template-specific detection
  - Support React's `src/index.css`, NextJS `app/globals.css`, Electron `src/index.css`
  - **Success:** CSS updates work for all template types

- [in-progress] **Task 2.2: Create template-specific path mapping**
  - Add function to determine correct CSS file path per template
  - Add function to determine correct import paths per template
  - **Success:** All templates get appropriate path updates

### Task 3: Add Electron Template Support (Effort: 3)
- [ ] **Task 3.1: Create electron-specific configuration**
  - Add conditional logic for `templateName === 'electron'`
  - Handle electron's unique build structure (main/renderer/preload)
  - **Success:** Script recognizes electron as valid template

- [ ] **Task 3.2: Update CSS import handling for electron**
  - Add electron-specific CSS import path updates
  - Handle electron's `src/index.css` instead of NextJS `app/globals.css`
  - **Success:** CSS imports work correctly in electron template

- [ ] **Task 3.3: Handle electron-specific dependencies**
  - Ensure electron-specific packages remain in package.json
  - Add electron build tool compatibility checks
  - **Success:** Electron template remains functional after sync

### Task 4: Implement Safe Content Handling (Effort: 3)
- [ ] **Task 4.1: Add content backup mechanism**
  - Create backup of existing content before overwrite
  - Store backup with timestamp for rollback capability
  - **Success:** User can recover overwritten customizations

- [ ] **Task 4.2: Implement selective content merge**
  - Only overwrite files that exist in source packages
  - Preserve custom files not present in packages
  - Add flag for force-overwrite behavior when desired
  - **Success:** Custom content preserved during sync

- [ ] **Task 4.3: Add content diff reporting**
  - Show what files will be overwritten before sync
  - Provide summary of changes made after sync
  - **Success:** User has visibility into sync operations

### Task 5: Add Template Detection and Validation (Effort: 2)
- [ ] **Task 5.1: Implement template structure validation**
  - Check that target template has expected directory structure
  - Validate required files exist before proceeding
  - **Success:** Script fails gracefully with helpful errors for invalid templates

- [ ] **Task 5.2: Add supported template registry**
  - Create list of officially supported templates (nextjs, react, electron)
  - Add validation against this registry
  - Add help text showing available templates
  - **Success:** Clear error messages for unsupported templates

### Task 6: Testing and Verification (Effort: 2)
- [ ] **Task 6.1: Test sync with React template**
  - Run updated script on clean React template copy
  - Verify correct `src/lib/` structure created
  - Verify builds work correctly after sync
  - **Success:** React template syncs and builds successfully

- [ ] **Task 6.2: Test sync with Electron template**
  - Run updated script on clean Electron template copy  
  - Verify electron-specific configurations work
  - Verify electron builds work correctly after sync
  - **Success:** Electron template syncs and builds successfully

- [ ] **Task 6.3: Test sync with NextJS template (regression)**
  - Ensure NextJS template still works with changes
  - Verify no regressions in existing functionality
  - **Success:** NextJS template continues to work as before

### Task 7: Documentation and Usage Updates (Effort: 1)
- [ ] **Task 7.1: Update script help documentation**
  - Add list of supported templates to usage text
  - Document new flags and options
  - Add examples for each template type
  - **Success:** Help text is comprehensive and accurate

- [ ] **Task 7.2: Update package.json scripts**
  - Verify build-ui script works with updated sync-template
  - Add template-specific sync scripts if needed
  - **Success:** Package.json scripts work correctly with updated script

## Success Criteria

- [ ] **All templates sync correctly**: NextJS, React, and Electron templates can all be synced successfully
- [ ] **Correct directory structure**: All templates use `src/lib/` structure after sync
- [ ] **No functionality regressions**: All templates build and run correctly after sync
- [ ] **Safe content handling**: Custom content is preserved or backed up during sync
- [ ] **Clear error handling**: Script provides helpful error messages for invalid inputs
- [ ] **Updated documentation**: Usage instructions are current and complete

## Notes

- **CRITICAL**: Do not run existing sync-template script until fixes are complete
- Test on copies of templates, not production versions
- Ensure all template builds pass after sync operations
- Consider creating sync-template-test.js for validation during development