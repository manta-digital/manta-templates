# Testing Guide - Server Component Pattern Validation

## Overview

This document describes the testing setup for validating the **Server Page + Client Cards** pattern used in the Next.js template. The tests ensure that our server-side content loading and ui-core component integration works correctly across server/client boundaries.

## Test Architecture

We've migrated from custom Node.js assertion tests to a standard Jest + React Testing Library setup while preserving all existing test functionality.

### Migration Summary

- **Before**: Custom assertions in `packages/ui-core/src/__tests__/`
- **After**: Jest-based tests in `templates/nextjs/src/__tests__/`
- **Preserved**: All existing test functionality ported to Jest
- **Added**: Server component pattern validation tests

## Test Structure

### Core Test Files

1. **`content-loading.test.ts`** - Server-side content loading validation
2. **`server-component-pattern.test.tsx`** - UI component object spreading tests
3. **`server-client-boundaries.test.tsx`** - Server/client boundary validation
4. **`build-validation.test.ts`** - TypeScript and build process validation

### Configuration Files

- **`jest.config.js`** - Jest configuration with Next.js integration
- **`jest.setup.js`** - Global test setup and mocks
- **`package.json`** - Test scripts and dependencies

## Running Tests

### All Tests
```bash
pnpm test
```

### Watch Mode (Development)
```bash
pnpm test:watch
```

### CI Mode (Coverage + No Watch)
```bash
pnpm test:ci
```

### Server Component Tests Only
```bash
pnpm test:server-components
```

### Individual Test Files
```bash
# Content loading tests
pnpm test content-loading.test.ts

# Server component pattern tests  
pnpm test server-component-pattern.test.tsx

# Server/client boundary tests
pnpm test server-client-boundaries.test.tsx

# Build validation tests
pnpm test build-validation.test.ts
```

## Test Coverage Areas

### 1. Server Content Loading (`content-loading.test.ts`)

Tests the server-side content loading functions used in the server component pattern:

- ✅ Schema-based loading functions (`getArticleBySlug`, `getProjectBySlug`, etc.)
- ✅ Content validation with Zod schemas  
- ✅ Error handling and development-friendly messages
- ✅ Bulk content loading (`getAllArticles`, `getAllProjects`, etc.)
- ✅ Content structure suitable for object spreading
- ✅ Performance and caching behavior

**Key Pattern Tested:**
```typescript
// Server component content loading
const content = await loadExampleContent();
return <ProjectCard {...content.project} />;
```

### 2. Server Component Pattern (`server-component-pattern.test.tsx`) 

Tests ui-core components with server-loaded content via object spreading:

- ✅ ProjectCard with object spread content
- ✅ QuoteCard with server-loaded props
- ✅ BlogCardImage with server-loaded props  
- ✅ Type safety across server/client boundaries
- ✅ Next.js Image and Link component integration
- ✅ Error handling and fallback behavior

**Key Pattern Tested:**
```typescript
// Object spreading from server to client
<BlogCardImage {...serverLoadedContent} />
<ProjectCard content={serverLoadedProject} />
<QuoteCard {...serverLoadedQuote} />
```

### 3. Server/Client Boundaries (`server-client-boundaries.test.tsx`)

Tests the proper separation and interaction between server and client components:

- ✅ Server component content loading without client hooks
- ✅ Client component interactivity (framer-motion, theme context)
- ✅ Prop serialization across boundaries
- ✅ Component directive usage (`'use client'`)
- ✅ Build compatibility and hydration
- ✅ Performance implications and bundle analysis

**Key Pattern Tested:**
```typescript
// Server component (no 'use client')
export default async function ServerPage() {
  const content = await loadContent();
  return <BlogCardImage {...content} />; // Client component
}
```

### 4. Build Validation (`build-validation.test.ts`)

Tests TypeScript compilation and Next.js build compatibility:

- ✅ TypeScript compilation with server component patterns
- ✅ Type inference for object spreading
- ✅ Next.js static generation support
- ✅ Bundle optimization and code splitting
- ✅ Environment compatibility (dev vs prod)
- ✅ Monorepo package integration

## Mock Configuration

### Next.js Mocks
```javascript
// jest.setup.js
jest.mock('next/image', () => ({ ... }));
jest.mock('next/link', () => ({ ... }));
jest.mock('next/router', () => ({ ... }));
```

### Framer Motion Mocks
```javascript
// For server component testing
jest.mock('framer-motion', () => ({
  motion: { div: 'div', span: 'span' }
}));
```

## Test Data Patterns

### Server Content Loading
```typescript
const mockServerContent = {
  title: "Server-loaded Title",
  description: "Server-loaded Description", 
  techStack: ["React", "Next.js"],
  coverImageUrl: "/server-image.jpg"
};
```

### Object Spreading Validation
```typescript
// Test that server content can be spread into components
render(<ProjectCard {...mockServerContent} />);
expect(screen.getByText("Server-loaded Title")).toBeInTheDocument();
```

## Error Testing Patterns

### Content Loading Errors
```typescript
await expect(getArticleBySlug('nonexistent')).rejects.toThrow(/Content validation failed/);
```

### Component Error Boundaries
```typescript
// BlogCardImage returns null for missing required props
const { container } = render(<BlogCardImage />);
expect(container.firstChild).toBeNull();
```

## Development Workflow

### Adding New Tests

1. **Content Loading**: Add tests to `content-loading.test.ts`
2. **Component Integration**: Add tests to `server-component-pattern.test.tsx`
3. **Server/Client Boundaries**: Add tests to `server-client-boundaries.test.tsx`
4. **Build Issues**: Add tests to `build-validation.test.ts`

### Test-Driven Development

1. Write failing tests for new server component patterns
2. Implement server content loading functions
3. Create/update ui-core components for object spreading
4. Validate server/client boundaries
5. Ensure TypeScript compilation and build success

### Debugging Tests

```bash
# Debug specific test with verbose output
pnpm test -- --verbose content-loading.test.ts

# Debug with coverage
pnpm test:ci

# Debug server component patterns specifically
pnpm test:server-components
```

## Integration with Task 3.3

This test suite validates the success criteria for **Task 3.3: Create Validation Tests for Server Component Pattern**:

- ✅ Server content loading functions work correctly
- ✅ All ui-core cards render properly with server-loaded content  
- ✅ TypeScript compilation succeeds for server/client pattern
- ✅ Next.js build generates static pages successfully
- ✅ Object spreading pattern works for all card types
- ✅ Mixed server/client components work without serialization errors

## Future Enhancements

### Planned Test Additions
- Visual regression tests for card components
- Performance benchmarks for content loading
- End-to-end tests for complete page rendering
- Accessibility tests for server-rendered content

### Test Automation
- Pre-commit hooks running server component tests
- CI pipeline validation for build compatibility
- Automated test generation for new content types

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**: Check workspace package resolution
2. **Framer Motion errors**: Ensure mocks are properly configured  
3. **Server/client boundary errors**: Validate component directives
4. **Type errors**: Check object spreading type compatibility

### Debug Commands
```bash
# Check Jest configuration
pnpm test --showConfig

# Debug specific test file
pnpm test -- --no-cache content-loading.test.ts

# Verbose test output
pnpm test -- --verbose
```