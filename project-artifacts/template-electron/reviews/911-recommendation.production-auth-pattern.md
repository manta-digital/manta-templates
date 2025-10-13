---
layer: project
docType: recommendation
date: 2025-10-12
linkedReview: 910-review.auth0-security
status: proposed
---

# Production-Ready Auth Pattern Recommendation

## Problem Statement

Current implementation (Slice 110) includes `auth:get-tokens` IPC handler that exposes tokens to renderer process. This was identified as a security issue (M1) but is actually a **demo/testing artifact** rather than a pattern we'd use in production.

**Question**: What does a real production authentication flow look like in Electron?

---

## Production Pattern: Token Isolation with API Proxying

### Core Principle
**Tokens never leave the main process**. Renderer makes logical requests, main process handles authentication internally.

---

## Current Demo Pattern (Slice 110) ❌

```typescript
// RENDERER (App.tsx)
const handleLogin = async () => {
  await window.electronAPI.auth.login()

  // ❌ BAD: Renderer gets tokens directly
  const tokens = await window.electronAPI.auth.getTokens()

  // ❌ BAD: Renderer makes authenticated API calls
  const response = await fetch('https://api.example.com/user', {
    headers: { Authorization: `Bearer ${tokens.accessToken}` }
  })
}

// MAIN PROCESS (main.ts)
ipcMain.handle('auth:get-tokens', () => {
  return auth0Client.getTokens() // ❌ Exposes tokens to renderer
})
```

**Problems**:
1. Refresh token exposed to renderer (long-term credential leak risk)
2. Renderer can make arbitrary API calls (harder to audit/log)
3. Token management logic duplicated in renderer
4. CORS/network errors harder to debug

---

## Recommended Production Pattern ✅

### Pattern 1: API Proxying (Most Common)

Main process acts as authenticated API client. Renderer requests data, main process fetches it.

```typescript
// MAIN PROCESS (main.ts)
ipcMain.handle('auth:get-user-profile', async () => {
  // Internal method that validates expiry and returns access token
  const accessToken = await auth0Client.getValidAccessToken()

  const response = await fetch(`https://${auth0Config.domain}/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.status}`)
  }

  return await response.json()
})

ipcMain.handle('auth:fetch-api-data', async (event, endpoint: string) => {
  const accessToken = await auth0Client.getValidAccessToken()

  const response = await fetch(`https://api.example.com${endpoint}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  return await response.json()
})

// RENDERER (App.tsx)
const handleLogin = async () => {
  await window.electronAPI.auth.login()

  // ✅ GOOD: Renderer requests data, main process handles auth
  const profile = await window.electronAPI.auth.getUserProfile()
  console.log('Logged in as:', profile.email)

  const data = await window.electronAPI.auth.fetchApiData('/protected-resource')
}

// PRELOAD (preload.ts)
contextBridge.exposeInMainWorld('electronAPI', {
  auth: {
    login: () => ipcRenderer.invoke('auth:login'),
    getUserProfile: () => ipcRenderer.invoke('auth:get-user-profile'),
    fetchApiData: (endpoint: string) => ipcRenderer.invoke('auth:fetch-api-data', endpoint),
    getAuthStatus: () => ipcRenderer.invoke('auth:get-status')
  }
})
```

**Benefits**:
- ✅ Tokens never exposed to renderer
- ✅ Centralized auth logic
- ✅ Easy to add logging/rate limiting
- ✅ CORS not an issue (main process = Node.js)
- ✅ Can implement request queuing during token refresh

---

### Pattern 2: Auth Status Only (Hybrid)

For cases where renderer needs to make direct API calls (e.g., third-party SDK), provide minimal auth metadata.

```typescript
// MAIN PROCESS (main.ts)
ipcMain.handle('auth:get-status', () => {
  const tokens = auth0Client.getTokens()

  if (!tokens) {
    return { isAuthenticated: false }
  }

  return {
    isAuthenticated: true,
    expiresAt: tokens.expiresAt,
    expiresIn: Math.max(0, tokens.expiresAt - Date.now())
  }
})

// For very specific use cases, provide ONLY access token (never refresh)
ipcMain.handle('auth:get-access-token', async () => {
  const accessToken = await auth0Client.getValidAccessToken()
  return { accessToken } // Object wrapper makes it clear what's being returned
})

// RENDERER (App.tsx)
const checkAuthStatus = async () => {
  const status = await window.electronAPI.auth.getAuthStatus()

  if (status.isAuthenticated) {
    console.log('Logged in, token expires in:', status.expiresIn, 'ms')
  }
}
```

**Use Cases**:
- UI state management (show/hide login button)
- Display token expiry countdown
- Third-party SDKs that require direct token access (rare)

**Still avoid exposing**:
- ❌ Refresh tokens (NEVER to renderer)
- ❌ ID tokens (unless specifically needed for display)

---

## Implementation Plan for Template

### Option A: Remove Demo Code (Recommended for Production Template)

**Changes**:
1. Remove `auth:get-tokens` IPC handler entirely
2. Add example production patterns:
   - `auth:get-user-profile` - fetches Auth0 userinfo
   - `auth:fetch-api-data` - generic authenticated fetch proxy
   - `auth:get-status` - returns auth metadata only
3. Update README with "Production Patterns" section
4. Add code comments explaining why tokens aren't exposed

**Pros**:
- Template shows best practices out of the box
- New users learn secure patterns immediately
- No dangerous demo code to accidentally deploy

**Cons**:
- Slightly more complex for initial learning
- Requires users to understand proxy pattern

---

### Option B: Keep Demo Code with Big Warning

**Changes**:
1. Keep `auth:get-tokens` but wrap in conditional
2. Add obvious warnings in code comments
3. Provide migration guide in README

```typescript
// main.ts
// ⚠️ WARNING: Demo/testing only - DO NOT USE IN PRODUCTION
// This handler exposes tokens to renderer for testing purposes
// See README "Production Patterns" section for secure alternatives
if (process.env.NODE_ENV === 'development') {
  ipcMain.handle('auth:get-tokens', () => {
    authLogger.warn('⚠️ auth:get-tokens called - this is for development only')
    return auth0Client.getTokens()
  })
}
```

**Pros**:
- Easier for learning/experimentation
- Users can verify login worked during development
- Clear path to production (remove/disable)

**Cons**:
- Risk users forget to remove it
- Bad pattern visible in codebase

---

### Option C: Separate Demo Branch

**Structure**:
```
templates/electron/
├── src/                    # Production-ready code
└── examples/
    └── auth-demo/          # Demo code with tokens exposed
        └── README.md       # "This is for learning only"
```

**Pros**:
- Best of both worlds
- Clear separation of concerns

**Cons**:
- More maintenance
- Users might not find examples

---

## Recommendation: **Option A** (Remove Demo Code)

**Rationale**:
1. This is a **template** - should demonstrate best practices
2. `auth:get-user-profile` is just as easy to understand as `auth:get-tokens`
3. Security by default > convenience
4. Users can always add `getTokens()` themselves if needed for debugging

**Migration Path**:
1. Implement `auth:get-user-profile` as primary example
2. Add `auth:get-status` for UI state management
3. Document proxy pattern clearly in README
4. Add code comments explaining token isolation

---

## Updated Security Task Priorities

Based on this analysis, here's the revised priority list:

### Must Fix (Production Template)
1. **REMOVE** `auth:get-tokens` handler ✅
2. **ADD** production patterns (`auth:get-user-profile`, etc.) ✅
3. **IMPLEMENT** token expiry validation (M2) ✅
4. **ADD** authorization checks to all IPC handlers (M3) ✅
5. **ENHANCE** deep link validation (M5) ✅

### Should Fix (Polish)
6. **CLEAN UP** sensitive logging (M4) ✅
7. **DOCUMENT** security patterns in README ✅

### Optional (Nice to Have)
8. Add rate limiting (L3)
9. Add logout functionality (L4)

---

## Example Production Implementation

Here's what the refactored code would look like:

### auth0-client.ts (Internal Methods)

```typescript
class Auth0Client {
  // ... existing code ...

  /**
   * Get valid access token for internal use
   * Validates expiry and throws if not authenticated
   *
   * @throws {Error} If not authenticated or token expired
   * @returns {Promise<string>} Valid access token
   */
  private async getValidAccessToken(): Promise<string> {
    if (!this.tokens) {
      throw new Error('Not authenticated - please login first')
    }

    // Check expiry with 60s grace period
    if (Date.now() >= this.tokens.expiresAt - 60000) {
      authLogger.warn('Access token expired')
      // TODO (Slice 112): Implement automatic refresh
      throw new Error('Session expired - please login again')
    }

    return this.tokens.accessToken
  }

  /**
   * Get authentication status (safe for renderer)
   * Returns metadata only, never tokens
   */
  getAuthStatus(): AuthStatus {
    if (!this.tokens) {
      return { isAuthenticated: false }
    }

    return {
      isAuthenticated: true,
      expiresAt: this.tokens.expiresAt,
      expiresIn: Math.max(0, this.tokens.expiresAt - Date.now())
    }
  }

  /**
   * Fetch Auth0 user profile
   * Handles authentication internally
   */
  async getUserProfile(): Promise<UserProfile> {
    const accessToken = await this.getValidAccessToken()

    const response = await fetch(
      `https://${auth0Config.domain}/userinfo`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.status}`)
    }

    return await response.json()
  }

  /**
   * Generic authenticated fetch for custom APIs
   * Allows renderer to make API calls without handling auth
   */
  async fetchAuthenticated(url: string, options: RequestInit = {}): Promise<any> {
    const accessToken = await this.getValidAccessToken()

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    return await response.json()
  }

  // Remove getTokens() entirely - no public access to tokens
}
```

### main.ts (IPC Handlers)

```typescript
// Auth IPC handlers (only if auth is enabled)
if (isAuthEnabled && auth0Client) {
  // Login flow
  ipcMain.handle('auth:login', async () => {
    await auth0Client.login()
  })

  // Get auth status (metadata only)
  ipcMain.handle('auth:get-status', () => {
    return auth0Client.getAuthStatus()
  })

  // Get user profile (tokens used internally)
  ipcMain.handle('auth:get-user-profile', async () => {
    return await auth0Client.getUserProfile()
  })

  // Generic authenticated API calls
  ipcMain.handle('auth:fetch', async (event, url: string, options?: RequestInit) => {
    return await auth0Client.fetchAuthenticated(url, options)
  })

  // Logout (future slice)
  ipcMain.handle('auth:logout', () => {
    auth0Client.logout()
  })
} else {
  // Disabled handlers return clear errors
  const authDisabledError = () => {
    throw new Error('Authentication disabled - set AUTH_ENABLED=true in .env')
  }

  ipcMain.handle('auth:login', authDisabledError)
  ipcMain.handle('auth:get-status', () => ({ isAuthenticated: false }))
  ipcMain.handle('auth:get-user-profile', authDisabledError)
  ipcMain.handle('auth:fetch', authDisabledError)
  ipcMain.handle('auth:logout', authDisabledError)
}
```

### preload.ts (Type-Safe API)

```typescript
interface AuthStatus {
  isAuthenticated: boolean
  expiresAt?: number
  expiresIn?: number
}

interface UserProfile {
  sub: string
  email: string
  email_verified: boolean
  name?: string
  picture?: string
}

declare global {
  interface Window {
    electronAPI: {
      auth: {
        login: () => Promise<void>
        getStatus: () => Promise<AuthStatus>
        getUserProfile: () => Promise<UserProfile>
        fetch: (url: string, options?: RequestInit) => Promise<any>
        logout: () => Promise<void>
      }
    }
  }
}

contextBridge.exposeInMainWorld('electronAPI', {
  auth: {
    login: () => ipcRenderer.invoke('auth:login'),
    getStatus: () => ipcRenderer.invoke('auth:get-status'),
    getUserProfile: () => ipcRenderer.invoke('auth:get-user-profile'),
    fetch: (url: string, options?: RequestInit) =>
      ipcRenderer.invoke('auth:fetch', url, options),
    logout: () => ipcRenderer.invoke('auth:logout')
  }
})
```

### Example Usage in Renderer

```typescript
// React component example
function App() {
  const [authStatus, setAuthStatus] = useState({ isAuthenticated: false })
  const [profile, setProfile] = useState(null)

  const handleLogin = async () => {
    try {
      await window.electronAPI.auth.login()

      // Get user profile (main process handles tokens)
      const userProfile = await window.electronAPI.auth.getUserProfile()
      setProfile(userProfile)

      // Update auth status
      const status = await window.electronAPI.auth.getStatus()
      setAuthStatus(status)

    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const fetchCustomData = async () => {
    try {
      // Main process handles authentication
      const data = await window.electronAPI.auth.fetch('https://api.example.com/data')
      console.log('Custom API data:', data)
    } catch (error) {
      console.error('API call failed:', error)
    }
  }

  return (
    <div>
      {!authStatus.isAuthenticated ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <div>
          <p>Logged in as: {profile?.email}</p>
          <button onClick={fetchCustomData}>Fetch Data</button>
        </div>
      )}
    </div>
  )
}
```

---

## Testing Strategy

### Unit Tests for New Methods

```typescript
describe('Auth0Client Production Methods', () => {
  describe('getValidAccessToken', () => {
    it('should return token when valid')
    it('should throw when not authenticated')
    it('should throw when token expired')
    it('should allow 60s grace period')
  })

  describe('getAuthStatus', () => {
    it('should return not authenticated when no tokens')
    it('should return metadata when authenticated')
    it('should calculate expiresIn correctly')
    it('should never return token values')
  })

  describe('getUserProfile', () => {
    it('should fetch profile with valid token')
    it('should throw when not authenticated')
    it('should handle API errors gracefully')
  })

  describe('fetchAuthenticated', () => {
    it('should add Authorization header automatically')
    it('should preserve other headers')
    it('should handle API errors')
    it('should validate authentication first')
  })
})
```

---

## Documentation Updates Needed

### README.md Additions

**Section: Authentication Patterns**
- Explain why tokens aren't exposed to renderer
- Show production patterns (API proxying)
- Provide security rationale
- Link to Auth0 best practices

**Section: Security Considerations**
- Token isolation principles
- When to use `auth:fetch` vs custom handlers
- How to add new authenticated endpoints

**Section: Migration from Demo Code**
- If users have been using `getTokens()` in development
- How to refactor to production patterns

---

## Rollout Plan

### Phase 1: Implement Core Production Pattern
- [ ] Add `getValidAccessToken()` private method
- [ ] Add `getAuthStatus()` public method
- [ ] Add `getUserProfile()` method
- [ ] Add `fetchAuthenticated()` generic method
- [ ] Remove `getTokens()` from public API

### Phase 2: Update IPC Layer
- [ ] Add `auth:get-status` handler
- [ ] Add `auth:get-user-profile` handler
- [ ] Add `auth:fetch` handler
- [ ] Remove `auth:get-tokens` handler
- [ ] Update preload types

### Phase 3: Documentation
- [ ] Add README security section
- [ ] Add code comments explaining patterns
- [ ] Create example usage in App.tsx
- [ ] Update .env.example

### Phase 4: Testing
- [ ] Unit tests for all new methods
- [ ] Integration tests for IPC handlers
- [ ] Update existing tests

---

## Conclusion

The `auth:get-tokens` handler was correctly identified as a security issue, but it's more accurately described as **demo code that doesn't reflect production patterns**.

**Recommendation**: Remove it entirely and replace with production-ready patterns that demonstrate token isolation and API proxying. This makes the template both more secure and more educational.

**Next Step**: Implement the production pattern described above, which addresses M1, M2, and M3 simultaneously while teaching users the correct approach.

---

**Created**: 2025-10-12
**Status**: Proposed for PM approval
**Estimated Effort**: 3-4 hours implementation + 1 hour documentation
