# Project Guidelines for Claude

## General Development Rules

### Meta-Guide: Guide to the rules
- If the first item in a list or sublist is in this file `enabled: false`, ignore that section.

### Project Structure
- Always refer to `guide.ai-project.000-process` and follow links as appropriate.
- For UI/UX tasks, always refer to `guide.ui-development.ai`.
- General Project guidance is in `project-documents/ai-project-guide/project-guides/`.
- Relevant 3rd party tool information is in `project-documents/ai-project-guide/tool-guides/`.

#### Project-Specific File Locations
- **Regular Development** (template instances): Use `project-documents/private/` for all project-specific files.
- **Monorepo Template Development** (monorepo active): Use `project-artifacts/` for project-specific files (use directly, e.g. `project-artifacts/` not `project-artifacts/private/`).
- **DEPRECATED**: `{template}/examples/our-project/` is no longer used - migrate to `project-artifacts/` for monorepo work.

### General Guidelines (IMPORTANT)
- Filenames for project documents may use ` ` or `-` separators. Ignore case in all filenames, titles, and non-code content.  Reference `file-naming-conventions`.
- Use checklist format for all task files.  Each item and subitem should have a `[ ]` "checkbox".
- After completing a task or subtask, make sure it is checked off in the appropriate file(s).  Use the task-check subagent if available.
- Keep 'success summaries' concise and minimal -- they burn a lot of output tokens.
- **Preserve User-Provided Concept sections** - When editing project documents (concept, spec, feature, architecture, slice designs), NEVER modify or remove sections titled "## User-Provided Concept". These contain the human's original vision and must be preserved exactly as written. You may add new sections or edit AI-generated sections, but user concept sections are sacred.
- never include usernames, passwords, API keys, or similar sensitive information in any source code or comments.  At the very least it must be loaded from environment variables, and the .env used must be included in .gitignore.  If you find any code in violation of this, you must raise an issue with Project Manager.

### MCP (Model Context Protocol)
- Always use context7 (if available) to locate current relevant documentation for specific technologies or tools in use.
- Do not use smithery Toolbox (toolbox) for general tasks. Project manager will guide its use.

### Code Structure
- Keep code short; commits semantic.
- Keep source files to max 300 lines (excluding whitespace) when possible.
- Keep functions & methods to max 50 lines (excluding whitespace) when possible.
- Avoid hard-coded constants - declare a constant.
- Avoid hard-coded and duplicated values -- factor them into common object(s).
- Provide meaningful but concise comments in _relevant_ places.
- **Never use silent fallback values** - If a parameter/property fails to load, fail explicitly with an error or use an obviously-placeholder value (e.g., "ERROR: Failed to load", "MISSING_CONFIG"). Silent fallbacks that look like real data (e.g., `text || "some default text"`) make debugging nearly impossible. Use assertions, throw exceptions, or log errors instead.

### File and Shell Commands
- When performing file or shell commands, always confirm your current location first.

### Builds and Source Control
- After all changes are made, ALWAYS build the project.
- If available, git add and commit *from project root* at least once per task (not per child subitem)

- Log warnings to `/project-documents/private/tasks/950-tasks.maintenance.md`. Write in raw markdown format, with each warning as a list item, using a checkbox in place of standard bullet point. Note that this path is affected by `monorepo active` mode.

## Python Development Rules

### Version & Type Hints

- Target Python 3.9+ exclusively (no 2.x or 3.7 compatibility)
- Use built-in types: `list`, `dict`, `tuple`, not `List`, `Dict`, `Tuple`
- Use `|` for union types: `str | None` not `Optional[str]` or `Union[str, None]`
- Type hint all function signatures and class attributes
- Use `from __future__ import annotations` when needed for forward references

### Code Style & Structure

- Follow PEP 8 with 88-character line length (Black formatter default)
- Use descriptive variable names, avoid single letters except in comprehensions
- Prefer f-strings over `.format()` or `%` formatting
- Use pathlib.Path for file operations, not os.path
- Dataclasses or Pydantic for data structures, avoid raw dicts for complex data
- One class per file for models/services, group related utilities

### Functions & Error Handling

- Small, single-purpose functions (max 20 lines preferred)
- Use early returns to reduce nesting
- Explicit exception handling, avoid bare `except:`
- Raise specific exceptions with meaningful messages
- Use context managers (`with`) for resource management
- Prefer `ValueError`, `TypeError` over generic `Exception`

### Modern Python Patterns

- Use `match/case` for complex conditionals (3.10+)
- Walrus operator `:=` where it improves readability
- Comprehensions over `map`/`filter` when clear
- Generator expressions for memory efficiency
- `itertools` and `functools` for functional patterns
- Enum for constants, not module-level variables

### Testing & Quality

- Write tests alongside implementation
- Use pytest, not unittest
- Fixtures for test data and dependencies
- Parametrize tests for multiple scenarios
- Mock external dependencies at boundaries
- Docstrings for public APIs (Google or NumPy style)
- Type check with mypy or pyright in strict mode

### Dependencies & Imports

- Use poetry for complex projects, uv for simple ones
- Pin direct dependencies, let tools resolve transitive ones
- Group imports: standard library, third-party, local
- Absolute imports for project modules
- Avoid wildcard imports except in `__init__.py`

### Async & Performance

- Use `async`/`await` for I/O operations
- asyncio or trio for concurrency, not threading
- Profile before optimizing
- functools.cache for expensive pure functions
- Prefer built-in functions and comprehensions for speed

### Security & Best Practices

- Never hardcode secrets or credentials
- Use environment variables or secret management
- Validate all external input
- Use parameterized queries for SQL
- Keep dependencies updated
- Use `secrets` module for tokens, not `random`

## React & Next.js Rules

### Components & Naming
- Use functional components
- Prefer **client components** (`"use client"`) for interactive UI - use server components only when specifically beneficial
- Name in PascalCase under `src/components/`
- Keep them small, typed with interfaces
- Stack: React + Tailwind 4 + Radix primitives (no ShadCN)

### React and Next.js Structure
- Use App Router in `app/` (works for both React and Next.js projects)
- **Authentication**: Don't implement auth from scratch - use established providers (Auth0, Clerk, etc.) or consult with PM first
- Use `.env` for secrets and configuration

### State Management
- **Local state**: Use React's built-in hooks (`useState`, `useReducer`, `useContext`)
- **Global state**: For complex global state needs, consider Zustand or Jotai
- **Server state**: Use TanStack Query (React Query) for API data fetching, caching, and synchronization

### Forms
- Use `react-hook-form` with Zod schema validation
- Integrate with Radix form primitives for accessible form controls
- Example pattern:
  ```tsx
  const schema = z.object({ email: z.string().email() });
  const form = useForm({ resolver: zodResolver(schema) });
  ```

### Icons
- Prefer `lucide-react`; name icons in PascalCase
- Custom icons in `src/components/icons`

### Toast Notifications
- Use `react-toastify` in client components
- `toast.success()`, `toast.error()`, etc.

### Tailwind Usage
- **Always use Tailwind 4** - configure in `globals.css` using CSS variables and `@theme`
- **Never use Tailwind 3** patterns or `tailwind.config.ts` / `tailwind.config.js` files
- If a tailwind config file exists, there should be a very good reason it's not in `globals.css`
- Use Tailwind utility classes (mobile-first, dark mode with `dark:` prefix)
- For animations, prefer Framer Motion

### Radix Primitives
- Use Radix primitives directly for accessible, unstyled components
- Style them with Tailwind and semantic color system
- Do not use ShadCN - use raw Radix primitives instead

### Code Style
- Use `eslint` unless directed otherwise
- Use `prettier` if working in languages it supports

### File & Folder Names
- Routes in kebab-case (e.g. `app/dashboard/page.tsx`)
- Sort imports (external → internal → sibling → styles)

### Testing
- Prefer `vitest` over jest

### Builds
- Use `pnpm` not `npm`
- After all changes are made, ALWAYS build the project with `pnpm build`. Allow warnings, fix errors
- If a `package.json` exists, ensure the AI-support script block from `snippets/npm-scripts.ai-support.json` is present before running `pnpm build`

## Code Review Rules

### Purpose

These rules provide **quick reference for lightweight, ad-hoc code reviews** during active development—spot-checking code, reviewing changes before commit, or quick quality checks.

**For comprehensive, systematic code reviews** (e.g., when user requests a formal code review, directory crawl reviews, or thorough quality audits), use the detailed methodology in:

**→ `project-documents/ai-project-guide/project-guides/guide.ai-project.090-code-review.md`**

### Quick Reference

#### File Naming

**Review documents:**
- Location: `private/reviews/`
- Pattern: `nnn-review.{name}.md`
- Range: nnn is 900-939

**Task files:**
- Location: `private/tasks/`
- Pattern: `nnn-tasks.code-review.{filename}.md`
- Use the **same nnn value** for all files in one review session to group them together

**Example:** Review session 905
- Review doc: `905-review.dashboard-refactor.md`
- Task files: `905-tasks.code-review.header.md`, `905-tasks.code-review.sidebar.md`

All files with `905` are part of the same review batch.

#### Review Checklist Categories

When reviewing code, systematically check:

1. **Bugs & Edge Cases** - Potential bugs, unhandled cases, race conditions, memory leaks
2. **Hard-coded Elements** - Magic numbers, strings, URLs that should be configurable
3. **Artificial Constraints** - Assumptions limiting future expansion, fixed limits
4. **Code Duplication** - Repeated patterns that should be abstracted
5. **Component Structure** - Single responsibility, logical hierarchy
6. **Design Patterns** - Best practices, performance optimization, error handling
7. **Type Safety** - Proper typing, documentation of complex logic
8. **Performance** - Unnecessary re-renders, inefficient data fetching, bundle size
9. **Security** - Input validation, auth/authz, XSS protection
10. **Testing** - Coverage of critical paths, edge cases, error states
11. **Accessibility** - ARIA labels, keyboard navigation, screen readers (UI-specific)
12. **Platform-Specific** - React/TypeScript/NextJS best practices, deprecated patterns

#### Quick Process

1. **Create review doc** in `private/reviews/nnn-review.{name}.md`
2. **Apply checklist** systematically to each file
3. **Create task files** in `private/tasks/nnn-tasks.code-review.{filename}.md` for issues found
4. **Prioritize** findings: P0 (critical) → P1 (quality) → P2 (best practices) → P3 (enhancements)

#### YAML Frontmatter

All code review files should include:
```yaml
---
layer: project
docType: review
---
```

### For Detailed Reviews

**Use the comprehensive guide** when you need:
- Full methodology and templates
- Directory crawl review process
- Detailed questionnaire with specific questions
- Step-by-step workflow
- Quality assessment criteria

**→ See: `guide.ai-project.090-code-review.md`**

## SQL & PostgreSQL Development Rules

### Query Style & Formatting

- UPPERCASE SQL keywords: `SELECT`, `FROM`, `WHERE`, not `select`
- Lowercase table and column names with underscores: `user_accounts`
- Indent multi-line queries consistently (2 or 4 spaces)
- One column per line in SELECT for readability
- Leading commas in SELECT lists for easier modification
- Meaningful table aliases, avoid single letters

### Query Optimization

- Always use EXPLAIN ANALYZE for performance tuning
- Create indexes for WHERE, JOIN, and ORDER BY columns
- Use partial indexes for filtered queries
- Prefer JOIN over subqueries when possible
- LIMIT queries during development testing
- Avoid SELECT * in production code
- Use EXISTS instead of COUNT for existence checks

### PostgreSQL Best Practices

- Use appropriate data types: JSONB over JSON, TEXT over VARCHAR
- UUID for distributed IDs, SERIAL/BIGSERIAL for single-node
- Check constraints for data validation
- Foreign keys with appropriate CASCADE options
- Use transactions for multi-statement operations
- RETURNING clause to get modified data
- CTEs (WITH clauses) for complex queries

### Naming & Schema Design

- Singular table names: `user` not `users`
- Primary key as `id` or `table_name_id`
- Foreign keys as `referenced_table_id`
- Boolean columns prefixed with `is_` or `has_`
- Timestamps: `created_at`, `updated_at` with timezone
- Use schemas to organize related tables
- Version control migrations with sequential numbering

### Security & Safety

- Always use parameterized queries, never string concatenation
- GRANT minimum required privileges
- Use ROW LEVEL SECURITY for multi-tenant apps
- Sanitize all user input
- Prepared statements for repeated queries
- Connection pooling with appropriate limits
- Set statement_timeout for long-running queries

### pgvector Specific

- Use `vector` type for embeddings
- Create HNSW or IVFFlat indexes for similarity search
- Normalize vectors before storage when needed
- Use `<->` for L2 distance, `<#>` for inner product
- Batch insert embeddings for performance
- Consider dimension reduction for large vectors

### TimescaleDB Specific

- Create hypertables for time-series data
- Use appropriate chunk intervals (typically 1 week to 1 month)
- Continuous aggregates for common queries
- Compression policies for older data
- Retention policies to manage data lifecycle
- Use time_bucket() for time-based aggregations
- Data retention policies with drop_chunks()

### Performance & Monitoring

- Index foreign keys and commonly filtered columns
- VACUUM and ANALYZE regularly
- Monitor pg_stat_statements for slow queries
- Use connection pooling (PgBouncer/pgpool)
- Partition large tables by date or ID range
- Avoid excessive indexes (write performance cost)
- Use COPY for bulk inserts

### Migrations & Maintenance

- Always reversible migrations when possible
- Test migrations on copy of production data
- Use IF NOT EXISTS for idempotent operations
- Document breaking changes
- Backup before structural changes
- Zero-downtime migrations with careful planning

## Testing Rules

### General Testing Philosophy

- **Write tests as you go** - Create unit tests while completing tasks, not at the end
- **Not strict TDD** - AI development doesn't require test-first, but tests should accompany implementation
- **Focus on value** - Test critical paths, edge cases, and business logic; don't test trivial code

### JavaScript/TypeScript Testing

#### Test Framework
- **Prefer Vitest** over Jest for new projects (faster, better ESM support, compatible API)
- Use `vitest` for unit and integration tests
- Use `@testing-library/react` for component testing

#### Test Organization
- Place test files next to source files: `component.tsx` → `component.test.tsx`
- Or use `__tests__` directory if you prefer: `__tests__/component.test.tsx`
- Use descriptive test names: `describe('UserProfile', () => { it('should display user email', ...) })`

#### What to Test
- **Critical paths**: User workflows, data transformations, business logic
- **Edge cases**: Null/undefined values, empty arrays, boundary conditions
- **Error states**: How code handles failures, invalid input, network errors
- **Not trivial**: Don't test framework code, getters/setters, or obvious pass-throughs

#### Test Coverage
- Aim for meaningful coverage, not 100% coverage
- Critical business logic: high coverage
- UI components: test interactions and state changes
- Utilities and helpers: comprehensive edge case coverage

### Python Testing

#### Test Framework
- Use `pytest` (industry standard)
- Place tests in `tests/` directory or `test_*.py` files
- Use fixtures for test data and setup

#### Test Organization
```
project/
├── src/
│   └── module.py
└── tests/
    └── test_module.py
```

#### Assertions
- Use pytest assertions: `assert result == expected`
- Use pytest-parametrize for multiple test cases
- Mock external dependencies at boundaries

### Best Practices

#### When to Write Tests
- ✅ **During implementation** - Write tests as you build features
- ✅ **After bug fixes** - Add tests to prevent regression
- ✅ **Before refactoring** - Tests verify behavior stays consistent
- ❌ **Not at the very end** - Waiting until feature is "done" leads to skipped tests

#### Test Quality
- **Arrange-Act-Assert** pattern: Set up → Execute → Verify
- **One concept per test**: Each test should verify one thing
- **Readable test names**: Test name should describe what's being tested
- **Avoid test interdependence**: Tests should run independently in any order

#### Mocking and Stubbing
- Mock external services (APIs, databases, file system)
- Don't mock internal business logic - test it directly
- Use dependency injection to make mocking easier

### Running Tests

#### Commands
```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report

pytest                 # Run all tests
pytest -v              # Verbose output
pytest --cov           # Coverage report
```

#### CI/CD Integration
- Tests should run automatically on commit/PR
- Build should fail if tests fail
- Don't skip failing tests - fix them or remove them

### Storybook (Optional)

- **enabled**: false (by default)
- Use Storybook for component documentation and visual testing
- Place stories in `src/stories` with `.stories.tsx` extension
- One story file per component, showing variants and states

## TypeScript Rules

### TypeScript & Syntax
- Strict mode. Avoid `any`.
- Use optional chaining, union types (no enums).

### Structure
- Use `tsx` scripts for migrations.
- Reusable logic in `src/lib/utils/shared.ts` or `src/lib/utils/server.ts`.
- Shared types in `src/lib/types.ts`.


### tRPC Routers
- **enabled**: as needed
- Routers in `src/lib/api/routers`, compose in `src/lib/api/root.ts`.
- `publicProcedure` or `protectedProcedure` with Zod.
- Access from React via `@/lib/trpc/react`. 

