---
item: auth0-core-flow
project: manta-templates
template: electron
type: slice
dependencies: []
projectState: Electron template base complete - no auth implemented
status: not started
lastUpdated: 2025-10-02
---

# Slice 110: Auth0 Core OAuth Flow (macOS MVP)

## Overview

Implements the core Auth0 OAuth 2.0 + PKCE authentication flow for macOS only. This slice establishes the fundamental login flow using external browser authentication, PKCE security, CSRF protection via state parameter, and basic in-memory token storage. Subsequent slices will add persistent storage, UI integration, and cross-platform support.

**MVP Focus**: Get the OAuth flow working end-to-end on macOS with proper security (PKCE + state parameter).

## User Value

Developers will have:
- Working OAuth 2.0 login flow on macOS
- Secure external browser authentication (no embedded webviews)
- PKCE + state parameter security (production-grade)
- Foundation for building full auth system

## Technical Scope

### In Scope
- PKCE code verifier/challenge generation (SHA-256)
- State parameter generation and verification (CSRF protection)
- macOS-only protocol handling (`open-url` event)
- Custom URL protocol registration (`electronapp://`)
- External browser login via `shell.openExternal()`
- OAuth authorization code exchange for tokens
- Basic in-memory token storage (AuthState class)
- Minimal IPC for triggering login
- Token structure and types definition
- **Preload bridge** for secure IPC exposure to renderer
- **Optional test UI component** for manual testing
- **Debug logging** (development mode only)

### Out of Scope
- Windows/Linux protocol handling (Slice 114)
- Persistent token storage (Slice 111)
- Full IPC bridge (Slice 112)
- React UI integration (Slice 112)
- Token refresh logic (Slice 113)
- Logout flow (Slice 113)
- Proactive token refresh (Slice 115)

## Dependencies

### Prerequisites
- Electron template base (complete)
- Auth0 account with Native application configured
- macOS development environment

### External Dependencies
- **Auth0 Native Application** configured with:
  - Callback URL: `electronapp://callback`
  - Grant type: Authorization Code + PKCE
  - No client secret (public client)

### Tool Guides
- `/project-documents/tool-guides/electron/guide.electron-auth0.md`
- `/project-documents/tool-guides/electron/introduction.md`

## Architecture

### Component Structure

```
src/main/auth/
├── auth0-config.ts          # Auth0 configuration (domain, clientId, etc)
├── auth0-client.ts          # Core OAuth flow with PKCE + state
├── pkce.ts                  # PKCE generation utilities
└── protocol-handler.ts      # macOS protocol registration + handling

src/main/
└── main.ts                  # Register protocol, basic IPC handlers

src/preload/
└── preload.ts               # Expose auth APIs via contextBridge

src/renderer/ (optional test UI)
└── TestAuth.tsx             # Simple test component for manual testing
```

### Data Flow: Login Sequence

```
1. User Action (manual trigger for now)
   → IPC invoke 'auth:login' from renderer

2. Main Process (Auth0Client)
   → Generate PKCE verifier (128 bytes, base64url)
   → Generate code challenge (SHA256 of verifier)
   → Generate state parameter (32 bytes, base64url)
   → Store { state, codeVerifier, timestamp } in memory
   → Build Auth0 authorization URL
   → shell.openExternal(authUrl)

3. External Browser
   → User authenticates with Auth0
   → Auth0 redirects: electronapp://callback?code=xxx&state=yyy

4. macOS Protocol Handler (open-url event)
   → Extract code and state from URL
   → Verify state matches stored value (CSRF check)
   → Verify state not expired (10 min timeout)
   → Exchange code for tokens with PKCE verifier
   → Store tokens in memory (AuthState)
   → Log success (console for now)

5. Success State
   → Tokens in memory
   → Ready for slice 111 (persistent storage)
```

## Technical Decisions

### 1. PKCE Implementation
- **Verifier**: 128-byte random string, base64url encoded
- **Challenge**: SHA-256 hash of verifier, base64url encoded
- **Method**: S256 (SHA-256)
- **Library**: Node.js `crypto` module (no dependencies)

**Rationale**: Industry standard for public clients, prevents authorization code interception.

### 2. State Parameter (CSRF Protection)
- **Generation**: 32-byte random string via `crypto.randomBytes()`
- **Encoding**: base64url
- **Timeout**: 10 minutes (prevent replay attacks)
- **Storage**: In-memory only during auth flow

**Rationale**: Required for OAuth security, prevents CSRF attacks on callback URL.

### 3. macOS Protocol Handling
- **Event**: `app.on('open-url')`
- **Scheme**: `electronapp://`
- **Registration**: `protocol.registerSchemesAsPrivileged()` before app.ready
- **Default Handler**: `app.setAsDefaultProtocolClient('electronapp')` AFTER app.ready

**Rationale**: macOS native support, no single-instance lock needed (unlike Windows/Linux). Must register as default handler after app is ready on macOS.

### 4. Token Storage (Slice 110 Only)
- **Storage**: In-memory JavaScript object
- **Structure**: `{ accessToken, refreshToken, idToken, expiresAt }`
- **Persistence**: None (Slice 111 will add)

**Rationale**: Proves OAuth flow works before adding encryption/persistence complexity.

### 5. External Browser (shell.openExternal)
- **Method**: `shell.openExternal(authUrl)`
- **Browser**: System default
- **Security**: No embedded webviews (OAuth 2.0 best practice)

**Rationale**: RFC 8252 requirement for native apps, Auth0 recommendation.

## Implementation Details

### File: `src/main/auth/pkce.ts`

```typescript
import crypto from 'crypto'

export function generatePKCEPair(): { verifier: string; challenge: string } {
  // Generate random verifier (128 bytes)
  const verifier = crypto.randomBytes(128).toString('base64url')

  // Generate SHA-256 challenge
  const hash = crypto.createHash('sha256')
  hash.update(verifier)
  const challenge = hash.digest('base64url')

  return { verifier, challenge }
}

export function generateState(): string {
  return crypto.randomBytes(32).toString('base64url')
}
```

### File: `src/main/auth/auth0-config.ts`

```typescript
export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'openid profile email offline_access',
  redirectUri: 'electronapp://callback',
}

// Validation with helpful error message
if (!auth0Config.domain || !auth0Config.clientId) {
  console.error(
    '\n❌ Auth0 Configuration Error:\n' +
    '   AUTH0_DOMAIN and AUTH0_CLIENT_ID must be set in .env\n' +
    '   See .env.example for required variables\n'
  )
  throw new Error('Missing Auth0 configuration')
}
```

### File: `src/main/auth/auth0-client.ts`

```typescript
import { shell } from 'electron'
import { generatePKCEPair, generateState } from './pkce'
import { auth0Config } from './auth0-config'

interface PendingAuth {
  state: string
  codeVerifier: string
  timestamp: number
}

interface TokenSet {
  accessToken: string
  refreshToken: string
  idToken: string
  expiresAt: number
}

class Auth0Client {
  private pendingAuth: PendingAuth | null = null
  private tokens: TokenSet | null = null
  private readonly STATE_TIMEOUT = 10 * 60 * 1000 // 10 minutes
  private readonly debug = process.env.NODE_ENV === 'development'

  async login(): Promise<void> {
    const { verifier, challenge } = generatePKCEPair()
    const state = generateState()

    // Store for verification
    this.pendingAuth = {
      state,
      codeVerifier: verifier,
      timestamp: Date.now()
    }

    // Build authorization URL
    const authUrl = new URL(`https://${auth0Config.domain}/authorize`)
    authUrl.searchParams.set('client_id', auth0Config.clientId)
    authUrl.searchParams.set('redirect_uri', auth0Config.redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('code_challenge', challenge)
    authUrl.searchParams.set('code_challenge_method', 'S256')
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('scope', auth0Config.scope)

    if (auth0Config.audience) {
      authUrl.searchParams.set('audience', auth0Config.audience)
    }

    if (this.debug) {
      console.log('🔐 Auth URL:', authUrl.toString())
      console.log('📋 State:', state)
      console.log('🔑 Code Challenge:', challenge.substring(0, 20) + '...')
    }

    console.log('Opening auth URL in browser...')
    await shell.openExternal(authUrl.toString())
  }

  async handleCallback(callbackUrl: string): Promise<void> {
    const url = new URL(callbackUrl)

    // Check for error response from Auth0 (user denied, etc.)
    const error = url.searchParams.get('error')
    if (error) {
      const errorDesc = url.searchParams.get('error_description')
      this.pendingAuth = null // Clear pending state
      throw new Error(`Auth0 error: ${error} - ${errorDesc || 'Unknown error'}`)
    }

    const code = url.searchParams.get('code')
    const receivedState = url.searchParams.get('state')

    // Verify state (CSRF protection)
    if (!this.verifyState(receivedState)) {
      throw new Error('Invalid state parameter - possible CSRF attack')
    }

    if (!code) {
      throw new Error('No authorization code in callback')
    }

    // Exchange code for tokens
    const tokens = await this.exchangeCodeForTokens(
      code,
      this.pendingAuth!.codeVerifier
    )

    // Store in memory
    this.tokens = tokens
    this.pendingAuth = null

    console.log('✅ Login successful! Tokens stored in memory.')
    console.log('Token expiry:', new Date(tokens.expiresAt))
  }

  private verifyState(receivedState: string | null): boolean {
    if (!this.pendingAuth || !receivedState) {
      return false
    }

    // Check timeout
    const elapsed = Date.now() - this.pendingAuth.timestamp
    if (elapsed > this.STATE_TIMEOUT) {
      this.pendingAuth = null
      return false
    }

    // Verify match
    return receivedState === this.pendingAuth.state
  }

  private async exchangeCodeForTokens(
    code: string,
    codeVerifier: string
  ): Promise<TokenSet> {
    const response = await fetch(
      `https://${auth0Config.domain}/oauth/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: auth0Config.clientId,
          code,
          code_verifier: codeVerifier,
          redirect_uri: auth0Config.redirectUri
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Token exchange failed: ${error}`)
    }

    const data = await response.json()

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      idToken: data.id_token,
      expiresAt: Date.now() + ((data.expires_in || 3600) * 1000) // Default 1 hour
    }
  }

  // For debugging/testing
  getTokens(): TokenSet | null {
    return this.tokens
  }
}

export const auth0Client = new Auth0Client()
```

### File: `src/main/auth/protocol-handler.ts`

```typescript
import { app, protocol } from 'electron'
import { auth0Client } from './auth0-client'

export function registerAuthProtocol() {
  // Must be called BEFORE app.ready
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
}

export function setupAuthProtocolHandler() {
  // macOS: Set as default handler AFTER app is ready
  if (process.platform === 'darwin') {
    app.setAsDefaultProtocolClient('electronapp')
  }

  // macOS only - open-url event
  app.on('open-url', async (event, url) => {
    event.preventDefault()

    if (url.startsWith('electronapp://callback')) {
      try {
        await auth0Client.handleCallback(url)
      } catch (error) {
        console.error('Auth callback error:', error)
      }
    }
  })
}
```

### File: `src/preload/preload.ts`

```typescript
import { contextBridge, ipcRenderer } from 'electron'

// Expose auth APIs to renderer
contextBridge.exposeInMainWorld('electronAPI', {
  auth: {
    login: () => ipcRenderer.invoke('auth:login'),
    getTokens: () => ipcRenderer.invoke('auth:get-tokens')
  }
})

// TypeScript types for renderer
declare global {
  interface Window {
    electronAPI: {
      auth: {
        login: () => Promise<void>
        getTokens: () => Promise<TokenSet | null>
      }
    }
  }
}
```

### File: `src/main/main.ts` (Integration)

```typescript
import { app, BrowserWindow, ipcMain } from 'electron'
import { registerAuthProtocol, setupAuthProtocolHandler } from './auth/protocol-handler'
import { auth0Client } from './auth/auth0-client'

// Register protocol BEFORE app.ready
registerAuthProtocol()

app.whenReady().then(() => {
  // Set up protocol handler
  setupAuthProtocolHandler()

  // Basic IPC handlers for testing
  ipcMain.handle('auth:login', async () => {
    await auth0Client.login()
  })

  ipcMain.handle('auth:get-tokens', () => {
    return auth0Client.getTokens()
  })

  createWindow()
})

// ... rest of main.ts
```

### Environment Variables

```bash
# .env.example
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your_native_app_client_id
AUTH0_AUDIENCE=https://your-api.com  # Optional
```

### File: `src/renderer/TestAuth.tsx` (Optional Test UI)

```typescript
import { useState } from 'react'

interface TokenSet {
  accessToken: string
  refreshToken: string
  idToken: string
  expiresAt: number
}

export function TestAuth() {
  const [tokens, setTokens] = useState<TokenSet | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      await window.electronAPI.auth.login()
      console.log('Login initiated - check browser')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGetTokens = async () => {
    try {
      const tokens = await window.electronAPI.auth.getTokens()
      setTokens(tokens)
    } catch (error) {
      console.error('Get tokens failed:', error)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Auth0 Test UI</h2>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Opening browser...' : 'Login with Auth0'}
        </button>
        <button onClick={handleGetTokens} style={{ marginLeft: '10px' }}>
          Get Tokens
        </button>
      </div>

      {tokens && (
        <div>
          <h3>Tokens (In Memory)</h3>
          <pre style={{
            background: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
          <p>Expires: {new Date(tokens.expiresAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}
```

**Usage**: Add `<TestAuth />` to your App.tsx for easy manual testing during development.

## Integration Points

### Provides to Other Slices
- **Auth0Client**: Singleton with login() and handleCallback() methods
- **Protocol Handler**: Registered `electronapp://` scheme
- **Token Structure**: TypeScript types for TokenSet
- **Basic IPC**: `auth:login` and `auth:get-tokens` handlers

### Consumes from Other Slices
- Electron base template (main.ts, preload patterns)
- Existing IPC infrastructure

## Success Criteria

### Functional Requirements
- ✅ Login flow initiates via IPC call
- ✅ External browser opens with Auth0 Universal Login
- ✅ Protocol callback intercepted successfully on macOS
- ✅ State parameter verified (CSRF protection works)
- ✅ Authorization code exchanged for tokens
- ✅ Tokens stored in memory
- ✅ Can retrieve tokens via `getTokens()` method

### Technical Requirements
- ✅ PKCE verifier/challenge properly generated (SHA-256)
- ✅ State parameter with 10-min timeout
- ✅ No embedded webviews (external browser only)
- ✅ TypeScript strict mode compliance
- ✅ Zero native dependencies
- ✅ Error handling for auth failures

### Testing Requirements
- ✅ Manual test: trigger login, complete auth, verify tokens in console
- ✅ Verify state timeout (wait 10 min, try to use old callback)
- ✅ Test CSRF protection (modify state parameter manually)
- ✅ Test invalid authorization code handling

## Effort Estimate

**Relative Effort: 2/5**
- Simple scope: OAuth flow only, no persistence/UI
- Well-defined patterns from guide
- macOS-only reduces complexity
- Foundation for remaining slices

## Implementation Notes

### Development Approach
1. Create auth directory structure
2. Implement PKCE utilities + tests
3. Implement Auth0Client class
4. Set up protocol handler (macOS)
5. Integrate with main.ts
6. Manual testing via IPC

### Testing Strategy
- **Manual Testing**: Primary approach for slice 110
  - Use Electron DevTools console
  - Call `window.electronAPI.auth.login()` (once IPC bridge ready)
  - Verify tokens logged to console
- **Unit Tests**: PKCE generation (optional for MVP)
- **Security Tests**: State verification, timeout

### Next Slice Preparation
After slice 110 success:
- Tokens are in memory, auth flow proven
- Slice 111: Add persistent encrypted storage
- Slice 112: Build full IPC bridge + React UI
- Slice 113: Add token lifecycle (refresh, logout)

### Debugging Tips
- Enable Electron DevTools: `win.webContents.openDevTools()`
- Log all auth URLs for inspection
- Test Auth0 config in Auth0 dashboard first
- Verify callback URL registered: `electronapp://callback`

## Security Considerations

### Implemented
- ✅ PKCE (S256) prevents code interception
- ✅ State parameter prevents CSRF
- ✅ State timeout prevents replay attacks
- ✅ Cryptographically secure random generation
- ✅ External browser (no webview vulnerabilities)

### Deferred to Later Slices
- Token encryption (Slice 111)
- Secure IPC (Slice 112)
- Token refresh security (Slice 113)

### Development Security
- Never log tokens in production
- Use separate Auth0 dev tenant
- Rotate tokens regularly during testing
