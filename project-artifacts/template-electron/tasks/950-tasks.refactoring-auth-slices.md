---
item: refactoring-auth-slices
project: manta-templates
template: electron
type: tasks
status: not-started
lastUpdated: 2025-10-12
---

# Tasks: Refactor Auth Slices for Multi-Provider Support

## Context

After implementing Slice 110 (Auth0 Core Flow), we identified that several slices are actually provider-agnostic and should be renamed/refactored to support multiple authentication providers (Auth0, Supabase, etc.).

## Objectives

1. Rename provider-agnostic slices to remove "auth0" from names
2. Update slice designs to reference the AuthProvider abstraction
3. Ensure smooth transition without breaking existing implementation
4. Maintain clear distinction between provider-specific and provider-agnostic code

## Tasks

### Task 1: Review and Categorize Slices

- [ ] Review `110-slice.auth0-core-flow.md` - **Keep as-is** (Auth0-specific OAuth)
- [ ] Review `111-slice.auth0-secure-storage.md` - **Rename** (100% provider-agnostic)
- [ ] Review `112-slice.auth0-ipc-react.md` - **Evaluate** (mostly generic)
- [ ] Review `113-slice.auth0-token-lifecycle.md` - **Split** (refresh is provider-specific, logout is generic)

### Task 2: Rename Slice 111 (Secure Token Storage)

**Reason**: Token storage is 100% provider-agnostic. It stores `TokenSet` regardless of source.

- [ ] Rename: `111-slice.auth0-secure-storage.md` → `111-slice.secure-token-storage.md`
- [ ] Update YAML frontmatter: `item: secure-token-storage`
- [ ] Update title: "Slice 111: Secure Token Storage"
- [ ] Update content: Remove Auth0-specific language
- [ ] Add note: "Provider-agnostic - works with Auth0, Supabase, any OAuth provider"
- [ ] Update references in other documents (055-arch.auth0.md, tasks files)

### Task 3: Evaluate Slice 112 (IPC Bridge + React UI)

**Decision needed**: Keep "auth0" or make generic?

- [ ] Analyze what's Auth0-specific vs generic in IPC bridge
- [ ] Decide on naming:
  - Option A: Keep `112-slice.auth0-ipc-react.md` (since initial impl is Auth0)
  - Option B: Rename to `112-slice.auth-ipc-react.md` (emphasize it's generic)
  - Option C: Split into provider-agnostic bridge + Auth0 UI components
- [ ] Document decision in this file
- [ ] Execute rename if decided

### Task 4: Split Slice 113 (Token Lifecycle)

**Reason**: Refresh logic differs per provider, but logout patterns are similar.

Options:
- [ ] Option A: Keep as Auth0-specific, create new slice for Supabase refresh
- [ ] Option B: Split into `113-slice.token-refresh-auth0.md` and `114-slice.token-logout.md`
- [ ] Option C: Create generic refresh interface in 056-arch, keep 113 as Auth0 impl

**Recommended**: Option A (keep Auth0-specific, create Supabase equivalent later)

- [ ] Document decision
- [ ] Update slice metadata to clarify it's Auth0-specific
- [ ] Plan for Supabase refresh slice when needed

### Task 5: Update Cross-References

- [ ] Update `055-arch.auth0.md` to reference renamed slices
- [ ] Update `056-arch.auth-providers.md` to link to correct slice names
- [ ] Update task files (110-tasks, 111-tasks, etc.) to use new names
- [ ] Update any README or index files

### Task 6: Create Slice Naming Convention Document

- [ ] Document when to use provider-specific vs generic slice names
- [ ] Create decision tree: "Should this slice be provider-agnostic?"
- [ ] Add to project style guide or conventions doc

## Decision Log

### 2025-10-12: Initial Analysis
- Identified that Slice 111 (storage) is 100% provider-agnostic
- Recognized need for clear naming conventions
- Decided not to rush refactoring during active development
- Created this task file for future organized refactoring

### Decisions Needed
1. **Slice 112 naming**: auth0-ipc-react vs auth-ipc-react?
2. **Slice 113 approach**: Keep Auth0-specific or try to abstract?
3. **Timing**: Refactor now or after Slice 113 is complete?

## Success Criteria

- [ ] Slice names accurately reflect whether they're provider-specific or generic
- [ ] No broken cross-references in documentation
- [ ] Existing Auth0 implementation still works
- [ ] Clear path for adding Supabase provider
- [ ] Documentation is consistent and easy to navigate

## Notes

- **Don't rush this**: Better to get it right than fast
- **Test after renaming**: Ensure no broken links or references
- **Consider impact**: Renamed files might affect git history browsing
- **Communicate clearly**: If working with team, explain the refactoring

## Related Documents

- `056-arch.auth-providers.md` - Multi-provider architecture
- `055-arch.auth0.md` - Auth0 architecture (spawns 110-113)
- Current slice files in `slices/` directory
