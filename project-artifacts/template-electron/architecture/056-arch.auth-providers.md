---
item: auth-providers
project: manta-templates
template: electron
type: architecture
status: draft
dependencies: []
lastUpdated: 2025-10-12
---

# Architecture 056: Multi-Provider Authentication

## Overview

This architecture defines a provider-agnostic authentication abstraction layer that supports multiple OAuth providers (Auth0, Supabase, custom) while maintaining a consistent API for the Electron application. The design allows swapping or adding authentication providers without changing application code.

## Problem Statement

Different authentication providers (Auth0, Supabase, Firebase, etc.) have varying:
- OAuth flows and endpoints
- Token formats and lifecycles
- Pricing models and feature sets
- API patterns and SDKs

Hard-coding to a single provider creates:
- Vendor lock-in
- Migration difficulty
- Inability to offer multiple auth options
- Code duplication when supporting multiple providers

## Design Goals

1. **Provider Independence**: Application code doesn't know which provider is active
2. **Easy Provider Addition**: Adding new providers requires minimal changes
3. **Consistent Security**: Security patterns (PKCE, logging) apply to all providers
4. **Type Safety**: TypeScript interfaces ensure correct provider implementation
5. **Electron-Specific**: Leverage Electron's capabilities (protocol handlers, IPC, secure storage)

## Architecture Components

### 1. Provider Abstraction Layer

**Core Interface**: `AuthProvider`

```typescript
interface AuthProvider {
  // Initiate login flow (opens external browser)
  login(): Promise<void>

  // Handle OAuth callback and exchange code for tokens
  handleCallback(callbackUrl: string): Promise<void>

  // Retrieve stored tokens
  getTokens(): TokenSet | null

  // Optional: Refresh access token
  refreshTokens?(): Promise<TokenSet>

  // Optional: Logout and clear tokens
  logout?(): Promise<void>
}
```

### 2. Common Token Structure

All providers normalize to this structure:

```typescript
interface TokenSet {
  accessToken: string
  refreshToken: string
  idToken: string
  expiresAt: number  // Unix timestamp
}
```

### 3. Provider-Specific Configuration

```typescript
type ProviderConfig = Auth0Config | SupabaseConfig | CustomConfig

interface Auth0Config {
  provider: 'auth0'
  domain: string
  clientId: string
  audience?: string
  scope: string
  redirectUri: string
}

interface SupabaseConfig {
  provider: 'supabase'
  url: string
  anonKey: string
  scope: string
  redirectUri: string
}
```

### 4. Environment-Based Provider Selection

```bash
# .env
AUTH_ENABLED=true
AUTH_PROVIDER=auth0  # or 'supabase'

# Auth0-specific
AUTH0_DOMAIN=tenant.auth0.com
AUTH0_CLIENT_ID=xyz

# Supabase-specific (future)
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_ANON_KEY=xyz
```

### 5. Logging Utility

**`authLogger`** - Environment-aware logging:

```typescript
authLogger.debug()     // Dev only (or AUTH_DEBUG=true)
authLogger.info()      // Always
authLogger.success()   // Always
authLogger.error()     // Always
authLogger.warn()      // Always
authLogger.sensitive() // Dev only, NEVER in production
```

**Principles**:
- Debug logs only in development
- Never log tokens, secrets, or PII
- Structured logging for easy filtering
- Emoji prefixes for quick scanning

## Directory Structure

```
src/main/auth/
├── types.ts                    # Common interfaces (AuthProvider, TokenSet)
├── logger.ts                   # Environment-aware logging utility
├── auth0-config.ts             # Auth0-specific configuration
├── auth0-client.ts             # Auth0 AuthProvider implementation
├── supabase-client.ts          # Supabase AuthProvider (future)
├── protocol-handler.ts         # Electron protocol handling (provider-agnostic)
└── pkce.ts                     # PKCE utilities (OAuth standard)
```

## Provider Comparison

### Auth0
**Pros**:
- Enterprise-grade security and compliance
- Rich social login options (50+ providers)
- Advanced features (MFA, anomaly detection, enterprise SSO)
- Excellent documentation and SDKs

**Cons**:
- Expensive at scale ($240/mo for MFA, per-MAU pricing)
- Overkill for simple apps
- Requires external service dependency

**Use Cases**:
- B2B SaaS with enterprise customers
- Apps requiring compliance (SOC2, HIPAA)
- Complex auth flows with MFA, SSO

### Supabase
**Pros**:
- Very affordable (free tier, $25/mo pro)
- Includes database, storage, realtime
- Simple PostgreSQL-based auth
- Good for indie/small teams

**Cons**:
- Less mature than Auth0
- Fewer social providers out-of-box
- Limited enterprise features
- Self-hosting adds complexity

**Use Cases**:
- Indie projects and MVPs
- Cost-sensitive applications
- Apps already using Supabase for backend

## Security Principles (All Providers)

1. **PKCE Required**: All OAuth flows use PKCE (Proof Key for Code Exchange)
2. **External Browser**: Never use embedded webviews (security risk)
3. **State Parameter**: CSRF protection via cryptographically random state
4. **Token Storage**: Encrypted at rest (Slice 111)
5. **No Token Exposure**: Tokens never reach renderer except via secure IPC
6. **Unique Protocol Scheme**: Avoid `electronapp://`, use app-specific schemes

## Electron-Specific Patterns

### Protocol Handlers
- **macOS**: `app.on('open-url')` event
- **Windows/Linux**: `app.on('second-instance')` event (Slice 114)

### Secure Token Storage
- **Development**: Plain JSON in app data directory
- **Production**: OS keychain/credential manager via `keytar` (Slice 111)

### IPC Bridge
- Use `contextBridge` for secure main↔renderer communication
- Never expose tokens directly - only via controlled methods
- Type-safe IPC channels with TypeScript

## Implementation Slices

### Provider-Agnostic Slices
- **Slice 111**: Secure Token Storage (works with any TokenSet)
- **Slice 112**: IPC Bridge + React UI (provider-agnostic methods)
- **Slice 114**: Windows/Linux Protocol Handling (provider-agnostic)

### Provider-Specific Slices
- **Slice 110**: Auth0 Core OAuth Flow
- **Slice 113**: Auth0 Token Lifecycle (refresh/logout)
- **Future**: Supabase Core OAuth Flow
- **Future**: Supabase Token Lifecycle

## Adding a New Provider

**Steps**:

1. **Create config interface** in `types.ts`:
   ```typescript
   interface NewProviderConfig extends AuthConfig {
     provider: 'newprovider'
     // provider-specific fields
   }
   ```

2. **Implement AuthProvider**:
   ```typescript
   // src/main/auth/newprovider-client.ts
   class NewProviderClient implements AuthProvider {
     async login() { /* ... */ }
     async handleCallback(url: string) { /* ... */ }
     getTokens() { /* ... */ }
   }
   ```

3. **Add configuration**:
   ```typescript
   // src/main/auth/newprovider-config.ts
   export const newProviderConfig: NewProviderConfig = {
     provider: 'newprovider',
     // load from process.env
   }
   ```

4. **Update environment**:
   ```bash
   # .env
   AUTH_PROVIDER=newprovider
   NEWPROVIDER_API_KEY=xyz
   ```

5. **Add provider factory** (future):
   ```typescript
   function createAuthProvider(config: ProviderConfig): AuthProvider {
     switch(config.provider) {
       case 'auth0': return new Auth0Client(config)
       case 'supabase': return new SupabaseClient(config)
       case 'newprovider': return new NewProviderClient(config)
     }
   }
   ```

## Migration Path

**Current State** (Slice 110 complete):
- Auth0 hard-coded throughout
- Works on macOS only
- In-memory token storage

**Phase 1** (Current):
- Extract common interfaces (`AuthProvider`, `TokenSet`)
- Create logging utility
- Document multi-provider architecture

**Phase 2** (Slice 111-113):
- Implement provider-agnostic storage
- Complete Auth0 implementation
- Create provider factory pattern

**Phase 3** (Future):
- Add Supabase provider
- Test provider switching
- Document provider selection guide

## Testing Strategy

### Unit Tests
- Each provider implementation tested independently
- Mock OAuth endpoints for deterministic tests
- Test token normalization to common `TokenSet`

### Integration Tests
- Test protocol handler with different providers
- Test token storage with different token formats
- Test IPC bridge with provider switching

### E2E Tests
- Manual testing with real Auth0 credentials
- Manual testing with real Supabase credentials
- Automated E2E tests with provider stubs

## Configuration Management

### Environment Variables Pattern

```bash
# Required (all providers)
AUTH_ENABLED=true
AUTH_PROVIDER=auth0  # determines which provider to use

# Optional (all providers)
AUTH_DEBUG=true      # enable debug logging

# Auth0-specific
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_AUDIENCE=

# Supabase-specific
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

### Protocol Scheme Configuration

Each provider should use a unique protocol scheme to avoid conflicts:

```typescript
// Good: App-specific
const AUTH_PROTOCOL_SCHEME = 'myapp-electron'

// Bad: Generic
const AUTH_PROTOCOL_SCHEME = 'electronapp'
```

## Monitoring & Debugging

### Development
- Full debug logging via `authLogger.debug()`
- Sensitive data logged (tokens, verifiers) for debugging
- Console output with emoji indicators

### Production
- Error logging only via `authLogger.error()`
- No sensitive data in logs
- Optional AUTH_DEBUG flag for troubleshooting

## Future Considerations

### Potential Providers
- **Firebase Auth**: Google ecosystem integration
- **AWS Cognito**: AWS-native apps
- **Clerk**: Modern auth with great DX
- **Custom OAuth**: Roll-your-own backend

### Potential Features
- Multi-provider support (let user choose)
- Provider migration tools
- OAuth proxy for testing
- Mock provider for development

## References

- [OAuth 2.0 for Native Apps (RFC 8252)](https://tools.ietf.org/html/rfc8252)
- [PKCE (RFC 7636)](https://tools.ietf.org/html/rfc7636)
- [Auth0 Native Apps Best Practices](https://auth0.com/docs/quickstart/native)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Electron Security Best Practices](https://www.electronjs.org/docs/latest/tutorial/security)

## Decision Log

**2025-10-12**: Initial architecture defined
- Decided on `AuthProvider` interface pattern
- Chose environment variable-based provider selection
- Established logging utility approach
- Documented Auth0 vs Supabase use cases
