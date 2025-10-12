---
item: electron-vs-react-auth-comparison
project: manta-templates
template: electron
type: architecture
status: reference
lastUpdated: 2025-10-12
---

# Electron vs React Authentication: Key Differences

## Executive Summary

**Bottom Line**: Electron auth is significantly different from React (web) auth due to desktop-specific capabilities and security models. **~60-70% of Electron auth code is Electron-specific** and won't translate directly to React.

## Core Architectural Differences

### 1. OAuth Redirect Mechanism

| Aspect | Electron | React (Web) |
|--------|----------|-------------|
| **Redirect URL** | Custom protocol (`myapp://callback`) | HTTP URL (`https://myapp.com/callback`) |
| **Browser** | External system browser | Same browser window/tab |
| **Callback Handling** | Protocol handler (OS-level) | Route handler (HTTP server) |
| **Security** | PKCE required (no client secret) | Can use client secret (server-side) |

**Electron-Specific Code**:
```typescript
// ❌ Electron-only - Won't work in React
app.setAsDefaultProtocolClient('myapp')
app.on('open-url', async (event, url) => {
  // Handle myapp://callback
})
```

**React Equivalent**:
```typescript
// ✅ React - HTTP route
app.get('/callback', async (req, res) => {
  const code = req.query.code
  // Exchange code for tokens
})
```

###

 2. Token Storage

| Aspect | Electron | React (Web) |
|--------|----------|-------------|
| **Storage Location** | OS keychain (macOS), Credential Manager (Windows) | HttpOnly cookies, sessionStorage |
| **Encryption** | OS-level (Keychain, DPAPI) | TLS in transit, encrypted at rest on server |
| **Access** | Main process only | Browser (with CORS restrictions) |
| **Persistence** | Native secure storage | Cookie expiry, localStorage (insecure!) |

**Electron-Specific Code**:
```typescript
// ❌ Electron-only
import { safeStorage } from 'electron'

const encryptedToken = safeStorage.encryptString(JSON.stringify(tokens))
store.set('auth.tokens', encryptedToken.toString('base64'))
```

**React Equivalent**:
```typescript
// ✅ React - Server-side session/cookie
res.cookie('accessToken', token, {
  httpOnly: true,    // Not accessible via JavaScript
  secure: true,      // HTTPS only
  sameSite: 'strict' // CSRF protection
})
```

### 3. Process Architecture

| Aspect | Electron | React (Web) |
|--------|----------|-------------|
| **Processes** | Main (Node.js) + Renderer (Chromium) | Single browser process |
| **IPC** | `contextBridge` + `ipcRenderer`/`ipcMain` | HTTP requests to backend |
| **Secrets** | Can store in main process | Must be server-side only |
| **Auth Flow** | Main process orchestrates | Browser → Server → Browser |

**Electron-Specific Code**:
```typescript
// ❌ Electron-only - IPC bridge
contextBridge.exposeInMainWorld('auth', {
  login: () => ipcRenderer.invoke('auth:login'),
  getTokens: () => ipcRenderer.invoke('auth:get-tokens')
})
```

**React Equivalent**:
```typescript
// ✅ React - HTTP API
const login = async () => {
  window.location.href = '/api/auth/login' // Redirect to backend
}

const getTokens = async () => {
  const res = await fetch('/api/auth/tokens', { credentials: 'include' })
  return res.json()
}
```

### 4. Security Model

| Aspect | Electron | React (Web) |
|--------|----------|-------------|
| **PKCE** | **Required** (no client secret) | Optional (can use client secret on server) |
| **Client Secret** | **Never** (can't be hidden in desktop app) | Yes (on backend server) |
| **CSRF Protection** | State parameter + protocol handler | State parameter + SameSite cookies |
| **Token Exposure** | Isolated to main process | Can be in backend session |

## What's Reusable Between Electron and React?

### ✅ Highly Reusable (~30-40%)

1. **PKCE Utilities** (if React uses PKCE):
   ```typescript
   // ✅ Same for both
   export function generatePKCEPair() {
     const verifier = crypto.randomBytes(64).toString('base64url')
     const hash = crypto.createHash('sha256').update(verifier)
     const challenge = hash.digest('base64url')
     return { verifier, challenge }
   }
   ```

2. **Token Types**:
   ```typescript
   // ✅ Same structure
   interface TokenSet {
     accessToken: string
     refreshToken: string
     idToken: string
     expiresAt: number
   }
   ```

3. **Provider Configurations** (concepts):
   ```typescript
   // ✅ Similar structure, different values
   interface Auth0Config {
     domain: string
     clientId: string
     audience?: string
     // redirectUri differs: myapp:// vs https://
   }
   ```

4. **Token Refresh Logic** (patterns):
   ```typescript
   // ✅ Logic similar, storage differs
   async function refreshIfExpired(tokens: TokenSet) {
     if (Date.now() > tokens.expiresAt - 60000) {
       return await refreshTokens(tokens.refreshToken)
     }
     return tokens
   }
   ```

### ❌ Not Reusable (~60-70%)

1. **Protocol Handlers** - Completely Electron-specific
2. **IPC Bridge** - Electron's contextBridge pattern
3. **Token Storage** - OS keychain vs HttpOnly cookies
4. **OAuth Redirect Flow** - Custom protocol vs HTTP route
5. **External Browser Launching** - `shell.openExternal()` vs same-window redirect

## Code Reuse Strategy

### Shared (Monorepo Packages)

**`packages/auth-common/`**:
```
auth-common/
├── types.ts           # TokenSet, provider configs
├── pkce.ts            # PKCE generation (if used in React)
├── utils.ts           # Token validation, expiry checks
└── providers/
    ├── auth0-config.ts      # Auth0 domain, scopes
    └── supabase-config.ts   # Supabase config
```

### Platform-Specific

**`templates/electron/src/main/auth/`**:
```
electron auth/
├── protocol-handler.ts   # Electron-specific
├── electron-storage.ts   # safeStorage, electron-store
├── ipc-bridge.ts         # contextBridge
└── auth-client.ts        # Uses above Electron APIs
```

**`templates/react/src/lib/auth/`**:
```
react auth/
├── api-client.ts         # HTTP fetch to backend
├── hooks/
│   ├── useAuth.ts        # React hook
│   └── useTokens.ts      # React hook
└── AuthProvider.tsx      # React Context
```

## Monorepo Implications

### What to Put in `packages/`

✅ **DO** share:
- Type definitions (`TokenSet`, `AuthProvider`)
- PKCE utilities (if React uses PKCE)
- Provider configuration types
- Token expiry utilities
- Validation helpers

❌ **DON'T** share:
- Protocol handlers (Electron-only)
- IPC bridges (Electron-only)
- OS keychain code (Electron-only)
- React hooks (React-only)
- HTTP route handlers (React-only)

### Directory Structure Recommendation

```
packages/
└── auth-common/          # Shared auth utilities
    ├── types/
    │   ├── token-set.ts
    │   ├── auth-provider.ts
    │   └── provider-configs.ts
    ├── utils/
    │   ├── pkce.ts       # If React uses PKCE
    │   ├── token-utils.ts
    │   └── validation.ts
    └── providers/
        ├── auth0/
        │   └── config.ts
        └── supabase/
            └── config.ts

templates/electron/
└── src/main/auth/
    ├── protocol-handler.ts    # Electron-specific
    ├── electron-storage.ts    # Electron-specific
    ├── ipc-bridge.ts          # Electron-specific
    ├── auth0-client.ts        # Uses Electron APIs
    └── logger.ts              # Could be shared

templates/react/
└── src/lib/auth/
    ├── api-client.ts          # React-specific (HTTP)
    ├── session-storage.ts     # React-specific (cookies)
    ├── hooks/                 # React-specific
    └── AuthProvider.tsx       # React-specific
```

## Provider Comparison: Electron vs React

### Auth0

**Electron**:
- Uses Authorization Code + PKCE flow
- Custom protocol redirect (`myapp://callback`)
- No client secret (can't be hidden)
- Token storage in OS keychain

**React**:
- Can use Authorization Code + Client Secret (server-side)
- HTTP redirect (`https://myapp.com/callback`)
- Client secret on backend server
- Token in HttpOnly cookies

### Supabase

**Electron**:
- Same OAuth flow as Auth0
- Custom protocol redirect
- Supabase client in main process only

**React**:
- Supabase JS client in browser
- HTTP redirect
- Built-in session management
- Simpler integration (less custom code)

## Migration Considerations

### From Electron to React

**Hard to migrate** (needs rewrite):
- Protocol handlers → HTTP routes
- IPC bridge → HTTP API
- OS keychain → HttpOnly cookies
- External browser launch → Same-window redirect

**Easy to migrate** (mostly reusable):
- Token types
- PKCE utilities (if used)
- Provider configs (adjust redirectUri)
- Business logic (token refresh timing, etc.)

### From React to Electron

**Hard to add**:
- Custom protocol registration
- OS keychain integration
- IPC bridge architecture
- External browser orchestration

**Easy to port**:
- HTTP API patterns → IPC patterns
- Session management → Token storage
- React hooks → Electron preload bridge

## Testing Implications

### Electron-Specific Testing

- **Unit**: Mock `app.setAsDefaultProtocolClient`, `contextBridge`
- **Integration**: Test protocol handler with different URLs
- **E2E**: Launch real Electron app, trigger real OAuth flow

### React-Specific Testing

- **Unit**: Mock `fetch`, test hooks
- **Integration**: Mock backend API responses
- **E2E**: Cypress/Playwright with real browser

### Shared Testing

- **Unit**: PKCE generation, token expiry logic
- **Integration**: Provider config validation
- Both platforms can use same test fixtures for `TokenSet`

## Recommendations

### For Monorepo Structure

1. **Create `packages/auth-common`** for truly shared code:
   - Type definitions
   - PKCE utilities (if both use it)
   - Token expiry helpers
   - Validation utils

2. **Keep platform-specific code separate**:
   - `templates/electron/src/main/auth/` - Electron only
   - `templates/react/src/lib/auth/` - React only
   - Don't try to force code reuse where architectures differ

3. **Share provider configurations** (but with platform-specific redirectUri):
   ```typescript
   // packages/auth-common/providers/auth0.ts
   export const auth0Config = {
     domain: process.env.AUTH0_DOMAIN,
     clientId: process.env.AUTH0_CLIENT_ID,
     scope: 'openid profile email offline_access',
     // redirectUri must be set per platform
   }
   ```

### For Learning Path

1. **Start with Electron** (you're here):
   - Understand OAuth with PKCE
   - Learn custom protocol handling
   - Master secure token storage

2. **Then React** (future):
   - Understand server-side OAuth
   - Learn HttpOnly cookies
   - Master session management

3. **Extract Common Patterns**:
   - Identify what worked well in Electron
   - See what translates to React
   - Create shared utilities incrementally

## Conclusion

**~60-70% of Electron auth code is platform-specific** and won't directly translate to React. The key differences are:

1. **Redirect mechanism**: Custom protocol vs HTTP
2. **Token storage**: OS keychain vs HttpOnly cookies
3. **Process architecture**: IPC vs HTTP API
4. **Security model**: PKCE-only vs client secret option

**However**, the **mental model** and **authentication patterns** learned in Electron are highly valuable for React:
- Understanding OAuth flows
- PKCE security
- Token lifecycle management
- Provider abstraction

**For the monorepo**: Keep ~30-40% shared (types, utils), keep ~60-70% platform-specific (protocol handlers, storage, IPC).

## References

- [Electron Security](https://www.electronjs.org/docs/latest/tutorial/security)
- [OAuth 2.0 for Native Apps (RFC 8252)](https://tools.ietf.org/html/rfc8252)
- [OAuth 2.0 for Browser-Based Apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps)
- [Auth0 Native vs SPA](https://auth0.com/docs/quickstart/native vs https://auth0.com/docs/quickstart/spa)
