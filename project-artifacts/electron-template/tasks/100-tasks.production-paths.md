---
layer: project
docType: tasks
sliceIndex: 100
sliceName: production-paths
project: manta-templates
template: electron
lldReference: project-artifacts/electron-template/slices/100-slice.production-paths.md
dependencies: []
projectState: in-progress
---

# Tasks: Slice 100 - Electron Production Paths

## Context Summary

This task file implements the app:// protocol solution to fix file path resolution in production Electron builds. Currently, production builds use file:// protocol which breaks all root-absolute URLs for assets, routing, and API calls. The solution creates a custom app:// protocol that provides web-standard URL behavior in production while maintaining localhost dev workflow.

**Key Technical Points:**
- Custom protocol registration with security privileges
- Protocol handler maps app:// URLs to packaged resources
- Environment-aware URL loading (localhost dev, app:// prod)
- Zero changes needed for renderer/React code
- Maintains Electron security best practices

**Success Criteria:**
- Production apps load via app:// protocol
- All assets load correctly in packaged builds
- BrowserRouter works without hash routing
- Development workflow remains unchanged

## Tasks

### Phase 1: Protocol Handler Implementation

- [x] **Task 1.1: Create Protocol Handler Module**
  - **Effort**: 2
  - **Description**: Create new `src/main/protocol-handler.ts` file with protocol registration and handler functions
  - **Details**:
    - Create file at `templates/electron/src/main/protocol-handler.ts`
    - Import required Electron modules: `protocol` from 'electron', `path` from 'node:path'
    - Implement `registerAppProtocol()` function that calls `protocol.registerSchemesAsPrivileged()` with app scheme configuration
    - Configure privileges: `standard: true`, `secure: true`, `supportFetchAPI: true`, `corsEnabled: true`
    - Add JSDoc comments explaining when this must be called (before app.whenReady())
  - **Success Criteria**:
    - File exists at correct location
    - Function is properly typed with TypeScript
    - JSDoc documentation is clear and complete
    - No TypeScript errors
  - **References**: Design lines 46-61

- [x] **Task 1.2: Implement Protocol File Handler**
  - **Effort**: 3
  - **Description**: Implement `setupAppProtocolHandler()` function with secure file serving logic
  - **Details**:
    - Add function to `src/main/protocol-handler.ts`
    - Use `protocol.registerFileProtocol('app', handler)` to register handler
    - Parse request URL using `new URL(request.url)` and extract pathname
    - Decode pathname with `decodeURIComponent()`
    - Calculate root path: `path.join(process.resourcesPath, 'renderer')`
    - Resolve full file path: `path.normalize(path.join(root, pathname || '/index.html'))`
    - Implement path traversal security check: verify resolved path starts with root
    - Return `{ error: -6 }` (ERR_FILE_NOT_FOUND) for security violations
    - Return `{ path: resolved }` for valid requests
    - Add JSDoc explaining security considerations
  - **Success Criteria**:
    - Function properly handles URL parsing and path resolution
    - Security check prevents directory traversal attacks
    - Default to index.html for root requests
    - Error handling is correct
    - Code passes TypeScript strict checks
  - **References**: Design lines 63-79

- [x] **Task 1.3: Add Protocol Handler Tests**
  - **Effort**: 2
  - **Description**: Create unit tests for protocol handler path resolution and security
  - **Details**:
    - Create test file at `templates/electron/src/main/__tests__/protocol-handler.test.ts`
    - Test valid path resolution: `/images/logo.png` → correct full path
    - Test root path: `/` → resolves to index.html
    - Test path traversal attacks: `/../../../etc/passwd` → returns error
    - Test URL encoding: `/images/my%20file.png` → properly decoded
    - Test invalid schemes and malformed URLs
    - Mock `process.resourcesPath` for consistent test results
  - **Success Criteria**:
    - All test cases pass
    - Security cases properly validated
    - Tests can run in CI environment
    - Code coverage includes all branches
  - **References**: Design lines 208-209

### Phase 2: Main Process Integration

- [x] **Task 2.1: Import Protocol Handler in Main Process**
  - **Effort**: 1
  - **Description**: Add protocol handler imports to main.ts
  - **Details**:
    - Open `templates/electron/src/main/main.ts`
    - Add import statement: `import { registerAppProtocol, setupAppProtocolHandler } from './protocol-handler'`
    - Place import with other Electron-related imports at top of file
    - Verify import path is correct relative to main.ts location
  - **Success Criteria**:
    - Import statement added
    - No TypeScript import errors
    - Module resolves correctly
  - **References**: Design line 85

- [x] **Task 2.2: Register Protocol Before App Ready**
  - **Effort**: 1
  - **Description**: Call registerAppProtocol() before app.whenReady()
  - **Details**:
    - Locate the call to `app.whenReady()` in main.ts
    - Add `registerAppProtocol()` call immediately before app.whenReady()
    - Add comment explaining timing requirement: "Must register custom protocol before app is ready"
    - Ensure call is at module level, not inside any function
  - **Success Criteria**:
    - Function called at correct point in app lifecycle
    - Comment explains why timing matters
    - No runtime errors on app startup
  - **References**: Design lines 87-88

- [x] **Task 2.3: Setup Protocol Handler After App Ready**
  - **Effort**: 1
  - **Description**: Call setupAppProtocolHandler() in app.whenReady() callback
  - **Details**:
    - Add `setupAppProtocolHandler()` call inside the app.whenReady().then() block
    - Place call before `createWindow()` invocation
    - Add comment: "Register app:// protocol handler for production builds"
  - **Success Criteria**:
    - Handler setup occurs after app is ready
    - Handler setup occurs before window creation
    - No runtime errors
  - **References**: Design lines 90-93

- [x] **Task 2.4: Implement Environment-Aware URL Loading**
  - **Effort**: 2
  - **Description**: Update createWindow() to load app:// in production, localhost in development
  - **Details**:
    - Locate `createWindow()` function in main.ts
    - Find existing `mainWindow.loadURL()` call
    - Replace with conditional logic:
      ```typescript
      if (process.env.NODE_ENV === 'production') {
        mainWindow.loadURL('app://index.html');
      } else {
        mainWindow.loadURL('http://localhost:5173');
      }
      ```
    - Add comment explaining the environment-specific behavior
    - Ensure NODE_ENV is properly set in both dev and prod builds
  - **Success Criteria**:
    - Development continues using localhost:5173
    - Production uses app://index.html
    - Logic is clear and maintainable
    - No TypeScript errors
  - **References**: Design lines 95-107

### Phase 3: Build Configuration

- [x] **Task 3.1: Update Vite Build Output Configuration**
  - **Effort**: 2
  - **Description**: Configure Vite to output renderer files to correct location
  - **Details**:
    - Open `templates/electron/electron.vite.config.ts`
    - Locate the renderer build configuration section
    - Ensure `build.outDir` is set to `../dist-electron/renderer`
    - Verify `build.rollupOptions.output.format` is set to `'es'`
    - Add comment explaining why renderer goes to this specific directory
    - Verify configuration is TypeScript-typed correctly
  - **Success Criteria**:
    - Vite config updated
    - Build outputs to correct directory structure
    - No build errors
    - TypeScript validates config
  - **References**: Design lines 112-123

- [x] **Task 3.2: Configure Electron Builder File Packaging**
  - **Effort**: 2
  - **Description**: Update package.json build configuration to include renderer files
  - **Details**:
    - Open `templates/electron/package.json`
    - Locate or create `build.files` array in electron-builder config
    - Add entries:
      - `"dist-electron/main/**"` (main process files)
      - `"dist-electron/preload/**"` (preload scripts)
      - `{ "from": "dist-electron/renderer", "to": "renderer" }` (renderer files)
    - Verify JSON syntax is valid
    - Add comment in package.json explaining the file mapping
  - **Success Criteria**:
    - package.json has correct build.files configuration
    - Files property follows electron-builder schema
    - JSON is valid
    - Build includes all necessary files
  - **References**: Design lines 128-136

- [x] **Task 3.3: Configure Asset Packaging**
  - **Effort**: 2
  - **Description**: Ensure static assets are packaged correctly as extra resources
  - **Details**:
    - In `templates/electron/package.json` build config
    - Locate or create `build.extraResources` array
    - Add asset mapping: `{ "from": "src/assets", "to": "renderer/assets" }`
    - Verify that Vite config includes assets in build output
    - Check that public assets (if any) are also included
    - Test that resourcesPath correctly resolves to these assets
  - **Success Criteria**:
    - Assets are copied to correct location in package
    - Protocol handler can access assets via resourcesPath
    - Images and other static assets load in packaged app
  - **References**: Design lines 137-144

- [x] **Task 3.4: Verify Build Script Configuration**
  - **Effort**: 1
  - **Description**: Ensure package.json build scripts are properly configured
  - **Details**:
    - Check `package.json` has all required build scripts
    - Verify `"build"` script includes both Vite and Electron builds
    - Verify `"package"` or `"dist"` script uses electron-builder
    - Check that build:electron script exists and runs tsc for main process
    - Ensure scripts run in correct order (vite build → electron build → package)
  - **Success Criteria**:
    - All build scripts present and functional
    - Scripts can be run via pnpm
    - Build order is correct
    - No script errors

### Phase 4: Testing and Validation

- [ ] **Task 4.1: Manual Test - Development Build**
  - **Effort**: 1
  - **Description**: Verify development build continues working with localhost
  - **Details**:
    - Run `pnpm dev` in templates/electron
    - Verify app opens and loads from http://localhost:5173
    - Check that hot reload still works
    - Verify all assets load correctly
    - Test navigation and routing
    - Confirm no console errors related to protocol
  - **Success Criteria**:
    - Dev server starts successfully
    - App loads without errors
    - Hot reload functions normally
    - No regressions in dev workflow
  - **References**: Design lines 200-204

- [ ] **Task 4.2: Manual Test - Production Build Asset Loading**
  - **Effort**: 2
  - **Description**: Build and test packaged app asset loading
  - **Details**:
    - Run `pnpm build` to build the application
    - Run `pnpm package` or equivalent to create packaged app
    - Install/run the packaged application
    - Verify app loads with app:// protocol (check dev tools)
    - Test that all static assets load (images, fonts, etc.)
    - Check that CSS and JavaScript bundles load correctly
    - Verify markdown content with images renders properly
    - Test asset loading from different routes
  - **Success Criteria**:
    - Packaged app launches successfully
    - Console shows app:// URLs being loaded
    - All assets render correctly
    - No 404 or failed resource loads
  - **References**: Design lines 200-204

- [ ] **Task 4.3: Manual Test - Routing and Deep Links**
  - **Effort**: 2
  - **Description**: Verify BrowserRouter navigation works in production
  - **Details**:
    - Using packaged app from Task 4.2
    - Test client-side navigation between routes
    - Use browser back/forward buttons
    - Close and restart app on a deep link route (if applicable)
    - Verify no hash (#) appears in URLs
    - Test that direct navigation to routes works
    - Verify routing state persists across navigation
  - **Success Criteria**:
    - All routes accessible via navigation
    - Browser history works correctly
    - Deep links function properly
    - No hash router fallback needed
  - **References**: Design lines 182-188, 200-204

- [ ] **Task 4.4: Security Test - Path Traversal Prevention**
  - **Effort**: 2
  - **Description**: Test that protocol handler prevents directory traversal attacks
  - **Details**:
    - Create test that attempts to access files outside renderer directory
    - Test URLs like `app://../../../etc/passwd`
    - Test encoded traversal attempts: `app://%2e%2e%2f%2e%2e%2f`
    - Test mixed separators (if on Windows): `app://..\\..\\`
    - Verify all attempts return ERR_FILE_NOT_FOUND
    - Check that legitimate nested paths still work: `app://assets/images/logo.png`
    - Add these tests to automated test suite if not already present
  - **Success Criteria**:
    - All traversal attempts are blocked
    - Proper error codes returned
    - Legitimate paths still accessible
    - No security warnings in logs
  - **References**: Design lines 168-171, 208-209

- [ ] **Task 4.5: Integration Test - Build Process Verification**
  - **Effort**: 2
  - **Description**: Verify complete build process creates correct package structure
  - **Details**:
    - Run full build: `pnpm build && pnpm package`
    - Inspect packaged app directory structure
    - Verify presence of: dist-electron/main, dist-electron/preload, dist-electron/renderer
    - Check that renderer directory contains index.html and assets
    - Verify resourcesPath/renderer exists in installed app
    - Confirm main process files are in correct location
    - Check that no development files are included in package
  - **Success Criteria**:
    - Package structure matches design specification
    - All required files present
    - No extraneous development files
    - Package size is reasonable
  - **References**: Design lines 149-161

### Phase 5: Documentation

- [ ] **Task 5.1: Update Electron Template README**
  - **Effort**: 2
  - **Description**: Document the app:// protocol implementation in template README
  - **Details**:
    - Open `templates/electron/README.md`
    - Add section explaining app:// protocol under "Architecture" or "Production Builds"
    - Explain why app:// is used instead of file://
    - Document the difference between dev (localhost) and prod (app://) loading
    - Note that no changes are needed in React/renderer code
    - Explain that root-absolute URLs work correctly in production
    - Add note about security features (path traversal prevention)
  - **Success Criteria**:
    - README has clear protocol explanation
    - Developers understand dev vs prod behavior
    - Security features documented
    - Markdown formatting correct
  - **References**: Design lines 246-250

- [ ] **Task 5.2: Add Build Process Documentation**
  - **Effort**: 2
  - **Description**: Document the build configuration and packaging process
  - **Details**:
    - Update README or create BUILDING.md in templates/electron/
    - Document required build scripts and their purpose
    - Explain electron.vite.config.ts renderer output directory
    - Document package.json build.files and extraResources configuration
    - Add troubleshooting section for common build issues
    - Include steps to verify packaged app structure
    - Explain how to test production builds locally
  - **Success Criteria**:
    - Build process fully documented
    - Configuration files explained
    - Troubleshooting guide included
    - Clear instructions for testing
  - **References**: Design line 250

- [ ] **Task 5.3: Create Asset Loading Troubleshooting Guide**
  - **Effort**: 2
  - **Description**: Document common asset loading issues and solutions
  - **Details**:
    - Create or update troubleshooting section in README
    - Document what to do if assets don't load in production
    - Explain how to check protocol handler registration
    - Add instructions for inspecting app:// URLs in DevTools
    - Document resourcesPath and how to verify asset packaging
    - Include checklist for debugging asset issues
    - Add examples of correct asset paths in code
  - **Success Criteria**:
    - Comprehensive troubleshooting guide created
    - Common issues and solutions documented
    - Debug instructions clear and actionable
    - Examples included
  - **References**: Design line 248

- [ ] **Task 5.4: Document CSP Requirements (if needed)**
  - **Effort**: 1
  - **Description**: Add documentation for Content Security Policy updates
  - **Details**:
    - Test if app requires CSP updates for app:// protocol
    - If CSP is configured, document necessary changes
    - Add example CSP configuration that works with app://
    - Document where CSP is configured (meta tag vs headers)
    - Note any security implications of CSP changes
    - Skip this task if no CSP updates are needed
  - **Success Criteria**:
    - CSP requirements identified and documented (or marked N/A)
    - Example configuration provided if applicable
    - Security implications explained
  - **References**: Design line 249

### Phase 6: Final Validation

- [ ] **Task 6.1: Run Full Test Suite**
  - **Effort**: 1
  - **Description**: Execute complete test suite to ensure no regressions
  - **Details**:
    - Run `pnpm test` for all unit and integration tests
    - Verify protocol handler tests pass
    - Check that existing renderer tests still pass
    - Ensure TypeScript compilation succeeds with no errors
    - Run linter to check code quality
    - Verify no new warnings introduced
  - **Success Criteria**:
    - All tests pass
    - No TypeScript errors
    - No linting errors
    - No new warnings
  - **References**: Design lines 198-209

- [ ] **Task 6.2: Cross-Platform Build Verification**
  - **Effort**: 3
  - **Description**: Test builds on multiple platforms (macOS, Windows, Linux)
  - **Details**:
    - Build packaged app for current platform
    - If possible, test on additional platforms or use CI
    - Verify app:// protocol works on each platform
    - Check that asset loading works consistently
    - Test path resolution on different OSes
    - Verify no platform-specific issues with path separators
    - Document any platform-specific considerations
  - **Success Criteria**:
    - App builds successfully on target platforms
    - Protocol works consistently across platforms
    - No platform-specific path issues
    - Platform notes documented if needed
  - **References**: Design lines 200-204

- [ ] **Task 6.3: Verify All Success Criteria Met**
  - **Effort**: 1
  - **Description**: Check off all items in slice design success criteria
  - **Details**:
    - Review success criteria from slice design (lines 229-238)
    - Verify production app loads with app:// protocol
    - Confirm all static assets load in packaged app
    - Verify BrowserRouter navigation works without hash
    - Test markdown content displays images properly
    - Verify deep links work on app startup
    - Confirm development workflow unchanged
    - Check build process creates proper package structure
    - Validate path traversal attacks prevented
    - Update slice document with completion checkmarks
  - **Success Criteria**:
    - All slice success criteria verified
    - Each criterion tested and confirmed
    - Slice design document updated
    - No outstanding issues
  - **References**: Design lines 229-238

- [ ] **Task 6.4: Update Slice Status to Complete**
  - **Effort**: 1
  - **Description**: Mark slice as complete in project tracking
  - **Details**:
    - Update slice document YAML front matter to mark as complete
    - Update project-artifacts/electron-template/tasks/100-tasks.production-paths.md to mark projectState as complete
    - Check off slice in main project slice plan (03-slices.manta-templates.md)
    - Add completion date and any final notes
    - Commit all changes with clear commit message
    - Tag release if applicable
  - **Success Criteria**:
    - All project documents updated
    - Slice marked complete in tracking
    - Changes committed
    - Project state reflects completion

## Notes

- **Testing Strategy**: Focus on manual testing for initial implementation, then add automated tests for regression prevention
- **Rollback Plan**: If issues arise, revert main.ts changes and fall back to file:// with HashRouter
- **Performance**: Protocol handler adds minimal overhead; path resolution is simple and fast
- **Security**: Path traversal protection is critical - pay special attention to Task 1.2 and 4.4
- **Compatibility**: No breaking changes for existing renderer code or content

## Effort Summary

Total estimated effort: 38 units across 28 tasks
- Phase 1 (Protocol Handler): 7 units
- Phase 2 (Main Integration): 5 units
- Phase 3 (Build Config): 7 units
- Phase 4 (Testing): 9 units
- Phase 5 (Documentation): 7 units
- Phase 6 (Final Validation): 6 units

This is a foundational slice that enables all future Electron template features to work correctly in production builds.