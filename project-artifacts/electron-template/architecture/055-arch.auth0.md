---
layer: project
docType: slice-design
slice: electron-auth0
project: manta-templates
template: electron
dependencies: []
interfaces: []
lastUpdated: 2025-10-02
revision: 2
changes:
  - Added cross-platform protocol handling (macOS/Windows/Linux)
  - Implemented CSRF protection with state parameter
  - Specified electron-store for token persistence
  - Added proactive token refresh strategy
  - Made auth completely optional via feature flag
---

# Slice Design: Auth0 Integration for Electron Template

## Overview

This slice implements **optional** secure Auth0 authentication for the Electron template using OAuth 2.0 best practices with PKCE (Proof Key for Code Exchange) flow. Authentication occurs in the user's external system browser (not embedded webviews), with secure token storage using Electron's built-in safeStorage API. The implementation provides a reusable, production-ready authentication system that maintains Electron security best practices.

**Key Principle: Auth is Optional** - The Electron template must work perfectly without authentication. Auth integration should be:
- Feature-flagged or easily removable
- Not impact template deployment when disabled
- Allow developers to deploy `degit` templates without auth dependencies

### Critical Security & Platform Fixes

This design addresses critical issues identified in peer review:

1. ✅ **Cross-Platform Protocol Handling**
   - macOS: `open-url` event (native)
   - Windows/Linux: `second-instance` + `requestSingleInstanceLock()`
   - Prevents multiple app instances on Windows/Linux

2. ✅ **CSRF Protection with State Parameter**
   - Cryptographically secure state generation
   - State verification with 10-minute timeout
   - Prevents session hijacking and replay attacks

3. ✅ **Explicit Token Storage: electron-store**
   - Cross-platform persistent storage
   - safeStorage encryption (Keychain/DPAPI/kwallet)
   - Graceful fallback when encryption unavailable

4. ✅ **Proactive Token Refresh Strategy**
   - Refresh 5 minutes before expiry
   - Reactive fallback on 401 errors
   - Reduces user-visible auth failures

5. ✅ **Optional Auth Architecture**
   - Feature-flagged via `ENABLE_AUTH` env var
   - Single-instance lock only when auth enabled
   - No forced dependencies for non-auth deployments

## User Value

Developers using the Electron template will have:
- **Secure, production-ready authentication** following OAuth 2.0 and Electron security best practices
- **Seamless user experience** with system browser-based login (familiar Auth0 Universal Login)
- **Cross-platform credential storage** using OS-native secure storage (Keychain/DPAPI/kwallet)
- **Offline support** with secure token persistence and refresh capabilities
- **Clear integration patterns** for protecting routes and accessing user data in React components

## Technical Scope

### In Scope
- **Optional auth feature structure** - cleanly separable from core template
- Auth0 OAuth 2.0 + PKCE authorization code flow with **state parameter** (CSRF protection)
- **Cross-platform protocol handling** (macOS `open-url`, Windows/Linux `second-instance`)
- External browser authentication flow via `shell.openExternal()`
- Custom URL protocol (`electronapp://`) callback handling
- Secure token storage using Electron `safeStorage` API + **electron-store**
- **Single-instance lock** (when auth enabled) to handle protocol callbacks
- IPC bridge for auth state and operations (login/logout/token access)
- React context provider for auth state in renderer
- Auth guard components for protected routes
- **Proactive token refresh** (5 min before expiry) with reactive fallback
- Offline authentication state management
- Auth0 Native application configuration guide
- **Graceful degradation** when safeStorage encryption unavailable

### Out of Scope
- User profile management UI (beyond basic display)
- Role-based access control (RBAC) implementation
- Multi-tenant support
- Social login provider-specific customization
- Backend API integration patterns (separate slice/guide if needed)
- Auth0 Actions/Rules customization

## Dependencies

### Prerequisites
- Electron template base (already complete)
- React Router for navigation (already in place)
- Existing IPC patterns and security model (context isolation, preload scripts)

### External Dependencies
- **Auth0 account** with Native Application configured (only when auth enabled)
- **electron-store** - for persistent encrypted token storage
- **No native modules required** - uses built-in Electron APIs only

### Interfaces Required
- Existing React Router for route protection
- Existing IPC communication patterns (preload/contextBridge)
- Existing Electron main process (for protocol handling and storage)

## Architecture

### Component Structure

```
src/
├── main/
│   ├── auth/
│   │   ├── auth0-client.ts          # Auth0 PKCE flow logic
│   │   ├── token-storage.ts         # safeStorage wrapper for tokens
│   │   ├── protocol-handler.ts      # Custom protocol registration/handling
│   │   └── auth-ipc-handlers.ts     # IPC handlers for auth operations
│   └── main.ts                       # Register protocol & IPC handlers
│
├── preload/
│   └── auth-bridge.ts                # Expose auth APIs to renderer via contextBridge
│
└── renderer/
    └── lib/
        └── auth/
            ├── AuthContext.tsx       # React context for auth state
            ├── AuthProvider.tsx      # Provider component
            ├── useAuth.ts            # Auth hook for components
            ├── AuthGuard.tsx         # Protected route wrapper
            └── types.ts              # Auth-related TypeScript types
```

### Process Interaction Model

```
┌─────────────────────────────────────────────────────────────┐
│                      User Initiates Login                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Renderer Process (React)                                    │
│  - User clicks "Login" button                                │
│  - Calls window.electronAPI.auth.login()                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (IPC invoke)
┌─────────────────────────────────────────────────────────────┐
│  Main Process                                                │
│  1. Generate PKCE code_verifier + code_challenge             │
│  2. Build Auth0 authorization URL                            │
│  3. Store verifier in memory (session state)                 │
│  4. shell.openExternal(authUrl) → System Browser            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  External System Browser                                     │
│  - User authenticates with Auth0 Universal Login             │
│  - Auth0 redirects to: electronapp://callback?code=xxx       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (OS handles protocol)
┌─────────────────────────────────────────────────────────────┐
│  Main Process - Protocol Handler                             │
│  1. Intercepts electronapp:// URL                            │
│  2. Extracts authorization code                              │
│  3. Exchange code for tokens (with stored PKCE verifier)     │
│  4. Store tokens securely via safeStorage                    │
│  5. Emit 'auth-state-changed' event to renderer              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (IPC event)
┌─────────────────────────────────────────────────────────────┐
│  Renderer Process (React)                                    │
│  - AuthContext receives auth state update                    │
│  - UI updates to show authenticated state                    │
│  - Protected routes become accessible                        │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

#### Login Flow
1. **Renderer → Main**: User clicks login → `auth.login()` IPC call
2. **Main Process**:
   - Generates PKCE challenge/verifier pair
   - Stores verifier in memory
   - Builds Auth0 authorization URL
   - Opens external browser
3. **External Browser**: Auth0 authentication → redirects to `electronapp://callback?code=xxx`
4. **Main Process**:
   - Protocol handler captures callback
   - Exchanges code for tokens using stored verifier
   - Validates and stores tokens via safeStorage
   - Emits auth state change to renderer
5. **Renderer**: Updates UI, enables protected features

#### Token Refresh Flow
1. **Main Process**: Detects token expiration (periodic check or on-demand)
2. Retrieves refresh token from safeStorage
3. Calls Auth0 token endpoint
4. Updates stored tokens
5. Emits state change to renderer

#### Logout Flow
1. **Renderer → Main**: User clicks logout → `auth.logout()` IPC call
2. **Main Process**:
   - Clears tokens from safeStorage
   - Optionally calls Auth0 logout endpoint
   - Opens browser to Auth0 logout URL (clears Auth0 session)
   - Emits auth state change
3. **Renderer**: Updates UI to logged-out state

### State Management

#### Main Process State
- **In-Memory Session State**:
  - Current PKCE verifier (during auth flow only)
  - Auth state flags (isAuthenticated)
  - Token refresh timers
- **Persistent Secure Storage** (via safeStorage):
  - Access token (encrypted)
  - Refresh token (encrypted)
  - ID token (encrypted)
  - Token metadata (expiry, etc.)

#### Renderer Process State
- **React Context State**:
  - `isAuthenticated: boolean`
  - `isLoading: boolean`
  - `user: UserProfile | null`
  - `error: string | null`
- **Never stores**: Raw tokens (retrieved on-demand via IPC)

## Technical Decisions

### Technology Choices

#### 1. **Electron safeStorage API** (NOT keytar)
- **Rationale**:
  - Keytar is deprecated and unmaintained
  - safeStorage is built into Electron (no native dependencies)
  - Uses OS-native encryption: Keychain (macOS), DPAPI (Windows), kwallet/libsecret (Linux)
  - Zero additional build complexity
- **Alternative Considered**: keytar - rejected due to deprecation and build issues

#### 2. **Custom URL Protocol** (`electronapp://`)
- **Rationale**:
  - Industry standard for native app OAuth callbacks
  - Works reliably across all platforms
  - No port conflicts or firewall issues
  - Secure against redirect attacks
- **Alternative Considered**: Loopback server (localhost) - viable but adds complexity

#### 3. **External Browser Authentication** (shell.openExternal)
- **Rationale**:
  - OAuth 2.0 best practice for native apps (RFC 8252)
  - Auth0 strongly recommends external browser
  - Prevents security risks of embedded webviews
  - Better UX (familiar browser environment, password managers work)
- **Alternative Considered**: Embedded BrowserWindow - **REJECTED for security**

#### 4. **PKCE (Proof Key for Code Exchange)**
- **Rationale**:
  - Required for public clients (no client secret)
  - Prevents authorization code interception
  - Auth0 Native apps require PKCE
- **Alternative**: Implicit flow - deprecated and insecure

#### 5. **Token Storage Strategy**
- Access tokens: Encrypted via safeStorage, never exposed to renderer
- Refresh tokens: Encrypted via safeStorage, used only in main process
- ID tokens: Encrypted via safeStorage, decoded in main, user info sent to renderer
- **Never** store in: localStorage, sessionStorage, files, renderer memory

### Patterns and Conventions

#### File Naming
- Auth-related main process files: `src/main/auth/*.ts`
- Auth IPC bridge: `src/preload/auth-bridge.ts`
- Auth React components: `src/renderer/lib/auth/*.tsx`

#### IPC Channel Naming
```typescript
// Pattern: 'auth:{operation}'
'auth:login'           // Initiate login flow
'auth:logout'          // Logout user
'auth:get-user'        // Get user profile
'auth:get-token'       // Get access token (for API calls)
'auth:refresh'         // Force token refresh
'auth:state-changed'   // Event: auth state changed (main → renderer)
```

#### Error Handling
- Main process: Detailed logging, structured errors returned via IPC
- Renderer: User-friendly error messages in UI
- Network errors: Retry logic for token refresh (3 attempts)
- Auth errors: Clear session, force re-login

## Implementation Details

### Auth0 Configuration

#### Native Application Setup
```yaml
Application Type: Native
Application Name: Electron Template App
Allowed Callback URLs: electronapp://callback
Allowed Logout URLs: electronapp://logout
Token Endpoint Authentication Method: None (PKCE)
Grant Types: Authorization Code, Refresh Token
```

#### Required Auth0 Settings
```typescript
// src/main/auth/auth0-config.ts
export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  audience: process.env.AUTH0_AUDIENCE, // Optional, for API access
  scope: 'openid profile email offline_access',
  redirectUri: 'electronapp://callback',
  logoutRedirectUri: 'electronapp://logout'
}
```

### Auth0 Client with PKCE + State (CSRF Protection)

```typescript
// src/main/auth/auth0-client.ts
import crypto from 'crypto'
import { shell } from 'electron'

interface AuthState {
  state: string
  codeVerifier: string
  timestamp: number
}

class Auth0Client {
  private pendingAuthState: AuthState | null = null
  private readonly STATE_TIMEOUT = 10 * 60 * 1000 // 10 minutes

  /**
   * Initiate login flow with PKCE and state parameter
   */
  async login(): Promise<void> {
    // Generate PKCE code verifier and challenge
    const codeVerifier = this.generateRandomString(128)
    const codeChallenge = await this.generateCodeChallenge(codeVerifier)

    // Generate state parameter for CSRF protection
    const state = this.generateRandomString(32)

    // Store state and verifier for callback verification
    this.pendingAuthState = {
      state,
      codeVerifier,
      timestamp: Date.now()
    }

    // Build authorization URL
    const authUrl = new URL(`https://${auth0Config.domain}/authorize`)
    authUrl.searchParams.set('client_id', auth0Config.clientId)
    authUrl.searchParams.set('redirect_uri', auth0Config.redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('code_challenge', codeChallenge)
    authUrl.searchParams.set('code_challenge_method', 'S256')
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('scope', auth0Config.scope)

    if (auth0Config.audience) {
      authUrl.searchParams.set('audience', auth0Config.audience)
    }

    // Open in external browser
    await shell.openExternal(authUrl.toString())
  }

  /**
   * Handle OAuth callback with state and PKCE verification
   */
  async handleCallback(callbackUrl: string): Promise<void> {
    const url = new URL(callbackUrl)
    const code = url.searchParams.get('code')
    const receivedState = url.searchParams.get('state')

    // Verify state parameter (CSRF protection)
    if (!this.verifyState(receivedState)) {
      throw new Error('Invalid state parameter - possible CSRF attack')
    }

    if (!code) {
      throw new Error('No authorization code received')
    }

    // Exchange code for tokens using PKCE verifier
    const tokens = await this.exchangeCodeForTokens(
      code,
      this.pendingAuthState!.codeVerifier
    )

    // Clear pending state after successful exchange
    this.pendingAuthState = null

    // Store tokens securely
    await tokenStorage.save(tokens)

    // Emit auth state change
    this.emitAuthStateChanged({ isAuthenticated: true, user: decodeToken(tokens.idToken) })
  }

  /**
   * Verify state parameter and timeout
   */
  private verifyState(receivedState: string | null): boolean {
    if (!this.pendingAuthState || !receivedState) {
      return false
    }

    // Check timeout (prevent replay attacks)
    const elapsed = Date.now() - this.pendingAuthState.timestamp
    if (elapsed > this.STATE_TIMEOUT) {
      this.pendingAuthState = null
      return false
    }

    // Verify state matches
    return receivedState === this.pendingAuthState.state
  }

  /**
   * Generate cryptographically secure random string
   */
  private generateRandomString(length: number): string {
    return crypto.randomBytes(length).toString('base64url')
  }

  /**
   * Generate PKCE code challenge from verifier
   */
  private async generateCodeChallenge(verifier: string): Promise<string> {
    const hash = crypto.createHash('sha256')
    hash.update(verifier)
    return hash.digest('base64url')
  }

  /**
   * Exchange authorization code for tokens
   */
  private async exchangeCodeForTokens(code: string, codeVerifier: string) {
    const response = await fetch(`https://${auth0Config.domain}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: auth0Config.clientId,
        code,
        code_verifier: codeVerifier,
        redirect_uri: auth0Config.redirectUri
      })
    })

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`)
    }

    return response.json()
  }
}
```

**Critical Security Elements:**
- ✅ **State parameter** prevents CSRF attacks
- ✅ **State timeout** (10 min) prevents replay attacks
- ✅ **PKCE verifier** stored in memory only (never persisted)
- ✅ **Cryptographically secure random** strings via crypto.randomBytes
- ✅ **State verification** before token exchange

### Token Storage Implementation

```typescript
// src/main/auth/token-storage.ts
import { safeStorage } from 'electron'
import Store from 'electron-store'

interface TokenSet {
  accessToken: string
  refreshToken: string
  idToken: string
  expiresAt: number
}

class TokenStorage {
  private readonly store: Store
  private readonly storageKey = 'electron_auth_tokens'
  private encryptionAvailable: boolean

  constructor() {
    this.store = new Store({
      name: 'auth-tokens',
      clearInvalidConfig: true
    })

    // Check if encryption is available at initialization
    this.encryptionAvailable = safeStorage.isEncryptionAvailable()

    if (!this.encryptionAvailable) {
      console.warn(
        'WARNING: OS-level encryption unavailable. Tokens will be stored unencrypted. ' +
        'On Linux, install gnome-keyring or kwallet.'
      )
    }
  }

  async save(tokens: TokenSet): Promise<void> {
    if (this.encryptionAvailable) {
      const encrypted = safeStorage.encryptString(JSON.stringify(tokens))
      this.store.set(this.storageKey, encrypted.toString('base64'))
    } else {
      // Fallback: store unencrypted with warning flag
      this.store.set(this.storageKey, {
        data: tokens,
        unencrypted: true
      })
    }
  }

  async load(): Promise<TokenSet | null> {
    const stored = this.store.get(this.storageKey) as string | { data: TokenSet; unencrypted: boolean } | undefined

    if (!stored) return null

    if (typeof stored === 'string' && this.encryptionAvailable) {
      // Encrypted storage
      const buffer = Buffer.from(stored, 'base64')
      const decrypted = safeStorage.decryptString(buffer)
      return JSON.parse(decrypted)
    } else if (typeof stored === 'object' && stored.unencrypted) {
      // Unencrypted fallback
      return stored.data
    }

    return null
  }

  async clear(): Promise<void> {
    this.store.delete(this.storageKey)
  }

  isEncryptionAvailable(): boolean {
    return this.encryptionAvailable
  }
}
```

**Token Storage Notes:**
- Uses **electron-store** for cross-platform persistence
- Primary: OS-level encryption via safeStorage (Keychain/DPAPI/kwallet)
- Fallback: Unencrypted storage with warning if encryption unavailable
- Check `isEncryptionAvailable()` to warn users about security implications

### Protocol Handler Implementation (Cross-Platform)

```typescript
// src/main/auth/protocol-handler.ts
import { app, protocol } from 'electron'

export function registerAuthProtocol() {
  // Must be called before app.ready
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'electronapp',
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: false,
        corsEnabled: false
      }
    }
  ])

  // Register as default protocol client (Windows/Linux)
  if (process.platform !== 'darwin') {
    app.setAsDefaultProtocolClient('electronapp')
  }
}

export function setupAuthProtocolHandler(authClient: Auth0Client) {
  if (process.platform === 'darwin') {
    // macOS: use open-url event
    app.on('open-url', async (event, url) => {
      event.preventDefault()
      await handleAuthUrl(authClient, url)
    })
  } else {
    // Windows/Linux: Handle second-instance launches
    const gotTheLock = app.requestSingleInstanceLock()

    if (!gotTheLock) {
      app.quit()
      return
    }

    app.on('second-instance', (event, commandLine) => {
      // commandLine contains the protocol URL
      const url = commandLine.find(arg => arg.startsWith('electronapp://'))
      if (url) {
        handleAuthUrl(authClient, url)
      }

      // Focus the main window
      focusMainWindow()
    })
  }
}

async function handleAuthUrl(authClient: Auth0Client, url: string) {
  if (url.startsWith('electronapp://callback')) {
    await authClient.handleCallback(url)
  } else if (url.startsWith('electronapp://logout')) {
    await authClient.handleLogoutCallback(url)
  }
}
```

**Critical Platform Notes:**
- **macOS**: Uses `open-url` event - works out of the box
- **Windows/Linux**: Requires `requestSingleInstanceLock()` to prevent multiple app instances
- **Windows/Linux**: Protocol URL comes through `commandLine` in `second-instance` event
- **Single-instance lock**: Only applied when auth is enabled (see Configuration section)

### IPC Bridge Implementation

```typescript
// src/preload/auth-bridge.ts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  auth: {
    login: () => ipcRenderer.invoke('auth:login'),
    logout: () => ipcRenderer.invoke('auth:logout'),
    getUser: () => ipcRenderer.invoke('auth:get-user'),
    getAccessToken: () => ipcRenderer.invoke('auth:get-token'),
    refresh: () => ipcRenderer.invoke('auth:refresh'),
    onAuthStateChanged: (callback: (state: AuthState) => void) => {
      ipcRenderer.on('auth:state-changed', (_, state) => callback(state))
    }
  }
})
```

### React Integration

```typescript
// src/renderer/lib/auth/AuthContext.tsx
interface AuthContextValue {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserProfile | null
  error: string | null
  login: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

// src/renderer/lib/auth/AuthProvider.tsx
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null
  })

  useEffect(() => {
    // Initialize auth state
    window.electronAPI.auth.getUser().then(user => {
      setAuthState({
        isAuthenticated: !!user,
        isLoading: false,
        user,
        error: null
      })
    })

    // Listen for auth state changes
    window.electronAPI.auth.onAuthStateChanged((state) => {
      setAuthState(state)
    })
  }, [])

  const login = async () => {
    try {
      await window.electronAPI.auth.login()
      // State update will come via onAuthStateChanged
    } catch (error) {
      setAuthState(prev => ({ ...prev, error: error.message }))
    }
  }

  const logout = async () => {
    await window.electronAPI.auth.logout()
    // State update will come via onAuthStateChanged
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// src/renderer/lib/auth/AuthGuard.tsx
export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <LoadingSpinner />
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return <>{children}</>
}
```

## Integration Points

### Provides to Other Slices
- **Auth Context**: React context with user state and auth methods
- **Auth Hook**: `useAuth()` hook for any component
- **Auth Guard**: `<AuthGuard>` component for protecting routes
- **Token Access**: IPC method to get access token for API calls
- **Type Definitions**: Shared TypeScript types for auth state and user profile

### Consumes from Other Slices
- **React Router**: For navigation and route protection
- **Existing IPC patterns**: Uses established contextBridge/IPC patterns
- **App protocol handler**: Integrates with existing protocol setup (if any)

### External Service Integration
- **Auth0 API**: Authorization, token exchange, token refresh endpoints
- **Error Handling**: If Auth0 is unreachable, gracefully handles with user messaging
- **Offline Mode**: Persisted tokens allow offline app usage until expiration

## Success Criteria

### Functional Requirements
- ✅ User can log in via external browser with Auth0 Universal Login
- ✅ User can log out and session is properly cleared
- ✅ Tokens are securely stored and never exposed to renderer process
- ✅ Token refresh works automatically before expiration
- ✅ Protected routes redirect to login when unauthenticated
- ✅ Auth state persists across app restarts (until token expiry)
- ✅ Offline authentication works with valid stored tokens
- ✅ User profile data is accessible in React components

### Technical Requirements
- ✅ Zero native dependencies (only Electron built-in APIs)
- ✅ Full TypeScript type safety for auth APIs
- ✅ Context isolation and secure IPC patterns maintained
- ✅ No embedded webviews or BrowserWindow for authentication
- ✅ PKCE flow properly implemented with code verifier/challenge
- ✅ Cross-platform support (macOS, Windows, Linux)
- ✅ Error handling with user-friendly messages
- ✅ Unit tests for auth client and token storage (80%+ coverage)

### Integration Requirements
- ✅ Auth0 Native app configuration documented
- ✅ Environment variable setup guide provided
- ✅ Custom protocol registration works on all platforms
- ✅ Seamless integration with existing Electron template structure
- ✅ No breaking changes to existing template code
- ✅ React components can easily access auth state via hook

### Documentation Requirements
- ✅ Auth0 setup guide with step-by-step configuration
- ✅ Environment variable configuration (.env.example)
- ✅ API documentation for all IPC channels
- ✅ React integration guide with example components
- ✅ Security best practices documented
- ✅ Troubleshooting guide for common issues

## Risk Assessment

### Technical Risks

**Risk: Custom protocol registration fails on some platforms**
- **Likelihood**: Low (well-established pattern)
- **Impact**: High (auth won't work)
- **Mitigation**:
  - ✅ **FIXED**: Cross-platform protocol handling implemented
    - macOS: `open-url` event
    - Windows/Linux: `second-instance` with `requestSingleInstanceLock()`
  - Test on all platforms early
  - Provide fallback to loopback server if protocol fails
  - Clear error messaging with manual setup instructions

**Risk: CSRF attacks via callback manipulation**
- **Likelihood**: Medium (without state parameter)
- **Impact**: High (session hijacking)
- **Mitigation**:
  - ✅ **FIXED**: State parameter implemented with timeout
  - ✅ Cryptographically secure random state generation
  - ✅ State verification before token exchange
  - ✅ 10-minute timeout prevents replay attacks

**Risk: safeStorage unavailable on some Linux configurations**
- **Likelihood**: Medium (depends on desktop environment)
- **Impact**: Medium (tokens stored unencrypted)
- **Mitigation**:
  - ✅ **FIXED**: `isEncryptionAvailable()` check at startup
  - ✅ Fallback to unencrypted storage with warning
  - ✅ User notification when encryption unavailable
  - Document Linux dependencies (gnome-keyring, kwallet)

**Risk: Token storage implementation unclear**
- **Likelihood**: High (design gap)
- **Impact**: Medium (inconsistent implementation)
- **Mitigation**:
  - ✅ **FIXED**: electron-store specified as storage backend
  - ✅ Complete implementation with encryption fallback
  - ✅ Cross-platform persistence handled

**Risk: Token refresh fails during offline periods**
- **Likelihood**: Medium (network-dependent)
- **Impact**: Low (user re-authenticates)
- **Mitigation**:
  - Implement exponential backoff retry
  - Allow graceful degradation with expired tokens
  - Clear UX for "session expired" state

### Integration Risks

**Risk: Auth0 rate limiting during development/testing**
- **Likelihood**: Low-Medium
- **Impact**: Low (temporary)
- **Mitigation**:
  - Use separate Auth0 tenant for development
  - Implement proper token caching
  - Document rate limits

**Risk: Breaking changes in Auth0 API**
- **Likelihood**: Low (stable API)
- **Impact**: Medium
- **Mitigation**:
  - Pin Auth0 SDK versions
  - Monitor Auth0 changelog
  - Abstract Auth0 client behind interface for easier swapping

### Security Risks

**Risk: Token exposure via insecure logging**
- **Likelihood**: Medium (developer error)
- **Impact**: Critical
- **Mitigation**:
  - Never log tokens in production
  - Redact sensitive data in error logs
  - Code review checklist includes token handling

**Risk: Redirect URI manipulation**
- **Likelihood**: Low
- **Impact**: Medium
- **Mitigation**:
  - Validate redirect URIs in callback handler
  - Use state parameter for CSRF protection
  - Strict URL parsing and validation

## Implementation Notes

### Development Approach

#### Phase 1: Core Auth Flow (Effort: 3/5)
1. Set up Auth0 Native app configuration
2. Implement PKCE challenge/verifier generation
3. Create custom protocol registration and handling
4. Implement token exchange logic
5. Test login flow end-to-end

#### Phase 2: Secure Storage (Effort: 2/5)
1. Implement safeStorage token wrapper
2. Add token persistence (electron-store or file-based)
3. Test encryption/decryption on all platforms
4. Add fallback for unavailable encryption

#### Phase 3: IPC Bridge (Effort: 2/5)
1. Create auth IPC handlers in main process
2. Implement preload script auth bridge
3. Add TypeScript type definitions
4. Test IPC communication

#### Phase 4: React Integration (Effort: 2/5)
1. Create AuthContext and AuthProvider
2. Implement useAuth hook
3. Create AuthGuard component
4. Add example protected route

#### Phase 5: Token Management (Effort: 3/5)
1. Implement token refresh logic
2. Add expiration checking and auto-refresh
3. Implement logout with Auth0 session clearing
4. Handle edge cases (offline, network errors)

#### Phase 6: Testing & Documentation (Effort: 3/5)
1. Unit tests for auth client and storage
2. Integration tests for full auth flow
3. Write Auth0 configuration guide
4. Document API and usage examples

### Testing Strategy
- **Unit Tests**: Auth client, token storage, PKCE generation
- **Integration Tests**: Full login/logout flows, token refresh
- **Platform Tests**: Custom protocol on macOS, Windows, Linux
- **Security Tests**: Token encryption, secure IPC, no token leakage
- **Manual Tests**: User flows, error scenarios, offline mode

### Special Considerations

#### Platform-Specific Protocol Registration
- **macOS**: Set CFBundleURLTypes in Info.plist (electron-builder handles this)
- **Windows**: Registry keys (electron-builder handles this)
- **Linux**: .desktop file with MimeType (electron-builder handles this)

#### Environment Variables
```bash
# .env.example
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_AUDIENCE=https://your-api.com  # Optional
```

#### Security Checklist
- ✅ Context isolation enabled
- ✅ Node integration disabled in renderer
- ✅ No tokens in renderer process memory
- ✅ External browser for authentication
- ✅ PKCE for code exchange
- ✅ Encrypted token storage
- ✅ HTTPS-only Auth0 communication
- ✅ Secure IPC channel naming
- ✅ Input validation on all IPC handlers
- ✅ CSP headers maintained

#### Performance Considerations
- **Token refresh strategy**: Proactive (5 min before expiry) with reactive (401) fallback
  - Set timer for `expiresAt - 300 seconds`
  - If timer fires: refresh proactively
  - If API returns 401: refresh reactively
  - Reduces user-visible auth failures
- Storage: Minimal disk I/O, cache user data in memory
- IPC: Batch auth state updates to avoid excessive renderer updates

#### Optional Auth Configuration

Auth must be **completely optional** and easily removable:

```typescript
// src/main/main.ts
const AUTH_ENABLED = process.env.ENABLE_AUTH === 'true'

function createWindow() {
  const win = new BrowserWindow({ /* ... */ })

  if (AUTH_ENABLED) {
    // Only set up auth if explicitly enabled
    setupAuthProtocolHandler(authClient)
    registerAuthIPC()
  }

  // ... rest of setup
}

// Protocol registration (before app.ready)
if (AUTH_ENABLED) {
  registerAuthProtocol()
}

// Single-instance lock (Windows/Linux) - only if auth enabled
if (AUTH_ENABLED && process.platform !== 'darwin') {
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', handleSecondInstance)
  }
}
```

**Environment Configuration:**
```bash
# .env
ENABLE_AUTH=false  # Default: disabled

# When auth is enabled:
ENABLE_AUTH=true
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_AUDIENCE=https://your-api.com
```

**Template Deployment Options:**
1. **Default template**: Auth code present but disabled by default
2. **CLI flag** (future): `npx degit ... --auth=true` to enable
3. **Manual removal**: Clear instructions to remove auth files if unwanted
4. **No auth dependencies**: electron-store only installed if auth enabled

### Key Milestones
1. ✅ Auth0 config and PKCE flow working
2. ✅ External browser login functional
3. ✅ Custom protocol callback handling works
4. ✅ Tokens securely stored and retrieved
5. ✅ React components have auth state
6. ✅ Token refresh works automatically
7. ✅ All platforms tested and working
8. ✅ Documentation complete

## Offline Support Strategy

Following the UnoSquare guide pattern:
1. **On app launch**: Check for stored valid tokens via safeStorage
2. **If valid tokens exist**: Set authenticated state without network call
3. **If tokens expired**: Attempt refresh if network available
4. **If offline with expired tokens**: Show "session expired, login when online" message
5. **Token validation**: Decode and check expiry client-side before use
6. **User data caching**: Store decoded ID token claims for offline profile access

This ensures users can launch and use the app offline as long as tokens haven't expired.
