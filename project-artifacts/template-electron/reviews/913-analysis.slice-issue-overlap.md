---
layer: project
docType: analysis
date: 2025-10-13
linkedReview: 910-review.auth0-security, 912-github-issues-summary
---

# Analysis: GitHub Issues vs Planned Slices (111-113)

## Purpose

Analyze overlap between security-related GitHub issues (#86-#93) and planned authentication slices (111-113) to:
- Identify which issues will be naturally resolved by implementing slices
- Determine which issues need standalone fixes
- Optimize implementation order to avoid duplicate work

---

## Slice Summaries (Current Plans)

### Slice 111: Secure Token Storage
**Scope** (from slice design):
- electron-store integration for persistent storage
- safeStorage encryption (Keychain/DPAPI/kwallet)
- Encryption availability checking
- Graceful fallback with warnings
- Token persistence across app restarts

**Dependencies**: Slice 110 (complete)
**Status**: Not started (placeholder design)

---

### Slice 112: IPC Bridge & React Integration
**Scope** (from slice design):
- Complete IPC bridge (preload + contextBridge)
- IPC handlers for all auth operations (login, logout, getUser, getToken)
- React AuthContext + AuthProvider
- useAuth() hook
- AuthGuard component for route protection
- Auth state events (main → renderer)

**Dependencies**: Slice 111
**Status**: Not started (placeholder design)

---

### Slice 113: Token Lifecycle Management
**Scope** (from slice design):
- Reactive token refresh (on 401 errors)
- Logout flow (clear tokens + Auth0 session)
- Basic token expiry handling
- Simple offline support
- Error recovery for common auth failures

**Dependencies**: Slice 112
**Status**: Not started (placeholder design)

---

## Issue-by-Issue Analysis

### Issue #86: Replace auth:get-tokens with API proxy pattern
**Priority**: HIGH (before production)
**Slice Overlap**: 🔴 **CONFLICTS with Slice 112**

**Analysis**:
- Slice 112 scope includes: "IPC handlers for all auth operations (login, logout, getUser, **getToken**)"
- This suggests Slice 112 **planned to keep** `getToken` handler
- Issue #86 recommends **removing** token exposure entirely
- **These are contradictory approaches**

**Recommendation**:
- ✅ **Fix Issue #86 BEFORE implementing Slice 112**
- Update Slice 112 design to remove `getToken` from scope
- Replace with API proxy pattern: `getUserProfile`, `fetchAuthenticated`
- This will **prevent implementing the wrong pattern** in Slice 112

**Impact on Slice 112**:
- Remove: `getToken` handler
- Add: `getUserProfile`, `fetchAuthenticated`, `getAuthStatus` handlers
- Update React hooks to use new pattern
- Net result: Slice 112 becomes **more secure by default**

---

### Issue #87: Implement token expiry validation
**Priority**: HIGH (before production)
**Slice Overlap**: 🟡 **PARTIALLY covered by Slice 113**

**Analysis**:
- Slice 113 includes: "Basic token expiry handling"
- Issue #87 requires: Expiry validation with 60s grace period
- **However**: Expiry validation is needed BEFORE Slice 113
  - Slice 111 (persistent storage) needs to check if stored tokens are expired
  - Slice 112 (IPC handlers) should validate tokens before use
  - Slice 113 builds on expiry checking to trigger refresh

**Recommendation**:
- ✅ **Fix Issue #87 NOW (before Slices 111-113)**
- Add `getValidAccessToken()` method to Auth0Client
- Use this method as foundation for all three slices
- Slice 113 can then **extend** this with automatic refresh

**Impact on Slices**:
- Slice 111: Use `getValidAccessToken()` when loading persisted tokens
- Slice 112: Use `getValidAccessToken()` in all IPC handlers
- Slice 113: Extend to `getValidAccessTokenOrRefresh()`

**Conclusion**: Issue #87 is a **prerequisite** for Slices 111-113, not redundant with them.

---

### Issue #88: Add authentication checks to IPC handlers
**Priority**: MEDIUM
**Slice Overlap**: 🟢 **Will be included in Slice 112**

**Analysis**:
- Slice 112 scope: "Complete IPC bridge" and "IPC handlers for all auth operations"
- Authentication checks are part of proper IPC handler implementation
- **However**: Current Slice 110 handlers lack auth checks

**Recommendation**:
- ⚠️ **Fix Issue #88 NOW for Slice 110 handlers**
- Then **include pattern** in Slice 112 design
- Prevents shipping Slice 110 template without auth checks

**Timeline**:
- Short-term: Fix existing `auth:login`, `auth:get-tokens` handlers (Slice 110)
- Long-term: Use pattern in Slice 112 for new handlers

**Conclusion**: Partially redundant but needed now for Slice 110 code quality.

---

### Issue #89: Enhance deep link/protocol URL validation
**Priority**: MEDIUM
**Slice Overlap**: ❌ **NOT covered by any slice**

**Analysis**:
- Deep link validation is in protocol-handler.ts
- Slices 111-113 don't modify protocol handler
- This is a **standalone security hardening** task

**Recommendation**:
- ✅ **Fix Issue #89 independently**
- Not related to slice work
- Can be done anytime (low urgency)

**Conclusion**: No overlap - standalone fix.

---

### Issue #90: Tighten sensitive data logging
**Priority**: LOW
**Slice Overlap**: ❌ **NOT covered by any slice**

**Analysis**:
- Logging improvements are in logger.ts
- Slices 111-113 will use logger but won't modify it

**Recommendation**:
- ✅ **Fix Issue #90 independently**
- Quick win, improves all slices
- Do before implementing Slices 111-113 so they use better logging

**Conclusion**: No overlap - standalone fix (recommended before slices).

---

### Issue #91: Add logout functionality
**Priority**: LOW
**Slice Overlap**: 🟢 **FULLY covered by Slice 113**

**Analysis**:
- Slice 113 scope explicitly includes: "Logout flow (clear tokens + Auth0 session)"
- Issue #91 is a **subset** of Slice 113

**Recommendation**:
- ❌ **DEFER Issue #91 - will be done in Slice 113**
- Close issue or mark as "will be resolved by Slice 113"
- No need to implement twice

**Conclusion**: 100% redundant with Slice 113 - defer.

---

### Issue #92: Run dependency audit
**Priority**: MEDIUM
**Slice Overlap**: ❌ **NOT covered by any slice**

**Analysis**:
- Dependency audit is maintenance, not feature work
- Should be done **before** implementing new slices

**Recommendation**:
- ✅ **Fix Issue #92 NOW**
- Run `pnpm audit` before adding new dependencies in Slices 111-113
- Prevents building on vulnerable foundations

**Conclusion**: No overlap - standalone maintenance (do first).

---

### Issue #93: Add security documentation
**Priority**: HIGH
**Slice Overlap**: ❌ **NOT covered by slices, but dependent on them**

**Analysis**:
- Documentation should cover final production patterns
- Can't complete until Slice 112 is done (documents IPC patterns)
- However, can document **current state** (Slice 110) now

**Recommendation**:
- ⚠️ **Phased approach**:
  - **Phase 1 (now)**: Document Slice 110 security architecture
  - **Phase 2 (after #86)**: Document API proxy pattern
  - **Phase 3 (after Slice 112)**: Document React integration patterns
  - **Phase 4 (after Slice 113)**: Document token lifecycle

**Conclusion**: Partially overlap - do incrementally.

---

## Summary Matrix

| Issue | Priority | Slice Overlap | Recommendation |
|-------|----------|---------------|----------------|
| #86: API proxy pattern | HIGH | 🔴 **Conflicts with 112** | **Fix NOW before Slice 112** |
| #87: Token expiry | HIGH | 🟡 **Prerequisite for 111-113** | **Fix NOW before slices** |
| #88: IPC auth checks | MED | 🟢 **Partial (112)** | Fix now for 110, include in 112 |
| #89: Deep link validation | MED | ❌ **No overlap** | Standalone fix anytime |
| #90: Sensitive logging | LOW | ❌ **No overlap** | Fix before slices (quick win) |
| #91: Logout | LOW | 🟢 **100% in Slice 113** | **DEFER - close issue** |
| #92: Dependency audit | MED | ❌ **No overlap** | **Fix NOW before slices** |
| #93: Documentation | HIGH | ❌ **Dependent on slices** | Phased approach |

---

## Recommended Implementation Order

### Phase 0: Prerequisites (Before Any Slices)
**Do these NOW to prevent rework**:

1. ✅ **Issue #92**: Dependency audit
   - Run `pnpm audit`
   - Fix vulnerabilities
   - Clean foundation for new work

2. ✅ **Issue #87**: Token expiry validation
   - Add `getValidAccessToken()` method
   - Foundation for Slices 111-113
   - **Critical prerequisite**

3. ✅ **Issue #90**: Sensitive logging (optional)
   - Quick win
   - Improves all future work

---

### Phase 1: Fix Slice 110 (Current Code)
**Before implementing new slices**:

4. ✅ **Issue #86**: API proxy pattern
   - Replace `auth:get-tokens` with production patterns
   - **Prevents implementing wrong pattern in Slice 112**
   - Update Slice 112 design to reflect new pattern

5. ✅ **Issue #88**: IPC auth checks (for Slice 110 handlers)
   - Add auth checks to existing handlers
   - Pattern will be reused in Slice 112

6. ✅ **Issue #93 (Phase 1)**: Document Slice 110
   - Document current security architecture
   - Document API proxy pattern from #86

---

### Phase 2: Implement Slice 111 (Secure Storage)
**After Phase 1 complete**:

7. Implement Slice 111 with:
   - Uses `getValidAccessToken()` from Issue #87 ✅
   - Already has secure logging from Issue #90 ✅
   - Clean dependencies from Issue #92 ✅

---

### Phase 3: Implement Slice 112 (IPC & React)
**After Slice 111 complete**:

8. Implement Slice 112 with:
   - API proxy pattern from Issue #86 (not getToken) ✅
   - Auth checks pattern from Issue #88 ✅
   - Uses token expiry validation from Issue #87 ✅

9. **Issue #93 (Phase 2)**: Document Slice 112
   - Document React integration patterns
   - Document IPC security patterns

---

### Phase 4: Implement Slice 113 (Token Lifecycle)
**After Slice 112 complete**:

10. Implement Slice 113 with:
    - **Includes Issue #91** (logout functionality) ✅
    - Extends `getValidAccessToken()` to auto-refresh
    - Close Issue #91 as resolved

11. **Issue #93 (Phase 3)**: Document Slice 113
    - Document token lifecycle
    - Document logout flow
    - **Complete documentation**

---

### Phase 5: Final Hardening (Optional)
**After Slice 113 complete**:

12. **Issue #89**: Deep link validation (optional)
    - Defense in depth
    - Low priority

---

## Critical Findings

### ⚠️ Issue #86 CONFLICTS with Slice 112 Plan

**Problem**:
- Slice 112 scope includes `getToken` handler
- Issue #86 recommends removing token exposure
- Implementing Slice 112 as designed would undo security fix

**Solution**:
1. Fix Issue #86 first (API proxy pattern)
2. **Update Slice 112 design** to remove `getToken` from scope
3. Update Slice 112 to use new patterns: `getUserProfile`, `fetchAuthenticated`

**Action Required**:
- [ ] Update [112-slice.auth0-ipc-react.md](../slices/112-slice.auth0-ipc-react.md) scope
- [ ] Remove: "getToken" from IPC handlers list
- [ ] Add: "API proxy pattern" handlers instead
- [ ] Reference Issue #86 in slice design

---

### ✅ Issue #87 is Prerequisite for ALL Slices

**Finding**: Token expiry validation is needed before implementing Slices 111-113:
- Slice 111: Check if persisted tokens are expired
- Slice 112: Validate tokens in IPC handlers
- Slice 113: Trigger refresh when tokens expire

**Solution**: Implement Issue #87 first, use as foundation for slices.

---

### ❌ Issue #91 is 100% Redundant

**Finding**: Logout functionality is fully covered by Slice 113 scope.

**Solution**:
- Close Issue #91 or mark as "duplicate of Slice 113"
- Reference Slice 113 in issue
- Don't implement twice

---

## Updated Slice 112 Scope (Proposed)

Based on this analysis, Slice 112 scope should be updated to:

```markdown
## Scope
- Complete IPC bridge (preload + contextBridge)
- IPC handlers implementing API proxy pattern (Issue #86):
  - auth:login
  - auth:get-user-profile (not getToken!)
  - auth:fetch (generic authenticated fetch)
  - auth:get-status (metadata only)
- React AuthContext + AuthProvider
- useAuth() hook using API proxy pattern
- AuthGuard component for route protection
- Auth state events (main → renderer)
- Token expiry validation in all handlers (Issue #87)
- Authentication checks on all protected handlers (Issue #88)
```

---

## Conclusion

**Issues to fix BEFORE slices**:
- #86 (HIGH) - Prevents implementing wrong pattern
- #87 (HIGH) - Prerequisite for all slices
- #92 (MED) - Clean foundation

**Issues resolved BY slices**:
- #91 (LOW) - 100% in Slice 113

**Issues independent of slices**:
- #89 (MED) - Standalone anytime
- #90 (LOW) - Quick win before slices

**Issues phased with slices**:
- #88 (MED) - Fix now for 110, include pattern in 112
- #93 (HIGH) - Document incrementally as slices complete

**Critical Action**: Update Slice 112 design to reflect Issue #86 patterns before implementation.

---

**Analysis Date**: 2025-10-13
**Recommendation**: Implement Issues #86, #87, #92 before starting Slice 111
