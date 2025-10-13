---
layer: project
docType: tasks
linkedReview: 910-review.auth0-security
priority: medium
---

# Security Hardening Tasks - Auth0 Implementation

**Source**: Security review [910-review.auth0-security.md](../reviews/910-review.auth0-security.md)
**Priority**: Medium (should be addressed before production use)
**Scope**: Fix security issues identified in comprehensive auth review

---

## Medium Priority Issues (M1-M5)

### [ ] M1: Fix Token Exposure via IPC Handler

**Issue**: `auth:get-tokens` IPC handler exposes complete TokenSet (including refresh token) to renderer process.

**Files**:
- [src/main/main.ts:81-83](../../../templates/electron/src/main/main.ts#L81-L83)
- [src/preload/preload.ts:22](../../../templates/electron/src/preload/preload.ts#L22)

**Implementation Options**:

#### Option A: Remove IPC handler entirely (Recommended)
- [ ] Remove `auth:get-tokens` IPC handler from [main.ts:81-83](../../../templates/electron/src/main/main.ts#L81-L83)
- [ ] Remove `getTokens` from preload API in [preload.ts:22](../../../templates/electron/src/preload/preload.ts#L22)
- [ ] Add request-specific handlers (e.g., `auth:fetch-user-profile`) that handle API calls in main process
- [ ] Update documentation to explain why tokens aren't exposed to renderer

#### Option B: Return access token only with expiry check
- [ ] Create `auth:get-access-token` handler that returns ONLY access token
- [ ] Validate expiry before returning in [auth0-client.ts](../../../templates/electron/src/main/auth/auth0-client.ts)
- [ ] Update preload types to reflect new API
- [ ] Add documentation warning about token handling

**Acceptance Criteria**:
- [ ] Refresh tokens never accessible from renderer
- [ ] Access tokens only provided when necessary
- [ ] Unit tests verify token isolation
- [ ] Documentation updated with security rationale

---

### [ ] M2: Implement Token Expiry Validation

**Issue**: `getTokens()` returns tokens without checking if expired.

**Files**:
- [src/main/auth/auth0-client.ts:153-155](../../../templates/electron/src/main/auth/auth0-client.ts#L153-L155)

**Tasks**:
- [ ] Add expiry check to `getTokens()` method with 60s grace period
- [ ] Return `null` if token expired
- [ ] Log warning when token expires
- [ ] Add unit tests for expiry validation
  - [ ] Test: returns token when valid
  - [ ] Test: returns null when expired
  - [ ] Test: respects grace period (expires in 30s = still valid)
  - [ ] Test: logs warning on expiry

**Implementation**:
```typescript
getTokens(): TokenSet | null {
  if (!this.tokens) return null

  // Check if token is expired (with 60s grace period)
  if (Date.now() >= this.tokens.expiresAt - 60000) {
    authLogger.warn('Access token expired')
    return null
  }

  return this.tokens
}
```

**Acceptance Criteria**:
- [ ] Expired tokens not returned
- [ ] Grace period prevents edge case failures
- [ ] Warning logged on expiry detection
- [ ] All unit tests pass

---

### [ ] M3: Add Authorization Checks to IPC Handlers

**Issue**: IPC handlers don't verify authentication state before processing.

**Files**:
- [src/main/main.ts:77-93](../../../templates/electron/src/main/main.ts#L77-L93)

**Tasks**:
- [ ] Add authentication check to `auth:get-tokens` handler (or remove per M1)
- [ ] Create helper function `requireAuthentication()` for reuse
- [ ] Add unit tests for unauthenticated access attempts
  - [ ] Test: authenticated user can access protected handlers
  - [ ] Test: unauthenticated user receives error
  - [ ] Test: error message is clear and actionable

**Implementation**:
```typescript
// Helper function
function requireAuthentication(): TokenSet {
  const tokens = auth0Client.getTokens()
  if (!tokens) {
    throw new Error('User not authenticated. Please login first.')
  }
  return tokens
}

// In handler
ipcMain.handle('auth:get-user-profile', async () => {
  const tokens = requireAuthentication()
  // ... fetch profile with tokens.accessToken
})
```

**Acceptance Criteria**:
- [ ] All protected IPC handlers check authentication
- [ ] Clear error messages for unauthenticated access
- [ ] Helper function prevents code duplication
- [ ] Tests verify authorization enforcement

---

### [ ] M4: Review and Tighten Sensitive Data Logging

**Issue**: Partial sensitive data logged (challenge/state hints) even in production with AUTH_DEBUG.

**Files**:
- [src/main/auth/auth0-client.ts:56-59](../../../templates/electron/src/main/auth/auth0-client.ts#L56-L59)
- [src/main/auth/logger.ts](../../../templates/electron/src/main/auth/logger.ts)

**Tasks**:
- [ ] Remove substring hints from sensitive logging (lines 58-59)
- [ ] Add explicit warning in logger.ts about AUTH_DEBUG in production
- [ ] Consider renaming `sensitive()` to `trace()` for clarity
- [ ] Add JSDoc comments explaining logging levels
- [ ] Update .env.example with AUTH_DEBUG warning

**Changes**:
```typescript
// In logger.ts - add warning comment
/**
 * Auth Logger Utility
 *
 * WARNING: Never set AUTH_DEBUG=true in production environments.
 * The sensitive() method logs cryptographic values that could aid attacks.
 *
 * Logging levels:
 * - debug: General auth flow (enabled in dev, optional in prod via AUTH_DEBUG)
 * - info: Important events (always logged)
 * - success: Successful operations (always logged)
 * - error/warn: Problems (always logged)
 * - sensitive: Crypto values, tokens, codes (NEVER in production)
 */

// In auth0-client.ts - simplify logging
authLogger.sensitive('Auth URL generated')
authLogger.sensitive('State generated')
authLogger.sensitive('Code challenge generated')
// No partial data hints
```

**Acceptance Criteria**:
- [ ] No partial sensitive data logged
- [ ] Clear warnings about AUTH_DEBUG
- [ ] Logger documentation comprehensive
- [ ] .env.example includes security note

---

### [ ] M5: Enhance Deep Link/Protocol URL Validation

**Issue**: Protocol handler only validates URL prefix, not structure or parameters.

**Files**:
- [src/main/auth/protocol-handler.ts:37-50](../../../templates/electron/src/main/auth/protocol-handler.ts#L37-L50)

**Tasks**:
- [ ] Add strict URL structure validation (protocol, hostname)
- [ ] Whitelist allowed query parameters (code, state, error, error_description)
- [ ] Warn on unexpected parameters
- [ ] Don't log full callback URL (contains authorization code)
- [ ] Add unit tests for malformed URLs
  - [ ] Test: valid callback URL accepted
  - [ ] Test: invalid protocol rejected
  - [ ] Test: invalid hostname rejected
  - [ ] Test: unexpected parameters logged as warning
  - [ ] Test: malformed URL caught by try/catch

**Implementation**:
```typescript
app.on('open-url', async (event, url) => {
  event.preventDefault()
  authLogger.debug('Received auth callback') // Don't log full URL

  try {
    const parsedUrl = new URL(url)

    // Strict validation
    if (parsedUrl.protocol !== `${AUTH_PROTOCOL_SCHEME}:` ||
        parsedUrl.hostname !== 'callback') {
      authLogger.warn('Invalid callback URL structure')
      return
    }

    // Validate parameters
    const allowedParams = ['code', 'state', 'error', 'error_description']
    for (const key of parsedUrl.searchParams.keys()) {
      if (!allowedParams.includes(key)) {
        authLogger.warn(`Unexpected parameter in callback: ${key}`)
      }
    }

    await auth0Client.handleCallback(url)
  } catch (error) {
    authLogger.error('Callback validation failed:', error)
  }
})
```

**Acceptance Criteria**:
- [ ] URL structure strictly validated
- [ ] Unexpected parameters detected and logged
- [ ] Full callback URL not logged
- [ ] All validation tests pass
- [ ] Error handling prevents crashes

---

## Low Priority Enhancements (Optional)

### [ ] L3: Add Login Attempt Rate Limiting

**Issue**: No client-side rate limiting on `login()` calls.

**File**: [src/main/auth/auth0-client.ts:31-63](../../../templates/electron/src/main/auth/auth0-client.ts#L31-L63)

**Tasks**:
- [ ] Add cooldown period (5 seconds) between login attempts
- [ ] Throw clear error if cooldown not met
- [ ] Add unit tests for rate limiting
- [ ] Update error messages

**Note**: Low priority as Auth0 has server-side rate limiting.

---

### [ ] L4: Implement Logout Functionality

**Issue**: No `logout()` method to clear tokens.

**File**: [src/main/auth/auth0-client.ts](../../../templates/electron/src/main/auth/auth0-client.ts)

**Tasks**:
- [ ] Add `logout()` method to Auth0Client
- [ ] Clear tokens and pendingAuth
- [ ] Add `auth:logout` IPC handler
- [ ] Update preload API with logout
- [ ] Add unit tests for logout

**Note**: May be part of future slice (Slice 112).

---

## Dependencies & Verification

### [ ] Dependency Security Audit

**Tasks**:
- [ ] Run `pnpm audit` from templates/electron
- [ ] Review and fix any high/critical vulnerabilities
- [ ] Document any accepted risks
- [ ] Add audit to CI/CD pipeline

### [ ] Vite Configuration Review

**Tasks**:
- [ ] Review vite.config.ts for sensitive env var exposure
- [ ] Verify VITE_ prefix used correctly
- [ ] Check that .env files in .gitignore
- [ ] Confirm production builds strip dev tools

### [ ] Add Security-Focused Tests

**Tasks**:
- [ ] Create test suite for token isolation
- [ ] Create test suite for IPC security
- [ ] Create test suite for protocol handler security
- [ ] Add tests to CI/CD pipeline
- [ ] Target 90%+ coverage for auth code

---

## Documentation Updates

### [ ] Security Documentation

**Tasks**:
- [ ] Document security assumptions in README
- [ ] Add security best practices guide
- [ ] Document why tokens aren't exposed to renderer
- [ ] Add section on rate limiting and logout
- [ ] Include link to security review

### [ ] Code Comments

**Tasks**:
- [ ] Add security rationale comments to critical sections
- [ ] Document why certain approaches were chosen
- [ ] Add warnings about unsafe patterns

---

## Completion Criteria

**All M1-M5 issues resolved**:
- [ ] M1: Token exposure fixed
- [ ] M2: Expiry validation implemented
- [ ] M3: Authorization checks added
- [ ] M4: Sensitive logging tightened
- [ ] M5: Deep link validation enhanced

**Quality Gates**:
- [ ] All existing tests pass
- [ ] New security tests added and passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] `pnpm audit` shows no high/critical issues

**Sign-off**:
- [ ] Senior AI approval
- [ ] Project Manager approval
- [ ] Security review checklist re-verified

---

**Created**: 2025-10-12
**Linked Review**: [910-review.auth0-security.md](../reviews/910-review.auth0-security.md)
**Priority**: Medium (before production)
**Estimated Effort**: 4-6 hours
